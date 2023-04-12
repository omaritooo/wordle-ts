import React, { useEffect, useRef, useReducer, useState } from "react";
import "./App.css";
import BaseBoard from "./components/Base/BaseBoard";
import store from "./store";
import { guesses, guess } from "./types/index";
import Confetti from "react-confetti";

import ErrorHandler from "./components/ErrorHandler";

function App() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [attempt, setAttempt] = useState(0);
  const [message, setMessage] = useState("");
  const state = store.getState();
  const [loading, setLoading] = useState(false);
  const [guesses, setGuesses] = useState<guesses>([
    { word: "", id: 0 },
    { word: "", id: 1 },
    { word: "", id: 2 },
    { word: "", id: 3 },
    { word: "", id: 4 },
    { word: "", id: 5 },
  ]);
  const [guessChecker, setGuessChecker] = useState(false);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState<Boolean>(false);
  const [errorStyle, setErrorStyle] = useState(
    `bg-white text-gray-700 p-1 my-2 outline-none rounded-md w-full`
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage((event.target as HTMLInputElement).value);
  };
  const handleLoading = (e: boolean) => {
    setLoading(e);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (error) {
        return;
      }
      let newArr = [...guesses];
      newArr[attempt] = { word: message, id: attempt };
      setGuesses([...newArr]);
      setAttempt((attempt) => attempt + 1);
      setMessage((message) => (message = ""));
      if (
        attempt >= 5 &&
        message.toUpperCase() !== state.words.word.toUpperCase()
      ) {
        console.log("test");
        setStatus(true);
        setGuessChecker(false);
      }
      if (state?.words?.word) {
        if (message.toUpperCase() === state?.words?.word) {
          setStatus(true);
          setGuessChecker(true);
        }
      }
    }
  };

  const handleStyle = (e: string) => {
    setErrorStyle(e);
  };
  const handleError = (e: Boolean) => {
    setError(e);
  };

  return (
    <div className="">
      <ErrorHandler
        message={message}
        guesses={guesses}
        attempts={attempt}
        word={state?.words?.word}
        status={guessChecker}
        style={handleStyle}
        error={handleError}
      />
      {loading && (
        <input
          className={errorStyle}
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={5}
          disabled={status}
        />
      )}
      {guessChecker && (
        <Confetti
          width={windowSize.current[0]}
          height={windowSize.current[1]}
          tweenDuration={5000}
          numberOfPieces={2000}
          recycle={false}
        />
      )}
      <BaseBoard guesses={guesses} loading={handleLoading} />
    </div>
  );
}

export default App;
