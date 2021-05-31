<template lang="pug">
div(class="reactive flex flex-none")
  aside(v-if="aside === 'left'" class="w-60")
    slot(name="aside")
  slot
  aside(v-if="aside === 'right'" class="w-60")
    slot(name="aside")
</template>

<script>
export default {
  props: {
    aside: {
      type: String,
      default: 'left',
    },
  },
}
</script>
