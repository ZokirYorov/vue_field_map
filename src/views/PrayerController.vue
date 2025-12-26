<template>
  <div class="container w-full h-full flex flex-col p-6">
    <div class="flex justify-between items-center w-full">
      <div class="flex w-full items-center justify-around">
        <span class="text-2xl font-semibold">Prayer page</span>
        <button class="w-[80px] p-1 rounded-lg bg-blue-600 text-white cursor-pointer"
                @click="visibleForm"
        >
          Add
        </button>
      </div>
    </div>
    <div
        v-if="visiblePrayerForm"
        class="flex fixed bg-black/50 inset-0 items-center justify-center w-full"
        @click="visiblePrayerForm = !visiblePrayerForm"
    >
      <form
          class="flex flex-col w-[400px] p-4 gap-6 min-h-[200px] bg-gray-100 rounded-md"
          @submit.prevent="submitPrayer"
          @click.stop
      >
        <span class="text-2xl font-semibold">Controller form</span>
        <label
               class="flex flex-col">
          Prayer Controller
          <select
              v-model="form.missedPrayerId"
              class="rounded-md p-2 border border-gray-300 "
          >
            <option value="" disabled>Select prayer</option>
            <option
                v-for="type in prayerTypes"
                :key="type"
                :value="type"
            >
              {{ prayerLabels[type] }}
            </option>
          </select>
        </label>
        <label for="countId"
               class="flex flex-col"

        >
          Count Controller
          <input type="number"
                 id="countId"
                 placeholder="Count Controller"
                 class="rounded-md p-2 border border-gray-300 "
                 v-model="form.count"
          >
        </label>
        <div class="flex w-full items-center justify-center gap-4">
          <button class="rounded-md bg-blue-600 text-white cursor-pointer py-1 px-4 text-lg font-semibold" type="submit">Submit</button>
          <button class="rounded-md bg-gray-600 text-white cursor-pointer py-1 px-4 text-lg font-semibold" type="button" @click="closeForm">Cancel</button>
        </div>
      </form>
    </div>
    <div class="flex min-w-[800px] justify-center items-center m-auto py-6">
      <table
          class="bg-gray-100 rounded-xl p-6 w-full overflow-x-auto"
      >
        <thead class="border-b border-gray-300">
        <tr class="uppercase text-gray-500">
          <th class="text-start p-2">ID</th>
          <th class="text-start p-2">Prayer Type</th>
          <th class="text-start p-2">Count</th>
        </tr>
        </thead>
        <tbody>
        <tr
            class="border-t items-start border-gray-300"
            v-if="getPrayers && getPrayers.missedPrayerId"
        >
          <td class="items-center p-2">{{getPrayers.id}}</td>
          <td class="items-center p-2">{{prayerLabels[getPrayers.missedPrayerId]}}</td>
          <td class="items-center p-2">{{getPrayers.count}}</td>
        </tr>
        </tbody>
      </table>
      {{getPrayers}}
    </div>
  </div>

</template>

<script setup lang="ts">
import axiosInstance from "@/axios";
import {computed, onMounted, ref, watch} from "vue";
import { authStore } from "@/stores/authStore";


const store = authStore();

const visiblePrayerForm = ref(false);

const getPrayers = computed(() => store.state.prayer)

const prayerTypes = [
    1,
    2,
    3,
    4,
    5,
    6
];

const prayerLabels: Record<string, string> = {
  1: "Bomdod",
  2: "Peshin",
  3: "Asr",
  4: "Shom",
  5: "Xufton",
  6: "Vitr",
};

const visibleForm = () => {
  visiblePrayerForm.value = true;
}


const form = ref({
  missedPrayerId: 0,
  count: 0,
});

const submitPrayer = async () => {
  try {
    const userId = 1
    const payload = {
      missedPrayerId: form.value.missedPrayerId,
      count: form.value.count,
    }
    const res = await axiosInstance.post('/api/qaza/complete',
        payload,
        {
          params: {
            userId
          }
        });
    store.state.prayer = res.data
    await store.getMissed()
    closeForm()

    console.log("User id", res.data);
  }
  catch (error) {
    console.log(error);
  }
}

const closeForm = () => {
  visiblePrayerForm.value = false;
  form.value.missedPrayerId = 0;
  form.value.count = 0;
}
watch(() => getPrayers.value, () => {
  store.getMissed()
})

onMounted(async () => {
  await store.getMissed()
})

</script>


<style scoped lang="scss">

</style>