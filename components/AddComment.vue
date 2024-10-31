<template>
  <div>
    <RestrictedFeature>
      <p>Add your comment:</p>
      <form action="#" @submit.prevent="addComment(comment)">
        <div class="d-flex">
          <input v-model="comment.body" type="text" class="form-control rounded-5 input-bg" style=""  placeholder="Add a comment...">
          <button type="submit" class="btn rounded-5" style="background-color:lightgray;"><i class="fas fa-check"></i></button>
        </div>
      </form>
    </RestrictedFeature>
  </div>
</template>

<script setup lang="ts">
import Comment from "~/store/models/Comment";
import {reactive} from "vue";
import useSinglePost from "~/composables/useSinglePost";
import RestrictedFeature from "~/components/RestrictedFeature.vue";


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