<template>
  <section class="section">
    <h1 class="title has-text-centered">
      Create new account
    </h1>
    <div class="columns is-centered">
      <div class="column is-5 is-narrow">
        <form v-on:submit.prevent="submitForm">
          <div class="field">
            <label class="label">First Name</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                v-model="first_name"
                type="text"
                placeholder="First name"
              />
              <span class="icon is-small is-left">
                <i class="mdi mdi-account"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                v-model="last_name"
                type="text"
                placeholder="Last name"
              />
              <span class="icon is-small is-left">
                <i class="mdi mdi-account"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                v-model="email"
                type="email"
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
              value="Register"
              class="button is-primary is-fullwidth"
            />
            <a
              class="button is-light is-fullwidth"
              @click="$router.push({ path: '/login' })"
            >
              Cancel
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
      first_name: null,
      last_name: null,
      email: null,
      password: null
    }
  },
  methods: {
    submitForm: async function() {
      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password
      }
      this.$store
        .dispatch('register', data)
        .then(path => {
          this.$router.push(path)
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: `Registration failed.`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
