<template>
  <md-card class="innercard">
    <md-card-content style="width: 150px; padding: 0">
      <md-card-media class="imageRatio">
        <img src="https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/blackshark.jpg">
      </md-card-media>
    </md-card-content>
    <md-card-content style="position: absolute; top: 0; left: 150px;">
      <table style="font-size: 1.2rem;">
        <tr align="left">
          <th width="160;" align="left" style="padding-bottom: .8rem;">Product Name</th>
          <td style="padding-bottom: .8rem;">Nama Produknya</td>
        </tr>
        <tr align="left">
          <th style="padding-bottom: .8rem;">Price</th>
          <td style="padding-bottom: .8rem;">Harga Produknya</td>
        </tr>
        <tr align="left">
          <th style="padding-bottom: .8rem;">Category</th>
          <td style="padding-bottom: .8rem;">Kategori Produknya</td>
        </tr>
        <tr align="left">
          <th style="padding-bottom: .8rem;">Quantity</th>
          <td style="padding-bottom: .8rem;">
            <input type="number" style="width: 3rem;">
          </td>
        </tr>
      </table>
    </md-card-content>
  </md-card>
</template>

<script>
export default {

}
</script>

<style scoped>
  .innercard {
    width: 100%;
    background: rgba(0,0,0,.5);
    margin-bottom: 1rem;
    color:powderblue;
  }
  .imageRatio {
    overflow: hidden
  }
  .imageRatio:before {
    width: 100%;
    padding-top: 125%;
    display: block;
    content:" "
  }
  .imageRatio img {
    height: 100%;
    position: absolute;
    top: 75%;
    right: 0;
    left: 0;
    transform: translateY(-75%)
  }
</style>
