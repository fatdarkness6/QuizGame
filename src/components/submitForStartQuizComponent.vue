<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
import type { SubmitFormProps } from '@/types/submitFormPropsType'

const props = defineProps<SubmitFormProps>()

const emit = defineEmits(['submitForm'])

function submitForm() {
  emit('submitForm')
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
      <input v-model="formValue.setName" placeholder="Enter your Name" />
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
      <button :disabled="props.loading" @click="submitForm">Go!</button>
    </div>
  </div>
</template>
