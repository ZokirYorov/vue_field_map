<template>
  <div class="flex dark:bg-gray-800 dark:text-gray-300 flex-col gap-2 p-6 w-full h-screen overflow-x-auto">
    <div class="w-full flex items-center rounded-2xl justify-around dark:bg-gray-700 dark:text-gray-300 py-6">
      <span class="text-xl dark:text-gray-300 font-semibold">Missed page</span>
      <div class="flex text-md items-center gap-2">
        <input type="date"
               class="flex py-1 px-4 border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300"
               v-model="formFilter.fromDate"
        >
        <input type="date"
               class="flex py-1 px-4 border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300"
               v-model="formFilter.toDate"
        >
      </div>
      <div class="flex items-center justify-center text-lg font-semibold gap-4">
        <button
            type="button"
            class="flex rounded-md bg-blue-600 items-center justify-center w-[80px] p-1 text-white cursor-pointer"
            @click="visibleMissedForm"
        >
          Add
        </button>
        <button class="w-[110px] p-1 rounded-lg bg-blue-600 text-white cursor-pointer"
                @click="visibleForm"
        >
          Complete
        </button>
      </div>
    </div>
    <div
        v-if="visiblePrayerForm"
        class="flex fixed bg-black/50 inset-0 items-center justify-center w-full"
        @click="visiblePrayerForm = !visiblePrayerForm"
    >
      <form
          class="flex flex-col w-[400px] p-4 gap-6 min-h-[200px] bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-md"
          @submit.prevent="submitPrayer"
          @click.stop
      >
        <span class="text-2xl font-semibold">Controller form</span>
        <label
            class="flex flex-col">
          Prayer Controller
          <select
              v-model="formPrayer.prayerType"
              class="rounded-md p-2 border border-gray-300 dark:bg-gray-800 dark:text-gray-300"
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
                 v-model="formPrayer.count"
          >
        </label>
        <label for="dataId"
               class="flex flex-col"
        >
          Date
          <input type="date"
                 id="dataId"
                 class="rounded-md p-2 border border-gray-300 "
                 v-model="formPrayer.createdAt"
          >
        </label>
        <div class="flex w-full items-center justify-center gap-4">
          <button class="rounded-md bg-blue-600 text-white cursor-pointer py-1 px-4 text-lg font-semibold" type="submit">Submit</button>
          <button class="rounded-md bg-gray-600 text-white cursor-pointer py-1 px-4 text-lg font-semibold" type="button" @click="closeForm">Cancel</button>
        </div>
      </form>
    </div>
    <div
        v-if="visibleMissed"
        class="fixed inset-0 bg-black/50 flex-col items-center flex justify-center w-full h-screen"
        @click="visibleMissed = !visibleMissed"
    >
      <form
          @submit.prevent="submitMissed"
          class="flex flex-col w-[400px] min-h-[100px] gap-4 bg-white p-4 dark:bg-gray-800 dark:text-gray-300 rounded-lg"
          @click.stop
      >
        <h2 class="text-2xl font-semibold">Missed form</h2>

        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <label>
          Prayer Type
          <select
              v-model="form.prayerType"
              class="w-full px-2 py-1 border-gray-200 rounded-lg border dark:bg-gray-800 dark:text-gray-300"
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
        <label for="totalId">Total
          <input type="number"
                 id="totalId"
                 placeholder="Inter number..."
                 class="w-full px-2 py-1 border-gray-200 rounded-lg border"
                 v-model="form.totalCount"
          >
        </label>
        <div class="flex items-center justify-center w-full gap-4">
          <button type="button"
                  class="bg-gray-600 py-1 px-2 mt-5 rounded-xl text-lg font-semibold cursor-pointer text-white"
                  @click="visibleMissed = !visibleMissed"
          >
            Cancel
          </button>
          <button type="submit"
                  class="bg-blue-600 py-1 px-2 mt-5 rounded-xl text-lg font-semibold cursor-pointer text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>

    <table
        v-if="getMissed"
        class="bg-gray-100 rounded-xl p-6 w-full dark:bg-gray-700 dark:text-gray-300 overflow-x-auto "
    >
      <thead class="border-b border-gray-300">
      <tr>
        <th class="text-start p-2">№</th>
        <th class="text-start p-2">Prayer Type</th>
        <th class="text-start">Total Count</th>
        <th class="text-start">Completed Count</th>
        <th class="text-start">Remaining Count</th>
      </tr>
      </thead>
      <tbody>
      <tr class="items-start border-t border-gray-200 dark:bg-gray-800 dark:text-gray-300"
          v-for="(missed, index) in getMissed "
          :key="index"
      >
        <td class="items-center px-4 py-2">{{index + 1}}</td>
        <td class="items-start p-2">{{missed?.prayerType}}</td>
        <td>{{missed?.totalCount}}</td>
        <td>{{missed?.completedCount}}</td>
        <td>{{missed?.remainingCount}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { authStore } from "@/stores/authStore";
import axiosInstance from "@/axios";
import {computed, onMounted, ref, watch} from "vue";

const store = authStore();

const visibleMissed = ref(false);
const error = ref('');
const getMissed = computed(() => store.state.missed)


const visibleMissedForm = () => {
  visibleMissed.value = true;
}

interface MissedPrayerType {
  prayerType: string;
  totalCount: number;
}

const form = ref<MissedPrayerType>( {
  prayerType: "",
  totalCount: 0,
});

const formFilter = ref({
  fromDate: "",
  toDate: "",
});

const prayerTypes = [
  "BOMDOD",
  "PESHIN",
  "ASR",
  "SHOM",
  "XUFTON",
  "VITR",
];

const prayerLabels: Record<string, string> = {
  'BOMDOD': "Bomdod",
  'PESHIN': "Peshin",
  'ASR': "Asr",
  'SHOM': "Shom",
  'XUFTON': "Xufton",
  'VITR': "Vitr",
};


const submitMissed = async () => {
  error.value = "";


  if (!form.value.prayerType) {
    error.value = "Prayer type tanlang";
    return;
  }

  try {
    const response = await axiosInstance.post(
        "/api/qaza/add",
        null,
        {
          params: {
            prayerType: form.value.prayerType,
            count: form.value.totalCount,
          }
        },
    );
    console.log("Added qaza", response.data);
    await store.getMissed();
    resetForm();
  } catch (error: any) {
    console.error(error.response?.data || error);
  }
};
const visiblePrayerForm = ref(false);

// ********Prayer type****


const visibleForm = () => {
  visiblePrayerForm.value = true;
}


const formPrayer = ref({
  prayerType: "",
  count: 0,
  note: '',
  createdAt: new Date(),
});

const submitPrayer = async () => {
  try {
    const userId = store.state.user?.id
    const payload = {
      prayerType: formPrayer.value.prayerType,
      count: formPrayer.value.count,
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

const getInit = async () => {
  try {

    if (!formFilter.value.fromDate || !formFilter.value.toDate) {
      alert("Sanani tanlang");
      return;
    }

    const userId = 1;
    const payload = {
      fromDate: formFilter.value.fromDate,
      toDate: formFilter.value.toDate,
    }
    const response = await axiosInstance.post("/api/qaza/init",
        payload,
        {
          params: {
            userId,
          }
        }
    );
    // getMissed.value = response.data;

    console.log("From data", response.data);
  }
  catch (error) {
    console.log(error);
  }
}

const closeForm = () => {
  visiblePrayerForm.value = false;
  formPrayer.value.prayerType = '';
  formPrayer.value.count = 0;
}

const resetForm = () => {
  form.value.prayerType = "";
  form.value.totalCount = 0;
  visibleMissed.value = false;
}

watch(
    () => [formFilter.value.fromDate, formFilter.value.toDate],
    ([from, to]) => {
      if (from && to) {
        getInit()
      }
})

onMounted(async () => {
  await store.getMissed();
})

</script>


<style scoped lang="scss">

</style>