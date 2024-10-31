<template>
  <div>
    <form action="#" @submit.prevent="addComment(comment)">
      <div class="d-flex">
        <input v-model="comment.body" type="text" class="form-control rounded-5 input-bg" style=""  placeholder="Add a comment...">
        <button type="submit" class="btn rounded-5" style="background-color:lightgray;"><i class="fas fa-check"></i></button>
      </div>
      <!--<div class="input-group">

        <span class="input-group-text rounded-5 " style="margin-left:3px;"><i class="fas fa-check"></i></span>
      </div>!-->
    </form>

  </div>
</template>

<script setup lang="ts">
import Comment from "~/store/models/Comment";
import {reactive} from "vue";
import useSinglePost from "~/composables/useSinglePost";


const comment=reactive(new Comment());

/**
 * props that should be passed to the component
 */
const {postId}=defineProps({
  postId:{
    type:Number,
    required:true,
    default:0
  }
});

const {addComment}=useSinglePost();
comment.postId=postId;

</script>

<style scoped>

</style>