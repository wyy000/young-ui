<template lang="pug">
transition-group(
  tag="div"
  class="absolute inset-x-0 bottom-0 h-0 bg-black bg-opacity-50 flex flex-col justify-end items-center"
  enter-from-class="opacity-0 translate-y-5"
  leave-to-class="opacity-0 -translate-y-5 scale-95"
  enter-active-class="transform transition duration-200 ease-in-out"
  leave-active-class="transform transition duration-200 ease-in-out"
  move-class="transition duration-200 ease-in-out"
)
  div(v-if="messageStack.length" class="p-0 fixed right-0 top-20 left-0 h-0 flex flex-col")
    y-message(v-for="it of messageStack" v-show="it" v-bind="it.props")
</template>

<script>
import {ref} from 'vue'
import {stack} from '@/composables/useMessage'

import YMessage from '@/components/element/y-message.vue'

export default {
  components: {
    YMessage,
  },

  setup () {
    const messageStack = ref(stack.value)

    return {
      messageStack,
    }
  },
}
</script>

<style scoped>

</style>
