<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import type { UserInfoPropsType } from '@/types/userInfoPropsType/userInfoPropsType';
import renderReusebleQuestionsAfterSubmit from '../renderQuestionsAfterSubmit/renderReusebleQuestionsAfterSubmit.vue';

const props = defineProps<UserInfoPropsType>()
    
//---------------------variables---------------------//

    const infoIsOpen = ref<boolean>(false)

//-------------------functions---------------------//

function showInfos() {
    infoIsOpen.value = !infoIsOpen.value
}

</script>

<template>
    <div class="renderUserInfo">
        <div @click="showInfos" class="part1">
            <div class="usInfo flx-left">
                    <div class="name">
                        <h2>Name : {{ props.data.name }}</h2>
                    </div>
                    <div class="lastName">
                        <h2>LastName : {{ props.data.lastName }}</h2>
                    </div>
            </div>
            <div class="ans flx-right">
                <div class="rightAnswers">
                <h3>( correctAnswers : {{ props.data.rightAnswer }} )</h3> 
                </div>
                <div class="wrongAnswers">
                    <h3>( IncorrectAnswers : {{ props.data.wrongAnswers }} )</h3>
                </div>
            </div>
            
        </div>
        <div :id="infoIsOpen ? 'show' : 'dontShow'" class="part2">
            <div class="renderAnswers">
                <renderReusebleQuestionsAfterSubmit v-for="(items , index) in props.data.answers" :key="index" :data="items" :index="index" />
            </div>
        </div>
        
    </div>
</template>

<style lang="css" scoped>
    .renderUserInfo{
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        height: 100%;
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    }
    .part1{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
        cursor: pointer;
    }
    .flx-left {
        display: flex;
        align-items: start;
        flex-direction: column;
        gap: 10px;
    }
    .flx-right {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 10px;
    }
    #show {
        display: block;
    }
    #dontShow {
        display: none;
    }
</style>