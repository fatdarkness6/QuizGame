import { defineStore } from 'pinia'
import axios from 'axios'

const useQuestionsPinia = defineStore('store', {
  state: () => ({
    questionsData: [],
    saveAnswers: [],
    correctAnswers : 0,
    inCorrectAnswers: 0
  }),
  actions: {
    async setQuestionsData(data) {
      await axios
        .get(`https://opentdb.com/api.php?amount=${data}`)
        .then(res => {
          this.questionsData = res.data.results
        })
    },
    saveAnswersFn(props) {
      let findIndex = this.saveAnswers.indexOf(props)
      if (findIndex !== -1) {
        this.saveAnswers.splice(findIndex, 1 , props)
      }else {
        this.saveAnswers.push(props)
      }
    },
    calculateResults() {
      let numberOfQuiz = this.saveAnswers.length
      let correctQuizAnswers = this.saveAnswers.filter((e) => {
        return e.correct_answer == e.selectedAnswer
      })
      this.correctAnswers = correctQuizAnswers.length
      this.inCorrectAnswers = (numberOfQuiz - correctQuizAnswers.length)
    }
  },
  getters: {
    getQuestionsData: (data) => data.questionsData,
    getQuestionsDataLength: (data) => data.questionsData.length,
    getCorrectAnswers: (data) => data.correctAnswers,
    getIncorrectAnswers: (data) => data.inCorrectAnswers,
    getsaveAnswers : (data) => data.saveAnswers
  }
})

export { useQuestionsPinia }
