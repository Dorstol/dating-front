<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-pink-700 flex items-center justify-center p-8">
    <div
      v-if="currentSuggestion"
      :class="[
        'card-container w-full max-w-sm bg-gray-900/80 rounded-3xl p-6 backdrop-blur-sm border border-purple-500/30',
        cardAnimationClass
      ]"
    >
      <!-- Display user photo if available -->
      <img
        v-if="currentSuggestion.photo"
        :src="`http://localhost:8000/static/photos/${currentSuggestion.photo}`"
        alt="User Photo"
        class="w-full h-64 object-cover rounded-3xl"
      />
      <!-- User details -->
      <div class="mt-4">
        <h2 class="text-2xl font-bold text-white">{{ currentSuggestion.email }}</h2>
        <p class="text-white mt-2">Age: {{ currentSuggestion.age }}</p>
        <p class="text-white">Gender: {{ currentSuggestion.gender }}</p>
        <p class="text-white">Interest: {{ currentSuggestion.interest }}</p>
        <p class="text-gray-300 mt-2">{{ currentSuggestion.bio }}</p>
      </div>
      <!-- Like and Dislike buttons -->
      <div class="flex justify-around mt-6">
        <button
          @click="handleDislike"
          class="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full text-white font-bold hover:opacity-90 transition-all"
        >
          Dislike
        </button>
        <button
          @click="handleLike"
          class="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full text-white font-bold hover:opacity-90 transition-all"
        >
          Like
        </button>
      </div>
    </div>
    <!-- Loading state -->
    <div v-else class="text-center text-white">
      Loading...
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter();

// Reactive variable for an array of suggestions
const suggestion = ref([])

// Reactive variable for card animation class
const cardAnimationClass = ref('')

// Computed property to reference the current suggestion
const currentSuggestion = computed(() =>
  suggestion.value.length ? suggestion.value[0] : null
)

// Function to fetch suggestions from the backend
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

// Handler for the "Like" action with animation
async function handleLike() {
  if (!currentSuggestion.value) return

  const matchedUserId = currentSuggestion.value.id
  // Apply slide-out-right animation
  cardAnimationClass.value = "slide-out-right"

  try {
    await axios.post(`http://localhost:8000/api/v1/matches/${matchedUserId}`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'accept': 'application/json'
      }
    })
    console.log('Successfully liked user:', matchedUserId)
  } catch (error) {
    console.error('Error sending like request:', error.response ? error.response.data : error.message)
  }
  
  // Wait for the animation to finish (0.5s) then remove the card
  setTimeout(() => {
    suggestion.value.shift()
    cardAnimationClass.value = "" // Reset animation class
    if (suggestion.value.length === 0) {
      fetchSuggestion()
    }
  }, 500)
}

// Handler for the "Dislike" action with animation
async function handleDislike() {
  if (!currentSuggestion.value) return

  // Apply slide-out-left animation
  cardAnimationClass.value = "slide-out-left"

  console.log('Disliked user:', currentSuggestion.value)
  
  // Wait for the animation to finish (0.5s) then remove the card
  setTimeout(() => {
    suggestion.value.shift()
    cardAnimationClass.value = ""
    if (suggestion.value.length === 0) {
      fetchSuggestion()
    }
  }, 500)
}

onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Redirect to login if user is not authenticated.
    router.push('/login')
  } else {
    fetchSuggestion()
  }
});
</script>

<style scoped>
@keyframes slideOutRight {
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

@keyframes slideOutLeft {
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(-100%); opacity: 0; }
}

.slide-out-right {
  animation: slideOutRight 0.5s forwards;
}

.slide-out-left {
  animation: slideOutLeft 0.5s forwards;
}
</style>