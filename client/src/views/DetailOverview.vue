<style scoped>
.appointBtn {
  width: 60%;
}

.patientButtons {
  display: flex;
  justify-content: center;
}

.patientBtn {
  width: 32%;
  margin-left: 2px;
  margin-right: 2px;
  color: #000;
}
</style>

<template>
  <!-- Top bit below navbar -->
  <div class="container">
    <div class="row">
      <div class="col">
        <h3>{{ $route.params.id }}</h3>
      </div>
      <div class="col">
        <button type="button" class="btn btn-outline-secondary appointBtn">Make an Appointment</button>
      </div>
    </div>

    <hr />

    <!-- Patient Buttons -->
    <div>
      <div class="row">
        <div class="col patientButtons">
          <button type="button" class="btn btn-outline-info patientBtn">Patient Details</button>
          <button type="button" class="btn btn-outline-info patientBtn">Fitbit Data</button>
          <button type="button" class="btn btn-outline-info patientBtn">Glucose Metre</button>
        </div>
      </div>
    </div>

    <!-- Add graph thing below this -->

    <!-- Add "Updated just now bit down here" -->
  </div>
</template>
