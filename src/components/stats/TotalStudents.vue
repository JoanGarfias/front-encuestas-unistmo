<script setup lang="js">
    // ICONS
    import { Users } from 'lucide-vue-next';

    // UI
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
    import { Label } from "@/components/ui/label"
    import { Spinner } from "@/components/ui/spinner"

    // METHODS
    defineProps({
    totalAlumnos: Number,
    loading: Boolean,
    error: String
    });
</script>

<template>
    <Card class="gap-0">
        <CardHeader>
            <CardTitle class="flex justify-between items-center">
                Total de Estudiantes Encuestados
                <Users />
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div v-if="loading" class="flex items-center gap-2 text-gray-400">
                <Spinner />
                Cargando...
            </div>
            <div v-else-if="error" class="text-red-600 text-sm">{{ error }}</div>
            <Label v-else-if="totalAlumnos">
                {{ totalAlumnos }} alumnos
            </Label>
            <Label v-else class="text-gray-400">
                Sin datos disponibles
            </Label>
        </CardContent>
    </Card>
</template>