<template>
  <div class="min-h-screen p-6"
       :key="$route.fullPath"
  >
    <button
        class="mb-4 text-blue-600 cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"
        @click="$router.back()"
    >
      ← Orqaga
    </button>
    <div
        v-if="showModal"
        class="fixed top-0 right-0 flex inset-0 bg-black/50 z-50 items-center justify-center"
        @click="showModal = false"
    >
      <div class="bg-white rounded-2xl flex flex-col justify-center items-center gap-4 w-[600px] p-6 space-y-4">
        <h2 class="text-2xl font-semibold">Qaysi ilovada ochilsin?</h2>
        <div class="flex gap-4 w-full justify-center">
          <button
              type="button"
              class="bg-blue-500 p-2 rounded-lg text-white cursor-pointer"
              @click="openMap('google')"
          >
            Google maps
          </button>
          <button
              type="button"
              class="bg-blue-500 p-2 rounded-lg text-white cursor-pointer"
              @click="openMap('yandex')"
          >
            Yandex maps
          </button>
          <button
              type="button"
              class="bg-blue-500 p-2 rounded-lg text-white cursor-pointer"
              @click="openMap('gis')"
          >
            2GIS
          </button>
          <button
              class="bg-blue-500 p-2 rounded-lg text-white cursor-pointer"
              type="button"
              @click="showModal = false"
          >
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
    <div v-if="field" class=" gap-6 flex flex-col rounded">
      <div class="flex flex-col container justify-around gap-6 m-auto">
        <h2 class="text-2xl font-bold mb-2 flex items-center gap-2">
          <img src="@/assets/icons/location.png" class="w-10" alt="">  {{ field.name }}
        </h2>
        <div
            class="flex parentImage gap-6"
        >
          <img class="flex rounded-xl shadow-2xl w-1/3" :src="field.image" alt="">
          <div
              class="flex w-full h-[350px] rounded-lg overflow-hidden"
          >
            <iframe
                v-if="googleMapUrl"
                class="w-full h-full border-0"
                :src="googleMapUrl"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div class="flex flex-col gap-5 w-full rounded-xl ">
          <div class="grid grid-cols-2 w-full gap-6 justify-between">
            <div class="w-full flex p-4 gap-4 justify-between rounded-2xl shadow-2xl border-2 border-gray-200">
              <div class="flex w-full flex-col text-gray-500 font-semibold gap-4">
                <p class="text-lg font-semibold flex">
                  <img src="@/assets/icons/location.png" class="w-8" alt=""> {{ field.city }}
                </p>
                <p class="font-semibold gap-2 flex items-center text-gray-600">
                  <i class="fa-solid fa-money-bill-wave"></i> {{ field.price }} so‘m / soat
                </p>
                <p class="flex items-center gap-1"><img src="@/assets/icons/field.png" class="w-6" alt=""> {{field.surface}}</p>
                <p class="flex items-center gap-1"><img class="w-6" :src="iconType[field.sports]" alt=""> {{field.sports}}</p>
                <p class="flex items-center gap-1"><img src="@/assets/icons/clock.png" class="w-6" alt=""> {{field.workTime}}</p>
              </div>
              <div class="flex flex-col rounded-2xl gap-4 w-full">
                <input
                    type="date"
                    v-model="date"
                    class="border p-1 rounded mb-4"
                />
                <div class="grid grid-cols-3  gap-2">
                  <button
                      v-for="t in times"
                      :key="t"
                      class="p-2 rounded text-sm text-white"
                      :class="isBooked(t) ? 'bg-red-500' : 'bg-green-500'"
                      :disabled="isBooked(t)"
                      @click="book(t)"
                  >
                    {{ t }}
                  </button>
                </div>
                <button
                    @click="connectToOwner"
                    class="flex p-2 mt-5 bg-blue-500 w-30 rounded-lg cursor-pointer text-white items-center justify-center font-semibold" type="button"
                >
                  Connection
                </button>
              </div>
            </div>
            <div class="flex flex-col shadow-2xl border-2 border-gray-200 rounded-2xl p-4 gap-4 w-full">
              <h2 class="text-xl text-gray-600 font-semibold">Opportunities</h2>
              <div class="flex justify-between w-full p-2 gap-6">
                <div class="flex justify-between w-full">
                  <div class="flex flex-col gap-4 w-full">
                    <div class="flex items-center justify-between">
                      <span class="flex items-center gap-2">
                        <img src="@/assets/icons/shower.png" class="w-8" alt="">
                        Shower
                      </span>
                      <img src="@/assets/icons/checkmark.png" class="w-8" alt="">
                    </div>
                    <div class="flex justify-between items-center w-full">
                      <span class="flex items-center gap-2">
                        <img src="@/assets/icons/lamp.png" class="w-10" alt="">
                        Lamp
                      </span>
                      <img src="@/assets/icons/cancel.png" class="w-6 items-center flex" alt="">
                    </div>
                    <div class="flex justify-between gap-2">
                      <span class="flex items-center gap-2">
                        <img src="@/assets/icons/seats.png" class="w-10" alt="">
                        Seats
                      </span>
                      <img src="@/assets/icons/checkmark.png" class="w-9" alt="">
                    </div>
                  </div>
                </div>
                <div class="flex justify-between w-full">
                  <div class="flex flex-col gap-4 w-full justify-between">
                    <div class="flex items-center justify-between">
                      <span class="flex items-center gap-2"><img src="@/assets/icons/locker.png" class="w-8" alt=""> Locker rom</span>
                      <img src="@/assets/icons/checkmark.png" class="w-9" alt="">
                    </div>
                    <div class="flex justify-between items-center w-full">
                      <span class="flex items-center gap-2"><img src="@/assets/icons/parking.png" class="w-8" alt=""> Parking</span>
                      <img src="@/assets/icons/checkmark.png" class="w-9" alt="">
                    </div>
                    <div class="flex justify-between items-center w-full">
                      <span class="flex items-center gap-2"><img src="@/assets/icons/sporting-goods.png" class="w-8" alt=""> Inventory</span>
                      <img src="@/assets/icons/cancel.png" class="w-6 items-center flex" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
            class="flex mb-50 justify-center items-center m-auto overflow-hidden w-[1240px] transition-transform duration-700 ease-in-out"
        >
          <div class="overflow-hidden w-[920px]">
            <div
                ref="slider"
                class="flex transition-transform duration-700 ease-in-out"
                :style="{ transform: `translateX(-${offset}px)` }"
            >
              <div
                  v-for="field in extendedFields"
                  :key="field.id"
                  class="flex rounded-2xl gap-4 w-[450px] h-[200px] border-2 border-gray-200 shrink-0 mr-4"
              >
                <img
                    @click="visibleToField(field.id)"
                    :src="field.image" class="rounded-l-2xl w-[200px] cursor-pointer object-cover" alt=""/>
                <div class="flex flex-col gap-4 p-3">
                  <span class="font-semibold text-lg">{{ field.name }}
                  </span>
                  <div class="flex flex-col text-gray-700 gap-2">
                    <span class="flex gap-2">
                    <img alt="" src="@/assets/icons/location.png" class="w-6 h-5" />
                    {{ field.city }}
                    </span>
                    <span class="flex gap-2 items-center">
                    <img alt="" :src="iconType[field.sports]" class="w-7" />
                      {{ field.sports }}
                    </span>
                    <span class="flex gap-2">
                    <img alt="" src="@/assets/icons/clock.png" class="w-6" />
                    {{ field.workTime }}
                    </span>
                    <span class="flex gap-2">
                    <img alt="" src="@/assets/icons/field.png" class="w-6" />
                    {{ field.surface }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">
      Maydon topilmadi
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, watch} from "vue"
import { useRoute, useRouter } from "vue-router"
import { useFieldStore } from "@/stores/fieldStore"
import { useBookingStore } from "@/stores/bookingStore"
import type { Field } from "@/ModelType/modelType"
import { mockFields } from "@/field/fields";

