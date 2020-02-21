import { ActionTree } from "vuex";

import { submitResult } from "@/api/result";
import { FinalResult } from "@/interfaces/result";
import { TYPES } from "./mutations";

export const ACTIONS = {
  SUBMIT_RESULT_ASYNC: "SUBMIT_RESULT_ASYNC"
};

// Async
const Actions: ActionTree<FinalResult, any> = {
  async [ACTIONS.SUBMIT_RESULT_ASYNC]({ state, commit }, data?: any) {
    const res = await submitResult(state);
    console.log("res body:", res);
    // TODO check res body and status
    commit(TYPES.SUBMIT_SUCCESS);
    return res;
  }
};

export default Actions;
