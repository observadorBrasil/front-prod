import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

export interface ApiRequestWrapperArgs {
  method: AxiosRequestConfig["method"];
  url: string;
  data?: object;
  headers?: RawAxiosRequestHeaders;
  timeout?: AxiosRequestConfig["timeout"];
  params?: AxiosRequestConfig["params"];
}
