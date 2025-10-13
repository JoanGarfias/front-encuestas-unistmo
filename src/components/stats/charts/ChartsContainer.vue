<script setup lang="js">
import BarChart from "./BarChart.vue"
import PieChart from "./PieChart.vue"
import { ref, computed, onMounted } from "vue"

const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://encuesta.dxicode.com";

const reporte = ref([])
const carreras = ref([])
const isLoading = ref(true)
const error = ref(null)

const fetchCarreras = async () => {
  try {
    const response = await fetch(`${API_URL}/api/carreras`)
    if (!response.ok) {
      throw new Error('Error al obtener las carreras')
    }
    const data = await response.json()
    carreras.value = data.carreras || []
  } catch (err) {
    console.error('Error al obtener carreras:', err)
    error.value = 'No se pudieron cargar las carreras. Por favor, intente más tarde.'
  }
}

const fetchReporte = async () => {
  try {
    isLoading.value = true
    await fetchCarreras()
    const response = await fetch(`${API_URL}/api/reporte?&num_elements=500`)
    if (!response.ok) {
      throw new Error('Error al obtener los datos del reporte')
    }
    const data = await response.json()
    reporte.value = data.reporte || []
  } catch (err) {
    console.error('Error:', err)
    error.value = 'No se pudieron cargar los datos. Por favor, intente más tarde.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchReporte()
})

const totalAlumnos = computed(() => reporte.value?.length || 0)
const totalHombres = computed(() => reporte.value.filter(a => a.sexo === 'M').length)
const totalMujeres = computed(() => reporte.value.filter(a => a.sexo === 'F').length)
const totalTrabajan = computed(() => reporte.value.filter(a => a.trabaja === 1).length)
const totalDiscapacidad = computed(() => reporte.value.filter(a => a.discapacidad === 1).length)
const promedioEdad = computed(() => {
  const suma = reporte.value.reduce((acc, curr) => acc + Number(curr.edad), 0)
  return (suma / totalAlumnos.value).toFixed(1)
})
const promedioPromedio = computed(() => {
  const promedios = reporte.value
    .filter(a => a.promedio_anterior !== null)
    .map(a => parseFloat(a.promedio_anterior))
  const suma = promedios.reduce((acc, curr) => acc + curr, 0)
  return (suma / promedios.length).toFixed(2)
})

const defaultColors = [
  "#FF6384", // Rojo
  "#36A2EB", // Azul
  "#FFCE56", // Amarillo
  "#4BC0C0", // Turquesa
  "#9966FF", // Morado
  "#FF9F40", // Naranja
  "#C9CBCF", // Gris
  "#77DD77", // Verde
  "#FFB6C1", // Rosa
  "#AEC6CF", // Azul claro
]

const genderData = computed(() => {
  const count = reporte.value.reduce((acc, curr) => {
    acc[curr.sexo] = (acc[curr.sexo] || 0) + 1
    return acc
  }, {})

  return {
    labels: ['Hombres', 'Mujeres'],
    datasets: [{
      data: [count['M'] || 0, count['F'] || 0],
      backgroundColor: [defaultColors[1], defaultColors[0]],
      borderWidth: 1,
    }]
  }
})

const carreraData = computed(() => {
  const count = reporte.value.reduce((acc, curr) => {
    acc[curr.carrera] = (acc[curr.carrera] || 0) + 1
    return acc
  }, {})

  return {
    labels: Object.keys(count),
    datasets: [{
      data: Object.values(count),
      backgroundColor: Object.keys(count).map((_, i) => defaultColors[i % defaultColors.length]),
      borderWidth: 1
    }]
  }
})

const semestreData = computed(() => {

  const semestres = {}

  reporte.value.forEach(estudiante => {
    const semestre = estudiante.semestre || 'Sin especificar'
    semestres[`${semestre}° Semestre`] = (semestres[`${semestre}° Semestre`] || 0) + 1
  })


  const sortedSemestres = Object.entries(semestres)
    .sort(([a], [b]) => {
      const numA = parseInt(a.replace('° Semestre', ''))
      const numB = parseInt(b.replace('° Semestre', ''))
      return isNaN(numA) ? 1 : (isNaN(numB) ? -1 : numA - numB)
    })
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value
    }), {})

  return {
    labels: Object.keys(sortedSemestres),
    datasets: [{
      label: 'Número de Estudiantes',
      data: Object.values(sortedSemestres),
      backgroundColor: defaultColors.slice(0, 10),
      borderWidth: 1
    }]
  }
})

const ageData = computed(() => {
  const count = reporte.value.reduce((acc, curr) => {
    acc[curr.edad] = (acc[curr.edad] || 0) + 1
    return acc
  }, {})

  const sortedEntries = Object.entries(count).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))

  return {
    labels: sortedEntries.map(([edad]) => `${edad} años`),
    datasets: [{
      label: 'Cantidad de estudiantes',
      data: sortedEntries.map(([_, count]) => count),
      backgroundColor: defaultColors[1],
      borderRadius: 4,
    }]
  }
})

