import { defineStore } from 'pinia'
import axios from 'axios'
import type { NameAndLastName } from '@/types/createQuestionsPiniaStoreType'
import type { reusebleQuestionData } from '@/types/commonTypes/commonTypes'
import _ from 'lodash'
import {
  randomizeAnswers,
  addIdToItems,
} from '../utils/importantThingsBeforeSetDataToLocalST'
import { sortUsersByScore } from '../utils/sortQuizesByScors'
import type { User } from '../types/sortUsers'
import { generateId } from '../utils/generateId'
import type { AllDatasFromLocalStorageType } from '../types/allDatasFromLocalStorageType'
import { parseQuestions } from '../utils/parseDatasFromLocalStorage'

const useQuestionsPinia = defineStore('store', {
  state: () => ({
    questionsData: [] as reusebleQuestionData[],
    saveAnswers: [] as reusebleQuestionData[],
    userDetails: {} as NameAndLastName,
    userDataFromLocalStorage: [] as User[],
    allQuestionsDataFromLocalStorage: {
      id: '',
      name: '',
      lastName: '',
      score: 0,
      fetchDatas: [] as reusebleQuestionData[],
      saveItemsIndex: 0,
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
          addIdToItems(res)
          this.questionsData = res?.data?.results
        })
    },
    makeEmptySaveAnswersValue() {
      this.saveAnswers = []
    },

    saveAnswersFn(props: reusebleQuestionData, index: number) {
      const questions = parseQuestions()
      const findIndex = this.saveAnswers.findIndex(
        item => item.question === props.question,
      )
      if (findIndex !== -1) {
        if (!props.selectedAnswer) {
          this.saveAnswers.splice(findIndex, 1)
        } else {
          this.saveAnswers.splice(findIndex, 1, props)
        }
      } else {
        if (!props.selectedAnswer) {
          return
        } else {
          this.saveAnswers.push(props)
        }
      }
      questions.saveItemsIndex = index
      questions.savedAnswers = this.saveAnswers
      localStorage.setItem('questions', JSON.stringify(questions))
    },

    setSaveAnswerFromLocalStorage() {
      const questions = parseQuestions()
      const check = questions.savedAnswers ? questions.savedAnswers : []
      this.saveAnswers = check
    },

    setNameAndLastName(data: NameAndLastName) {
      this.userDetails = data
    },

    setDatasInLocalStorage() {
      const userStorage = JSON.parse(localStorage.getItem('userData') || '[]')
      const questionsStorage = parseQuestions()
      this.userDetails = {
        name: questionsStorage.name,
        lastName: questionsStorage.lastName,
        answers: questionsStorage.savedAnswers,
        rightAnswer: questionsStorage.correctAnswers,
        wrongAnswers: questionsStorage.inCorrectAnswers,
        id: questionsStorage.id,
      }
      const preventDuplicate = userStorage.find(
        (item: reusebleQuestionData) => item.id === this.userDetails.id,
      )
      const updatedStorage = _.isEmpty(userStorage)
        ? [this.userDetails]
        : preventDuplicate
          ? userStorage
          : [...userStorage, this.userDetails]

      localStorage.setItem('userData', JSON.stringify(updatedStorage))
    },
    setAllQuestionsToLocalStorage() {
      const data = {
        ...this.userDetails,
        fetchDatas: this.questionsData,
        id: generateId(),
        saveItemsIndex: 0,
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
      const questions = parseQuestions()
      const numberOfQuiz = questions.savedAnswers?.length
      const correctQuizAnswers = questions.savedAnswers?.filter(
        (e: reusebleQuestionData) => {
          return e.correct_answer == e.selectedAnswer
        },
      )
      questions.correctAnswers = correctQuizAnswers?.length
      questions.inCorrectAnswers = numberOfQuiz - correctQuizAnswers?.length
      localStorage.setItem('questions', JSON.stringify(questions))
    },
  },

  getters: {
    UserDataFromLocalStorage: state => state.userDataFromLocalStorage,
    getAllQuestionsFromLocalST: state => state.allQuestionsDataFromLocalStorage,
  },
})

export { useQuestionsPinia }
