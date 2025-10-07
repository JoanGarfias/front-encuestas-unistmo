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
              placeholder="En minutos"
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
      <Button
      class="w-full md:w-auto"
      @click="sendForm">
          Enviar
      </Button>
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

import { useCheckAnswerStore } from "@/stores/checkAnsStore";
const { checkAnswer } = useCheckAnswerStore();

const sendForm = () => {
  console.log("Formulario enviado");
  /*Mandar al back-end los datos recopilados
  si sale bien entonces hacer checkAnswer
  usar componentes toast para mostrar mensajes
  */

  checkAnswer();
}

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

import { onMounted } from "vue";

onMounted(() => {
  const form    = document.querySelector("form") as HTMLFormElement | null;
  const email   = document.getElementById("email")   as HTMLInputElement | null;
  const name    = document.getElementById("name")    as HTMLInputElement | null;
  const age     = document.getElementById("age")     as HTMLInputElement | null;
  const tiempo  = document.getElementById("tiempo")  as HTMLInputElement | null;
  const altura  = document.getElementById("altura")  as HTMLInputElement | null;

  const blockNonInteger = (ev: KeyboardEvent) => {
    if (["e","E","+","-",".",","].includes(ev.key)) ev.preventDefault();
  };

  const validateEmail = () => {
    if (!email) return true;
    email.setCustomValidity("");
    const v = email.value.trim();
    const ok =
      v &&
      !v.includes(",") &&
      !/\s/.test(v) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    if (!v) email.setCustomValidity("El correo es obligatorio.");
    else if (!ok) email.setCustomValidity("Ingresa un correo válido (solo uno).");
    return email.reportValidity();
  };

  const validateName = () => {
    if (!name) return true;
    name.setCustomValidity("");
    name.value = name.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
    if (!name.value.trim()) name.setCustomValidity("El nombre es obligatorio.");
    return name.reportValidity();
  };

  const validateAge = () => {
    if (!age) return true;
    age.setAttribute("min","1");
    age.setCustomValidity("");
    if (!age.value) age.setCustomValidity("La edad es obligatoria.");
    else if (!(Number(age.value) > 0)) age.setCustomValidity("La edad debe ser mayor que 0.");
    return age.reportValidity();
  };

  const validateEntero = (el: HTMLInputElement | null, label: string) => {
    if (!el) return true;
    el.setCustomValidity("");
    if (el.value === "") el.setCustomValidity(`El campo ${label.toLowerCase()} es obligatorio.`);
    else if (el.value.includes(".") || el.value.includes(",")) {
      el.setCustomValidity(`${label} debe ser un número entero.`);
    } else {
      const n = Number(el.value);
      if (!Number.isInteger(n) || n < 0) el.setCustomValidity(`${label} debe ser un entero y no negativo.`);
    }
    return el.reportValidity();
  };

  email?.addEventListener("input", validateEmail);
  name?.addEventListener("input",  validateName);

  age?.addEventListener("keydown",    blockNonInteger);
  tiempo?.addEventListener("keydown", blockNonInteger);
  altura?.addEventListener("keydown", blockNonInteger);

  tiempo?.addEventListener("input", () => validateEntero(tiempo, "Tiempo"));
  altura?.addEventListener("input", () => validateEntero(altura, "Altura"));

  form?.addEventListener("submit", (e) => {
    const ok =
      validateEmail() &&
      validateName() &&
      validateAge() &&
      validateEntero(altura, "Altura") &&
      validateEntero(tiempo, "Tiempo");
    if (!ok) e.preventDefault(); 
  });
});


</script>