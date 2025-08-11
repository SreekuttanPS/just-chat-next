import { create } from "zustand";
// import { persist } from "zustand/middleware";
import type { IncomingMessage } from "../utils/types";

export type ChatState = {
  messages: (IncomingMessage & {
    transferType: "sent" | "recieved";
    messageType: "text" | "info";
    id: string;
  })[];
  currentUser: string;
};

type Actions = {
  addMessage: (
    _data: IncomingMessage & { messageType: "text" | "info" }
  ) => void;
  addUser: (_userData: string) => void;
};

export const chatStore = create<ChatState & Actions>()((set) => ({
  messages: [],
  currentUser: "",
  addMessage: (data) =>
    set((state) => {
      let transferType: "recieved" | "sent" = "recieved";
      const random = Math.random().toString(36).substring(2, 10);
      const id = `${data.username}_${data.timestamp}_${random}`;
      if (state.currentUser === data.username) {
        transferType = "sent";
      }
      return {
        ...state,
        messages: [...state.messages, { ...data, transferType, id }],
      };
    }),
  addUser: (userData) =>
    set((state) => ({
      ...state,
      currentUser: userData,
    })),
}));

// export const chatStore = create<ChatState & Actions>()(
//   persist(
//     (set) => ({
//       messages: [],
//       currentUser: {} as IncomingMessage,
//       addMessage: (data) =>
//         set((state) => {
//           let transferType: "recieved" | "sent" = "recieved";
//           const id = `${data.username}_${data.timestamp}`;
//           if (state.currentUser.username === data.username) {
//             transferType = "sent";
//           }
//           return {
//             ...state,
//             messages: [...state.messages, { ...data, transferType, id }],
//           };
//         }),
//       addUser: (userData) =>
//         set((state) => ({
//           ...state,
//           currentUser: userData,
//         })),
//     }),
//     {
//       name: "just-chat-store", // name of the item in the storage.
//     }
//   )
// );

export default chatStore;
