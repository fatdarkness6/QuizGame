
  export interface NameAndLastName {
    name: string;
    lastName: string;
    crAnswers?: number,
    inCrAnswers?: number,
    answers?: {
      type: string;
      difficulty: string;
      category: string;
      question: string;
      correct_answer: string;
      incorrect_answers: string[];
      selectedAnswer?: string;
    }[]; 
  }