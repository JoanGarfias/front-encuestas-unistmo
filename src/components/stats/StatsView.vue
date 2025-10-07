<script setup lang="js">
import BarChart from "./charts/BarChart.vue"
import PieChart from "./charts/PieChart.vue"


import { useCheckAnswerStore } from "@/stores/checkAnsStore"

const { isAnswered } = useCheckAnswerStore()

const defaultColors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#C9CBCF",
]

const barData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Bar",
      backgroundColor: defaultColors,
      data: [0, 10, 5, 2, 23, 7, 12],
    },
  ],
}

const pieData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Pie",
      backgroundColor: defaultColors,
      data: [0, 10, 5, 2, 23, 7, 12],
    },
  ],
}

const BarChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
}

const PieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
    },
  },
}
</script>




<template>

  <!--MODAL DE CONTRASEÑA-->
  <PasswordModal v-if="!isAnswered"/>

  <!-- VISTA DE ESTADÍSTICAS-->
  <div
  class="flex flex-col gap-8 mx-auto max-w-7xl"
  v-else
  >
    <div class="flex flex-col items-center gap-2">
      <h1
        class="text-3xl text-center font-bold leading-tight md:text-5xl text-primary"
      >
        Análisis Estadístico
      </h1>
      <p class="text-center text-md text-muted-foreground">
        Datos recopilados de los estudiantes universitarios
      </p>
    </div>

    <!-- Contenedor de los graficos -->
    <div class="grid md:grid-cols-2 gap-8">
      <BarChart
        title="Bar Chart"
        :chartData="barData"
        :chartOptions="BarChartOptions"
      />
      <PieChart
        title="Pie Chart"
        :chartData="pieData"
        :chartOptions="PieChartOptions"
      />
    </div>
  </div>
</template>
