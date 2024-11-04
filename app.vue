<template>
  <div>
    <div class="d-flex justify-content-center" style="height:100%;" v-if="isLoading">
      <Loader/>
    </div>
    <NuxtLayout v-else>
      <Header/>
      <NuxtPage @page-loaded="stopLoading()"/>
    </NuxtLayout>

  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import Loader from "./components/Loader.vue";
import eventBus from '/utilities/eventBus';

const isLoading = ref(false);

const router=useRouter();

router.beforeEach((to,from,next)=>{
  isLoading.value=true;
  next();
});
router.afterEach(()=>{

  setTimeout(()=>{
    isLoading.value=false;
  },12000);
});

const stopLoading=()=>{
  isLoading.value=false;
  console.log("page loaded captured...");
}


</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>