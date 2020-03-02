#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File: analyse/main.py
# Author: MingshiCai i@unoiou.com
# Date: 2020-03-01 14:21:56
import copy
import json
import statistics
import pandas as pd
from scipy.stats import ttest_ind


positive_words = ["美味的", "可口的", "诱人的", "吸引人的", "令人垂涎的"]
negative_words = ["乏味的", "不吸引人的", "无味的", "不好吃的", "不美味的"]


def mean_elapsed(row):
    """calculate row's mean elapsed time
    """
    all_tests = []
    for tp in row['result']['finishedTestPacks']:
        tests_in_pack = tp['finishedTests']
        tests_fixed_error = fix_error(tests_in_pack)
        all_tests.extend(tests_fixed_error)
    return statistics.mean(test['elapsed'] for test in all_tests)


def overall_stdev_mean(rows_):
    """calculate overall stdev.
    """
    rows = copy.deepcopy(rows_)
    all_tests = []
    for row in rows:
        row['result'] = json.loads(row['result'])
        for tp in row['result']['finishedTestPacks']:
            tests_in_pack = tp['finishedTests']
            tests_fixed_error = fix_error(tests_in_pack)
            all_tests.extend(tests_fixed_error)

    series = [test['elapsed'] for test in all_tests]
    return statistics.stdev(series), statistics.mean(series)


def out_of_range(row_mean, all_stdev, all_mean):
    """Decide whether row val out of range.
    """
    if row_mean > all_mean + 3 * all_stdev or row_mean < all_mean - 3 * all_stdev:
        return True
    else:
        return False


def gen_test_pack_id(test_pack):
    """generate unique id for test pack via `valid length + e title`
    """
    image_mapping = ['', 'positive', 'negative']

    valid_tests = list(
        filter(lambda x: x['valid'], test_pack['finishedTests'])
    )

    is_image = False
    is_title = False
    e_for_image = ''
    e_for_word = ''
    special_tag = ''
    length = 0

    for test in valid_tests:
        if test['test']['isImage']:
            is_image = True
            image_name = test['test']['imageBriefName']
            if image_mapping[int(image_name.split('-')[0])] == test['test']['positiveOrNegative']:
                e_for_image = '暖色'
            else:
                e_for_image = '冷色'
        if len(test['test']['testDescription']) > 0:
            is_title = True
            # e 键只会和「美味」匹配
            e_for_word = '美味'
        length += 1

    if length > 50:
        special_tag = '2'
    key = e_for_image + e_for_word + special_tag
    mappings = [
        '暖色', '美味', '暖色美味', '暖色美味2', '冷色', '冷色美味', '冷色美味2'
    ]
    return mappings.index(key) + 1


def err_ratio(cases):
    """calculate error ratio

    Args:
        cases: ([case,]) all cases in all parts

    Return:
        float
    """
    return 1 - len(list(filter(lambda x: x['valid'], cases))) / len(cases)


def fix_error(cases):
    """replace error cases' elapsed with valid cases' mean elapsed

    Args:
        cases: ([case, ]) all cases in a part

    Return:
        [case,]: aggregated cases without duplicate error cases
    """
    valid_cases = list(filter(lambda x: x['valid'], cases))
    substitute = sum(
        case['elapsed'] for case in valid_cases
    ) / len(valid_cases) + 600
    for case in cases:
        if not case['valid']:
            case['elapsed'] = substitute
    return cases


result = None
with open('./result.json', 'r+') as f:
    result = json.load(f)['RECORDS']

skipped_rows = {
    'dysopia': [],
    'error': [],
    'outofrange': [],
    'leave': [],
}

final_results = []
simple_results = []
stats = []

series_mapping = {
    4: {
        'series': [],
        'variance': None
    },
    7: {
        'series': [],
        'variance': None
    }
}


all_stdev, all_mean = overall_stdev_mean(result)

