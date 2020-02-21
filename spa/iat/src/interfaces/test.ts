import { Instruction } from "./instruction";

export interface SingleTest {
  testDescription: string;
  positiveOrNegative: "positive" | "negative";
  isImage: boolean;
  imageURL?: string;
}

export interface TestPack {
  instruction: Instruction;
  positiveTitle: string;
  negativeTitle: string;
  testCases: SingleTest[];
}
