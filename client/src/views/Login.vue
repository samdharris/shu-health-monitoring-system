<template>
  <div class="container">
    <div class="row">
      <div class="col-12"><h1>Login</h1></div>
    </div>
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <form @submit.prevent="onSubmit">
          <div v-if="$store.state.error" class="alert alert-danger">
            {{ $store.state.error }}
          </div>
          <div class="form-group">
            <input
              type="email"
              v-model="email"
              class="form-control"
              id="emailInput"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="passwordInput"
              placeholder="Password"
            />
          </div>
          <button type="submit" class="btn btn-primary" id="loginButton">
            Submit
          </button>
        </form>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return { email: '', password: '' };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.email = '';
          this.password = '';
        });
    }
  }
};
</script>
