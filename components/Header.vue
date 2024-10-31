<template>
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
                <NuxtLink class="nav-link active" aria-current="page" to="/"><i class="fa fa-home"></i> Home</NuxtLink>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#" aria-current="page" data-bs-toggle="modal" data-bs-target="#publish"><i class="fa fa-plus-circle"></i> Publish</a>
              </li>
              <li class="nav-item">
                <a v-if="user===null || !user.loggedIn" class="nav-link" href="#" aria-current="page" data-bs-toggle="modal" data-bs-target="#login"><i class="fas fa-user"></i> Login</a>
                <a v-else-if="user.loggedIn!==undefined && user.loggedIn" class="nav-link" style="color:blue;" href="#" @click.prevent="logout(user)"><i class="fa fa-user"></i> {{user.name}} [x]</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>

  <!-- login Modal !-->
  <Modal target-id="login">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-md-12">
          <UserAccount @auth="closeModal"/>
        </div>
      </div>
    </div>
  </Modal>

  <!-- publish Post Modal !-->
  <Modal target-id="publish">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-md-12">
          <PublishPost/>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "~/components/Modal.vue";
import UserAccount from "~/components/UserAccount.vue";
import PublishPost from "~/components/PublishPost.vue";
import {useStore} from "vuex";
import useAccount from "~/composables/useAccount.ts";
export default {
  setup(){
    const store=useStore();
    const {logout}=useAccount();

    return {
      store,
      logout
    }
  },
  name: "Header",
  components: {PublishPost, UserAccount, Modal},
  computed:{
    user(){
      return this.store.getters.GET_USER;
    }
  },
  methods:{
    closeModal() /** method use to close the modal */
    {
      document.getElementById("closeBtn").click();
    }
  }

}
</script>

<style scoped>

</style>