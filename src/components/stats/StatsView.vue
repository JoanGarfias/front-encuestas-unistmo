<script setup lang="js">
import { ref, onMounted } from 'vue'; 

// COMPONENTS
import ChartsContainer from "./charts/ChartsContainer.vue"
import PasswordModal from "../form/PasswordModal.vue"
import GeneralTable from "./GeneralTable.vue"
import AnalyticsContainer from "./AnalyticsContainer.vue"
import TotalStudents from "./TotalStudents.vue";

import { useSessionStore } from "@/stores/sessionStore"

const sessionStore = useSessionStore()

// METHODS
const datos = ref({});
const error = ref("");
const loading = ref(false);

const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://encuesta.dxicode.com";

const obtenerDatos = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await fetch(`${API_URL}/api/desviacionestandar`); 
    const data = await response.json();

    if (response.ok) {
      datos.value = data;
      console.log("Datos recibidos:", data);
    } else {
      error.value = "Error al obtener los datos";
    }
  } catch (err) {
    error.value = "Error de conexión con el servidor";
    console.error("Error:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  obtenerDatos();
});

</script>

<template>
  <!--MODAL DE CONTRASEÑA-->
  <PasswordModal v-if="!sessionStore.isLogged" />

  <!-- VISTA DE ESTADÍSTICAS añadir v-else aqui -->
  <div v-else class="flex flex-col gap-8 mx-auto max-w-7xl">
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
    <TotalStudents 
     :totalAlumnos="datos.total_alumnos"
     :loading="loading"
     :error="error"
    />
    <GeneralTable />
    <AnalyticsContainer 
     :datos="datos"
     :loading="loading"
     :error="error"
    />
    <ChartsContainer />
  </div>
</template>