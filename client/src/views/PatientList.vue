<style scoped></style>

<template>
  <div class="container">
    <div v-if="!$store.state.loading">
      <h1>List of patients for Doctor</h1>
      <h3>{{ $store.state.userToView.name }}</h3>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th v-for="(column, index) in columns" :key="index">
                {{ column }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in $store.state.patients" :key="index">
              <td v-for="(column, indexColumn) in columns" :key="indexColumn">
                <router-link :to="`/patients/${item.id}`"
                  >{{ item[column] }}
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      /**
       * Contains the columns being used to display the user list
       */
      columns: ['name', 'phone_number', 'email_address']
    };
  },

  mounted() {
    this.$store.dispatch('getUser', this.$route.params.id).then(() => {
      this.$store.dispatch('getDocPatients', this.$route.params.id);
    });
  }
};
</script>
