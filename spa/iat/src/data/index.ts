import { TestPack } from "@/interfaces/test";

export const Words = {
  positive: ["美味的", "可口的", "诱人的", "吸引人的", "令人垂涎的"],
  negative: ["乏味的", "不吸引人的", "无味的", "不好吃的", "不美味的"]
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
