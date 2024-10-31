<template>
  <div>
    <div class="container rounded-3" style=" background-color: #f4f4f4;">
      <div v-if="post!=null && post!=undefined" class="row bg-color mt-3 rounded-3">
        <div class="col-md-7 p-0" >
          <img src="/assets/img/img1.webp" alt="" class="img-fluid" style="width:100%; height: 100%;">
        </div>
        <div class="col-md-5">
          <h5>{{post.title}}</h5>
          <small><i class="fa fa-calendar-alt"></i> 10/02/2024 :{{post.id}}</small>
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

  </div>
</template>

<script setup lang="ts">
import useSinglePost from "~/composables/useSinglePost";
import AddComment from "~/components/AddComment.vue";

const {post,fetchComments,comments}=useSinglePost();

/**
 * Get post comments from server.
 */
await fetchComments();
</script>

<style scoped>

</style>