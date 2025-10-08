<script setup lang="ts">
    //ICONS
    import { ClipboardList } from 'lucide-vue-next';

    //UI
    import { Button } from "@/components/ui/button"
</script>

<template>
    <div class="flex flex-col justify-center items-center h-full gap-10">
        <div class="py-2 px-4 rounded-4xl border-2 border-accent border-solid">
            <p class="text-xs lg:text-sm">Plataforma de encuestas en tiempo real</p>
        </div>
        <div class="flex flex-col gap-2">
            <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">Recopila opiniones</h1>
            <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-muted-foreground text-center">Analiza resultados</h1>
        </div>
        <p class="text-lg lg:text-xl text-muted-foreground text-center">
            Recompilación de datos demograficos y académicos de la Universidad del Istmo Campus Tehuantepec.
        </p>
        <div class="flex gap-4">
            <router-link to="/formulario">
                <Button variant="outline" class="cursor-pointer">
                    <ClipboardList /> Hacer Encuesta
                </Button>
            </router-link>
        </div>
    </div>
</template>
