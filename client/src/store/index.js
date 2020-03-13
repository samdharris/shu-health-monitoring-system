import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';
import moment from 'moment';
import _ from 'lodash';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedInUser: {},
    error: '',
    settings: {},
    loading: false,
    userIntegrations: [],
    userToView: {}
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    login(state, user) {
      state.loggedInUser = { ...user };
    },
    showError(state, error) {
      state.error = error;
    },
    applySettings(state, settings) {
      state.settings = { ...settings };
    },
    setUserIntegrations(state, integrations) {
      state.userIntegrations = [...integrations];
    },
    setCurrentlyViewedUser(state, user) {
      state.userToView = { ...user };
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
        router.push(`/patients/${response.data.user.id}`);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit('showError', err.response.data.message);
        }
      }
    },
    async getUser({ commit }, userId) {
      try {
        commit('setLoading', true);
        const response = await axios.get(
          `http://localhost:3001/api/users/${userId}`,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem('token')}`
            }
          }
        );

        const user = {
          ...response.data.user,
          updated_at: moment(response.data.user.updated_at).fromNow()
        };
        commit('setCurrentlyViewedUser', user);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit('showError', err.response.data.message);
        }
      } finally {
        commit('setLoading', false);
      }
    },
    async getIntegrations({ commit }) {
      try {
        commit('setLoading', true);
        const response = await axios.get(
          'http://localhost:3001/api/integrations',
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem('token')}`
            }
          }
        );

        const integrations = response.data.integrations.map(integration => {
          return {
            ...integration,
            slug: integration.name.replace(/ /gi, '-').toLowerCase()
          };
        });
        commit('setUserIntegrations', integrations);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit('showError', err.response.data.message);
        }
      } finally {
        commit('setLoading', false);
      }
    }
  },
  modules: {}
});
