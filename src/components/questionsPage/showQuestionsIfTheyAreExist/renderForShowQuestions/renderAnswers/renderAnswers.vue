<script setup lang="ts">
import type { RenderAnswerData } from '@/types/sameTypes/sameTypes';
import type { AnswerEmit } from '@/types/showQuestionsIfTheyAreExistType/renderQuestionsType/renderAnswersType/renderAnswersType';

    const props = defineProps<RenderAnswerData>()
    const emit = defineEmits<AnswerEmit>()

    //---------------functions---------------//

    function selectedAnswerFn() {
        emit('selectedAnswer' , props.data )
    }
    
</script>

<template>
    <div class="answer" @click="selectedAnswerFn">
      <button v-html="`${props.index}. ${props.data}`"></button>
    </div>
</template>