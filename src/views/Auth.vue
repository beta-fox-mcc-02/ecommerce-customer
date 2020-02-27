<template>
<main class="page registration-page">
    <br><br><br>
  <section class="clean-block clean-form dark">
    <div class="container">
      <div class="block-heading">
        <h2 class="text-info">Authentication</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec
          auctor in, mattis vitae leo.</p>
      </div>
      <RegisterForm />
      <!-- <LoginForm /> -->
    </div>
  </section>
</main>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';
import LoginForm from '@/components/LoginForm.vue';

export default {
  data() {
    return {
      page: 'login',
    };
  },
  components: {
    RegisterForm,
    // eslint-disable-next-line vue/no-unused-components
    LoginForm,
  },
};
</script>
