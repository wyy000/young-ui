<template lang="pug">
div(class="relative m-6")
  div.py-2.flex.space-x-2.items-center
    label
      input(v-model="scrollX" type="checkbox")
      span scrollX
    label
      input(v-model="scrollY" type="checkbox")
      span scrollY
    a-select(v-model="footer" :options="[['inner'], ['other'], ['none']]" placeholder="footer" class="w-36")

  div(:class="['overflow-auto', {'w-page': scrollX}]" :style="{height: scrollY ? '600px' : 'auto'}")
    a-table-tbodies(:meta="meta" :data="data" hover-type="row" :tbodies="[{filter: data => data.filter(it => it.type === 1)}, {data}]" :total="footer === 'inner' ? total : undefined" v-model:page="page" :page-size="pageSize")
      template(#name="{row}")
        h4 {{row.name}}
        div(class="text-coolGray-500 text-sm") {{row.description}}
      template(#tbody-collapse="{row, showCollapse}")
        svg(viewBox="0 0 24 24" width="24" height="24" class="mx-2" @click="row.showCollapse = !row.showCollapse")
          path(fill="none" d="M0 0h24v24H0z")
          path(d="M12 3c-.825 0-1.5.675-1.5 1.5S11.175 6 12 6s1.5-.675 1.5-1.5S12.825 3 12 3zm0 15c-.825 0-1.5.675-1.5 1.5S11.175 21 12 21s1.5-.675 1.5-1.5S12.825 18 12 18zm0-7.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5z")
      template(#collapse="{row, showCollapse}")
        mini-table(v-if="showCollapse")
  a-table-paging(v-if="footer === 'other'" :total="total" v-model:page="page" :page-size="pageSize" :class="['z-0 border border-t-0', {'w-page': scrollX}]")
</template>

<script>
import {reactive, toRefs, watch} from 'vue'

import ASelect from '@/components/elements/a-select.vue'
import ATablePaging from '@/components/elements/a-table-paging.vue'
import ATableTbodies from '@/components/elements/a-table-tbodies.vue'
import YButton from '@/components/element/y-button.vue'

import MiniTable from '@/views/documents/mini-table.vue'

const initData = Array.from({length: 15}).map(it => ({
  createTime: 1607503775095,
  description: "这是一条很长很长很长的描述，一共有20个字",
  downstream: "imcs",
  id: "3639795126828695955",
  name: "一个复杂的商机",
  transaction: "对私交易",
  type: Math.random() > 0.4 ? 1 : 2,
  updateTime: 1607503775095,
}))
const otherData = Array.from({length: 2}).map(it => ({
  createTime: 1607503775095,
  description: "但是描述却不复杂",
  downstream: "imcs",
  id: "3639795126828695955",
  lastStatusEvent: 1,
  name: "一个复杂的商机",
  transaction: "对私交易",
  type: 3,
  updateTime: 1607503775095,
}))

export default {
  components: {
    ASelect,
    ATablePaging,
    ATableTbodies,
    YButton,
    MiniTable,
  },

  setup () {
    const state = reactive({
      meta: [],
      data: [],
      tbodies: [],
      page: 1,
      pageSize: 10,
      total: null,
    })

    const show = reactive({
      scrollX: true,
      scrollY: true,
      // 'inner' | 'other' | 'none'
      footer: 'none',
    })

    state.meta = {
      columns: [
        {slot: 'name', title: '名称／描述', width: 500},
        {prop: 'transaction', title: '商机交易类型', width: 150},
        {prop: 'description', title: '描述'},
        {prop: 'id', title: 'ID', width: 300},
        {prop: 'downstream', title: '下游系统', width: 120},
        {prop: 'type', title: '类型', width: 120},
        {prop: 'createTime', title: '创建时间', width: 220, class: 'tabular-nums'},
        {prop: 'updateTime', title: '更新时间', width: 220},
      ],
      actions: {theadSlot: 'thead-actions', fixed: 'right'},
      collapse: {slot: 'collapse', onclick: ({row}) => row.showCollapse = !row.showCollapse},
    }

    state.tbodies = [
      {data: otherData},
      {slot: 'type-1', name: '类型一', filter: data => data.filter(it => it.type === 1)},
      {slot: 'type-2', name: '类型二', filter: data => data.filter(it => it.type === 2)},
    ]

    watch(() => [state.page, state.pageSize], ([page, pageSize]) => {
      state.total = initData.length
      state.data = initData.map(it => it).splice((page - 1) * pageSize, pageSize)
    }, {immediate: true})

    function click (...arg) {
      console.log(...arg)
    }

    return {
      initData,
      ...toRefs(state),
      ...toRefs(show),

      click,
    }
  },
}
</script>
