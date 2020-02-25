import { RefinedResult } from "@/interfaces/result";
import { POST } from "./index";

export const submitResult = (data: RefinedResult) => {
  const req = {
    data,
    url: "feiwei/iat"
  };
  return POST(req);
};
