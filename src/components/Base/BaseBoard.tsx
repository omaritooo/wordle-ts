import React, { useEffect, useState } from "react";
import BaseRow from "./BaseRow";
import store from "../../store";
import { guesses, guess } from "../../types/index";
import { fetchWords, randomWord } from "../../store/wordsSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import TheLoader from "../TheLoader";
type Props = {
  guesses: guesses;
  loading: (e: boolean) => void;
};

export default function BaseBoard({ guesses, loading }: Props) {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const state = store.getState();
  useEffect(() => {
    axios
      .get("https://api.frontendexpert.io/api/fe/wordle-words")
      .then((res) => {
        if (res.status === 200) {
          dispatch(fetchWords(res.data));
          dispatch(randomWord());
          setLoader(true);
          loading(true);
        }
      });
  }, []);

  return (
    <>
      {loader ? (
        <section className="flex flex-col p-2 bg-gray-600 rounded-md gap-y-2">
          {guesses.map((el) => {
            return <BaseRow key={el.id} word={el.word} />;
          })}
        </section>
      ) : (
        <TheLoader />
      )}
    </>
  );
}
