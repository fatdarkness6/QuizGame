import { createWebHistory, createRouter } from 'vue-router'
import questionsPageComponent from '@/views/questionsPageComponent.vue'
import showHowManyUserParticipateInQuiz from '@/views/showHowManyUserParticipateInQuiz.vue'
import showQuestionsIfTheyAreExist from '@/views/showQuestionsIfTheyAreExist.vue'
import ShowQuizResult from '@/views/showQuizResult.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: questionsPageComponent,
      },
      {
        path : '/questions',
        component : showQuestionsIfTheyAreExist
      },
      {
        path : '/quiz-rezult',
        component : ShowQuizResult
      },
      {
        path : "/user-info",
        component : showHowManyUserParticipateInQuiz
      }
    ]
  })