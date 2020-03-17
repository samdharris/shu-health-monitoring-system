<template>
  <!-- Top bit below navbar -->
  <div class="container">
    <div v-if="!$store.state.loading">
      <h1>Admin Control Panel</h1>
      <h2>User List</h2>
      <table class="table">
        <tbody>
          <tr v-for="(item, index) in $store.state.patients" :key="index">
            <td>
              {{ item.name }}
              <div v-if="item.doctor_id - 1 >= 0">
                Doctor : {{ $store.state.doctors[item.doctor_id - 1].name }}
              </div>
              <div v-else>
                No assigned Doctor
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <router-link :to="`/addUser`" class="btn btn-primary"
          >Add new User
        </router-link>

        <router-link :to="`/assignDoctor`" class="btn btn-primary"
          >Assign Doctor
        </router-link>
      </div>
      <div>
        <router-link :to="`/addAddress`">Add Address </router-link>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("getDoctors").then(() => {
      this.$store.dispatch("getAddresses").then(() => {
        this.$store.dispatch("getAllPatients");
      });
    });
  }
};
</script>
