<template>
  <header class="flex justify-around p-6 bg-gray-800 text-white shadow">
    <div class="font-bold items-center flex">
      <img src="@/assets/icons/img_1.png" class="w-30 rounded-2xl" alt="">
    </div>
    <div class="flex gap-2 text-xl items-center font-semibold">
      O‘zbekiston
      <img src="@/assets/icons/location.png" class="w-8 h-7" alt="">
    </div>
    <div class="flex gap-4 text-xl items-center">
      <button></button>
      <router-link to="/login" class="hover:text-blue-600">Login</router-link>
      <router-link to="/register" class="hover:text-blue-600">Register</router-link>
    </div>
  </header>
</template>
<script setup lang="ts">
import {ref} from "vue";


const searchModalVisible = ref(false)

const visibleSearch = () => {
  searchModalVisible.value = true
}
const closeModal = () => {
  searchModalVisible.value = false
}
</script>
