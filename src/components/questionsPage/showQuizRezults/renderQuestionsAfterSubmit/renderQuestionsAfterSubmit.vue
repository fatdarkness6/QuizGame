<script setup>
import renderIncorrectAnswer from './renderIncorrectAnswers/renderIncorrectAnswer.vue';



const props = defineProps({
  data: Object,
  index : Number
})

</script>

<template>
  <div class="questions">
    <h3 v-html="`${props.index}_  ${data.question}`"></h3>
  </div>
  <div class="answer">
    <h2 v-html="props.data.correct_answer" class="correctAnswerTxt"></h2>
    <renderIncorrectAnswer v-for="(items , index) in props.data.incorrect_answers" :key="index" :data='items' :correctAnswer="props.data.correct_answer" :selectedAnswer="props.data.selectedAnswer"/>
  </div>
</template>


