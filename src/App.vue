<script setup lang="ts">
  import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navbar />

    <main class="container mx-auto px-4 md:px-16 pt-24 pb-16">
      <router-view />
    </main>
  </div>
</template>
