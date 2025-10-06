import type { AccountFormData, AccountFormsInLS } from "./form"

export function loadFormsFromLS(): AccountFormData[] {
  const data = localStorage.getItem("account-forms")

  if (!data) {
    return []
  }

  const forms: AccountFormsInLS[] = JSON.parse(data)

  return forms.map((form) => ({
    id: form.id,
    tags: form.tags.map((tag) => tag.text).join(";"),
    type: form.type,
    login: form.login,
    password: form.password,
  }))
}

export function saveFormsToLS(forms: AccountFormData[]) {
  const values: AccountFormsInLS[] = forms.map((form) => ({
    id: form.id,
    tags: formatTagsForLS(form.tags),
    type: form.type,
    login: form.login,
    password: form.password,
  }))

  console.log("Сохранение в localStorage:", values)
  localStorage.setItem("account-forms", JSON.stringify(values))
}

function formatTagsForLS(tags: string) {
  return tags.split(";").map((tag) => ({
    text: tag.trim(),
  }))
}
