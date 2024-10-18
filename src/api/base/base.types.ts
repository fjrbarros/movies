export type TParams = Record<string, string>;

export interface GetRequestConfig {
  endpoint?: string;
  params?: TParams;
}
