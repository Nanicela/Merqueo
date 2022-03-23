<template>
  <div>
    <b-sidebar v-model="show" title="Carrito de compras" @hidden="$emit('hide')" backdrop right></b-sidebar>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>