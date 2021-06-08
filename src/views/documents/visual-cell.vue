<template lang="pug">
visual-chart(:chartData="{data: data}")
</template>

<script>
import {reactive, ref} from 'vue'

import VisualChart from '@/components/signage/visual-chart.vue'

export default {
  components: {
    VisualChart,
  },

  setup () {
    const data = ref(
      Array.from({length: Math.ceil(50)}).map((it, i) => ({
        title: '登录' + i,
        percent: Number(String(Math.random()).substr(2,4)) / 100,
        count: parseInt(Math.random() * 20000),
      }))
    )

    return {
      data,
    }
  },
}
</script>
