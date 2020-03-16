import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartdata: {
      required: false,
      default: {}
    },
    options: {
      required: false,
      default: {}
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
