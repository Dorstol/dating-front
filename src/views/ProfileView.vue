<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-pink-700 p-8">
    <!-- Main Profile Card -->
    <div class="max-w-4xl mx-auto bg-gray-900/80 rounded-3xl p-8 backdrop-blur-sm border border-purple-500/30">
      <!-- Navigation -->
      <nav class="flex justify-between items-center mb-8">
        <div class="flex space-x-6">
          <router-link to="/" class="text-white/80 hover:text-white">Home</router-link>
          <router-link to="/profile" class="text-white/80 hover:text-white">Profile</router-link>
          <router-link to="/swipe" class="text-white/80 hover:text-white">Swipe</router-link>
        </div>
        <div class="flex space-x-4">
          <!-- Logout button -->
        </div>
      </nav>

      <!-- Profile Content -->
      <div class="grid grid-cols-70/30 gap-8">
        <!-- Left Column -->
        <div class="space-y-8">
          <!-- Main Profile Section -->
          <div class="flex items-start space-x-6">
            <div class="relative">
              <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/50 relative">
                <img 
                  :src="`http://localhost:8000/static/photos/${user.photo}` || 'default-avatar.jpg'" 
                  alt="Profile"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-gray-900"></div>
            </div>
            
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-white mb-2">{{ user.email }}</h1>
              <p class="text-blue-400">User Profile</p>
              <button class="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white">
                <router-link to="/profile/edit">Edit Profile</router-link>
              </button>
            </div>
          </div>

          <!-- Status Bars -->
          <div class="space-y-4">
            <h3 class="text-white text-xl mb-4">Profile Status</h3>
            <div v-for="(stat, index) in stats" :key="index" class="space-y-2">
              <div class="flex justify-between text-white/80">
                <span>{{ stat.label }}</span>
                <span>{{ stat.value }}%</span>
              </div>
              <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-pink-500 to-blue-500"
                  :style="{ width: `${stat.value}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Status Card -->
          <div class="bg-gray-800/50 rounded-2xl p-6 border border-purple-500/30">
            <h3 class="text-white text-xl mb-4">Status</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                <span class="text-white/80">Online</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full bg-gray-500"></div>
                <span class="text-white/80">Location: {{ user.location || 'Not specified' }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="grid grid-cols-2 gap-4">
            <button class="p-4 bg-gray-800/50 rounded-xl border border-purple-500/30 text-white hover:bg-gray-700/50 transition-all">
              <span class="block text-2xl mb-2">📸</span>
              Photos
            </button>
            <button class="p-4 bg-gray-800/50 rounded-xl border border-purple-500/30 text-white hover:bg-gray-700/50 transition-all">
              <span class="block text-2xl mb-2">❤️</span>
              Likes
            </button>
            <button class="p-4 bg-gray-800/50 rounded-xl border border-purple-500/30 text-white hover:bg-gray-700/50 transition-all">
              <span class="block text-2xl mb-2">💬</span>
              Messages
            </button>
            <button class="p-4 bg-gray-800/50 rounded-xl border border-purple-500/30 text-white hover:bg-gray-700/50 transition-all">
              <span class="block text-2xl mb-2">⚙️</span>
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const user = reactive({
  email: '',
  gender: '',
  interest: '',
  bio: '',
  age: 0,
  photo: '',
  location: 'New York'
});

const stats = [
  { label: 'Profile Completion', value: 85 },
  { label: 'Activity Level', value: 65 },
  { label: 'Response Rate', value: 92 }
];

async function fetchUser() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8000/api/v1/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    Object.assign(user, response.data);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Redirect to the login page if the user isn't authenticated.
    router.push('/login');
  } else {
    fetchUser();
  }
});
</script>

<style scoped>
/* Neon glow effects */
.neon-glow {
  box-shadow: 0 0 15px rgba(219,39,119,0.5);
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

.animate-pulse {
  animation: pulse-glow 2s infinite;
}
</style>