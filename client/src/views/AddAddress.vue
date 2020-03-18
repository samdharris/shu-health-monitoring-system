<template>
  <!-- Top bit below navbar -->
  <div class="container">
    <div v-if="!$store.state.loading">
      <div>
        <div>
          <router-link :to="`/controlPage`">Return </router-link>
        </div>
        <h2>Add Address</h2>
        <form @submit.prevent="onSubmit">
          Address :
          <p>
            {{ address_line_1 }}
            <input
              v-model="address_line_1"
              placeholder="enter 1st address line"
            />
          </p>
          <p>
            {{ address_line_2 }}
            <input
              v-model="address_line_2"
              placeholder="enter 2nd address line"
            />
          </p>
          <p>
            {{ address_line_3 }}
            <input
              v-model="address_line_3"
              placeholder="enter 3th address line"
            />
          </p>
          <p>
            city:{{ city }}
            <input v-model="city" placeholder="city" />
          </p>
          <p>
            county:{{ county }}
            <input v-model="county" placeholder="county" />
          </p>
          <p>
            postcode:{{ post_code }}
            <input v-model="post_code" placeholder="postcode" />
          </p>
          <button type="submit" class="btn btn-primary" id="NewAddressButton">
            Add new address
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
      address_line_1: null,
      address_line_2: null,
      address_line_3: null,
      city: null,
      county: null,
      post_code: null
    };
  },
  methods: {
    onSubmit() {
      if (this.address_line_1 === null || this.post_code === null) {
        return;
      }

      this.$store
        .dispatch("addAddress", {
          address_line_1: this.address_line_1,
          address_line_2: this.address_line_2,
          address_line_3: this.address_line_3,
          city: this.city,
          county: this.county,
          post_code: this.post_code
        })
        .then(() => {
          this.address_line_1 = "";
          this.address_line_2 = "";
          this.address_line_3 = "";
          this.city = "";
          this.county = "";
          this.post_code = "";
        });
    }
  }
};
</script>
