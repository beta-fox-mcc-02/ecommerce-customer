<template>
<form @submit.prevent="login    ">
    <div class="form-group"><label for="email">Email</label><input class="form-control item"
        type="email" id="email" v-model="email" /></div>
    <div class="form-group"><label for="password">Password</label><input class="form-control item"
        type="password" id="password" v-model="password" /></div>
    <button class="btn btn-primary btn-block" type="submit">Sign
      In</button>
</form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('login', payload)
        .then((result) => {
          console.log(result.data);
          localStorage.setItem('access_token', result.data.access_token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>
