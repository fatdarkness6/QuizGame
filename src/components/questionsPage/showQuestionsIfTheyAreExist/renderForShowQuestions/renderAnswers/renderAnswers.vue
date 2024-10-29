<script setup lang="ts">

//--------------------types--------------------//
interface Props {
    data: string,
    index: number,
}
interface Emit {
    (e: 'selectedAnswer', data: string): void
}


    const props = defineProps<Props>()

    const emit = defineEmits<Emit>()

    //---------------functions---------------//

    function selectedAnswerFn() {
        emit('selectedAnswer' , props.data )
    }
    
</script>

<template>
    <div class="answer" @click="selectedAnswerFn">
      <button>{{ props.index}}. {{ props.data }}</button>
    </div>
</template>