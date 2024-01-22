import { create } from "zustand";
import { LoginOutput } from "../types";

export const emptyUser = {
  id: NaN,
  username: "",
  token: "",
};

interface AppState {
  user: LoginOutput;
  setUser: (user: LoginOutput) => void;
}

const useAppStore = create<AppState>()((set) => ({
  user: emptyUser,
  setUser: (user: LoginOutput) => set({ user: user }),
}));

export default useAppStore;
