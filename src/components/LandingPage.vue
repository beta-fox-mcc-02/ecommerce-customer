<template>
  <div class="image-home">
    <img
      src="https://www.fcbarcelona.com/fcbarcelona/photo/2019/06/03/1e24614a-dce9-43c5-8f74-daf153d6d544/mini_KV-3200x2000-ENG-.jpg"
    />
    <img
      src="https://res.cloudinary.com/chelsea-production/image/upload/c_fill,dpr_auto,f_auto,fl_lossy,g_face,h_320,q_auto,w_640,z_1.0/v1/cfc/news/latestnews/16/5/kit_launch_2016_header"
      alt
    />
    <img
      src="http://www.yonex.com/_assets/images/YONEX-CZ2_KV-03-LIN-DAN_RGB_72dpi_960x280-nologo.jpg"
      alt
      class="tiga"
    />
    <img
      src="https://m.media-amazon.com/images/S/abs-image-upload-na/4/AmazonStores/ATVPDKIKX0DER/b57f4edf8d7545cc6ce90441166b9997.w3000.h600._CR0%2C0%2C3000%2C600_SX1500_.png"
      alt
      class="empat"
    />
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
.image-home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image-home img {
  width: 100%;
  height: 90vh;
  padding: 20px;
}

.image-home .empat {
  height: 65vh;
}
</style>
