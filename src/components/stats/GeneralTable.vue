<script setup lang="js">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { ref, computed, onMounted } from "vue"
import { Sheet } from "lucide-vue-next"
import DownloadReport from "./DownloadReport.vue"

const API_URL = window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://encuesta.dxicode.com";

const data = ref({})
const carreras = ref([])

const getReporte = async () => {
    try {
        const response = await fetch(`${API_URL}/api/reporte?&num_elements=500`)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error('Error al obtener los datos:', error)
    }
}

const getCarreras = async () => {
    try {
        const response = await fetch(`${API_URL}/api/carreras`)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error('Error al obtener los datos:', error)
    }
}

onMounted(async () => {
    data.value = await getReporte() || {}
    carreras.value = await getCarreras() || []
})

const searchQuery = ref('')
const selectedCarrera = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)

const totalPages = computed(() => {
  if (!filteredData.value) return 0
  return Math.ceil(filteredData.value.length / itemsPerPage.value)
})

const paginatedData = computed(() => {
  if (!filteredData.value) return []
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredData.value.slice(start, end)
})

const updateItemsPerPage = (count) => {
  itemsPerPage.value = count
  currentPage.value = 1
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const paginationItems = computed(() => {
  const items = []
  const total = totalPages.value
  const current = currentPage.value

  if (total === 0) return items

  items.push({ type: 'page', value: 1 })

  if (current > 3) {
    items.push({ type: 'ellipsis' })
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    if (i > 1 && i < total) {
      items.push({ type: 'page', value: i })
    }
  }

  if (current < total - 2) {
    items.push({ type: 'ellipsis' })
  }

  if (total > 1) {
    items.push({ type: 'page', value: total })
  }

  return items
})

const filteredData = computed(() => {
  if (!data.value || !data.value.reporte) return []

  return data.value.reporte.filter(row => {
    const matchesName = row.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCarrera = !selectedCarrera.value ||
                          selectedCarrera.value === 'Todas' ||
                          row.carrera === selectedCarrera.value

    return matchesName && matchesCarrera
  })
})

const headers = [
  "Nombre",
  "Carrera",
  "Semestre",
  "Edad",
  "Sexo",
  "Promedio Anterior",
  "Altura",
  "Peso",
  "Trabaja",
  "Gasto Mensual",
  "Tiempo de Traslado",
  "Discapacidad",
]
</script>

<template>
  <div class="flex flex-col gap-3 justify-between bg-background/50">
    <div class="w-full">
      <div class="flex flex-col sm:flex-row gap-3 w-full">
        <Input
          v-if="data.reporte && data.reporte.length > 0"
          v-model="searchQuery"
          class="w-full sm:max-w-xs"
          placeholder="Buscar por nombre..."
        />
        <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <DropdownMenu
            v-if="data.reporte && data.reporte.length > 0"
            class="w-full sm:w-[120px]"
          >
            <DropdownMenuTrigger as-child>
              <Button variant="outline" class="w-full justify-between">
                <span>Mostrar</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              class="w-[200px] fixed sm:relative sm:top-0 sm:left-0"
              :side-offset="4"
              :align="'start'"
              :side="'bottom'"
              :avoid-collisions="true"
            >
              <DropdownMenuLabel>Registros por página</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  @click="updateItemsPerPage(5)"
                  :class="{ 'bg-accent': itemsPerPage === 5 }"
                >
                  5
                </DropdownMenuItem>
                <DropdownMenuItem
                  @click="updateItemsPerPage(10)"
                  :class="{ 'bg-accent': itemsPerPage === 10 }"
                >
                  10
                </DropdownMenuItem>
                <DropdownMenuItem
                  @click="updateItemsPerPage(20)"
                  :class="{ 'bg-accent': itemsPerPage === 20 }"
                >
                  20
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu
            v-if="data.reporte && data.reporte.length > 0"
            class="w-full sm:w-[180px]"
          >
            <DropdownMenuTrigger as-child>
              <Button variant="outline" class="w-full justify-between">
                <span class="truncate">
                  {{ selectedCarrera || "Todas las carreras" }}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              class="w-[calc(100vw-2rem)] sm:w-[200px] fixed sm:relative sm:top-0 sm:left-0"
              :side-offset="4"
              :align="'start'"
              :side="'bottom'"
              :avoid-collisions="true"
            >
              <DropdownMenuLabel>Filtrar por carrera</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div class="max-h-[300px] overflow-y-auto">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    v-for="carrera in [
                      { id: '', name: 'Todas' },
                      ...(carreras.carreras || []),
                    ]"
                    :key="carrera.id"
                    @click="
                      selectedCarrera = carrera.id === '' ? '' : carrera.name
                    "
                    :class="{
                      'bg-accent':
                        (carrera.id === '' && !selectedCarrera) ||
                        carrera.name === selectedCarrera,
                    }"
                  >
                    {{ carrera.name }}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
    <div class="w-full rounded-lg border overflow-hidden">
      <Table class="min-w-full table-scroll">
        <TableHeader>
          <TableRow>
            <TableHead
              v-for="header in headers"
              :key="header"
              class="px-4 py-3 text-center text-sm font-medium text-muted-foreground bg-muted/50"
            >
              {{ header }}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow
            v-if="data.reporte && data.reporte.length > 0"
            v-for="(row, index) in paginatedData"
            :key="row.id_r"
            class="hover:bg-muted/50 transition-colors"
            :class="{ 'bg-muted/5': index % 2 === 0 }"
          >
            <!-- ... (el resto de celdas permanece igual) -->
            <TableCell class="px-4 py-3 font-medium">{{
              row.nombre
            }}</TableCell>
            <TableCell class="px-4 py-3 text-muted-foreground">{{
              row.carrera
            }}</TableCell>
            <TableCell class="px-4 py-3 text-center"
              >{{ row.semestre }}°</TableCell
            >
            <TableCell class="px-4 py-3 text-center text-muted-foreground"
              >{{ row.edad }} años</TableCell
            >
            <td class="px-4 py-3 text-center">
              <span
                :class="{
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200':
                    row.sexo === 'M',
                  'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200':
                    row.sexo === 'F',
                }"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{
                  row.sexo === "M"
                    ? "Masculino"
                    : row.sexo === "F"
                    ? "Femenino"
                    : row.sexo
                }}
              </span>
            </td>
            <td class="px-4 py-3 text-center font-medium">
              <span
                :class="{
                  'text-green-600': parseFloat(row.promedio_anterior) >= 9,
                  'text-yellow-500':
                    parseFloat(row.promedio_anterior) >= 7.6 &&
                    parseFloat(row.promedio_anterior) < 9,
                  'text-orange-500':
                    parseFloat(row.promedio_anterior) >= 6 &&
                    parseFloat(row.promedio_anterior) <= 7.5,
                  'text-red-500':
                    parseFloat(row.promedio_anterior) < 6 &&
                    row.promedio_anterior !== null,
                  'text-muted-foreground': row.promedio_anterior === null,
                }"
              >
                {{ row.promedio_anterior || "N/A" }}
              </span>
            </td>
            <td class="px-4 py-3 text-center text-muted-foreground">
              {{ row.altura }} m
            </td>
            <td class="px-4 py-3 text-center text-muted-foreground">
              {{ row.peso }} kg
            </td>
            <td class="px-4 py-3 text-center">
              <span
                :class="{
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                    row.trabaja,
                  'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300':
                    !row.trabaja,
                }"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{ row.trabaja ? "Sí" : "No" }}
              </span>
            </td>
            <td class="px-4 py-3 text-center font-medium text-green-600">
              ${{
                parseFloat(row.gasto_mensual).toLocaleString("es-MX", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </td>
            <td class="px-4 py-3 text-center">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
              >
                {{ row.tiempo_traslado }} min
              </span>
            </td>
            <td class="px-4 py-3 text-center">
              <span
                :class="{
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200':
                    row.discapacidad,
                  'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300':
                    !row.discapacidad,
                }"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{ row.discapacidad ? "Sí" : "No" }}
              </span>
            </td>
          </TableRow>

          <TableRow
            v-else-if="data.reporte && data.reporte.length === 0"
            class="hover:bg-transparent"
          >
            <TableCell :colspan="headers.length" class="px-6 py-16 text-center">
              <div class="flex flex-col items-center justify-center space-y-3">
                <p class="text-sm text-muted-foreground">
                  No hay datos disponibles
                </p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow v-else>
            <TableCell :colspan="headers.length" class="px-6 py-16 text-center">
              <div class="flex flex-col items-center justify-center space-y-2">
                <h3 class="mt-2 text-sm font-medium text-muted-foreground">
                  No se encontraron resultados
                </h3>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <!-- Pagination Controls -->
      <div v-if="totalPages > 1" class="px-4 py-3 border-t bg-muted/10">
        <Pagination
          v-slot="{ page }"
          :items-per-page="itemsPerPage"
          :total="filteredData.length"
          :default-page="currentPage"
          @update:page="goToPage"
          class="justify-center"
        >
          <PaginationContent>
            <PaginationPrevious @click="goToPage(currentPage - 1)" />

            <template v-for="(item, index) in paginationItems" :key="index">
              <PaginationItem
                v-if="item.type === 'page'"
                :value="item.value"
                :is-active="item.value === currentPage"
                @click="goToPage(item.value)"
              >
                {{ item.value }}
              </PaginationItem>
              <PaginationEllipsis
                v-else-if="item.type === 'ellipsis'"
                :key="`ellipsis-${index}`"
              />
            </template>

            <PaginationNext @click="goToPage(currentPage + 1)" />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
    <DownloadReport />
  </div>
</template>
