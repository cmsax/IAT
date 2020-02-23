import { FinishedTestPack } from "@/interfaces/result";
import { ChooseEventPayload } from "@/interfaces/payload";
// Shuffle given list, with side effect.
export const Shuffle = (list: any[]): any[] => {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }
  return list;
};

export const AVG = (finishedTests: ChooseEventPayload[]): number => {
  return (
    finishedTests
      .map((val: ChooseEventPayload): number => val.elapsed)
      .reduce((prev, curr: number): number => prev + curr) /
    finishedTests.length
  );
};

// Calculate D-Score
export const DScore = (finishedTestPacks: FinishedTestPack[]): number => {
  const avg7 = AVG(finishedTestPacks[6].finishedTests);
  const avg4 = AVG(finishedTestPacks[3].finishedTests);
  return avg7 - avg4;
};

export const DScoreExplanation = (dScore: number): string =>
  dScore > 0
    ? `
进行数据分析后发现，你倾向于将暖色与美味食物相联系。因为在将“美味类的单词”+“暖色食物图片”与“不美味类的单词”+“冷色食物图片”相联系时，你的反应速度比将“美味类的单词”+“冷色食物图片”与“不美味类的单词”+“暖色食物图片”相联系时要更快。
`
    : `
进行数据分析后发现，你倾向于将冷色与美味食物相联系。因为在将“美味类的单词”+“冷色食物图片”与“不美味类的单词”+“暖色食物图片”相联系时，你的反应速度比将“美味类的单词”+“暖色食物图片”与“不美味类的单词”+“冷色食物图片”相联系时要更快。
`;
