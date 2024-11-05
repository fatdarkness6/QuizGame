import { defineStore } from 'pinia'
import axios from 'axios'
import type { NameAndLastName } from '@/types/createQuestionsPiniaStoreType'
import type { QuestionData } from '@/types/sameTypes/sameTypes'
import _ from 'lodash'
import { randomizeAnswers } from '@/utils/randomizeAnswers'
import { sortUsersByScore } from '@/utils/sortQuizesByScors'
import type { User } from '@/types/sortUsers'
import { generateId } from '@/utils/generateId'
import type { AllDatasFromLocalStorageType } from '@/types/allDatasFromLocalStorageType'

const useQuestionsPinia = defineStore('store', {
  state: () => ({
    questionsData: [] as QuestionData[],
    saveAnswers: [] as QuestionData[],
    userDetails: {} as NameAndLastName,
    userDataFromLocalStorage: [] as User[],
    allQuestionsDataFromLocalStorage: {
      id: '',
      name: '',
      lastName: '',
      score: 0,
      fetchDatas: [] as QuestionData[],
      numberOfIndex: 0,
      correctAnswers: 0,
      inCorrectAnswers: 0,
      savedAnswers: [],
    } as AllDatasFromLocalStorageType,
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
    makeEmptySaveAnswersValue() {
      this.saveAnswers = []
    },

    saveAnswersFn(props: QuestionData , index : number) {
      const questions = JSON.parse(localStorage.getItem('questions') || '[]')
      const findIndex = this.saveAnswers.findIndex(item => item.question === props.question)
      if (findIndex !== -1) {
        this.saveAnswers.splice(findIndex, 1, props)
      } else {
        this.saveAnswers.push(props)
      }
      questions.numberOfIndex = index
      questions.savedAnswers = this.saveAnswers
      localStorage.setItem('questions', JSON.stringify(questions))
    },

    setSaveAnswerFromLocalStorage() {
      const questions = JSON.parse(localStorage.getItem('questions') || '[]')
      const check = questions.savedAnswers ? questions.savedAnswers : []
      this.saveAnswers = check
    },

    setNameAndLastName(data: NameAndLastName) {
      this.userDetails = data
    },
    setDatasInLocalStorage() {
      const userStorage = JSON.parse(localStorage.getItem('userData') || '[]')
      const questionsStorage = JSON.parse(localStorage.getItem('questions') || '[]')
      this.userDetails = {
        name : questionsStorage.name,
        lastName : questionsStorage.lastName,
        answers: questionsStorage.savedAnswers,
        crAnswers: questionsStorage.correctAnswers,
        inCrAnswers: questionsStorage.inCorrectAnswers,
        id : questionsStorage.id
      }
      const preventDuplicate = userStorage.find((item :QuestionData) => item.id === this.userDetails.id)
      const updatedStorage = _.isEmpty(userStorage) ? [this.userDetails] : preventDuplicate ? userStorage : [...userStorage, this.userDetails]

      localStorage.setItem('userData', JSON.stringify(updatedStorage))
    },
    setAllQuestionsToLocalStorage() {
      const data = {
        ...this.userDetails,
        fetchDatas : this.questionsData,
        id : generateId(),
        numberOfIndex : 0
      }
      localStorage.setItem('questions', JSON.stringify(data))
    },
    getAllQuestionsFromLocalStorage() {
      const data = localStorage.getItem('questions')
      if (data) {
        this.allQuestionsDataFromLocalStorage = JSON.parse(data)
      } 
    },
    getUserDataFromLocalStorage() {
      const data = localStorage.getItem('userData')
      if (data) {
        this.userDataFromLocalStorage = sortUsersByScore(JSON.parse(data))
      } else {
        this.userDataFromLocalStorage = []
      }
    },
    calculateResults() {
      const questions = JSON.parse(localStorage.getItem('questions') || '[]')
      const numberOfQuiz = questions.savedAnswers?.length
      const correctQuizAnswers = questions.savedAnswers?.filter((e: QuestionData) => {
        return e.correct_answer == e.selectedAnswer
      })
      questions.correctAnswers = correctQuizAnswers?.length
      questions.inCorrectAnswers = numberOfQuiz - correctQuizAnswers?.length
      localStorage.setItem('questions', JSON.stringify(questions))
    },
  },
  getters: {
    getCorrectAnswers: state => state.correctAnswers,
    getIncorrectAnswers: state => state.inCorrectAnswers,
    getsaveAnswers: state => state.saveAnswers,
    UserDataFromLocalStorage: state => state.userDataFromLocalStorage,
    getUserDetails: state => state.userDetails,
    getAllQuestionsFromLocalST: state => state.allQuestionsDataFromLocalStorage,
   getAllQuestionsFromLocalSTLength: state => state.allQuestionsDataFromLocalStorage.fetchDatas.length,
  },
})

export { useQuestionsPinia }
