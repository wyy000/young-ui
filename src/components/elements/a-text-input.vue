<template lang="pug">
input(
  :value="modelValue"
  type="text"
  :placeholder="placeholder"
  class="p-2"
  v-on="listeners"
)
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Search',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup (props, {attrs, emit}) {
    const listeners = {
      ...attrs,
      input: e => props.disabled || emit('update:modelValue', e.target.value),
      blur: e => {
        e.target.value = props.modelValue
        if (typeof attrs.onBlur === 'function') {
          attrs.onBlur(e)
        }
      },
    }

    return {
      listeners,
    }
  },
}
</script>
