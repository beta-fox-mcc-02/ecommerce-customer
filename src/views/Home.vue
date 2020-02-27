<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <section class="banner-area" id="home">
      <div class="container">
        <div class="row fullscreen d-flex align-items-center justify-content-center">
          <div class="banner-content col-lg-10">
            <h5 class="text-white text-uppercase" style="margin-top: 25vh">Now you can feel the Heat</h5>
            <h1 class="text-white" style="font-weight: bold; size: 55px">Smart New Future</h1>
            <a href="#" class="btn btn-light text-uppercase text-blue">Buy Now</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Start video-sec Area -->
    <section class="video-sec-area section-gap" id="about">
      <div class="container" style="margin-top: 10rem">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-6 video-left">
            <h6>Brand new app to blow your mind</h6>
            <h1>
              We’ve made a life
              <br />that will change you
            </h1>
            <p>
              <span>We are here to listen from you deliver exellence</span>
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temp or incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
            <a class="btn btn-primary" href="#">Get Started now</a>
          </div>
          <div class="col-lg-6 video-right justify-content-center align-items-center d-flex">
            <div class="overlay overlay-bg"></div>
            <iframe
              width="420"
              height="315"
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              frameborder="0"
              allowfullscreen
            ></iframe>
            <!-- <a class="play-btn" href="https://www.youtube.com/watch?v=ARA0AxrnHdM"><img class="img-fluid" src="../assets/play-icon.png" alt=""></a> -->
          </div>
        </div>
      </div>
    </section>

    <!-- Start top-course Area -->
    <section class="top-course-area section-gap mt-5">
      <div class="container" style="margin-top: 15rem">
        <div class="row d-flex justify-content-center">
          <div class="menu-content pb-60 col-lg-10">
            <div class="title text-center">
              <h1 class="mb-10">Top Features on Top of Your Minds</h1>
              <p>Who are in extremely love with eco friendly system.</p>
            </div>
          </div>
        </div>
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-3 course-left">
            <div class="single-course">
              <span class="lnr lnr-rocket"></span>
              <a href="#">
                <h4>High Performance</h4>
              </a>
              <p>Lorem ipsum dolor sit amet, consectetur adipisic ing elit, seddo eiusmod tempor incid.idunt ut labore et dolore magna aliqua.</p>
            </div>
            <div class="single-course">
              <span class="lnr lnr-cog"></span>
              <a href="#">
                <h4>High Performance</h4>
              </a>
              <p>Lorem ipsum dolor sit amet, consectetur adipisic ing elit, seddo eiusmod tempor incid.idunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
          <div class="col-lg-6 course-middle">
            <img class="img-fluid mx-auto d-block" src="../assets/c1.png" alt />
          </div>
          <div class="col-lg-3 course-right">
            <div class="single-course">
              <span class="lnr lnr-apartment"></span>
              <a href="#">
                <h4>High Performance</h4>
              </a>
              <p>Lorem ipsum dolor sit amet, consectetur adipisic ing elit, seddo eiusmod tempor incid.idunt ut labore et dolore magna aliqua.</p>
            </div>
            <div class="single-course">
              <span class="lnr lnr-phone"></span>
              <a href="#">
                <h4>High Performance</h4>
              </a>
              <p>Lorem ipsum dolor sit amet, consectetur adipisic ing elit, seddo eiusmod tempor incid.idunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End top-course Area -->

    <!-- Start home-about Area -->
    <section class="home-about-area">
      <div class="container-fluid" style="margin-top: 10rem">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-6 no-padding home-about-left">
            <img class="img-fluid" src="../assets/about-img.jpg" alt />
          </div>
          <div class="col-lg-6 no-padding home-about-right">
            <h1>
              Globally Connected
              <br />by Large Network
            </h1>
            <p>
              <span>We are here to listen from you deliver exellence</span>
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.
            </p>
            <a class="text-uppercase btn btn-primary" href="#">get details</a>
          </div>
        </div>
      </div>
    </section>
    <!-- End home-about Area -->

    <!-- Start faq Area -->
    <section class="faq-area section-gap" id="faq">
      <div class="container" style="margin-top: 10rem">
        <div class="row d-flex justify-content-center">
          <div class="menu-content pb-60 col-lg-10">
            <div class="title text-center mb-5">
              <h1 class="mb-10">Frequently Asked Questions</h1>
              <p>Who are in extremely love with eco friendly system.</p>
            </div>
          </div>
        </div>
        <div class="row justify-content-start">
          <div class="col-lg-6 faq-left">
            <div id="accordion">
              <div class="card">
                <div class="card-header" id="headingThree">
                  <h5 class="mb-0">
                    <button
                      class="btn btn-link text-white"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >Are your Templates responsive?</button>
                  </h5>
                </div>

                <div
                  id="collapseOne"
                  class="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div
                    class="card-body"
                  >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="headingThree">
                  <h5 class="mb-0">
                    <button
                      class="btn btn-link text-white collapsed"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >Does it have all the plugin as mentioned?</button>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  class="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordion"
                >
                  <div
                    class="card-body"
                  >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="headingThree">
                  <h5 class="mb-0">
                    <button
                      class="btn btn-link text-white collapsed"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >Can i use the these theme for my client?</button>
                  </h5>
                </div>
                <div
                  id="collapseThree"
                  class="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div
                    class="card-body"
                  >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="headingThree">
                  <h5 class="mb-0">
                    <button
                      class="btn btn-link text-white collapsed"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >Are your Templates responsive?</button>
                  </h5>
                </div>
                <div
                  id="collapseFour"
                  class="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div
                    class="card-body"
                  >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End faq Area -->

  
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
<style scoped>
#home {
  padding-top: 0;
  background-image: url("../assets/header-bg.png");
  height: 95vh;
  background-repeat: no-repeat;
  background-position: center;
}

.faq-area {
  background-image: url("../assets/faq-bg.jpg");
  height: 70vh;
  background-repeat: no-repeat;
  background-position: center;
}

#headingThree {
  background-image: linear-gradient(-90deg, #7f7fd5, #3e82ff, #91eae4);
}
</style>
