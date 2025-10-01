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

defineProps<Props>()

const { updateFieldIfValid, removeFormByIndex } = useAccountFormStore()
</script>

<template>
  <Form
    :initial-values="data"
    v-slot="{ values, validate }"
    :validation-schema="formSchema"
  >
    <div class="flex items-center gap-2">
      <FormInput
        class="w-55"
        :as="UiTextarea"
        name="tags"
        placeholder="XXXXXXX; IIIIII;"
        @change="updateFieldIfValid(index, values as AccountFormData, validate)"
      />

      <TypeSelect
        name="type"
        @change="updateFieldIfValid(index, values as AccountFormData, validate)"
      />

      <FormInput
        class="grow"
        :as="UiInput"
        name="login"
        placeholder="Значение"
        @change="updateFieldIfValid(index, values as AccountFormData, validate)"
      />

      <FormInput
        v-if="values.type === 'local'"
        class="grow"
        :as="UiInput"
        name="password"
        placeholder="Пароль"
        @change="updateFieldIfValid(index, values as AccountFormData, validate)"
      />

      <button type="button" @click="removeFormByIndex(index)">
        <TrashIcon class="w-8 h-8" />
      </button>
    </div>
  </Form>
</template>
