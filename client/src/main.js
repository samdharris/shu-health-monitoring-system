import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faCog,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { faBluetooth } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret);
library.add(faCog);
library.add(faArrowLeft);
library.add(faBluetooth);

Vue.component("font-awesome-icon", FontAwesomeIcon);
import { ValidationProvider } from "vee-validate";

Vue.config.productionTip = false;
Vue.component("ValidationProvider", ValidationProvider);
import VueSlideBar from "vue-slide-bar";
import { ToggleButton } from "vue-js-toggle-button";

Vue.config.productionTip = false;
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("VueSlideBar", VueSlideBar);
Vue.component("ToggleButton", ToggleButton);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
