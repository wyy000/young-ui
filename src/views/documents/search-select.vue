<template lang="pug">
div.h-full.flex.items-start
  button(class="w-80 py-1.5 mx-auto border rounded" @click="clickHandle($event.currentTarget)") {{value?.length ? `已选择${value.length}项` : '请选择'}}

  a-search-select(
    v-if="visible"
    v-model="value"
    v-model:visible="visible"
    :refEl="refEl"
    :multiple="true"
    :options="options"
    :search="true"
    :status="status"
  )
    div(v-if="status === 1" class="text-center text-sm")
      button(class="p-2 focus:outline-none" @click="updateHandle") 更多...
    div.flex.items-center.justify-center(v-if="status === 2" class="mx-auto p-1 text-sm") 加载中
      svg(viewBox="0 0 24 24" width="20" height="20" class="ml-1")
        path(fill="none" d="M0 0h24v24H0z")
        path(d="M3.055 13H5.07a7.002 7.002 0 0 0 13.858 0h2.016a9.001 9.001 0 0 1-17.89 0zm0-2a9.001 9.001 0 0 1 17.89 0H18.93a7.002 7.002 0 0 0-13.858 0H3.055z")
</template>

<script>
import {inject, reactive, toRefs, watch} from 'vue'

import ASearchSelect from '../../components/elements/a-search-select.vue'
import APopper from '../../components/elements/a-popper.vue'

export default {
  components: {
    ASearchSelect,
    APopper,
  },

  setup (props) {
    inject('mainLayer')

    const refs = reactive({
      refEl: null,
    })

    const state = reactive({
      value: [],
      status: 1,
      visible: false,
    })

    watch(() => state.value, () => state.visible = false, {immediate: true})

    const options = [
      ['a', 'A'],
      ['b', 'B'],
      ['c', 'C'],
    ].concat(Array.from({length: 20}).map((it, idx) => [idx, idx + '_' + String(Math.random()) + String(Math.random())]))

    function clickHandle (refEl) {
      refs.refEl = refEl
      state.visible = true
    }

    function updateHandle () {
      console.log('get more ...')
    }

    return {
      ...toRefs(refs),
      ...toRefs(state),
      options,

      clickHandle,
      updateHandle,
    }
  },
}
</script>
