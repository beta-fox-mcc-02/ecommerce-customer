<template>
<form @submit.prevent="register">
    <div class="form-group"><label for="name">Username</label><input class="form-control item"
        type="text" id="name" v-model="username" /></div>
    <div class="form-group"><label for="email">Email</label><input class="form-control item"
        type="email" id="email" v-model="email" /></div>
    <div class="form-group"><label for="password">Password</label><input class="form-control item"
        type="password" id="password" v-model="password" /></div>
    <button class="btn btn-primary btn-block" type="submit">Sign
      Up</button>
</form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('register', payload)
        .then((result) => {
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>
