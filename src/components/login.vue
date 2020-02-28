<template>
  <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
    <button class="button field is-success" slot="trigger" role="button" style="margin-right:7px;">
      <span>Login</span>
    </button>
    <b-dropdown-item aria-role="menu-item" :focusable="false" custom paddingless>
      <form method="post" @submit.prevent="login">
        <div class="modal-card" style="width:300px;">
          <section class="modal-card-body">
            <b-field label="Email">
              <b-input type="email" placeholder="Your email" required v-model="email"></b-input>
            </b-field>

            <b-field label="Password">
              <b-input
                type="password"
                password-reveal
                placeholder="Your password"
                required
                v-model="password"
              ></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success">Login</button>
          </footer>
        </div>
      </form>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const login = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('fetchLogin', login)
    }
  }
}
</script>

<style>
</style>
