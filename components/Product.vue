<template>
  <div>
    <b-card class="product-card mt-2 mb-2" :header="product.attributes.name" header-bg-variant="white" body-class="pt-1" :img-src="product.attributes.image_medium_url" img-alt="Image" img-top>
      <b-card-text class="text-center">{{ printMoney(product.attributes.price) }}</b-card-text>
    </b-card>
  </div>
</template>

<script>
import global from "../mixins/globals.js"
export default {
  mixins: [global],
  props: {
    product: Object
  },
  mounted() {
    console.log(this.product)
  },
}
</script>

<style lang="scss" scoped>
.product-card {
  max-height: 30rem;
  .card-header {
    height: 4.5em;
    display: flex;
    align-items: center;
    border: none;
  }
  .card-img-top {
    height: 200px;
    object-fit: contain;
  }
  .name {
    font-size: 18px !important;
  }
}
</style>