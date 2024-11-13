<script setup lang="ts">
import type { RenderAnswerData } from '@/types/commonTypes/commonTypes'
import type { AnswerEmit } from '@/types/renderAnswersType'

const props = defineProps<RenderAnswerData>()
const emit = defineEmits<AnswerEmit>()

function selectedAnswerFn() {
  emit('selectedAnswer', props.data)
}
</script>

<template>
  <div class="answer" @click="selectedAnswerFn">
    <button v-html="`${props.index}. ${props.data}`"></button>
  </div>
</template>
