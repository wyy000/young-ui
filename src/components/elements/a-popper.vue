<template lang="pug">
div(ref="comp" v-if="visible" data-prevent-clickaway)
  slot
</template>

<script>
import {computed, defineComponent, nextTick, reactive, toRefs, onUpdated, watch} from 'vue'
import {createPopper} from '@popperjs/core'

import {onClickaway} from '@/utils'

export default defineComponent({
  emits: ['update:visible'],

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    reference: {
      type: [Element, Object],
      default: undefined,
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    strategy: {
      type: String,
      default: 'absolute',
    },
    offset: {
      type: [Array, Function],
      default: undefined,
    },
    modifiers: {
      type: Array,
      default: () => [],
    },
  },

  setup (props, {emit}) {
    const refs = reactive({
      comp: undefined,
    })
    const refElement = computed(() => props.reference?._isVue ? props.reference.$el : props.reference)

    let popper
    let height = 0
    let stopClickaway
    watch(() => props.visible, async visible => {
      if (visible) {
        await nextTick()
        create()
      } else {
        hide()
      }
    }, {immediate: true})

    function create () {
      popper = createPopper(refElement.value, refs.comp, {
        placement: props.placement,
        strategy: props.strategy,
        modifiers: props.modifiers.concat(props.offset ? {
          name: 'offset',
          options: {offset: props.offset},
        } : []),
      })
      stopClickaway = onClickaway(hide)
    }

    function hide () {
      if (popper) destroy()
      height = 0
      emit('update:visible', false)
    }

    function destroy () {
      popper.destroy()
      popper = undefined
      if (stopClickaway) {
        stopClickaway()
        stopClickaway = undefined
      }
    }

    onUpdated(async () => {
      await nextTick()
      let _height = refs.comp?.offsetHeight ?? 0
      if (_height !== height) {
        height = _height
        popper?.update()
      }
    })

    return {
      ...toRefs(refs),
      getPopper: () => popper,
    }
  },
})
</script>
