<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { FormField, FormItem, FormControl, FormDescription, FormMessage } from "./form"

type Props = {
  name: string
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem :class="props.class">
      <FormControl>
        <slot :component-field="componentField" />
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
