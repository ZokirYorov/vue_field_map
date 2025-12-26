<template>
  <header class="flex justify-around p-6 bg-gray-800 text-white shadow">
    <div class="font-bold">UZZONE.UZ</div>
    <router-link
        to="/home"
        class="px-4 py-2 bg-gray-600 cursor-pointer rounded"
    >
      Home
    </router-link>
    <router-link
        to="/missed"
        class="px-4 py-2 bg-gray-600 cursor-pointer rounded"
    >
      Missed
    </router-link>
    <button
        class="px-4 py-2 bg-gray-600 cursor-pointer rounded"
        @click="visibleSearch"
    >
      Qidirishni boshlash
    </button>
    <router-link
        to="/users"
        class="px-4 py-2 bg-gray-600 cursor-pointer rounded"
    >
      Users
    </router-link>
    <router-link
        to="/user"
        class="px-4 py-2 bg-gray-600 cursor-pointer rounded"
    >
      User
    </router-link>
    <SearchModal
        v-if="searchModalVisible"
        @close="closeModal"
    />
    <div class="flex gap-2 text-xl items-center font-semibold">
      O‘zbekiston
      <img src="@/assets/icons/location.png" class="w-8 h-7" alt="">
    </div>
  </header>
</template>
<script setup lang="ts">
import SearchModal from "@/components/SearchModal.vue";
import {ref} from "vue";


const searchModalVisible = ref(false)

const visibleSearch = () => {
  searchModalVisible.value = true
}
const closeModal = () => {
  searchModalVisible.value = false
}
</script>
