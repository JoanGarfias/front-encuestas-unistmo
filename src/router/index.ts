import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

// Aqui importen sus componentes
import HomeView from "@/components/home/HomeView.vue"
import FormView from "@/components/form/FormView.vue"
import StatsView from "@/components/stats/StatsView.vue"

const routes: readonly RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/formulario",
    name: "form",
    component: FormView,
  },
  {
    path: "/estadisticas",
    name: "stats",
    component: StatsView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router