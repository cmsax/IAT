import { FinalResult, FinishedTestPack } from "@/interfaces/result";
import { ChooseEventPayload } from "@/interfaces/payload";

// Sync
export const TYPES = {
  FINISH_TEST_PACK: "FINISH_TEST_PACK",
  SUBMIT_SUCCESS: "SUBMIT_SUCCESS"
};

export default {
  // 用户完成了一个测试包
  [TYPES.FINISH_TEST_PACK](state: FinalResult, data: FinishedTestPack) {
    state.finishedTestPacks.push(data);
  },

  // 用户提交结果成功
  [TYPES.SUBMIT_SUCCESS](state: FinalResult, data: any) {
    state.finished = true;
  }
};
