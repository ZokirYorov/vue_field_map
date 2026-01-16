<template>
  <header class="flex justify-around p-6 dark:bg-gray-800 dark:text-gray-300 bg-gray-50 text-white shadow border-b border-gray-600">
    <div class="font-bold items-center flex">
      <img src="@/assets/icons/img_1.png" class="w-30 rounded-2xl" alt="">
    </div>
    <div class="flex gap-4 text-xl items-center">
      <button></button>
      <router-link to="/login" class="hover:text-blue-600">Login</router-link>
      <router-link to="/register" class="hover:text-blue-600">Register</router-link>
    </div>
  </header>
</template>
<script setup lang="ts">
</script>
