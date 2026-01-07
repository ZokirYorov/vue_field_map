<template>
  <div class="flex flex-col w-full items-center justify-center bg-black/50 fixed inset-y-0 z-10">
    <div
        class="flex p-6 flex-col w-[400px] min-h-[300px] bg-white rounded-md"
    >
      <form
          @submit.prevent="submitRegister"
          class="w-full flex flex-col gap-4"
      >
        <h2 class="text-xl font-semibold">Register</h2>

        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <AppInput label="User name"
                  type="text"
                  placeholder="User name"
                  v-model="form.username"
        />
        <AppInput label="Email"
                  type="email"
                  placeholder="User name"
                  v-model="form.email"
        />
        <AppInput label="Password"
                  :type="passwordVisible ? 'text' : 'password'"
                  :iconSrc="passwordVisible ? 'images/svg/eye-password-hide-svgrepo-com.svg' : 'images/svg/eye-open.svg'"
                  :hasIcon="passwordEyeOpen"
                  @iconClick="passwordVisible = !passwordVisible"
                  iconSize="20"
                  @input="passwordEyeOpen = form.password.length > 0"
                  v-model="form.password"
                  placeholder="Password"

        />
        <button
            type="submit"
            class="w-full bg-blue-600 rounded-md px-2 py-1 text-white hover:bg-blue-500"
        >
          Submit
        </button>
        <div class="flex items-center w-full">
          <span>Are you registered? </span>
          <router-link
              class="text-blue-600 text-md font-bold py-1 px-2 rounded contain-paint hover:bg-gray-200"
              to="/login"
          >
            Login
          </router-link>
        </div>
        <div class="text-center">
          <router-link
              class="text-blue-600 hover:text-gray-800"
              to="/home"
          >
            Mehmon sifatida davom etish
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import AppInput from "@/components/ui/AppInput.vue";
import {ref} from "vue";
import { authStore } from "@/stores/authStore";

const store = authStore();
const router = useRouter();

const error = ref("")

interface pasForm {
  username: string;
  email: string;
  password: string;
}

const form = ref<pasForm>({
  username: "",
  email: "",
  password: "",
})

const passwordVisible = ref(false);
const passwordEyeOpen = ref(false);

const submitRegister = async () => {
  error.value = "";

  if (!form.value.password || !form.value.email || !form.value.password) {
    error.value = "Iltimos barcha maydonlarni to'ldiring";
    return;
  }

  try {
    await store.register(form.value.username, form.value.email, form.value.password);
    await router.push("/home");

  }
  catch (err: any) {
    error.value = err.response?.data?.message || "Ro'yxatdan utishda xato. Qaytadan urinib ko'ring.";
  }
}

</script>