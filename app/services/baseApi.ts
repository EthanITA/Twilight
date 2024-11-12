import type { NitroFetchOptions } from "nitropack";

type FetchOpts = NitroFetchOptions<any>;

const baseApi = (baseURL: string) => {
  const api = $fetch.create({
    baseURL: `/api/${baseURL}`,
  });

  const apiMethod = (method: FetchOpts["method"]) => {
    return <T>(url: string, opts?: FetchOpts) => {
      return api(url, { ...opts, method }) as Promise<T>;
    };
  };

  return {
    get: apiMethod("get"),
    post: apiMethod("post"),
    put: apiMethod("put"),
    delete: apiMethod("delete"),
    patch: apiMethod("patch"),

    baseApi: api,
  };
};

export type BaseApi = ReturnType<typeof baseApi>;
export default baseApi;
