import { FinalResult, FinishedTestPack } from "@/interfaces/result";
import { UserInfo } from "@/interfaces/user";
import defaultState from "./state";

// Sync
export const TYPES = {
  FINISH_TEST_PACK: "FINISH_TEST_PACK",
  SUBMIT_SUCCESS: "SUBMIT_SUCCESS",
  UPDATE_USER_INFO: "UPDATE_USER_INFO",

  RESET: "RESET"
};

export default {
  // 用户完成了一个测试包
  [TYPES.FINISH_TEST_PACK](state: FinalResult, data: FinishedTestPack) {
    state.finishedTestPacks.push(data);
  },

  // 用户提交结果成功
  [TYPES.SUBMIT_SUCCESS](state: FinalResult, data: any) {
    state.finished = true;
  },

  // 更新用户基本信息
  [TYPES.UPDATE_USER_INFO](state: FinalResult, data: UserInfo) {
    state.userInfo = data;
    state.userInfoValid = true;
  },

  // RESET
  [TYPES.RESET](state: FinalResult, data: any) {
    // TODO
    Object.assign(state, defaultState);
  }
};
