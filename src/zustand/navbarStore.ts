import { create } from "zustand";

type navbarState = {
  isOpen: boolean;
};

type Actions = {
  toggleNavbar: () => void;
};

export const navbarStore = create<navbarState & Actions>((set) => ({
  isOpen: true,
  toggleNavbar: () =>
    set((state) => ({
      ...state,
      isOpen: !state?.isOpen,
    })),
}));
