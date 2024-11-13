<script setup lang="ts">
import { ref } from 'vue'
import { useQuestionsPinia } from '@/store/questionsStore'
import { useRouter } from 'vue-router'
import { useNotify } from '@/composables/notifications/notifications'
import type { fromValue } from '@/types/questionsPageComponentType'

const useQPinia = useQuestionsPinia()
const formValue = ref<fromValue>({
  numberOfQuestions: 0,
  setName: '',
  setLastName: '',
})
const loading = ref<boolean>(false)
const router = useRouter()
const { errorNotif, warningNotif } = useNotify()

function startQuiz() {
  loading.value = true
  useQPinia
    .setQuestionsData(formValue.value.numberOfQuestions)
    .then(() => {
      useQPinia.setAllQuestionsToLocalStorage()
      router.replace(`/questions`)
    })
    .catch((err: string) => {
      errorNotif(`ErrorForStartQuiz: ${err}`)
    })
    .finally(() => {
      loading.value = false
    })
}

function setNameAndLastNameToPinia() {
  const data = {
    name: formValue.value.setName,
    lastName: formValue.value.setLastName,
  }

  useQPinia.setNameAndLastName(data)
}

function submitForStartQuiz() {
  if (
    formValue.value.numberOfQuestions <= 0 ||
    formValue.value.numberOfQuestions > 50 ||
    formValue.value.setName == '' ||
    formValue.value.setLastName == ''
  ) {
    warningNotif('Please enter valid information')
    return
  } else {
    startQuiz()
    setNameAndLastNameToPinia()
  }
}

function goToUserInfo() {
  router.replace(`/userInfo`)
}
</script>

<template>
  <div class="wrapper">
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
            v-model="formValue.setName"
            placeholder="Enter your Name"
          />
          <input
            v-model="formValue.setLastName"
            placeholder="Enter your Lastname"
          />
          <input
            v-model="formValue.numberOfQuestions"
            type="number"
            placeholder="Enter number of questions"
          />
          <h6>Help:from 1 to 50</h6>
        </div>
        <div class="part3">
          <button :disabled="loading">Go!</button>
        </div>
      </div>
      <div class="navigateToParticipatesQuiz">
        <button @click="goToUserInfo">
          click here to see how many Quizes you Participated
        </button>
      </div>
    </form>
  </div>
</template>
<style scoped>
.navigateToParticipatesQuiz {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.navigateToParticipatesQuiz button {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.navigateToParticipatesQuiz button:hover {
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
}
</style>
