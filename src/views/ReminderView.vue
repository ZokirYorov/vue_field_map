<template>

<div class="flex items-center justify-center py-16 w-full">
  <form
      @submit.prevent="remenderSubmit"
      class="flex flex-col w-[400px] gap-2 p-4 h-[400px] rounded-md bg-gray-50"
      @click.stop
  >
    <span class="flex text-xl font-semibold">Remender</span>
    <AppInput label="Remender time"
              type="time"
              v-model="form.reminderTime"
    />
    <AppInput label="Last time"
              type="date"
              v-model="form.lastSentAt"
    />
    <AppSelect
        label="Days"
        multiple
        disabled-value="Select days"
        placeholder="Days"
        :options="days"
        v-model="form.days"
        text-field="label"
        value-field="id"
        id="id"
    />
    <button
        type="submit"
        class="flex bg-blue-600 items-center justify-center p-2 rounded-md text-white text-lg"
    >
      Submit
    </button>
  </form>
</div>

  {{allReminder}}
</template>


<script setup lang="ts">

import axiosInstance from "@/axios";
import {ref} from "vue";
import AppInput from "@/components/ui/AppInput.vue";
import AppSelect from "@/components/ui/AppSelect.vue";

const allReminder = ref([])

interface Reminder {
  reminderTime: string;
  lastSentAt: string;
  days: [];
  active: boolean;
}

const form = ref<Reminder>({
  reminderTime: '',
  days: [],
  active: true,
  lastSentAt: '',
})

const days =[
  { id: 1, label: 'Monday', value: 'MONDAY'  },
  { id: 2, label: 'Tuesday', value: 'TUESDAY'  },
  { id: 3, label: 'Wednesday', value: 'WEDNESDAY'},
  { id: 4, label: 'Thursday', value: 'THURSDAY'},
  { id: 5,label: 'Friday', value: 'FRIDAY' },
  { id: 6, label: 'Saturday', value: 'SATURDAY'},
  { id: 7, label: 'Sunday', value: 'SUNDAY'},
]

const remenderSubmit = async () => {
  try {
    const payload = {
      reminderTime: form.value.reminderTime,
      days: form.value.days,
      active: form.value.active,
      lastSentAt: form.value.lastSentAt,
    }

    const response = await axiosInstance.post("/api/reminders", payload
    );
    allReminder.value = response.data;
    console.log('Reminder',response.data);

  }
  catch (e) {
    console.log(e)
  }
}
</script>


<style scoped lang="scss">

</style>