// stores/booking.store.ts
import { defineStore } from "pinia"
import {Booking} from "@/ModelType/modelType";

export const useBookingStore = defineStore("booking", {
    state: () => ({
        bookings: JSON.parse(localStorage.getItem("bookings") || "[]")
    }),
    actions: {
        book(payload: Booking) {
            this.bookings.push(payload)
            localStorage.setItem("book", JSON.stringify(this.book))
        }
    }
})
