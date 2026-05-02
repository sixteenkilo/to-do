import { create } from "zustand";

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

export const useStore = create<Store>((set) => ({
  projects: [],

  createProject: (title, description) => {
    set((state) => {
      const newProject: Project = {
        id: crypto.randomUUID(),
        title,
        description,
      };

      return {
        projects: [...state.projects, newProject],
      };
    });
  },

  updateProject: (id, data) => {
    set((state) => {
      const updated = state.projects.map((p) => {
        if (p.id === id) {
          return { ...p, ...data };
        }
        return p;
      });

      return { projects: updated };
    });
  },

  deleteProject: (id) => {
    set((state) => {
      const filtered = state.projects.filter((p) => {
        return p.id !== id;
      });

      return { projects: filtered };
    });
  },
}));
