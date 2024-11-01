<template>
  <div>
    <RestrictedFeature>
      <p>Add your comment:</p>
      <form action="#" @submit.prevent="postComment">
        <div class="d-flex">
          <input v-model="userComment" type="text" class="form-control rounded-5 input-bg" style=""  placeholder="Add a comment...">
          <button type="submit" class="btn rounded-5" style="background-color:lightgray;"><i class="fas fa-check"></i></button>
        </div>
      </form>
    </RestrictedFeature>
  </div>
</template>

<script setup lang="ts">
import Comment from "~/store/models/Comment";
import {reactive, ref} from "vue";
import useSinglePost from "~/composables/useSinglePost";
import RestrictedFeature from "~/components/RestrictedFeature.vue";
import useComments from "~/composables/useComments";
import {useStore} from "vuex";
import User from "~/store/models/User";
import useNotification from "~/composables/useNotification";

const userComment=ref("");
const props=defineProps({
  postId:{
    type:Number
  }
});

const {addComment}=useComments(Number(props.postId));
const store=useStore();
const {notify}=useNotification();

const comment:Comment=reactive(new Comment());
const user:User=store.getters.GET_USER;

const postComment=async ()=>{

  try
  {
    await addComment(userComment.value);
    /**
     * Clear.
     */
    userComment.value="";
  }
  catch(error)
  {
    notify(error,"error");
  }
};

</script>

<style scoped>

</style>