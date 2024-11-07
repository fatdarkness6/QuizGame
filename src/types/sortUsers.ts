import type { QuestionData } from './commonTypes/sameTypes'

export interface User {
  name: string
  lastName: string
  answers: QuestionData[] // Ensure this matches QuestionData[]
  rightAnswer: number
  wrongAnswers: number
  id?: string
}
