import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./Slice/movieSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
  devTools: true,
});
