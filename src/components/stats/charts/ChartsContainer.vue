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
    if (!response.ok) throw new Error("Error al obtener las carreras")
    const data = await response.json()
    carreras.value = data.carreras || []
  } catch (err) {
    console.error("Error al obtener carreras:", err)
    error.value = "No se pudieron cargar las carreras. Por favor, intente más tarde."
  }
}

const fetchReporte = async () => {
  try {
    isLoading.value = true
    await fetchCarreras()
    const response = await fetch(`${API_URL}/api/reporte?&num_elements=500`)
    if (!response.ok) throw new Error("Error al obtener los datos del reporte")
    const data = await response.json()
    reporte.value = data.reporte || []
  } catch (err) {
    console.error("Error:", err)
    error.value = "No se pudieron cargar los datos. Por favor, intente más tarde."
  } finally {
    isLoading.value = false
  }
}

onMounted(() => fetchReporte())

// ==============================
// MÉTRICAS BÁSICAS
// ==============================
const totalAlumnos = computed(() => reporte.value?.length || 0)
const totalHombres = computed(() => reporte.value.filter(a => a.sexo === "M").length)
const totalMujeres = computed(() => reporte.value.filter(a => a.sexo === "F").length)
const totalTrabajan = computed(() => reporte.value.filter(a => a.trabaja === 1).length)
const totalDiscapacidad = computed(() => reporte.value.filter(a => a.discapacidad === 1).length)
const promedioEdad = computed(() => {
  const suma = reporte.value.reduce((acc, curr) => acc + Number(curr.edad), 0)
  return (suma / totalAlumnos.value).toFixed(1)
})

// ==============================
// COLORES BASE
// ==============================
const defaultColors = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
  "#FF9F40", "#C9CBCF", "#77DD77", "#FFB6C1", "#AEC6CF"
]

// ==============================
// GRÁFICAS INDIVIDUALES
// ==============================
const genderData = computed(() => {
  const count = reporte.value.reduce((acc, curr) => {
    acc[curr.sexo] = (acc[curr.sexo] || 0) + 1
    return acc
  }, {})
  return {
    labels: ["Hombres", "Mujeres"],
    datasets: [{
      data: [count["M"] || 0, count["F"] || 0],
      backgroundColor: [defaultColors[1], defaultColors[0]],
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
    }]
  }
})

const semestreData = computed(() => {
  const semestres = {}
  reporte.value.forEach(e => {
    const s = e.semestre || "Sin especificar"
    semestres[`${s}° Semestre`] = (semestres[`${s}° Semestre`] || 0) + 1
  })
  const sorted = Object.entries(semestres).sort(([a], [b]) => parseInt(a) - parseInt(b))
  return {
    labels: sorted.map(([key]) => key),
    datasets: [{
      label: "Número de Estudiantes",
      data: sorted.map(([_, val]) => val),
      backgroundColor: defaultColors.slice(0, 10),
    }]
  }
})

const ageData = computed(() => {
  const count = reporte.value.reduce((acc, curr) => {
    acc[curr.edad] = (acc[curr.edad] || 0) + 1
    return acc
  }, {})
  const sorted = Object.entries(count).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
  return {
    labels: sorted.map(([edad]) => `${edad} años`),
    datasets: [{
      label: "Cantidad de estudiantes",
      data: sorted.map(([_, val]) => val),
      backgroundColor: defaultColors[1],
    }]
  }
})

const trabajoData = computed(() => ({
  labels: ["Trabajan", "No trabajan"],
  datasets: [{
    data: [
      reporte.value.filter(a => a.trabaja === 1).length,
      reporte.value.filter(a => a.trabaja === 0).length
    ],
    backgroundColor: [defaultColors[4], defaultColors[5]],
  }]
}))

const discapacidadData = computed(() => ({
  labels: ["Con discapacidad", "Sin discapacidad"],
  datasets: [{
    data: [
      reporte.value.filter(a => a.discapacidad === 1).length,
      reporte.value.filter(a => a.discapacidad === 0).length
    ],
    backgroundColor: [defaultColors[2], defaultColors[3]],
  }]
}))

const pesoData = computed(() => {
  const rangos = { "Menos de 40 kg": 0, "40-49 kg": 0, "50-59 kg": 0, "60-69 kg": 0, "70-79 kg": 0, "80-99 kg": 0, "100+ kg": 0 }
  reporte.value.forEach(e => {
    const p = parseFloat(e.peso)
    if (p < 40) rangos["Menos de 40 kg"]++
    else if (p < 50) rangos["40-49 kg"]++
    else if (p < 60) rangos["50-59 kg"]++
    else if (p < 70) rangos["60-69 kg"]++
    else if (p < 80) rangos["70-79 kg"]++
    else if (p < 100) rangos["80-99 kg"]++
    else rangos["100+ kg"]++
  })
  return { labels: Object.keys(rangos), datasets: [{ data: Object.values(rangos), backgroundColor: defaultColors.slice(0, 7) }] }
})

