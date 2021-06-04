<template lang="pug">
div.h-full.flex(ref="refEl") {{drawSize.height}} {{drawSize.width}}
  svg(class="w-full h-full border" fill="#222429")
    g
      rect(x="0" y="0" :width="drawSize.width / 2" :height="drawSize.height / 2" fill="#222429")
      rect(:x="drawSize.width / 2" y="0" :width="drawSize.width / 2" :height="drawSize.height / 2" fill="#2a2d33")
      rect(x="0" :y="drawSize.height / 2" :width="drawSize.width / 2" :height="drawSize.height / 2" fill="#151618")
      rect(:x="drawSize.width / 2" :y="drawSize.height / 2" :width="drawSize.width / 2" :height="drawSize.height / 2" fill="#222429")
    g
      line(v-for="it of horizontalLine" :x1="it.x1" :x2="it.x2" :y1="it.y1" :y2="it.y2" stroke="#aaa" stroke-width="1" stroke-dasharray="1 2")
    g
      line(v-for="it of verticalLine" :x1="it.x1" :x2="it.x2" :y1="it.y1" :y2="it.y2" stroke="#aaa" stroke-width="1" stroke-dasharray="1 2")
    g(v-for="it of refData")
      circle(r="5" :fill="randomColor()" :transform="circleTranslate(it)" @mouseover="it.hover = true" @mouseleave="it.hover = true")
      text {{it.hover}}
    g(v-for="it of refData" v-show="it.hover")
      line(x1="0" :x2="it.x" :y1="it.y" :y2="it.y" stroke="#5c6069" opacity="0.7" stroke-width="3" stroke-dasharray="8 3")
      line(:x1="it.x" :x2="it.x" y1="20000" :y2="it.y" stroke="#5c6069" opacity="0.7" stroke-width="3" stroke-dasharray="8 3")
</template>

<script>
import {computed, onMounted, reactive, toRefs} from 'vue'

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },

  setup (props) {
    const refs = reactive({
      refEl: null,
    })
    console.log(props.data)

    const drawSize = computed(() => ({
      width: refs.refEl?.offsetWidth ?? 0,
      height: refs.refEl?.offsetHeight ?? 0,
    }))

    const horizontalLine = computed(() => {
      if (refs.refEl) {
        return Array.from({length: 11}).map((it, idx) => ({
          x1: 0,
          x2: drawSize.value.width,
          y1: parseInt(drawSize.value.height / 10 * idx),
          y2: parseInt(drawSize.value.height / 10 * idx),
        }))
      }
    })

    const verticalLine = computed(() => {
      if (refs.refEl) {
        return Array.from({length: 11}).map((it, idx) => ({
          x1: parseInt(drawSize.value.width / 10 * idx),
          x2: parseInt(drawSize.value.width / 10 * idx),
          y1: 0,
          y2: drawSize.value.height,
        }))
      }
    })

    const refData = computed(() => {
      return props.data.map(it => {
        it.x = it.count / 20000 * drawSize.value.width
        it.y = drawSize.value.height * it.percent / 100
        it.hover = false
        return it
      })
    })

    function circleTranslate (it) {
      if (refs.refEl) {
        return `translate(${drawSize.value.width * it.count / 20000}, ${drawSize.value.height * it.percent / 100})`
      }
    }

    function randomColor () {
      const str = Array.from({length: 10}).map((it, idx) => String(idx)).concat(['a', 'b', 'c', 'd', 'e', 'f'])
      const range = parseInt(73 + Math.random() * (246 - 73))
      const arr = ['49', 'f6', str[parseInt(range / 16)] + str[parseInt(range % 16)]]
      const one = Math.random() < 1 / 3 ? arr.splice(0, 1) : Math.random() < (1 / 2) ? arr.splice(1, 1) : arr.splice(2, 1)
      const two = Math.random() > 1 / 2 ? arr.splice(0, 1) : arr.splice(1, 1)
      return `#${one[0]}${two[0]}${arr[0]}`
    }

    onMounted(() => console.log(refs.refEl))

    return {
      ...toRefs(refs),
      refData,
      horizontalLine,
      verticalLine,

      drawSize,

      randomColor,
      circleTranslate,
    }
  },
}
</script>

<style scoped>

</style>