export interface ApiRequestWrapperResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}
