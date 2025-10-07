<template>
  <div class="w-full h-full">
    <Card class="h-full">
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
      </CardHeader>
      <CardContent class="h-[300px] min-h-[300px] w-full">
        <div class="relative w-full h-full">
          <Bar
            :data="chartData"
            :options="chartOptions"
            class="w-full h-full"
          />
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="js">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.defaults.elements.bar.borderRadius = 4

const props = defineProps({
  title: String,
  chartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    default: () => {},
  },
})
</script>
