<template lang="pug">
div(class="relative h-screen overflow-hidden text-base")
  //主视图层
  app-main-layer.h-full
  //模态框层
  app-modal-layer.z-10
  //全局提示
  app-message-layer.z-20
</template>

<script>
import AppMainLayer from "@/components/app/app-main-layer.vue"
import AppModalLayer from "@/components/app/app-modal-layer.vue"
import AppMessageLayer from "@/components/app/app-message-layer.vue"

export default {
  components: {
    AppMainLayer,
    AppModalLayer,
    AppMessageLayer,
  },
}
</script>

<style scoped>

</style>
