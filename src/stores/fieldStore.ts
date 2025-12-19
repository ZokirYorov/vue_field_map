import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { mockFields } from "@/field/fields"
import type { Field } from "@/ModelType/modelType"

export const useFieldStore = defineStore("field", () => {
    // 🔹 STATE
    const fields = ref(mockFields)
    const selectedField = ref<Field | null>(null)
    const search = ref("")

    // 🔹 GETTER
    const filteredFields = computed(() => {
        if (!search.value) return fields.value
        return fields.value.filter(f =>
            f.name.toLowerCase().includes(search.value.toLowerCase())
        )
    })

    return {
        fields,
        selectedField,
        search,
        filteredFields,
    }
})
