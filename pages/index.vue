<template>
  <div>
    <b-row>
      <b-col md="3" v-for="product in products.data" :key="product.id" @click="showProductDetails(product)">
        <Product :product="product" />
      </b-col>
    </b-row>

    <b-modal id="modal-product-details" title="Detalles del producto" body-class="px-4" ok-title="Agregar al carrito" ok-only>
      <div class="text-center">
        <b-img-lazy :src="selectedProduct.image_medium_url"></b-img-lazy>
      </div>

      <p class="my-4 text-center">{{ selectedProduct.name }}</p>

      <b-row class="my-4">
        <b-col> {{ printMoney(selectedProduct.price) }} </b-col>
        <b-col> <strong>Disponible:</strong> {{ selectedProduct.quantity }} </b-col>
      </b-row>

      <b-form-group label="Elige la cantidad a comprar">
        <b-form-spinbutton v-model="value" min="1" :max="selectedProduct.quantity" class="w-50"></b-form-spinbutton>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import global from "../mixins/globals.js"
export default {
  mixins: [global],
  name: 'IndexPage',
  layout: "default",
  data() {
    return {
      products: [],
      selectedProduct: {},
      value: 1
    }
  },

  methods: {
    async getProducts() {

      this.products = await this.$axios.$get("https://run.mocky.io/v3/729fdd53-f365-49b4-bd55-f7e10bcc9a4b")

      console.log("🚀 ~ file: index.vue ~ line 17 ~ getProducts ~ this.products", this.products)

    },
    showProductDetails(product) {
      this.value = 1
      console.log(product)
      this.selectedProduct = product.attributes
      this.$bvModal.show("modal-product-details")
    }
  },
  mounted() {
    this.getProducts();
  },
}


</script>


