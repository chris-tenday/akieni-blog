<template>
  <div :id="post.id" class="col-md-12 bg-color rounded-3 p-3 mb-3" style="">
    <small><i class="fa fa-calendar-alt"></i> 10/02/2024</small>
    <img src="/assets/img/img1.webp" alt="" class="img-fluid rounded-3">
    <h3>{{ post.title }}</h3>
    <p class="mb-0" >{{post.body}}....
      <!--<a href="#myModal" data-bs-toggle="modal" data-bs-target="#myModal">Read post</a>!-->
      <NuxtLink :to="`/posts/${post.id}`">Read post</NuxtLink></p>
    <a href=""><small><i class="fa fa-comments"></i> 0</small></a>

    <!--<RestrictedFeature>
      <div class="row mt-2">
        <div class="col-md-12">
          <div class="input-group">
            <input type="text" class="form-control rounded-5 input-bg lato-light-italic"  placeholder="Add a comment...">
            <span class="input-group-text rounded-5 " style="margin-left:3px;">
                                                <i class="fas fa-check"></i>
                                            </span>
          </div>
        </div>
      </div>
    </RestrictedFeature> !-->
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import Post from "../store/models/Post";
import RestrictedFeature from "~/components/RestrictedFeature.vue";

const {post}=defineProps({
  post:{
    type:Post,
    required:true
  }
});
</script>

<style scoped>

</style>