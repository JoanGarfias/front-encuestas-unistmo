<template>
  <Card class="border rounded-xl shadow-sm gap-0" v-show="!checkAnswerStore.isAnswered">
    <CardHeader>
      <CardTitle class="text-2xl md:text-3xl font-semibold tracking-tight">
        Información del alumno
      </CardTitle>
      <CardDescription class="text-sm text-muted-foreground">
        Todos los campos son obligatorios.
      </CardDescription>
    </CardHeader>

    <CardContent class="p-6 md:p-8">
      <form class="grid gap-6" ref="formRef">
        <!-- Correo y nombre -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="grid w-full items-center gap-2">
            <Label for="email" class="text-sm font-medium">Correo</Label>
            <Input
              id="email" name="email" type="email" placeholder="Correo" class="w-full"
              :class="{'border-red-500': !!errors.email}"
            />
            <p class="text-xs mt-1 h-4 transition-opacity"
               :class="errors.email ? 'text-red-500 opacity-100' : 'opacity-0 pointer-events-none'">
              {{ errors.email || ' ' }}
            </p>
          </div>

          <div class="grid w-full items-center gap-2">
            <Label for="name" class="text-sm font-medium">Nombre</Label>
            <Input
              id="name" name="name" type="text" placeholder="Nombre" class="w-full"
              :class="{'border-red-500': !!errors.name}"
            />
            <p class="text-xs mt-1 h-4"
               :class="errors.name ? 'text-red-500' : 'opacity-0 pointer-events-none'">
              {{ errors.name || ' ' }}
            </p>
          </div>
        </div>

        <!-- Sexo y edad -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="grid w-full items-center gap-2">
            <Label class="text-sm font-medium">Sexo</Label>
            <!-- Solo añadí name (quitando el default-value heredado del ejemplo) -->
            <RadioGroup name="sexo" class="flex flex-wrap gap-4">
              <div class="flex items-center gap-2" v-for="sexo in sexos" :key="sexo.value">
                <RadioGroupItem :id="sexo.value" :value="sexo.value" />
                <Label :for="sexo.value">{{ sexo.label }}</Label>
              </div>
            </RadioGroup>
            <p class="text-xs mt-1 h-4"
               :class="errors.sexo ? 'text-red-500' : 'opacity-0 pointer-events-none'">
              {{ errors.sexo || ' ' }}
            </p>
          </div>

          <div class="grid w-full items-center gap-2">
            <Label for="age" class="text-sm font-medium">Edad</Label>
            <Input
              id="age" name="age" type="number" placeholder="Edad" class="w-full"
              min="18" max="60" step="1"
              :class="{'border-red-500': !!errors.age}"
            />
            <p class="text-xs mt-1 h-4"
               :class="errors.age ? 'text-red-500' : 'opacity-0 pointer-events-none'">
              {{ errors.age || ' ' }}
            </p>
          </div>
        </div>

        <!-- Carrera y semestre -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="grid w-full items-center gap-2">
            <Label for="carrera" class="text-sm font-medium">Carrera</Label>
            <!-- Select necesita v-model; lo mínimo: 2 refs -->
            <Select v-model="carrera" class="w-full">
              <SelectTrigger class="w-full" :class="{'border-red-500': !!errors.carrera}">
                <SelectValue placeholder="Selecciona tu carrera" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Carreras</SelectLabel>
                  <SelectItem v-for="c in carreras" :key="c.value" :value="c.value">
                    {{ c.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p class="text-xs mt-1 h-4"
               :class="errors.carrera ? 'text-red-500' : 'opacity-0 pointer-events-none'">
              {{ errors.carrera || ' ' }}
            </p>
          </div>

          <div class="grid w-full items-center gap-2">
            <Label for="semestre" class="text-sm font-medium">Semestre</Label>
            <Select v-model="semestre" class="w-full">
              <SelectTrigger class="w-full" :class="{'border-red-500': !!errors.semestre}">
                <SelectValue placeholder="Selecciona tu semestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Semestres</SelectLabel>
                  <SelectItem v-for="s in semestres" :key="s.value" :value="s.value">
                    {{ s.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p class="text-xs mt-1 h-4"
               :class="errors.semestre ? 'text-red-500' : 'opacity-0 pointer-events-none'">
              {{ errors.semestre || ' ' }}
            </p>
          </div>
        </div>

        <!-- Promedio y tiempo de traslado -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="grid w-full items-center gap-2">
            <Label for="promedio" class="text-sm font-medium">Promedio anterior</Label>
            <Input
              id="promedio" name="promedio" type="number" placeholder="Promedio anterior" class="w-full"
              min="0" max="10" step="0.1"
              :class="{'border-red-500': !!errors.promedio}"
            />
            <p class="text-xs mt-1 h-4"
               :class="errors.promedio ? 'text-red-500' : 'opacity-0 pointer-events-none'">
              {{ errors.promedio || ' ' }}
            </p>
          </div>

          <div class="grid w-full items-start gap-2">
            <Label for="tiempo" class="text-sm font-medium">Tiempo de traslado de casa a la universidad</Label>
            <Input
              id="tiempo" name="tiempo" type="number" placeholder="En minutos" class="w-full"
              min="0" max="500" step="1"
              :class="{'border-red-500': !!errors.tiempo}"
            />
            <p class="text-xs mt-1 h-4"
               :class="errors.tiempo ? 'text-red-500' : 'opacity-0 pointer-events-none'">
              {{ errors.tiempo || ' ' }}
            </p>
          </div>
        </div>

        <!-- Trabajo y gasto mensual -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="grid w-full items-center gap-2">
            <Label class="text-sm font-medium">¿Trabajas?</Label>
            <RadioGroup name="trabaja" class="flex flex-wrap gap-4">
              <div class="flex items-center gap-2">
                <RadioGroupItem id="si-trabaja" value="si" />
                <Label for="si-trabaja">Si</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroupItem id="no-trabaja" value="no" />
                <Label for="no-trabaja">No</Label>
              </div>
            </RadioGroup>
            <p class="text-xs mt-1 h-4"
               :class="errors.trabaja ? 'text-red-500' : 'opacity-0 pointer-events-none'">
              {{ errors.trabaja || ' ' }}
            </p>
          </div>

          <div class="grid w-full items-center gap-2">
            <Label for="gasto" class="text-sm font-medium">Gasto mensual</Label>
            <Input
              id="gasto" name="gasto" type="number" placeholder="Gasto mensual" class="w-full"
              min="0" step="1"
              :class="{'border-red-500': !!errors.gasto}"
            />
            <p class="text-xs mt-1 h-4"
               :class="errors.gasto ? 'text-red-500' : 'opacity-0 pointer-events-none'">
              {{ errors.gasto || ' ' }}
            </p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="grid w-full items-center gap-2">
            <Label for="peso" class="text-sm font-medium">Peso (en kilogramos)</Label>
            <Input
              id="peso" name="peso" type="number" placeholder="Peso" class="w-full"
              min="20" max="300" step="0.1"
              :class="{'border-red-500': !!errors.peso}"
            />
            <p class="text-xs mt-1 h-4"
               :class="errors.peso ? 'text-red-500' : 'opacity-0 pointer-events-none'">
              {{ errors.peso || ' ' }}
            </p>
          </div>

          <div class="grid w-full items-center gap-2">
            <Label for="altura" class="text-sm font-medium">Altura (en centimetros)</Label>
            <Input
              id="altura" name="altura" type="number" placeholder="Altura" class="w-full"
              min="80" max="250" step="0.1"
              :class="{'border-red-500': !!errors.altura}"
            />
            <p class="text-xs mt-1 h-4"
               :class="errors.altura ? 'text-red-500' : 'opacity-0 pointer-events-none'">
              {{ errors.altura || ' ' }}
            </p>
          </div>
        </div>

        <!-- Discapacidad -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="grid w-full items-center gap-2">
            <Label class="text-sm font-medium mb-2">¿Tienes alguna discapacidad?</Label>
            <RadioGroup name="discapacidad" class="flex flex-wrap gap-4">
              <div class="flex items-center gap-2">
                <RadioGroupItem id="si-discapacidad" value="si" />
                <Label for="si-discapacidad">Si</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroupItem id="no-discapacidad" value="no" />
                <Label for="no-discapacidad">No</Label>
              </div>
            </RadioGroup>
            <p class="text-xs mt-1 h-4"
               :class="errors.discapacidad ? 'text-red-500' : 'opacity-0 pointer-events-none'">
              {{ errors.discapacidad || ' ' }}
            </p>
          </div>
        </div>
      </form>
    </CardContent>

    <CardFooter class="flex justify-end gap-3 pt-4 pb-0">
      <Button class="w-full md:w-auto" @click="sendForm">
        Enviar
      </Button>
    </CardFooter>
  </Card>

  <div v-if="checkAnswerStore.isAnswered">
    Ya has respondido el formulario
  </div>

</template>

<script setup lang="ts">
// Componentes UI
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/ui/card"
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { ref, reactive, onMounted, computed } from "vue"
import { useRoute } from 'vue-router'
import { useCheckAnswerStore } from "@/stores/checkAnsStore";

const route = useRoute()
// Asumo que la ruta del formulario es '/'. Si es otra, puedes cambiarla aquí.
const isFormPage = computed(() => route.path === '/')

const formRef = ref<HTMLFormElement | null>(null);
const carrera = ref<string | null>(null);
const semestre = ref<string | null>(null);
const errors = reactive<Record<string, string>>({});
const checkAnswerStore = useCheckAnswerStore()

// Validaciones
const rules: Record<string, (v: any) => string> = {
  email: (v) => /^[^ -]+@[^ -]+\.[^ -]+$/.test(v) ? "" : "Ingresa un correo válido.",
  name:  (v) => {
    if (!v) return "El nombre es obligatorio.";
    if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' .-]+$/.test(v)) return "Solo letras y espacios.";
    if (v.trim().length < 2) return "Mínimo 2 caracteres.";
    return "";
  },
  sexo:  (v) => v ? "" : "Selecciona tu sexo.",
  age:   (v) => { const n=Number(v); return Number.isInteger(n)&&n>=15&&n<=80 ? "" : "Edad obligatoria."; },
  carrera: () => carrera.value ? "" : "Selecciona tu carrera.",
  semestre: () => semestre.value ? "" : "Selecciona tu semestre.",
  promedio: (v) => { const n=Number(v); return !Number.isNaN(n)&&n>=0&&n<=10 ? "" : "Promedio entre 0 y 10."; },
  tiempo:   (v) => { const n=Number(v); return Number.isInteger(n)&&n>=0&&n<=300 ? "" : "En minutos."; },
  trabaja:  (v) => v ? "" : "Indica si trabajas.",
  gasto:    (v) => { const n=Number(v); return !Number.isNaN(n)&&n>=0 ? "" : "Gasto mensual debe ser 0 o mayor."; },
  peso:     (v) => { const n=Number(v); return !Number.isNaN(n)&&n>20&&n<=300 ? "" : "Peso obligatorio."; },
  altura:   (v) => { const n=Number(v); return Number.isInteger(n)&&n>80&&n<=250 ? "" : "Altura obligatoria."; },
  discapacidad: (v) => v ? "" : "Indica si tienes alguna discapacidad.",
};


// Helpers
function getVal(fd: FormData, key: string) {
  if (key === "carrera") return carrera.value ?? "";
  if (key === "semestre") return semestre.value ?? "";
  return (fd.get(key) ?? "").toString().trim();
}

function validateOne(name: string) {
  const fd = new FormData(formRef.value!);
  const err = rules[name]?.(getVal(fd, name)) ?? "";
  errors[name] = err;
  return !err;
}

function validateAll() {
  const fd = new FormData(formRef.value!);
  let ok = true;

  for (const [k, fn] of Object.entries(rules) as [keyof typeof rules, (v:any)=>string][]) {
    const e = fn(getVal(fd, String(k)));
    errors[String(k)] = e;
    if (e) ok = false;
  }

  return ok;
}

// arriba de onMounted
const nonNegativeFields = new Set(['age','tiempo','gasto','promedio','peso','altura']);
const integerFields     = new Set(['tiempo','altura', 'age']);

onMounted(() => {
  const form = formRef.value!;

  form.addEventListener('keydown', (e) => {
    const t = e.target as HTMLInputElement | null;
    if (!t || t.type !== 'number' || !t.name) return;

    if (nonNegativeFields.has(t.name) && ['.','-','+','e','E'].includes(e.key)) {
      e.preventDefault();
    }
    // en enteros, bloquear también "." y ","
    if (integerFields.has(t.name) && (e.key === '.' || e.key === ',')) {
      e.preventDefault();
    }

    if (!t || t.type !== 'number') return;
    const k = e.key;
    if (['-','+','e','E'].includes(k)) { e.preventDefault(); return; }
    if (integerFields.has(t.name) && (k === '.' || k === ',')) e.preventDefault();
  }, true);

  form.addEventListener('input', (e) => {
    const t = e.target as HTMLInputElement | null;
    if (!t || !t.name) return;

    if (t.name === 'name') {
      t.value = t.value
        .replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ' .-]/g, '')
        .replace(/\s{2,}/g, ' ')
        .trimStart();
      if (errors.name) validateOne('name');
      return;
    }

    if (t.type === 'number' && integerFields.has(t.name)) {
      let n = Number(t.value);

      if (!Number.isFinite(n)) {
        t.value = '';
        return;
      }

      t.value = String(Math.trunc(Math.max(0, n)));
    }
  
    if (errors[t.name]) {
      validateOne(t.name);
    }
  }, true);

  form.addEventListener("blur", (ev) => {
    const t = ev.target as HTMLInputElement | null;
    const name = t?.name;
    if (name && rules[name]) validateOne(name);
  }, true);
});



const sendForm = () => {
  if (!validateAll()) {
    const first = Object.keys(errors).find(k => errors[k]);
    if (first) document.getElementsByName(first)[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  console.log("Formulario enviado (válido) ✔️");
  checkAnswerStore.checkAnswer();
}

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
  { value: "Lic. En Matemáticas Aplicadas", label: "Lic. En Matemáticas Aplicadas" },
  { value: "Ing. En Energías Renovables", label: "Ing. En Energías Renovables" },
]

const semestres = [
  { value: "1", label: "1°" },
  { value: "3", label: "3°" },
  { value: "5", label: "5°" },
  { value: "7", label: "7°" },
  { value: "9", label: "9°" },
]
</script>
