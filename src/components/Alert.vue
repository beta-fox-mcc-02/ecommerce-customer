<template>
  <div>
    <b-alert variant="success"
      class="custom-alert"
      :show="showSuccessAlert"
      @dismissed="!showSuccessAlert">
      {{ successMessage }}
    </b-alert>
  </div>
</template>

<script>
export default {
  computed: {
    successMessage() {
      return this.$store.state.successMessage;
    },
    showSuccessAlert() {
      return this.$store.state.showSuccessAlert;
    },
  },
};
</script>

<style scoped>
  .custom-alert{
    position: fixed;
    width: 100%;
    opacity: .9;
    z-index: 999;
  }
</style>
