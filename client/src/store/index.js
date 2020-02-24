import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router"

Vue.use(Vuex);

export default new Vuex.Store({
  state: { loggedInUser: {} },
  mutations: { login(state, user){
      state.loggedInUser = {...user}
  } },
  actions: { async login({commit}, loginDetails){
      try{
        const response = await axios.post('http://localhost:3001/login', loginDetails);
        commit("login", response.data.user);
        localStorage.setItem("token", response.data.accessToken);
        router.push("/");
      } catch(err) {
        console.log(err);
      }
  } },
  modules: {}
});
