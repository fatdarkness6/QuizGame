import { defineStore } from 'pinia'
import axios from 'axios'
import type { QuestionData } from '@/types/createQuestionsPiniaStoreType'


const useQuestionsPinia = defineStore('store', {
  state: () => ({
    questionsData: [] as QuestionData[],  // Define questionsData type
    saveAnswers: [] as QuestionData[], 
    correctAnswers : 0,
    inCorrectAnswers: 0
  }),
  actions: {
    async setQuestionsData(data : number) {
      await axios
        .get(`https://opentdb.com/api.php?amount=${data}`)
        .then(res => {
          this.questionsData = res?.data?.results
        })
    },
    saveAnswersFn(props : QuestionData)  {
      const findIndex = this.saveAnswers.indexOf(props)
      if (findIndex !== -1) {
        this.saveAnswers.splice(findIndex, 1 , props)
      }else {
        this.saveAnswers.push(props)
      }
    },
    calculateResults() {
      const numberOfQuiz = this.saveAnswers.length
      const correctQuizAnswers = this.saveAnswers.filter((e : QuestionData) => {
        return e.correct_answer == e.selectedAnswer
      })
      this.correctAnswers = correctQuizAnswers.length
      this.inCorrectAnswers = (numberOfQuiz - correctQuizAnswers.length)
    }
  },
  getters: {
    getQuestionsData: (state) => state.questionsData,
    getQuestionsDataLength: (state) => state.questionsData.length,
    getCorrectAnswers: (state) => state.correctAnswers,
    getIncorrectAnswers: (state) => state.inCorrectAnswers,
    getsaveAnswers : (state) => state.saveAnswers
  }
})

export { useQuestionsPinia }
