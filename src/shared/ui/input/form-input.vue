<script setup lang="ts">
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "../form"
import { UiInput } from "../input"

type Props = {
  name: string
}

defineProps<Props>()
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <UiInput placeholder="shadcn" v-bind="componentField" />
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