const alturaData = computed(() => {
  const rangos = { "Menos de 1.40 m": 0, "1.40-1.49 m": 0, "1.50-1.59 m": 0, "1.60-1.69 m": 0, "1.70-1.79 m": 0, "1.80+ m": 0 }
  reporte.value.forEach(e => {
    const h = parseFloat(e.altura)
    if (h < 1.4) rangos["Menos de 1.40 m"]++
    else if (h < 1.5) rangos["1.40-1.49 m"]++
    else if (h < 1.6) rangos["1.50-1.59 m"]++
    else if (h < 1.7) rangos["1.60-1.69 m"]++
    else if (h < 1.8) rangos["1.70-1.79 m"]++
    else rangos["1.80+ m"]++
  })
  return { labels: Object.keys(rangos), datasets: [{ data: Object.values(rangos), backgroundColor: defaultColors.slice(2, 8) }] }
})

const promedioData = computed(() => {
  const rangos = { "<6.0": 0, "6.0–6.9": 0, "7.0–7.9": 0, "8.0–8.9": 0, "9.0–9.9": 0, "10.0": 0 }
  reporte.value.forEach(e => {
    const p = parseFloat(e.promedio_anterior)
    if (isNaN(p)) rangos["<6.0"]++
    else if (p < 6) rangos["<6.0"]++
    else if (p < 7) rangos["6.0–6.9"]++
    else if (p < 8) rangos["7.0–7.9"]++
    else if (p < 9) rangos["8.0–8.9"]++
    else if (p < 10) rangos["9.0–9.9"]++
    else rangos["10.0"]++
  })
  return { labels: Object.keys(rangos), datasets: [{ data: Object.values(rangos), backgroundColor: defaultColors.slice(0, 6) }] }
})

const gastoMensualData = computed(() => {
  const gastos = reporte.value.reduce((acc, e) => {
    if (!acc[e.carrera]) acc[e.carrera] = { sum: 0, count: 0 }
    acc[e.carrera].sum += parseFloat(e.gasto_mensual)
    acc[e.carrera].count++
    return acc
  }, {})
  const labels = Object.keys(gastos)
  return {
    labels,
    datasets: [{
      label: "Gasto mensual promedio",
      data: labels.map(c => (gastos[c].sum / gastos[c].count).toFixed(2)),
      backgroundColor: labels.map((_, i) => defaultColors[i % defaultColors.length]),
    }]
  }
})

const trasladoData = computed(() => {
  const rangos = { "0–15 min": 0, "16–30 min": 0, "31–45 min": 0, "46–60 min": 0, "Más de 60 min": 0 }
  reporte.value.forEach(e => {
    const t = e.tiempo_traslado
    if (t <= 15) rangos["0–15 min"]++
    else if (t <= 30) rangos["16–30 min"]++
    else if (t <= 45) rangos["31–45 min"]++
    else if (t <= 60) rangos["46–60 min"]++
    else rangos["Más de 60 min"]++
  })
  return { labels: Object.keys(rangos), datasets: [{ data: Object.values(rangos), backgroundColor: defaultColors }] }
})

// ==============================
// GRÁFICAS COMBINADAS
// ==============================
const promedioPorCarrera = computed(() => {
  const promedios = reporte.value.reduce((acc, e) => {
    if (!acc[e.carrera]) acc[e.carrera] = { sum: 0, count: 0 }
    acc[e.carrera].sum += parseFloat(e.promedio_anterior)
    acc[e.carrera].count++
    return acc
  }, {})
  const labels = Object.keys(promedios)
  return {
    labels,
    datasets: [{
      label: "Promedio general",
      data: labels.map(c => (promedios[c].sum / promedios[c].count).toFixed(2)),
      backgroundColor: defaultColors.slice(0, labels.length)
    }]
  }
})

const porcentajeTrabajaPorCarrera = computed(() => {
  const data = {}
  reporte.value.forEach(e => {
    if (!data[e.carrera]) data[e.carrera] = { total: 0, trabaja: 0 }
    data[e.carrera].total++
    if (e.trabaja === 1) data[e.carrera].trabaja++
  })
  const labels = Object.keys(data)
  return {
    labels,
    datasets: [{
      label: "% que trabaja",
      data: labels.map(c => ((data[c].trabaja / data[c].total) * 100).toFixed(1)),
      backgroundColor: defaultColors.slice(0, labels.length)
    }]
  }
})

const trabajoVsTraslado = computed(() => {
  const grupos = { Trabajan: {}, "No trabajan": {} }
  reporte.value.forEach(e => {
    const rango = e.tiempo_traslado <= 15 ? "0–15 min"
      : e.tiempo_traslado <= 30 ? "16–30 min"
      : e.tiempo_traslado <= 45 ? "31–45 min"
      : e.tiempo_traslado <= 60 ? "46–60 min" : "Más de 60 min"
    const grupo = e.trabaja === 1 ? "Trabajan" : "No trabajan"
    grupos[grupo][rango] = (grupos[grupo][rango] || 0) + 1
  })
  const labels = Object.keys(grupos["Trabajan"])
  return {
    labels,
    datasets: [
      { label: "Trabajan", data: Object.values(grupos["Trabajan"]), backgroundColor: defaultColors[4] },
      { label: "No trabajan", data: Object.values(grupos["No trabajan"]), backgroundColor: defaultColors[5] }
    ]
  }
})

