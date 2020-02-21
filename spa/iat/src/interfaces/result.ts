import { FinishedTest, SingleTest, SkippedTest } from "./test";

export interface UserLeaveSpan {
  leaveStart: string;
  leaveEnd: string;
  currentTest: SingleTest;
}

export interface FinalResult {
  // 用户接受隐私协议的时间
  // YYYY-MM-DD HH:MM:SS
  userAcceptPrivacyTime: string;
  testStart: string;
  testEnd: string;
  // 用户离开当前页面
  userLeaveSpans: UserLeaveSpan[];
  // 跳过的测试
  skippedTests: SkippedTest[];
  // 完成的测试
  finishedTests: FinishedTest[];
}
