import { defineStore } from 'pinia'
import axios from 'axios'

const useQuestionsPinia = defineStore('store', {
  state: () => ({
    questionsData: [],
    saveAnswers: [],
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
        this.saveAnswers.splice(findIndex, 1)
      }else {
        this.saveAnswers.push(props)
      }
    }
  },
  getters: {
    getQuestionsData: (data) => data.questionsData,
    getQuestionsDataLength: (data) => data.questionsData.length,
  }
})

export { useQuestionsPinia }
