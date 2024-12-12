<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBoardStore } from '@/stores/board'

const props = defineProps<{
  disabled?: boolean
}>()

const model = defineModel<string>()

const { boardList } = useBoardStore()
</script>

<template>
  <Select v-model="model" :disabled="props.disabled">
    <SelectTrigger class="w-full">
      <SelectValue placeholder="Select a status" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="item in boardList" :key="item.id" :value="item.id">
          {{ item.title }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
