<script setup lang="js">
import ChartsContainer from "./charts/ChartsContainer.vue"
import PasswordModal from "../form/PasswordModal.vue"
import GeneralTable from "./GeneralTable.vue"
import AnalyticsContainer from "./AnalyticsContainer.vue"

import { useSessionStore } from "@/stores/sessionStore"
import { Sheet } from "lucide-vue-next"
import DownloadReport from "./DownloadReport.vue"

const sessionStore = useSessionStore()
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
    <DownloadReport />
    <GeneralTable />
    <AnalyticsContainer />
    <ChartsContainer />
  </div>
</template>
