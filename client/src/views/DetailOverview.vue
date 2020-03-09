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
          @click="$router.push('/settings')"
        />
        <router-view />
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
      >
        <input type="radio" name="options" id="option1" autocomplete="off" />
        Patient Details
      </label>
      <label
        @click="toggle('fitbit-data')"
        :class="{
          'btn btn-outline-info patientBtn': true,
          active: showElement === 'fitbit-data'
        }"
      >
        <input type="radio" name="options" id="option2" autocomplete="off" />
        Fitbit Data
      </label>
      <label
        :class="{
          'btn btn-outline-info patientBtn': true,
          active: showElement === 'glucose-metre'
        }"
        @click="toggle('glucose-metre')"
      >
        <input
          type="radio"
          name="options"
          id="option3"
          autocomplete="off"
          checked
        />
        Glucose Metre
      </label>
    </div>

    <div v-if="showElement === 'patient-detail'">Patient Details</div>
    <div v-if="showElement === 'fitbit-data'">
      <line-chart :height="250"></line-chart>
    </div>
    <div v-if="showElement === 'glucose-metre'">
      <line-chart :height="250"></line-chart>
    </div>

    <!-- Add "Updated just now bit down here" -->
    <footer>
      <p class="bottomText">Updated just now</p>
    </footer>
  </div>
</template>
<script>
import LineChart from "./userChart";

export default {
  data() {
    return {
      showElement: "patient-detail"
    };
  },
  components: {
    LineChart
  },
  methods: {
    toggle(elementToShow) {
      this.showElement = elementToShow;
    }
  }
};
</script>
