import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
import moment from "moment";
import _ from "lodash";
// import { addUser } from "../../../server/src/services/databaseService";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedInUser: {},
    error: "",
    settings: {},
    loading: false,
    userIntegrations: [],
    userToView: {},
    initialBoot: true,
    showLowLevelWarning: false,
    currentlyViewedIntegrationData: []
  },
  mutations: {
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

      if (parseFloat(data.value.value) <= 4) {
        state.showLowLevelWarning = true;
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
    setDocPatients(state, patients) {
      state.patients = [...patients];
    },
    setCurrentlyViewedUser(state, user) {
      state.userToView = { ...user };
    },
    setInitialBoot(state, initialBoot) {
      state.initialBoot = initialBoot;
    },
    setCurrentlyViewedIntegrationData(state, data) {
      state.currentlyViewedIntegrationData = [...data];
    },
    setshowLowLevelWarning(state, shouldShow) {
      state.showLowLevelWarning = shouldShow;
    },
    setDoctors(state, doctors) {
      state.doctors = doctors;
    },
    setAddresses(state, addresses) {
      state.addresses = addresses;
    },
    setAllPatients(state, patients) {
      state.patients = patients;
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
              Authorization: `bearer ${localStorage.getItem("token")}`
            }
          }
        );

        commit("pushReading", { slug: data.slug, value: data.value });
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit("showError", err.response.data.message);
        }
      }
    },
    async makeAppointment({ commit }, appointment) {
      try {
        await axios.post(
          "http://localhost:3001/api/appointments",
          appointment,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`
            }
          }
        );
        router.go(-1);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit("showError", err.response.data.message);
        }
      }
    },
    applySettings({ commit, state }, settings) {
      localStorage.setItem("settings", JSON.stringify(settings));
      commit("applySettings", settings);

      if (!state.initialBoot) {
        router.go(-1);
      }
      commit("setInitialBoot", false);
    },
    async login({ commit }, loginDetails) {
      try {
        const response = await axios.post(
          "http://localhost:3001/login",
          loginDetails
        );
        commit("login", response.data.user);
        localStorage.setItem("token", response.data.accessToken);
        router.push(`/patients/${response.data.user.id}`);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit("showError", err.response.data.message);
        }
      }
    },
    async getUser({ commit }, userId) {
      try {
        commit("setLoading", true);
        const response = await axios.get(
          `http://localhost:3001/api/users/${userId}`,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`
            }
          }
        );

        const user = {
          ...response.data.user,
          updated_at: moment(response.data.user.updated_at).fromNow()
        };
        commit("setCurrentlyViewedUser", {
          address: response.data.address,
          ...user
        });
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit("showError", err.response.data.message);
        }
      } finally {
        commit("setLoading", false);
      }
    },
    async getIntegrations({ commit }, userId) {
      try {
        commit("setLoading", true);
        const response = await axios.get(
          `http://localhost:3001/api/users/${userId}/integrations`,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`
            }
          }
        );

        const integrations = response.data.integrations.map(integration => {
          return {
            ...integration,
            slug: integration.name.replace(/ /gi, "-").toLowerCase()
          };
        });
        commit("setUserIntegrations", integrations);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit("showError", err.response.data.message);
        }
      } finally {
        commit("setLoading", false);
      }
    },
    async getDocPatients({ commit }, userId) {
      try {
        commit("setLoading", true);
        const response = await axios.get(
          `http://localhost:3001/api/patients/${userId}`,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`
            }
          }
        );
        const patients = response.data.Patients;
        commit("setDocPatients", patients);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit("showError", err.response.data.message);
        }
      } finally {
        commit("setLoading", false);
      }
    },
    async getDataForIntegration({ commit }, userIntegrationId) {
      commit("setLoading", true);
      try {
        const response = await axios.get(
          `http://localhost:3001/api/userintegrations/${userIntegrationId}`
        );
        commit(
          "setCurrentlyViewedIntegrationData",
          response.data.integrationData.map(d => {
            return {
              ...d,
              created_at: moment(d.created_at).format(
                "dddd, MMMM Do YYYY, h:mm a"
              )
            };
          })
        );
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit("showError", err.response.data.message);
        }
      } finally {
        commit("setLoading", false);
      }
    },
    async updateReading({ commit }, { id, value }) {
      try {
        await axios.put(
          `http://localhost:3001/api/integrations/${id}/data`,
          {
            value
          },
          {
            Authorization: `bearer ${localStorage.getItem("token")}`
          }
        );

        router.go(-1);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit("showError", err.response.data.message);
        }
      }
    },
    async getDoctors({ commit }) {
      try {
        commit("setLoading", true);
        const response = await axios.get(`http://localhost:3001/api/doctors`, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`
          }
        });
        const doctors = response.data.Doctors;
        commit("setDoctors", doctors);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit("showError", err.response.data.message);
        }
      } finally {
        commit("setLoading", false);
      }
    },
    async getAddresses({ commit }) {
      try {
        commit("setLoading", true);
        const response = await axios.get(
          `http://localhost:3001/api/addresses`,
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`
            }
          }
        );
        const addresses = response.data.addresses;
        commit("setAddresses", addresses);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit("showError", err.response.data.message);
        }
      } finally {
        commit("setLoading", false);
      }
    },
    async getAllPatients({ commit }) {
      try {
        commit("setLoading", true);
        const response = await axios.get(`http://localhost:3001/api/patients`, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`
          }
        });
        const patients = response.data.Patients;
        commit("setAllPatients", patients);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit("showError", err.response.data.message);
        }
      } finally {
        commit("setLoading", false);
      }
    },
    async addAddress({ commit }, address) {
      try {
        await axios.post("http://localhost:3001/api/addresses", address, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`
          }
        });
        router.go(-1);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit("showError", err.response.data.message);
        }
      }
    },
    async addUser({ commit }, user) {
      try {
        await axios.post("http://localhost:3001/api/users", user, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`
          }
        });
        router.go(-1);
      } catch (err) {
        if (!_.isNil(err.response.data)) {
          commit("showError", err.response.data.message);
        }
      }
    }
  },
  modules: {}
});
