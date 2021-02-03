<template lang="pug">
a-text-input(v-model="keyword" class="w-80 text-white border border-white rounded-md bg-emerald-500 focus:bg-white focus:ring-0 focus:border-white focus:text-coolGray-500")
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
