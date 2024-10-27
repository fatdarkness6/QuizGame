<script setup>
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore'
import { onMounted, ref } from 'vue'
import renderQuestions from './renderForShowQuestions/renderQuestions.vue'

//----------------variables---------------------//

let questionsData = ref({
  questions: [],
  numberOfQuestions: 0,
})

//---------------------pinia---------------------//
const questionsPinia = useQuestionsPinia()

//--------------------functions------------------//

function showNextData(index) {
  if (index) {
    questionsData.value.questions.splice(
      0,
      1,
      questionsPinia.getQuestionsData[index],
    )
  } else {
    questionsData.value.questions.splice(
      0,
      1,
      questionsPinia.getQuestionsData[0],
    )
  }
}
//--------------------mounted------------------//

onMounted(() => {
  showNextData()
})
</script>

<template>
  <div class="showQuestions">
    <div class="wrapper">
      <div class="part1">
        <h1>Quiz</h1>
      </div>
      <div class="part2">
        <renderQuestions
          v-for="(items, index) in questionsData.questions"
          :key="index"
          :data="items"
          @indexOf="showNextData"
        />
      </div>
    </div>
  </div>
</template>
