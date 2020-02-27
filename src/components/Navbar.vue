<template>
<div>
    <nav class="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
      <div class="container">
        <a class="navbar-brand logo" href="#">
          Music-<i class="fab fa-creative-commons-sampling-plus" style="font-size: 25px;"></i>nlain
        </a>
        <button
          data-toggle="collapse" data-target="#navcol-1" class="navbar-toggler"><span
            class="sr-only">Toggle navigation</span><span
            class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="nav navbar-nav ml-auto">
            <li role="presentation" class="nav-item"><a class="nav-link" href="index.html">Home</a>
            </li>
            <li role="presentation" class="nav-item"><router-link class="nav-link"
              to="/checkout"  >Checkout</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
</div>
</template>

<script>
export default {

};
</script>
