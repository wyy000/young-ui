<template lang="pug">
h1(v-if="!editable") {{chartData.title ?? '请输入名称'}}
a-text-input(v-else="" v-model="chartData.title" placeholder="请输入名称")
span(v-if="!editable") {{chartData.description ?? '请输入描述'}}
a-text-input(v-else="" v-model="chartData.description" placeholder="请输入描述")
</template>

<script>
import ATextInput from "@/components/elements/a-text-input.vue"

export default {
  components: {
    ATextInput
  },

  props: {
    chartData: {
      type: Object,
      default: () => ({}),
    },
    editable: {
      type: Boolean,
      default: false,
    },
  }
}
</script>
