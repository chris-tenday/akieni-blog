<template>
  <div>
    <div class="row">

      <div id="publishSection" class="col-md-12 bg-color rounded-3 p-3 mb-3">
        <h6>What's on your mind?</h6>
        <RestrictedFeature >
          <form action="#" @submit.prevent="publish()">
            <div class="form-group mb-2">
              <input id="title" v-model="title" type="text" class="form-control rounded-0" placeholder="Write the title of your post" :disabled=loading>
            </div>
            <div class="form-group mb-2">
              <textarea  :disabled=loading v-model="body" name="" id="body" style="min-height: 50px;" class="form-control rounded-0" placeholder="Write your thoughts here.."></textarea>
            </div>
            <div class="form-inline">
              <div class="form-group">
                <a href="#" class="btn btn-primary rounded-0 me-2"><i class="fa fa-file-image"></i> Attach image</a>
                <button id="submitBtn" :disabled=loading type="submit" class="btn rounded-0" style="border:1px solid black;"><i class="fas fa-plus-circle"></i> Publish</button>

              </div>
            </div>

          </form>
        </RestrictedFeature>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import usePublishPost from "~/composables/usePublishPost";
import Post from "~/store/models/Post";
import {ref} from "vue";
import RestrictedFeature from "~/components/RestrictedFeature.vue";
import {useStore} from "vuex";
import User from "~/store/models/User";
import useNotification from "~/composables/useNotification";
import {useRouter} from "vue-router";

const title=ref("");
const body=ref("");
const loading=ref(false);

const store=useStore();
const router=useRouter();
const {notify}=useNotification();
const {publishPost}=usePublishPost();

const publish=async ()=>{
  const post:Post=new Post();
  post.title=title.value;
  post.body=body.value;
  const user:User=store.getters.GET_USER;
  post.userId=user.userId;
  try
  {
    loading.value=true;
    const response=await publishPost(post);
    if(response)
    {
      notify("Your post is published","success");

      /**
       * Clear.
       */
      title.value="";
      body.value="";
      loading.value=false;

      /**
       * Go the published post.
       */
      router.push("/#"+post.id);
    }
    else
    {
      notify("Your post is not published","warning");
    }

  }
  catch(error)
  {
    notify(error.message,"error");
  }
};


</script>

<style scoped>

</style>