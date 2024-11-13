<script setup lang="ts">
import { ref } from 'vue'
import { useQuestionsPinia } from '@/store/questionsStore'
import { useRouter } from 'vue-router'
import { useNotify } from '@/composables/notifications/notifications'
import type { FromValue } from '@/types/questionsPageComponentType'
import SubmitForStartQuizComponent from '@/components/submitForStartQuizComponent.vue'

const useQPinia = useQuestionsPinia()
const formValue = ref<FromValue>({
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
      <SubmitForStartQuizComponent :formValue="formValue" :loading="loading" @submitForm="submitForStartQuiz" />
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
