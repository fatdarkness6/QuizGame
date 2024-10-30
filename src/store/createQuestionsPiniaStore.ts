import { defineStore } from 'pinia'
import axios from 'axios'
import type { QuestionData , NameAndLastName } from '@/types/createQuestionsPiniaStoreType'
import _ from 'lodash'

const useQuestionsPinia = defineStore('store', {
  state: () => ({
    questionsData: [] as QuestionData[],  // Define questionsData type
    saveAnswers: [] as QuestionData[],
    userDetails : {} as  NameAndLastName,
    userDataFromLocalStorage : [] ,
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
    makeEmptyQuestionsValue() {
      this.questionsData = []
    },
    saveAnswersFn(props : QuestionData)  {
      const findIndex = this.saveAnswers.indexOf(props)
      if (findIndex !== -1) {
        this.saveAnswers.splice(findIndex, 1 , props)
      }else {
        this.saveAnswers.push(props)
      }
    },
    setNameAndLastName(data : NameAndLastName) {
      this.userDetails = data
    },
    setDatasInLocalStorage() {
        const userStorage = JSON.parse(localStorage.getItem('userData') || '[]');

        this.userDetails = {
          ...this.userDetails,
          answers: this.saveAnswers,
          crAnswers: this.correctAnswers,
          inCrAnswers: this.inCorrectAnswers,
        };

        // Check if userStorage is empty and push `userDetails` to it
        const updatedStorage = _.isEmpty(userStorage) ? [this.userDetails] : [...userStorage, this.userDetails];

        // Save updated data back to localStorage
        localStorage.setItem('userData', JSON.stringify(updatedStorage));
},
    calculateResults() {
      const numberOfQuiz = this.saveAnswers.length
      const correctQuizAnswers = this.saveAnswers.filter((e : QuestionData) => {
        return e.correct_answer == e.selectedAnswer
      })
      this.correctAnswers = correctQuizAnswers.length
      this.inCorrectAnswers = (numberOfQuiz - correctQuizAnswers.length)
    },
    getUserDataFromLocalStorage() {
      const data = localStorage.getItem('userData')
      if (data) {
        this.userDataFromLocalStorage = JSON.parse(data) 
      } else {
        this.userDataFromLocalStorage = []
      }
    }
  },
  getters: {
    getQuestionsData: (state) => state.questionsData,
    getQuestionsDataLength: (state) => state.questionsData.length,
    getCorrectAnswers: (state) => state.correctAnswers,
    getIncorrectAnswers: (state) => state.inCorrectAnswers,
    getsaveAnswers : (state) => state.saveAnswers,
    UserDataFromLocalStorage : (state) => state.userDataFromLocalStorage
  }
})

export { useQuestionsPinia }
