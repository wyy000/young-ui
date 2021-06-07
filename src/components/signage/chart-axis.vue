<template lang="pug">
template(v-if="Object.values($slots).length")
  slot
template(v-else="")
  g(v-if="x" class="text-sm text-coolGray-700")
    g(v-for="(it, idx) of xAxis" :transform="`translate(${padding.left + it.dx}, 0)`")
      text(fill="#333" :transform="`translate(0, ${height - padding.bottom / 3})`" style="text-anchor: middle;") {{it.text}}
    g(v-for="(it, idx) of xAxis" :transform="`translate(${padding.left + it.dx}, 0)`")
      line(:y1="padding.top" :y2="height - padding.bottom" x1="0" x2="0" stroke-dasharray="1 2" stroke-width="1" stroke="#aaa")
  g(v-if="y")
    g(v-for="(it, idx) of yAxis" :transform="`translate(0, ${height - padding.bottom - it.dy})`")
      text(:transform="`translate(${padding.left - 10}, 0)`" fill="333" style="dominant-baseline: middle;text-anchor: end;") {{it.text}}
    g(v-for="(it, idx) of yAxis" :transform="`translate(0, ${height - padding.bottom - it.dy})`")
      line(y1="0" y2="0" :x1="padding.left" :x2="width - padding.right" stroke-dasharray="1 2" stroke-width="1" stroke="#aaa")
</template>

<script>
import {computed} from 'vue'
import {scaleLinear} from 'd3-scale'

export default {
  props: {
    padding: {
      type: Object,
      default: () => ({
        left: 60,
        bottom: 30,
        right: 30,
        top: 30,
      }),
    },
    width: {
      type: Number,
      require: true,
    },
    height: {
      type: Number,
      require: true,
    },
    x: {
      type: Array,
      default: () => [],
    },
    y: {
      type: Array,
      default: () => [],
    },
    xRange: {
      type: Array,
      default: () => [],
    },
    yRange: {
      type: Array,
      default: () => [],
    },
  },

  setup (props) {
    const xScale = computed(() => scaleLinear().domain(props.xRange).range([0, props.width]))
    const yScale = computed(() => scaleLinear().domain(props.yRange).range([0, props.height]))

    const cellWidth = computed(() => (props.width - props.padding.left - props.padding.right) / (props.x.length - 1))
    const cellHeight = computed(() => (props.height - props.padding.top - props.padding.bottom) / (props.y.length - 1))

    const xAxis = computed(() => props.x.map((it, idx) => ({
      text: it,
      dx: cellWidth.value * idx,
    })))

    const yAxis = computed(() => props.y.map((it, idx) => ({
      dy: cellHeight.value * idx,
      text: it,
    })))

    return {
      xAxis,
      yAxis,
    }
  },
}
</script>

<style scoped>

</style>