<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-pink-700">
    <!-- Navigation -->
    <nav class="p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-4xl font-bold text-white">Dating</div>
        <div class="flex gap-4">
          <button class="px-6 py-2 rounded-full bg-transparent border border-pink-400 text-white hover:bg-pink-500 transition-all">
            <router-link to="/register">Register</router-link>
          </button>
          <button class="px-6 py-2 rounded-full bg-transparent border border-pink-400 text-white hover:bg-pink-500 transition-all">
            <router-link to="/login">Login</router-link>
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-16">
      <!-- Main Circle Animation -->
      <div class="relative flex justify-center mb-20">
        <div class="w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 to-pink-500 animate-pulse 
                    shadow-[0_0_50px_rgba(219,39,119,0.5)] flex items-center justify-center">
          <div class="w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 to-pink-600 animate-pulse"></div>
        </div>
      </div>

      <!-- Feature Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mt-20">
        <div v-for="(feature, index) in features" :key="index" 
             class="flex flex-col items-center text-center p-6">
          <div class="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                      flex items-center justify-center mb-4">
            <span class="text-white text-3xl">{{ feature.icon }}</span>
          </div>
          <h3 class="text-white text-xl font-bold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-300 text-sm">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-center gap-6 mt-16">
        <button class="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                       text-white font-bold hover:opacity-90 transition-all">
          <router-link to="/register">Register</router-link>
        </button>
        <button class="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 
                       text-white font-bold hover:opacity-90 transition-all">
          How to Join
        </button>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute bottom-0 left-0 w-full">
        <div class="h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const features = [
  {
    icon: "?",
    title: "Steps to start",
    description: "Create your profile and start your journey to find your perfect match"
  },
  {
    icon: "?",
    title: "How this works",
    description: "Browse through profiles and connect with people who share your interests"
  },
  {
    icon: "❤️",
    title: "Find Love",
    description: "Build meaningful relationships in a safe and friendly environment"
  },
  {
    icon: "✨",
    title: "Register",
    description: "Join our community today and start your journey to finding love"
  }
];
</script>

<style scoped>
/* Add custom animations */
@keyframes glow {
  0% { box-shadow: 0 0 5px rgba(219,39,119,0.5); }
  50% { box-shadow: 0 0 20px rgba(219,39,119,0.8); }
  100% { box-shadow: 0 0 5px rgba(219,39,119,0.5); }
}

.animate-glow {
  animation: glow 2s infinite;
}
</style>