<template lang="pug">
div(:ref="comp" v-if="visibleRef" data-prevent-clickaway)
  slot
</template>

<script>
import {computed, reactive, toRefs, watch} from 'vue'
import {createPopper} from '@popperjs/core'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    reference: {
      type: [Element, Object],
      default: undefined,
    },
  },

  setup (props) {
    const refs = reactive({
      comp: undefined,
    })
    const refElement = computed(() => props.reference?._isVue ? props.reference.$el : props.reference)

    console.log(props, refElement.value, refs, 9090)
    createPopper(refElement.value, refs.comp)

    const visibleRef = computed(() => props.visible)

    const comp = computed({
      get: () => refs.comp,
      set: value => refs.comp = value,
    })

    watch(() => refs.comp, value => console.log(value), {immediate: true})

    return {
      visibleRef,

      comp,
    }
  }
}
</script>
