<style scoped>
h1,
h2 {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}

h2 {
  margin-bottom: 30px;
}

.spinner {
  padding: 20px;
}

.arrowLeftIcon {
  float: left;
  cursor: pointer;
  font-size: 30px;
}

.bluetoothIcon {
  float: right;
  font-size: 30px;
}
</style>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <font-awesome-icon icon="arrow-left" class="arrowLeftIcon" @click="$router.go(-1)" />
        <router-view />
      </div>
      <div class="col">
        <font-awesome-icon class="bluetoothIcon" :icon="['fab', 'bluetooth']" />
      </div>
    </div>

    <h1>Connecting To:</h1>

    <h2>"Janet's FitBit"</h2>
    <div class="d-flex justify-content-center">
      <spinner class="spinner"></spinner>
      <spinner class="spinner"></spinner>
      <spinner class="spinner"></spinner>
    </div>
  </div>
</template>

<script>
import Spinner from "vue-simple-spinner";

export default {
  components: { Spinner }
};
</script>
