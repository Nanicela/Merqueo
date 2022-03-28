<template>
  <div>
    <b-row>
      <b-col md="3" v-for="product in filteredProducts" :key="product.id" @click="showProductDetails(product)">
        <Product :product="product" />
      </b-col>
      <h5 class="w-100 text-center mt-5" v-if="!products.length || !filteredProducts.length">{{products.length && !filteredProducts.length ? "No hay productos disponibles" : "Cargando productos..."}}</h5>
    </b-row>

    <b-modal id="modal-product-details" title="Detalles del producto" body-class="px-4" hide-footer>
      <div v-if="selectedProduct.attributes">
        <div class="text-center">
          <b-img-lazy :src="selectedProduct.attributes.image_medium_url"></b-img-lazy>
        </div>

        <p class="my-4 text-center">{{ selectedProduct.attributes.name }}</p>

        <b-row class="my-4">
          <b-col> {{ printMoney(selectedProduct.attributes.price) }} </b-col>
          <b-col> <strong>Disponible:</strong> {{ selectedProduct.attributes.quantity }} </b-col>
        </b-row>

        <b-form-group label="Elige la cantidad a comprar">
          <b-form-spinbutton v-model="value" min="1" :max="selectedProduct.attributes.quantity" class="w-50"></b-form-spinbutton>
        </b-form-group>

        <b-button class="mt-3" block @click="addToCart()">Agregar al carrito</b-button>

        <b-alert variant="success" class="mt-2" v-model="successAlert" dismissible>¡Añadido al carrito correctamente!</b-alert>
      </div>
    </b-modal>
  </div>
</template>

<script>
import global from "../mixins/globals.js"
import { mapState } from "vuex"
export default {
  mixins: [global],
  name: 'IndexPage',
  layout: "default",
  data() {
    return {
      products: [],
      selectedProduct: {},
      value: 1,
      cartProducts: {},
      successAlert: false
    }
  },
  computed: {
    ...mapState({
      searchText: (state) => state.global.searchText
    }),
    filteredProducts(){
      if(this.searchText){
        return this.products.filter(item => item.attributes.name.toLowerCase().includes(this.searchText.toLowerCase()))
      }else{
        return this.products
      }
    }
  },
  methods: {
    async getProducts() {
      const products = await this.$axios.$get("https://run.mocky.io/v3/729fdd53-f365-49b4-bd55-f7e10bcc9a4b")
      this.products = products.data
    },
    showProductDetails(product) {
      this.successAlert = false
      this.value = 1
      this.selectedProduct = product
      this.$bvModal.show("modal-product-details")
    },
    async addToCart() {
      if (this.cartProducts[this.selectedProduct.id]) {
        this.selectedProduct.attributes["added_amount"] = this.cartProducts[this.selectedProduct.id].added_amount + this.value
      } else {
        this.selectedProduct.attributes["added_amount"] = this.value
      }
      this.cartProducts[this.selectedProduct.id] = this.selectedProduct.attributes
      this.successAlert = true
      await this.$fire.firestore.collection("cart").doc(this.selectedProduct.id).set(this.selectedProduct.attributes)
    }
  },
  mounted() {
    this.getProducts();
  },
}
</script>


