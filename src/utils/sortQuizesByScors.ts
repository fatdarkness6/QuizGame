import type { User } from "@/types/sortUsers";

export function sortUsersByScore(users :User[]) :User[]{
    return users.sort((a, b) => {
      if (a.rightAnswer !== b.rightAnswer) {
        return b.rightAnswer - a.rightAnswer; 
      }
      if (a.wrongAnswers !== b.wrongAnswers) {
        return a.wrongAnswers - b.wrongAnswers; 
      }
      return b.answers.length - a.answers.length;
    });
  }