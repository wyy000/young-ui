<template lang="pug">
section(v-if="show" class="overflow-hidden")
  div
    h2 conditionsSS
    div(v-for="it of 10") {{it}}
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>

</style>