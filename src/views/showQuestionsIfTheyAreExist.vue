<script setup lang="ts">
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore'
import { onMounted, ref } from 'vue'
import renderQuestions from '@/components/renderForShowQuestions/renderQuestions.vue';
import type { QuestionsData } from '@/types/showQuestionsIfTheyAreExistType/showQuestionsIfTheyAreExistType'

//----------------variables---------------------//

const questionsData = ref<QuestionsData>({
  questions: [],
  numberOfQuestions: 0,
})

//---------------------pinia---------------------//

const questionsPinia = useQuestionsPinia()

//--------------------functions------------------//

function showNextData(index: number) {
  questionsPinia.getAllQuestionsFromLocalStorage()
    questionsData.value.questions.splice(
      0,
      1,
      questionsPinia.getAllQuestionsFromLocalST.fetchDatas[index] as never,
    )
}

function checkIndexFromLocalStorageIsExist() {
  const data = questionsPinia.getAllQuestionsFromLocalST.numberOfIndex
  if (data) {
    return data
  }else {
    return 0
  }
}

//--------------------mounted------------------//

onMounted(() => {
  questionsPinia.getAllQuestionsFromLocalStorage()
  showNextData(checkIndexFromLocalStorageIsExist())
})
</script>

<template>
  <div class="wrapper">
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
  </div>
</template>
