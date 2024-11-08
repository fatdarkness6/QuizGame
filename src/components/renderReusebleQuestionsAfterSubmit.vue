<script setup lang="ts">
import renderIncorrectAnswer from './renderIncorrectAnswer.vue';
import type { Props } from '@/types/commonTypes/sameTypes'

const props = defineProps<Props>()
</script>

<template>
  <div class="questions">
    <h3 v-html="`${props.index}_  ${data.question}`"></h3>
  </div>
  <div class="answer">
    <renderIncorrectAnswer
      v-for="(items, index) in props.data.options"
      :key="index"
      :data="items"
      :correctAnswer="props.data.correct_answer"
      :selectedAnswer="props.data.selectedAnswer || ''"
    />
  </div>
</template>
