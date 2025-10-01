<script setup lang="ts">
import { PlusIcon } from "lucide-vue-next"
import { storeToRefs } from "pinia"
import { useAccountFormStore } from "../model/store"
import AccountForm from "./account-form/AccountForm.vue"

const formsStore = useAccountFormStore()
const { forms } = storeToRefs(formsStore)

</script>

<template>
  <div class="flex flex-col gap-4">
    <header class="flex items-center gap-1">
      <h1 class="text-xl font-bold">Учетные записи</h1>
      <button @click="formsStore.addForm">
        <PlusIcon />
      </button>
    </header>

    <p class="text-lg bg-gray-300 p-2 rounded">
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель ;
    </p>

    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2 pr-[38px]">
        <p class="w-55">Метки</p>
        <p class="flex-1">Тип записи</p>
        <p class="flex-1">Логин</p>
        <p class="flex-1">Пароль</p>
      </div>
      <AccountForm
        v-for="(form, index) in forms"
        :key="index"
        :index="index"
        :data="form"
      />
    </div>
  </div>
</template>
