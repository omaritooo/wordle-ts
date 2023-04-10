import  { InitialState } from "../types/redux/words";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'
const initialState: InitialState = {
    words: [],
    word:  "",
    history: [],
    score: 0
};

export const wordsSlice = createSlice({
  name: "counter slicer",
  initialState: initialState,
  reducers: {
    incrementScore: (state) => {
      state.score += 1;
    },
    randomWord: (state) => {
      state.word = state.words[Math.floor(Math.random() * state.words?.length)] ;
    },
    fetchWords: (state, action: PayloadAction<string[]>) => {
      state.words = action.payload;
    //   if (state.words.length > 1 )
    //   {

    //       state.word = state.words[Math.floor(Math.random() * state.words?.length)] 
    //   }

    },
   
  },
});

// Action creators are generated for each case reducer function
export const { incrementScore, fetchWords, randomWord } =
wordsSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default wordsSlice.reducer;