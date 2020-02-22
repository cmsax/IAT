import { TestPack } from "@/interfaces/test";

export const Words = {
  positive: ["美味的", "可口的", "诱人的", "吸引人的", "令人垂涎的"],
  negative: ["乏味的", "不吸引人的", "无味的", "不好吃的", "不美味的"]
};

const cdnBase =
  "https://latina-1253549750.cos.ap-shanghai.myqcloud.com/img/research/iat/";
const warmImages = [];
const coldImages = [];
for (let i = 1; i < 8; i++) {
  warmImages.push(cdnBase + "1-" + i + ".jpg");
}
for (let i = 1; i < 8; i++) {
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

export const TestPacks: TestPack[] = [
  {
    positiveTitle: "好的",
    negativeTitle: "坏的",
    instruction: {
      cmds: ["command 1", "command 2"],
      title: "please read me"
    },
    testCases: [
      {
        testDescription: "demo test",
        positiveOrNegative: "negative",
        isImage: true,
        imageURL:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      },
      {
        testDescription: "demo test",
        positiveOrNegative: "negative",
        isImage: true,
        imageURL: ""
      },
      {
        testDescription: "healthy",
        positiveOrNegative: "positive",
        isImage: false
      },
      {
        testDescription: "bad",
        positiveOrNegative: "negative",
        isImage: false
      }
    ]
  },
  {
    positiveTitle: "健康的",
    negativeTitle: "不健康的",
    instruction: {
      cmds: ["command 1", "command 2"],
      title: "please read me"
    },
    testCases: [
      {
        testDescription: "demo test",
        positiveOrNegative: "negative",
        isImage: true,
        imageURL:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      },
      {
        testDescription: "demo test",
        positiveOrNegative: "negative",
        isImage: true,
        imageURL: ""
      },
      {
        testDescription: "healthy",
        positiveOrNegative: "positive",
        isImage: false
      },
      {
        testDescription: "bad",
        positiveOrNegative: "negative",
        isImage: false
      }
    ]
  }
];
