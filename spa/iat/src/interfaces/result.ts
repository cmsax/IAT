import { ChooseEventPayload } from "./payload";
import { SingleTest, TestPack } from "./test";
import { UserInfo } from "@/interfaces/user";

export interface UserLeaveSpan {
  leaveStart: number;
  leaveEnd: number;
  currentTest: SingleTest;
}

export interface FinishedTestPack {
  testPack: TestPack;
  finishedTests: ChooseEventPayload[];
}

export interface FinalResult {
  // 用户接受隐私协议的时间戳
  userAcceptPrivacyTime: number | null;
  testStart: number | null;
  testEnd: number | null;
  // 用户离开当前页面
  userLeaveSpans: UserLeaveSpan[];
  // 完成的测试包
  finishedTestPacks: FinishedTestPack[];
  // 是否已经完成所有的测试
  finished: boolean;
  // 用户信息
  userInfo: UserInfo;
}