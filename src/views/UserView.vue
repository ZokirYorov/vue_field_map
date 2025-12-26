<template>
  <div class="flex flex-col items-center justify-center h-screen bg-white">
    <div class="flex flex-col w-[400px] min-h-[600px] bg-gray-100 rounded-lg p-6">
      <form
          @submit.prevent="submitUser"
          class="flex flex-col gap-4"
      >
        <label for="username">Name</label>
        <input
            id="username"
            type="text"
            placeholder="Username"
            class="border border-gray-300 rounded-md w-full py-1 px-2"
            v-model="form.username"
        >
        <label for="email">Email</label>
        <input type="email"
               id="email"
               placeholder="Email"
               class="border border-gray-300 rounded-md w-full py-1 px-2"
               v-model="form.email"
        >
        <label for="deviceId">Device type</label>
        <input type="text"
               id="deviceId"
               class="border border-gray-300 rounded-md w-full py-1 px-2"
               placeholder="Device type"
               v-model="form.deviceId"
        >
        <label for="accountType">Account type</label>
        <input type="text"
               id="accountType"
               class="border border-gray-300 rounded-md w-full py-1 px-2"
               placeholder="Account type"
               v-model="form.accountType"
        >
        <label for="fullName">Full name</label>
        <input type="text"
               id="fullName"
               class="border border-gray-300 rounded-md w-full py-1 px-2"
               placeholder="Full Name"
               v-model="form.fullName"
        >
        <label for="role">Role</label>
        <input type="text"
               id="role"
               class="border border-gray-300 rounded-md w-full py-1 px-2"
               placeholder="Role"
               v-model="form.role"
        >
        <label for="phoneNumber">Phone number</label>
        <input type="text"
               id="phoneNumber"
               class="border border-gray-300 rounded-md w-full py-1 px-2"
               placeholder="Phone number"
               v-model="form.phoneNumber"
        >
        <label for="password">Password</label>
        <input type="password"
               id="password"
               placeholder="..."
               v-model="form.password"
        >
        <div class="flex items-center justify-center">
          <button
              type="submit"
              class="w-[100px] bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
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
import axios from "axios";

const store = authStore();
interface User {
  username: string;
  email: string;
  deviceId: string;
  accountType: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  password: string;
  active: boolean;
}
const router = useRouter();

const form = ref<User>({
  username: "",
  email: "",
  deviceId: "",
  accountType: "",
  fullName: "",
  phoneNumber: "",
  role: '',
  password: '',
  active: true,
})



const submitUser = async () => {
  try {
    const formData = new FormData();
    formData.append("username", form.value.username);
    formData.append("email", form.value.email);
    formData.append("deviceId", form.value.deviceId);
    formData.append("accountType", form.value.accountType);
    formData.append("fullName", form.value.fullName);
    formData.append("phoneNumber", form.value.phoneNumber);
    formData.append("role", form.value.role);
    formData.append("password", form.value.password);
    if(form.value.active) {
      formData.append("active", typeof (form.value.active));
    }
    const { data }= await axios.post(`http://localhost:8080/api/users`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
    );

    await store.getUser(data.id);
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
    await store.getUser(userId);
  }

})

</script>

<style scoped lang="scss">

</style>