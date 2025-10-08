<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { useRouter } from 'vue-router'

    //ICONS
    import { ChartNoAxesColumn } from 'lucide-vue-next';

    //UI
    import {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
    } from '@/components/ui/dialog'
    import { Button } from "@/components/ui/button"
    import {
        PinInput,
        PinInputGroup,
        PinInputSlot,
    } from "@/components/ui/pin-input"
    import { Spinner } from "@/components/ui/spinner"

    // METHODS
    import { useSessionStore } from "@/stores/sessionStore"

    const { login } = useSessionStore()
    const router = useRouter()

    const value = ref<string[]>([]);
    const error = ref("");
    const loading = ref(false);
    const open = ref(true);

    const API_URL = window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://encuesta.dxicode.com";

    const validatePassword = async () => {
        const pin = value.value.join("");

        loading.value = true;
        error.value = "";

        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: pin }),
            });

            const data = await response.json();

            if (data.code === 200) {
                error.value = "";
                value.value = [];
                console.log("Login exitoso");
                login();
            } else {
                error.value = "Contraseña inválida";
            }
        } catch (err) {
            error.value = "Error de conexión con el servidor";
            console.error("Error:", err);
        } finally {
            loading.value = false;
        }
    };

    watch(open, (value) => {
        if (!value) {
            router.push('/') 
        }
    })
</script>

<template>
    <Dialog v-model:open="open">
        <DialogContent class="w-sm">
            <DialogHeader>
                <DialogTitle>Ingresa la contraseña</DialogTitle>
                <DialogDescription>
                    <div class="flex justify-center mt-4">
                        <PinInput
                          v-model="value"
                          placeholder="○"
                        >
                            <PinInputGroup>
                                <PinInputSlot
                                  v-for="(id, index) in 5"
                                  :key="id"
                                  :index="index"
                                  type="number"
                                  :class="error ? 'border-red-600' : 'border-gray-300'"
                                />
                            </PinInputGroup>
                        </PinInput>
                    </div>
                    <p v-if="error" class="text-red-600 text-center mt-2 text-sm">{{ error }}</p>
                </DialogDescription>
            </DialogHeader>

            <DialogFooter>
                <Button @click="validatePassword" :disabled="loading" class="cursor-pointer">
                    <Spinner v-if="loading" class="w-4 h-4" />
                    <p>{{ loading ? 'Validando...' : 'Aceptar' }}</p>
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<style scoped>
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
