import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  projectId: string;
  completed: boolean;
  dueDate: string | null;
};

type Store = {
  tasks: Task[];

  createTask: (
    title: string,
    projectId: string,
    dueDate?: string | null,
  ) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteTask: (id: string) => void;
};

export const useTask = create<Store>((set) => ({
  tasks: [
    {
      id: "1",
      title: "Сделать UI для задач",
      projectId: "project-1",
      completed: false,
      dueDate: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Настроить zustand store",
      projectId: "project-1",
      completed: true,
      dueDate: null,
    },
    {
      id: "3",
      title: "Добавить фильтр по датам",
      projectId: "project-1",
      completed: false,
      dueDate: new Date(Date.now() + 86400000).toISOString(), // завтра
    },
    {
      id: "4",
      title: "Сделать редактирование проекта",
      projectId: "project-1",
      completed: true,
      dueDate: null,
    },
    {
      id: "5",
      title: "Добавить удаление проекта",
      projectId: "project-1",
      completed: false,
      dueDate: null,
    },
    {
      id: "6",
      title: "Сделать страницу проекта",
      projectId: "project-1",
      completed: true,
      dueDate: new Date().toISOString(),
    },
    {
      id: "7",
      title: "Добавить Popconfirm",
      projectId: "project-1",
      completed: false,
      dueDate: null,
    },
    {
      id: "8",
      title: "Сделать inline edit",
      projectId: "project-1",
      completed: false,
      dueDate: new Date(Date.now() + 2 * 86400000).toISOString(),
    },
    {
      id: "9",
      title: "Добавить checkbox toggle",
      projectId: "project-1",
      completed: true,
      dueDate: null,
    },
    {
      id: "10",
      title: "Подготовить фильтр просроченных",
      projectId: "project-1",
      completed: false,
      dueDate: new Date(Date.now() - 86400000).toISOString(), // вчера
    },
  ],

  createTask: (title, projectId, dueDate = null) => {
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: crypto.randomUUID(),
          title,
          projectId,
          completed: false,
          dueDate,
        },
      ],
    }));
  },

  updateTask: (id, data) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...data } : task,
      ),
    }));
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
}));
