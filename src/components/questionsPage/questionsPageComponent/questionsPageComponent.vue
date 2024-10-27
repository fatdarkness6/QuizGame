<script setup>
import { ref } from 'vue'
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore'

//--------------------pinia---------------//

const useQPinia = useQuestionsPinia()

//--------------------variables---------------//
let handleStaticValue = ref({
  numberOfQuestions: 0,
  setLimitForClickStartQuiz: 0,
})

//--------------------functions---------------//

function startQuiz() {
  if (handleStaticValue.value.setLimitForClickStartQuiz >= 1) {
    return
  } else {
    useQPinia.setQuestionsData(handleStaticValue.value.numberOfQuestions)
  }
}

function setLimitForClickStartQuiz() {
  handleStaticValue.value.setLimitForClickStartQuiz +=1
}
</script>

<template>
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
      <button
        @click="
          () => {
              
            if (handleStaticValue.numberOfQuestions == 0){
              return
            }else {
              startQuiz()
              setLimitForClickStartQuiz()
            }
          }
        "
      >
        Go!
      </button>
    </div>
  </div>
</template>
