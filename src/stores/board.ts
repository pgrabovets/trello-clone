import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export type TaskType = {
  id: string
  title: string
  description: string
  person: string
  assignee: string
  priority: string
}

export type BoardListItem = {
  id: string
  title: string
  tasks: TaskType[]
}

export const useBoardStore = defineStore('board', () => {
  const boardList = reactive<BoardListItem[]>([
    {
      id: uuidv4(),
      title: 'Todo',
      tasks: [
        {
          id: uuidv4(),
          title: 'Lunch with Sam',
          description: '',
          person: '',
          assignee: '',
          priority: '',
        },
        {
          id: uuidv4(),
          title: 'Learn React',
          description: '',
          person: '',
          assignee: '',
          priority: '',
        },
        {
          id: uuidv4(),
          title: 'Buy milk',
          description: '',
          person: '',
          assignee: '',
          priority: '',
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'In progress',
      tasks: [],
    },
    {
      id: uuidv4(),
      title: 'Done',
      tasks: [],
    },
  ])

  const updateList = (listId: string, tasks: TaskType[]) => {
    const list = boardList.find((item) => {
      return item.id === listId
    })

    if (list) {
      list.tasks = tasks
    }
  }

  const createTask = (
    statusId: string,
    taskData: {
      title: string
      description: string
      person: string
      assignee: string
      priority: string
    },
  ) => {
    const task = {
      id: uuidv4(),
      ...taskData,
    }

    const boardListItem = boardList.find((item) => {
      return item.id === statusId
    })

    boardListItem?.tasks.push(task)
    return task
  }

  const deleteTask = (listId: string, taskId: string) => {
    const boardListItem = boardList.find((item) => {
      return item.id === listId
    })

    if (boardListItem) {
      const index = boardListItem.tasks.findIndex((item) => {
        return item.id === taskId
      })
      if (index !== -1) {
        boardListItem.tasks.splice(index, 1)
      }
    }
  }

  const updateTask = (listId: string, task: TaskType) => {
    const boardListItem = boardList.find((item) => {
      return item.id === listId
    })
    if (boardListItem) {
      const index = boardListItem.tasks.findIndex((item) => {
        return item.id === task.id
      })
      if (index !== -1) {
        boardListItem.tasks[index] = task
      }
    }
  }

  const moveTask = (from: string, to: string, task: TaskType) => {
    let boardListItem = boardList.find((item) => {
      return item.id === from
    })

    if (boardListItem) {
      const index = boardListItem.tasks.findIndex((item) => {
        return item.id === task.id
      })
      if (index !== -1) {
        boardListItem.tasks.splice(index, 1)
      }
    }

    boardListItem = boardList.find((item) => {
      return item.id === to
    })

    if (boardListItem) {
      boardListItem.tasks.push(task)
    }
  }

  return { boardList, updateList, createTask, deleteTask, updateTask, moveTask }
})
