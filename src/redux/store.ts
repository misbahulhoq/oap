import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import authReducer from "./authSlice"; // your auth slice

export const store = configureStore({
  reducer: {
    // Mount the RTK Query cache reducer under the key defined in baseApi
    [baseApi.reducerPath]: baseApi.reducer,

    // Your other slices
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // Add RTK Query middleware for cache invalidation, polling, etc.
      .concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
