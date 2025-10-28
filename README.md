# Encuestas UNISTMO - Frontend

Este repositorio contiene el código del frontend para una plataforma de encuestas, desarrollada como parte de un proyecto académico para la materia de Probabilidad y Estadística de la carrera de Ingeniería en Computación en la Universidad del Istmo (UNISTMO).

El objetivo principal del proyecto es la recolección y el análisis de datos obtenidos a través de una encuesta simple, permitiendo a los estudiantes aplicar conceptos teóricos en un caso práctico.

## Repositorio del Backend

Este proyecto solo constituye el frontend de la aplicación. El backend, desarrollado en Python con Flask, se encuentra en el siguiente repositorio:

[**https://github.com/JoanGarfias/back-encuestas-unistmo**](https://github.com/JoanGarfias/back-encuestas-unistmo)

## Características

*   **Interfaz de Encuesta Intuitiva:** Un formulario claro y fácil de usar para que los usuarios respondan.
*   **Visualización de Datos:** Gráficas y tablas que resumen los resultados de la encuesta en tiempo real.
*   **Acceso a Estadísticas:** Una vista protegida por contraseña para visualizar los datos recopilados.
*   **Diseño Responsivo:** Adaptable a diferentes tamaños de pantalla (móvil y escritorio).

## Tecnologías Utilizadas

*   **Framework:** [Vue.js 3](https://vuejs.org/)
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Enrutamiento:** [Vue Router](https://router.vuejs.org/)
*   **Manejo de Estado:** [Pinia](https://pinia.vuejs.org/)
*   **Estilos CSS:** [Tailwind CSS](https://tailwindcss.com/)
*   **Componentes UI:**
    *   UI Primitivas inspiradas en [Shadcn UI](https://www.shadcn-ui.com/).
    *   Iconos de [Lucide](https://lucide.dev/).
*   **Visualización de Datos:** [Chart.js](https://www.chartjs.org/) con [vue-chartjs](https://vue-chartjs.org/).
*   **Tablas de Datos:** [TanStack Table for Vue](https://tanstack.com/table/v8/docs/adapters/vue-table).

## Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en un entorno de desarrollo local.

**1. Clonar el repositorio:**

```bash
git clone https://github.com/JoanGarfias/front-encuestas-unistmo.git
cd front-encuestas-unistmo
```

**2. Instalar dependencias:**

Se recomienda usar `npm`.

```bash
npm install
```

**3. Configurar el backend:**

Asegúrate de que el servidor del backend esté corriendo. Sigue las instrucciones en el [repositorio del backend](https://github.com/JoanGarfias/back-encuestas-unistmo) para su configuración.

**4. Ejecutar el servidor de desarrollo:**

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

### Comandos adicionales

*   **Compilar para producción:** `npm run build`
*   **Verificar tipos de TypeScript:** `npm run type-check`

## Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.
