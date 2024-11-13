<script setup lang="ts">
import type { ShowCorrectAndIncorrectAnswersProps } from '@/types/Props/Props';

const props = defineProps<ShowCorrectAndIncorrectAnswersProps>()
</script>

<template>
  <div class="correctAnswers">
    <h1>correctAnswers: {{ props.savedAnswer.correctAnswers }}</h1>
  </div>
  <div class="incorrectAnswers">
    <h1>incorrectAnswers: {{ props.savedAnswer.inCorrectAnswers }}</h1>
  </div>
</template>
