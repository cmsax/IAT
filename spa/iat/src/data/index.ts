import { TestPack, SingleTest } from "@/interfaces/test";
import { Shuffle } from "@/core";

export const Words = {
  positive: ["美味的", "可口的", "诱人的", "吸引人的", "令人垂涎的"],
  negative: ["乏味的", "不吸引人的", "无味的", "不好吃的", "不美味的"]
};

export const staticBase =
  "https://latina-1253549750.cos.ap-shanghai.myqcloud.com/img/research/iat/";
export const cdnBase =
  "https://latina-1253549750.cos.ap-shanghai.myqcloud.com/img/research/iat/versions/2/";
const warmImages = [];
const coldImages = [];
for (let i = 1; i < 9; i++) {
  warmImages.push(cdnBase + "1-" + i + ".jpg");
}
for (let i = 1; i < 9; i++) {
  coldImages.push(cdnBase + "2-" + i + ".jpg");
}
const coldImageIntro = cdnBase + "cold.png";
const warmImageIntro = cdnBase + "warm.png";

export const Images = {
  warmImages,
  coldImages,
  coldImageIntro,
  warmImageIntro
};

const buildTestCase = (
  wordsOrImages: string[],
  isImage: boolean,
  positiveOrNegative: "positive" | "negative"
): SingleTest[] => {
  const testCases: SingleTest[] = [];
  for (const imageOrWord of wordsOrImages) {
    testCases.push({
      testDescription: isImage ? "" : imageOrWord,
      positiveOrNegative,
      isImage,
      imageURL: isImage ? imageOrWord : ""
    });
  }
  return testCases;
};

const baseImageTestCases: SingleTest[] = [];
baseImageTestCases.push(...buildTestCase(warmImages, true, "positive"));
baseImageTestCases.push(...buildTestCase(coldImages, true, "negative"));
const baseWordTestCases: SingleTest[] = [];
baseWordTestCases.push(...buildTestCase(Words.positive, false, "positive"));
baseWordTestCases.push(...buildTestCase(Words.negative, false, "negative"));

const reversedImageTestCases: SingleTest[] = [];
reversedImageTestCases.push(...buildTestCase(warmImages, true, "negative"));
reversedImageTestCases.push(...buildTestCase(coldImages, true, "positive"));
const reversedWordTestCases: SingleTest[] = [];
reversedWordTestCases.push(...buildTestCase(Words.positive, true, "negative"));
reversedWordTestCases.push(...buildTestCase(Words.negative, true, "positive"));

const title = (cur: number, all: number): string =>
  `第 ${cur} 部分 / 共 ${all} 个部分`;
