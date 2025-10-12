<script setup lang="js">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { defineComponent, h } from "vue"

// Componente de prueba, borrar despues
const Card = defineComponent({
  name: "Card",
  props: {
    currentView: String,
  },
  setup(props) {
    return () =>
      h(
        "div",
        { class: "border rounded-lg shadow-sm p-4 text-center bg-white" },
        [
          h("h2", { class: "font-semibold text-lg mb-2" }, `Card (${props.currentView})`),
          h("p", { class: "text-gray-600 text-sm" }, "Contenido de prueba."),
        ]
      )
  },
})
</script>

<template>
  <div class="border rounded-md p-4 flex flex-col gap-4 items-center">
    <Tabs defaultValue="promedio" class="w-full">
      <TabsList class="w-full">
        <TabsTrigger value="promedio" class="cursor-pointer"
          >Promedio</TabsTrigger
        >
        <TabsTrigger value="desviacion" class="cursor-pointer"
          >Desviación</TabsTrigger
        >
        <TabsTrigger value="varianza" class="cursor-pointer"
          >Varianza</TabsTrigger
        >
      </TabsList>

      <TabsContent value="promedio" class="w-full">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <Card currentView="promedio" />
          <Card currentView="promedio" />
          <Card currentView="promedio" />
          <Card currentView="promedio" />
        </div>
      </TabsContent>

      <TabsContent value="desviacion" class="w-full">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <Card currentView="desviacion" />
          <Card currentView="desviacion" />
          <Card currentView="desviacion" />
          <Card currentView="desviacion" />
        </div>
      </TabsContent>

      <TabsContent value="varianza" class="w-full">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <Card currentView="varianza" />
          <Card currentView="varianza" />
          <Card currentView="varianza" />
          <Card currentView="varianza" />
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>
