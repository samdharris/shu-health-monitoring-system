<template>
  <div
    id="app"
    :class="{
      inverted: $store.state.settings != {}
    }"
    :style="{
      'font-size':
        $store.state.settings && $store.state.settings.textSize
          ? `${$store.state.settings.textSize}px`
          : `16px`,
      filter:
        $store.state.settings && $store.state.settings.inverted
          ? `invert(100)`
          : `invert(0)`
    }"
  >
    <div class="container">
      <div class="row">
        <div class="col-6"></div>
        <div class="col-6">
          <router-link to="/settings" class="cogIcon">
            <font-awesome-icon icon="cog" />
          </router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>
.cogIcon {
  float: right;
  margin-bottom: 10px;
  font-size: 30px;
  cursor: pointer;
}

#app {
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  filter: invert(100);
  background: #ffffff;
}
</style>
<script>
export default {
  mounted() {
    let settings = JSON.parse(localStorage.getItem('settings')) || {};
    this.$store.dispatch('applySettings', settings);
  }
};
</script>
