<template lang="pug">
div(class="relative m-6")
  div(class="relative" style="height: 600px;")
    a-table-tbodies(:meta="meta" :data="initData" :tbodies="tbodies" hover-type="cell")
      template(#name="{row}")
        h4 {{row.name}}
        div(class="text-coolGray-500 text-sm") {{row.description}}
      template(v-for="(sec, idx) of tbodies.filter(it => it.slot)" v-slot:[sec.slot]="{tbodies}")
        div( class="flex justify-center items-center")
          svg(viewBox="0 0 24 24" width="18" height="18")
            path(fill="none" d="M0 0h24v24H0z")
            path(d="M10.9 2.1l9.899 1.415 1.414 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1zm.707 2.122L3.828 12l8.486 8.485 7.778-7.778-1.06-7.425-7.425-1.06zm2.12 6.364a2 2 0 1 1 2.83-2.829 2 2 0 0 1-2.83 2.829z")
          div(class="p-1") {{tbodies.name}}
      template(#thead-actions)
        div(class="h-full flex flex-col")
          svg(viewBox="0 0 24 24" width="24" height="24")
            path(fill="none" d="M0 0h24v24H0z")
            path(d="M7.05 13.406l3.534 3.536-1.413 1.414 1.415 1.415-1.414 1.414-2.475-2.475-2.829 2.829-1.414-1.414 2.829-2.83-2.475-2.474 1.414-1.414 1.414 1.413 1.413-1.414zM3 3l3.546.003 11.817 11.818 1.415-1.414 1.414 1.414-2.474 2.475 2.828 2.829-1.414 1.414-2.829-2.829-2.475 2.475-1.414-1.414 1.414-1.415L3.003 6.531 3 3zm14.457 0L21 3.003l.002 3.523-4.053 4.052-3.536-3.535L17.457 3z")
          div Actions
      template(#tbody-actions="{row}")
        div(class="px-1 flex justify-start space-x-1 divide-x")
          y-button(v-if="row.type === 1 || row.type === 3" kind="error" size="xs" @click="click(row, 'delete')") delete
          y-button(v-if="row.type === 2" size="xs" @click="click(row, 'click')") click
          y-button(v-if="row.type === 3" kind="success" size="xs" @click="click(row, 'add')") add
  a-table-paging(:total="total" :page.sync="page" :page-size="pageSize" class="w-page z-0 border border-t-0")

  //div(class="overflow-auto" style="height: 600px;")
    a-table-tbodies(:meta="meta" :data="data" hover-type="row" :tbodies="[{filter: data => data.filter(it => it.type === 1)}, {data}]" :total="total" :page.sync="page" :page-size="pageSize")
      //a-table-tbodies(:meta="meta" :data="data" hover-type="row" :tbodies="[{filter: data => data.filter(it => it.type === 1)}, {data}]")
      template(#name="{row}")
        h4 {{row.name}}
        div(class="text-coolGray-500 text-sm") {{row.description}}
</template>

<script>
import {reactive, toRefs, watch} from 'vue'

import ATablePaging from '@/components/elements/a-table-paging.vue'
import ATableTbodies from '@/components/elements/a-table-tbodies.vue'
import YButton from '@/components/element/y-button.vue'

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
    ATablePaging,
    ATableTbodies,
    YButton,
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

      click,
    }
  },
}
</script>
