<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { FilePenLine, Trash2 } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { reactive, ref, watch } from 'vue'
import { useBoardStore } from '@/stores/board'
import TaskStatusSelect from './TaskStatusSelect.vue'
import type { TaskType } from '@/stores/board'

const props = defineProps<{
  status: string
  id: string
  data: TaskType
}>()

const { updateTask, deleteTask, moveTask } = useBoardStore()

const isDialogOpen = ref(false)

const taskData = reactive({ ...props.data })
const statusId = ref(props.id)
const titleError = ref('')

const handleSubmit = () => {
  if (taskData.title.length === 0) {
    titleError.value = 'Field is required'
    return
  }

  updateTask(props.id, taskData)

  if (props.id !== statusId.value) {
    moveTask(props.id, statusId.value, taskData)
  }

  isDialogOpen.value = false
}

const handleDelete = () => {
  deleteTask(props.id, props.data.id)
  isDialogOpen.value = false
}

watch(isDialogOpen, (value) => {
  if (!value) {
    resetForm()
  }
})

const resetForm = () => {
  statusId.value = props.id
  Object.assign(taskData, { ...props.data })
  titleError.value = ''
}
</script>
<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <Button variant="ghost" size="icon">
        <FilePenLine class="w-4 h-4" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit card</DialogTitle>
      </DialogHeader>
      <DialogDescription />
      <form class="grid gap-2">
        <div>
          <Label for="title" class="text-right font-semibold"> Title: </Label>
          <Input id="title" placeholder="Task title" v-model.trim="taskData.title" required />
          <p v-if="titleError" class="text-red-500 text-sm my-1">{{ titleError }}</p>
        </div>
        <div>
          <Label for="descr" class="text-right font-semibold"> Description: </Label>
          <Textarea
            id="descr"
            placeholder="Type description here."
            v-model="taskData.description"
          />
        </div>
        <div>
          <Label for="resp" class="text-right font-semibold"> Responsible person: </Label>
          <Input id="resp" v-model="taskData.person" />
        </div>
        <div>
          <Label for="assignee" class="text-right font-semibold"> Assignee: </Label>
          <Input id="assignee" v-model="taskData.assignee" />
        </div>
        <div>
          <Label for="priority" class="text-right font-semibold"> Priority: </Label>
          <Input id="priority" v-model="taskData.priority" />
        </div>
        <div>
          <Label class="text-right font-semibold"> Status: </Label>
          <TaskStatusSelect v-model="statusId" />
        </div>
      </form>
      <DialogFooter>
        <div class="flex justify-between w-full mt-4">
          <Button size="icon" variant="destructive" @click="handleDelete"> <Trash2 /> </Button>
          <Button type="submit" @click="handleSubmit"> Save card </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
