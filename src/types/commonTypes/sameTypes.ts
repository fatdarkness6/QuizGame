export interface QuestionData {
  type: string
  difficulty: string
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
  options?: string[]
  selectedAnswer?: string
  id?: string
}
export interface Props {
  data: QuestionData,
  index ? : number
}

export interface RenderAnswerData {
  data: string
  index?: number
  correctAnswer?: string
  selectedAnswer?: string
}

export interface ResponseFromApi {
  data: {
    results: QuestionData[]
  }
}
