<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6 text-center">Мой Профиль</h1>
  
      <!-- Display user information -->
      <div v-if="!isEditing" class="bg-white shadow-md rounded p-6">
        <div class="space-y-2">
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Пол:</strong> {{ user.gender }}</p>
          <p><strong>Интерес:</strong> {{ user.interest }}</p>
          <p><strong>О себе:</strong> {{ user.bio }}</p>
          <p><strong>Возраст:</strong> {{ user.age }}</p>
          <div v-if="user.photo">
            <strong>Фото:</strong>
            <img :src="user.photo" alt="User photo" class="mt-2 w-20 h-20 object-cover rounded" />
          </div>
        </div>
        <button
          @click="toggleEdit"
          class="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-200"
        >
          Редактировать профиль
        </button>
      </div>
  
      <!-- Edit user information -->
      <div v-else class="bg-white shadow-md rounded p-6">
        <form @submit.prevent="handleUpdate" class="space-y-4">
          <div>
            <label class="block text-gray-700">Email:</label>
            <input
              v-model="editableUser.email"
              type="email"
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          <div>
            <label class="block text-gray-700">Пол:</label>
            <select
              v-model="editableUser.gender"
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
  
          <div>
            <label class="block text-gray-700">Интерес:</label>
            <input
              v-model="editableUser.interest"
              type="text"
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          <div>
            <label class="block text-gray-700">О себе:</label>
            <textarea
              v-model="editableUser.bio"
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>
  
          <div>
            <label class="block text-gray-700">Возраст:</label>
            <input
              v-model.number="editableUser.age"
              type="number"
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          <!-- Optional: Password field for updating password -->
          <div>
            <label class="block text-gray-700">Новый пароль (опционально):</label>
            <input
              v-model="editableUser.password"
              type="password"
              placeholder="Оставьте пустым если не менять"
              class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          <div class="flex gap-4">
            <button
              type="submit"
              class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition duration-200"
            >
              Сохранить
            </button>
            <button
              type="button"
              @click="toggleEdit"
              class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition duration-200"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  import axios from 'axios';
  
  // Current user info
  const user = reactive({
    id: 0,
    email: '',
    gender: '',
    interest: '',
    bio: '',
    age: 0,
    photo: ''
  });
  
  // Editable copy for the form
  const editableUser = reactive({
    email: '',
    gender: '',
    interest: '',
    bio: '',
    age: 0,
    password: ''
  });
  
  const isEditing = ref(false);
  
  function toggleEdit() {
    isEditing.value = !isEditing.value;
  
    // When entering edit mode, copy current user info to the editable object.
    if (isEditing.value) {
      editableUser.email = user.email;
      editableUser.gender = user.gender;
      editableUser.interest = user.interest;
      editableUser.bio = user.bio;
      editableUser.age = user.age;
      editableUser.password = '';
    }
  }
  
  async function fetchUser() {
    try {
      // Assuming token stored in localStorage; adjust the URL as needed.
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/v1/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      Object.assign(user, response.data);
    } catch (error) {
      console.error('Error fetching user:', error.response ? error.response.data : error.message);
    }
  }
  
  async function handleUpdate() {
    try {
      const token = localStorage.getItem('token');
      const payload = {
        email: editableUser.email,
        gender: editableUser.gender,
        interest: editableUser.interest,
        bio: editableUser.bio,
        age: editableUser.age,
      };
      // Include password only if provided
      if (editableUser.password) {
        payload.password = editableUser.password;
      }
      
      // If you need to update other system fields, include them here:
      // payload.is_active, payload.is_superuser, payload.is_verified, etc.
  
      // PATCH current user; adjust the URL if needed.
      const response = await axios.patch('http://localhost:8000/api/v1/users/me', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      Object.assign(user, response.data);
      isEditing.value = false;
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
    }
  }
  
  onMounted(() => {
    fetchUser();
  });
  </script>
  
  <style scoped>
  /* Additional styles can be placed here if necessary */
  </style>