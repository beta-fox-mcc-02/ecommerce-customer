<template>
  <div class="container my-3 p-0 border rounded banner-container">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img src="https://images.unsplash.com/photo-1461988091159-192b6df7054f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80" class="d-block image-slide" alt="banner">
            </div>
            <div class="carousel-item">
            <img src="https://images.unsplash.com/photo-1570361993671-071c6b1019e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=888&q=80" class="d-block image-slide" alt="banner">
            </div>
            <div class="carousel-item">
            <img src="https://images.unsplash.com/photo-1561204963-862829696b62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" class="d-block image-slide" alt="banner">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style>
.image-slide {
  width: 100%;
  height: 80vh;
}
</style>
