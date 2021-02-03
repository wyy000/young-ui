<template lang="pug">
//主视图层
app-main-layer
//模态框层
app-modal-layer
//全局提示
app-message-layer
</template>

<script>
import AppMainLayer from "@/components/app/app-main-layer";
import AppModalLayer from "@/components/app/app-modal-layer";
import AppMessageLayer from "@/components/app/app-message-layer";

export default {
  components: {
    AppMainLayer,
    AppModalLayer,
    AppMessageLayer,
  },

  setup () {

  },
}
</script>

<style scoped>

</style>
