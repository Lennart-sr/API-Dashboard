import Chart from "chart.js";
import { mapState } from "vuex";

const months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]

export default {
  data(){
    return {
      cChart: {}
    }
  },
  computed: {
    cData(){
      const sortedMonths = this.api.requests.sort(
        (a, b) => months.findIndex(m => m == a.month) > months.findIndex(m => m == b.month)
      )
      const date = new Date()

      const requests = sortedMonths.map(m => m.requests)
      const errors = sortedMonths.map(m => m.errors)
      const month = sortedMonths.map(m => m.month)
      const thisMonth = this.api.requests.filter(r => r.month == months[date.getMonth()] )[0]

      const entire = {
        requests: 0,
        errors: 0
      }

      requests.forEach(r => entire.requests += r)
      errors.forEach(r => entire.errors += r)

      return {
        requests,
        errors,
        month,
        thisMonth,
        entire
      }
    },
    ...mapState(['api'])
  },
  methods: {
    Chart() {
      this.cChart = new Chart(document.getElementById("graph").getContext("2d"), {
        type: "line",
        data: {
          labels: this.cData.month,
          datasets: [
            {
              backgroundColor: "rgba(255, 255, 255, 0)",
              borderColor: "rgb(255, 108, 51)",
              data: this.cData.requests,
            },
            {
              backgroundColor: "rgba(255, 255, 255, 0)",
              borderColor: "rgb(108, 108, 108)",
              data: this.cData.errors,
            },
          ],
        },

        options: {
          tooltips: {
            mode: "point",
          },
          legend: {
            display: false,
          },
        },
      });
    }
  },
  watch: {
    cData(){
      // requests
      this.cChart.data.datasets[0].data = this.cData.requests
      // errors
      this.cChart.data.datasets[1].data = this.cData.errors

      this.cChart.update();
    }
  }
}