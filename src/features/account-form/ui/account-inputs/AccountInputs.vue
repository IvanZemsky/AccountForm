<script setup lang="ts">
import { UiInput, UiTextarea, FormInput } from "@/shared/ui"
import { toTypedSchema } from "@vee-validate/zod"
import { TrashIcon } from "lucide-vue-next"
import { AuthFormSchema } from "../../model/form"
import { useForm, Form } from "vee-validate"
import TypeSelect from "./TypeSelect.vue"

const formSchema = toTypedSchema(AuthFormSchema)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})
</script>

<template>
  <Form :validation-schema="formSchema">
    <div class="flex items-center gap-2">
      <FormInput
        class="w-55"
        :as="UiTextarea"
        name="tags"
        placeholder="XXXXXXX; IIIIII;"
      />

      <TypeSelect name="type" />

      <FormInput
        class="grow"
        :as="UiInput"
        name="login"
        placeholder="Значение"
      />

      <FormInput
        class="grow"
        :as="UiInput"
        name="password"
        placeholder="Пароль"
      />

      <button>
        <TrashIcon class="w-8 h-8" />
      </button>
    </div>
  </Form>
</template>
