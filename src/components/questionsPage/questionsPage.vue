<script setup>
import { computed } from 'vue'
import questionsPageComponent from './setNumberOfquestionsPageComponent/questionsPageComponent.vue'
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore'
import showQuestionsIfTheyAreExist from './showQuestionsIfTheyAreExist/showQuestionsIfTheyAreExist.vue'
import { useRoute } from 'vue-router'
import ShowQuizResult from './showQuizRezults/showQuizResult.vue'

const questionsPinia = useQuestionsPinia()
let route = useRoute()
//------------------computed---------------///

let dataLength = computed(() => {
  return questionsPinia.getQuestionsDataLength
})
</script>

<template>
  <div class="questionsPage">
    <div class="wrapper">
      <questionsPageComponent v-if="dataLength == 0" />
      <ShowQuizResult v-else-if="route.query.page == 'showQuizResult'" />
      <showQuestionsIfTheyAreExist v-else />
    </div>
  </div>
</template>
