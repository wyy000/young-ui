<template lang="pug">
h3 table
table(class="w-full text-left")
  thead
    tr(class="flex")
      th(v-for="key in Object.keys(data[0])" class="flex-1") {{key}}

  tbody(v-for="it of tbodysData")

  tbody
    template(v-for="it in data")
      tr(class="flex")
        td(v-for="key in Object.keys(data[0])" class="flex-1") {{it[key]}}

  //tbody(class="")
  //  tr
  //    td(class="opacity-0 h-2") 1

  tbody
    template(v-for="it in data")
      tr(class="flex")
        td(v-for="key in Object.keys(data[0])" class="flex-1") {{it[key]}} ----
</template>

<script>
import {computed, defineComponent} from 'vue'

export default defineComponent({
  props: {
    meta: {
      type: Object,
      required: true,
    },
    data: {
      type: Array,
      default: () => [],
    },
    hoverLight: {
      type: String,
      default: null,
    },
    tbodys: {
      type: Array,
      default: () => [],
    },
  },

  setup (props) {
    const tbodysData = computed(() => {
      if (props.tbodys.length) {
        props.tbodys.map(it => typeof it === 'function' ? it(props.data) : it)
      }
      return props.tbodys.length ? props.tbodys.map(it => typeof it === 'function' ? it(props.data) : it) : props.data
    })

    return {
      tbodysData,
    }
  },
})
</script>

<style scoped lang="scss">
table {
  tr {
    @apply relative border-b border-r border-l;

    th,
    td {
      @apply border-r;

      &:last-child {
        @apply border-r-0;
      }
    }
  }

  thead {
    &:first-child {
      @apply border-t;
    }
  }

  tr:hover {
    @apply bg-coolGray-100 border-amber-400;

    &::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      width: calc(100% + 2px);
      height: 1px;
      background: rgb(251, 191, 36);
    }
  }
}
</style>