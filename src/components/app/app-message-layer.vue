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
  div(v-for="{id, type, message} of messageStack" :key="id" :class="['p-2 mb-2 mx-auto w-4/12 bg-white text-center text-sm border flex items-center', style(type)]")
    span.flex-1 {{message}}
    svg(viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="cursor-pointer" @click="remove(id)")
      path(fill="none" d="M0 0h24v24H0z")
      path(d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z")
</template>

<script>
import {ref, watch} from 'vue'
import {stack, remove} from '@/composables/useMessage'

export default {
  setup () {
    const messageStack = ref(stack.value)
    const closeList = ref({})

    const style = type => ({
      info: 'border-coolGray-500 text-coolGray-600',
      success: 'border-emerald-500 text-emerald-600',
      warn: 'border-yellow-500 text-yellow-600',
      error: 'border-red-500 text-red-500',
    }[type])

    watch(() => messageStack.value, value => {
      value.length && value
        .filter(it => (it.type === 'success' || it.type === 'info') && !closeList.value[it.id])
        .forEach(it => {
          const timer = setTimeout(() => {
            remove(it.id)
            delete closeList.value[it.id]
          }, 3000)
          closeList.value[it.id] = timer
        })
    }, {deep: true})

    return {
      messageStack,

      style,

      remove,
    }
  },
}
</script>

<style scoped>

</style>
