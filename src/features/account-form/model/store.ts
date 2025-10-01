import { defineStore } from "pinia"
import { ref, watch } from "vue"
import { AuthFormSchema, type AccountFormData } from "./form"
import { loadFormsFromLS, saveFormsToLS } from "./local-storage"

export const useAccountFormStore = defineStore("account-form", () => {
  const forms = ref<AccountFormData[]>(loadFormsFromLS())

  function addForm() {
    forms.value.push({
      tags: "",
      type: "local",
      login: "",
      password: "",
    })
  }

  function updateFieldIfValid(
    index: number,
    values: AccountFormData,
    validate: () => void,
  ) {
    validate()
    const parsed = AuthFormSchema.safeParse(values)

    if (parsed.success) {
      forms.value[index] = values
    }
  }

  function removeFormByIndex(index: number) {
    forms.value.splice(index, 1)
  }

  watch(forms, () => saveFormsToLS(forms.value), { deep: true })

  return { forms, addForm, updateFieldIfValid, removeFormByIndex }
})