const trabajoData = computed(() => ({
  labels: ['Trabajan', 'No trabajan'],
  datasets: [{
    data: [
      reporte.value.filter(a => a.trabaja === 1).length,
      reporte.value.filter(a => a.trabaja === 0).length
    ],
    backgroundColor: [defaultColors[4], defaultColors[5]],
    borderWidth: 1,
  }]
}))

const discapacidadData = computed(() => ({
  labels: ['Con discapacidad', 'Sin discapacidad'],
  datasets: [{
    data: [
      reporte.value.filter(a => a.discapacidad === 1).length,
      reporte.value.filter(a => a.discapacidad === 0).length
    ],
    backgroundColor: [defaultColors[2], defaultColors[3]],
    borderWidth: 1,
  }]
}))

const pesoData = computed(() => {
  const rangos = {
    'Menos de 40 kg': 0,
    '40-49 kg': 0,
    '50-59 kg': 0,
    '60-69 kg': 0,
    '70-79 kg': 0,
    '80-99 kg': 0,
    '100+ kg': 0
  }

  reporte.value.forEach(estudiante => {
    const peso = parseFloat(estudiante.peso)
    if (peso < 40) rangos['Menos de 40 kg']++
    else if (peso < 50) rangos['40-49 kg']++
    else if (peso < 60) rangos['50-59 kg']++
    else if (peso < 70) rangos['60-69 kg']++
    else if (peso < 80) rangos['70-79 kg']++
    else if (peso < 100) rangos['80-99 kg']++
    else rangos['100+ kg']++
  })

  return {
    labels: Object.keys(rangos),
    datasets: [{
      label: 'Número de Estudiantes',
      data: Object.values(rangos),
      backgroundColor: defaultColors.slice(0, 5),
      borderWidth: 1
    }]
  }
})

const alturaData = computed(() => {
  const rangos = {
    'Menos de 1.40 m': 0,
    '1.40-1.49 m': 0,
    '1.50-1.59 m': 0,
    '1.60-1.69 m': 0,
    '1.70-1.79 m': 0,
    '1.80+ m': 0
  }

  reporte.value.forEach(estudiante => {
    const altura = parseFloat(estudiante.altura)
    if (altura < 1.4) rangos['Menos de 1.40 m']++
    else if (altura < 1.5) rangos['1.40-1.49 m']++
    else if (altura < 1.6) rangos['1.50-1.59 m']++
    else if (altura < 1.7) rangos['1.60-1.69 m']++
    else if (altura < 1.8) rangos['1.70-1.79 m']++
    else rangos['1.80+ m']++
  })

  return {
    labels: Object.keys(rangos),
    datasets: [{
      label: 'Número de Estudiantes',
      data: Object.values(rangos),
      backgroundColor: defaultColors.slice(2, 7),
      borderWidth: 1
    }]
  }
})

const promedioData = computed(() => {
  const rangos = {
    'Menos de 6.0': 0,
    '6.0-6.9': 0,
    '7.0-7.9': 0,
    '8.0-8.9': 0,
    '9.0-9.9': 0,
    '10.0': 0
  }

  reporte.value.forEach(estudiante => {
    if (estudiante.promedio_anterior === null || estudiante.promedio_anterior === undefined) {
      rangos['Menos de 6.0']++
      return
    }

    const promedio = parseFloat(estudiante.promedio_anterior)
    if (promedio < 6) rangos['Menos de 6.0']++
    else if (promedio < 7) rangos['6.0-6.9']++
    else if (promedio < 8) rangos['7.0-7.9']++
    else if (promedio < 9) rangos['8.0-8.9']++
    else if (promedio < 10) rangos['9.0-9.9']++
    else rangos['10.0']++
  })

  return {
    labels: Object.keys(rangos).map(r => `${r}`),
    datasets: [{
      label: 'Número de Estudiantes',
      data: Object.values(rangos),
      backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
      borderWidth: 1
    }]
  }
})

const gastoMensualData = computed(() => {
  // Initialize an object to store sum and count for each carrera
  const gastosPorCarrera = {}

  // First, initialize all carreras with 0 values
  carreras.value.forEach(carrera => {
    gastosPorCarrera[carrera] = { sum: 0, count: 0 }
  })

  // Then process the report data
  reporte.value.forEach(estudiante => {
    if (!estudiante.carrera) return // Skip if no carrera

    const gasto = parseFloat(estudiante.gasto_mensual)
    if (!isNaN(gasto) && isFinite(gasto)) { // Only process valid numbers
      if (!gastosPorCarrera[estudiante.carrera]) {
        gastosPorCarrera[estudiante.carrera] = { sum: 0, count: 0 }
      }
      gastosPorCarrera[estudiante.carrera].sum += gasto
      gastosPorCarrera[estudiante.carrera].count++
    }
  })

  // Filter out carreras with no data
  const carrerasConDatos = Object.entries(gastosPorCarrera)
    .filter(([_, data]) => data.count > 0)
    .sort(([a], [b]) => a.localeCompare(b)) // Sort alphabetically

  return {
    labels: carrerasConDatos.map(([carrera]) => carrera),
    datasets: [{
      label: 'Gasto mensual promedio',
      data: carrerasConDatos.map(([_, data]) =>
        parseFloat((data.sum / data.count).toFixed(2))
      ),
      backgroundColor: carrerasConDatos.map((_, i) => defaultColors[i % defaultColors.length]),
      borderWidth: 1,
    }]
  }
})

