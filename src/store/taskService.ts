import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useTask = create<Store>()(
  persist(
    (set) => ({
      tasks: [],

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
    }),
    {
      name: "task-storage",
    },
  ),
);
