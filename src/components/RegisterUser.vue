<template>
  <div>
    <div class="container alert alert-warning" role="alert" v-if="error">{{error}}</div>
    <center>
    <div class="register-container">
      <b-form method="post" v-on:submit.prevent="registerUser">
        <h3>Register new user account</h3>
         <b-form-input
          type="username"
          name="username"
          v-model="username"
          placeholder="your username..."
          required
        />
        <br />
        <b-form-input
          type="phone"
          name="phone"
          v-model="phone"
          placeholder="phone number..."
          required
        />
        <b-form-input
          type="email"
          name="email"
          v-model="email"
          placeholder="email address..."
          required
        />
        <br />
        <b-form-input
          type="password"
          name="password"
          v-model="password"
          placeholder="password..."
          required
        />
        <b-form-invalid-feedback :state="validation">
          Your password must be at least 3 characters
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">
          Looks Good.
        </b-form-valid-feedback>
        <br />
        <b-button variant="success" type="submit" class="button-custom">
          Register new admin
        </b-button> <br>
        <b-button variant="primary" type="button" class="button-custom">
          <router-link to="/login" class="white">Login</router-link>
        </b-button> <br>
        <b-spinner label="Spinning" v-if="loading"></b-spinner>
      </b-form>
    </div>
    </center>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'RegisterUser',
    data() {
        return {
        username: "",
        email: "",
        password: "",
        phone: "",
        error: "",
        loading: false
        };
    },
    methods: {
        registerUser() {
            this.loading = true;
            axios({
                method: "post",
                // url: "http://localhost:3000/register",
                url :"https://tranquil-coast-06554.herokuapp.com/register",
                data: {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    phone: this.phone
                }
        })
            .then(data => {
                this.loading = false;
                this.$router.push('/login');
            })
            .catch(err => {
                if (err.response.data.msg) {
                    this.error = err.response.data.msg
                } else if (err.response.data.msg) {
                    this.error = err.response.data.msg[0]
                }
                this.loading = false;
            });
        }
    },
    computed: {
        validation() {
            return this.password.length >= 3;
        }
    }
}
</script>

<style>
  .main-container {
    display: flex;
    justify-content: center;
  }
  .register-container {
    margin: 8px;
    padding: 12px;
    background-color: gainsboro;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    width: 80%;
  }

  .button-custom {
    margin: 8px;
  }

  .white {
      color: white;
  }
</style>
