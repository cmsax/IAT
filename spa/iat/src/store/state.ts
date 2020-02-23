import { FinalResult } from "@/interfaces/result";

export const getDefaultState = (): FinalResult => {
  return {
    userAcceptPrivacyTime: null,
    testStart: null,
    testEnd: null,
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
