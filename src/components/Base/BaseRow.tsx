import React, { useEffect, useState, useCallback } from "react";
import BaseTile from "./BaseTile";
import "./../../App.css";
import { guess } from "../../types/index";
import store from "../../store";

export default function BaseRow({ word }: { word: string }) {
  const [status, setStatus] = useState(false);
  const state = store.getState();
  const wordArr = word?.split("");

  return (
    <div className="flex justify-center row gap-x-2">
      {word == "" ? (
        <>
          <BaseTile letter={""} word={"_____"} actualLetter={"_"} />

          <BaseTile letter={""} word={"_____"} actualLetter={"_"} />

          <BaseTile letter={""} word={"_____"} actualLetter={"_"} />

          <BaseTile letter={""} word={"_____"} actualLetter={"_"} />

          <BaseTile letter={""} word={"_____"} actualLetter={"_"} />
        </>
      ) : (
        wordArr.map((el, index) => {
          return (
            <BaseTile
              word={state.words?.word}
              key={index}
              actualLetter={state.words?.word[index]}
              letter={word[index]}
            />
          );
        })
      )}
    </div>
  );
}
