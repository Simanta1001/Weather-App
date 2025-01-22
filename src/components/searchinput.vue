<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['place-data'])

const searchinput = reactive({
  query: '',
  timeout: null,
  results: null,
})

const handleSearch = () => {
  if (searchinput.timeout) clearTimeout(searchinput.timeout) // Clear previous timeout
  searchinput.timeout = setTimeout(async () => {
    if (searchinput.query !== '') {
      const res = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=d399a316cb9d4e7f80715134251001&q=${searchinput.query}`,
      )
      const data = await res.json()
      searchinput.results = data
    } else {
      searchinput.results = null
    }
  }, 500)
}

const getweather = async (id) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=d399a316cb9d4e7f80715134251001&q=id:${id}&days=3&aqi=no&alerts=no`,
  )
  const data = await res.json()
  emit('place-data', data)
  searchinput.results = null
  searchinput.query = ''
}
</script>

<template>
  <div>
    <!-- search field -->
    <form>
      <div
        class="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 border border-blue-300 rounded-lg shadow-lg flex items-center transition duration-200 hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-300"
      >
        <!-- Search Icon -->
        <i class="fa-solid fa-magnifying-glass p-3 text-white"></i>
        <!-- Search Input -->
        <input
          type="text"
          placeholder="Search for a place"
          class="rounded-r-lg p-3 border-0 outline-none focus:ring-0 w-full text-white placeholder-white/80 bg-transparent"
          aria-label="Search for a place"
          v-model="searchinput.query"
          @input="handleSearch"
        />
      </div>
    </form>

    <!-- search suggestions -->
    <div class="bg-white my-2 rounded-lg shadow-lg">
      <div v-if="searchinput.results != null && searchinput.results.length > 0">
        <div v-for="place in searchinput.results" :key="place.id">
          <button
            @click="getweather(place.id)"
            class="px-3 my-2 hover:text-indigo-600 hover:font-bold w-full text-left"
          >
            {{ place.name }} {{ place.region }} {{ place.country }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
