<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Регистрация</h2>
      <form @submit.prevent="onSubmit" class="space-y-5">
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Введите email"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Пароль</label>
          <input
            v-model="password"
            type="password"
            placeholder="Введите пароль"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>
        <!-- Optional fields -->
        <div class="flex items-center">
          <input
            v-model="isActive"
            type="checkbox"
            class="mr-2"
            id="isActive"
          />
          <label for="isActive" class="text-gray-700">Активный аккаунт</label>
        </div>
        <!-- You can add similar blocks for is_superuser and is_verified if needed -->
        <button
          type="submit"
          class="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-200"
        >
          Зарегистрироваться
        </button>
      </form>
      <div v-if="errorMsg" class="mt-4 text-red-600 text-center">
        {{ errorMsg }}
      </div>
      <div v-if="successMsg" class="mt-4 text-green-600 text-center">
        {{ successMsg }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { registerUser } from '../services/auth.js'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const isActive = ref(true)
const isSuperuser = ref(false)
const isVerified = ref(false)
const router = useRouter()
const errorMsg = ref('')
const successMsg = ref('')

async function onSubmit() {
  errorMsg.value = ''
  successMsg.value = ''

  try {
    const payload = {
      email: email.value,
      password: password.value,
      is_active: isActive.value,
      is_superuser: isSuperuser.value,
      is_verified: isVerified.value
    }
    const result = await registerUser(payload)
    successMsg.value = `Регистрация успешно завершена! ID: ${result.id || ''}`
    router.push('/login')
  } catch (error) {
    if (error.response) {
      errorMsg.value = `Ошибка регистрации: ${error.response.data.detail || error.message}`
    } else {
      errorMsg.value = `Ошибка сети или сервера: ${error.message}`
    }
  }
}
</script>
  