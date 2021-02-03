<template lang="pug">
div(class="w-page mx-auto text-center")
  router-link(to="/") Home |
  router-link(to="/about") About |
  router-link(to="/playground") playground
router-view
</template>

<style lang="scss">
</style>
