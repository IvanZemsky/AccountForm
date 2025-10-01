<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  UiSelect,
} from "@/shared/ui"
import type { AcceptableValue } from "reka-ui"

type Props = {
  name: string
  class?: HTMLAttributes["class"]
  defaultValue?:  AcceptableValue | AcceptableValue[] | undefined
}

const props = defineProps<Props>()

defineEmits<{
  (e: "change"): void
}>()
</script>

<template>
  <FormField
    v-slot="{ componentField }"
    :name="name"
  >
    <FormItem :class="props.class" @change="$emit('change')">
      <FormControl>
        <UiSelect default-value="local" v-bind="componentField">
          <slot/>
        </UiSelect>
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
