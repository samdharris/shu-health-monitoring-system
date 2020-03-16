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
}

.cogIcon {
  float: right;
  margin-top: -20px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 30px;
  cursor: pointer;
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
          <font-awesome-icon
            icon="cog"
            class="cogIcon"
            onclick="location.href='#'"
          />
        </div>
      </div>
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
        <p>Device serial number: {{ integration.serial }}</p>
        <line-chart></line-chart>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
<script>
import LineChart from './userChart';

export default {
  data() {
    return {
      interval: null,
      showElement: 'patient-detail'
    };
  },
  components: {
    LineChart
  },
  methods: {
    toggle(elementToShow) {
      this.showElement = elementToShow;
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
         * Every 10 seconds, generate a unique 2 piece value between 2 and 20
         */
        this.interval = setInterval(() => {
          let value = ((Math.random() % 10) * 10).toPrecision(3);
          do {
            value = ((Math.random() % 10) * 10).toPrecision(3);
          } while (value < 2 || value > 20);

          // Fire a vuex action to record this in the database.
          this.$store.dispatch('createReading', {
            slug: glucoseMetre.slug,
            userIntegrationId: glucoseMetre.integrationId,
            value
          });
        }, 10 * 1000);
      });
  },
  beforeDestory() {
    // We're destroying the interval before the component is destroyed to stop anything bad from happening monkaS
    clearInterval(this.interval);
  }
};
</script>
