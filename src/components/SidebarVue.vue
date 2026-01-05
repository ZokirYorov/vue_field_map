<template>
  <div class="flex flex-col min-h-screen items-center justify-between px-4 py-2 bg-gray-700">
    <div class="flex flex-col w-[300px] text-white text-lg gap-2 p-6">
      <span class="py-4 uppercase">Sidebar page</span>
      <div
          v-for="(item, index) in menuItems"
          :key="index"
          :class="['flex w-full h-full',
          index === menuItems.length - 4 ? 'hidden' : '',
          ]"
      >
        <div
            :class="[
                'cursor-pointer w-full flex hover:bg-gray-800 hover:text-white duration-200 gap-2 items-center transition-all rounded p-1 px-2',
                 route.name === item.name ? 'bg-gray-800' : ''
                 ]"
            @click="clickPage(item.path)"
            title="CLICK TO CHOOSE"
        >
          <i
              v-if="item.meta"
              :class="item.meta.icon"
          >
          </i>
          <span>
            {{item.name}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import {computed} from "vue";


const route = useRoute()
const router = useRouter()

const menuRoute = router.getRoutes().find(route => route.name === 'Main')

const menuItems = computed(() => {
  if (!menuRoute?.children) return [];
  return menuRoute.children
})

const clickPage = (link: string) => {
  router.push(link)
}

</script>


<style scoped lang="scss">

</style>