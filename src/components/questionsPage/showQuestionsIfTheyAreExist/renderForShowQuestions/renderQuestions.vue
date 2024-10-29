<script setup>
import { watch, computed, onMounted } from 'vue'
import { ref } from 'vue'
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore'
import { useRouter } from 'vue-router'
import renderAnswers from './renderAnswers/renderAnswers.vue'

//------------------props------------------//

const props = defineProps({
  data: Object,
})
//--------------------emits------------------//

let emit = defineEmits(['indexOf'])
//------------------pinia-----------------------//

const questionsPinia = useQuestionsPinia()

//------------------variables------------------//

let selectedAnswer = ref(null)
let checkButtons = ref({
  nextButtons: false,
  prevButtons: true,
  countForBtn: 1,
})

let router = useRouter()

//------------------functions------------------//

function numberOfIndex() {
  return questionsPinia.getQuestionsData.indexOf(props.data)
}
function plusCountBtn() {
  checkButtons.value.countForBtn +=1
}

function minusCountBtn() {
  if (checkButtons.value.countForBtn === 1) {
    return
  } else {
    --checkButtons.value.countForBtn
  }
}

function checkButtonsFn(newVal) {
  const lengthOfArray = questionsPinia.getQuestionsDataLength
  const count = newVal || checkButtons.value.countForBtn
  checkButtons.value.nextButtons = count === lengthOfArray
  checkButtons.value.prevButtons = count === 1
}

function saveAnswer() {
  if (selectedAnswer.value === null) {
    props.data.selectedAnswer = ''
  } else {
    props.data.selectedAnswer = selectedAnswer.value
  }
  questionsPinia.saveAnswersFn(props.data)
}

function sendDataForshowNextQuestion() {
  emit('indexOf', numberOfIndex() + 1)
}

function nexQuestion() {
  saveAnswer()
  plusCountBtn()
  sendDataForshowNextQuestion()
  selectedAnswer.value = getSavedAnswer(numberOfIndex() + 1)
}
function sendDataForshowPrevQuestion() {
  emit('indexOf', numberOfIndex() - 1)
}


function prevQuestion() {
  minusCountBtn()
  sendDataForshowPrevQuestion()
  selectedAnswer.value = getSavedAnswer(numberOfIndex() - 1)
}

function getSavedAnswer(index) {
  const savedAnswer = questionsPinia.saveAnswers[index];
  return savedAnswer ? savedAnswer.selectedAnswer : null;
}

function setQueryParams(props) {
  router.push(`?${props}`)
}

function finishQuizFn() {
  saveAnswer()
  setQueryParams(`page=showQuizResult`)
}
//------------------watch---------------------//

watch(selectedAnswer, newVal => {
  selectedAnswer.value = newVal
})

watch(
  () => checkButtons.value.countForBtn,
  newVal => {
    checkButtonsFn(newVal)
  },
)

//------------------computed------------------//

let randomAnswersComputed = computed(() => {
  let answers = [...props.data.incorrect_answers]
  answers.push(props.data.correct_answer)
  answers.sort(() => Math.random() - 0.5)
  return answers
})

//------------------mounted------------------//

onMounted(() => {
  checkButtonsFn()
})
</script>

<template>
  <div class="question">
    <h1 v-html="props.data.question"></h1>
  </div>
  <div class="answers">
    <renderAnswers v-for="(items, index) in randomAnswersComputed" :id="[selectedAnswer == items && 'focusOnSeleletedAnswer']" :key="index" :data="items" :index="index + 1" @selectedAnswer="(data) => selectedAnswer = data" />
  </div>
  <div class="logicalButtons">
    <div class="changeQuestion">
      <button
        :disabled="checkButtons.prevButtons"
        :class="[checkButtons.prevButtons && 'dissabledYelloColor']"
        @click="prevQuestion"
      >
        Previous Question
      </button>
      <button
        :disabled="checkButtons.nextButtons"
        :class="[checkButtons.nextButtons && 'dissabledBlueColor']"
        @click="nexQuestion"
      >
        Next Question
      </button>
    </div>
    <div class="submitAnswer">
      <button @click="finishQuizFn">Finish Quiz</button>
    </div>
  </div>
  <div class="typeOfQuestions">
    <h3>Type : {{ props.data.type }}</h3>
    <h3>Dificulty : {{ props.data.difficulty }}</h3>
    <h3>Category : {{ props.data.category }}</h3>
  </div>
</template>
