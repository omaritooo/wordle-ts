import React, { useEffect, useState } from "react";
import { guess, guesses } from "../types";
type props = {
  message: string;
  attempts: number;
  word: string;
  status: Boolean;
  guesses: guesses;
  style: (e: string) => void;
  error: (e: Boolean) => void;
  children?: JSX.Element | JSX.Element[];
};

export default function ErrorHandler({
  message,
  attempts,
  status,
  guesses,
  style,
  error,
  word,
}: props) {
  const [errorState, setErrorState] = useState<Boolean>(false);

  const arrayIndexer = (guess: guess) => {
    return guess.word == message;
  };
  useEffect(() => {
    if (message.length < 5) {
      error(true);
      setErrorState(true);
      style(
        `bg-white text-gray-700 p-1 my-2 disabled:bg-gray-300  disabled:border-0 border-2 outline-none border-red-400 rounded-md w-full`
      );
    } else if (message.includes(" ") || !message.match(/^[A-Za-z]+$/)) {
      error(true);

      style(
        `bg-white text-gray-700 p-1 my-2 disabled:bg-gray-300 disabled:border-0  border-2 outline-none border-red-400 rounded-md w-full outline-offset-1`
      );
    } else if (guesses.find(arrayIndexer)) {
      error(true);
      setErrorState(true);
    } else if (attempts >= 6) {
      error(true);
      setErrorState(true);
      style(
        `bg-white text-gray-700 p-1 my-2 disabled:bg-gray-300 disabled:border-0  border-2 outline-none border-red-400 rounded-md w-full outline-offset-1`
      );
    } else if (message.toUpperCase() === word.toUpperCase()) {
      error(false);
      setErrorState(false);
    } else {
      error(false);
      setErrorState(false);
      style(
        `bg-white text-gray-700 p-1 my-2 disabled:bg-gray-300 disabled:border-0 border-2 outline-none border-green-400 outline-none rounded-md w-full`
      );
    }
  }, [message]);
  return (
    <div className="w-fit">
      <>
        {status && <span>Correct! your word was {word}</span>}
        {attempts === 6 && !status && <span>Wrong. Your word was {word}</span>}
      </>
    </div>
  );
}
