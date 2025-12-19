<template>
  <header class="flex justify-around p-6 bg-gray-800 text-white shadow">
    <div class="font-bold">UZZONE.UZ</div>
    <button
        class="px-4 py-2 bg-gray-600 cursor-pointer rounded"
        @click="visibleSearch"
    >
      Qidirishni boshlash
    </button>
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
