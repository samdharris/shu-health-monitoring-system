import { Line } from "vue-chartjs";
// import the component - chart you need

export default {
  extends: Line,
  props: ["chartdata", "options"],
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
