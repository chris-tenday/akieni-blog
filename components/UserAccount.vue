<template>
  <div class="mb-2 mt-2">
    <div class="mb-2">
      <a href="" @click.prevent="login=true">Login</a> / <a href="" @click.prevent="login=false">Register</a>
    </div>

    <!-- form for registering an account !-->
    <form v-if="!login" action="" @submit.prevent="auth('register')">
      <h4 class="text-center">Register to Akieni now !</h4>
      <div class="form-group mb-2">
        <input v-model="user.name" type="text" class="form-control rounded-0" placeholder="Your name">
      </div>
      <div class="form-group mb-2">
        <input v-model="user.email" type="email" class="form-control rounded-0" placeholder="Your email">
      </div>
      <div class="d-flex mb-2">
        <input v-model="user.password" type="password" style="max-width:50%;" class="form-control rounded-0 me-1" placeholder="Type your password">
        <input v-model="confirmPass" type="password" style="max-width:50%;" class="form-control rounded-0" placeholder="Confirm your password">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary rounded-0">Register</button>
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
import {reactive, ref} from "vue";
import User from "~/store/models/User";
import useAccount from "~/composables/useAccount";
import useNotification from "~/composables/useNotification";

const login=ref(true);
const confirmPass=ref('');

const user:User=reactive(new User());
const emit=defineEmits();

const {registerAccount}=useAccount();

const auth=(authType:string)=>{
  if(authType==="register")
  {
    /**
     * Perform a register.
     */
    if(user.password!==confirmPass.value)
    {
      useNotification().display("Your passwords did not match","error");
      //emit("close","Close now");
      return ;
    }
    registerAccount(user);
  }
  else
  {

  }
};
</script>

<style scoped>

</style>