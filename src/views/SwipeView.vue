<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Reactive variable for an array of suggestions
const suggestion = ref([])

// Computed property to always use the first suggestion in the array
const currentSuggestion = computed(() => suggestion.value.length ? suggestion.value[0] : null)

// Function to fetch suggestions for swipe from the provided endpoint
async function fetchSuggestion() {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:8000/api/v1/matches/suggestion', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    // Expecting an array from the backend
    suggestion.value = response.data
  } catch (error) {
    console.error('Error fetching suggestion:', error.response ? error.response.data : error.message)
    suggestion.value = []
  }
}

// Handler for the "Like" action
async function handleLike() {
  if (!currentSuggestion.value) return;
  
  console.log('Liked user:', currentSuggestion.value)
  // Extract the matched user's id from the current suggestion
  const matchedUserId = currentSuggestion.value.id;

  // Send a POST request to the like endpoint
  try {
    await axios.post(`http://localhost:8000/api/v1/matches/${matchedUserId}`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'accept': 'application/json'
      }
    });
    console.log('Successfully sent like for user:', matchedUserId)
  } catch (error) {
    console.error('Error sending like request:', error.response ? error.response.data : error.message);
  }
  
  // Remove the first suggestion and fetch further suggestions if needed
  suggestion.value.shift();
  if (suggestion.value.length === 0) {
    await fetchSuggestion();
  }
}

// Handler for the "Dislike" action
async function handleDislike() {
  console.log('Disliked user:', currentSuggestion.value)
  // Remove the first suggestion without sending any request
  suggestion.value.shift();
  if (suggestion.value.length === 0) {
    await fetchSuggestion();
  }
}

onMounted(() => {
  fetchSuggestion()
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div v-if="currentSuggestion" class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <!-- Display user photo if available -->
      <img
        v-if="currentSuggestion.photo"
        :src="currentSuggestion.photo"
        alt="User Photo"
        class="w-full h-48 object-cover"
      />
      <div class="p-4">
        <!-- User basic info -->
        <h2 class="text-xl font-semibold text-gray-800">{{ currentSuggestion.email }}</h2>
        <p class="text-gray-600">Возраст: {{ currentSuggestion.age }}</p>
        <p class="text-gray-600">Пол: {{ currentSuggestion.gender }}</p>
        <p class="text-gray-600">Интерес: {{ currentSuggestion.interest }}</p>
        <p class="text-gray-700 mt-2">{{ currentSuggestion.bio }}</p>
      </div>
      <!-- Like and Dislike buttons -->
      <div class="flex justify-around p-4 border-t">
        <button
          @click="handleDislike"
          class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition duration-200"
        >
          Dislike
        </button>
        <button
          @click="handleLike"
          class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition duration-200"
        >
          Like
        </button>
      </div>
    </div>
    <!-- Loading message while suggestion array is empty -->
    <div v-else class="text-center text-gray-700">
      Loading...
    </div>
  </div>
</template>

<style scoped>
/* Additional styling can be added here if needed */
</style>