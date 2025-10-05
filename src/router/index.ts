import { createRouter, createWebHistory } from "vue-router"

// Aqui importen sus componentes
// import Example from "../components/example.vue"
// import Example2 from "../components/example2.vue"
import FormView from "@/components/form/FormView.vue"

const routes = [
  {
    path: "/",
    // component: Example,
  },
  {
    path: "/formulario",
    component: FormView,
  },
  {
    path: "/estadisticas",
    // component: Example3,
  },
] as any

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
