<template>
  						<tr>
							<td data-th="Product">
								<div class="row">
									<div class="col-sm-2 hidden-xs"><img :src= item.Product.image_url class="img-responsive"/></div>
									<div class="col-sm-10">
										<h4 class="nomargin">{{ item.Product.name }}</h4>
									</div>
								</div>
							</td>
							<td data-th="Price">{{ item.Product.price }}</td>
							<td data-th="Quantity">
								<input v-model="quantity" type="number" class="form-control text-center">
							</td>
							<td data-th="Subtotal" class="text-center">{{ item.Product.price*quantity }}</td>
							<td class="actions" data-th="">
								<button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
								<button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>								
							</td>
						</tr>
</template>++

<script>
export default {
  name: 'CartItem',
  props: ['item'],
  data () {
    return {
      quantity: '',
      price: ''
    }
  }
}
</script>

<style>

</style>