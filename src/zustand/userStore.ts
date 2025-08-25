import { create } from "zustand";

type ChatState = {
  currentUser: {
    username: string;
    name: string;
  };
};

type Actions = {
  addUser: (_userData: ChatState["currentUser"]) => void;
  removeUser: (_userData: ChatState["currentUser"]) => void;
};

export const userStore = create<ChatState & Actions>((set) => ({
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
