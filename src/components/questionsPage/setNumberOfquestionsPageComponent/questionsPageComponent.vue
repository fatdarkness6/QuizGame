<script setup>
import { onMounted, ref } from 'vue'
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore'
import { useRouter } from 'vue-router'
import { errorNotif, warningNotif } from '@/utils/notifications/notifications';

//--------------------pinia-----------------//

const useQPinia = useQuestionsPinia()
//--------------------variables---------------//
let handleStaticValue  = ref({
  numberOfQuestions: 0,
  setLimitForClickStartQuiz: 0,
})
let loading = ref(false)

let router = useRouter()
//--------------------functions---------------//

function startQuiz() {
  if (handleStaticValue.value.setLimitForClickStartQuiz >= 1) {
    return
  } else {
    loading.value = true
    useQPinia.setQuestionsData(handleStaticValue.value.numberOfQuestions)
      .catch(err => {
        errorNotif(`ErrorForStartQuiz: ${err}`)
      })
      .finally(() => {
        loading.value = false
      })
  }
}

function setLimitForClickStartQuiz() {
  handleStaticValue.value.setLimitForClickStartQuiz += 1
}

function submitForStartQuiz() {
  if (handleStaticValue.value.numberOfQuestions == 0 || handleStaticValue.value.numberOfQuestions > 50) {
    warningNotif('Please enter valid number of questions')
    return
  } else {
    startQuiz()
    setLimitForClickStartQuiz()
  }
}

//--------------------mounted---------------//

onMounted(() => {
  router.push(`/`)
})

</script>

<template>
  <div class="loading" v-if="loading">
    <h1>Loading...</h1>
  </div>
  <form @submit.prevent="submitForStartQuiz">
    <div class="questionsContainer flx-column-center">
      <div class="part1 flx-column-center">
        <h1>Questions</h1>
        <h3>A Quiz Web Application</h3>
        <h4>How many question do you want to answer?</h4>
      </div>
      <div class="part2 flx-column-center">
        <input
          v-model="handleStaticValue.numberOfQuestions"
          type="number"
          placeholder="Enter number of questions"
        />
        <h6>Help:from 1 to 50</h6>
      </div>
      <div class="part3">
        <button>Go!</button>
      </div>
    </div>
  </form>
</template>
