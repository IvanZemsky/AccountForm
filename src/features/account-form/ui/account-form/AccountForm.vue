<script setup lang="ts">
import { UiInput, UiTextarea, FormInput } from "@/shared/ui"
import { toTypedSchema } from "@vee-validate/zod"
import { TrashIcon } from "lucide-vue-next"
import { AuthFormSchema, type AccountFormData } from "../../model/form"
import { Form } from "vee-validate"
import TypeSelect from "./TypeSelect.vue"
import { useAccountFormStore } from "../../model/store"

const formSchema = toTypedSchema(AuthFormSchema)

type Props = {
  data: AccountFormData
  index: number
}

const props = defineProps<Props>()

const formsStore = useAccountFormStore()

function updateFieldIfValid(values: AccountFormData) {
  const parsed = AuthFormSchema.safeParse(values)

  if (parsed.success) {
    formsStore.updateForm(props.index, values)
  }
}
</script>

<template>
  <Form
    :initial-values="data"
    v-slot="{ values }"
    :validation-schema="formSchema"
  >
    <div class="flex items-center gap-2">
      <FormInput
        class="w-55"
        :as="UiTextarea"
        name="tags"
        placeholder="XXXXXXX; IIIIII;"
        @change="updateFieldIfValid(values as AccountFormData)"
      />

      <TypeSelect
        name="type"
        @change="updateFieldIfValid(values as AccountFormData)"
      />

      <FormInput
        class="grow"
        :as="UiInput"
        name="login"
        placeholder="Значение"
        @change="updateFieldIfValid(values as AccountFormData)"
      />

      <FormInput
        v-if="values.type === 'local'"
        class="grow"
        :as="UiInput"
        name="password"
        placeholder="Пароль"
        @change="updateFieldIfValid(values as AccountFormData)"
      />

      <button type="button" @click="formsStore.removeFormByIndex(index)">
        <TrashIcon class="w-8 h-8" />
      </button>
    </div>
  </Form>
</template>