// Initial cases
const InitCases = [
  // p1
  {
    instruction: {
      title: "",
      cmds: [
        "当出现的图片是暖色食物图片时，用左手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>字母键。",
        "当出现的图片是冷色食物图片时，用右手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>字母键。",
        "一次出现一张图片。 ",
        "",
        "如果选错了，会出现一个红色的叉。此时选择另一个字母键，叉会自动消失并进入下一张图片（如果本部分还没结束的话）。",
        "<h3><bold>请尽可能快而准确地完成。</bold></h3>",
        ""
      ]
    },
    positiveTitle: "暖色食物图片",
    negativeTitle: "冷色食物图片",
    testCases: Shuffle([...baseImageTestCases, ...baseImageTestCases])
  },
  // p2
  {
    instruction: {
      title: "",
      cmds: [
        "当出现美味类的词语时，用左手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>字母键。",
        "当出现不美味类的词语时，用右手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>字母键。",
        "一次出现一个词语。",
        "",
        "如果选错了，会出现一个红色的叉。此时选择另一个字母键，叉会自动消失并进入下一张图片（如果本部分还没结束的话）。",
        "<h3><bold>请尽可能快而准确地完成。</bold></h3>",
        ""
      ]
    },
    positiveTitle: "形容美味的词语",
    negativeTitle: "形容不美味的词语",
    testCases: Shuffle([...baseWordTestCases, ...baseWordTestCases])
  },
  // p3
  {
    instruction: {
      title: "",
      cmds: [
        "当出现暖色食物图片或者美味类的词语时，用左手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>字母键。",
        "当出现冷色食物图片或者不美味类的词语时，用右手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>字母键。",
        "",
        "如果选错了，会出现一个红色的叉。此时选择另一个字母键，叉会自动消失并进入下一张图片（如果本部分还没结束的话）。",
        "<h3><bold>请尽可能快而准确地完成。</bold></h3>",
        ""
      ]
    },
    positiveTitle: "形容美味的词语 或 暖色食物图片",
    negativeTitle: "形容不美味的词语 或 冷色食物图片",
    testCases: Shuffle([...baseWordTestCases, ...baseImageTestCases])
  },
  // p4 check
  {
    instruction: {
      title: "",
      cmds: [
        "当出现暖色食物图片或者美味类的词语时，用左手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>字母键。",
        "当出现冷色食物图片或者不美味类的词语时，用右手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>字母键。",
        "",
        "如果选错了，会出现一个红色的叉。此时选择另一个字母键，叉会自动消失并进入下一张图片（如果本部分还没结束的话）。",
        "<h3><bold>请尽可能快而准确地完成。</bold></h3>",
        ""
      ]
    },
    positiveTitle: "形容美味的词语 或 暖色食物图片",
    negativeTitle: "形容不美味的词语 或 冷色食物图片",
    testCases: Shuffle([
      ...baseWordTestCases,
      ...baseImageTestCases,
      ...baseWordTestCases,
      ...baseImageTestCases
    ])
  },
  // p5 reversed
  {
    instruction: {
      title: "",
      cmds: [
        "当出现的图片是冷色食物图片时，用左手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>字母键。",
        "当出现的图片是暖色食物图片时，用右手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>字母键。",
        "",
        "如果选错了，会出现一个红色的叉。此时选择另一个字母键，叉会自动消失并进入下一张图片（如果本部分还没结束的话）。",
        "<h3><bold>请尽可能快而准确地完成。</bold></h3>",
        ""
      ]
    },
    positiveTitle: "冷色食物图片",
    negativeTitle: "暖色食物图片",
    testCases: Shuffle([...reversedImageTestCases, ...reversedImageTestCases])
  },
  // p6 reversed
  {
    instruction: {
      title: "",
      cmds: [
        "当出现冷色食物图片或者美味类的词语时，用左手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>字母键。",
        "当出现暖色食物图片或者不美味类的词语时，用右手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>字母键。",
        "",
        "如果选错了，会出现一个红色的叉。此时选择另一个字母键，叉会自动消失并进入下一张图片（如果本部分还没结束的话）。",
        "<h3><bold>请尽可能快而准确地完成。</bold></h3>",
        ""
      ]
    },
    positiveTitle: "形容美味的词语 或 冷色食物图片",
    negativeTitle: "形容不美味的词语 或 暖色食物图片",
    testCases: Shuffle([...baseWordTestCases, ...reversedImageTestCases])
  },
  // p7 reversed check
  {
    instruction: {
      title: "",
      cmds: [
        "当出现冷色食物图片或者美味类的词语时，用左手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>E</span>字母键。",
        "当出现暖色食物图片或者不美味类的词语时，用右手摁下<span style='font-weight:800; padding: 0 10px; font-size:20px;'>I</span>字母键。",
        "",
        "如果选错了，会出现一个红色的叉。此时选择另一个字母键，叉会自动消失并进入下一张图片（如果本部分还没结束的话）。",
        "<h3><bold>请尽可能快而准确地完成。</bold></h3>"
      ]
    },
    positiveTitle: "形容美味的词语 或 冷色食物图片",
    negativeTitle: "形容不美味的词语 或 暖色食物图片",
    testCases: Shuffle([
      ...baseWordTestCases,
      ...reversedImageTestCases,
      ...baseWordTestCases,
      ...reversedImageTestCases
    ])
  }
];

// Test cases sequence
const sequence = [5, 2, 6, 7, 1, 3, 4].map(val => val - 1);

// Final test cases on the page
export const TestPacks: TestPack[] = sequence.map(
  (index: number, thisIndex: number): TestPack => {
    const tempTP = InitCases[index];
    tempTP.instruction.title = title(thisIndex + 1, sequence.length);
    return tempTP;
  }
);
