<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore';
import { useRouter } from 'vue-router'
import { errorNotif , warningNotif } from '@/utils/notifications/notifications';
import type { RefTypes } from '@/types/questionsPageComponentType';

//--------------------pinia-----------------//

const useQPinia = useQuestionsPinia()

//--------------------variables---------------//
const handleStaticValue  = ref <RefTypes>({
  numberOfQuestions: 0,
  setLimitForClickStartQuiz: 0,
  setName :'',
  setLastName :''
})
const loading = ref<boolean>(false)

const router = useRouter()
//--------------------functions---------------//

function startQuiz() {
  if (handleStaticValue.value.setLimitForClickStartQuiz >= 1) {
    return
  } else {
    loading.value = true
    useQPinia.setQuestionsData(handleStaticValue.value.numberOfQuestions)
      .catch((err : string) => {
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

function setNameAndLastNameToPinia() {
const data = {
  name: handleStaticValue.value.setName,
  lastName: handleStaticValue.value.setLastName
}

useQPinia.setNameAndLastName(data)

}

function submitForStartQuiz() {
  if (handleStaticValue.value.numberOfQuestions == 0 || handleStaticValue.value.numberOfQuestions > 50 || handleStaticValue.value.setName == '' || handleStaticValue.value.setLastName == '' ) {
    warningNotif('Please enter valid information')
    return
  } else {
    startQuiz()
    setLimitForClickStartQuiz()
    setNameAndLastNameToPinia()
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
        <input v-model="handleStaticValue.setName" placeholder="Enter your Name"/>
        <input v-model="handleStaticValue.setLastName" placeholder="Enter your Lastname"/>
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
    <div class="navigateToParticipatesQuiz">
      <RouterLink to="/userInfo">
        <button>click here to see how many Quizes you Participated</button>
      </RouterLink>
    </div>
  </form>
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