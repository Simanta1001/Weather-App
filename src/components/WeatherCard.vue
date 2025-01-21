<script setup>
import BorderLine from './BorderLine.vue'
import WeatherForecast from './WeatherForecast.vue'
import WeatherInfo from './WeatherInfo.vue'
import { ref } from 'vue'

defineProps({
  place: Object,
})

const Emits = defineEmits(['remove-place'])

const showDetail = ref(false)

const deletePlace = (placeName) => {
  Emits('remove-place', placeName)
  showDetail.value = false
}
</script>

<template>
  <div
    :class="place.current.is_day === 1 ? 'bg-day' : 'bg-night'"
    class="text-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg gap-6 mb-6 relative overflow-hidden max-w-lg mx-auto"
  >
    <!-- Location & time -->
    <div
      class="mb-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left"
    >
      <div class="flex items-center justify-center gap-2">
        <i class="fa-solid fa-location-dot"></i>
        <h1 class="text-xl sm:text-2xl md:text-3xl">{{ place.location.name }}</h1>
      </div>
      <div class="flex items-center justify-center gap-2 mt-2 sm:mt-0">
        <i class="fa-solid fa-clock"></i>
        <h1 class="text-xl sm:text-2xl md:text-3xl">
          {{ new Date(place.location.localtime).getHours() }}:
          {{ String(new Date(place.location.localtime).getMinutes()).padStart(2, '0') }}
        </h1>
      </div>
    </div>

    <!-- Current weather -->
    <div class="text-center flex-1">
      <img
        :src="place.current.condition.icon"
        alt="weather icon"
        class="w-24 sm:w-40 mx-auto mb-4"
      />
      <h1 class="text-2xl sm:text-3xl md:text-3xl mb-2 whitespace-nowrap">
        {{ Math.round(place.current.temp_c) }}&deg;C / {{ Math.round(place.current.temp_f) }}&deg;F
      </h1>

      <p class="text-lg sm:text-xl md:text-2xl">{{ place.current.condition.text }}</p>
    </div>

    <BorderLine />

    <!-- Forecast -->
    <div v-for="(day, idx) in place.forecast.forecastday" :key="idx" class="mt-4">
      <WeatherForecast :day="day" />
    </div>

    <!-- Info -->
    <transition name="v">
      <div v-show="showDetail">
        <WeatherInfo
          :place="place"
          @close-info="showDetail = false"
          @delete-place="deletePlace(place.location.name)"
        />
      </div>
    </transition>

    <!-- Forecast button -->
    <div class="flex justify-center sm:justify-end items-center gap-1 mt-6">
      <button @click="showDetail = true" class="text-white-500 hover:underline">
        More <i class="fa-solid fa-arrow-right text-sm -mb-px"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.bg-day {
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
}

.bg-night {
  background-color: #07223d;
  background-image: linear-gradient(62deg, #0a2a4a 0%, #270845 100%);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* Responsive tweaks */
@media (max-width: 640px) {
  .text-9xl {
    font-size: 4rem; /* Smaller heading on small screens */
  }
}
</style>
