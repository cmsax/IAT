import { SingleTest } from "./test";

export interface BasicChooseEventPayload {
  keyCode: number;
  elapsed: number;
  valid: boolean;
}

export interface ChooseEventPayload extends BasicChooseEventPayload {
  test: SingleTest;
}
