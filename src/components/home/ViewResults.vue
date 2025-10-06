<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    //COMPONENTS
    import Navbar from '../Navbar.vue';
    import Content from './Content.vue';

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

    //METHODS
    const value = ref<string[]>([])
    const correctPassword = "70722"
    const error = ref("")
    const router = useRouter()

    const validatePassword = () => {
        const pin = value.value.join("")
        if (pin === correctPassword) {
            error.value = ""
            router.push("/estadisticas") 
            value.value = []
        } else {
            error.value = "Contraseña inválida"
        }
    }
</script>

<template>
    <Dialog>
        <DialogTrigger>
            <Button variant="outline" class="cursor-pointer">
                <ChartNoAxesColumn /> Ver Resultados
            </Button>
        </DialogTrigger>

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
                <Button @click="validatePassword" class="cursor-pointer">Aceptar</Button>
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