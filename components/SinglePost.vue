<template>
  <div :id="post.id" class="col-md-12 bg-color rounded-3 p-3 mb-3" style="">
    <p><i class="fa fa-user-circle"></i> <strong>{{post.author}}</strong> posted</p>
    <img src="/assets/img/img1.webp" alt="" class="img-fluid rounded-3">
    <h3>{{ post.title }}</h3>
    <p class="mb-0" >{{post.body}}....
      <!--<a href="#myModal" data-bs-toggle="modal" data-bs-target="#myModal">Read post</a>!-->
      <NuxtLink :to="`/posts/${post.id}`">Read post</NuxtLink></p>

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