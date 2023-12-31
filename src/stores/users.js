import {create} from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (newUserData) => set(() => ({ user: newUserData })),
}));

export {useUserStore}
