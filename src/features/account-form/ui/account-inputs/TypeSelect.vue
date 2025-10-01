<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  UiSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/shared/ui"

type Props = {
  name: string
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <FormField
    v-slot="{ componentField }"
    :name="name"
    :validateOnBlur="true"
    :validateOnChange="false"
    :validateOnInput="false"
    :validateOnModelUpdate="false"
  >
    <FormItem :class="props.class">
      <FormControl>
        <UiSelect default-value="local" v-bind="componentField">
          <SelectTrigger class="grow w-[180px]">
            <SelectValue placeholder="Значение" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ldap">LDAP</SelectItem>
              <SelectItem value="local">Локальная</SelectItem>
            </SelectGroup>
          </SelectContent>
        </UiSelect>
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
