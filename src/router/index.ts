import { createRouter, createWebHistory } from "vue-router"

// Aqui importen sus componentes
import HomeView from "@/components/home/HomeView.vue"
import FormView from "@/components/form/FormView.vue"
import StatsView from "@/components/stats/StatsView.vue"

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/formulario",
    component: FormView,
  },
  {
    path: "/estadisticas",
    component: StatsView,
  },
] as any

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
