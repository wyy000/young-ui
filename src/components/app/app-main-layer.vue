<template lang="pug">
app-aside.h-full
  template(#aside)
    div.h-full.flex.flex-col
      div(class="h-full flex flex-col")
        div.px-3.py-3.shadow
          a-text-input.w-full.h-8.border-l-0.border-r-0.border-t-0.border-b.border-emerald-400.outline-none(v-model="keyword" @click="selectHandle($event.currentTarget)")
        div.flex-1.overflow-y-auto(ref="scrollBox")
          y-menu(:list="nav" ref="menuDom")

  div.w-full.h-full.flex-1.flex.flex-col
    app-header.flex
      div(class="flex-1 flex items-center justify-between")
        div(class="flex items-center")
          svg(viewBox="0 0 20 20" fill="currentColor" class="mx-2 w-10 h-10")
            path(fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd")
          h1 Young UI
        y-search.bg-none.border
      div(class="w-60 flex items-center justify-around")
        a(href="https://github.com/wyy000/young-ui")
          svg(viewBox="0 0 16 16" width="32" height="32" fill="currentColor")
            path(fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z")
    div(class="reactive flex-1 flex flex-col")
      div.m-4.flex-1
        router-view
      app-footer.text-center.flex.justify-center
        span(class="p-2 border-t border-emerald-500 text-center text-coolGray-500") 版本@1.0.1
</template>

<script>
import {computed, inject, reactive, ref, toRefs, watch} from 'vue'

import AppHeader from "@/components/layout/app-header.vue"
import AppFooter from "@/components/layout/app-footer.vue"
import AppAside from "@/components/layout/app-aside.vue"
import YMenu from "@/components/element/y-menu.vue"
import YSearch from "@/components/doc/y-search.vue"
import APopper from "@/components/elements/a-popper.vue"
import ASearchSelect from "@/components/elements/a-search-select.vue"
import ATextInput from "@/components/elements/a-text-input.vue"

import navList from '@/router/document'

export default {
  components: {
    YMenu,
    YSearch,
    AppAside,
    AppFooter,
    AppHeader,
    APopper,
    ASearchSelect,
    ATextInput,
  },

  setup (props, arg) {
    const useLayer = inject('mainLayer')
    const {show: showSearchSelect, hide: hideSearchSelect} = useLayer.mainLayer('a-search-select', ASearchSelect)
    const nav = ref(navList)
    const state = reactive({
      keyword: '',
      menuDom: null,
      scrollBox: null,
    })

    const menuList = computed(() => nav.value.map(it => Object.assign(it, {path: `/documents/${it.path}`, name: it.path})))

    watch(() => state.keyword, value => {
      if (!value) return
      const index = menuList.value.findIndex(it => it.path === value) ?? menuList.value.findIndex(it => RegExp(value, 'ig').test(it.path))
      if (index) {
        const $el = state.menuDom.$el
        const height = $el.offsetHeight
        console.log(height, $el.getBoundingClientRect(), $el.scrollTop, $el.getBoundingClientRect().height / menuList.value.length * index, state.scrollBox)
        state.scrollBox.scrollTop = $el.getBoundingClientRect().height / menuList.value.length * index
      }

      console.log(state.menuDom.$el)
    })

    function selectHandle (refEl) {
      showSearchSelect({
        name: 'a-search-select',
        props: {
          refEl,
          options: [[1, 2]],
          visible: true,
        },
        listeners: {
          update: () => {
            hideSearchSelect()
          }
        },
      })
    }

    return {
      ...toRefs(state),
      nav,

      selectHandle,
    }
  },
}
</script>
