<template lang="pug">
//div(class="w-full h-1/2h mb-4 flex flex-wrap space-x-4")
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
div(class="w-full h-full flex flex-wrap space-x-4")
  y-card(class="w-full flex-shrink-0 flex flex-col space-y-2 overflow-auto" style="height: 80vh;")
    div.w-full.h-full.overflow-auto.flex.flex-col
      section.p-1.flex.flex-col.text-coolGray-700
        h1 ChartAxis
        span 描述
        div.flex.justify-between
          button TYPE
          button DATE
      transition(
        enter-active-class="transition-all duration-500 ease-in-out"
        leave-active-class="transition-all duration-500 ease-in-out"
        @before-enter="el => {el.style.height = '0px'}"
        @enter="el => {el.style.height = el.children[0].offsetHeight + 'px'; }"
        @leave="el => {el.style.height = '0px'}"
      )
        section(v-if="showConditions" class="overflow-hidden")
          div
            h2 conditions
      div(class="flex justify-center")
        svg(class="h-6 w-12 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="showConditions = !showConditions")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7")
      div(class="flex-1 flex" ref="axisEl" style="min-height: 50vh")
        svg(class="p-0 flex-1 border" ref="axisSvgEl")
          chart-axis(:width="axisInfo.width" :height="axisInfo.height" :x="axisInfo.x"  :y="axisInfo.y" :xRange="axisInfo.xRange" :yRange="axisInfo.yRange")
</template>

<script>
import {defineComponent, reactive, ref, toRefs, onUpdated, onMounted, watch, nextTick} from 'vue'

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

    watch(() => state.showConditions, async (value) => {
      await nextTick()
      computedAxisInfo()
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