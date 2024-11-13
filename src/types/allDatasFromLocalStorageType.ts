import type { reusebleQuestionData } from './commonTypes/commonTypes'
export interface AllDatasFromLocalStorageType {
  id: string
  name: string
  lastName: string
  score: number
  fetchDatas: reusebleQuestionData[]
  saveItemsIndex: number
  correctAnswers?: number
  inCorrectAnswers?: number
  savedAnswers?: reusebleQuestionData[]
}
