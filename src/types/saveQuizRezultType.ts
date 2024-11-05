import type { QuestionData } from "./sameTypes/sameTypes";

export interface saveQuizRezult {
    correctAnswers? : number,
    inCorrectAnswers ?: number,
    savedAnswers ?: QuestionData[]
}