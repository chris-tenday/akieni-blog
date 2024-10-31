<template>
  <div>
    <div class="container">
      <div class="position-relative">
        <div >
          <slot></slot>
        </div>
        <div :class="`overlay ${isUserConnected}`" id="overlay">
          <div>
            <a href="#" aria-current="page" data-bs-toggle="modal" data-bs-target="#login" class="btn btn-warning rounded-0"><i class="fa fa-lock"></i> Login</a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import User from "~/store/models/User";

export default {
  name: "RestrictedFeature",
  setup(){
    const store=useStore();

    return{
      store
    }
  },
  computed:{
    isUserConnected()
    {
      let user=this.store.getters.GET_USER;
      if(user!==null && user.loggedIn)
      {
        return 'hide';
      }

      return 'show';
    }
  }
}
</script>

<style scoped>

</style>