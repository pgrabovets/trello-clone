<script setup lang="ts">
import BoardColumn from '@/components/board/BoardColumn.vue'
import { useBoardStore } from '@/stores/board'

const { boardList } = useBoardStore()
</script>

<template>
  <main class="the_board p-2">
    <div v-for="item in boardList" :key="item.id">
      <BoardColumn :data="item" />
    </div>
  </main>
</template>

<style lang="css" scoped>
.the_board {
  display: flex;
  gap: 12px;
  height: calc(100vh - 56px);
  overflow-x: auto;
}
</style>
