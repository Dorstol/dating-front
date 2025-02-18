<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Регистрация</h2>
      <form @submit.prevent="onSubmit" class="space-y-5">
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Имя</label>
          <input
            v-model="first_name"
            type="text"
            placeholder="Введите имя"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Фамилия</label>
          <input
            v-model="last_name"
            type="text"
            placeholder="Введите фамилию"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>
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
          <label class="block text-gray-700 text-sm font-medium mb-1">Возраст</label>
          <input
            v-model="age"
            type="text"
            placeholder="Введите ваш возраст"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Локация</label>
          <input
            v-model="location"
            type="text"
            placeholder="Введите вашу локацию"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Пол</label>
          <select
            v-model="gender"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          >
            <option disabled value="">Выберите пол</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
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

const router = useRouter()
const first_name = ref('')
const last_name = ref('')
const email = ref('')
const age = ref('')
const location = ref('')
const gender = ref('')
const password = ref('')
const errorMsg = ref('')
const successMsg = ref('')

async function onSubmit() {
  errorMsg.value = ''
  successMsg.value = ''

  try {
    const payload = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      age: 24,
      location: location.value,
      gender: gender.value,
      password: password.value,
      is_active: true,
      is_verified: false,
      is_superuser: false,
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
  