<template lang="pug">
y-card(class="w-full flex-shrink-0 flex flex-col overflow-auto" style="height: 80vh;")
  section.p-1.flex.flex-col.text-coolGray-700.border-b
    trigger-chart-info(:chartData="chartData")
    div.flex.justify-between
      trigger-chart-type(:chartData="chartData")
      trigger-chart-date(:chartData="chartData")
    div(class="flex justify-center")
      svg(fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="['h-6 w-12 cursor-pointer transform transition-all duration-200 ease-in-out', {'rotate-180': showConditions}]" @click="showConditions = !showConditions")
        path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7")
  div.w-full.flex-1.overflow-auto.flex.flex-col
    transition(
      enter-active-class="transition-all duration-500 ease-in-out"
      leave-active-class="transition-all duration-500 ease-in-out"
      @before-enter="el => {el.style.height = '0px'}"
      @enter="el => {el.style.flexBasis = el.children[0].offsetHeight + 'px';el.style.flexShrink = 0;}"
      @leave="el => {el.style.height = '0px'; el.style.flexBasis = '0px'}"
    )
      trigger-chart-conditions(:chartData="chartData" :show="showConditions")
      //@after-enter="() => computedAxisInfo()"
      //@after-leave="() => computedAxisInfo()"
    div(class="flex-1 flex" ref="axisEl" style="min-height: 50vh")
      svg(class="p-0 flex-1 border")
        chart-axis(:width="axisInfo.width" :height="axisInfo.height" :x="axisInfo.x"  :y="axisInfo.y" :xRange="axisInfo.xRange" :yRange="axisInfo.yRange")
        chart-view(:data="chartData.data" :width="axisInfo.width" :height="axisInfo.height")
</template>

<script>
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  onUpdated,
  onMounted,
  onBeforeUnmount,
} from 'vue'

import YCard from '@/components/element/y-card.vue'
import ChartAxis from '@/components/signage/chart-axis.vue'
import ChartView from '@/components/signage/chart-view.vue'

import TriggerChartInfo from '@/components/signage/trigger-chart-info.vue'
import TriggerChartType from '@/components/signage/trigger-chart-type.vue'
import TriggerChartDate from '@/components/signage/trigger-chart-date.vue'
import TriggerChartConditions from '@/components/signage/trigger-chart-conditions.vue'

export default defineComponent({
  components: {
    YCard,
    ChartAxis,
    ChartView,
    TriggerChartInfo,
    TriggerChartType,
    TriggerChartDate,
    TriggerChartConditions,
  },

  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    chartData: {
      type: Object,
      require: true,
    },
  },

  setup (props) {
    const state = reactive({
      showConditions: false,
    })

    const refs = reactive({
      axisEl: null,
    })

    const axisInfo = reactive({
      width: refs.axisEl?.offsetWidth ?? 0,
      height: refs.axisEl?.offsetHeight ?? 0,
      y: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
      x: [100, 300, 500, 700, 900],
      yRange: [0, 1],
      xRange: [100, 1000],
    })

    let resizeObserver = null

    onMounted(() => {
      // computedAxisInfo()
      // window.onresize = function () {
      //   computedAxisInfo()
      // }
      resizeObserver = new ResizeObserver(() => {
        computedAxisInfo()
      })
      resizeObserver.observe(refs.axisEl)
    })

    onBeforeUnmount(() => {
      resizeObserver.unobserve(refs.axisEl)
    })

    // onUpdated(() => {
    //   computedAxisInfo()
    // })

    function computedAxisInfo () {
      axisInfo.width = refs.axisEl?.offsetWidth ?? 0
      axisInfo.height = refs.axisEl?.offsetHeight ?? 0
    }

    return {
      ...toRefs(state),
      ...toRefs(refs),

      axisInfo,

      // computedAxisInfo,
    }
  },
})
</script>
