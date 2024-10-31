<template>
  <div class="modal fade" :id="targetId" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
      <div class="modal-content">

        <div class="modal-body p-0">
          <!-- load content dynamicaly here !-->
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props:{
    targetId:String
  }
}
</script>

<style scoped>

</style>