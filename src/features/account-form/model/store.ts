import { defineStore } from "pinia"
import { ref, watch } from "vue"
import { AuthFormSchema, type AccountFormData } from "./form"
import { loadFormsFromLS, saveFormsToLS } from "./local-storage"

export const useAccountFormStore = defineStore("account-form", () => {
  const forms = ref<AccountFormData[]>(loadFormsFromLS())

  function addForm() {
    forms.value.push({
      id: Date.now(),
      tags: "",
      type: "local",
      login: "",
      password: "",
    })
  }

  function updateFieldIfValid(
    id: number,
    values: AccountFormData,
    validate: () => void,
  ) {
    validate()
    const parsed = AuthFormSchema.safeParse(values)

    if (parsed.success) {
      forms.value = forms.value.map((form) => {
        if (form.id === id) {
          return parsed.data
        }

        return form
      })
    }
  }

  function removeFormById(id: number) {
    forms.value = forms.value.filter((form) => form.id !== id)
  }

  watch(forms, () => saveFormsToLS(forms.value), { deep: true })

  return { forms, addForm, updateFieldIfValid, removeFormById }
})
