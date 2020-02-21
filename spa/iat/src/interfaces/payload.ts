import { SingleTest } from "./test";

export interface ChooseEventPayload {
  keyCode: number;
  elapsed: number;
  test: SingleTest;
  valid: boolean;
}
