<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="d-flex justify-content-between">
      <b-navbar-brand href="#">Merqueo</b-navbar-brand>

      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>

      <b-button size="sm" class="my-2 my-sm-0 ml-auto" @click="showShoppingCart = !showShoppingCart" right>
        <b-icon icon="cart-4" aria-hidden="true"></b-icon>
      </b-button>
    </b-navbar>

    <b-container class="mt-3" fluid>
      <nuxt> </nuxt>
    </b-container>

    <ShoppingCart :show="showShoppingCart" @hide="showShoppingCart = false"></ShoppingCart>
  </div>
</template>

<script>
import { BIcon, BIconCart4 } from 'bootstrap-vue'
import ShoppingCart from "../components/ShoppingCart"

export default {
  name: "default",
  components: {
    BIcon,
    BIconCart4,
    ShoppingCart
  },
  data() {
    return {
      showShoppingCart: false
    }
  },
}
</script>

<style lang="scss" scoped>
</style>