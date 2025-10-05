<template>
  <Card class="border rounded-xl shadow-sm gap-0">
    <CardHeader>
      <CardTitle class="text-2xl md:text-3xl font-semibold tracking-tight"
        >Información del alumno</CardTitle
      >
      <CardDescription class="text-sm text-muted-foreground">
        Todos los campos son obligatorios.
      </CardDescription>
    </CardHeader>

    <CardContent class="p-6 md:p-8">
      <form class="grid gap-6">
        <!-- Correo y nombre -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="grid w-full items-center gap-2">
            <Label for="email" class="text-sm font-medium">Correo</Label>
            <Input
              id="email"
              type="email"
              placeholder="Correo"
              class="w-full"
            />
          </div>
          <div class="grid w-full items-center gap-2">
            <Label for="name" class="text-sm font-medium">Nombre</Label>
            <Input id="name" type="text" placeholder="Nombre" class="w-full" />
          </div>
        </div>

        <!-- Sexo y edad -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="grid w-full items-center gap-2">
            <Label for="gender" class="text-sm font-medium">Sexo</Label>
            <RadioGroup
              default-value="comfortable"
              class="flex flex-wrap gap-4"
            >
              <div class="flex items-center gap-2" v-for="sexo in sexos">
                <RadioGroupItem :id="sexo.value" :value="sexo.value" />
                <Label :for="sexo.value">{{ sexo.label }}</Label>
              </div>
            </RadioGroup>
          </div>
          <div class="grid w-full items-center gap-2">
            <Label for="age" class="text-sm font-medium">Edad</Label>
            <Input id="age" type="number" placeholder="Edad" class="w-full" />
          </div>
        </div>

        <!-- Carrera y semestre -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="grid w-full items-center gap-2">
            <Label for="carrera" class="text-sm font-medium">Carrera</Label>
            <Select class="w-full">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Selecciona tu carrera" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Carreras</SelectLabel>
                  <SelectItem
                    v-for="carrera in carreras"
                    :key="carrera.value"
                    :value="carrera.value"
                  >
                    {{ carrera.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="grid w-full items-center gap-2">
            <Label for="semestre" class="text-sm font-medium">Semestre</Label>
            <Select class="w-full">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Selecciona tu semestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Semestres</SelectLabel>
                  <SelectItem
                    v-for="semestre in semestres"
                    :key="semestre.value"
                    :value="semestre.value"
                  >
                    {{ semestre.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Promedio y tiempo de traslado -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="grid w-full items-center gap-2">
            <Label for="promedio" class="text-sm font-medium"
              >Promedio anterior</Label
            >
            <Input
              id="promedio"
              type="number"
              placeholder="Promedio anterior"
              class="w-full"
            />
          </div>
          <div class="grid w-full items-start gap-2">
            <Label for="tiempo" class="text-sm font-medium"
              >Tiempo de traslado de casa a la universidad</Label
            >
            <Input
              id="tiempo"
              type="number"
              placeholder="Tiempo de traslado"
              class="w-full"
            />
          </div>
        </div>

        <!-- Trabajo y gasto mensual -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="grid w-full items-center gap-2">
            <Label for="gender" class="text-sm font-medium">¿Trabajas?</Label>
            <RadioGroup
              default-value="comfortable"
              class="flex flex-wrap gap-4"
            >
              <div class="flex items-center gap-2">
                <RadioGroupItem id="si-trabaja" value="si" />
                <Label for="si-trabaja">Si</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroupItem id="no-trabaja" value="no" />
                <Label for="no-trabaja">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div class="grid w-full items-center gap-2">
            <Label for="gasto" class="text-sm font-medium">Gasto mensual</Label>
            <Input
              id="gasto"
              type="number"
              placeholder="Gasto mensual"
              class="w-full"
            />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="grid w-full items-center gap-2">
            <Label for="peso" class="text-sm font-medium"
              >Peso (en kilogramos)</Label
            >
            <Input id="peso" type="number" placeholder="Peso" class="w-full" />
          </div>
          <div class="grid w-full items-center gap-2">
            <Label for="altura" class="text-sm font-medium"
              >Altura (en centimetros)</Label
            >
            <Input
              id="altura"
              type="number"
              placeholder="Altura"
              class="w-full"
            />
          </div>
        </div>

        <!-- Discapacidad -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="grid w-full items-center gap-2">
            <Label for="discapacidad" class="text-sm font-medium mb-2"
              >¿Tienes alguna discapacidad?</Label
            >
            <RadioGroup
              default-value="comfortable"
              class="flex flex-wrap gap-4"
            >
              <div class="flex items-center gap-2">
                <RadioGroupItem id="si-discapacidad" value="si" />
                <Label for="si-discapacidad">Si</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroupItem id="no-discapacidad" value="no" />
                <Label for="no-discapacidad">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </form>
    </CardContent>

    <CardFooter class="flex justify-end gap-3 pt-4 pb-0">
      <Button class="w-full md:w-auto">Enviar</Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
// Componentes UI
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Datos
const sexos = [
  { value: "Masculino", label: "Masculino" },
  { value: "Femenino", label: "Femenino" },
  { value: "Otro", label: "Otro" },
]

const carreras = [
  { value: "Ing. Química", label: "Ing. Química" },
  { value: "Ing. En Petróleos", label: "Ing. En Petróleos" },
  { value: "Ing. En Diseño", label: "Ing. En Diseño" },
  { value: "Ing. En Computación", label: "Ing. En Computación" },
  {
    value: "Lic. En Matemáticas Aplicadas",
    label: "Lic. En Matemáticas Aplicadas",
  },
  {
    value: "Ing. En Energías Renovables",
    label: "Ing. En Energías Renovables",
  },
]

const semestres = [
  { value: "1", label: "1°" },
  { value: "3", label: "3°" },
  { value: "5", label: "5°" },
  { value: "7", label: "7°" },
  { value: "9", label: "9°" },
]
</script>
