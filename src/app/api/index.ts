import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { addToken } from "../../features/auth/authSlice"; 
import { RootState } from "../../store"; 

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      //api.dispatch(addToken(refreshResult}));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      //api.dispatch(removeToken());
    }
  }
  return result;
};
const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.4.165:5000/api",
  //credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});