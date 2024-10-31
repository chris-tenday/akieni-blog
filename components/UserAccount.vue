<template>
  <div class="mb-2 mt-2">
    <div class="mb-2">
      <a href="" @click.prevent="login=true">Login</a> / <a href="" @click.prevent="login=false">Register</a>
    </div>

    <!-- form for registering an account !-->
    <form v-if="!login" action="">
      <h4 class="text-center">Register to Akieni now !</h4>
      <div class="form-group mb-2">
        <input type="text" class="form-control rounded-0" placeholder="Your name">
      </div>
      <div class="form-group mb-2">
        <input type="email" class="form-control rounded-0" placeholder="Your email">
      </div>
      <div class="d-flex mb-2">
        <input type="password" style="max-width:50%;" class="form-control rounded-0 me-1" placeholder="Type your password">
        <input type="email" style="max-width:50%;" class="form-control rounded-0" placeholder="Confirm your password">
      </div>
      <div class="form-group">
        <button class="btn btn-primary rounded-0">Register</button>
      </div>
    </form>
    <form v-else action="">
      <h4 class="text-center">Login to Akieni now !</h4>
      <div class="form-group mb-2">
        <input type="text" class="form-control rounded-0" placeholder="email">
      </div>
      <div class="form-group mb-2">
        <input type="password" class="form-control rounded-0" placeholder="password">
      </div>
      <div class="form-group">
        <button class="btn btn-primary rounded-0">Login</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const login=ref(true);

</script>

<style scoped>

</style>