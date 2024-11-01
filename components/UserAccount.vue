<template>
  <div class="mb-2 mt-2">
    <div class="mb-2">
      <a href="" @click.prevent="wantsToLogIn=true">Login</a> / <a href="" @click.prevent="wantsToLogIn=false">Register</a>
    </div>

    <!-- form for registering an account !-->
    <form v-if="!wantsToLogIn" action="" @submit.prevent="auth('register')">
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
    <form v-else action="" @submit.prevent="auth('login')">
      <h4 class="text-center">Login to Akieni now !</h4>
      <div class="form-group mb-2">
        <input v-model="email" type="text" class="form-control rounded-0" placeholder="email">
      </div>
      <div class="form-group mb-2">
        <input v-model="password" type="password" class="form-control rounded-0" placeholder="password">
      </div>
      <div class="form-group">
        <button class="btn btn-primary rounded-0" type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref,defineEmits} from "vue";
import User from "~/store/models/User";
import useAccount from "~/composables/useAccount";
import useNotification from "~/composables/useNotification";

const {notify}=useNotification();

const wantsToLogIn=ref(true);
const confirmPass=ref('');
const user:User=reactive(new User());
const emit=defineEmits();
/**
 * States for user login
 */
const email=ref("");
const password=ref("");

const {registerAccount,login}=useAccount();

const auth=async (authType:string)=>{
  if(authType==="register")
  {
      /**
       * Perform a register.
       */
      if(user.password!==confirmPass.value)
      {
        notify("Your passwords did not match","error");
        return ;
      }
      try
      {
        await registerAccount(user);
        emit("auth"); /** emit the auth to alert the parent component that the auth is finished.*/
      }
      catch(error)
      {
        /**
         * Display the error.
         */
        notify(error.message,"error");
      }
  }
  else
  {
    var response=await await login(email.value,password.value);

    if(response)
    {
      /**
       * Emit this event so to alert the parent component that the authentification has been successfull
       */
        emit("auth");
      /**
       * Clear.
       */
      email.value="";
      password.value="";
    }
    else
    {
      /**
       * Failed.
       */
      notify("Email or password incorrect !","error");
    }


  }
};
</script>

<style scoped>

</style>