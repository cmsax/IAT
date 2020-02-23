import { FinalResult } from "@/interfaces/result";

export const getDefaultState = (): FinalResult => {
  return {
    userAcceptPrivacyTime: null,
    testStart: null,
    testEnd: null,
    userWelcomStats: {
      readInstructionStart: 0,
      readInstructionEnd: 0,
      userInfoStart: 0,
      userInfoEnd: 0
    },
    userLeaveSpans: [],
    finishedTestPacks: [],
    finished: false,
    userInfo: {
      birthYear: "",
      gender: 2,
      edu: "",
      dysopia: "",
      relation: "",
      hunger: 0
    },
    userInfoValid: false
  };
};

export default getDefaultState();
