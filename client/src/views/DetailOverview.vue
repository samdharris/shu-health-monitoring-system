<style scoped>
.appointBtn {
  min-width: 60%;
  float: right;
  color: #000;
}

.patientButtons {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0px 0px;
}

.patientBtn {
  width: 34%;
  margin-left: 2px;
  margin-right: 2px;
  color: #000;
  font-size: 15px;
  display: flex;
  justify-content: center;
}

.btn-group {
  width: 100%;
  margin-bottom: 20px;
}

.bottomText {
  float: right;
}
</style>

<template>
  <!-- Top bit below navbar -->
  <div class="container">
    <div v-if="!$store.state.loading">
      <div class="row">
        <div class="col">
          <h3>{{ $store.state.userToView.name }}</h3>
        </div>
        <div class="col">
          <router-link
            to="/makeappointment"
            class="btn btn-outline-secondary appointBtn"
          >
            Make an Appointment
          </router-link>
        </div>
      </div>
      <hr />

      <!-- Patient Buttons -->
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label
          :class="{
            'btn btn-outline-info patientBtn': true,
            active: showElement === 'patient-detail'
          }"
          @click="toggle('patient-detail')"
          >Patient Details</label
        >
        <label
          v-for="integration in $store.state.userIntegrations"
          :key="integration.id"
          :class="{
            'btn btn-outline-info patientBtn': true,
            active: showElement === integration.slug
          }"
          @click="toggle(integration.slug)"
        >
          <input
            type="radio"
            name="options"
            :id="`option-${integration.slug}`"
            autocomplete="off"
          />
          {{ integration.name }}
        </label>
      </div>

      <div v-if="showElement === 'patient-detail'">
        <p>
          <strong>Name:</strong>
          {{ $store.state.userToView.name }}
        </p>
        <p>
          <strong>Email Address:</strong>
          <a :href="`mailto:${$store.state.userToView.email_address}`">
            {{ $store.state.userToView.email_address }}
          </a>
        </p>
        <p>
          <strong>Phone Number:</strong>
          <a :href="`tel:${$store.state.userToView.phone_number}`">
            {{ $store.state.userToView.phone_number }}
          </a>
        </p>

        <div v-if="$store.state.userToView.address">
          <strong>Address</strong>
          <address>
            {{ $store.state.userToView.address.address_line_1 }}
            {{ $store.state.userToView.address.address_line_2 }}
            {{ $store.state.userToView.address.address_line_3 }}
            {{ $store.state.userToView.address.city }}
            {{ $store.state.userToView.address.county }}
            {{ $store.state.userToView.address.post_code }}
          </address>
        </div>

        <footer>
          <p class="bottomText">
            Updated: {{ $store.state.userToView.updated_at }}
          </p>
        </footer>
      </div>
      <div
        v-for="integration in $store.state.userIntegrations"
        :key="integration.id"
        v-show="showElement === integration.slug"
      >
        <div class="row align-items-center">
          <div class="col-6">
            <p>Device serial number: {{ integration.serial }}</p>
          </div>
          <div class="col-6">
            <router-link
              :to="`/integrations/${integration.integrationId}/edit`"
              v-if="integration.data.length > 0"
              class="btn btn-outline-secondary appointBtn"
            >
              Edit Data
            </router-link>
          </div>
        </div>
        <line-chart
          v-if="integration"
          :chart-data="generateChartData(integration.data)"
          :chart-options="chartOptions"
        ></line-chart>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
<script>
import moment from 'moment';
import LineChart from './userChart';
import _ from 'lodash';
export default {
  data() {
    return {
      /**
       * Options for the line charts
       */
      chartOptions: {},
      /**
       * The Interval object for the periodic reading creation
       */
      interval: null,
      /**
       * Contains which tab contents is currently being shown
       */
      showElement: 'patient-detail'
    };
  },
  components: {
    LineChart
  },
  methods: {
    /**
     * Sets which tab contents to show
     *
     * @param {String} elementToShow
     */
    toggle(elementToShow) {
      this.showElement = elementToShow;
    },
    /**
     * Generates the chart data object
     *
     * @param {Array<Object>} integrationData
     */
    generateChartData(integrationData) {
      return {
        labels: _.map(integrationData, d =>
          moment(d.created_at).format('dddd, MMMM Do YYYY, h:mm')
        ),
        datasets: _.map(integrationData, d => {
          return {
            label: moment(d.created_at).format('dddd, MMMM Do YYYY, h:mm'),
            data: [d.value]
          };
        })
      };
    }
  },
  mounted() {
    this.$store
      .dispatch('getUser', this.$route.params.id)
      .then(() => {
        return this.$store.dispatch('getIntegrations', this.$route.params.id);
      })
      .then(() => {
        const glucoseMetre = this.$store.state.userIntegrations.find(
          integration => integration.slug === 'glucose-metre'
        );

        /**
         * Every 2 minutes, generate a unique 2 piece value between 2 and 10
         */
        this.interval = setInterval(() => {
          let value = ((Math.random() % 10) * 10).toPrecision(3);
          do {
            value = ((Math.random() % 10) * 10).toPrecision(3);
          } while (value < 2 || value > 10);

          // Fire a vuex action to record this in the database.
          this.$store.dispatch('createReading', {
            slug: glucoseMetre.slug,
            userIntegrationId: glucoseMetre.integrationId,
            value
          });
        }, 60 * 1000 * 2);
      });
  },
  beforeDestory() {
    // We're destroying the interval before the component is destroyed to stop anything bad from happening monkaS
    clearInterval(this.interval);
  }
};
</script>
