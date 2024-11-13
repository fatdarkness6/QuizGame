import type { reusebleQuestionData } from './commonTypes/commonTypes'

export interface User {
  name: string
  lastName: string
  answers: reusebleQuestionData[] 
  rightAnswer: number
  wrongAnswers: number
  id?: string
}
