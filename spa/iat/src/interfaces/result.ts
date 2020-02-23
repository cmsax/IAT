import { ChooseEventPayload } from "./payload";
import { SingleTest, TestPack } from "./test";
import { UserInfo } from "@/interfaces/user";

export interface UserLeaveSpan {
  leaveStart: number;
  leaveEnd: number;
  currentTest: SingleTest | null;
  currentTestPackIndex: number;
  notIntro: boolean;
}

export interface FinishedTestPack {
  testPack: TestPack;
  finishedTests: ChooseEventPayload[];
}

export interface UserWelcomeStats {
  readInstructionStart: number | null;
  readInstructionEnd: number | null;
  userInfoStart: number | null;
  userInfoEnd: number | null;
}

export interface FinalResult {
  // 用户接受隐私协议的时间戳
  userAcceptPrivacyTime: number | null;
  userWelcomStats: UserWelcomeStats;
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
  userInfoValid: boolean;
}
