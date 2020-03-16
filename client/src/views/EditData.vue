<template>
  <div class="container">
    <div class="row" v-if="$store.state.loading">
      <div class="col">
        <p>Loading...</p>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col">
        <h1>Edit data</h1>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <select
              id="itemToEditChooser"
              v-model="selectedRecordId"
              class="form-control"
              autocomplete="off"
            >
              <option value="no">Choose a reading to edit</option>
              <option
                v-for="item in $store.state.currentlyViewedIntegrationData"
                :key="item.id"
                :value="item.id"
              >
                {{ item.created_at }}
              </option>
            </select>
          </div>
          <div
            class="form-group row"
            v-if="selectedRecordId !== 'no' && selectedRecordId != null"
          >
            <div class="col-6">
              <label for="recordedReading">Recorded Reading</label>
            </div>
            <div class="col-6">
              <input
                max="9"
                min="1"
                step="0.01"
                class="form-control"
                type="number"
                id="recordedReading"
                v-model="selectedRecordValue"
              />
            </div>
          </div>

          <input
            v-if="selectedRecordId !== 'no' && selectedRecordId != null"
            type="submit"
            value="Update reading"
            class="btn btn-primary"
          />
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { selectedRecordId: 'no', selectedRecordValue: null };
  },
  mounted() {
    this.$store.dispatch(
      'getDataForIntegration',
      this.$route.params.integrationId
    );
  },
  watch: {
    selectedRecordId: function(newValue) {
      if (newValue !== null && newValue !== 'no') {
        this.selectedRecordValue = this.$store.state.currentlyViewedIntegrationData.find(
          x => x.id === newValue
        ).value;
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.selectedRecordId === 'no' || this.selectedRecordId === null) {
        return;
      }

      this.$store.dispatch('updateReading', {
        id: this.selectedRecordId,
        value: parseFloat(this.selectedRecordValue)
      });
    }
  }
};
</script>
