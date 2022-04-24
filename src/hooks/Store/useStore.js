import create from "zustand";
import jwt_decode from "jwt-decode";

export const useStore = create((set) => ({
  filter: "",
  setFilter: (text) => set({ filter: text }),
  selectedItems: [],
  setSelectedItems: (newItems) => set({ selectedItems: newItems }),
  removeAllSelecetedItems: () => set({ selectedItems: [] }),
  //Resets All Store items
  resetEverything: () => {
    set({
      selectedItems: [],
      filter: "",
    });
  },
  user: localStorage.getItem("authTokens")
    ? jwt_decode(JSON.parse(localStorage.getItem("authTokens")).access)
    : null,
  setUser: (userNow) => set({ user: userNow }),
  authTokens: localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null,
  setAuthTokens: (auth) => set({ authTokens: auth }),
}));
