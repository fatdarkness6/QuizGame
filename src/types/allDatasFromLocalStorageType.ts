import type { QuestionData } from './commonTypes/sameTypes'
export interface AllDatasFromLocalStorageType {
  id: string
  name: string
  lastName: string
  score: number
  fetchDatas: QuestionData[]
  saveItemsIndex: number
  correctAnswers?: number
  inCorrectAnswers?: number
  savedAnswers?: QuestionData[]
}
