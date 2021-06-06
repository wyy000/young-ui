<template lang="pug">
div(class="w-full h-2/3h")
  y-card(class="w-full h-full flex flex-col")
    section.p-1
      h1 Signage Demo
    signage-charts(:data="data" class="flex-1")
</template>

<script>
import {defineComponent, reactive, ref, toRefs} from 'vue'

import YCard from '@/components/element/y-card.vue'
import SignageCharts from '@/components/signage/signage-charts.vue'

export default defineComponent({
  components: {
    YCard,
    SignageCharts,
  },

  props: {

  },

  setup (props) {
    const data = ref(
      Array.from({length: Math.ceil(50)}).map((it, i) => ({
        title: '登录' + i,
        percent: Number(String(Math.random()).substr(2,4)) / 100,
        count: parseInt(Math.random() * 20000),
      }))
    )

    const state = reactive({
      type: null,
    })

    return {
      data,
      ...toRefs(state),
    }
  },
})
</script>

<style scoped>

</style>