<template>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height" align="center" justify="center">
      <template v-for="(item, i) in items">
        <v-col
          :key="i"
          cols="12"
          md="6"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
              @click="fecthData(item.category)"
            >
              <v-img
                :src="item.img"
                height="225px"
              >
                <v-card-title class="title white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p class="mt-4 subheading text-left" >{{ item.title }}</p>

                    <div>
                      <p class="ma-0 body-1 font-weight-bold font-italic text-left">
                        {{ item.text }}
                      </p>
                    </div>

                    <div class="align-self-center">
                      <v-btn
                        v-for="(icon, index) in icons"
                        :key="index"
                        :class="{ 'show-btns': hover }"
                        color="transparent"
                        icon
                      >
                        <v-icon
                          :class="{ 'show-btns': hover }"
                          color="transparent"
                        >
                          {{ icon }}
                        </v-icon>
                      </v-btn>
                    </div>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-rewind', 'mdi-play', 'mdi-fast-forward'],
    items: [
      {
        title: 'Anime Costume',
        text: 'Find Costume Your Favorite Anime',
        img: 'https://cf.shopee.co.id/file/41449fd6d2b042b53e4d796775ea1723',
        category: 1
      },
      {
        title: 'Figure & Stuff Hobby',
        text: 'Find your Hobby stuff here',
        img: 'https://www.archonia.com/images/news/headerpvcfigureswk5019.jpg',
        category: 2
      }
    ],
    transparent: 'rgba(255, 255, 255, 0)'
  }),
  methods: {
    fecthData (id) {
      localStorage.setItem('id', id)
      this.$store.dispatch('fecthData', id)
      this.$router.push('/list')
    }
  },
  created () {

  }
}
</script>

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
 }

.show-btns {
  color: rgba(255, 255, 255, 0.50) !important;
}

p {
  color: white;
  border-left-style: hidden
}
</style>
