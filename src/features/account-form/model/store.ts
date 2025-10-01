import { defineStore } from "pinia"
import { ref, watch } from "vue"
import {
  AuthFormSchema,
  formatTags,
  type AccountFormData,
  type AccountFormsInLS,
} from "./form"

export const useAccountFormStore = defineStore("account-form", () => {
  const forms = ref<AccountFormData[]>(loadFromLs())

  function loadFromLs(): AccountFormData[] {
    const data = localStorage.getItem("account-forms")

    if (!data) {
      return []
    }

    const forms: AccountFormsInLS[] = JSON.parse(data)

    return forms.map((form) => ({
      tags: form.tags.map((tag) => tag.text).join(";"),
      type: form.type,
      login: form.login,
      password: form.password,
    }))
  }

  function addForm() {
    forms.value.push({
      tags: "",
      type: "local",
      login: "",
      password: "",
    })
  }

  function updateFieldIfValid(index: number, values: AccountFormData, validate: () => void) {
    validate()
    const parsed = AuthFormSchema.safeParse(values)

    if (parsed.success) {
      forms.value[index] = values
    }
  }

  function removeFormByIndex(index: number) {
    forms.value.splice(index, 1)
  }

  watch(
    () => forms.value,
    (forms) => {
      const values: AccountFormsInLS[] = forms.map((form) => ({
        tags: formatTags(form.tags),
        type: form.type,
        login: form.login,
        password: form.password,
      }))

      console.log("Сохранение в localStorage:", values)
      localStorage.setItem("account-forms", JSON.stringify(values))
    },
    { deep: true },
  )

  return { forms, addForm, updateFieldIfValid, removeFormByIndex }
})
