<script setup lang="ts">
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore'
import renderReusebleQuestionsAfterSubmit from '@/components/questionsPage/showQuizRezults/renderQuestionsAfterSubmit/renderReusebleQuestionsAfterSubmit.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import _ from 'lodash'

//---------------------pinia---------------------//

const questionsPinia = useQuestionsPinia()

//--------------------variables------------------//

const router = useRouter()

const savedAnswer = ref<object>({})

//--------------------function-------------------//

function resetQuery() {
  router.push(`/`)
  questionsPinia.makeEmptySaveAnswersValue()
}

function slelectLastArrayFromLocalStorage() {
  if(_.isEmpty(questionsPinia.UserDataFromLocalStorage)) {
    router.push(`/`)
  }else {
    savedAnswer.value = questionsPinia.UserDataFromLocalStorage?.at(-1);
  }
}

function setDataToLocalStorage() {
  if(questionsPinia.getUserDetails.name || questionsPinia.getUserDetails.lastName ) {
    questionsPinia.setDatasInLocalStorage()
  }else {
    return 
  }
}
//--------------------mouted---------------------//

onMounted(() => {
  questionsPinia.calculateResults()
  setDataToLocalStorage()
  questionsPinia.getUserDataFromLocalStorage()
  slelectLastArrayFromLocalStorage()
  questionsPinia.removeAllQuestionsFromLocalStorage()
})
</script>

<template>
  <div class="wrapper">
    <div class="flx-column-center gap-20">
      <div class="correctAnswers">
        <h1>correctAnswers: {{ savedAnswer?.crAnswers }}</h1>
      </div>
      <div class="incorrectAnswers">
        <h1>incorrectAnswers: {{ savedAnswer?.inCrAnswers }}</h1>
      </div>
    </div>
    <div class="showQuestionsAfterSubmit">
      <renderReusebleQuestionsAfterSubmit
        v-for="(items, index) in savedAnswer.answers"
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
