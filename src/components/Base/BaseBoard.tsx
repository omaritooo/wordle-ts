import React, { useEffect } from "react";
import BaseRow from "./BaseRow";
import store from "../../store";

import { guesses, guess } from "../../types/index";

import { fetchWords, randomWord } from "../../store/wordsSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
type Props = {
  guesses: guesses;
};

export default function BaseBoard({ guesses }: Props) {
  const dispatch = useDispatch();
  const state = store.getState();
  useEffect(() => {
    axios
      .get("https://api.frontendexpert.io/api/fe/wordle-words")
      .then((res) => {
        dispatch(fetchWords(res.data));
        dispatch(randomWord());
      });
  }, []);

  return (
    <section className="flex flex-col gap-y-2 bg-gray-600 p-2 rounded-md">
      {guesses.map((el) => {
        return <BaseRow key={el.id} word={el.word} />;
      })}
    </section>
  );
}
