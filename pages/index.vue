<template>
  <div>

    <div class="container rounded-3" style=" background-color: #f4f4f4;">
      <div class="row mt-3 bg-color rounded-3" style="height:70px;">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <img src="/assets/img/logo.png" style="max-width: 150px;" class="img-fluid navbar-brand">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#"><i class="fa fa-home"></i> Home</a>
                </li>
                <li class="nav-item">
                  <input type="text" class="form-control rounded-5 input-bg" style=" margin: auto; max-height:45px;" placeholder="Search here...">
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#"><i class="fas fa-user"></i> Login</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div class="row mt-3 d-flex justify-content-center">
        <div class="col-md-6 " >
          <div class="row">
            <small>Recents posts</small>
            <div v-for="post in posts" class="col-md-12 bg-color rounded-3 p-3 mb-3" style="">
              <small><i class="fa fa-calendar-alt"></i> 10/02/2024</small>
              <img src="/assets/img/img1.webp" alt="" class="img-fluid rounded-3">
              <h3>{{ post.title }}</h3>
              <p class="mb-0" >{{post.body}}....
                <a href="#myModal" data-bs-toggle="modal" data-bs-target="#myModal">Read post</a></p>
              <a href=""><small><i class="fa fa-comments"></i> 0</small></a>

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
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-5">
      <!-- The Modal -->
      <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="modal-content">

            <div class="modal-body p-0">
              <div class="row">
                <div class="col-md-7">
                  <img src="/assets/img/img1.webp" alt="" class="img-fluid" style="height: 100%;">
                </div>
                <div class="col-md-5 p-4">
                  <h5>Hello world</h5>
                  <small><i class="fa fa-calendar-alt"></i> 10/02/2024</small>
                  <div style="overflow-y: auto; max-height:350px;">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur, dicta? Alias dicta dignissimos harum illum incidunt nobis optio, quae quis quos reiciendis! Cum eius, nam nihil quis saepe voluptatibus.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur, dicta? Alias dicta dignissimos harum illum incidunt nobis optio, quae quis quos reiciendis! Cum eius, nam nihil quis saepe voluptatibus.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur, dicta? Alias dicta dignissimos harum illum incidunt nobis optio, quae quis quos reiciendis! Cum eius, nam nihil quis saepe voluptatibus.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur, dicta? Alias dicta dignissimos harum illum incidunt nobis optio, quae quis quos reiciendis! Cum eius, nam nihil quis saepe voluptatibus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur, dicta? Alias dicta dignissimos harum illum incidunt nobis optio, quae quis quos reiciendis! Cum eius, nam nihil quis saepe voluptatibus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur, dicta? Alias dicta dignissimos harum illum incidunt nobis optio, quae quis quos reiciendis! Cum eius, nam nihil quis saepe voluptatibus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur, dicta? Alias dicta dignissimos harum illum incidunt nobis optio, quae quis quos reiciendis! Cum eius, nam nihil quis saepe voluptatibus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur, dicta? Alias dicta dignissimos harum illum incidunt nobis optio, quae quis quos reiciendis! Cum eius, nam nihil quis saepe voluptatibus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur, dicta? Alias dicta dignissimos harum illum incidunt nobis optio, quae quis quos reiciendis! Cum eius, nam nihil quis saepe voluptatibus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur, dicta? Alias dicta dignissimos harum illum incidunt nobis optio, quae quis quos reiciendis! Cum eius, nam nihil quis saepe voluptatibus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur, dicta? Alias dicta dignissimos harum illum incidunt nobis optio, quae quis quos reiciendis! Cum eius, nam nihil quis saepe voluptatibus.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur, dicta? Alias dicta dignissimos harum illum incidunt nobis optio, quae quis quos reiciendis! Cum eius, nam nihil quis saepe voluptatibus.</p>
                    <hr>
                    <small><i class="fas fa-comments"></i> Comments :</small>
                    <div class="input-bg p-2 rounded-4 mb-2" style="border:1px solid gray; min-height:20px;">
                      <small style=""><strong>Chris Tenday</strong> commented:</small>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi debitis dolores earum eos explicabo fugiat fugit harum ipsum magni minus, nam nostrum numquam praesentium provident quo rem repellendus tempore.</p>
                    </div>
                    <div class="input-bg p-2 rounded-4 mb-2" style="border:1px solid gray; min-height:20px;">
                      <small style=""><strong>Chris Tenday</strong> commented:</small>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi debitis dolores earum eos explicabo fugiat fugit harum ipsum magni minus, nam nostrum numquam praesentium provident quo rem repellendus tempore.</p>
                    </div>
                    <div class="input-bg p-2 rounded-4 mb-2" style="border:1px solid gray; min-height:20px;">
                      <small style=""><strong>Chris Tenday</strong> commented:</small>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi debitis dolores earum eos explicabo fugiat fugit harum ipsum magni minus, nam nostrum numquam praesentium provident quo rem repellendus tempore.</p>
                    </div>
                    <div class="input-group">
                      <input type="text" class="form-control rounded-5 input-bg"  placeholder="Add a comment...">
                      <span class="input-group-text rounded-5 " style="margin-left:3px;">
                                            <i class="fas fa-check"></i>
                                        </span>
                    </div>

                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import usePosts from "~/composables/UsePosts";
import Post from "~/store/models/Post";
import {definePageMeta} from "nuxt/dist/pages/runtime";
import {onMounted} from "vue";

const {posts,fetchPosts,initializeStore}=usePosts();

await initializeStore();
console.log("hey:"+posts.length);

onMounted(()=>{
  /**
   * Whenever the user scrolls , keep fetching posts.
   */
  window.addEventListener("scroll",()=>{
    fetchPosts();
    console.log("data fetching start");
  })
});

</script>

<style scoped>

</style>