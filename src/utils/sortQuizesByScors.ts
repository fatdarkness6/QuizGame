import type { User } from "@/types/sortUsers";

export function sortUsersByScore(users :User[]) :User[]{
    return users.sort((a, b) => {
      // Primary sorting: more `crAnswers`
      if (a.crAnswers !== b.crAnswers) {
        return b.crAnswers - a.crAnswers; // Descending order
      }
      // Secondary sorting: fewer `inCrAnswers`
      if (a.inCrAnswers !== b.inCrAnswers) {
        return a.inCrAnswers - b.inCrAnswers; // Ascending order
      }
      // Tertiary sorting: more questions attempted
      return b.answers.length - a.answers.length; // Descending order
    });
  }