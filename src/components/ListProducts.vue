<template>
    <b-container class="d-flex m-2 p-2 flex-wrap">
      {{products}}
        <div>
            <b-card
                title="Card Title"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
                <b-card-text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
                </b-card-text>

                <b-button class="m-1" variant="primary">Add Cart</b-button>
                <b-button class="m-1" to="/1" variant="primary">View Detail</b-button>
            </b-card>
        </div>
    </b-container>
</template>

<script>
export default {
  name: 'ListProduct',
  data () {
    return {
      products: []
    }
  },
  methods: {
    detail () {
      this.$router.push('/1')
    }
  }
}
</script>

<style>

</style>
