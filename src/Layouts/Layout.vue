<template>
  <div
      class="flex flex-col"
  >
    <Header/>
    <div class="flex text-start">
      <SidebarVue/>
      <RouterView/>
    </div>
  </div>
</template>



<script setup>
import Header from "@/components/Header.vue";
import SidebarVue from "@/components/SidebarVue.vue";
</script>

