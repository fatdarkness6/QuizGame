import type { QuestionData } from './commonTypes/sameTypes'

export interface saveQuizRezult {
  correctAnswers?: number
  inCorrectAnswers?: number
  savedAnswers?: QuestionData[]
}
