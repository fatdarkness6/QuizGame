import type { saveQuizRezult } from "../saveQuizRezultType";
import type { FromValue } from "../questionsPageComponentType"

export interface ShowCorrectAndIncorrectAnswersProps {
    savedAnswer: saveQuizRezult
}

export interface SubmitFormProps {
    formValue : FromValue,
    loading : boolean
}