import {
  FinalResult,
  RefinedResult,
  FinishedTestPack,
  BriefFinishedTestPack,
  BriefFinishedTest
} from "@/interfaces/result";
import { ChooseEventPayload } from "@/interfaces/payload";

function refineFinishedTestpack(
  finishedTestPack: FinishedTestPack,
  index: number
): BriefFinishedTestPack {
  const { testPack, finishedTests } = finishedTestPack;

  return {
    title: testPack.instruction.title as string,
    finishedTests: finishedTests.map(
      (finishedTest: ChooseEventPayload): BriefFinishedTest => {
        const { test, ...otherProps } = finishedTest;
        const { imageURL, ...otherPropsOfTest } = test;
        return {
          test: {
            imageBriefName: imageURL ? imageURL.split("/").pop() : "",
            ...otherPropsOfTest
          },
          ...otherProps
        };
      }
    ),
    index: index + 1
  };
}

export const Refine = (finalResult: FinalResult): RefinedResult => {
  const { finishedTestPacks, ...otherProps } = finalResult;

  return {
    finishedTestPacks: finishedTestPacks.map(refineFinishedTestpack),
    ...otherProps
  };
};
