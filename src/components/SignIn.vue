<template>
  <div class="signIn-area">
    <div class="card card-body card-signIn">
      <form>
        <div class="form-group">
          <label for="email">Email: </label>
          <input type="email" class="form-control" id="emial" placeholder="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password: </label>
          <input type="password" class="form-control" id="password" placeholder="password" required>
        </div>
        <button class="btn btn-dark" type="submit">Sign In</button>
      </form>
    </div>
    <i class="fa fa-times btn" aria-hidden="true" @click="closeSignInForm"></i>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  methods: {
    closeSignInForm () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.signIn-area {
  position: absolute;
  right: 0;
  display: flex;
}

.card-signIn form {
  width: 17vw;
}
</style>
