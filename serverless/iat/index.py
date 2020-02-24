# -*- coding: utf8 -*-
import pymysql.cursors

from datetime import datetime
from os import getenv

connection = pymysql.connect(
    host=getenv("MYSQL_HOST"),
    port=int(getenv("MYSQL_PORT")),
    password=getenv("MYSQL_USER_PWD"),
    user=getenv("MYSQL_USER"),
    db=getenv("MYSQL_DB"),
    charset='utf8',
    cursorclass=pymysql.cursors.DictCursor
)


def main_handler(event, context):
    if event['httpMethod'] != 'POST':
        return {'msg': 'should post'}

    body = event['body']
    ip = event['requestContext']['sourceIp']
    ua = event['headers'].get('User-Agent', 'null')
    with connection.cursor() as cursor:
        sql = "INSERT INTO `iat` (`ip`, `submit_date`, `user_agent`, `result`) VALUES (%s, %s, %s, %s)"
        cursor.execute(
            sql, (ip, datetime.now(), ua, body)
        )
    connection.commit()

    return {'msg': 'ok, thanks'}
