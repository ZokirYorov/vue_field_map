<template>
  <div class=" flex flex-col gap-4 container rounded-lg mt-10 m-auto w-full h-full bg-gray-100 p-6">
    <div class="text-lg font-semibold uppercase">All users</div>
    <table class="rounded-xl p-6 w-full overflow-x-auto bg-gray-200">
      <colgroup>
        <col style="width: 5%">
        <col style="width: 14%">
        <col style="width: 18%">
        <col style="width: 14%">
        <col style="width: 16%">
        <col style="width: 14%">
      </colgroup>
      <thead class="border-b border-gray-800 py-8">
      <tr class="">
        <th class="text-center p-2">№</th>
        <th class="text-start py-2">User name</th>
        <th class="text-start py-2">Email</th>
        <th class="text-start py-2">Active</th>
        <th class="text-start py-2">Account type</th>
        <th class="text-start py-2">Role</th>
        <th class="text-start px-3">Operations</th>
      </tr>
      </thead>
      <tbody>
      <tr class="items-start bg-white hover:bg-gray-100 border-b border-gray-200 px-8"
          v-for="(user, index) in users"
          :key="index"
      >
        <td class="items-center text-center p-2">{{index + 1}}</td>
        <td class="items-start">{{user.username}}</td>
        <td>{{user.email}}</td>
        <td>{{user.active}}</td>
        <td>{{user.accountType}}</td>
        <td>{{userRole(user.roles)}}</td>
      </tr>
      </tbody>
    </table>{{users[6]}}
  </div>
</template>


<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import { authStore } from "@/stores/authStore";
import axiosInstance from "@/axios";

const store = authStore();

const users = computed(() => store.state.users);

const userRoleMap: Record<string, string> = {
  "ROLE_USER": "USER",
  "ROLE_ADMIN": "ADMIN",
}

const userRole = (roles: string[]) => {
  if (!roles || !roles.length) return '';

  return roles.map(role => userRoleMap[role] ?? role).join(", ");
}

const allUsers = async (): Promise<void> => {
  try {
    const response = await axiosInstance.get(`/api/users/find-all`, {

    });
    store.state.users = response.data;
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