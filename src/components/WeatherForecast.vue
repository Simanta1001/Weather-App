<script setup>
defineProps({
  day: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="mb-2 flex items-center justify-between">
    <table class="w-full">
      <tbody>
        <tr>
          <!-- Day of the week -->
          <td class="w-1/3">
            {{ new Date(day.date).toLocaleDateString('en-us', { weekday: 'long' }) }}
          </td>

          <!-- Icon -->
          <td class="w-1/3">
            <img :src="day.day.condition.icon" alt="icon" width="30" class="mx-auto" />
          </td>

          <!-- High/Low Temperature -->
          <td class="w-1/3 text-right">
            <div class="flex flex-col items-end space-y-1">
              <span class="whitespace-nowrap">
                <strong>Max:</strong> {{ Math.round(day.day.maxtemp_c) }}&deg;C /
                {{ Math.round(day.day.maxtemp_f) }}&deg;F
              </span>
              <span class="whitespace-nowrap">
                <strong>Min:</strong> {{ Math.round(day.day.mintemp_c) }}&deg;C /
                {{ Math.round(day.day.mintemp_f) }}&deg;F
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
