<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-col w-full overflow-x-auto">
      <div class="flex items-center justify-between container m-auto p-6">
        <span class="text-xl font-semibold uppercase">Goal Title</span>
        <button
            type="button"
            class="flex w-[80px] text-white rounded items-center justify-center bg-blue-600 hover:bg-blue-500 cursor-pointer px-2 py-1"
            @click="visibleGoalForm"
        >
          Add
        </button>
      </div>
      <div
          v-if="formVisible"
          class="fixed inset-0 flex items-center justify-center bg-black/50 w-full"
          @click="formVisible = !formVisible"
      >
        <form
            @submit.prevent="goalSubmit"
            @click.stop
            class="flex flex-col font-semibold text-gray-700 rounded-lg bg-white w-[400px] min-h-[200px] gap-2 p-4"
        >
          <span class="text-xl font-semibold">Goal form</span>
          <label for="goalIUd"
                 class="flex flex-col"
          >
            Goal type
            <select id="goalIUd"
                    class="flex border border-gray-400 rounded-md px-2 py-1"
                    v-model="form.goalType"
            >
              <option value="" disabled>Select type</option>
              <option
                  v-for="type in goals"
                  :key="type"
                  :value="type"
              >
                {{type}}
              </option>
            </select>
          </label>
          <label for="targetId"
                 class="flex w-full flex-col"
          >
            Target count
            <input type="number"
                   id="targetId"
                   class="flex border border-gray-400 rounded-md px-2 py-1"
                   v-model="form.targetCount"
            >
          </label>
          <label for="currentId"
                         class="flex w-full flex-col"
          >
            Current count
            <input type="number"
                 id="currentId"
                 class="flex border border-gray-400 rounded-md px-2 py-1"
                   v-model="form.currentCount"
            >
          </label>
          <label for="statusId"
                 class="flex w-full flex-col"
          >
            Status
            <select id="statusId"
                    class="flex border border-gray-400 rounded-md px-2 py-1"
                    v-model="form.status"
            >
              <option value="" disabled>Select status</option>
              <option
                  v-for="status in statuses"
                  :key="status"
                  :value="status"
              >
                {{status}}
              </option>
            </select>
          </label>
          <div class="flex items-center justify-center text-white mt-2 w-full gap-2">
            <button
                type="button"
                class="flex px-2 py-1 bg-gray-600 rounded-md cursor-pointer hover:bg-gray-500"
                @click="closeForm"
            >
              Cancel
            </button>
            <button
                type="submit"
                class="flex items-center px-2 py-1 bg-blue-600 rounded-md cursor-pointer hover:bg-blue-500"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
      <div class="flex flex-col w-full overflow-x-auto p-6">
        <table
            class="bg-gray-200 rounded-lg p-6 w-full overflow-x-auto"
        >
          <thead>
          <tr class="border-b uppercase text-sm border-gray-300 py-6 px-2">
            <th class="text-start p-4">№</th>
            <th class="text-start p-2">Goal type</th>
            <th class="text-start p-2">Target count</th>
            <th class="text-start p-2">Current count</th>
            <th class="text-start p-2">Status</th>
            <th class="text-start p-2">Progress</th>
          </tr>
          </thead>
          <tbody>
          <tr class="items-start bg-gray-50 border-t border-gray-200"
              v-for="(item, index) in goalData"
              :key="index"
          >
            <td class="items-center py-4 px-2">{{index + 1}}</td>
            <td class="items-center py-4 px-2">{{item.goalType}}</td>
            <td class="items-center py-4 px-2">{{item.targetCount}}</td>
            <td class="items-center py-4 px-2">{{item.currentCount}}</td>
            <td class="items-center py-4 px-2">{{item.status}}</td>
            <td class="items-center py-4 px-2">{{item.progress}}</td>
          </tr>
          </tbody>
        </table>{{goalData}}
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import {ref} from "vue";
import axiosInstance from "@/axios";
import { authStore } from "@/stores/authStore";

const store = authStore()
const formVisible = ref(false);

interface GoalForm {
  id: number;
  goalType: number;
  targetCount: number;
  currentCount: number;
  status: string;
  progress: number;
}

const goalData = ref<GoalForm[]>([])

const visibleGoalForm = () => {
  formVisible.value = true;
};

interface FormData {
  goalType: string;
  targetCount: number;
  currentCount: number;
  status: string;
  progress: number;
}

const form = ref<FormData>({
  goalType: '',
  targetCount: 0,
  currentCount: 0,
  status: "",
  progress: 0.1,
})

const goals = [
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "CUSTOM",
];

const statuses = [
  "ACTIVE",
  "COMPLETED",
  "FAILED",
  "CANCELLED",
];



const goalSubmit = async () => {
  try {
    const userId = store.state.user?.id;

    const payload = {
      goalType: form.value.goalType,
      targetCount: form.value.targetCount,
      currentCount: form.value.currentCount,
      status: form.value.status,
      progress: form.value.progress,
    }

    const response = await axiosInstance.post("/api/goals",
        payload,
        {
          params: {
            userId: userId,
          }
        },
    );

    goalData.value.push(response.data);
    console.log('Goal item', response.data);
    closeForm()
  }
  catch (error) {
    console.log(error);
  }
}

const closeForm = () => {
  formVisible.value = false;
  form.value = {
    goalType: '',
    targetCount: 0,
    currentCount: 0,
    status: "",
    progress: 0,
  }
}
</script>

<style scoped lang="scss">

</style>