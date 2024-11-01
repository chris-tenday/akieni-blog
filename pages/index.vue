<template>
  <div>


    <div class="container rounded-3" style=" background-color: #f4f4f4;">

      <div class="row mt-3 d-flex justify-content-center">
        <div class="col-md-6 " >

          <PublishPost/>

          <div v-if="!dataLoadingError" class="row">
            <small>Recents posts</small>
            <SinglePost v-for="post in posts" :post="post"/>
            <Loader/>
          </div>
          <div v-else class="row">
            <div class="col-md-12 d-flex justify-content-center">
              <p style="color: red;"><i class="fa fa-warning" ></i> We're very sorry , we couldn't load data Please try reloading the page !</p>
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

const {posts,scrolling,loadPosts,loading}=usePosts();

try
{
  await loadPosts();
}
catch(error)
{
  dataLoadingError.value=true;
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