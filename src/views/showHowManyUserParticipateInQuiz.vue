<script lang="ts" setup>
import { onMounted } from 'vue';
import { useQuestionsPinia } from '@/store/createQuestionsPiniaStore';
import renderUsersInfo from '@/components/showHowManyUserParticipateInQuiz/renderUsersInfo/renderUsersInfo.vue';

//---------------------pinia---------------------//

const questionsPinia = useQuestionsPinia()

//---------------------mouted--------------------//

onMounted(() => {
    questionsPinia.getUserDataFromLocalStorage()
})

</script>

<template>
    <div class="userInfo">
        <div class="wrapper">
            <div class="title">
                <h1 v-if="questionsPinia.UserDataFromLocalStorage.length ==0">You haven't participated in any Quiz yet.</h1>
                <renderUsersInfo v-else v-for="(items , index) in questionsPinia.UserDataFromLocalStorage" :key="index" :data="items" />
            </div>
            <div class="backToHome">
                <RouterLink to="/">
                    <button>back to home</button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .title {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 30px;
    }
     button {
        padding: 10px;
        border-radius: 10px;
        border: 1px solid black;
        background-color: #000;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
  }
  .backToHome {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
  }

   button:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
  }
</style>