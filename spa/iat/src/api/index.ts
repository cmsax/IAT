import * as Axios from "axios";
import { Message, Loading } from "element-ui";

import { BASIC } from "@/config";

const error = (msg?: string) => {
  Message({
    type: "error",
    message: msg || "网络错误，请检查网络或重试。",
    duration: 2 * 1000
  });
};
let loading: any;
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: "正在提交……",
    background: "rgba(0, 0, 0, 0.7)"
  });
};
const endLoading = () => {
  loading.close();
};

export const axiosConfig = {
  baseURL: BASIC.location,
  timeout: 0,
  // 允许跨域 cookie
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  },
  maxContentLength: 8000,
  transformResponse: [
    (data: any) => {
      try {
        data = JSON.parse(data);
      } catch (e) {
        data = {};
      }
      // 未授权定向到登录
      if (data.status === 401) {
        error("Unauthorized.");
      }
      endLoading();
      return data;
    }
  ]
};

const axios = Axios.default.create(axiosConfig);
axios.interceptors.request.use(
  config => {
    startLoading();
    return config;
  },
  err => {
    endLoading();
    error();
    return Promise.reject(err);
  }
);

export const POST = (req: ReqParam) =>
  axios({
    method: "post",
    url: `/${req.url}`,
    data: JSON.stringify(req.data)
  });

export interface ReqParam {
  url: string;
  data: any;
}
