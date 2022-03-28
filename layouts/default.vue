<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="d-flex justify-content-between">
      <b-navbar-brand href="#">Merqueo</b-navbar-brand>

      <b-nav-form>
        <b-form-input type="search" size="sm" placeholder="Buscar producto" debounce="300" @input="setSearchText"></b-form-input>
      </b-nav-form>

      <b-button size="sm" class="my-2 my-sm-0 ml-auto" @click="showShoppingCart = !showShoppingCart" right>
        <b-icon icon="cart-4" aria-hidden="true"></b-icon>
      </b-button>
    </b-navbar>

    <b-container class="custom-container py-3" fluid>
      <nuxt> </nuxt>
    </b-container>

    <ShoppingCart :show.sync="showShoppingCart" @hide="showShoppingCart = false"></ShoppingCart>
  </div>
</template>

<script>
import { BIcon, BIconCart4 } from 'bootstrap-vue'
import ShoppingCart from "../components/ShoppingCart"
import { mapMutations} from "vuex"
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
  methods: {
    ...mapMutations("global", ["setSearchText"]),
  }
}
</script>

<style lang="scss" scoped>
.custom-container {
  background: rgba(0,0,0,0.03);
  min-height: calc(100vh - 70px);
}
</style>