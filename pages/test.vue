<template>
  <div>
    <h1>Hello</h1>
  </div>
</template>

<script>
import {useStore} from "vuex";

export default {
  name: "test",
  setup(){
    if(process.server)
    {
      const store =useStore();
      console.log("on setup from server =>"+store.state.baseUrl)

    }

    if(process.client)
    {
      console.log("on setup from client")
    }
  },
  mounted() {
    console.log("Page mounted...");
  }
}
</script>

<style scoped>

</style>