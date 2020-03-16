import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';
import moment from 'moment';
import _ from 'lodash';
Vue.use(Vuex);

/**
 * The Vuex Store
 */
export default new Vuex.Store({
  state: {
    /**
     * Contains the currently logged in user
     * @type {Object}
     */
    loggedInUser: {},
    /**
     * Holds any error messages
     * @type {String}
     */
    error: '',
    /**
     * Contains application settings
     * @type {Object}
     */
    settings: {},
    /**
     * Flag that indicates if we're loading data from the server
     * @type {Boolean}
     */
    loading: false,
    /**
     * Contains all integrations for the currently viewed user
     * @type {Array<Object>}
     */
    userIntegrations: [],
    /**
     * Contains the currently viewed user
     * @type {Object}
     */
    userToView: {},
    /**
     * Flag that indicates if we're on the initial boot of the application
     * @type {Boolean}
     */
    initialBoot: true,
    /**
     * Flag that indicates if we should show the low glucose level modal
     * @type {Boolean}
     */
    showLowLevelWarning: false,
    /**
     * Contains all integration data for the given integration on the EditData screen
     * @type {Array<Object>}
     */
    currentlyViewedIntegrationData: []
  },
  mutations: {
    /**
     * Adds the newly generated reading to the array of existing readings
     * @param {Object} state
     * @param {Object} data
     */
    pushReading(state, data) {
      const integration = state.userIntegrations.find(
        i => i.slug === data.slug
      );
      if (_.isNil(integration.data)) {
        integration.data = [
          { ...data.value, value: parseFloat(data.value.value) }
        ];
      } else {
        integration.data.push({
          ...data.value,
          value: parseFloat(data.value.value)
        });
      }

      /**
       * If the generated value is lower than or equal to 4, show the low glucose level warning sign
       */
      if (parseFloat(data.value.value) <= 4) {
        state.showLowLevelWarning = true;
      }

      state.userIntegrations = [
        ...state.userIntegrations.filter(i => i.slug !== data.slug),
        integration
      ];
    },
    /**
     * Sets the loading flag
     * @param {Object} state
     * @param {Boolean} loading
     */
    setLoading(state, loading) {
      state.loading = loading;
    },
    /**
     * Sets the loggedInUser variable to indicate that we're authenticated
     * @param {Object} state
     * @param {Object} user
     */
    login(state, user) {
      state.loggedInUser = { ...user };
    },
    /**
     * Sets the error message for displaying to the user
     * @param {Object} state
     * @param {String} error
     */
    showError(state, error) {
      state.error = error;
    },
    /**
     * Applies any setting changes to the app.
     * @param {Object} state
     * @param {Object} settings
     */
    applySettings(state, settings) {
      state.settings = { ...settings };
    },
    /**
     * Sets the integrations for the currently viewed user
     * @param {Object} state
     * @param {Array<Object>} integrations
     */
    setUserIntegrations(state, integrations) {
      state.userIntegrations = [...integrations];
    },
    /**
     * Sets the list of patients for viewing
     * @param {Object} state
     * @param {Array<Object>} patients
     */
    setDocPatients(state, patients) {
      state.patients = [...patients];
    },
    /**
     * Holds the currently viewed patient
     * @param {Object} state
     * @param {Object} user
     */
    setCurrentlyViewedUser(state, user) {
      state.userToView = { ...user };
    },
    /**
     * Sets the initial boot flag
     * @param {Object} state
     * @param {Boolean} initialBoot
     */
    setInitialBoot(state, initialBoot) {
      state.initialBoot = initialBoot;
    },
    /**
     * Sets the integration data for editting
     *
     * @param {Object} state
     * @param {Array<Object>} data
     */
    setCurrentlyViewedIntegrationData(state, data) {
      state.currentlyViewedIntegrationData = [...data];
    },
    /**
     * Sets theshow low level warning flag
     * @param {Object} state
     * @param {Boolean} initialBoot
     */
    setshowLowLevelWarning(state, shouldShow) {
      state.showLowLevelWarning = shouldShow;
    }
  },
  actions: {
    /**
     * Takes the created value, sends it to the server and triggers a mutation to add the newly created reading to the
     * state of pre-existing readings for the given integration
     * @param {Object} param0
     * @param {Object} data
     */
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
    /**
     * Takes the given appointment, sends it to the server to be recorded
     * @param {Object} param0
     * @param {Object} appointment
     */
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
    /**
     * Takes the settings and applies them to the system. Writing them to local storage so they last forever
     * @param {*} param0
     * @param {*} settings
     */
    applySettings({ commit, state }, settings) {
      localStorage.setItem('settings', JSON.stringify(settings));
      commit('applySettings', settings);

      /**
       * Prevents a navigation bug from occurring where upon refreshing the page, it'd navigate you back to the home page
       * Rather than leave you where you wanted to be.
       */
      if (!state.initialBoot) {
        router.go(-1);
      }
      commit('setInitialBoot', false);
    },
    /**
     * Performs logging in the user. Fires a request to the server for authentication and triggers a mutation and stores
     * the jwt token in local storage
     * @param {Object} param0
     * @param {Object} loginDetails
     */
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
    /**
     * Performs a request to the server to get the given user and firing a mutation to update state
     * @param {Object} param0
     * @param {Number} userId
     */
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
    /**
     * Performs a request to the server to get all integrations for the given user and then fires a mutation to update
     * state
     * @param {Object} param0
     * @param {Number} userId
     */
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
    },
    /**
     * Performs a request to the server to get all patients for the given user and then fires a mutation to update
     * state
     * @param {Object} param0
     * @param {Number} userId
     */
    async getDocPatients({ commit }, userId) {
      try {
        commit('setLoading', true);
        const response = await axios.get(
          `http://localhost:3001/api/patients/${userId}`,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem('token')}`
            }
          }
        );
        const patients = response.data.Patients;
        commit('setDocPatients', patients);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit('showError', err.response.data.message);
        }
      } finally {
        commit('setLoading', false);
      }
    },
    /**
     * Performs a request to the server to get all data for a given integration and then fires a mutation to update
     * state
     * @param {Object} param0
     * @param {Number} userId
     */
    async getDataForIntegration({ commit }, userIntegrationId) {
      commit('setLoading', true);
      try {
        const response = await axios.get(
          `http://localhost:3001/api/userintegrations/${userIntegrationId}`
        );
        commit(
          'setCurrentlyViewedIntegrationData',
          response.data.integrationData.map(d => {
            return {
              ...d,
              created_at: moment(d.created_at).format(
                'dddd, MMMM Do YYYY, h:mm a'
              )
            };
          })
        );
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit('showError', err.response.data.message);
        }
      } finally {
        commit('setLoading', false);
      }
    },
    /**
     * Performs a request to the server to update the given reading and then fires a mutation to update
     * state
     * @param {Object} param0
     * @param {Number} userId
     */
    async updateReading({ commit }, { id, value }) {
      try {
        await axios.put(
          `http://localhost:3001/api/integrations/${id}/data`,
          {
            value
          },
          {
            Authorization: `bearer ${localStorage.getItem('token')}`
          }
        );

        router.go(-1);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit('showError', err.response.data.message);
        }
      }
    }
  },
  modules: {}
});