for row in result:
    row['result'] = json.loads(row['result'])
    ids = []
    all_cases = []
    for cases in list(map(lambda x: x['finishedTests'], [
        test_pack for test_pack in row['result']['finishedTestPacks']
    ])):
        all_cases.extend(cases)

    # remove error
    ratio = err_ratio(all_cases)
    if ratio >= 0.35:
        skipped_rows['error'].append(row)
        continue

    # remove dysopia
    if row['result']['userInfo']['dysopia'] != 'none':
        skipped_rows['dysopia'].append(row)
        continue

    # remove out of range
    row_mean = mean_elapsed(row)
    if out_of_range(row_mean, all_stdev, all_mean):
        skipped_rows['outofrange'].append(row)
        continue

    # remove leave
    if row['result']['userLeaveSpans']:
        skipped_rows['leave'].append(row)
        continue

    # each subject's columns
    columns = {}
    stat_columns = {}

    for test_pack in row['result']['finishedTestPacks']:
        id_ = gen_test_pack_id(test_pack)
        fixed_tests = fix_error(test_pack['finishedTests'])

        if id_ in [4, 7]:
            series = [test['elapsed'] for test in fixed_tests]
            series_mapping[id_]['series'].extend(series)
            # series = list(filter(
            #     # lambda x: x > 300, [
            #     lambda x: x < 20000 and x > 300, [
            #         test['elapsed'] for test in fixed_tests
            #     ]
            # ))
            mean = statistics.mean(series)
            stdev = statistics.stdev(series)
            variance = statistics.variance(series)
            sum_ = len(series) * mean
            stat_columns.update({
                'p{}-{}'.format(id_, 'mean'): mean,
                'p{}-{}'.format(id_, 'stdev'): stdev,
                'p{}-{}'.format(id_, 'variance'): variance,
                'p{}-{}'.format(id_, 'sum'): sum_
            })

        for test in fixed_tests:
            key = ''

            if test['test']['isImage']:
                key = 'img-<{}>'.format(
                    test['test']['imageBriefName'].split('.')[0]
                )
            else:
                word = test['test']['testDescription']
                key = ''
                index = None
                prefix = ''
                if word in positive_words:
                    prefix = 'good'
                    index = positive_words.index(word)
                else:
                    prefix = 'awful'
                    index = negative_words.index(word)
                key = '{}-{}'.format(prefix, index + 1)

            columns.setdefault('p-{}-{}-err'.format(id_, key), None)

            key = 'p-{}-{}'.format(id_, key)

            if test['valid']:
                if key+'-1' not in columns:
                    columns[key + '-1'] = test
                else:
                    columns[key + '-2'] = test
            else:
                columns[key+'-err'] = test

    # extract details
    final_result = {}
    simple_result = {}
    for key, val in columns.items():
        elapsed_key = '{}-elapsed'.format(key)
        test_content_key = '{}-content'.format(key)
        # test_type_key = '{}-test-type'.format(key)
        if val:
            final_result[elapsed_key] = val['elapsed']
            final_result[test_content_key] = val['test']['imageBriefName'] if val['test']['isImage'] else val['test']['testDescription']
            # final_result[test_type_key] = 'image' if val['test']['isImage'] else 'word'
            simple_result[elapsed_key] = val['elapsed']
        else:
            final_result[elapsed_key] = 0
            final_result[test_content_key] = '-'
            # final_result[test_type_key] = ''
            simple_result[elapsed_key] = 0

    # add subject's basic info
    user_info = row['result']['userInfo']
    final_result['01-edu'] = user_info['edu']
    final_result['02-birth-year'] = user_info['birthYear']
    final_result['03-dysopia'] = user_info['dysopia']
    final_result['04-gender'] = user_info['gender']
    final_result['05-hunger'] = user_info['hunger']
    final_result['06-relation'] = user_info['relation']

    simple_result['01-edu'] = user_info['edu']
    simple_result['02-birth-year'] = user_info['birthYear']
    simple_result['03-dysopia'] = user_info['dysopia']
    simple_result['04-gender'] = user_info['gender']
    simple_result['05-hunger'] = user_info['hunger']
    simple_result['06-relation'] = user_info['relation']

    stat_columns['01-edu'] = user_info['edu']
    stat_columns['02-birth-year'] = user_info['birthYear']
    stat_columns['03-dysopia'] = user_info['dysopia']
    stat_columns['04-gender'] = user_info['gender']
    stat_columns['05-hunger'] = user_info['hunger']
    stat_columns['06-relation'] = user_info['relation']

    t = {}
    for key in sorted(final_result):
        t[key] = final_result[key]
    final_results.append(t)

    t = {}
    for key in sorted(simple_result):
        t[key] = simple_result[key]
    simple_results.append(t)

    t = {}
    for key in sorted(stat_columns):
        t[key] = stat_columns[key]
    stats.append(t)

final_dataframe = pd.DataFrame(final_results)
final_dataframe.to_csv('complete_rsult.csv', encoding='gb18030')

final_dataframe = pd.DataFrame(simple_results)
final_dataframe.to_csv('simple_result.csv', encoding='gb18030')

final_stats = pd.DataFrame(stats)
final_stats.to_csv('stats.csv', encoding='gb18030')

p4_series = final_stats['p4-sum'].values
p7_series = final_stats['p7-sum'].values

t, p = ttest_ind(p4_series, p7_series)
print(t, p)

p4_mean = final_stats['p4-sum'].mean()
p7_mean = final_stats['p7-sum'].mean()
series = []
series.extend(final_stats['p4-sum'].values.tolist())
series.extend(final_stats['p4-sum'].values.tolist())
stdev = statistics.stdev(series)
dscore = (p7_mean - p4_mean) / stdev

print(dscore)

series_mapping[4]['variance'] = statistics.variance(
    series_mapping[4]['series']
)
series_mapping[7]['variance'] = statistics.variance(
    series_mapping[7]['series']
)


extra_result = {
    'variance': {
        'p4': series_mapping[4]['variance'],
        'p7': series_mapping[7]['variance'],
    },
    'dscore': dscore,
    'ttest': {
        't': t,
        'p': p
    }
}

with open('extra_result.json', 'w+') as f:
    json.dump(extra_result, f)

print('done')
