<template lang="pug">
div(:class="['p-2 mt-2 mx-auto w-4/12 bg-white text-center text-sm border flex items-center', style]")
  span.flex-1 {{message}} {{id}}
  svg(viewBox="0 0 24 24" width="24" height="24" fill="currentColor" @click="remove(id)")
    path(fill="none" d="M0 0h24v24H0z")
    path(d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z")
</template>

<script>
import {computed} from 'vue'

import {remove} from '@/composables/useMessage'

export default {
  props: {
    type: {
      type: String,
      default: 'default',
    },
    message: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      require: true,
    },
  },

  setup (props) {
    const style = computed(() => ({
      default: 'border-emerald-500 text-coolGray-600',
      success: 'border-coolGray-500 text-coolGray-600',
      warn: 'border-yellow-500 text-coolGray-600',
      error: 'border-red-500 text-red-500',
    }[props.type]))

    return {
      style,

      remove,
    }
  },
}
</script>
