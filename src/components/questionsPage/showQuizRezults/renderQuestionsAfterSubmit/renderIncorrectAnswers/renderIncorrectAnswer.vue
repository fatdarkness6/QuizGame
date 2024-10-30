<script setup lang="ts">
import { ref , onMounted } from 'vue'
import type { RenderAnswerData } from '@/types/sameTypes/sameTypes';


    const props = defineProps<RenderAnswerData>()

    //-------------------variables---------------------//

    const isEqualSelectedAnswer = ref<boolean>(false)
    const isCorrectAnswer = ref<boolean>(false)

    //-------------------functions--------------------//

    function checkSelectedAnswer() {
        if (props.data === props.selectedAnswer) {
                isEqualSelectedAnswer.value = true
        }
        if(props.data === props.correctAnswer) {
            isCorrectAnswer.value = true
        }
    }

    //--------------------mounted-------------------//

    onMounted(() => {
        checkSelectedAnswer()
    })
 //correctAnswerTxt , incorrectAnswerTxt
 console.log(props.selectedAnswer);
</script>

<template>
   <h2 v-if="isCorrectAnswer"  v-html="props.data" class="correctAnswerTxt"></h2>
   <h2 v-else-if="isEqualSelectedAnswer" class="incorrectAnswerTxt" v-html="props.data"></h2>
   <h2 v-else v-html="props.data" class="incorrectAnswersDEFULT"></h2>
</template>
