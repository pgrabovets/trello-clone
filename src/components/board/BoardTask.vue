<script setup lang="ts">
import EditTaskDialog from './EditTaskDialog.vue'
import type { TaskType } from '@/stores/board'

const props = defineProps<{
  statusId: string
  statusTitle: string
  data: TaskType
}>()
</script>

<template>
  <div class="board_task">
    <h5>{{ props.data.title }}</h5>
    <EditTaskDialog :data="props.data" :status="props.statusTitle" :id="props.statusId" />
  </div>
</template>

<style lang="css" scoped>
.board_task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  min-height: 36px;
  cursor: pointer;
  box-shadow:
    rgba(9, 30, 66, 0.25) 0px 1px 1px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  background-color: rgb(255, 255, 255);
  padding: 8px 12px 4px;
}

.board_task h5 {
  font-size: 14px;
  color: rgb(23, 43, 77);
}
</style>