const fields = mockFields
const route = useRoute()
const router = useRouter()
const fieldStore = useFieldStore();
const bookingStore = useBookingStore();

const CARD_WIDTH = 465;
const TOTAL_WIDTH = fields.length * CARD_WIDTH;
const STEP = 2
const offset = ref(0)
const slider = ref<HTMLElement| null>(null)

let interval: any = null

const extendedFields = computed(() => [
  ...fields,
  ...fields
])

const visibleToField = (id: number) => {
  router.push(`/booking/${id}`)
}



const fieldId = Number(route.params.id)

const field = computed<Field>(() =>
  fieldStore.fields.find(f => f.id === fieldId)
)

const googleMapUrl = computed(() => {
  if(!field.value) return '';

  const lat = field.value.lat;
  const lng = field.value.lng;

  return `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`

})

const address = ref("Manzil yuklanmoqda...")

const getAddressFromLatLng = async () => {
  if (!field.value) return

  const lat = field.value.lat
  const lng = field.value.lng

  try {
    const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_API_KEY`
    )

    const data = await res.json()

    if (data.results?.length) {
      address.value = data.results[0].formatted_address
    } else {
      address.value = "Manzil topilmadi"
    }
  } catch (e) {
    address.value = "Manzilni yuklab bo‘lmadi"
  }
}




const openMap = (type: 'google' | 'yandex' | 'gis') => {
  if(!field) return

  const lat = field.value.lat
  const lng = field.value.lng

  let url = '';

  switch (type) {
    case 'google':
      url = `https://www.google.com/maps?q=${lat},${lng}`;
      break;
    case 'yandex':
      url = `https://yandex.com/maps/?pt=${lng},${lat}&z=17&l=map`
      break;
    case 'gis':
      url = `https://2gis.com/geo/${lng},${lat}`
      break;
  }
  window.open(url, '_blank');
}


const iconType: Record<string, string> = {
  Football: new URL('@/assets/icons/football.png', import.meta.url).href,
  Tennis: new URL('@/assets/icons/tennis.png', import.meta.url).href,
  Basketball: new URL('@/assets/icons/basketball-ball.png', import.meta.url).href
}

const date = ref("")
const times = ["18:00","19:00","20:00","21:00","22:00","23:00"]


const showModal = ref(false);

const connectToOwner = () => {
  showModal.value = true;
}


function isBooked(time: string) {
  if (!field.value) return false

  return bookingStore.bookings.some(
      (b: any) =>
          b.fieldId === field.value.id &&
          b.date === date.value &&
          b.time === time
  )
}

function book(time: string) {
  if (!field.value) return

  bookingStore.book({
    fieldId: field.value.id,
    date: Number(date.value),
    time: time,
    paymentType: "offline"
  })

  alert("Band qilindi (demo)")
}


onMounted(() => {
  interval = setInterval(() => {

    offset.value += STEP * CARD_WIDTH

    if (offset.value >= TOTAL_WIDTH) {
      slider.value!.style.transition  = "none"

      offset.value = offset.value % TOTAL_WIDTH

      requestAnimationFrame (() => {
        slider.value!.style.transition  = "transform 0.7s ease-in-out"
      })
      offset.value -= TOTAL_WIDTH
    }
  }, 4000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})

watch(field,() => {
  getAddressFromLatLng()
}, {immediate: true})

</script>
<style scoped>
.parentImage{
  background-image: url("@/assets/icons/field.png");
  background-position: center;
  background-repeat: no-repeat;
  --un-backdrop-hue-rotate: revert;
}
</style>

