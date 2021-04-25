<template lang="pug">
div.mx-auto
  button(v-popper="{popper: searchSelectRef}" ref="el") {{value && value.length ? `已选择${value.length}项` : '请选择'}}
  button(@click="clickHandle") 查询

  a-popper(ref="searchSelectRef" :reference="$refs.el")
    a-search-select(v-model="value" :options="options" :search="true" :multiple="true" :status="status" @update="updateHandle")
      button(v-if="status === 1" class="p-1 text-sm" @click="updateHandle") 更多...
      div.flex.items-center.justify-center(v-if="status === 2" class="p-1 text-sm") 加载中
        svg(viewBox="0 0 24 24" width="20" height="20" class="ml-1")
          path(fill="none" d="M0 0h24v24H0z")
          path(d="M3.055 13H5.07a7.002 7.002 0 0 0 13.858 0h2.016a9.001 9.001 0 0 1-17.89 0zm0-2a9.001 9.001 0 0 1 17.89 0H18.93a7.002 7.002 0 0 0-13.858 0H3.055z")
</template>

<script>
import {reactive, toRefs, watch} from 'vue'

import ASearchSelect from '../../components/elements/a-search-select.vue'
import APopper from '../../components/elements/a-popper.vue'
import popper from '../../directives/popper'

export default {
  directives: {
    popper,
  },

  components: {
    ASearchSelect,
    APopper,
  },

  setup (props) {
    const state = reactive({
      value: null,
      showSelect: false,
      status: 1,
      searchSelectRef: null,
      el: undefined,
    })

    const options = [
      ['a', 'A'],
      ['b', 'B'],
      ['c', 'C'],
    ].concat(Array.from({length: 20}).map((it, idx) => [idx, idx + '_' + String(Math.random()) + String(Math.random())]))

    function clickHandle () {
      console.log(state.value)
    }

    function updateHandle () {
      console.log('get more ...')
    }

    return {
      ...toRefs(state),
      options,

      clickHandle,
      updateHandle,
    }
  },
}
</script>
