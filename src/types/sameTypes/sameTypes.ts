export interface QuestionData {
  type: string,
  difficulty: string,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
  selectedAnswer?: string,  
}
export interface Props {
    data: {
      type: string,
      difficulty: string,
      category: string,
      question: string,
      correct_answer: string,
      incorrect_answers: string[],
      selectedAnswer?: string | undefined,  // Optional if not always set
    },
    index?: number
  }

  export interface RenderAnswerData {
    data: string,
    index?: number,
    correctAnswer?: string,
    selectedAnswer?: string
  }

  export interface ResponseFromApi {
    data: {
      results: QuestionData[];
    };
  }
