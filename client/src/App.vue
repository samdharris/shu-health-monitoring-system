 <template>
  <div id="app" :class="{
    'inverted': $store.state.settings != {}
  }"
  :style="{
    'font-size': $store.state.settings && $store.state.settings.textSize ? `${$store.state.settings.textSize}px` : `16px`, 
    'filter': $store.state.settings && $store.state.settings.inverted ? `invert(100)` : `invert(0)`
  }">
    <nav class="navbar">
      <a class="navbar-brand">
        <i class="fas fa-cog" aria-hidden="true"></i>
      </a>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  filter: invert(100);
  background: #FFFFFF;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
export default {
  mounted() {
    let settings = JSON.parse(localStorage.getItem("settings")) || {};
    this.$store.dispatch("applySettings", settings)
  }
}
</script>

