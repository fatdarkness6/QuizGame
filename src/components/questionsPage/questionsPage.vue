<script setup>
import { computed } from 'vue';
import questionsPageComponent from './questionsPageComponent/questionsPageComponent.vue';
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore';
import showQuestionsIfTheyAreExist from './showQuestionsIfTheyAreExist/showQuestionsIfTheyAreExist.vue';

const questionsPinia = useQuestionsPinia()

//------------------computed---------------//

let dataLength = computed(() => {
  return questionsPinia.getQuestionsDataLength
})

</script>

<template>
  <div class="questionsPage">
    <div class="wrapper">
      <questionsPageComponent v-if=" dataLength ==0 " />
      <showQuestionsIfTheyAreExist v-else/>
    </div>
  </div>
</template>
