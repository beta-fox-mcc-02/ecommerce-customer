<template>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height" align="center" justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-img
                src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=person-holding-barbell-841130.jpg&fm=jpg"
                height="465px"
                class="align-end"
              >
                <v-card-title class="title white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p class="mt-4 subheading text-left">New Sport Shoes</p>

                    <div>
                      <p class="ma-0 body-1 font-weight-bold font-italic text-left">
                        Get your new shoes for exercises
                      </p>
                    </div>

                    <div class="align-self-center">
                      <v-btn
                        :class="{ 'show-btns': hover }"
                        color="transparent"
                        text
                      >
                        Show Collection
                      </v-btn>
                    </div>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
            <v-row class="fill-height" align="center" justify="center">
                <v-col
                    cols="12"
                >
                    <v-hover v-slot:default="{ hover }">
                        <v-card
                        :elevation="hover ? 12 : 2"
                        :class="{ 'on-hover': hover }"
                        >
                        <v-img
                            src="https://images.pexels.com/photos/1021145/pexels-photo-1021145.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            height="220px"
                            class="align-end"
                        >
                            <v-card-title class="title brown--text">
                            <v-row
                                class="fill-height flex-column"
                                justify="space-between"
                            >
                                <p class="mt-4 subheading text-left">Men's And Women's Choices</p>

                                <div>
                                <p class="ma-0 body-1 font-weight-bold font-italic text-left">
                                    All style for men and women available here, either for yourself or <br> couple show-off
                                </p>
                                </div>

                                <div class="align-self-center">
                                <v-btn
                                    :class="{ 'show-btns': hover }"
                                    color="transparent"
                                    text
                                >
                                    Show Collection
                                </v-btn>
                                </div>
                            </v-row>
                            </v-card-title>
                        </v-img>
                        </v-card>
                    </v-hover>
                </v-col>
                <v-col
                    cols="12"
                >
                    <v-hover v-slot:default="{ hover }">
                        <v-card
                        :elevation="hover ? 12 : 2"
                        :class="{ 'on-hover': hover }"
                        >
                        <v-img
                            src="https://images.pexels.com/photos/1630344/pexels-photo-1630344.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            height="220px"
                            class="align-end"
                        >
                            <v-card-title class="title black--text">
                            <v-row
                                class="fill-height flex-column"
                                justify="space-between"
                            >
                                <p class="mt-4 subheading text-left">Elegant and Glamour</p>

                                <div>
                                <p class="ma-0 body-1 font-weight-bold font-italic text-left">
                                    Formal, or elegant style of shoes, which everyone seeks, are available here. Explore yourself
                                </p>
                                </div>

                                <div class="align-self-center">
                                <v-btn
                                    :class="{ 'show-btns': hover }"
                                    color="transparent"
                                    text
                                >
                                    Show Collection
                                </v-btn>
                                </div>
                            </v-row>
                            </v-card-title>
                        </v-img>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    transparent: 'rgba(255, 255, 255, 0)'
  })
}
</script>

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
 }

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}

.title {
    margin: 0px 10px;
}
</style>
