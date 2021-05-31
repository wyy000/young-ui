<template lang="pug">
div(v-if="stack.length" class="fixed z-[2] bottom-0 inset-x-0 h-0 flex justify-center items-end")
  component(v-for="(item, idx) of stack" :key="idx" :is="item.component" v-bind="item.props" v-on="item.listeners")
</template>

<script>
import {defineComponent, provide, reactive, toRefs} from 'vue'

export default defineComponent({
  setup () {
    const state = reactive({
      floats: [],
      stack: [],
    })

    provide('mainLayer', {
      mainLayer: (name, component) => {
        state.floats.findIndex(it => it.name === name) > -1 ? '' : state.floats.push({name, component})

        return (name => ({
          show: ({...props}) => {
            state.stack.push({name, ...props})
          },
          hide: (name) => {
            const index = state.stack.findIndex(it => it.name === name)
            index ? state.stack.splice(index, 1) : state.stack.shift()
          },
        }))(name)
      }
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>
