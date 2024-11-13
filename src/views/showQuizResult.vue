<script setup lang="ts">
import { useQuestionsPinia } from '@/store/questionsStore'
import RenderReusebleQuestionsAfterSubmit from '@/components/renderReusebleQuestionsAfterSubmit.vue'
import ShowCorrectAndIncorrectAnswers from '@/components/showCorrectAndIncorrectAnswers.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { saveQuizRezult } from '@/types/saveQuizRezultType'
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
    <div class="flx-column-center gap-20">
      <ShowCorrectAndIncorrectAnswers :savedAnswer="savedAnswer"/>
    </div>
    <div class="showQuestionsAfterSubmit">
      <h1 v-if="!savedAnswer.savedAnswers">you didnt answer the questions</h1>
      <RenderReusebleQuestionsAfterSubmit
        v-else
        v-for="(items, index) in savedAnswer.savedAnswers"
        :key="index"
        :data="items"
        :index="index + 1"
      />
    </div>
    <div class="GoToHomePage">
      <button @click="resetQuery">Go to Home Pgae</button>
    </div>
  </div>
</template>
