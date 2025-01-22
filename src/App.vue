<script setup>
import { ref, onMounted } from 'vue'
import searchinput from './components/searchinput.vue'
import WeatherCard from './components/WeatherCard.vue'

const places = ref([]) // User-added places
const preloadedPlaces = ref([]) // Pre-loaded major cities
const showPreloaded = ref(true) // Flag to show/hide preloaded cities

// Add place function
const addPlace = (data) => {
  if (!places.value.some((place) => place.location.name === data.location.name)) {
    places.value.unshift(data)
  }
  showPreloaded.value = false // Hide preloaded cities once user adds a place
}

// Remove place function
const removePlace = (placeName) => {
  places.value = places.value.filter((place) => place.location.name !== placeName)
}

// Load major city weather data on mount
onMounted(async () => {
  const majorCities = ['New York', 'London', 'Tokyo', 'Sydney']
  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=d399a316cb9d4e7f80715134251001&q=${city}&days=3&aqi=no&alerts=no`,
      )
      const data = await response.json()
      preloadedPlaces.value.push(data)
    } catch (error) {
      console.error('Error fetching major city weather:', error)
    }
  }

  for (const city of majorCities) {
    await fetchWeatherData(city)
  }
})
</script>

<template>
  <main class="p-4">
    <!-- Display Current Date -->
    <div class="text-center mb-6 text-lg font-bold text-gray-700">
      {{
        new Date().toLocaleDateString('en-us', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }}
    </div>

    <!-- Search Input -->
    <div class="mb-6">
      <searchinput @place-data="addPlace" />
    </div>

    <!-- Display Preloaded Major Cities initially -->
    <div v-if="showPreloaded && preloadedPlaces.length" class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Weather in Major Cities</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherCard
          v-for="(place, idx) in preloadedPlaces"
          :key="idx"
          :place="place"
          class="min-w-[350px] w-[400px] max-w-full p-6 rounded-lg shadow-lg bg-white"
        />
      </div>
    </div>

    <!-- User-added Places -->
    <div v-if="places.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      <WeatherCard
        v-for="(place, idx) in places"
        :key="idx"
        :place="place"
        @remove-place="removePlace"
        class="min-w-[350px] w-[400px] max-w-full p-6 rounded-lg shadow-lg bg-white"
      />
    </div>
    <div v-else class="text-center text-gray-500 italic">
      No saved places yet. Add a place to see its weather details!
    </div>
  </main>
</template>
