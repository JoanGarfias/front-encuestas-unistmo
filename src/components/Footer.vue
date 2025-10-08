<script setup lang="ts">
    //UI
    import {
        HoverCard,
        HoverCardContent,
        HoverCardTrigger,
    } from '@/components/ui/hover-card'
</script>

<template>
    <footer>
        <div class="w-full border-t p-4">
            <p class="text-xs text-muted-foreground text-center">© 2025 Universidad del Istmo. Todos los derechos reservados.</p>
            <p class="text-xs text-muted-foreground text-center">Desarrollado por el
                <HoverCard>
                    <HoverCardTrigger class="cursor-pointer">Grupo 704</HoverCardTrigger>
                    <HoverCardContent class="text-muted-foreground text-xs">
                        Christian Hernández Mares, <br/> 
                        Joan Pablo Alvarado Garfias, <br/> 
                        Jairo Iván Hipolito Morales, <br/> 
                        Juan Emmanuel Becerril Nolasco, <br/>
                        Victor Manuel Antonio Fuentes, <br/> 
                        Isacar Jiménez Charis y <br/>
                        Valery Rodriguez Trejo.
                    </HoverCardContent>
                </HoverCard> 
                de la carrera de Ingeniería en Computación.
            </p>
        </div>       
    </footer>
</template>