<template>
  <!-- Top bit below navbar -->
  <div class="container">
    <div v-if="!$store.state.loading">
      <h1>Admin Control Panel</h1>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: null,
      phone_number: null,
      email_address: null,
      account_type: null,
      password: null,
      doctor_id: null,
      address_id: null
    };
  },
  mounted() {
    this.$store.dispatch("getDoctors").then(() => {
      this.$store.dispatch("getAddresses").then(() => {
        this.$store.dispatch("getAllPatients");
      });
    });
  }
};
</script>
