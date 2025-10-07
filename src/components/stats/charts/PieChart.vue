<template>
  <div class="w-full h-full">
    <Card class="h-full">
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
      </CardHeader>
      <CardContent class="h-[300px] min-h-[300px] w-full">
        <div class="relative w-full h-full">
          <Pie
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
import { Pie } from "vue-chartjs"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

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
