<template lang="pug">
div(class="relative")
  button(
    :disable="disableRef"
    :class="['relative text-white outline-none focus:outline-none flex flex-none items-center', {'opacity-50': disableRef}, styleComputed]"
    @click="$emit('click')"
  )
    div(v-if="busyRef" class="absolute top-0 bottom-0 left-0 right-0 z-1 opacity-100 flex justify-center items-center")
      y-spinner(class="w-4 h-4")
    slot
</template>

<script lang="ts">
import {computed, defineComponent, PropType, reactive} from 'vue'

import YSpinner from './y-spinner.vue'

export default defineComponent({
  components: {
    YSpinner,
  },

  props: {
    kind: {
      type: String as PropType < 'primary' | 'warn' | 'error' | 'success' >,
      default: 'primary',
    },
    size: {
      type: String as PropType < 'xs' | 'sm' | 'md' | 'lg' >,
      default: 'md',
    },
    busy: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['click'],

  setup (props, {attrs}) {
    const state = reactive({
      busy: false,
      disable: false,
    })

    const busyRef = computed(() => props.busy || state.busy)
    const disableRef = computed(() => props.disable || state.disable || busyRef.value)

    const styleComputed = computed(() => [
      {
        xs: 'px-2 py-1 text-xs rounded-sm',
        sm: 'px-3 py-1 text-sm rounded',
        md: 'px-4 py-1.5 text-base rounded-md',
        lg: 'px-5 py-2 text-lg rounded-lg',
      }[props.size],
      {
        primary: 'bg-emerald-500 hover:bg-emerald-400',
        warn: 'bg-amber-500 hover:bg-amber-400',
        error: 'bg-red-500 hover:bg-red-400',
        success: 'bg-blue-500 hover:bg-blue-400',
      }[props.kind],
      {
        default: 'cursor-pointer',
        busy: 'cursor-wait',
        disable: 'cursor-not-allowed',
      }[busyRef.value ? 'busy' : disableRef.value ? 'disable' : 'default'],
    ].filter(it => Boolean(it)))

    /*const handler = (e: any) => {
      if (attrs.onClick) {
        const ret = (<any>attrs.onClick)()
        if (ret instanceof Promise) {
          state.busy = true
          ret.then(() => state.busy = false,
            error => {
              state.busy = false
              return Promise.reject(error)
            })
        } else {
          (<any>attrs.onClick)(e)
        }
      }
    }*/

    return {
      styleComputed,

      busyRef,
      disableRef,

      // handler,
    }
  }
})
</script>
