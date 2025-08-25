import { create } from "zustand";

type UserState = {
  currentUser: {
    username: string;
    name: string;
  };
};

type Actions = {
  addUser: (_userData: UserState["currentUser"]) => void;
  removeUser: () => void;
};

export const userStore = create<UserState & Actions>((set) => ({
  currentUser: {
    username: "",
    name: "",
  },
  addUser: (userData) =>
    set((state) => ({
      ...state,
      currentUser: userData,
    })),
  removeUser: () =>
    set((state) => ({
      ...state,
      currentUser: {
        username: "",
        name: "",
      },
    })),
}));
