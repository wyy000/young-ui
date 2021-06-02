<template lang="pug">
a-popper(
  v-model:visible="visibleRef"
  :reference="refEl"
  placement="bottom-start"
  :offset="[0, 2]"
  class="min-width bg-white shadow-md"
)
  div(v-if="visible" class="w-80 border bg-white flex flex-col")
    input(v-model="state.keyword" v-if="search" placeholder="search..." class="m-2 p-1 border")
    div(v-if="multiple" class="flex m-2 mt-0 p-1 border text-center text-sm divide-x")
      button(@click="selectAllHandle" class="flex-1 focus:outline-none") {{refSelectedAll ? '取消全选' : '全选'}}
      button(@click="state.showSelected = !state.showSelected" class="flex-1 focus:outline-none")
        span(:class="[{'text-emerald-500': !state.showSelected}]") 全部
        span(class="text-base")  /
        span(:class="[{'text-emerald-500': state.showSelected}]") {{refShowSelectedNum}}
    div(class="max-h-60 overflow-y-auto") {{Object.values($slots).every(it => !it)}} {{Object.values($slots)}}
      div(v-for="([value, item, check], idx) of data" :class="['relative p-1', check ? 'bg-emerald-500 text-white' : 'text-black']" @click="data = value")
        svg(v-show="check" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="absolute insert")
          path(fill="none" d="M0 0h24v24H0z")
          path(d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z")
        button(:class="['w-full pl-8 text-left break-all focus:outline-none']") {{item}}
      template(v-if="status && !state.showSelected")
        slot(v-if="haveSlots")
        div(v-else="" class="p-0.5 text-center")
          button(v-if="status === STATUS_DEFAULT" class="focus:outline-none" @click="$emit('update')") 加载更多
          span(v-if="status === STATUS_PROGRESS") 加载中...
    div(v-if="multiple" class="flex p-1 border-t text-center text-sm divide-x")
      button(@click="$emit('update:modelValue', state.data.filter(it => it[2]).map(it => it[0]))" class="p-1 flex-1 focus:outline-none") 确定
      button(@click="$emit('update:visible', false)" class="p-1 flex-1 focus:outline-none") 取消
</template>

<script>
import {computed, onBeforeUnmount, reactive, watch} from 'vue'

import APopper from '@/components/elements/a-popper.vue'

const STATUS_COMPLETE = 0
const STATUS_DEFAULT = 1
const STATUS_PROGRESS = 2

export default {
  emits: ['update:modelValue', 'update:visible'],

  components: {
    APopper,
  },

  props: {
    refEl: {
      type: HTMLElement,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: [Array, String],
      default: null,
    },
    status: {
      type: Number,
      default: STATUS_COMPLETE,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: false,
    },
  },

  setup (props, {emit, slots}) {
    const visibleRef = computed({
      get: () => props.visible,
      set: value => emit('update:visible', value)
    })

    const state = reactive({
      data: [],
      keyword: null,
      selectedAll: false,
      showSelected: false,
    })

    watch(() => props.options, value => {
      state.data = value.map(item => {
        item[2] = props.modelValue?.some(it => item[0] === it)
        return item
      })
    }, {immediate: true})

    const data = computed({
      get: () => {
        let data = state.data.filter(it => !state.keyword || (new RegExp(state.keyword).test(it[0]) || new RegExp(state.keyword).test(it[1])))
        if (state.showSelected)
          data = data.filter(item => state.data.some(it => it[0] === item[0] && it[2]))
        return data
      },
      set: value => {
        if (!props.multiple) return emit('update:modelValue', value)
        const index = state.data.findIndex(it => it[0] === value)
        state.data[index][2] = !state.data[index][2]
      },
    })

    const haveSlots = computed(() => {
      return slots.value
    })

    function selectAllHandle () {
      state.selectedAll = !state.selectedAll
      data.value.forEach(item => {
        state.data.forEach(it => {
          if (it[0] === item[0])
            it[2] = state.selectedAll
        })
      })
    }

    const refSelectedAll = computed(() => {
      state.selectedAll = data.value.every(it => it[2])
      return state.selectedAll
    })

    const refShowSelected = computed(() =>
      props.multiple ? (props.modelValue && props.modelValue.length ? `已选择${props.modelValue.length}项` : '请选择')
        : (props.modelValue && props.modelValue.length) ? props.options.find(it => it[0] === props.modelValue[0])[1] : '请选择',
    )

    const refShowSelectedNum = computed(() => `已选择${data.value.filter(it => it[2]).length ?? 0}项`)

    return {
      visibleRef,

      data,
      state,
      haveSlots,
      refSelectedAll,
      refShowSelected,
      refShowSelectedNum,

      STATUS_COMPLETE,
      STATUS_DEFAULT,
      STATUS_PROGRESS,

      selectAllHandle,
    }
  },
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 6px;
  background-color: #fff;
}

::-webkit-scrollbar-track {
  background-color: #fff;
}

::-webkit-scrollbar-thumb {
  //background: #323c56;
  background-color: rgb(16, 185, 129);
  border-radius: 6px;
}

::-webkit-scrollbar-button:start,
::-webkit-scrollbar-button:end {
  display: none;
}
</style>
