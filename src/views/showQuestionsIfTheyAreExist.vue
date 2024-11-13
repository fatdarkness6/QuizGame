<script setup lang="ts">
import { useQuestionsPinia } from '@/store/questionsStore'
import { onBeforeMount, ref } from 'vue'
import renderQuestions from '@/components/renderQuestions.vue'
import type { QuestionsData } from '@/types/showQuestionsIfTheyAreExistType'

const questionsData = ref<QuestionsData>({
  selectedQuestion: {
    type: '',
    difficulty: '',
    category: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
  },
  numberOfQuestions: 0,
})
const questionsPinia = useQuestionsPinia()

function showNextData(index: number) {
  questionsPinia.getAllQuestionsFromLocalStorage()
  questionsData.value.selectedQuestion =
    questionsPinia.getAllQuestionsFromLocalST.fetchDatas[index]
}

function checkIndexFromLocalStorageIsExist() {
  const data = questionsPinia.getAllQuestionsFromLocalST.saveItemsIndex
  if (data) {
    return data
  } else {
    return 0
  }
}

///--------------------beforeMounted------------------//
onBeforeMount(() => {
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
          :data="questionsData.selectedQuestion"
          @indexOf="showNextData"
        />
      </div>
    </div>
  </div>
</template>
