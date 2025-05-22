<script setup>
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore'
import renderQuestionsAfterSubmit from './renderQuestionsAfterSubmit/renderQuestionsAfterSubmit.vue';
import { onMounted } from 'vue'


//---------------------pinia---------------------//
const questionsPinia = useQuestionsPinia()

onMounted(() => {
  questionsPinia.calculateResults()
})
</script>

<template>
  <div class="flx-column-center gap-20">
    <div class="correctAnswers">
      <h1>correctAnswers: {{ questionsPinia.getCorrectAnswers }}</h1>
    </div>
    <div class="incorrectAnswers">
      <h1>incorrectAnswers: {{ questionsPinia.getIncorrectAnswers }}</h1>
    </div>
  </div>
    <div class="showQuestionsAfterSubmit">
      <renderQuestionsAfterSubmit v-for="(items , index) in questionsPinia.getsaveAnswers" :key="index" :data="items" :index="index+1" />
    </div>
</template>
