import type { QuestionData } from "./sameTypes/sameTypes";

export interface User {
    name: string;
    lastName: string;
    answers: QuestionData[];  // Ensure this matches QuestionData[]
    crAnswers: number;
    inCrAnswers: number;
  }