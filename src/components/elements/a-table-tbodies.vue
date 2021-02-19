<template lang="pug">
div(:class="['h-full w-full overflow-auto', {'table_box': hoverType === 'cell'}]")
  div(v-if="hoverType === 'cell'" class="absolute top-0 left-0 w-full border-t border-white z-30")
  // IE浏览器 thead.slot高度不一致，滚动下边框定位元素
  //div(class="thead_border absolute bottom-0 left-0 h-0 w-full border-t z-30")
  table(:class="['w-full table-auto', hoverType ? 'hover-' + hoverType : '']")
    colgroup
      col(v-for="(col, idx) of meta.columns" :key="idx" :style="{width: col.width ? `${col.width}px` : 'auto'}")

    thead
      tr
        td(v-for="(col, idx) of theadColumnsRef" :key="idx" :col="col"
          :class="[{'middle_child': idx !== 0 && idx !== theadColumnsRef.length - 1}, col.fixed && `thead_fixed_${col.fixed}`]")
          div(class="z-0")
            template(v-if="!col.actions")
              slot(v-if="col.titleSlot" :name="col.titleSlot")
              div(v-else class="py-2") {{col.title}}
            template(v-else)
              slot(v-if="col.theadSlot" :name="col.theadSlot")
              div(v-else class="py-2") 操作

    tbody(v-for="(sections, idx) in tbodiesData")
      // tbody-title
      tr(v-if="sections.name || sections.slot")
        th(:colspan="theadColumnsRef.length")
          slot(v-if="sections.slot" :name="sections.slot" :tbodies="sections")
          template(v-else-if="sections.name") {{sections.name}}
      //tbody-content
      tr(v-for="(row, rIdx) of sections.data" :key="rIdx")
        td(v-for="(col, cIdx) of meta.columns" :key="cIdx" :class="['h-full', col.fixed && `fixed_${col.fixed}`]")
          div(class="h-full w-full")
            slot(v-if="col.slot" :name="col.slot" :row="row" :col="col")
            template(v-else) {{row[col.prop]}}
        td(v-if="meta.actions" :class="['h-full', meta.actions.fixed && `fixed_${meta.actions.fixed}`]")
          div(class="h-full w-full")
            slot(name="tbody-actions" :row="row")
      // tbody-empty
      tr(v-if="tbodiesData.length > 1 && idx !== tbodiesData.length - 1" class="space-row bg-white")
        td(:colspan="theadColumnsRef.length")
          div(class="p-2")

    tfoot(v-if="total !== null")
      tr
        td(:colspan="theadColumnsRef.length")
          a-table-paging(:total="total" v-model:page="pageRef" :page-size="pageSize" class="z-0")
</template>

<script>
import {computed, nextTick, watch} from 'vue'

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
      default: 'cell',
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

    const theadColumnsRef = computed(() => props.meta.columns.concat([{...props.meta.actions, actions: true}] ?? []))

    // IE浏览器 thead.slot高度不一致，滚动下边框问题(fix: 滚动条问题)
    /*watch(() => props.meta, async (value) => {
      await nextTick()
      const tr = document.getElementsByTagName('thead')[0]
      const dom = document.getElementsByClassName('thead_border')[0]
      dom.style.top = tr.offsetHeight - 1 + 'px'
      await nextTick()
    }, {immediate: true})*/

    return {
      theadColumnsRef,
      pageRef,
      tbodiesData,
    }
  }
}

// fix: z-index值覆盖问题...背景色问题 ??
</script>

<style scoped lang="scss">
/**
  1. th, td(border-b) => chrome, FF, IE border叠加覆盖显示问题(1px)
  2. ::after(bg) => IE tr高度塌陷定位问题
 */
.table_box {
  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 0;
    bottom: 0;
    width: 1px;
    background: #e4e4e7;
    z-index: 30;
  }

  &::after {
    content: '';
    position: absolute;
    top: 1px;
    right: 0;
    bottom: 0;
    width: 1px;
    background: #e4e4e7;
    z-index: 30;
  }
}

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
      left: 0;
      bottom: 0;
      background: #e4e4e7;
      z-index: -20;
    }
  }
}

//table.hover-normal {
//  @apply whitespace-nowrap border-collapse;
//
//  tr {
//    @apply border;
//  }
//}
</style>
