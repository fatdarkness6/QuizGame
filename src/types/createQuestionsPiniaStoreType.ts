export interface QuestionData {
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
    selectedAnswer?: string,  // Optional if not always set
  }

  