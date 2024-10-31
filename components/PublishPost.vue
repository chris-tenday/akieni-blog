<template>
  <div>
    <div class="row">
      <div id="publishSection" class="col-md-12 bg-color rounded-3 p-3 mb-3">
        <h6>What's on your mind?</h6>
        <form action="#" @submit.prevent="publishPost(post)">
          <div class="form-group mb-2">
            <input v-model="post.title" type="text" class="form-control rounded-0" placeholder="Write the title of your post">
          </div>
          <div class="form-group mb-2">
            <textarea v-model="post.body" name="" id="" style="min-height: 50px;" class="form-control rounded-0" placeholder="Write your thoughts here.."></textarea>
          </div>
          <div class="form-inline">
            <div class="form-group">
              <a href="#" class="btn btn-primary rounded-0 me-2"><i class="fa fa-file-image"></i> Attach image</a>
              <button type="submit" class="btn rounded-0" style="border:1px solid black;"><i class="fas fa-plus-circle"></i> Publish</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import usePublishPost from "~/composables/usePublishPost";
import Post from "~/store/models/Post";
import {reactive} from "vue";

const post=reactive(new Post());

const {publishPost}=usePublishPost();


</script>

<style scoped>

</style>