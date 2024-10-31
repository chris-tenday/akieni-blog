<template>
  <div class="modal fade" :id="targetId" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <button id="closeBtn" type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
      <div class="modal-content">

        <div class="modal-body p-0">
          <!-- load content dynamicaly here !-->
          <slot @closemodal="closeModal"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props:{
    targetId:String,
    onActionComplete:{
      type:Function,
    }
  },
  methods:{
    closeModal()
    {
      /**
       * Close the modal
       */
      console.log("heyy closing...");
      document.getElementById("closeBtn").click();
    }
  }
}
</script>

<style scoped>

</style>