<script setup lang="ts">
import BoardTask from './BoardTask.vue'
import draggable from 'vuedraggable'
import CreateTaskDialog from './CreateTaskDialog.vue'
import { ref, watch } from 'vue'
import { useBoardStore } from '@/stores/board'
import type { BoardListItem } from '@/stores/board'

const { updateList } = useBoardStore()

const props = defineProps<{
  data: BoardListItem
}>()

const tasks = ref(props.data.tasks)

watch(tasks, () => {
  updateList(props.data.id, tasks.value)
})
</script>

<template>
  <div class="board_card">
    <draggable class="card_content" v-model="tasks" group="tasks" item-key="id">
      <template #header>
        <div class="card_title">
          <h2>{{ props.data.title }}</h2>
        </div>
      </template>
      <template #item="{ element }">
        <BoardTask :data="element" :status-id="props.data.id" :status-title="props.data.title" />
      </template>
      <template #footer>
        <div class="card_footer">
          <CreateTaskDialog :status="props.data.title" :id="props.data.id" />
        </div>
      </template>
    </draggable>
  </div>
</template>

<style lang="css" scoped>
.board_card {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  width: 272px;
  border-radius: 12px;
  background-color: #f1f2f4;
  color: #44546f;
  padding: 8px;
}
.card_title {
  padding-left: 8px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(23, 43, 77);
  margin: 8px 0;
}
.card_content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  min-height: 36px;
}
.card_footer {
  margin: 8px 0 4px;
}
</style>
