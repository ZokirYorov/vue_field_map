<template>
  <div class="flex justify-between rounded-xl shadow-2xl bg-gray-100 cursor-pointer">
    <div class="flex flex-col p-4"
    >
      <h3 class="font-semibold">{{ field.name }}</h3>
      <p class="text-sm text-gray-500">{{ field.city }}</p>
      <p>{{field.workTime}}</p>
      <p>{{field.surface}}</p><br>
      <p>{{field.sports}}</p>
      <p class="text-green-600 font-bold">
        {{ field.price }} so'm / soat
      </p>ddd
    </div>
    <img class="min-w-[200px] max-w-[300px] rounded-r-xl" :src="field.image" alt="">
  </div>
</template>

<script setup>
defineProps({ field: Object })
</script>
