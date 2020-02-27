<template>
  <section class="section">
    <h1 class="title has-text-centered">
      Log in to your account
    </h1>
    <div class="columns is-mobile is-centered">
      <div class="column is-4">
        <form v-on:submit.prevent="submitForm">
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="email"
                v-model="email"
                placeholder="Email input"
              />
              <span class="icon is-small is-left">
                <i class="mdi mdi-email"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                v-model="password"
                type="password"
                placeholder="Password input"
              />
              <span class="icon is-small is-left">
                <i class="mdi mdi-key"></i>
              </span>
            </div>
          </div>

          <div class="buttons">
            <input
              type="submit"
              value="Login"
              class="button is-primary is-fullwidth"
            />

            <a
              class="button is-light is-fullwidth"
              @click="$router.push({ path: '/register' })"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    submitForm: async function() {
      const data = {
        email: this.email,
        password: this.password
      }
      this.$store
        .dispatch('login', data)
        .then(path => {
          this.$router.push(path)
          this.$buefy.toast.open({
            message: 'Logged in.',
            type: 'is-success'
          })
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: `Email / password incorrect.`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
