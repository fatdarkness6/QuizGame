<script setup lang="ts">
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore';
import { onMounted, ref } from 'vue'
import renderQuestions from './renderForShowQuestions/renderQuestions.vue'
import type { QuestionsData } from '@/types/showQuestionsIfTheyAreExistType/showQuestionsIfTheyAreExistType';


//----------------variables---------------------//

const questionsData = ref<QuestionsData>({
  questions: [],
  numberOfQuestions: 0,
})

//---------------------pinia---------------------//
const questionsPinia = useQuestionsPinia()

//--------------------functions------------------//

function showNextData(index: number) {
  if (index !== undefined) {
    questionsData.value.questions.splice(
      0,
      1,
      questionsPinia.getQuestionsData[index] as never,
    )
  } else {
    questionsData.value.questions.splice(
      0,
      1,
      questionsPinia.getQuestionsData[0] as never,
    )
  }
}
//--------------------mounted------------------//

onMounted(() => {
  showNextData(0)
})
</script>

<template>
  <div class="showQuestions">
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
</template>
