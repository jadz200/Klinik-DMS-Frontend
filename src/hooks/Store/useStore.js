import create from "zustand";

export const useStore = create((set) => ({
  filter: "",
  setFilter: (text) => set({ filter: text }),
  selectedItems: [],
  setSelectedItems: (newItems) => set({ selectedItems: newItems }),
  removeAllSelecetedItems: () => set({ selectedItems: [] }),
}));
