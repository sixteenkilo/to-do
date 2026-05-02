import { create } from "zustand";

export const useStore = create((set) => ({
  setState: (partial) => set(partial),
}));
