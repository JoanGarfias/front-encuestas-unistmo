<template>
  <div class="w-full h-full">
    <Card class="h-full">
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
      </CardHeader>
      <CardContent class="h-[300px] min-h-[300px] w-full">
        <div class="relative w-full h-full">
          <Bar
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
import { Bar } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { computed, onMounted, ref, onUnmounted } from 'vue'

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
    default: () => ({}),
  },
})

const isDarkMode = ref(false)

// Colores para el modo oscuro - más oscuros y menos saturados
const darkColors = [
  'rgba(90, 150, 210, 0.7)',   // Azul apagado
  'rgba(70, 160, 150, 0.7)',   // Verde azulado oscuro
  'rgba(210, 120, 90, 0.7)',   // Terracota apagado
  'rgba(70, 170, 220, 0.7)',   // Azul cielo oscuro
  'rgba(140, 180, 100, 0.7)',  // Verde oliva
  'rgba(200, 100, 140, 0.7)',  // Rosa oscuro
  'rgba(150, 100, 200, 0.7)'   // Púrpura oscuro
]

// Colores para el modo claro
const lightColors = [
  'rgba(92, 107, 192, 0.8)',   // Índigo
  'rgba(38, 166, 154, 0.8)',   // Verde esmeralda
  'rgba(239, 108, 0, 0.8)',    // Naranja
  'rgba(3, 155, 229, 0.8)',    // Azul brillante
  'rgba(56, 142, 60, 0.8)',    // Verde
  'rgba(194, 24, 91, 0.8)',    // Rosa oscuro
  'rgba(123, 31, 162, 0.8)'    // Púrpura oscuro
]

// Dark mode chart options
const darkModeOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#94a3b8',
        font: {
          size: 12
        }
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
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#94a3b8',
        font: {
          size: 12
        }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }
    },
    y: {
      ticks: {
        color: '#94a3b8',
        font: {
          size: 12
        }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }
    }
  }
}

// Light mode chart options
const lightModeOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#1e293b',
        font: {
          size: 12
        }
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
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#64748b',
        font: {
          size: 12
        }
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        borderColor: 'rgba(0, 0, 0, 0.1)'
      }
    },
    y: {
      ticks: {
        color: '#64748b',
        font: {
          size: 12
        }
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        borderColor: 'rgba(0, 0, 0, 0.1)'
      }
    }
  }
}

// Aplicar colores a los datos del gráfico
const chartDataWithColors = computed(() => {
  const colors = isDarkMode.value ? darkColors : lightColors
  
  return {
    ...props.chartData,
    datasets: props.chartData.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || colors[index % colors.length],
      borderColor: isDarkMode.value 
        ? 'rgba(255, 255, 255, 0.05)' 
        : 'rgba(0, 0, 0, 0.05)',
      hoverBackgroundColor: undefined,
      hoverBorderColor: undefined,
      borderWidth: 1,
      borderRadius: 4
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
    scales: {
      x: {
        ...baseOptions.scales.x,
        ...(props.chartOptions.scales?.x || {})
      },
      y: {
        ...baseOptions.scales.y,
        ...(props.chartOptions.scales?.y || {})
      }
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
