<template>
  <div>
    <RestrictedFeature>
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
</template>

<script setup lang="ts">

import {useStore} from "vuex";
import {useRouter} from "vue-router";
import useNotification from "~/composables/useNotification";
import {ref} from "vue";
import usePublishPost from "~/composables/usePublishPost";
import Post from "~/store/models/Post";
import User from "~/store/models/User";
import RestrictedFeature from "~/components/RestrictedFeature.vue";

const title=ref("");
const body=ref("");
const loading=ref(false);

const store=useStore();
const router=useRouter();
const {notify}=useNotification();
const {publishPost}=usePublishPost();

const register=async ()=>{
  console.log("Register func");
}

const login=async ()=>{

}
const publish=async ()=>{

};
</script>

<style scoped>

</style>