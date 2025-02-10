<template>
    <div class="flex flex-col min-h-screen">
      <!-- Шапка (Header) -->
      <Header class="flex-shrink-0" />
      
      <!-- Главный контент (роуты) -->
      <main class="flex-grow">
        <router-view />
      </main>
      
      <!-- Подвал (Footer) -->
      <Footer class="flex-shrink-0" />
    </div>
  </template>
  
<script setup>
    import Header from '@/components/Header.vue'
    import Footer from '@/components/Footer.vue'
</script>
  