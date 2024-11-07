import type { QuestionsData } from "./showQuestionsIfTheyAreExistType";
  export interface NameAndLastName {
    name: string;
    lastName: string;
    rightAnswer?: number,
    wrongAnswers?: number,
    answers?: QuestionsData[]; 
    id ? : string;
  }