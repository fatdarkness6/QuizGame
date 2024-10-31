import { defineStore } from 'pinia'
import axios from 'axios'
import type { NameAndLastName } from '@/types/createQuestionsPiniaStoreType'
import type { QuestionData } from '@/types/sameTypes/sameTypes'
import _ from 'lodash'
import { randomizeAnswers } from '@/utils/randomizeAnswers'
import { sortUsersByScore } from '@/utils/sortQuizesByScors'
import type { User } from '@/types/sortUsers'

const useQuestionsPinia = defineStore('store', {
  state: () => ({
    questionsData: [] as QuestionData[],
    saveAnswers: [] as QuestionData[],
    userDetails: {} as NameAndLastName,
    userDataFromLocalStorage: [] as User[],
    allQuestionsDataFromLocalStorage: [] as QuestionData[],
    correctAnswers: 0,
    inCorrectAnswers: 0,
  }),
  actions: {
    async setQuestionsData(data: number) {
      await axios
        .get(`https://opentdb.com/api.php?amount=${data}`)
        .then(res => {
          randomizeAnswers(res)
          this.questionsData = res?.data?.results
        })
    },
    makeEmptyQuestionsValue() {
      this.questionsData = []
    },
    makeEmptySaveAnswersValue() {
      this.saveAnswers = []
    },
    saveAnswersFn(props: QuestionData) {
      const findIndex = this.saveAnswers.indexOf(props)
      if (findIndex !== -1) {
        this.saveAnswers.splice(findIndex, 1, props)
      } else {
        this.saveAnswers.push(props)
      }
    },
    setNameAndLastName(data: NameAndLastName) {
      this.userDetails = data
    },
    setDatasInLocalStorage() {
      const userStorage = JSON.parse(localStorage.getItem('userData') || '[]')
      this.userDetails = {
        ...this.userDetails,
        answers: this.saveAnswers,
        crAnswers: this.correctAnswers,
        inCrAnswers: this.inCorrectAnswers,
      }
      const updatedStorage = _.isEmpty(userStorage)
        ? [this.userDetails]
        : [...userStorage, this.userDetails]

      localStorage.setItem('userData', JSON.stringify(updatedStorage))
    },
    setAllQuestionsToLocalStorage() {
      const data = this.questionsData
      localStorage.setItem('questions', JSON.stringify(data))
    },
    getAllQuestionsFromLocalStorage() {
      const data = localStorage.getItem('questions')
      if (data) {
        this.allQuestionsDataFromLocalStorage = JSON.parse(data)
      } 
    },
    removeAllQuestionsFromLocalStorage() {
      localStorage.removeItem('questions')
    },
    calculateResults() {
      const numberOfQuiz = this.saveAnswers.length
      const correctQuizAnswers = this.saveAnswers.filter((e: QuestionData) => {
        return e.correct_answer == e.selectedAnswer
      })
      this.correctAnswers = correctQuizAnswers.length
      this.inCorrectAnswers = numberOfQuiz - correctQuizAnswers.length
    },

    getUserDataFromLocalStorage() {
      const data = localStorage.getItem('userData')
      if (data) {
        this.userDataFromLocalStorage = sortUsersByScore(JSON.parse(data))
      } else {
        this.userDataFromLocalStorage = []
      }
    },
  },
  getters: {
    getQuestionsData: state => state.questionsData,
    getQuestionsDataLength: state => state.questionsData.length,
    getCorrectAnswers: state => state.correctAnswers,
    getIncorrectAnswers: state => state.inCorrectAnswers,
    getsaveAnswers: state => state.saveAnswers,
    UserDataFromLocalStorage: state => state.userDataFromLocalStorage,
    getUserDetails: state => state.userDetails,
    getAllQuestionsFromLocalST: state => state.allQuestionsDataFromLocalStorage,
    getAllQuestionsFromLocalSTLength: state => state.allQuestionsDataFromLocalStorage.length,
  },
})

export { useQuestionsPinia }
