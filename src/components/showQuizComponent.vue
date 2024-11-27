<script setup lang="ts">
import RenderReusebleQuestionsAfterSubmit from './renderReusebleQuestionsAfterSubmit.vue';
import ShowCorrectAndIncorrectAnswers from './showCorrectAndIncorrectAnswers.vue';
import type { showQuizComponentProps } from '@/types/Props/Props';

const props = defineProps<showQuizComponentProps>()
const emit = defineEmits(['resetQuery'])

function resetQuery() {
    emit('resetQuery')
}
</script>

<template>
     <div class="flx-column-center gap-20">
      <ShowCorrectAndIncorrectAnswers :savedAnswer="props.savedAnswer"/>
    </div>
    <div class="showQuestionsAfterSubmit">
      <h1 v-if="!props.savedAnswer.savedAnswers">you didnt answer the questions</h1>
      <RenderReusebleQuestionsAfterSubmit
        v-else
        v-for="(items, index) in props.savedAnswer.savedAnswers"
        :key="index"
        :data="items"
        :index="index + 1"
      />
    </div>
    <div class="GoToHomePage">
      <button @click="resetQuery">Go to Home page</button>
    </div>
</template>