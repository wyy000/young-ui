<template lang="pug">
div(class="relative h-screen overflow-hidden text-base")
  //主视图层
  app-main-layer.h-full
  //模态框层
  app-modal-layer.z-10
  //全局提示
  app-message-layer.z-20
  //浮动层
  div(v-if="stack.length" class="fixed z-[2] bottom-0 inset-x-0 h-0 flex justify-center items-end")
    component(v-for="(item, idx) of stack" :key="idx" :is="floats[item.name]" v-bind="item.props" v-on="item.listeners")
</template>

<script>
import AppMainLayer from "@/components/app/app-main-layer.vue"
import AppModalLayer from "@/components/app/app-modal-layer.vue"
import AppMessageLayer from "@/components/app/app-message-layer.vue"
import AppFloatLayer from "../../components/app/app-float-layer.vue"

import {defineComponent, markRaw, provide, reactive, toRefs, watch} from 'vue'

export default defineComponent({
  components: {
    AppMainLayer,
    AppModalLayer,
    AppMessageLayer,
    AppFloatLayer,
  },
}

  setup () {
    const state = reactive({
      stack: [],
    })

    const floats = markRaw({})

    provide('mainLayer', {
      mainLayer: (name, component) => {
        floats[name] = component

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

    watch(() => state.stack, value => {
      console.log(value, 678678)
    })

    return {
      ...toRefs(state),
      floats,
    }
  },
})
</script>
