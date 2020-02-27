<template>
<div class="mb-4">
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block w-100" src="https://gearpatrol.com/wp-content/uploads/2019/04/30-Best-Watches-Under-1000-gear-patrol-lead-full.jpg" alt="First slide">
        <div class="carousel-caption d-none d-md-block">
          <h5>Get Your Watch Now</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, culpa in qui dolores velit neque numquam aut. Vel ab ullam pariatur dolorum iusto ut, minima eius voluptas numquam blanditiis voluptatibus.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="https://media.wired.com/photos/5a3030635a2d9a4a532ba9d3/master/w_2176,h_1632,c_limit/applewatchreview-IL.jpg" alt="Second slide">
        <div class="carousel-caption d-none d-md-block">
          <h5>Get Your Watch Now</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, culpa in qui dolores velit neque numquam aut. Vel ab ullam pariatur dolorum iusto ut, minima eius voluptas numquam blanditiis voluptatibus.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img class="d-block mx-auto w-100" src="https://gearpatrol.com/wp-content/uploads/2019/07/These-Are-the-Best-Big-Mens-Watches-gear-patrol-lead-full.jpg" alt="Third slide">
        <div class="carousel-caption d-none d-md-block">
          <h5>Get Your Watch Now</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, culpa in qui dolores velit neque numquam aut. Vel ab ullam pariatur dolorum iusto ut, minima eius voluptas numquam blanditiis voluptatibus.</p>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: 'Carousel'
}
</script>

<style scoped>
.carousel-item {
  height: auto;
  max-height: 500px;
  vertical-align: middle;
}

.carousel-caption {
  background: rgba(15, 15, 15, 0.46);
}
</style>
