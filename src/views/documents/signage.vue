<template lang="pug">
div(class="w-full h-1/2h mb-4 flex flex-wrap space-x-4")
  y-card(class="h-full w-1/2 flex-grow flex flex-col" style="flex-basis: 40%;")
    section.p-1
      h1 Signage Demo
    signage-charts(:data="data" class="flex-1")
  y-card(class="h-full w-1/2 flex-grow flex flex-col" style="flex-basis: 40%;")
    section.p-1
      h1 ChartAxis
    div(class="flex-1 flex" ref="axisEl")
      svg(class="p-0 flex-1 border" ref="axisSvgEl")
        chart-axis(:width="axisInfo.width" :height="axisInfo.height" :x="axisInfo.x"  :y="axisInfo.y" :xRange="axisInfo.xRange" :yRange="axisInfo.yRange")
</template>

<script>
import {defineComponent, reactive, ref, toRefs, onUpdated, onMounted} from 'vue'

import YCard from '@/components/element/y-card.vue'
import SignageCharts from '@/components/signage/signage-charts.vue'
import ChartAxis from '@/components/signage/chart-axis.vue'

export default defineComponent({
  components: {
    YCard,
    SignageCharts,
    ChartAxis,
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
      showConditions: false,
    })

    const refs = reactive({
      axisEl: null,
      axisSvgEl: null,
    })

    const axisInfo = reactive({
      width: refs.axisEl?.offsetWidth ?? 0,
      height: refs.axisEl?.offsetHeight ?? 0,
      y: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
      x: [100, 300, 500, 700, 900],
      yRange: [0, 1],
      xRange: [100, 1000],
    })

    onMounted(() => {
      computedAxisInfo()
      window.onresize = function () {
        computedAxisInfo()
      }
    })

    onUpdated(() => {
      computedAxisInfo()
    })

    function computedAxisInfo () {
      axisInfo.width = refs.axisEl?.offsetWidth ?? 0
      axisInfo.height = refs.axisEl?.offsetHeight ?? 0
    }

    return {
      data,
      ...toRefs(state),
      ...toRefs(refs),

      axisInfo,

      computedAxisInfo,
    }
  },
})
</script>

<style scoped>

</style>