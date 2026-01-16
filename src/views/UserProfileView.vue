<template>
  <div class=" flex flex-col gap-4 container mt-10 m-auto w-full h-full bg-gray-100 p-6">
    <div class="text-lg font-semibold uppercase">User profile</div>
    <table class="rounded-xl p-6 w-full overflow-x-auto bg-white">
      <thead class="border-b border-gray-800 p-4">
      <tr>
        <th class="text-start p-2">ID</th>
        <th class="text-start py-2">User name</th>
        <th class="text-start py-2">Email</th>
        <th class="text-start py-2">Account type</th>
        <th class="text-start py-2">Role</th>
      </tr>
      </thead>
      <tbody>
      <tr class="items-start"
          v-if='user'
      >
        <td class="items-center p-2">{{user.id}}</td>
        <td class="items-start">{{user.username}}</td>
        <td>{{user.email}}</td>
        <td>{{user.accountType}}</td>
        <td>
          <span
              :class="userRole(user.roles) === 'ADMIN'
          ? 'text-red-500 font-semibold'
          : 'text-green-500 font-semibold'"
          >
            {{userRole(user.roles)}}
          </span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup lang="ts">

import {computed, onMounted} from "vue";
import { authStore } from "@/stores/authStore";
import axiosInstance from "@/axios";

const store = authStore();

const user = computed(() => store.state.user);

const userRoleMap: Record<string, string> = {
  "ROLE_USER": "USER",
  "ROLE_ADMIN": "ADMIN",
}

const userRole = (roles: string | null ) => {
  const role = roles?.[0]; // faqat birinchi role
  return role ? (userRoleMap[role] ?? role) : "-";
};


const userMe = async (): Promise<void> => {
  try {
    const response = await axiosInstance.get(`/api/users/me`, {

    });
    store.state.user = response.data;
    console.log('User item', response.data);
  }
  catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await userMe();
})
</script>


<style scoped lang="scss">

</style>