<template>
    <header class="app-header">
      <nav class="flex items-center justify-between">
        <div class="logo">DatingApp</div>
        <ul class="menu flex gap-4">
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/swipe">Свайп</router-link></li>
          <li><router-link to="/profile">Профиль</router-link></li>
        </ul>
        <div class="auth-buttons flex gap-4">
          <template v-if="!isAuthenticated">
            <router-link
              to="/login"
              class="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded transition duration-200"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded transition duration-200"
            >
              Register
            </router-link>
          </template>
          <template v-else>
            <button
              @click="logout"
              class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded transition duration-200"
            >
              Logout
            </button>
          </template>
        </div>
      </nav>
    </header>
  </template>
  
<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { isAuthenticated, clearToken } from '../composable/auth';

const router = useRouter();

async function logout() {
  const localToken = localStorage.getItem('token');
  try {
    // Call the backend logout endpoint:
    const response = await axios.post('http://localhost:8000/api/v1/auth/logout', '', {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${localToken}`,
      }
    });
    console.log('Logged out successfully:', response.data);
  } catch (err) {
    console.error('Error logging out:', err.response ? err.response.data : err.message);
  } finally {
    clearToken();
    router.push('/');
  }
}
</script>
  
<style scoped>
  .app-header {
    background: #fff;
    border-bottom: 1px solid #eee;
    padding: 16px;
  }
  
  .logo {
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .menu {
    list-style: none;
    display: flex;
    gap: 16px;
  }
  
  .menu li {
    cursor: pointer;
  }
</style>
  