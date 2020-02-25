<template>
  
  <!-- Footer -->
<footer class="page-footer font-small stylish-color-dark pt-4" >

  <!-- Footer Links -->
  <div class="container text-center text-md-left">

    <!-- Grid row -->
    <div class="row">

      <!-- Grid column -->
      <div class="col-md-4 mx-auto">

        <!-- Content -->
        <h5 class="font-weight-bold text-uppercase mt-3 mb-3">About G&N</h5>
        <p>G&N store has since it was founded in 2020 grown into 
            one of the world's leading fashion companies. 
            The content of this site is copyright-protected and is the property of Atticus-G group.</p>

      </div>
      <!-- Grid column -->

      <hr class="clearfix w-100 d-md-none">

      <!-- Grid column -->
      <div class="col-md-2 mx-auto" @click.prevent="">

        <!-- Links -->
        <p class="font-weight-bold text-uppercase mt-3 mb-2">Coorporate info</p>

        <ul class="list-unstyled">
          <li>
            <a href="#!">Carrer at G&N</a>
          </li>
          <li>
            <a href="#!">About Atticus-G group</a>
          </li>
          <li>
            <a href="#!">Newsletter</a>
          </li>
          <li>
            <a href="#!">Press</a>
          </li>
        </ul>

      </div>
      <!-- Grid column -->

      <hr class="clearfix w-100 d-md-none">

      <hr class="clearfix w-100 d-md-none">

      <!-- Grid column -->
      <div class="col-md-2 mx-auto" @click.prevent="">

        <!-- Links -->
        <p class="font-weight-bold text-uppercase mt-3 mb-2">HELP</p>

        <ul class="list-unstyled">
          <li>
            <a href="#!">My G&N</a>
          </li>
          <li>
            <a href="#!">Store Location</a>
          </li>
          <li>
            <a href="#!">Contact</a>
          </li>
          <li>
            <a href="#!">Legal & privacy</a>
          </li>
        </ul>

      </div>
      <!-- Grid column -->

    </div>
    <!-- Grid row -->

  </div>
  <!-- Footer Links -->

  <hr>

  <!-- Call to action -->

  <!-- Social buttons -->
  <ul class="list-unstyled list-inline text-center">
    <li class="list-inline-item">
      <a class="btn-floating btn-fb mx-1" href="https://www.facebook.com/xaavier.lotus" target="_blank">
        <i class="fab fa-facebook-f"> </i>
      </a>
    </li>
    <li class="list-inline-item">
      <a class="btn-floating btn-tw mx-1" href="https://twitter.com/Ganang_manggolo" target="_blank">
        <i class="fab fa-twitter"> </i>
      </a>
    </li>
    <li class="list-inline-item">
      <a class="btn-floating btn-gplus mx-1" href="https://www.instagram.com/marryhuwana/" target="_blank">
        <i class="fab fa-instagram"></i>
      </a>
    </li>
    <li class="list-inline-item">
      <a class="btn-floating btn-li mx-1"  href="https://www.linkedin.com/in/ganang-prakoso-27a64a191/" target="_blank">
        <i class="fab fa-linkedin-in"> </i>
      </a>
    </li>
  </ul>
  <!-- Social buttons -->

  <!-- Copyright -->
  <div class="footer-copyright text-center py-3">© 2020 Copyright:
    <router-link to="/"> gnn.atticusg.xyz</router-link>
  </div>
  <!-- Copyright -->

</footer>
<!-- Footer -->
</template>

<script>
export default {

}
</script>

<style scoped>
a {
   color: black;
   text-decoration: none
}
footer {
  background: transparent;
}
a:hover {
   color: rgb(235, 17, 53);
}
i {
   cursor: pointer
}
i:hover {
   color: rgb(235, 17, 53);
}
</style>