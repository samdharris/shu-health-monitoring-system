import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      required: false,
      default: () => {}
    },
    options: {
      required: false,
      default: () => {}
    }
  },
  mounted() {
    console.log(this.chartData);
    this.renderChart(this.chartData, this.options);
  }
};
