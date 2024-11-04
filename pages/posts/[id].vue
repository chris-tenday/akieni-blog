<template>
  <div>
    <div v-if="error.length===0" class="container rounded-3" style=" background-color: #f4f4f4;">
      <div v-if="post!=null && post!=undefined" class="row bg-color mt-3 rounded-3">
        <div class="col-md-7 p-0" >
          <img :src="post.image" alt="" class="img-fluid" style="width:100%; height: 100%;">
        </div>
        <div class="col-md-5">
          <h5>{{post.title}}</h5>
          <p style="font-weight: bold;"><i class="fa fa-user-circle"></i> {{post.author}}</p>
          <div style="overflow-y: auto; max-height:350px;">
            <p>{{post.body}}</p>

            <hr>
            <small><i class="fas fa-comments"></i> Comments :</small>
            <div v-for="comment in comments" class="input-bg p-2 rounded-4 mb-2" style="border:1px solid gray; min-height:20px;">
              <small style=""><strong>{{ comment.email }}</strong> commented:</small>
              <p>{{comment.body}}</p>
            </div>

            <!-- Add comment component !-->
            <AddComment :post-id="post.id"/>

          </div>


        </div>
      </div>
    </div>
    <div class="container rounded-3 d-flex justify-content-center" v-else style=" min-height:300px;">
      <h1  class="m-auto"><i class="fa fa-question-circle"></i> {{error}}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSinglePost from "~/composables/useSinglePost";
import AddComment from "~/components/AddComment.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import useComments from "~/composables/useComments";

const emit=defineEmits();

const {params}=useRoute()
const router=useRouter()

const postId=ref(Number(params.id));
const error=ref("");

const {post,loadPost}=useSinglePost(postId.value);
const {comments,fetchComments}=useComments(postId.value);

if(post.value===null)
{
    /**
     * Get the post.
     */
    try
    {
      await loadPost();
    }
    catch(err)
    {
      error.value="Page not found";

    }
}

/**
 * Set some tags for good SEO.
 */
useHead({
  title:post.value?.author,
  meta:[
    { name:"description", content:post.value?.title },
    { name: 'author', content: post.value?.author }
  ]
});

/**
 * Get post comments from server.
 */
try {
  await fetchComments();
}
catch(err){
  error.value="page not found";
}

onMounted(()=>{
  console.log("ID page mounted");
  emit("page-loaded");
});

</script>

<style scoped>

</style>