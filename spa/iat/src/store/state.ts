import { FinalResult } from "@/interfaces/result";

export const getDefaultState = (): FinalResult => {
  return {
    userAcceptPrivacyTime: null,
    testStart: null,
    testEnd: null,
    userLeaveSpans: [],
    finishedTestPacks: [],
    finished: false
  };
};

export default getDefaultState();
