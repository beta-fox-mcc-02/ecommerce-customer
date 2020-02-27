<template>
<div class="container">
  <table id="cart" class="table table-hover table-condensed">
    <thead>
      <tr>
							<th style="width:50%">Product</th>
							<th style="width:10%">Price</th>
							<th style="width:8%">Quantity</th>
							<th style="width:22%" class="text-center">Subtotal</th>
							<th style="width:10%"></th>
						</tr>
					</thead>
					<tbody v-for="item in cart" :key="item.id">
						<tr>
							<td data-th="Product">
								<div class="row">
									<div class="col-sm-2 hidden-xs"><img :src= item.image_url class="img-responsive"/></div>
									<div class="col-sm-10">
										<h4 class="nomargin">{{ item.name }}</h4>
									</div>
								</div>
							</td>
							<td data-th="Price">{{ item.price }}</td>
							<td data-th="Quantity">
								<input v-model="quantity" type="number" class="form-control text-center">
							</td>
							<td data-th="Subtotal" class="text-center">{{ item.price*quantity }}</td>
							<td class="actions" data-th="">
								<button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
								<button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>								
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr class="visible-xs">
							<td class="text-center"><strong>Total 1.99</strong></td>
						</tr>
						<tr>
							<td><a href="#" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
							<td colspan="2" class="hidden-xs"></td>
							<td class="hidden-xs text-center"><strong>Total $1.99</strong></td>
							<td><a href="#" class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></a></td>
						</tr>
					</tfoot>
				</table>
</div>
</template>

<script>
export default {
  name: 'Cart',
  data () {
    return {
      quantity: '',
      subtotal: ''
    }
  },
  methods: {
  },
  computed: {
    cart () {
      console.log(this.$store.state.cart)
      return this.$store.state.cart
    }
  }
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
</style>
