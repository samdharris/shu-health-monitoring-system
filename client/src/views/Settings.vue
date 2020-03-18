<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <div class="row align-items-baseline">
        <div class="col-4 d-flex align-items-end">
          <label> Font Size </label>
        </div>
        <div class="col-8">
          <VueSlideBar
            v-model="value2"
            :data="slider.data"
            :min="16"
            :max="32"
            :processStyle="slider.processStyle"
            :lineHeight="slider.lineHeight"
            :tooltipStyles="{ backgroundColor: 'red', borderColor: 'red' }"
          >
          </VueSlideBar>
        </div>
      </div>
      <div class="row align-items-baseline">
        <div class="col-6 d-flex align-items-end">
          <label> Invert Colours </label>
        </div>
        <div class="col-3 align-items-start">
          <toggle-button
            :value="false"
            color="#82C7EB"
            :sync="true"
            :labels="true"
            v-model="inverColourVal"
          />
        </div>
        <div class="col-3"></div>
      </div>
      <button type="submit" class="btn btn-primary">Apply</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    /**
     * Configurations
     */
    return {
      inverColourVal: false,
      value2: 30,
      slider: {
        lineHeight: 10,
        processStyle: {
          backgroundColor: 'red'
        },
        data: []
      }
    };
  },
  methods: {
    /**
     * Handles form submission
     */
    onSubmit() {
      this.$store.dispatch('applySettings', {
        textSize: this.value2,
        inverted: this.inverColourVal
      });
    }
  },
  /**
   * When the component is created, populate the slider with values and set values based on any currently applied settings
   */
  created() {
    for (let i = 16; i <= 32; i += 2) {
      this.slider.data.push(i);
    }
    let settings = JSON.parse(localStorage.getItem('settings')) || {};
    this.inverColourVal = settings.inverted ? settings.inverted : false;
    this.value2 = settings.textSize ? settings.textSize : 16;
  }
};
</script>
