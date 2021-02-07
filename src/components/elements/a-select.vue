<template lang="pug">
div(class="relative p-2 border-b")
  span(class="pr-4") {{ displayName }}
  select(v-model="selectValue" v-on="listeners" :disabled="readonly" ref="select" class="absolute inset-0 w-full opacity-0 text-coolGray-700")
    option(v-for="([value, name], idx) of options" :value="idx" class="p-2") {{name || value}}
  svg(viewBox="0 0 24 24" width="24" height="24" class="absolute top-2 right-0")
    path(fill="currentColor" d="M12 16l-6-6h12z")
</template>

<script>
import {computed, nextTick, reactive, toRefs} from 'vue'

export default {
  props: {
    modelValue: {
      type: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },

  setup (props, {attrs, emit}) {
    const refs = reactive({
      select: undefined,
    })

    const selected = computed(() => props.options.find(it => it[0] === props.modelValue))
    const displayName = computed(() => selected.value?.[1] ?? props.placeholder)
    const selectValue = computed({
      get: () => props.options.indexOf(selected.value),
      set: async idx => {
        emit('update:modelValue', props.options[idx][0])
        await nextTick()
        refs.select.value = selectValue.value
      },
    })

    const listeners = {
      ...attrs,
      change: e => emit('update:change', e.target.options[e.target.options.selectedIndex].value)
    }

    return {
      ...toRefs(refs),
      displayName,
      selectValue,
      listeners,
    }
  },
}
</script>
