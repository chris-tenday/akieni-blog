<template>
  <div>

    <NuxtLayout>
      <Header/>
      <NuxtPage @page-loaded="pageLoading(false)" @page-loading="pageLoading(true)"/>
    </NuxtLayout>

  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {useState} from "nuxt/app";

const isLoading=useState("isLoading",()=> false);


const router=useRouter();


const pageLoading=(val:boolean)=>{
  isLoading.value=val;
}


</script>

<style scoped>

</style>