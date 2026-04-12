import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://oap-kappa.vercel.app/api";

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  // Global cache lifetime in seconds (default: 60)
  keepUnusedDataFor: 60,

  // Tag types used for cache invalidation across all injected endpoints
  tagTypes: ["Exam"],

  // No endpoints defined here — inject them per feature via injectEndpoints()
  endpoints: () => ({}),
});
