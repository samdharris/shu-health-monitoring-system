<style scoped>
.arrowLeftIcon {
  float: left;
  cursor: pointer;
  font-size: 30px;
}

h1 {
  margin-bottom: 30px;
}

ul {
  margin-top: 30px;
}

ul > li {
  font-size: 25px;
  margin-top: 10px;
}
</style>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <font-awesome-icon
          icon="arrow-left"
          class="arrowLeftIcon"
          @click="$router.go(-1)"
        />
        <router-view />
        <h1>Features</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <ul>
          <li>Manually enter information about your health</li>
          <li>Get alerts when your data indicates an issue</li>
          <li>Easily integrate new devices such as FitBits</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
