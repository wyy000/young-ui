<template lang="pug">
div.h-full.flex.flex-col.space-y-4
  y-card(class="bg-coolGray-800 text-coolGray-300 text-sm")
    table(class="w-full table-fixed")
      thead
        tr
          th(v-for="it of column" :key="it" class="pb-2") {{it}}
      tbody
        tr(v-for="(item, idx) of propsData" :key="idx")
          td(v-for="it of column" class="p-1") {{item[it]}}
  div.flex.items-start
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
import YCard from '../../components/element/y-card.vue'

export default {
  components: {
    ASearchSelect,
    APopper,
    YCard,
  },

  setup (props) {
    inject('mainLayer')

    const column = ['name', 'type', 'required', 'default']
    const propsData = Object.entries(ASearchSelect.props).map(item => ({
      name: item[0],
      type: Array.isArray(item[1].type) ? item[1].type.map(it => it.name).join(',') : item[1].type?.name,
      required: item[1].required ?? false,
      default: item[1].default,
    }))

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

      column,
      propsData,

      clickHandle,
      updateHandle,
    }
  },
}
</script>

<style lang="scss" scoped>
tbody tr {
  &:hover {
    @apply text-white bg-emerald-900;
  }

  td {
    @apply border border-coolGray-500;
  }
}
</style>
