export interface TestOption {
  option: string;
  optionValue: number;
}

export interface SingleTest {
  testDescription: string;
  options: TestOption[];
  testIndex: number;
}

export interface SkippedTest {
  skipElapsed: number;
  test: SingleTest;
}

export interface FinishedTest {
  finishElapsed: number;
  test: SingleTest;
  selectedOption: TestOption;
}
