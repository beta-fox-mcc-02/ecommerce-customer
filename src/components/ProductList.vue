<template>
        <div class="row my-4" id="comics">
            <!-- Each of comic will have one of this card -->
            <div class="col-4 mb-4" v-for="product in products" :key="product.id">
                <div class="card text-center">
                    <img
                    :src="product.image_url"
                    class="card-img-top"
                    height="300px"
                    >
                    <div class="d-flex flex-column justify-content-center card-body" style="min-height : 202px">
                    <h5 class="card-title">{{product.name}}</h5>
                        <div class="align-items-end">
                            <p class="card-text">
                                Price : Rp {{product.price.toLocaleString('id')}}
                                <br>
                                Stock : {{product.stock}}
                            </p>
                            <router-link class="btn" :to="`product/${product.id}`"><i class="fas fa-cart-plus"></i></router-link>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
  methods: {
    buy (id) {
      this.$router.push(`/${id}`)
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>

</style>
