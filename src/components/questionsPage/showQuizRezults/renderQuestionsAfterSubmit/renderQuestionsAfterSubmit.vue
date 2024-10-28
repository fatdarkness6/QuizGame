<script setup>

const props = defineProps({
  data: Object,
  index : Number
})
//--------------------computed------------------//

console.log(props.data)
</script>

<template>
  <div class="questions">
    <h3 v-html="`${props.index}_  ${data.question}`"></h3>
  </div>
  <div class="answer">
    <h2 v-html="props.data.correct_answer" class="correctAnswerTxt"></h2>
    <div v-for="(items , index) in props.data.incorrect_answers" :key="index" class="incorrectAnswerTxt">
      <h2  v-html="items"></h2>
    </div>
  </div>
</template>


