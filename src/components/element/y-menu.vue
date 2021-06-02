<template lang="pug">
ul.flex.flex-col.p-1(id="ul")
  li(v-for="(it, idx) of list" class="p-1")
    router-link(v-if="it.path" :to="it.path") {{it.name}}
    template(v-else) {{it.name}}
      y-menu(:list="it" class="pl-2")
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
  },
}
</script>

<style lang="scss" scoped>
.router-link-active {
  @apply text-emerald-500;
}
</style>
