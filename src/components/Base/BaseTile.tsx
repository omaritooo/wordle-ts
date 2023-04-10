import React, { useEffect, useState } from "react";

export default function BaseTile({
  letter,
  actualLetter,
  word,
}: {
  letter: string;
  actualLetter: string;
  word: string;
}) {
  const [color, setColour] = useState(false);
  const [style, setStyle] = useState(``);

  useEffect(() => {
    if (letter?.toUpperCase() === actualLetter?.toUpperCase()) {
      setStyle(`green`);
      setStyle(`rounded-md h-10 w-10 shadow-sm p-2 green uppercase`);
    } else if (
      word.includes(letter?.toUpperCase()) &&
      letter?.toUpperCase() !== actualLetter
    ) {
      setStyle(`rounded-md h-10 w-10 shadow-sm p-2 yellow uppercase`);
    } else {
      setStyle(`rounded-md h-10 w-10 shadow-sm p-2 grey uppercase`);
    }
    if (letter == "") {
      setStyle(`rounded-md h-10 w-10 shadow-sm p-2 grey text-black uppercase `);
    }
  }, [letter]);
  return (
    <>
      <div className={style}>{letter}</div>
    </>
  );
}
