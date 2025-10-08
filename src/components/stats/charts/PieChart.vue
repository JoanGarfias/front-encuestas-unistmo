<template>
  <div class="w-full h-full">
    <Card class="h-full">
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
      </CardHeader>
      <CardContent class="h-[300px] min-h-[300px] w-full">
        <div class="relative w-full h-full">
          <Pie
            :data="chartDataWithColors"
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
import { computed, onMounted, ref, onUnmounted } from 'vue'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  title: String,
  chartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    default: () => ({}),
  },
})

const isDarkMode = ref(false)

// Colores para el modo oscuro - más oscuros y menos saturados
const darkColors = [
  'rgba(100, 149, 237, 0.7)',  // Azul apagado
  'rgba(70, 180, 170, 0.7)',   // Verde agua oscuro
  'rgba(220, 150, 150, 0.7)',  // Rosa apagado
  'rgba(130, 170, 220, 0.7)',  // Azul grisáceo
  'rgba(160, 190, 220, 0.7)',  // Azul muy claro oscuro
  'rgba(220, 180, 150, 0.7)',  // Melocotón apagado
  'rgba(190, 170, 220, 0.7)'   // Lila apagado
]

// Colores para el modo claro
const lightColors = [
  'rgba(100, 149, 237, 0.8)', // Azul cielo
  'rgba(144, 238, 144, 0.8)', // Verde claro
  'rgba(255, 182, 193, 0.8)', // Rosa claro
  'rgba(147, 112, 219, 0.8)', // Púrpura medio
  'rgba(255, 218, 185, 0.8)', // Melocotón claro
  'rgba(152, 251, 152, 0.8)', // Verde pálido
  'rgba(221, 160, 221, 0.8)'  // Ciruela
]

// Dark mode chart options
const darkModeOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: '#94a3b8',
        font: {
          size: 12
        },
        padding: 20,
        boxWidth: 10,
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#e2e8f0',
      bodyColor: '#e2e8f0',
      borderColor: '#334155',
      borderWidth: 1,
      padding: 10,
      cornerRadius: 6,
      displayColors: true,
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      callbacks: {
        label: function(context) {
          const label = context.label || ''
          const value = context.raw || 0
          const total = context.dataset.data.reduce((a, b) => a + b, 0)
          const percentage = Math.round((value / total) * 100)
          return `${label}: ${value} (${percentage}%)`
        }
      }
    }
  },
  elements: {
    arc: {
      borderWidth: 0,
      hoverOffset: 8,
      borderRadius: 4
    }
  },
  layout: {
    padding: 10
  }
}

// Light mode chart options
const lightModeOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: '#1e293b',
        font: {
          size: 12
        },
        padding: 20,
        boxWidth: 10,
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
    tooltip: {
      backgroundColor: '#ffffff',
      titleColor: '#1e293b',
      bodyColor: '#1e293b',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      padding: 10,
      cornerRadius: 6,
      displayColors: true,
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      callbacks: {
        label: function(context) {
          const label = context.label || ''
          const value = context.raw || 0
          const total = context.dataset.data.reduce((a, b) => a + b, 0)
          const percentage = Math.round((value / total) * 100)
          return `${label}: ${value} (${percentage}%)`
        }
      }
    }
  },
  elements: {
    arc: {
      borderWidth: 0,
      hoverOffset: 8,
      borderRadius: 4
    }
  },
  layout: {
    padding: 10
  }
}

// Aplicar colores a los datos del gráfico
const chartDataWithColors = computed(() => {
  const colors = isDarkMode.value ? darkColors : lightColors

  return {
    ...props.chartData,
    datasets: props.chartData.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || colors,
      borderColor: isDarkMode.value
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.05)',
      hoverBackgroundColor: undefined,
      hoverBorderColor: undefined
    }))
  }
})

// Merge options based on current theme
const chartOptions = computed(() => {
  const baseOptions = isDarkMode.value ? darkModeOptions : lightModeOptions

  return {
    ...baseOptions,
    ...props.chartOptions,
    plugins: {
      ...baseOptions.plugins,
      ...(props.chartOptions.plugins || {})
    },
    elements: {
      ...baseOptions.elements,
      ...(props.chartOptions.elements || {})
    }
  }
})

// Watch for dark mode changes
const checkDarkMode = () => {
  isDarkMode.value = document.documentElement.classList.contains('dark')
}

onMounted(() => {
  checkDarkMode()
  // Create a MutationObserver to watch for dark mode changes
  const observer = new MutationObserver(checkDarkMode)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })

  // Cleanup
  onUnmounted(() => observer.disconnect())
})
</script>
