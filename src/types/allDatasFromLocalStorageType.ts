import type { QuestionData } from "./sameTypes/sameTypes"
export interface AllDatasFromLocalStorageType {
  id: string
  name: string
  lastName: string
  score: number
  fetchDatas: QuestionData[]
  numberOfIndex: number,
  correctAnswers ? : number,
  inCorrectAnswers ?: number
  savedAnswers ?: QuestionData[]
}