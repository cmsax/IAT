import {
  FinalResult,
  FinishedTestPack,
  UserWelcomeStats,
  UserLeaveSpan
} from "@/interfaces/result";
import { UserInfo } from "@/interfaces/user";
import defaultState from "./state";

// Sync
export const TYPES = {
  FINISH_TEST_PACK: "FINISH_TEST_PACK",
  SUBMIT_SUCCESS: "SUBMIT_SUCCESS",
  UPDATE_USER_INFO: "UPDATE_USER_INFO",
  LOG_WELCOME_STATS: "LOG_WELCOME_STATS",
  LOG_USER_LEAVE: "LOG_USER_LEAVE",

  RESET: "RESET"
};

export default {
  // 用户完成了一个测试包
  [TYPES.FINISH_TEST_PACK](state: FinalResult, payload: FinishedTestPack) {
    state.finishedTestPacks.push(payload);
  },

  // 用户提交结果成功
  [TYPES.SUBMIT_SUCCESS](state: FinalResult) {
    state.finished = true;
  },

  // 开始阅读说明
  [TYPES.LOG_WELCOME_STATS](state: FinalResult, payload: UserWelcomeStats) {
    state.userWelcomStats = payload;
  },

  // 更新用户基本信息
  [TYPES.UPDATE_USER_INFO](state: FinalResult, payload: UserInfo) {
    state.userInfo = payload;
    state.userInfoValid = true;
  },

  // 记录用户离开
  [TYPES.LOG_USER_LEAVE](state: FinalResult, payload: UserLeaveSpan) {
    state.userLeaveSpans.push(payload);
  },

  // RESET
  [TYPES.RESET](state: FinalResult, payload: any) {
    // TODO
    Object.assign(state, defaultState);
  }
};
