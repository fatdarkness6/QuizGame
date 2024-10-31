import type { QuestionData } from "@/types/createQuestionsPiniaStoreType"
import type { ResponseFromApi } from "@/types/sameTypes/sameTypes"

export function randomizeAnswers(answers : ResponseFromApi) {
  answers.data?.results?.map((e : QuestionData) => {
    e.incorrect_answers.push(e.correct_answer)
    e.incorrect_answers.sort(() => Math.random() - 0.5)
  })
}