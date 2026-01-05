<template>
  <div class=" flex flex-col gap-4 container mt-10 m-auto w-full h-full bg-gray-100 p-6">
    <div>All users</div>
    <table class="rounded-xl p-6 w-full overflow-x-auto bg-white">
      <thead class="border-b border-gray-800 p-4">
      <tr>
        <th class="text-start p-2">ID</th>
        <th class="text-start py-2">User name</th>
        <th class="text-start p-2">Email</th>
        <th class="text-start p-2">Device Id</th>
        <th class="text-start p-2">Account type</th>
        <th class="text-start p-2">Full Name</th>
        <th class="text-start p-2">Phone</th>
        <th class="text-start p-2">Role</th>
      </tr>
      </thead>
      <tbody>
      <tr class="items-start"
          v-if='user'
      >
        <td class="items-center p-2">{{user.id}}</td>
        <td class="items-start">{{user.username}}</td>
        <td>{{user.email}}</td>
        <td>{{user.deviceId}}</td>
        <td>{{user.accountType}}</td>
        <td>{{user.fullName}}</td>
        <td>{{user.phoneNumber}}</td>
        <td>{{user.role}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup lang="ts">

import { onMounted, ref} from "vue";
import { authStore } from "@/stores/authStore";
import axiosInstance from "@/axios";

const store = authStore();

const user = ref<any>(null)

const allUsers = async (): Promise<void> => {
  try {
    const response = await axiosInstance.get(`/api/users/me`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    user.value = response.data;
    console.log('All users', response.data);
  }
  catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await allUsers();
})
</script>


<style scoped lang="scss">

</style>