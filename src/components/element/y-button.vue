<template lang="pug">
button(:class="['text-white outline-none focus:outline-none flex flex-none items-center', sizeStyleCom]" @click.stop="$event => handler($event)")
  slot
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue'

export default defineComponent({
  props: {
    kind: {
      type: String as PropType < 'primary' | 'warn' | 'error' | 'success' > ,
      default: 'primary',
    },
    size: {
      type: String as PropType < 'xs' | 'sm' | 'md' | 'lg' > ,
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
    click: {
      type: Function,
      default: () => null,
    },
  },

  setup (props) {
    const sizeStyleCom = computed(() => [
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
    ])

    const handler = (e: any) => {

    }

    return {
      sizeStyleCom,

      handler,
    }
  }
})
</script>
