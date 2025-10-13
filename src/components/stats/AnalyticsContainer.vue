<script setup lang="js">

//ICONS
import { User } from 'lucide-vue-next';
import { GraduationCap } from 'lucide-vue-next';
import { TrendingUp } from 'lucide-vue-next';
import { Timer } from 'lucide-vue-next';
import { Wallet } from 'lucide-vue-next';
import { Weight } from 'lucide-vue-next';
import { Ruler } from 'lucide-vue-next';
import { ChartScatter } from 'lucide-vue-next';

//UI
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

// METHODS
const props = defineProps({
  datos: Object,
  loading: Boolean,
  error: String
});
</script>

<template>
  <div class="border rounded-md p-4 flex flex-col gap-4 items-center">
    <Tabs defaultValue="promedio" class="w-full">
      <TabsList class="w-full">
        <TabsTrigger value="promedio" class="cursor-pointer">
          Promedio
        </TabsTrigger>
        <TabsTrigger value="desviacion" class="cursor-pointer">
          Desviación
        </TabsTrigger>
        <TabsTrigger value="varianza" class="cursor-pointer">
          Varianza
        </TabsTrigger>
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
        <div v-if="loading" class=" flex items-center justify-center gap-2 text-center py-8">
          <Spinner /> Calculando la varianza...
        </div>
        <div v-else-if="error" class="text-red-600 text-center py-8">{{ error }}</div>
        <div v-else-if="!datos.edad_varianza" class="py-8">
          <Empty class="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ChartScatter />
              </EmptyMedia>
              <EmptyTitle>No disponible</EmptyTitle>
              <EmptyDescription>
                Aún no hay datos disponibles para realizar la varianza de cada campo.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
        <div v-else
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <Card class="gap-0">
            <CardHeader>
              <CardTitle class="flex justify-between items-center">
                Edad
                <User />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label>{{ datos.edad_varianza }} años</Label>
            </CardContent>
          </Card>

          <Card class="gap-0">
            <CardHeader>
              <CardTitle class="flex justify-between items-center">
                Semestre
                <GraduationCap />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label>{{ datos.semestre_varianza }} semestre</Label>
            </CardContent>
          </Card>

          <Card class="gap-0">
            <CardHeader>
              <CardTitle class="flex justify-between items-center">
                Promedio Anterior
                <TrendingUp />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label>{{ datos.promedio_anterior_varianza }} calificación</Label>
            </CardContent>
          </Card>

          <Card class="gap-0">
            <CardHeader>
              <CardTitle class="flex justify-between items-center">
                Tiempo de Traslado
                <Timer />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label>{{ datos.tiempo_traslado_varianza }} min<sup>2</sup></Label>
            </CardContent>
          </Card>

          <Card class="gap-0">
            <CardHeader>
              <CardTitle class="flex justify-between items-center">
                Gasto Mensual
                <Wallet />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label>$ {{ datos.gasto_mensual_varianza }}</Label>
            </CardContent>
          </Card>

          <Card class="gap-0">
            <CardHeader>
              <CardTitle class="flex justify-between items-center">
                Peso
                <Weight />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label>{{ datos.peso_varianza }} kg<sup>2</sup></Label>
            </CardContent>
          </Card>

          <Card class="gap-0">
            <CardHeader>
              <CardTitle class="flex justify-between items-center">
                Altura
                <Ruler />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label>{{ datos.altura_varianza }} cm<sup>2</sup></Label>
            </CardContent>
          </Card>

        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>