<template>
  <div v-bind:class="{ active: isActive }" class="box">
    <div class="form-container sign-up-container">
      <form @submit.prevent="registerUser()">
        <h1>Create Account</h1>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form @submit.prevent="login()">
        <h1>Sign in</h1>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <input autofocus v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Already have an account?</h1>
          <button @click="toggleForm()" class="ghost">Sign in here</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Don't have any account?</h1>
          <button @click="toggleForm()" class="ghost">Sign up here</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      isActive: false,
      email: '',
      password: '',
    };
  },
  computed: {
    error() {
      return this.$store.state.error;
    },
  },
  methods: {
    toggleForm() {
      if (this.isActive) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
      this.resetError();
      this.resetInput();
    },
    resetError() {
      this.$store.commit('setError', '');
    },
    resetInput() {
      this.email = '';
      this.password = '';
    },
    login() {
      this.resetError();
      const data = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('login', data)
        .then((response) => {
          // show success alert
          this.$store.commit('showAlert', {
            successMessage: 'Successfully Login',
            interval: 2000,
          });
          const payload = {
            id: response.data.id,
            email: response.data.email,
            user_role: response.data.user_role,
          };
          this.$store.commit('setLogin', payload);
          localStorage.token = response.data.token;
          // localStorage.person_id = response.data.id;
          this.$router.push('/');
        })
        .catch((err) => {
          this.$store.commit('setError', err.response.data.error);
        })
        .finally(() => {
          this.$store.commit('stopLoading');
        });
    },
    registerUser() {
      this.resetError();
      const data = {
        email: this.email,
        password: this.password,
        user_role: 'user',
      };
      this.$store.dispatch('registerUser', data)
        .then((response) => {
          this.$store.commit('showAlert', {
            successMessage: 'Your Account is Successfully Registered',
            interval: 2000,
          });
          const payload = {
            id: response.data.id,
            email: response.data.email,
            user_role: response.data.user_role,
          };
          this.$store.commit('setLogin', payload);
          localStorage.token = response.data.token;
          localStorage.person_id = response.data.id;
          this.$router.push('/');
        })
        .catch((err) => {
          const error = Array.isArray(err.response.data.error)
            ? err.response.data.error[0] : err.response.data.error;
          this.$store.commit('setError', error);
        })
        .finally(() => {
          this.$store.commit('stopLoading');
        });
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   if (localStorage.token) {
  //     next('/');
  //   } else {
  //     next();
  //   }
  // },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700&display=swap');

body {
  background: #f6f5f7;
}

h1 {
  font-weight: 700;
  margin: 15px 0;
}
p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}
button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}
button:active {
  transform: scale(0.95);
}
button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}
.form-container form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}
.form-container input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}
.box {
  margin: 10px auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}
.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}
.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.overlay-left {
  transform: translateX(-20%);
}
.overlay-right {
  right: 0;
  transform: translateX(0);
}
/* animation */
.box.active .sign-in-container {
  transform: translateX(100%);
}
.box.active .overlay-container {
  transform: translateX(-100%);
}
.box.active .overlay {
  transform: translateX(50%);
}
.box.active .overlay-left {
  transform: translateX(0);
}
.box.active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}
.box.active .overlay-right {
  transform: translateX(20%);
}
</style>