const trasladoData = computed(() => {
  const rangos = {
    '0-15 min': 0,
    '16-30 min': 0,
    '31-45 min': 0,
    '46-60 min': 0,
    'Más de 60 min': 0
  }

  reporte.value.forEach(estudiante => {
    const tiempo = estudiante.tiempo_traslado
    if (tiempo <= 15) rangos['0-15 min']++
    else if (tiempo <= 30) rangos['16-30 min']++
    else if (tiempo <= 45) rangos['31-45 min']++
    else if (tiempo <= 60) rangos['46-60 min']++
    else rangos['Más de 60 min']++
  })

  return {
    labels: Object.keys(rangos),
    datasets: [{
      label: 'Estudiantes',
      data: Object.values(rangos),
      backgroundColor: Object.keys(rangos).map((_, i) => defaultColors[i % defaultColors.length]),
      borderWidth: 1,
    }]
  }
})

const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
    tooltip: {
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
  }
}

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return `${context.parsed.y} estudiantes`
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        precision: 0
      },
    },
  },
}

const horizontalBarOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return `${context.parsed.x} estudiantes`
        }
      }
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        precision: 0
      },
    },
  },
}

const barChartWithAxisTitles = {
  ...barChartOptions,
  scales: {
    ...barChartOptions.scales,
    y: {
      ...barChartOptions.scales.y,
      title: {
        display: true,
        text: 'Cantidad de estudiantes',
      }
    }
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Estado de carga y error -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
      ></div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
      role="alert"
    >
      <p class="font-bold">Error</p>
      <p>{{ error }}</p>
      <button
        @click="fetchReporte"
        class="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
      >
        Reintentar
      </button>
    </div>

    <div v-else>
      <!-- Gráficos -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Distribución por carrera -->
        <PieChart
          title="Distribución por Carrera"
          :chartData="carreraData"
          :chartOptions="pieChartOptions"
        />

        <!-- Estudiantes por semestre -->
        <BarChart
          title="Estudiantes por Semestre"
          :chartData="semestreData"
          :chartOptions="barChartOptions"
        />

        <!-- Distribución de Promedios -->
        <BarChart
          title="Distribución de Promedios"
          :chartData="promedioData"
          :chartOptions="{
            ...barChartOptions,
            indexAxis: 'x',
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
                title: {
                  display: true,
                  text: 'Número de Estudiantes',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Rango de Promedio',
                },
              },
            },
          }"
        />

        <!-- Distribución por género -->
        <PieChart
          title="Distribución por Género"
          :chartData="genderData"
          :chartOptions="pieChartOptions"
        />

        <!-- Distribución de Peso -->
        <BarChart
          title="Distribución de Peso"
          :chartData="pesoData"
          :chartOptions="barChartOptions"
        />

        <!-- Distribución de Altura -->
        <BarChart
          title="Distribución de Altura"
          :chartData="alturaData"
          :chartOptions="barChartOptions"
        />

        <!-- Distribución por edad -->
        <BarChart
          title="Distribución por Edad"
          :chartData="ageData"
          :chartOptions="barChartOptions"
        />

        <!-- Discapacidad -->
        <PieChart
          title="Distribución de Discapacidad"
          :chartData="discapacidadData"
          :chartOptions="pieChartOptions"
        />

        <!-- Estado laboral -->
        <PieChart
          title="Estudiantes que Trabajan"
          :chartData="trabajoData"
          :chartOptions="pieChartOptions"
        />

        <!-- Gasto mensual por carrera -->
        <BarChart
          title="Gasto Mensual Promedio por Carrera"
          :chartData="gastoMensualData"
          :chartOptions="{
            ...barChartOptions,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Pesos (MXN)',
                },
              },
            },
            plugins: {
              ...barChartOptions.plugins,
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `$${context.parsed.y.toLocaleString('es-MX', {
                      minimumFractionDigits: 2,
                    })}`
                  },
                },
              },
            },
          }"
        />

        <!-- Tiempo de traslado -->
        <BarChart
          title="Tiempo de Traslado"
          :chartData="trasladoData"
          :chartOptions="horizontalBarOptions"
          class="lg:col-span-2"
        />
      </div>
    </div>
  </div>
</template>
