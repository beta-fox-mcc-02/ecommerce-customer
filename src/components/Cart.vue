<template>
<div class="container mb-4">
    <br><br>
    <div class="row">
        <div class="col-12" style="overflow: auto">
            <div class="table-responsive bg-light text-center">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">Product</th>
                            <th scope="col">Available</th>
                            <th scope="col" class="text-center">Quantity</th>
                            <th scope="col" class="text-right">Price</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src="https://wallpapercave.com/wp/wp1814640.jpg" style="max-width:50px; max-height:50px"/> </td>
                            <td>{{costumer.email}}</td>
                            <td>In stock</td>
                            <td>1</td>
                            <td class="text-right">124,90 €</td>
                            <td class="text-right"><button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i> </button> </td>
                        </tr>
                        <tr>
                            <td colspan="4"></td>
                            <td>Sub-Total</td>
                            <td class="text-right">255,90 €</td>
                        </tr>
                        <tr>
                            <td colspan="4"></td>
                            <td>Shipping</td>
                            <td class="text-right">6,90 €</td>
                        </tr>
                        <tr>
                            <td colspan="4"></td>
                            <td><strong>Total</strong></td>
                            <td class="text-right"><strong>346,90 €</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col mb-2">
            <div class="row">
                <div class="col-sm-12  col-md-6">
                    <button class="btn btn-block btn-light">Continue Shopping</button>
                </div>
                <div class="col-sm-12 col-md-6 text-right">
                    <button class="btn btn-lg btn-block btn-success text-uppercase">Checkout</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('fetchCostumer')
  },
  computed: {
    costumer () {
      console.log(this.$store.state.costumer)
      return this.$store.state.costumer
    }
  }
}
</script>

<style>

</style>
