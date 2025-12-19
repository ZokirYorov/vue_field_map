<template>
  <div
      @click="$emit('close')"
      class="fixed inset-0 bg-black/40 flex items-start justify-center">
    <div
        @click.stop
        class="bg-white text-gray-600 p-2 rounded-xl w-80">
      <input
          type="text"
          v-model="store.search"
          placeholder="Maydon nomi..."
          class="border p-2 w-full"
      />
    </div>
  </div>
</template>

<script setup>
import { useFieldStore } from "@/stores/fieldStore"
const store = useFieldStore()

</script>
