<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { ref } from 'vue'
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore'
import { useRouter } from 'vue-router'
import renderAnswers from './renderAnswers.vue'
import { parseQuestions } from '@/utils/parseDatasFromLocalStorage'
import type { Props } from '@/types/commonTypes/sameTypes'
import type {
  Emit,
  CheckButtons,
} from '@/types/renderQuestionsType/renderQuestionsType'

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
  return questionsPinia.getAllQuestionsFromLocalST.fetchDatas.findIndex(
    items => {
      return items.id === props.data.id
    },
  )
}
function plusCountBtn() {
  checkButtons.value.countForBtn += 1
}

function minusCountBtn() {
  const data = parseQuestions()
  if (checkButtons.value.countForBtn === 1) {
    return
  } else {
    --checkButtons.value.countForBtn
    data.saveItemsIndex = numberOfIndex() - 1
    localStorage.setItem('questions', JSON.stringify(data))
  }
}

function checkButtonsFn() {
  const lengthOfArray =
    questionsPinia.getAllQuestionsFromLocalST.fetchDatas.length
  const count = checkButtons.value.countForBtn
  checkButtons.value.nextButtons = count === lengthOfArray
  checkButtons.value.prevButtons = count === 1
}

function saveAnswer() {
  if (selectedAnswer.value === null) {
    props.data.selectedAnswer = undefined
  } else {
    props.data.selectedAnswer = selectedAnswer.value.toString()
  }
  const index = numberOfIndex() + 1
  questionsPinia.saveAnswersFn(props.data, index)
}

function sendDataForshowNextQuestion() {
  emit('indexOf', numberOfIndex() + 1)
}

function nexQuestion() {
  saveAnswer()
  plusCountBtn()
  sendDataForshowNextQuestion()
  setSelectedAnswer('plus')
}

function sendDataForshowPrevQuestion() {
  emit('indexOf', numberOfIndex() - 1)
}

function prevQuestion() {
  minusCountBtn()
  sendDataForshowPrevQuestion()
  setSelectedAnswer('minos')
}

function setSelectedAnswer(props: string) {
  const conditions =
    props == 'minos'
      ? numberOfIndex() - 1
      : props == 'plus'
        ? numberOfIndex() + 1
        : numberOfIndex()
  const savedAnswer = getSavedAnswer(conditions)
  if (savedAnswer === null || savedAnswer === undefined) {
    selectedAnswer.value = null
  } else {
    selectedAnswer.value = savedAnswer
  }
}

function getSavedAnswer(index: number) {
  const savedAnswer =
    questionsPinia.getAllQuestionsFromLocalST.savedAnswers &&
    questionsPinia.getAllQuestionsFromLocalST?.savedAnswers[index]

  return savedAnswer ? savedAnswer.selectedAnswer : null
}

function setQueryParams(props: string) {
  router.replace(`/${props}`)
}

function finishQuizFn() {
  saveAnswer()
  setQueryParams(`quizRezult`)
}

//------------------watch---------------------//

watch(selectedAnswer, newVal => {
  selectedAnswer.value = newVal
})

watch(
  () => checkButtons.value.countForBtn,
  () => {
    checkButtonsFn()
  },
)

//------------------mounted------------------//

onMounted(() => {
  checkButtons.value.countForBtn =
    questionsPinia.getAllQuestionsFromLocalST.saveItemsIndex + 1
  checkButtonsFn()
  setSelectedAnswer('')
  questionsPinia.setSaveAnswerFromLocalStorage()
})
</script>

<template>
  <div class="question">
    <h1 v-html="props.data.question"></h1>
  </div>
  <div class="answers">
    <renderAnswers
      v-for="(items, index) in props.data.options"
      :id="[selectedAnswer == items && 'focusOnSeleletedAnswer']"
      :key="index"
      :data="items"
      :index="index + 1"
      @selectedAnswer="data => (selectedAnswer = data)"
    />
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
