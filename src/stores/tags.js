import { create } from "zustand";

const useTagsStore = create((set) => ({
  selectedTags: {},
  setSelectedTags: (data) => set(() => ({ selectedTags: data })),
}));

export { useTagsStore };
