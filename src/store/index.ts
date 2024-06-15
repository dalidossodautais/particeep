import { ThunkAction, UnknownAction, configureStore } from "@reduxjs/toolkit";
import videosReducer from "./slices/videos";

const store = configureStore({
  reducer: {
    videos: videosReducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type Thunk<R> = ThunkAction<R, StoreState, unknown, UnknownAction>;

export default store;
