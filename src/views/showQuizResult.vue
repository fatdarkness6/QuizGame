<script setup lang="ts">
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore'
import renderReusebleQuestionsAfterSubmit from '@/components/renderQuestionsAfterSubmit/renderReusebleQuestionsAfterSubmit.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { saveQuizRezult } from '@/types/saveQuizRezultType'
import _ from 'lodash'

//---------------------pinia---------------------//

const questionsPinia = useQuestionsPinia()

//--------------------variables------------------//

const router = useRouter()

const savedAnswer = ref<saveQuizRezult>({})

//--------------------function-------------------//

function resetQuery() {
  router.replace(`/`)
  questionsPinia.makeEmptySaveAnswersValue()
}

function slelectLastArrayFromLocalStorage() {
  if(_.isEmpty(questionsPinia.getAllQuestionsFromLocalST)) {
    router.replace(`/`)
  }else {
    savedAnswer.value = questionsPinia.getAllQuestionsFromLocalST;
  }
}

function setDataToLocalStorage() {
  if(!_.isEmpty(questionsPinia.getAllQuestionsFromLocalST)) {
    questionsPinia.setDatasInLocalStorage()
  }
}
//--------------------mouted---------------------//

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
      <div class="correctAnswers">
        <h1>correctAnswers: {{ savedAnswer.correctAnswers }}</h1>
      </div>
      <div class="incorrectAnswers">
        <h1>incorrectAnswers: {{ savedAnswer.inCorrectAnswers }}</h1>
      </div>
    </div>
    <div class="showQuestionsAfterSubmit">
      <renderReusebleQuestionsAfterSubmit
        v-for="(items, index) in savedAnswer.savedAnswers"
        :key="index"
        :data="items"
      />
    </div>
    <div class="GoToHomePage">
      <button @click="resetQuery">Go to Home Pgae</button>
    </div>
  </div>
</template>
