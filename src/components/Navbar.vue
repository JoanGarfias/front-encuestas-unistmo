<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';

    //COMPONENTS
    import Theme from './Theme.vue';
    //ICONS
    import { ChartColumn } from 'lucide-vue-next';
    import { ClipboardList } from 'lucide-vue-next';
    import { Menu } from 'lucide-vue-next';
    import { X } from 'lucide-vue-next';

    //UI
    import { Button } from "@/components/ui/button"

    //METHODS
    const isMenuOpen = ref(false);
    const menuRef = ref(null);

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
        isMenuOpen.value = false;
    };

    // Cerrar el menú al hacer clic fuera
    const handleClickOutside = (event) => {
        if (menuRef.value && !menuRef.value.contains(event.target)) {
            closeMenu();
        }
    };

    onMounted(() => {
        document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
    });
</script>

<template>
    <header>
        <nav class="w-screen py-4 px-10">
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <router-link to="/">
                        <div class="flex gap-2">
                            <span><ChartColumn /></span>
                            <p>Encuestas</p>
                        </div>
                    </router-link>
                </div>

                <!-- Desktop Menu -->
                <ul class="hidden md:flex gap-4 items-center">
                    <li>
                        <router-link to="/formulario">
                            <Button variant="outline" class="cursor-pointer">
                                <ClipboardList /> Hacer Encuesta
                            </Button>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/estadisticas">
                            <Button variant="outline" class="cursor-pointer">
                                <ClipboardList /> Resultados
                            </Button>
                        </router-link>
                    </li>
                    <li>
                        <Theme />
                    </li>
                </ul>

                <!-- Mobile Menu Button & Dropdown -->
                <div class="md:hidden relative" ref="menuRef">
                    <button @click.stop="toggleMenu" class="p-2">
                        <Menu v-if="!isMenuOpen" class="w-6 h-6 cursor-pointer" />
                        <X v-else class="w-6 h-6 cursor-pointer" />
                    </button>

                    <!-- Dropdown Menu -->
                    <Transition
                        enter-active-class="transition ease-out duration-200"
                        enter-from-class="opacity-0 scale-95"
                        enter-to-class="opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-150"
                        leave-from-class="opacity-100 scale-100"
                        leave-to-class="opacity-0 scale-95"
                    >
                        <div
                            v-if="isMenuOpen"
                            class="absolute right-0 mt-2 w-46 p-2 rounded-lg shadow-lg bg-white dark:bg-accent ring-1 ring-black ring-opacity-5 overflow-hidden z-10"
                        >
                            <ul class="py-2 flex flex-col gap-4">
                                <li class="flex justify-center">
                                    <router-link
                                        to="/formulario"
                                        @click="closeMenu"
                                        class="flex items-center gap-3"
                                    >
                                        <Button variant="outline" class="cursor-pointer">
                                            <ClipboardList /> Hacer Encuesta
                                        </Button>
                                    </router-link>
                                </li>
                                <li class="flex justify-center">
                                    <router-link
                                        to="/estadisticas"
                                        @click="closeMenu"
                                        class="flex items-center gap-3"
                                    >
                                        <Button variant="outline" class="cursor-pointer">
                                            <ClipboardList /> Estadísticas
                                        </Button>
                                    </router-link>
                                </li>
                                <li class="flex justify-center">
                                    <Theme />
                                </li>
                            </ul>
                        </div>
                    </Transition>
                </div>
            </div>
        </nav>
    </header>
</template>
