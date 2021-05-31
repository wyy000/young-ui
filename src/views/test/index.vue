<template lang="pug">
div.p-4.flex.justify-center.divide-x
  router-link(v-for="it of nav" :to="`/test/${it.path}`" class="px-2 py-0.5") {{it.path}}
router-view
</template>

<script>
import {ref} from 'vue'
import test from './index'

export default {
  setup () {
    const nav = ref(test())

    return {
      nav,
    }
  },
}
</script>

<style lang="scss" scoped>
.router-link-active {
  @apply bg-emerald-500 text-white;
}
</style>
