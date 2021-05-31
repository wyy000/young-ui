<template lang="pug">
div.text-center.flex.flex-col.space-y-2
  y-button(@click="clickHandle('info')") info
  y-button(@click="clickHandle('success')") success
  y-button(@click="clickHandle('warn')") warn
  y-button(@click="clickHandle('error')") error
</template>

<script>
import YButton from '@/components/element/y-button.vue'

import {useMessage} from '../../composables/useMessage'

export default {
  components: {
    YButton,
  },

  setup () {
    function clickHandle (type) {
      useMessage({
        type,
        message: type,
      })
    }

    return {
      clickHandle,
    }
  },
}
</script>
