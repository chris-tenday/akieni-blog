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
                <a class="nav-link active" aria-current="page" href="#publishSection"><i class="fa fa-plus-circle"></i> Publish</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#myModal"><i class="fas fa-user"></i> Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>

  <Modal>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-md-12">
          <UserAccount/>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "~/components/Modal.vue";
import UserAccount from "~/components/UserAccount.vue";
export default {
  name: "Header",
  components: {UserAccount, Modal}
}
</script>

<style scoped>

</style>