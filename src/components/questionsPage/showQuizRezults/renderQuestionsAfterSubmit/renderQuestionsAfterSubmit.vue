<script setup lang="ts">
import renderIncorrectAnswer from './renderIncorrectAnswers/renderIncorrectAnswer.vue';

//--------------------types-----------------//

interface Props {
  data: {
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correct_answer: string ,
    incorrect_answers: string[],
    selectedAnswer?: string ,  // Optional if not always set
  }
  index : number
}

const props = defineProps<Props>()

</script>

<template>
  <div class="questions">
    <h3 v-html="`${props.index}_  ${data.question}`"></h3>
  </div>
  <div class="answer">
    <h2 v-html="props.data.correct_answer" class="correctAnswerTxt"></h2>
    <renderIncorrectAnswer v-for="(items , index) in props.data.incorrect_answers" :key="index" :data='items' :correctAnswer="props.data.correct_answer" :selectedAnswer="props.data.selectedAnswer || ''"/>
  </div>
</template>


