import type { reusebleQuestionData } from './commonTypes/commonTypes'

export interface saveQuizRezult {
  correctAnswers?: number
  inCorrectAnswers?: number
  savedAnswers?: reusebleQuestionData[]
}
