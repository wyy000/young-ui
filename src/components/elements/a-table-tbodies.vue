<template lang="pug">
table(:class="['w-full table-auto', hoverType ? 'hover-' + hoverType : '']")
  colgroup
    col(v-for="(col, idx) of meta.columns" :key="idx" :style="{width: col.width ? `${col.width}px` : 'auto'}")

  thead
    tr
      td(v-for="(col, idx) of meta.columns" :key="idx" :col="col" :class="[{'middle_child': idx !== 0 && idx !== meta.columns.length - 1}, col.fixed && `thead_fixed_${col.fixed}`]")
        div(class="z-0")
          slot(v-if="col.titleSlot" :name="col.titleSlot")
          div(v-else class="py-2") {{col.title}}

  tbody(v-for="(sections, idx) in tbodiesData")
    tr(v-if="sections.name || sections.slot")
      th(:colspan="meta.columns.length")
        slot(v-if="sections.slot" :name="sections.slot" :tbodies="sections")
        template(v-else-if="sections.name") {{sections.name}}
    tr(v-for="(row, rIdx) of sections.data" :key="rIdx")
      td(v-for="(col, cIdx) of meta.columns" :key="cIdx" :class="['h-full', col.fixed && `fixed_${col.fixed}`]")
        div(class="h-full w-full")
          slot(v-if="col.slot" :name="col.slot" :row="row" :col="col")
          template(v-else) {{row[col.prop]}}
    tr(v-if="tbodiesData.length > 1 && idx !== tbodiesData.length - 1" class="space-row bg-white")
      td(:colspan="meta.columns.length")
        div(class="p-2")

  tfoot(v-if="total !== null")
    tr
      td(:colspan="meta.columns.length")
        a-table-paging(:total="total" :page.sync="pageRef" :page-size="pageSize" class="z-0")
</template>

<script>
import {computed} from 'vue'

import ATablePaging from '@/components/elements/a-table-paging'

const PAGE_NUMBER = 20
const PAGE_SIZE = 1

export default {
  components: {
    ATablePaging,
  },

  props: {
    meta: {
      type: Object,
      required: true,
    },
    data: {
      type: Array,
      default: () => [],
    },
    tbodies: {
      type: Array,
      default: () => [],
    },
    // cell | row
    hoverType: {
      type: String,
      default: null,
    },
    total: {
      type: Number,
      default: null,
    },
    page: {
      type: Number,
      default: PAGE_NUMBER,
    },
    pageSize: {
      type: Number,
      default: PAGE_SIZE,
    },
  },

  setup (props, {emit}) {
    const tbodiesData = computed(() => {
      return props.tbodies.length > 0 ? props.tbodies.map(it => {
        it.data = typeof it.filter === 'function' ? it.filter(props.data) : it.data
        return it
      }) : [{data: props.data}]
    })

    const pageRef = computed({
      get: () => props.page,
      set: value => value !== props.page && emit('update:page', value),
    })

    return {
      pageRef,
      tbodiesData,
    }
  }
}

// TODO 指定首列序列号,添加demo操作,z-index值覆盖问题,外层边框1px问题...背景色问题
</script>

<style scoped lang="scss">
/**
  1. th, td(border-b) => chrome, FF, IE border叠加覆盖显示问题(1px)
  2. ::after(bg) => IE tr高度塌陷定位问题
 */
table.hover-cell {
  border-spacing: 1px;

  tr td.fixed_right {
    @apply sticky right-0 z-10;
  }

  thead tr td.thead_fixed_right {
    @apply sticky z-20;

    top: 1px;
    right: 0;
  }

  tr td.fixed_left {
    @apply sticky left-0 z-10;
  }

  thead tr td.thead_fixed_left {
    @apply sticky z-20;

    top: 1px;
    left: 0;
  }

  thead tr td {
    @apply sticky z-10;

    top: 1px;

    &::before {
      content: '';
      position: absolute;
      top: 1px;
      right: 0;
      left: 0;
      bottom: 0;
      background: white;
      z-index: -10;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: -1px;
      left: -1px;
      bottom: -1px;
      background: #e4e4e7;
      z-index: -20;
    }
  }

  tbody td {
    @apply relative bg-white border border-white;

    &:hover {
      @apply border-red-600;
    }

    &.fixed_left {
      &::before {
        content: '';
        position: absolute;
        top: -1px;
        right: -2px;
        bottom: -1px;
        width: 1px;
        background: #e4e4e7;
        z-index: 10;
      }
    }

    &.fixed_right {
      &::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -2px;
        bottom: -1px;
        width: 1px;
        background: #e4e4e7;
        z-index: 10;
      }
    }
  }

  tbody tr.space-row td:hover {
    @apply border-white;
  }
}

table.hover-row {
  border-spacing: 0 1px;

  td, th {
    &:first-child {
      border-left: 1px solid #e4e4e7;
    }

    &:last-child {
      border-right: 1px solid #e4e4e7;
    }
  }

  thead tr {
    @apply border-r border-l border-b;

    td {
      @apply sticky top-0 z-10;

      &::after {
        content: '';
        position: absolute;
        top: 1px;
        right: 0;
        left: 0;
        bottom: 0;
        background: white;
        z-index: -10;
      }
    }

    td:first-child {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: -1px;
        bottom: -1px;
        background: #e4e4e7;
        z-index: -20;
      }
    }

    td.middle_child {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: -1px;
        background: #e4e4e7;
        z-index: -20;
      }
    }

    td:last-child {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: -1px;
        left: 0;
        bottom: -1px;
        background: #e4e4e7;
        z-index: -20;
      }
    }
  }

  tbody tr {
    td {
      @apply border-t border-b border-white;
    }

    &:hover td {
      @apply border-red-600;
    }

    &.space-row:hover td {
      @apply border-white;

      &:first-child {
        border-left-color: #e4e4e7;
      }

      &:last-child {
        border-right-color: #e4e4e7;
      }
    }
  }
}

table.hover-cell,
table.hover-row {

  @apply border-separate bg-coolGray-200 whitespace-nowrap;

  //margin-top: -1px;

  tr, td, th {
    @apply relative bg-white;
  }

  tfoot tr td {
    @apply sticky z-10;

    bottom: 1px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 1px;
      background: white;
      z-index: -10;
    }

    &::after {
      content: '';
      position: absolute;
      top: -1px;
      right: -1px;
      left: -1px;
      bottom: 0;
      background: #e4e4e7;
      z-index: -20;
    }
  }
}
</style>
