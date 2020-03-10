import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

import _ from 'lodash';
Vue.use(Vuex);

export default new Vuex.Store({
  state: { loggedInUser: {}, error: '', settings: {} },
  mutations: {
    login(state, user) {
      state.loggedInUser = { ...user };
    },
    showError(state, error) {
      state.error = error;
    },
    applySettings(state, settings) {
      state.settings = { ...settings };
    }
  },
  actions: {
    async makeAppointment({ commit }, appointment) {
      try {
        await axios.post(
          'http://localhost:3001/api/appointments',
          appointment,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem('token')}`
            }
          }
        );
        // go back
        router.go(-1);
      } catch (error) {
        commit('showError', error.response.data.message);
      }
    },
    applySettings({ commit }, settings) {
      localStorage.setItem('settings', JSON.stringify(settings));
      commit('applySettings', settings);
    },
    async login({ commit }, loginDetails) {
      try {
        const response = await axios.post(
          'http://localhost:3001/login',
          loginDetails
        );
        commit('login', response.data.user);
        localStorage.setItem('token', response.data.accessToken);
        router.push('/');
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit('showError', err.response.data.message);
        }
      }
    }
  },
  modules: {}
});
