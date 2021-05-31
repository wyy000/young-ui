<template lang="pug">
y-card.mx-auto.mb-2.w-page
  h1 flex-width-test 🍖
div.flex.flex-col.space-y-2
  section.mx-auto.w-page.p-2.bg-coolGray-200
    h1 width-auto
    div.border.border-emerald-500.flex
      div(v-for="it of 8") {{it}}
  section.mx-auto.w-page.p-2.bg-coolGray-200
    h1 width-125px
    div.border.border-emerald-500.flex
      div(v-for="it of 8" class="w-[125px]") {{it}}
  section.mx-auto.w-page.p-2.bg-coolGray-200
    h1 flex-1
    div.border.border-emerald-500.flex
      div(v-for="it of 8" class="flex-1") {{it}}
  section.mx-auto.w-page.p-2.bg-coolGray-200
    h1 flex-basis-15%
    div.border.border-emerald-500.flex
      div(v-for="it of 8" style="flex-basis: 15%") {{it}}
  section.mx-auto.w-page.p-2.bg-coolGray-200
    h1 flex-basis-16% flex-shrink-1
    div.border.border-emerald-500.flex.flex-wrap
      div(v-for="it of 8" style="flex-basis: 16%;flex-shrink: 1;") {{it}}
  section.mx-auto.w-page.p-2.bg-coolGray-200
    h1 flex-basis-16% flex-grow-1
    div.border.border-emerald-500.flex.flex-wrap
      div(v-for="it of 8" style="flex-basis: 16%;flex-grow: 1;") {{it}}
  section.mx-auto.w-page.p-2.bg-coolGray-200
    h1 flex-1 item3: h-16 => align-items: stretch
    div.border.border-emerald-500.flex.wrap
      div(v-for="(it, idx) of 8" :class="[idx === 3 ? `h-${(idx+1)*4}` : '', 'flex-1 bg-emerald-500']") {{it}}
  section.mx-auto.w-page.p-2.bg-coolGray-200
    h1 flex-1 item3: h-16 items: flex-start
    div.border.border-emerald-500.flex.wrap.items-start
      div(v-for="(it, idx) of 8" :class="[idx === 3 ? `h-${(idx+1)*4}` : '', 'flex-1 bg-emerald-500']") {{it}}
</template>

<script>
import YCard from '@/components/element/y-card.vue'

export default {
  components: {
    YCard,
  }
}
</script>
