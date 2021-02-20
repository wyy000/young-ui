<template lang="pug">
a-table-tbodies(:meta="meta" :data="data" hover-type="row")
</template>

<script>
import ATableTbodies from '@/components/elements/a-table-tbodies.vue'

export default {
  components: {
    ATableTbodies,
  },

  setup () {
    const data = Array.from({length: 3}).map(it => ({
      description: "但是描述却不复杂",
      id: "3639795126828695955",
      transaction: "对私交易",
      updateTime: 1607503775095,
    }))
    const meta = {
      columns: [
        {prop: 'id', title: 'ID', width: 300},
        {prop: 'transaction', title: '商机交易类型', width: 150},
        {prop: 'description', title: '描述'},
        {prop: 'updateTime', title: '更新时间', width: 220},
      ]
    }

    return {
      data,
      meta,
    }
  },
}
</script>
