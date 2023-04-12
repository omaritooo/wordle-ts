import { configureStore } from "@reduxjs/toolkit";
import wordsSlice from './wordsSlice'

const store = configureStore({
  reducer: {
    words: wordsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;