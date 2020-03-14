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
    pushReading(state, data) {
      const integration = state.userIntegrations.find(
        i => i.slug === data.slug
      );
      if (_.isNil(integration.data)) {
        integration.data = [data.value];
      } else {
        integration.data.push(data.value);
      }

      state.userIntegrations = [
        ...state.userIntegrations.filter(i => i.slug !== data.slug), // <-- faceplam
        integration
      ];
    },
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
    async createReading({ commit }, data) {
      try {
        await axios.post(
          `http://localhost:3001/api/integrations/${data.userIntegrationId}/data`,
          {
            value: data.value
          },
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem('token')}`
            }
          }
        );

        commit('pushReading', { slug: data.slug, value: data.value });
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit('showError', err.response.data.message);
        }
      }
    },
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
        router.go(-1);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit('showError', err.response.data.message);
        }
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
        commit('setCurrentlyViewedUser', {
          address: response.data.address,
          ...user
        });
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit('showError', err.response.data.message);
        }
      } finally {
        commit('setLoading', false);
      }
    },
    async getIntegrations({ commit }, userId) {
      try {
        commit('setLoading', true);
        const response = await axios.get(
          `http://localhost:3001/api/users/${userId}/integrations`,
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