const imcPorCarrera = computed(() => {
  const data = {}
  reporte.value.forEach(e => {
    if (!data[e.carrera]) data[e.carrera] = { sum: 0, count: 0 }
    const imc = parseFloat(e.peso) / (parseFloat(e.altura) ** 2)
    data[e.carrera].sum += imc
    data[e.carrera].count++
  })
  const labels = Object.keys(data)
  return {
    labels,
    datasets: [{
      label: "IMC promedio",
      data: labels.map(c => (data[c].sum / data[c].count).toFixed(1)),
      backgroundColor: defaultColors
    }]
  }
})

const promedioPorSemestre = computed(() => {
  const data = {}
  reporte.value.forEach(e => {
    const s = e.semestre || "Sin especificar"
    if (!data[s]) data[s] = { sum: 0, count: 0 }
    data[s].sum += parseFloat(e.promedio_anterior)
    data[s].count++
  })
  const labels = Object.keys(data)
  return {
    labels,
    datasets: [{
      label: "Promedio por semestre",
      data: labels.map(s => (data[s].sum / data[s].count).toFixed(2)),
      backgroundColor: defaultColors
    }]
  }
})

const gastoMensualPorCarrera = computed(() => gastoMensualData.value)

const discapacidadPorCarrera = computed(() => {
  const data = {}
  reporte.value.forEach(e => {
    if (!data[e.carrera]) data[e.carrera] = { total: 0, discapacidad: 0 }
    data[e.carrera].total++
    if (e.discapacidad === 1) data[e.carrera].discapacidad++
  })
  const labels = Object.keys(data)
  return {
    labels,
    datasets: [{
      label: "% con discapacidad",
      data: labels.map(c => ((data[c].discapacidad / data[c].total) * 100).toFixed(1)),
      backgroundColor: defaultColors
    }]
  }
})

// ==============================
// OPCIONES GRÁFICAS
// ==============================
const pieChartOptions = { responsive: true, plugins: { legend: { position: "right" } } }
const barChartOptions = { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
</script>

<template>
  <div class="space-y-10">
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin h-12 w-12 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p class="font-bold">Error</p>
      <p>{{ error }}</p>
      <button @click="fetchReporte" class="mt-2 bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded">
        Reintentar
      </button>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- GRÁFICAS INDIVIDUALES -->
      <PieChart title="Distribución por Carrera" :chartData="carreraData" :chartOptions="pieChartOptions" />
      <BarChart title="Estudiantes por Semestre" :chartData="semestreData" :chartOptions="barChartOptions" />
      <PieChart title="Distribución por Género" :chartData="genderData" :chartOptions="pieChartOptions" />
      <BarChart title="Distribución de Edad" :chartData="ageData" :chartOptions="barChartOptions" />
      <PieChart title="Estudiantes que Trabajan" :chartData="trabajoData" :chartOptions="pieChartOptions" />
      <PieChart title="Discapacidad" :chartData="discapacidadData" :chartOptions="pieChartOptions" />
      <BarChart title="Distribución de Peso" :chartData="pesoData" :chartOptions="barChartOptions" />
      <BarChart title="Distribución de Altura" :chartData="alturaData" :chartOptions="barChartOptions" />
      <BarChart title="Distribución de Promedios" :chartData="promedioData" :chartOptions="barChartOptions" />
      <BarChart title="Tiempo de Traslado" :chartData="trasladoData" :chartOptions="barChartOptions" />
      <BarChart title="Gasto Mensual Promedio por Carrera" :chartData="gastoMensualData" :chartOptions="barChartOptions" />

      <!-- GRÁFICAS COMBINADAS (NUEVAS) -->
      <BarChart title="Promedio General por Carrera" :chartData="promedioPorCarrera" :chartOptions="barChartOptions" />
      <BarChart title="Porcentaje de Estudiantes que Trabajan por Carrera" :chartData="porcentajeTrabajaPorCarrera" :chartOptions="barChartOptions" />
      <BarChart title="Relación entre Trabajo y Tiempo de Traslado" :chartData="trabajoVsTraslado" :chartOptions="barChartOptions" />
      <BarChart title="IMC Promedio por Carrera" :chartData="imcPorCarrera" :chartOptions="barChartOptions" />
      <BarChart title="Promedio Académico por Semestre" :chartData="promedioPorSemestre" :chartOptions="barChartOptions" />
      <BarChart title="Gasto Mensual Promedio por Carrera (Combinada)" :chartData="gastoMensualPorCarrera" :chartOptions="barChartOptions" />
      <BarChart title="Porcentaje de Estudiantes con Discapacidad por Carrera" :chartData="discapacidadPorCarrera" :chartOptions="barChartOptions" />
    </div>
  </div>
</template>
