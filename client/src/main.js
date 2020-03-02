import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ValidationProvider } from 'vee-validate';
import VueSlideBar from 'vue-slide-bar';
import { ToggleButton } from 'vue-js-toggle-button';


Vue.config.productionTip = false;
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('VueSlideBar', VueSlideBar);
Vue.component('ToggleButton', ToggleButton);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
