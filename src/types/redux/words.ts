export type data = {
    word: string,
    tries: number
}

export type InitialState = {
    words: string[];
    word: string;
    score: number;
    history: data[]
}