<script setup lang="ts">
import { Loader2, Sheet } from 'lucide-vue-next';
import Button from '../ui/button/Button.vue';
import { ref } from 'vue';

const API_URL = window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://encuesta.dxicode.com";

const isLoading = ref(false);

const getFileNameFromContentDisposition = (contentDisposition: string, blob: Blob) => {
    if (!contentDisposition) return '';
    const filenameStarMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
    if (filenameStarMatch && filenameStarMatch[1]) {
        try {
            return decodeURIComponent(filenameStarMatch[1]);
        } catch (e) {
            return filenameStarMatch[1];
        }
    }

    const filenameMatch = contentDisposition.match(/filename\s*=\s*"?([^";]+)"?/i);
    if (filenameMatch && filenameMatch[1]) {
        return filenameMatch[1];
    }

    // Fallback by blob type
    if (blob && blob.type) {
        if (blob.type === 'text/csv') return 'reporte.csv';
        if (blob.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return 'reporte.xlsx';
        if (blob.type === 'application/vnd.ms-excel') return 'reporte.xls';
    }

    return 'reporte_general.csv';
};

const downloadReport = async () => {
    isLoading.value = true;

    try {
        const response = await fetch(`${API_URL}/api/descargar-excel`, {
            method: 'GET',
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Error al descargar el archivo: ${response.status} ${text}`);
        }

        const blob = await response.blob();

        const contentDisposition = response.headers.get('content-disposition') || '';
        const filename = getFileNameFromContentDisposition(contentDisposition, blob) || 'reporte_general.csv';

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    } finally {
        isLoading.value = false;
    }
};

</script>

<template>
    <div class="flex flex-col gap-3 justify-between">
        <div class="w-full flex flex-row items-center gap-2 p-4">
            <Button
                :disabled="isLoading"
                @click="downloadReport"
                :aria-busy="isLoading"
                :title="isLoading ? 'Descargando...' : 'Descargar reporte'"
                class="w-full justify-center"
            >
                <div class="flex flex-row items-center">
                    <template v-if="!isLoading">
                        <Sheet class="w-4 h-4 mr-2" aria-hidden="true" />
                        <span>Descargar Reporte</span>
                    </template>
                    <template v-else>
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                        <span>Descargando...</span>
                        <span class="sr-only">Descargando reporte...</span>
                    </template>
                </div>
            </Button>
        </div>
    </div>
</template>
