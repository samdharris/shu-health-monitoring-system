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
        <h3>{{ $route.params.id }}</h3>
      </div>
      <div class="col">
        <button type="button" class="btn btn-outline-secondary appointBtn">
          Make an Appointment
        </button>
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

    <div v-if="showElement === 'patient-detail'">Patient Detail</div>
    <div
      v-for="integration in $store.state.userIntegrations"
      :key="integration.id"
      v-show="showElement === integration.slug"
    >
      <p>Device serial number: {{ integration.serial }}</p>
      <line-chart></line-chart>
    </div>

    <!-- Add "Updated just now bit down here" -->
    <footer>
      <p class="bottomText">Updated just now</p>
    </footer>
  </div>
</template>
<script>
import LineChart from './userChart';

export default {
  data() {
    return {
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
    this.$store.dispatch('getIntegrations');
  }
};
</script>
