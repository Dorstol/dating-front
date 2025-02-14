<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-pink-700 p-8">
    <div class="max-w-4xl mx-auto bg-gray-900/80 rounded-3xl p-8 backdrop-blur-sm border border-purple-500/30">
      <h1 class="text-3xl font-bold text-white mb-6">Edit Profile</h1>
      <form @submit.prevent="updateProfile">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Email Field -->
          <div>
            <label class="block text-white mb-2">Email</label>
            <input
              v-model="user.email"
              type="email"
              placeholder="Email"
              class="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-pink-500"
            />
          </div>

          <!-- Gender Field -->
          <div>
            <label class="block text-white mb-2">Gender</label>
            <select
              v-model="user.gender"
              class="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-pink-500"
            >
              <option disabled value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <!-- Age Field -->
          <div>
            <label class="block text-white mb-2">Age</label>
            <input
              v-model="user.age"
              type="number"
              placeholder="Age"
              class="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-pink-500"
            />
          </div>

          <!-- Location Field -->
          <div>
            <label class="block text-white mb-2">Location</label>
            <input
              v-model="user.location"
              type="text"
              placeholder="Location"
              class="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-pink-500"
            />
          </div>

          <!-- Interest Field -->
          <div class="md:col-span-2">
            <label class="block text-white mb-2">Interest</label>
            <input
              v-model="user.interest"
              type="text"
              placeholder="What are you interested in?"
              class="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-pink-500"
            />
          </div>

          <!-- Bio Field -->
          <div class="md:col-span-2">
            <label class="block text-white mb-2">Bio</label>
            <textarea
              v-model="user.bio"
              rows="4"
              placeholder="Write something about yourself"
              class="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-pink-500"
            ></textarea>
          </div>

          <!-- Profile Photo Field -->
          <div class="md:col-span-2">
            <label class="block text-white mb-2">Profile Photo</label>
            <input
              type="file"
              @change="handlePhotoUpload"
              class="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-8">
          <button
            type="submit"
            class="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-bold hover:opacity-90 transition-all"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = reactive({
  email: '',
  gender: '',
  interest: '',
  bio: '',
  age: 0,
  photo: '',
  location: ''
})

async function fetchUser() {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:8000/api/v1/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    Object.assign(user, response.data)
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}

onMounted(() => {
  fetchUser()
})

function updateProfile() {
  const token = localStorage.getItem('token')
  axios.patch('http://localhost:8000/api/v1/users/me', user, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    console.log('Profile updated successfully:', response.data)
    // Redirect to the profile view after a successful update.
    router.push('/profile')
  })
  .catch(error => {
    console.error('Error updating profile:', error)
  })
}

function handlePhotoUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const formData = new FormData()
    formData.append('photo', file)
    const token = localStorage.getItem('token')
    axios.post('http://localhost:8000/api/v1/users/me/upload_photo', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      // Assuming the server returns the URL of the uploaded photo
      user.photo = response.data.photo
    })
    .catch(error => {
      console.error('Error uploading photo:', error.response ? error.response.data : error.message)
    })
  }
}
</script>

<style scoped>
/* Add any additional component-specific styles here if necessary */
</style> 