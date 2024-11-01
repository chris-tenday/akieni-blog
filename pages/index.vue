<template>
  <div>


    <div class="container rounded-3" style=" background-color: #f4f4f4;">

      <div class="row mt-3 d-flex justify-content-center">
        <div class="col-md-6 " >

          <PublishPost/>

          <small>Recents posts</small>
          <SinglePost v-for="post in posts" :post="post"/>
          <Loader v-if="loading"/>
          <div v-if="errorMsg.length>0" class="row">
            <div class="col-md-12 d-flex justify-content-center">
              <p style="color: red;"><i class="fa fa-warning"></i> {{errorMsg}}</p>
            </div>
          </div>
          <div v-if="fetchError.length>0" class="row">
            <div class="col-md-12 d-flex justify-content-center">
              <p style="color: red;"><i class="fa fa-warning"></i> {{fetchError}}</p>
            </div>
          </div>
        </div>
        </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import usePosts from "~/composables/UsePosts";
import {onMounted, ref} from "vue";
import Header from "~/components/Header.vue";
import PublishPost from "~/components/PublishPost.vue";
import RestrictedFeature from "~/components/RestrictedFeature.vue";
import SinglePost from "~/components/SinglePost.vue";
import Loader from "~/components/Loader.vue";

/**
 * Used to notify the user when an error occured at server-side level
 */
const dataLoadingError=ref(false);
const errorMsg=ref("");

const {posts,scrolling,loadPosts,loading,fetchError}=usePosts();

try
{
  await loadPosts();
}
catch(error)
{
  errorMsg.value=error.message;
}

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