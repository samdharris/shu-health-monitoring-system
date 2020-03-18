<template>
  <!-- Top bit below navbar -->
  <div class="container">
    <div v-if="!$store.state.loading">
      <div>
        <div>
          <router-link :to="`/controlPage`">Return </router-link>
        </div>
        <h2>Assign Patient's doctor</h2>
        <form @submit.prevent="onSubmit">
          <p>
            Patient:
            <select id="PatientChooser" v-model="user_id" autocomplete="off">
              <option disabled value="">Choose a Patient</option>
              <option
                v-for="item in $store.state.patients"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
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
          <button type="submit" class="btn btn-primary" id="AssignDoctorButton">
            Assign Doctor
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
      user_id: null,
      doctor_id: null
    };
  },
  mounted() {
    this.$store.dispatch("getDoctors").then(() => {
      this.$store.dispatch("getAllPatients");
    });
  },
  methods: {
    onSubmit() {
      if (this.user_id === null || this.doctor_id === null) {
        return;
      }
      this.$store
        .dispatch("assignDoctor", {
          user_id: this.user_id,
          doctor_id: this.doctor_id
        })
        .then(() => {
          this.user_id = "";
          this.doctor_id = "";
        });
    }
  }
};
</script>
