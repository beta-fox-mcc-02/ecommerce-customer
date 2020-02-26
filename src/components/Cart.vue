<template>
  <div class="container">
      <div class="box">
          <h1 class="has-text-centered has-text-black is-size-3"><strong>SHOPPING CART</strong></h1><hr>
            <div class="columns">
                <div class="box">
                    <table class="table is-responsive">
                      <thead>
                        <tr>
                          <th>ProductId</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Price (IDR)</th>
                          <th>Quantity</th>
                          <th>Action</th>
                          <th>Total (IDR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td><figure class="image"><img src="https://images.unsplash.com/photo-1544816565-c199d6f5d2d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"></figure></td>
                          <td>Astronaut</td>
                          <td>100000</td>
                          <td>
                              <b-input
                                  size="is-small"
                                  type="number"
                                  value=1
                                  min="0" max="5"
                                  required>
                              </b-input>            
                          </td>
                          <td><b-button rounded size="is-small" type="is-danger" outlined>remove</b-button></td>
                          <td>1000000</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td><figure class="image"><img src="https://images.unsplash.com/photo-1544816565-c199d6f5d2d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"></figure></td>
                          <td>Astronaut</td>
                          <td>100000</td>
                          <td>
                              <b-input
                                  size="is-small"
                                  type="number"
                                  value=1
                                  min="0" max="5"
                                  required>
                              </b-input>            
                          </td>
                          <td><b-button rounded size="is-small" type="is-danger" outlined>remove</b-button></td>
                          <td>1000000</td>
                        </tr>      
                      </tbody>
                    </table>  
                </div>
                <div class="column is-3 has-text-centered has-text-info is-size-5">
                    GRAND TOTAL
                    <strong>IDR 1000000</strong><br>
                    <b-button outlined class="is-success is-size-5" rounded size="is-default">Proceed to Checkout</b-button>
                </div>                
            </div>
      </div>    
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'cart',
    computed: {
        ...mapState(['cart', 'cartTotal'])
    },
    methods: {

    },
    created() {
        this.$store.dispatch('fetchCart')
    }
}
</script>

<style>

</style>