<script setup>
import { ref , onMounted } from 'vue'

    const props = defineProps({
        data: String,
        correctAnswer: String,
        selectedAnswer: String
    })

    //-------------------variables---------------------//

    let isEqualSelectedAnswer = ref(false)

    //-------------------functions--------------------//

    function checkSelectedAnswer() {
        if (props.data === props.selectedAnswer) {
            isEqualSelectedAnswer.value = true
        }
    }
    
    //--------------------mounted-------------------//

    onMounted(() => {
        checkSelectedAnswer()
    })

</script>

<template>
   <h2 v-if="isEqualSelectedAnswer" v-html="props.data" :class="[props.data == props.correctAnswer ? '' : 'incorrectAnswerTxt']"></h2>
   <h2 v-else v-html="props.data" class="incorrectAnswersDEFULT"></h2>
</template>