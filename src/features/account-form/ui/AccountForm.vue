<script setup lang="ts">
import { UiInput, UiTextarea, FormInput, UiForm } from "@/shared/ui"
import { toTypedSchema } from "@vee-validate/zod"
import { TrashIcon } from "lucide-vue-next"
import { AuthFormSchema, type AccountFormData } from "../model/form"
import {
  FormSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui"
import { useAccountFormStore } from "../model/store"

const formSchema = toTypedSchema(AuthFormSchema)

type Props = {
  data: AccountFormData
  index: number
}

defineProps<Props>()

const { updateFieldIfValid, removeFormByIndex } = useAccountFormStore()
</script>

<template>
  <UiForm
    v-slot="{ values, validate }"
    :initial-values="data"
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

      <FormSelect
        name="type"
        @change="updateFieldIfValid(index, values as AccountFormData, validate)"
      >
        <SelectTrigger class="grow w-[180px]">
          <SelectValue placeholder="Значение" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="ldap">LDAP</SelectItem>
            <SelectItem value="local">Локальная</SelectItem>
          </SelectGroup>
        </SelectContent>
      </FormSelect>

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
  </UiForm>
</template>
