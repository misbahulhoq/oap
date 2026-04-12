import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    // Mount the RTK Query cache reducer under the key defined in baseApi
    [baseApi.reducerPath]: baseApi.reducer,

    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
