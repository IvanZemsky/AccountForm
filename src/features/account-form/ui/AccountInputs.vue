<script setup lang="ts">
import { UiInput, UiTextarea, UiSelect, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from '@/shared/ui';
import FormInput from '@/shared/ui/FormInput.vue';
import { TrashIcon } from 'lucide-vue-next';


</script>


<template>
  <div class="flex items-center gap-2">
    <FormInput class="w-55" name="tags">
      <UiTextarea class="block w-full h-full resize-none" placeholder="XXXX; YYYYYYYYYYY;" />
    </FormInput>

    <FormInput class="grow" name="account-type">
      <UiSelect default-value="local">
        <SelectTrigger class="grow w-[180px]">
          <SelectValue placeholder="Значение" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="ldap">
              LDAP
            </SelectItem>
            <SelectItem value="local">
              Локальная
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </UiSelect>
    </FormInput>

    <FormInput class="grow" name="login">
      <UiInput class="grow" placeholder="Значение" />
    </FormInput>

    <FormInput class="grow" name="login">
      <UiInput class="grow" name="password" type="password" placeholder="Пароль" />
    </FormInput>

    <button>
      <TrashIcon class="w-8 h-8"/>
    </button>
  </div>
</template>
