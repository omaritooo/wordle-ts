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
        {status && (
          <div className="flex flex-col gap-y-2">
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="flex p-2 mx-auto text-white align-middle bg-blue-400 gap-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Restart
            </button>
            <span>Correct! your word was {word}</span>
          </div>
        )}
        {attempts === 6 && !status && (
          <div className="flex flex-col gap-y-2">
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="flex p-2 mx-auto text-white align-middle bg-blue-400 gap-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Restart
            </button>
            <span>Wrong. your word was {word}</span>
          </div>
        )}
      </>
    </div>
  );
}
