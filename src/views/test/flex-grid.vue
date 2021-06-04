<template lang="pug">
y-card.w-page.mx-auto.my-4.text-coolGray-800.space-y-3
  h2.mt-2.font-bold.text-lg Grid is Container-Based, Flexbox is Content-Based
  div In flexbox layout, the size of a cell (flex-item) is defined inside the flex-item itself, and in the grid layout, the size of a cell (grid-item) is defined inside the grid-container.
  h2.mt-2.font-bold.text-lg Flexbox is One Dimensional, Grid is Two Dimensional
  div We’ve been arranging elements as rows and columns on the web since we used tables for layout. Both flexbox and grid are based on this concept. Flexbox is best for arranging elements in either a single row, or a single column. Grid is best for arranging elements in multiple rows and columns.
  div.text-emerald-500.flex.items-center
    svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor")
      path(fill="none" d="M0 0h24v24H0z")
      path(d="M13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 0 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415 1.415-1.414zm6.718 6.011l-1.414-1.414a5 5 0 1 0-7.071-7.071l-.354.354a5 5 0 0 0 0 7.07l1.415 1.415-1.415 1.414-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 0 1 9.9 9.9z")
    a(target="_blank" href="https://www.webdesignerdepot.com/2018/09/grid-vs-flexbox-which-should-you-choose/" class="text-right text-emerald-500") 资料来源
h2.mt-2.text-center Flexbox
div(class="flex_box text-center flex flex-wrap")
  div 1 2 3&nbsp&nbsp4 5 6 7 8 9 0
  div(v-for="it of 5") {{it + 1}}
h2.text-center Grid
div(class="grid_box grid text-center")
  div 1 2 3&nbsp&nbsp4 5 6 7 8 9 0
  div(v-for="it of 5") {{it + 1}}
</template>

<script>
import YCard from '@/components/element/y-card.vue'

export default {
  components: {
    YCard,
  },
}
</script>

<style lang="scss" scoped>
.flex_box {
  margin: 20px auto;
  max-width: 600px;

  & > div {
    @apply border border-dashed border-coolGray-900;

    padding: 12px;
    flex: 1 1 100px;
    box-sizing: content-box;
  }
}

.grid_box {
  margin: 40px auto;
  max-width: 600px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

  & > div {
    @apply border border-dashed border-coolGray-900;

    padding: 12px;
  }
}
</style>