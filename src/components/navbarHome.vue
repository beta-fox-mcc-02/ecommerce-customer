<template>
<nav class="navbar navbar-expand-md ">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <img src="../assets/logo.png" alt="">
            </li>
        </ul>
    </div>
    <div class="mx-auto order-0">
        <a class="navbar-brand mx-auto" href="#">Ikan</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2" style="align-item: center;">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/about" >Shop</router-link>
                <!-- <a class="nav-link" href="#">Shop</a> -->
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
export default {};
</script>

<style  scoped>
a {
    color: black;
}
.navbar
{
    background-color: transparent;
    z-index: 2;
}

nav.scroll {
  background-color: #A1572F;
  color: #eef;
}
</style>