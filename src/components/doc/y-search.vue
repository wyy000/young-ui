<template lang="pug">
div(class="rounded-md bg-emerald-500 flex")
  span(class="w-16 border border-white border-r-0 rounded-l-md flex items-center")
    svg(fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mx-auto")
      path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z")
  a-text-input(v-model="keyword" class="w-80 text-white border-white border-l-0 rounded-r-md bg-emerald-500 focus:ring-0 focus:bg-white focus:border-white focus:text-coolGray-500")
</template>

<script>
import {reactive, toRefs} from 'vue'

import ATextInput from '@/components/elements/a-text-input.vue'

export default {
  components: {
    ATextInput,
  },

  setup (props) {
    const state = reactive({
      keyword: null,
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss" scoped>
input {
  &::placeholder {
    @apply text-white;
  }

  &:focus::placeholder {
    @apply text-coolGray-400;
  }
}
</style>
