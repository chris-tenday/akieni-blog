<template>
  <div>


    <div class="container rounded-3" style=" background-color: #f4f4f4;">

      <div class="row mt-3 d-flex justify-content-center">
        <div class="col-md-6 " >

          <PublishPost/>

          <div class="row">
            <small>Recents posts</small>
            <SinglePost v-for="post in posts" :post="post"/>
            <Loader/>
          </div>
        </div>
        </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import usePosts from "~/composables/UsePosts";
import {onMounted} from "vue";
import Header from "~/components/Header.vue";
import PublishPost from "~/components/PublishPost.vue";
import RestrictedFeature from "~/components/RestrictedFeature.vue";
import SinglePost from "~/components/SinglePost.vue";
import Loader from "~/components/Loader.vue";

const {posts,scrolling,initializeStore,loading}=usePosts();

await initializeStore();

onMounted(()=>{

  /**
   * Whenever the user scrolls , keep fetching posts.
   */
  window.addEventListener("scroll",()=>{
    scrolling();
  })
});

</script>

<style scoped>

</style>