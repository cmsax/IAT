import { FinalResult } from "@/interfaces/result";
import { POST } from "./index";

export const submitResult = (data: FinalResult) => {
  const req = {
    data,
    url: "feiwei/iat"
  };
  return POST(req);
};
