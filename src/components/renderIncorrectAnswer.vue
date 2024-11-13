<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { RenderAnswerData } from '@/types/commonTypes/commonTypes'

const props = defineProps<RenderAnswerData>()

const isEqualSelectedAnswer = ref<boolean>(false)
const isCorrectAnswer = ref<boolean>(false)

function checkSelectedAnswer() {
  if (props.data === props.selectedAnswer) {
    isEqualSelectedAnswer.value = true
  }
  if (props.data === props.correctAnswer) {
    isCorrectAnswer.value = true
  }
}

onMounted(() => {
  checkSelectedAnswer()
})
</script>

<template>
  <h2 v-if="isCorrectAnswer" v-html="props.data" class="correctAnswerTxt"></h2>
  <h2
    v-else-if="isEqualSelectedAnswer"
    class="incorrectAnswerTxt"
    v-html="props.data"
  ></h2>
  <h2 v-else v-html="props.data" class="incorrectAnswersDEFULT"></h2>
</template>
