<template>
  <div>
    <div class="card">
      <div class="card-child">
        <div class="card-image">
          <img :src="category.Product.image_url" alt="">
        </div>
        <div class="card-caption">
          <div class="product-name">
            <a href="">{{ category.Product.name }}</a>
          </div>
          <div class="cart">
            <h4>Price</h4>
            <h5 style="color: red">{{ category.Product.price.toLocaleString() }}</h5>
            <h4>Stock</h4>
            <h5 style="color: red">{{ category.Product.stock }}</h5>
            <form @submit.prevent="toCart">
              <label>Item to Buy</label>
              <input type="number" v-model="item" required><br>
              <br>
              <button type="submit" class="btn btn-primary">Add To Cart</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryField',
  props: ['category'],
  data () {
    return {
      item: ''
    }
  },
  methods: {
    toCart (event) {
      if (!localStorage.token) {
        this.$router.push({ path: '/login' })
        this.$vToastify.warning('login first')
      } else {
        if (this.item > this.category.Product.stock) {
          this.$vToastify.warning('stock not available')
        } else {
          const payload = {
            ProductId: this.category.Product.id,
            price: this.category.Product.price,
            totalItem: this.item
          }
          this.$store.dispatch('cart', payload)
            .then(cart => {
              event.target.reset()
              this.$vToastify.success(`add ${this.category.Product.name} to cart success`)
            })
            .catch(err => {
              this.$vToastify.warning({
                title: 'BRO',
                body: `${err.response.data.msg}`,
                type: 'warning',
                duration: 3000
              })
            })
        }
      }
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  overflow: auto;
}
.card-child {
  margin-left: 20px;
}

.card-image {
  border: none;
  box-shadow: 0px 1px 6px 0px rgba(49,53,59,0.60);
  /* padding: 172px 130px; */
}

.card-image img {
  height: 400px;
  width: 350px;
}

.card-caption {
  border: none;
  display: flex;
  flex-direction: column;
}

.card-caption div {
  border: none;
  box-shadow: 0px 1px 6px 0px rgba(49,53,59,0.60);
}

.cart {
  padding: 5px 50px;
}

.card-caption {
  padding: 15px;
}
</style>
