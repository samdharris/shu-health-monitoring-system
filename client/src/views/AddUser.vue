<template>
  <!-- Top bit below navbar -->
  <div class="container">
    <div v-if="!$store.state.loading">
      <div>
        <h2>Add New User</h2>
        <form @submit.prevent="onSubmitNewUser">
          <p>
            Name : {{ name }}
            <input v-model="name" placeholder="enter name" />
          </p>
          <p>
            Phone number : {{ phone_number }}
            <input v-model="phone_number" placeholder="enter number" />
          </p>
          <p>
            Email Address : {{ email_address }}
            <input v-model="email_address" placeholder="enter email" />
          </p>
          <p>
            Account Type:
            <select v-model="account_type">
              <option disabled value="">Please select type</option>
              <option>Doctor</option>
              <option>Patient</option>
            </select>
          </p>
          <p>
            Password : {{ password }}
            <input v-model="password" placeholder="enter password" />
          </p>
          <p>
            Doctor:
            <select id="doctorChooser" v-model="doctor_id" autocomplete="off">
              <option disabled value="">Choose a doctor or leave blank</option>
              <option value=""></option>
              <option
                v-for="item in $store.state.doctors"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </p>
          <p>
            Address:
            <select id="addressChooser" v-model="address_id" autocomplete="off">
              <option disabled value="">Choose a address</option>
              <option
                v-for="item in $store.state.addresses"
                :key="item.id"
                :value="item.id"
              >
                {{ item.address_line_1 }}
              </option>
            </select>
          </p>
          <button type="submit" class="btn btn-primary" id="NewUserButton">
            Add new user
          </button>
        </form>
      </div>
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
