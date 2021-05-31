<template lang="pug">
h1 test
div
  router-link(v-for="it of nav" :to="`/test/${it.path}`") {{it.path}}
router-view
</template>

<script>
import {ref} from 'vue'
import test from './index'

export default {
  setup () {
    const nav = ref(test())

    return {
      nav,
    }
  },
}
</script>
