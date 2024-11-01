<template>
  <div>
    <h1>Hello</h1>
  </div>
</template>

<script setup lang="ts">

import {useRuntimeConfig} from "nuxt/app";
import {onMounted} from "vue";


console.log("API URL =>"+process.env.NUXT_PUBLIC_API_URL);
console.log("NUXT URL=>"+useRuntimeConfig().public.API_URL);

onMounted(()=>{
  console.log("Page is mounted");

});
</script>

<style scoped>

</style>