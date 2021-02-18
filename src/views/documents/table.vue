<template lang="pug">
div(class="relative m-6")
  div(class="relative w-page")
    a-table-tbodies(:meta="meta" :data="initData" :tbodies="tbodies" hover-type="cell")
      template(#name="{row}")
        h4 {{row.name}}
        div(class="text-coolGray-500 text-sm") {{row.description}}
      template(v-for="(sec, idx) of tbodies" v-slot:[sec.slot]="{tbodies}")
        div( class="flex justify-center items-center")
          svg(viewBox="0 0 24 24" width="18" height="18")
            path(fill="none" d="M0 0h24v24H0z")
            path(d="M10.9 2.1l9.899 1.415 1.414 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1zm.707 2.122L3.828 12l8.486 8.485 7.778-7.778-1.06-7.425-7.425-1.06zm2.12 6.364a2 2 0 1 1 2.83-2.829 2 2 0 0 1-2.83 2.829z")
          div(class="p-1") {{tbodies.name}}
  a-table-paging(:total="total" :page.sync="page" :page-size="pageSize" class="w-page z-0 border border-t-0")

  //div(class="overflow-auto" style="height: 500px;")
    a-table-tbodies(:meta="meta" :data="data" hover-type="row" :tbodies="[{filter: data => data.filter(it => it.type === 1)}, {data}]" :total="total" :page.sync="page" :page-size="pageSize")
      template(#name="{row}")
        h4 {{row.name}}
        div(class="text-coolGray-500 text-sm") {{row.description}}
</template>

<script>
import {reactive, toRefs, watch} from 'vue'

import ATablePaging from '@/components/elements/a-table-paging.vue'
import ATableTbodies from '@/components/elements/a-table-tbodies.vue'

const initData = Array.from({length: 15}).map(it => ({
  createTime: 1607503775095,
  description: "这是一条很长很长很长的描述，一共有20个字;这是一条很长很长很长的描述，一共有20个字;一共有20个字;一共有20个字;一共有20个字;",
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
    ATablePaging,
    ATableTbodies,
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

    state.meta = {
      columns: [
        {slot: 'name', title: '名称／描述'},
        {prop: 'id', title: 'ID'},
        {prop: 'downstream', title: '下游系统', width: 110},
        {prop: 'type', title: '类型', width: 110},
        {prop: 'createTime', title: '创建时间', width: 220, class: 'tabular-nums', fixed: 'right'},
        {prop: 'updateTime', title: '更新时间', width: 220},
      ],
      actions: [
        {icon: 'M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z', onclick: ({row}) => console.log(row)},
        {icon: 'M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z', onclick: ({row}) => console.log(row)},
      ],
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

    return {
      initData,
      ...toRefs(state),
    }
  },
}
</script>
