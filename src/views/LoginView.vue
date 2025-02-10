<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Вход</h2>
      <form @submit.prevent="onLogin" class="space-y-5">
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Введите ваш email"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Пароль</label>
          <input
            v-model="password"
            type="password"
            placeholder="Введите ваш пароль"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-200"
        >
          Войти
        </button>
      </form>
      <div v-if="errorMsg" class="mt-4 text-red-600 text-center font-semibold">
        {{ errorMsg }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '../services/auth.js'
import { setToken } from '../composable/auth.js'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const router = useRouter()

async function onLogin() {
  errorMsg.value = ''
  try {
    const creds = {
      username: email.value,
      password: password.value
    }
    const { access_token, token_type } = await loginUser(creds)
    // Update reactive token state
    setToken(access_token)
    console.log(`Logged in! Token: ${access_token}, Type: ${token_type}`)
    router.push('/profile')
  } catch (err) {
    if (err.response) {
      errorMsg.value = `Ошибка авторизации: ${err.response.data.detail || err.message}`
    } else {
      errorMsg.value = `Ошибка сети или сервера: ${err.message}`
    }
  }
}
</script>