import { Instruction } from "./instruction";

export interface BasicSingleTest {
  testDescription: string;
  positiveOrNegative: "positive" | "negative";
  isImage: boolean;
}

export interface SingleTest extends BasicSingleTest {
  imageURL?: string;
}

export interface BriefSingleTest extends BasicSingleTest {
  imageBriefName?: string;
}

export interface BasicTestPack {
  positiveTitle: string;
  negativeTitle: string;
}

export interface TestPack extends BasicTestPack {
  instruction: Instruction;
  testCases: SingleTest[];
}

export interface BriefTestPack extends BasicTestPack {
  title: string;
  testCases: BriefSingleTest[];
}
