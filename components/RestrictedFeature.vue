<template>
  <div>
    <div class="container">
      <div class="position-relative">
        <div >
          <slot></slot>
        </div>
        <div v-if="!isUserConnected" class="overlay show" id="overlay">
          <div>
            <a href="#" aria-current="page" data-bs-toggle="modal" data-bs-target="#login" class="btn btn-warning rounded-0"><i class="fa fa-lock"></i> Login</a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useStore} from "vuex";
import User from "~/store/models/User";
import {computed, ComputedRef} from "vue";

const store=useStore();

/**
 * Show or hide the feature depending on whether the user is connected or not.
 */
const isUserConnected:ComputedRef<boolean>=computed(()=>{
  const user:User=store.getters.GET_USER;

  return (user!==null && user.loggedIn)? true : false;
});

</script>

<style scoped>

</style>