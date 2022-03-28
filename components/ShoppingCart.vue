<template>
  <div>
    <b-sidebar :visible="show" title="Carrito de compras" @hidden="$emit('update:show', false)" backdrop right>
      <div v-for="product in cart" :key="product.id">
        <b-row class="p-3 bg-white mb-1">
          <b-col cols="12" >
            <b-link class="ml-1" @click="deleteProduct(product.id)">
              <b-icon icon="trash" aria-hidden="true"></b-icon>
            </b-link>
          </b-col>
          <b-col cols="4" class="d-flex align-items-center">
            <b-img-lazy :src="product.image_medium_url" alt="Card image" width="100%"></b-img-lazy>
          </b-col>

          <b-col cols="8">
            <p>{{ product.name }}</p>
            <b-spinbutton v-model="product.added_amount" @change="updateCart(product.id, $event)" min="1" :max="product.quantity"></b-spinbutton>
            <div class="d-flex justify-content-between mt-2">
              <span>{{ printMoney(product.price * product.added_amount) }}</span>
              <span class="text-muted">{{ printMoney(product.price) }}c/u</span>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="p-3 fixed-bottom">
        <b-button variant="primary" block>Ir a pagar </b-button>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import global from "../mixins/globals.js"
import { BIcon, BIconTrash } from 'bootstrap-vue'
export default {
  mixins: [global],
  props: {
    show: {
      type: Boolean,
      default: false
    },
  },
  components: {
    BIcon,
    BIconTrash
  },
  data() {
    return {
      cart: [],
      qantity: 0
    }
  },
  mounted() {
    try {
      this.$fire.firestore.collection("/cart")
        .onSnapshot(async cart => {
          if (cart.size) {
            this.cart = cart.docs.map(item => {
              return {
                ...item.data(),
                id: item.id
              }
            })
          }
        });
    } catch (error) {
      console.error("No se pudo obtener la información del carrito:", error);
    }
  },
  methods: {
    updateCart(prodId, value) {
      this.$fire.firestore.collection("cart").doc(prodId).update({
        "added_amount": value
      })
    },
    deleteProduct(prodId) {
      this.$fire.firestore.collection("cart").doc(prodId).delete()
    }
  }
}
</script>
