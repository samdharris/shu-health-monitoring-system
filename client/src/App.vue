<style scoped>
.navbar {
  background-color: #fff;
}
</style>

<template>
  <div>
    <nav class="navbar">
      <a class="navbar-brand"><i class="fas fa-cog"></i></a>
    </nav>
    <font-awesome-icon icon="cog" />
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
