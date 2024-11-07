import type { QuestionData } from '@/types/commonTypes/sameTypes'
import type { ResponseFromApi } from '@/types/commonTypes/sameTypes'
import { generateId } from './generateId'

export function randomizeAnswers(answers: ResponseFromApi) {
  let options
  let correctAnswers

  answers.data?.results?.map((e: QuestionData) => {
    options = e.incorrect_answers
    correctAnswers = e.correct_answer

    const copyData = [...options, correctAnswers]
    const data = copyData.sort(() => Math.random() - 0.5)
     e['options'] = data
  })
}

export function addIdToItems(ftchData : ResponseFromApi) {

  ftchData.data?.results?.map((e: QuestionData) => {
     e.id = generateId()
  })
}
