<script setup lang="ts">
import { Button } from '@/components/ui/button'
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
import { Plus } from 'lucide-vue-next'
import { Textarea } from '@/components/ui/textarea'
import { reactive, ref, watch } from 'vue'
import { useBoardStore } from '@/stores/board'
import TaskStatusSelect from './TaskStatusSelect.vue'

const props = defineProps<{
  status: string
  id: string
}>()

const { createTask, moveTask } = useBoardStore()

const isDialogOpen = ref(false)

const taskData = reactive({
  title: '',
  description: '',
  person: '',
  assignee: '',
  priority: '',
})

const titleError = ref('')

const statusId = ref(props.id)

const handleSubmit = () => {
  if (taskData.title.length === 0) {
    titleError.value = 'Field is required'
    return
  }

  const task = createTask(props.id, taskData)

  if (props.id !== statusId.value) {
    moveTask(props.id, statusId.value, task)
  }

  isDialogOpen.value = false
}

watch(isDialogOpen, (value) => {
  if (!value) {
    statusId.value = props.id
    resetForm()
  }
})

const resetForm = () => {
  taskData.title = ''
  taskData.description = ''
  taskData.person = ''
  taskData.assignee = ''
  taskData.priority = ''
  titleError.value = ''
}
</script>
<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <Button variant="ghost">
        <Plus />
        <span class="text-sm font-semibold">Add a card</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add card</DialogTitle>
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
          <TaskStatusSelect v-model="statusId" disabled />
        </div>
      </form>
      <DialogFooter>
        <Button type="submit" @click="handleSubmit"> Add card </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
