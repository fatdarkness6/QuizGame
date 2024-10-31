<script setup lang="ts">
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore';
import renderQuestionsAfterSubmit from './renderQuestionsAfterSubmit/renderReusebleQuestionsAfterSubmit.vue';
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';


//---------------------pinia---------------------//

const questionsPinia = useQuestionsPinia()

//--------------------variables------------------//

  const router = useRouter()


//--------------------function-------------------//

function resetQuery() {
  questionsPinia.makeEmptyQuestionsValue()
  questionsPinia.makeEmptySaveAnswersValue()
  router.push(`/`)
}

//--------------------mouted---------------------//

onMounted(() => {
  questionsPinia.calculateResults()
  questionsPinia.setDatasInLocalStorage()
})

</script>

<template>
  <div class="flx-column-center gap-20">
    <div class="correctAnswers">
      <h1>correctAnswers: {{ questionsPinia.getCorrectAnswers }}</h1>
    </div>
    <div class="incorrectAnswers">
      <h1>incorrectAnswers: {{ questionsPinia.getIncorrectAnswers }}</h1>
    </div>
  </div>
    <div class="showQuestionsAfterSubmit">
      <renderQuestionsAfterSubmit v-for="(items , index) in questionsPinia.getsaveAnswers" :key="index" :data="items" :index="index+1" />
    </div>
    <div class="GoToHomePage">
        <button @click="resetQuery">Go to Home Pgae</button>
    </div>
</template>
