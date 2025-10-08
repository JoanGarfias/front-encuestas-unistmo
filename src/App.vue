<script setup lang="ts">
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <Navbar />

    <main class="container mx-auto px-4 md:px-16 pt-24 pb-16 flex-grow">
      <router-view />
    </main>

    <Footer />
  </div>
</template>
