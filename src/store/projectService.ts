import { create } from "zustand";
import { persist } from "zustand/middleware";

type Project = {
  id: string;
  title: string;
  description?: string;
};

type Store = {
  projects: Project[];

  createProject: (title: string, description?: string) => void;

  updateProject: (id: string, data: Partial<Project>) => void;

  deleteProject: (id: string) => void;
};

export const useProject = create<Store>()(
  persist(
    (set) => ({
      projects: [],

      createProject: (title, description) => {
        set((state) => ({
          projects: [
            ...state.projects,
            {
              id: crypto.randomUUID(),
              title,
              description,
            },
          ],
        }));
      },

      updateProject: (id, data) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...data } : p,
          ),
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        }));
      },
    }),
    {
      name: "project-storage",
    },
  ),
);
