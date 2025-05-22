<script setup>

    let props = defineProps({
        data : String,
        index : Number
    })

    let emit = defineEmits(['selectedAnswer'])

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