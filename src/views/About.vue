<template lang="pug">
div(class="w-page mx-auto divide-y flex flex-col flex-none justify-around")
  div(class="py-4 flex flex-col")
    div(class="pb-2")
      y-button(kind="primary" size="xs" @click="primaryShow = !primaryShow") primary
    transition(
      enter-active-class="transition-all duration-500 ease-in-out"
      leave-active-class="transition-all duration-500 ease-in-out"
      @before-enter="el => {el.style.height = '0px'}"
      @enter="el => {el.style.height = el.children[0].children[0].offsetHeight + 'px'}"
      @leave="el => {el.style.height = '0px'}"
    )
      div(v-if="primaryShow" class="overflow-hidden")
        code
          pre(class="p-2 bg-coolGray-700 rounded-md text-sm text-coolGray-200") 1  y-button(kind="primary" size="xs" @click="handler") primary
  div(class="py-4 flex flex-col overflow-auto")
    div(class="pb-2")
      y-button(kind="warn" size="sm" @click="warnShow = !warnShow")
        svg(fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 mr-1")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z")
        span warn
    transition(
      enter-active-class="transition-all duration-500 ease-in-out"
      leave-active-class="transition-all duration-500 ease-in-out"
      @before-enter="el => {el.style.height = '0px'}"
      @enter="el => {el.style.height = el.children[0].children[0].offsetHeight + 'px'}"
      @leave="el => {el.style.height = '0px'}"
    )
      div(v-if="warnShow" class="overflow-hidden")
        code
          div(class="p-2 bg-coolGray-700 rounded-md text-sm text-coolGray-200")
            pre(class="whitespace-pre") 1  y-button(kind="warn" size="sm" @click="handler")
            pre 2    svg(fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 mr-1")
            pre(class="whitespace-pre-wrap") 3      path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z")
            pre 4    span warn
  div(class="py-4 flex flex-col")
    div(class="pb-2")
      y-button(kind="error" size="md" @click="errorShow = !errorShow")
        svg(fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mr-1")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z")
        span error
    transition(
      enter-active-class="transition-all duration-500 ease-in-out"
      leave-active-class="transition-all duration-500 ease-in-out"
      @before-enter="el => {el.style.height = '0px'}"
      @enter="el => {el.style.height = el.children[0].children[0].offsetHeight + 'px'}"
      @leave="el => {el.style.height = '0px'}"
    )
      div(v-if="errorShow" class="overflow-hidden")
        code
          div(class="p-2 bg-coolGray-700 rounded-md text-sm text-coolGray-200")
            pre 1  y-button(kind="error" size="md" @click="handler")
            pre 2  svg(fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mr-1")
            pre 3    path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z")
            pre 4  span error
  div(class="py-4 flex flex-col" ref="primaryRef")
    div(class="pb-2")
      y-button(kind="success" size="lg" @click="successShow = !successShow")
        svg(fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mr-1")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z")
        span success
      // code(class="p-2 bg-coolGray-700 rounded-md text-sm text-coolGray-200")
        pre {{primaryCom}}
    transition(
      enter-active-class="transition-all duration-500 ease-in-out"
      leave-active-class="transition-all duration-500 ease-in-out"
      @before-enter="el => {el.style.height = '0px'}"
      @enter="el => {el.style.height = el.children[0].children[0].offsetHeight + 'px'}"
      @leave="el => {el.style.height = '0px'}"
    )
      div(v-if="successShow" class="overflow-hidden")
        code
          div(class="p-2 bg-coolGray-700 rounded-md text-sm text-coolGray-200")
            pre 1  y-button(kind="success" size="lg" @click="handler")
            pre 2  svg(fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 mr-1")
            pre 3    path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z")
            pre 4  span success
</template>

<script lang="js">
import {computed, reactive, toRefs} from 'vue'

import YButton from '@/components/element/y-button.vue'

export default {
  components: {
    YButton,
  },

  setup () {
    const state = reactive({
      primaryRef: null,
      primaryShow: false,
      warnShow: false,
      errorShow: false,
      successShow: false,
    })

    const primaryCom = computed(() => {
      // return (state.primaryRef)
    })

    return {
      ...toRefs(state),
      primaryCom,
    }
  }
}
</script>
