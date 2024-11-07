import type { User } from "@/types/sortUsers";

export function sortUsersByScore(users :User[]) :User[]{
    return users.sort((a, b) => {
      // Primary sorting: more `rightAnswer`
      if (a.rightAnswer !== b.rightAnswer) {
        return b.rightAnswer - a.rightAnswer; // Descending order
      }
      // Secondary sorting: fewer `wrongAnswers`
      if (a.wrongAnswers !== b.wrongAnswers) {
        return a.wrongAnswers - b.wrongAnswers; // Ascending order
      }
      // Tertiary sorting: more questions attempted
      return b.answers.length - a.answers.length; // Descending order
    });
  }