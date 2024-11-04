<template>
  <div>
    <PageLoader v-if="isLoading"/>
    <div v-else class="container rounded-3" style=" background-color: #f4f4f4;">

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
import {onBeforeMount, onBeforeUpdate, onMounted, ref} from "vue";
import PublishPost from "~/components/PublishPost.vue";
import SinglePost from "~/components/SinglePost.vue";
import Loader from "~/components/Loader.vue";
import {onBeforeRouteLeave, useRouter} from "vue-router";
import {useState} from "nuxt/app";
import PageLoader from "~/components/PageLoader.vue";

const emit=defineEmits();
const router=useRouter();
const isLoading=useState("isLoading");
/**
 * Set some tags for good SEO.
 */
useHead({
  title:"Akieni",
  meta:[
    { name:"description", content:"High tech blog" },
    { name: 'keywords', content: 'Akienie, Blog, Tech , Learn, How to' },
    { name: 'robots', content: 'index, follow' }
  ]
});

/**
 * Used to notify the user when an error occured at server-side level
 */
const dataLoadingError=ref(false);
const errorMsg=ref("");

const {posts,scrolling,loadPosts,fetchError}=usePosts();

try
{
  await loadPosts();

}
catch(error)
{
  errorMsg.value=error.message;
}

onMounted(()=>{

  emit("page-loaded");

  /**
   * Whenever the user scrolls , keep fetching posts.
   */
  window.addEventListener("scroll",()=>{
    scrolling();
  })
});

onBeforeRouteLeave(()=>{
  emit("page-loading");
});
</script>

<style scoped>

</style>