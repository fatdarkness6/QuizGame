<script setup>
import { onMounted, watch, computed } from 'vue'
import { ref } from 'vue'
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore'

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

//------------------functions------------------//

function numberOfIndex() {
  return questionsPinia.getQuestionsData.indexOf(props.data)
}
function plusCountBtn() {
  ++checkButtons.value.countForBtn
}
function minusCountBtn() {
  if (checkButtons.value.countForBtn === 1) {
    return
  }else {
      --checkButtons.value.countForBtn
  }
}

function saveAnswer() {
  if (selectedAnswer.value === null) {
    props.data.selectedAnswer = ''
  } else {
    props.data.selectedAnswer = selectedAnswer.value
  }
  questionsPinia.saveAnswersFn(props.data)
}

function showNextQuestion() {
  emit('indexOf', numberOfIndex() + 1)
}

function nexQuestion() {
  saveAnswer()
  plusCountBtn()
  showNextQuestion()
}
function showPrevQuestion() {
    emit('indexOf', numberOfIndex() - 1)
}
function prevQuestion() {
    minusCountBtn()
    showPrevQuestion()
}

//------------------watch---------------------//

watch(selectedAnswer, newVal => {
  selectedAnswer.value = newVal
})

watch(() => checkButtons.value.countForBtn, newVal => {
  let lengthOfArray = questionsPinia.getQuestionsDataLength
  console.log(newVal == 1)
    if(newVal == 1) {
      checkButtons.value.prevButtons = true
    }else {
        checkButtons.value.prevButtons = false
    }
    if(newVal == lengthOfArray)  {
        checkButtons.value.nextButtons = true
    }else {
      checkButtons.value.nextButtons = false
    }
})

//------------------computed------------------//

let randomAnswersComputed = computed(() => {
  let answers = [...props.data.incorrect_answers]
  answers.push(props.data.correct_answer)
  answers.sort(() => Math.random() - 0.5)
  return answers
})
</script>

<template>
  <div class="question">
    <h1>{{ props.data.question }}</h1>
  </div>
  <div class="answers">
    <div
      class="answer"
      v-for="(items, index) in randomAnswersComputed"
      :key="index"
      @click="selectedAnswer = items"
    >
      <button>{{ index + 1 }}. {{ items }}</button>
    </div>
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
      <button>Finish Quiz</button>
    </div>
  </div>
  <div class="typeOfQuestions">
    <h3>Type : {{ props.data.type }}</h3>
    <h3>Dificulty : {{ props.data.difficulty }}</h3>
    <h3>Category : {{ props.data.category }}</h3>
  </div>
</template>
