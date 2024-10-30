export interface UserInfoPropsType {
    
    data: {
        name: string,
        lastName : string,
        answers: Array<{
            type: string;
            difficulty: string;
            category: string;
            question: string;
            correct_answer: string;
            incorrect_answers: string[];
            selectedAnswer?: string; // Optional
        }> | undefined;
        crAnswers: number,
        inCrAnswers: number,
    },
}