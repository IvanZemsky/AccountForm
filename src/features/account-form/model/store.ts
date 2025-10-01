import { defineStore } from "pinia"
import { ref, watch } from "vue"
import type { AccountFormData } from "./form"

export const useAccountFormStore = defineStore("account-form", () => {
  const forms = ref<AccountFormData[]>(
    localStorage.getItem("account-forms")
      ? JSON.parse(localStorage.getItem("account-forms") as string)
      : [],
  )

  function addForm() {
    forms.value.push({
      tags: "",
      type: "local",
      login: "",
      password: "",
    })
  }

  function updateForm(index: number, newForm: AccountFormData) {
    forms.value[index] = newForm
  }

  function removeFormByIndex(index: number) {
    forms.value.splice(index, 1)
  }

  watch(
    () => forms.value,
    (value) => {
      console.log("Сохранение в localStorage:", value)
      localStorage.setItem("account-forms", JSON.stringify(value))
    },
    { deep: true },
  )

  return { forms, addForm, updateForm, removeFormByIndex }
})
