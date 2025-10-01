<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue"
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/shared/ui"
import { cn } from "../lib/css"

type Props = {
  name: string
  as: Component
  class?: HTMLAttributes["class"]
  placeholder?: string
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
    <FormItem :class="cn(props.class)">
      <FormControl>
        <component
          :is="as"
          v-bind="componentField"
          class="grow resize-none max-h-15"
          :placeholder="placeholder"
        />
      </FormControl>
      <FormDescription />
      <FormMessage class="absolute bottom-[-20px]"/>
    </FormItem>
  </FormField>
</template>
