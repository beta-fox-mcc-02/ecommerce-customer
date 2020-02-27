<template>
  <v-container
    fluid
    style="margin-top: 127px;"
  >
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item
        color="purple lighten-2"
        fill-dot
        right
        >
        <v-card>
            <v-card-title class="purple lighten-2">
            <v-icon
                dark
                size="42"
                class="mr-4"
            >
                fas fa-hourglass-start
            </v-icon>
            <h2 class="display-1 white--text font-weight-light">Starting Line</h2>
            </v-card-title>
            <v-container>
            <v-row>
                <v-col
                class="hidden-sm-and-down text-right"
                md="2"
                >
                <v-icon size="64">far fa-lightbulb</v-icon>
                </v-col>
                <v-col cols="12" md="10">
                As shoes-enthusiasts, we brainstorm ideas for making new shop for every generation. We start developing ideas, from searching trending fashion, especially about shoes, until how we deliver our shop to customers.
                </v-col>
            </v-row>
            </v-container>
        </v-card>
        </v-timeline-item>

        <v-timeline-item
        color="amber lighten-1"
        fill-dot
        left
        small
        >
        <v-card>
            <v-card-title class="amber lighten-1 justify-end">
            <h2 class="display-1 mr-4 white--text font-weight-light">Development</h2>
            <v-icon
                dark
                size="42"
            >mdi-home-outline</v-icon>
            </v-card-title>
            <v-container>
            <v-row>
                <v-col cols="12" md="10">
                We develop and schedule the priorities development. We start developing from style to style, surveying today's trending shoes, etc.
                </v-col>
                <v-col
                class="hidden-sm-and-down text-left"
                md="2"
                >
                <v-icon size="64">mdi-calendar-text</v-icon>
                </v-col>
            </v-row>
            </v-container>
        </v-card>
        </v-timeline-item>

        <v-timeline-item
        color="cyan lighten-1"
        fill-dot
        right
        >
        <v-card>
            <v-card-title class="cyan lighten-1">
            <v-icon
                class="mr-4"
                dark
                size="42"
            >
                mdi-email-outline
            </v-icon>
            <h2 class="display-1 white--text font-weight-light">Communication</h2>
            </v-card-title>
            <v-container>
            <v-row>
                <v-col
                class="hidden-sm-and-down text-right"
                md="2"
                >
                <v-icon size="64">far fa-paper-plane</v-icon>
                </v-col>
                <v-col cols="12" md="10">
                Sending survey and receiving feedback to each other in team and between us and customers are our ways to develop better shop. We make sure that the interactions and the feedback we receive become our consideration to develop better
                </v-col>
            </v-row>
            </v-container>
        </v-card>
        </v-timeline-item>

        <v-timeline-item
        color="red lighten-1"
        fill-dot
        left
        small
        >
        <v-card>
            <v-card-title class="red lighten-1 justify-end">
            <h2 class="display-1 mr-4 white--text font-weight-light">Teamwork</h2>
            <v-icon
                dark
                size="42"
            >
                mdi-account-multiple-outline
            </v-icon>
            </v-card-title>
            <v-container>
            <v-row>
                <v-col cols="12" md="10">
                We also love to share our hobbies and likes regarding fashion, exclusively for shoes. Either in team and to customers, we always try to regenerate new inspiration for new products and services, based on trending.
                </v-col>
                <v-col
                class="hidden-sm-and-down text-left"
                md="2"
                >
                <v-icon size="64">far fa-laugh-beam</v-icon>
                </v-col>
            </v-row>
            </v-container>
        </v-card>
        </v-timeline-item>

        <v-timeline-item
        color="green lighten-1"
        fill-dot
        right
        >
        <v-card>
            <v-card-title class="green lighten-1">
            <v-icon
                class="mr-4"
                dark
                size="42"
            >
                mdi-phone-in-talk
            </v-icon>
            <h2 class="display-1 white--text font-weight-light">Contact Us</h2>
            </v-card-title>
            <v-container>
            <v-row>
                <v-col
                class="hidden-sm-and-down text-right"
                md="2"
                >
                <v-icon size="64">fas fa-comment-dots</v-icon>
                </v-col>
                <v-col cols="12" md="10">
                We are available every work hours, except holidays. So do not hesitate and contact us to our available contacts, or visit our shop directly. We always serve you kindly.
                </v-col>
            </v-row>
            </v-container>
        </v-card>
        </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
