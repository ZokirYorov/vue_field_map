<template>
  <div class="flex flex-col px-6 w-full h-full overflow-x-auto">
    <div class="w-full flex items-center justify-around py-6">
      <span class="text-xl font-semibold">Missed page</span>
      <div class="flex text-md items-center gap-2">
        <input type="date"
               class="flex py-1 px-4 border border-gray-400 rounded-md"
               v-model="formFilter.fromDate"
        >
        <input type="date"
               class="flex py-1 px-4 border border-gray-400 rounded-md"
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
          class="flex flex-col w-[400px] p-4 gap-6 min-h-[200px] bg-gray-100 rounded-md"
          @submit.prevent="submitPrayer"
          @click.stop
      >
        <span class="text-2xl font-semibold">Controller form</span>
        <label
            class="flex flex-col">
          Prayer Controller
          <select
              v-model="formPrayer.missedPrayerId"
              class="rounded-md p-2 border border-gray-300 "
          >
            <option value="" disabled>Select prayer</option>
            <option
                v-for="type in prayerType"
                :key="type"
                :value="type"
            >
              {{ prayerLabel[type] }}
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
        <label for="noteId"
               class="flex flex-col"
        >
          Note
          <input type="text"
                 id="noteId"
                 placeholder="Inter note"
                 class="rounded-md p-2 border border-gray-300 "
                 v-model="formPrayer.note"
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
        class="fixed bg-black/50 flex-col items-center flex justify-center w-full h-screen"
        @click="visibleMissed = !visibleMissed"
    >
      <form
          @submit.prevent="submitMissed"
          class="flex flex-col w-[400px] min-h-[100px] gap-4 bg-white p-4 rounded-lg"
          @click.stop
      >
        <h2 class="text-2xl font-semibold">Missed form</h2>
        <label>
          Prayer Type
          <select
              v-model="form.prayerType"
              class="w-full px-2 py-1 border-gray-200 rounded-lg border"
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
        class="bg-gray-100 rounded-xl p-6 w-full overflow-x-auto"
    >
      <thead class="border-b border-gray-300">
      <tr>
        <th class="text-start p-2">ID</th>
        <th class="text-start p-2">Prayer Type</th>
        <th class="text-start">Total Count</th>
        <th class="text-start">Completed Count</th>
        <th class="text-start">Remaining Count</th>
      </tr>
      </thead>
      <tbody>
      <tr class="items-start border-t border-gray-200"
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

const getMissed = computed(() => store.state.missed)


const visibleMissedForm = () => {
  visibleMissed.value = true;
}

interface MissedPrayerType {
  prayerType: string;
  totalCount: number;
  completedCount: number;
  remainingCount: number;
}

const form = ref<MissedPrayerType>( {
  prayerType: "",
  totalCount: 0,
  completedCount: 0,
  remainingCount: 0,
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
  try {

    if (!form.value.prayerType) {
      alert("Prayer type tanlang");
      return;
    }

    const response = await axiosInstance.post(
        "/api/qaza/add",
        form.value,
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
  missedPrayerId: '',
  count: 0,
  note: '',
  createdAt: new Date(),
});

const prayerType = [
  1,
  2,
  3,
  4,
  5,
  6
];

const prayerLabel: Record<string, string> = {
  1: "Bomdod",
  2: "Peshin",
  3: "Asr",
  4: "Shom",
  5: "Xufton",
  6: "Vitr",
};

const submitPrayer = async () => {
  try {
    const userId = store.state.user?.id
    const payload = {
      missedPrayerId: formPrayer.value.missedPrayerId,
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

    console.log("From data", response.data);
  }
  catch (error) {
    console.log(error);
  }
}

const closeForm = () => {
  visiblePrayerForm.value = false;
  formPrayer.value.missedPrayerId = '';
  formPrayer.value.count = 0;
  formPrayer.value.note = '';
  formPrayer.value.createdAt = new Date();
}

const resetForm = () => {
  form.value.prayerType = "";
  form.value.totalCount = 0;
  form.value.remainingCount = 0;
  form.value.remainingCount = 0;
  visibleMissed.value = false;
}

watch(
    () => [formFilter.value.toDate, formFilter.value.toDate],
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