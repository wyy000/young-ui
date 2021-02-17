<template lang="pug">
div(class="p-2 flex items-center")
  div(class="flex-1")
    span(class="text-gray-600") {{ `共 ${total} 条记录` }}
  div(class="flex-none -my-1.5 flex items-center")
    button(
      :disabled="page <= 1"
      :class="['w-8 h-8 disabled:text-gray-400 rounded-none focus:outline-none disabled:cursor-not-allowed flex justify-center items-center', {'hover:bg-coolGray-200': page > 1}]"
      @click="$emit('update:page', page - 1)"
    )
      svg(viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"): path(d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z")
    button(v-for="n of pages" :key="n" :class="['w-8 h-8 rounded-none focus:outline-none flex justify-center items-center', page === n ? 'font-medium text-white bg-red-600' : 'hover:bg-coolGray-200']" @click="$emit('update:page', n)") {{ n }}
    button(
      :disabled="page >= maxPage"
      :class="['w-8 h-8 disabled:text-gray-400 rounded-none focus:outline-none disabled:cursor-not-allowed flex justify-center items-center', {'hover:bg-coolGray-200': page < maxPage}]"
      @click="$emit('update:page', page + 1)"
    )
      svg(viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"): path(d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z")
  div(class="flex-1")
</template>

<script>
import {computed} from 'vue'

export default {
  props: {
    total: {
      type: Number,
      default: null,
    },
    page: {
      type: Number,
      default: null,
    },
    pageSize: {
      type: Number,
      default: null,
    },
  },

  setup (props) {
    const isPaginated = computed(() => props.page > 0 && props.total > 0)
    const maxPage = computed(() => isPaginated.value ? Math.ceil(props.total / props.pageSize) : 1)
    const pages = computed(() => {
      const SIZE = 7
      const start = Math.max(Math.min(props.page - Math.floor(SIZE / 2), maxPage.value - (SIZE - 1)), 1)
      return Array.from({length: Math.min(maxPage.value - (start - 1), SIZE)}, (_, idx) => start + idx)
    })

    return {
      maxPage,
      pages,
    }
  },
}
</script>

<style scoped>

</style>
