import type { QuestionData } from '@/types/commonTypes/sameTypes'
import type { ResponseFromApi } from '@/types/commonTypes/sameTypes'

export function randomizeAnswers(answers: ResponseFromApi) {
  let options
  let correctAnswers

  answers.data?.results?.map((e: QuestionData) => {
    options = e.incorrect_answers
    correctAnswers = e.correct_answer
    
    options.push(correctAnswers)
    options.sort(() => Math.random() - 0.5)
  })
}
