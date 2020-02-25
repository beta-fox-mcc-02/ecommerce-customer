<template>
  <div class="home">
    <Navbar style="position: fixed; top: 0px; width: 100%; z-index: 1;"/>

    <div class="carouselSayang">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              src="../assets/1.jpg"
              alt="First slide"
              style="cursor: pointer"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="../assets/4.jpg"
              alt="Second slide"
              style="cursor: pointer"
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>

    <img
      src="../assets/3.jpg"
      alt="newArrival"
      style="cursor: pointer; max-width: 100%; position: center"
    />

    <div class="container my-4 d-flex justify-content-center">
      <div class="row" style="display: flex; justify-content: space-around">
      <div class="col">
        <img
          src="../assets/5.jpg"
          alt="newArrival"
          style="cursor: pointer;"
        />
      </div>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar'
export default {
  name: 'Home',
  components: {
    Navbar
  },
  methods: {
    pindah () {
      this.$router.push('/haha')
    }
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.isAdmin) {
      next('/admin')
    }
    else {
      next()
    }
  }
}
</script>
<style scoped>
.carousel-inner > .item {
    position: relative;
    display: none;
    -webkit-transition: 0.6s ease-in-out left;
    -moz-transition: 0.6s ease-in-out left;
    -o-transition: 0.6s ease-in-out left;
    transition: 0.6s ease-in-out left;
}
</style>
