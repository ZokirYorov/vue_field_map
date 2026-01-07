<template>
  <div class="flex flex-col items-center p-6 h-screen bg-white">
    <button
        class="mb-4 text-blue-600 cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"
        @click="$router.back()"
    >
      ← Orqaga
    </button>
    <div class="flex flex-col w-[400px] min-h-[600px] bg-gray-100 rounded-lg p-6">
      <form
          @submit.prevent="submitUser"
          class="flex flex-col gap-4"
      >
        <label for="username">
          Name
          <input
              id="username"
              type="text"
              placeholder="Username"
              class="border border-gray-300 rounded-md w-full py-1 px-2"
              v-model="form.username"
          >
        </label>
        <label for="email">
          Email
          <input type="email"
                 id="email"
                 placeholder="Email"
                 class="border border-gray-300 rounded-md w-full py-1 px-2"
                 v-model="form.email"
          >
        </label>
        <label for="accountType">
          Account type
          <select id="accountType"
                  class="border border-gray-300 rounded-md w-full py-1 px-2"
                  v-model="form.accountType"
          >
            <option value="" disabled>Select type</option>
            <option
                    v-for="type in accountTypes"
                    :key="type"
                    :value="type"
            >
              {{type}}
            </option>
          </select>
        </label>
        <label for="role">
          Role
          <select id="role"
                  class="border border-gray-300 rounded-md w-full py-1 px-2"
                  v-model="form.roles"
          >
            <option value="" disabled>Select role</option>
            <option
                v-for="role in roles"
                :key="role"
                :value="role"
            >
              {{ role }}
            </option>
          </select>
        </label>
        <label for="password">
          Password
          <input type="password"
                 id="password"
                 class="border border-gray-300 rounded-md w-full py-1 px-2"
                 placeholder="..."
                 v-model="form.password"
          >
        </label>
        <div class="flex items-center justify-center">
          <button
              type="submit"
              class="w-[100px] bg-blue-500 text-white px-4 hover:bg-blue-600 py-2 rounded-md cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>



<script setup lang="ts">

import { useRouter } from "vue-router";
import {onMounted, ref} from "vue";
import {authStore} from "@/stores/authStore";
import axiosInstance from "@/axios";

const store = authStore();
interface User {
  username: string;
  email: string;
  accountType: string;
  roles: string[];
  password: string;
  active: boolean;
}
const router = useRouter();

const form = ref<User>({
  username: "",
  email: "",
  accountType: "",
  roles: [],
  password: '',
  active: true,
})

const accountTypes = ref({
  0: 'GUEST',
  1: 'REGISTERED',
});

const roles = ref( {
  0: 'USER',
  1: 'ADMIN',
});

const submitUser = async () => {
  try {

    const { data }= await axiosInstance.post(`/api/users`,
        form.value,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
    );

    await store.getUser();
    const token = data.token

    store.setUser(data.user)
    store.state.token = data.token;
    localStorage.setItem("token", token)
    await router.push("/home");
  }
  catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  const userId = store.state.user?.id

  if (userId) {
    await store.getUser();
  }

})

</script>

<style scoped lang="scss">

</style>