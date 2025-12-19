<template>
  <div class="flex flex-col img_item">

    <div class="py-6">
      <div class="grid md:grid-cols-2">
        <div class="flex flex-col items-center pl-10 gap-6">
          <h2 class="text-2xl font-semibold text-white bg-gray-400 rounded-2xl p-2 w-full justify-center flex">
            All sport field
          </h2>

          <FieldCard
              v-for="field in fieldStore.filteredFields"
              :key="field.id"
              :field="field"
              @click="openBooking(field.id)"
          />
        </div>
        <div class="flex flex-col w-full rounded-2xl font-semibold italic font-mono bg-black/50 text-white text-6xl items-center justify-center">
          <div>This is a map area !</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useFieldStore } from "@/stores/fieldStore"
import FieldCard from "@/components/FieldCard.vue"
import { useRouter } from "vue-router"


const router = useRouter()

const fieldStore = useFieldStore()



const openBooking = (id: number) => {
  router.push(`/booking/${id}`)
}
</script>

<style lang="scss" scoped>

.img_item {
  position: relative;
  min-height: 100vh;
}

.img_item::before{
  content: "";
  inset: 0;
  position: absolute;
  background-image: url("@/assets/icons/field.png");
  background-repeat: no-repeat;
  background-size: max(900px);
  background-position: center;
  opacity: 0.4;
  top: 150px;
  z-index: -1;
}
.img_item > * {
  position: relative;
  z-index: 1;
}
</style>
