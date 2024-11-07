import type { QuestionData } from './commonTypes/sameTypes'

export interface User {
  name: string
  lastName: string
  answers: QuestionData[] // Ensure this matches QuestionData[]
  crAnswers: number
  inCrAnswers: number
  id?: string
}
