<script lang="ts" setup>
import { onMounted } from 'vue'
import { useQuestionsPinia } from '@/store/questionsStore'
import renderUsersInfo from '@/components/renderUsersInfo.vue'
import { useRouter } from 'vue-router'

//---------------------pinia---------------------//

const questionsPinia = useQuestionsPinia()

//---------------------variables-----------------//

const router = useRouter()

//---------------------functions-----------------//

function goToHomePgae() {
  router.replace(`/`)
}

//---------------------mouted--------------------//

onMounted(() => {
  questionsPinia.getUserDataFromLocalStorage()
})
</script>

<template>
  <div class="userInfo">
    <div class="wrapper">
      <div class="title">
        <h1 v-if="questionsPinia.UserDataFromLocalStorage.length == 0">
          You haven't participated in any Quiz yet.
        </h1>
        <renderUsersInfo
          v-else
          v-for="(items, index) in questionsPinia.UserDataFromLocalStorage"
          :key="index"
          :data="items"
        />
      </div>
      <div class="backToHome">
        <button @click="goToHomePgae">back to home</button>
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
