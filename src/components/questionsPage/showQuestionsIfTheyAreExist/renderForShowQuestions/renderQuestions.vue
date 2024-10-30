<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import { watch, computed, onMounted } from 'vue'
import { ref } from 'vue'
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore'
import { useRouter } from 'vue-router'
import renderAnswers from './renderAnswers/renderAnswers.vue'
import type { Props } from '@/types/sameTypes/sameTypes'
import type { Emit , CheckButtons } from '@/types/showQuestionsIfTheyAreExistType/renderQuestionsType/renderQuestionsType'


//------------------props------------------//

const props = defineProps<Props>()

//--------------------emits------------------//

const emit = defineEmits<Emit>()

//------------------pinia-----------------------//

const questionsPinia = useQuestionsPinia()

//------------------variables------------------//

const selectedAnswer = ref<number | null | string>(null)
const checkButtons = ref<CheckButtons>({
  nextButtons: false,
  prevButtons: true,
  countForBtn: 1,
})

const router = useRouter()

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

function checkButtonsFn(newVal : number) {
  const lengthOfArray = questionsPinia.getQuestionsDataLength
  const count = newVal || checkButtons.value.countForBtn
  checkButtons.value.nextButtons = count === lengthOfArray
  checkButtons.value.prevButtons = count === 1
}

function saveAnswer() {
  if (selectedAnswer.value === null) {
    props.data.selectedAnswer = undefined; 
  } else {
    props.data.selectedAnswer = selectedAnswer.value.toString(); 
  }
  questionsPinia.saveAnswersFn(props.data);
}

function sendDataForshowNextQuestion() {
  emit('indexOf', numberOfIndex() + 1)
}

function nexQuestion() {
  saveAnswer(); // Ensure selectedAnswer is saved correctly
  plusCountBtn(); // Increment button count for navigation
  sendDataForshowNextQuestion(); // Emit the event to go to the next question

  // Fetch the saved answer for the next question
  const savedAnswer = getSavedAnswer(numberOfIndex() + 1);
  
  // Handle the possible types correctly
  if (savedAnswer === null || savedAnswer === undefined) {
    selectedAnswer.value = null; 
  } else {
    selectedAnswer.value = savedAnswer; 
  }
}

function sendDataForshowPrevQuestion() {
  emit('indexOf', numberOfIndex() - 1); // Emit the previous question index
}


function prevQuestion() {
  minusCountBtn(); // Decrease the button count for navigation
  sendDataForshowPrevQuestion(); // Emit the event to go to the previous question

  // Fetch the saved answer for the previous question
  const savedAnswer = getSavedAnswer(numberOfIndex() - 1);
  
  // Handle the possible types correctly
  if (savedAnswer === null || savedAnswer === undefined) {
    selectedAnswer.value = null; // Set to null if no answer is saved
  } else {
    selectedAnswer.value = savedAnswer; // Assign the retrieved answer
  }
}

function getSavedAnswer(index : number) {
  const savedAnswer = questionsPinia.saveAnswers[index];
  return savedAnswer ? savedAnswer.selectedAnswer : null;
}

function setQueryParams(props : string) {
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

const randomAnswersComputed = computed(() => {
  const answers = [...(props.data as { incorrect_answers: string[] }).incorrect_answers]
  answers.push((props.data as { correct_answer: string }).correct_answer)
  answers.sort(() => Math.random() - 0.5)
  return answers
})

//------------------mounted------------------//

onMounted(() => {
  checkButtonsFn(0)
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

