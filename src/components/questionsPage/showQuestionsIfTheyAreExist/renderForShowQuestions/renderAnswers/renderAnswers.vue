<script setup>

    let props = defineProps({
        data : Object,
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