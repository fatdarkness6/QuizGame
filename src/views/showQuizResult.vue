<script setup lang="ts">
import { useQuestionsPinia } from '../store/questionsStore'
import ShowQuizComponent from '../components/showQuizComponent.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { saveQuizRezult } from '../types/saveQuizRezultType'
import _ from 'lodash'

const questionsPinia = useQuestionsPinia()
const router = useRouter()
const savedAnswer = ref<saveQuizRezult>({})

function resetQuery() {
  router.replace(`/`)
  questionsPinia.makeEmptySaveAnswersValue()
}

function slelectLastArrayFromLocalStorage() {
  if (_.isEmpty(questionsPinia.getAllQuestionsFromLocalST)) {
    router.replace(`/`)
  } else {
    savedAnswer.value = questionsPinia.getAllQuestionsFromLocalST
  }
}

function setDataToLocalStorage() {
  if (!_.isEmpty(questionsPinia.getAllQuestionsFromLocalST)) {
    questionsPinia.setDatasInLocalStorage()
  }
}

onMounted(() => {
  questionsPinia.calculateResults()
  questionsPinia.getAllQuestionsFromLocalStorage()
  setDataToLocalStorage()
  slelectLastArrayFromLocalStorage()
})
</script>

<template>
  <div class="wrapper">
   <ShowQuizComponent :savedAnswer="savedAnswer" @resetQuery="resetQuery" />
  </div>
</template>
