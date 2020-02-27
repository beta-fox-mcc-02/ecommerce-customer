<template>
     <div class="container mx-auto" style="width: 20rem; margin-top: 5rem;">
          <h3>Register </h3>
      <img src="../assets/loading.gif" v-if="seeLoading" />

      <form @submit.prevent="register" v-else>
          <div class="form-group">
              <label for="exampleInputEmail1">name</label>
              <input type="text" class="form-control"  aria-describedby="emailHelp" placeholder="Enter name" v-model="name">
            </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
            <small id="" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" placeholder="Password" v-model="password">
          </div>
          <button type="submit" class="btn btn-primary mb-4">Register</button>
        </form>            
        <router-link to="/login">Login here</router-link>

        </div>
</template>

<script>
name : 'registerPage'
import axios from '../api/axiosInstance'
export default {
    data(){
        return {
            name:'',
            email:'',
            password:''
        }
    },
     computed:{
    seeLoading() { 
      return this.$store.state.loading;
    }
  },
    methods:{
        register(){
          this.$store.commit('SET_LOADING', true)
          axios({
            method: 'post',
            url: '/user/register',
            data: {
              name: this.name,
              email: this.email,
              password: this.password
            }
          })
          .then(({ data }) => {
            console.log(data);
            
            this.name = ''
            this.email = ''
            this.password = ''
            localStorage.setItem('token', data.token);
            this.$store.commit("SET_LOGIN", true);
            this.$store.commit('SET_LOADING', false)
            this.$vToastify.success("login succesfully", "registered"); 

            this.$router.push('/')
            
          })
            .catch(err => {
                console.log(err.response)
                console.log(err.message);
                this.$vToastify.error(err.response, "failed"); 
                this.$store.commit('SET_LOADING', false)
                
            })
        },
    }
}
</script>

<style>

</style>