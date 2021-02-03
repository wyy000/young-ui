<template lang="pug">
div(class="w-page mx-auto")
  y-table(:data="data")
</template>

<script>
import {defineComponent, reactive, toRefs} from 'vue'

import YTable from '@/components/element/y-table.vue'

export default defineComponent({
  components: {
    YTable,
  },

  setup () {
    const state = reactive({
      data: [],
    })

    state.data = [
      {city: '北京', time: '2021-01-25', eg: 'Beijing'},
      {city: '上海', time: '2021-01-26', eg: 'Shanghai'},
      {city: '深圳', time: '2021-01-27', eg: 'Shenzhen'},
      {city: '北京', time: '2021-01-25', eg: 'Beijing'},
      {city: '上海', time: '2021-01-26', eg: 'Shanghai'},
      {city: '深圳', time: '2021-01-27', eg: 'Shenzhen'},
      {city: '北京', time: '2021-01-25', eg: 'Beijing'},
      {city: '上海', time: '2021-01-26', eg: 'Shanghai'},
      {city: '深圳', time: '2021-01-27', eg: 'Shenzhen'},
    ]

    return {
      ...toRefs(state),
    }
  },
})
</script>
