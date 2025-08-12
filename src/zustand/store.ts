import { IncomingMessage } from "@/types/commonTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MessageType = IncomingMessage & {
  transferType: "sent" | "recieved";
  messageType: "text" | "info";
  messageId: string;
};

type ChatState = {
  messages: {
    mainThread: MessageType[];
    private: {
      [key: string]: MessageType[];
    };
  };
  currentUser: { username: string; name: string };
};

type Actions = {
  addMessage: (
    _data: IncomingMessage & { messageType: "text" | "info" }
  ) => void;
  addUser: (_userData: ChatState["currentUser"]) => void;
  clearMessages: (dmId?: string) => void;
  resetChatState: () => void;
};

export const chatStore = create<ChatState & Actions>()(
  persist(
    (set) => ({
      messages: {} as ChatState["messages"],
      currentUser: {} as ChatState["currentUser"],
      addMessage: (data) =>
        set((state) => {
          let transferType: "recieved" | "sent" = "recieved";
          const id = data?.messageId || `${data.username}_${data.timestamp}`;
          if (state.currentUser?.username === data.username?.username) {
            transferType = "sent";
          }
          return {
            ...state,
            messages: {
              ...(state?.messages || {}),
              mainThread: [
                ...(state?.messages?.mainThread || []),
                { ...data, transferType, messageId: id },
              ],
            },
          };
        }),
      addUser: (userData) =>
        set((state) => ({
          ...state,
          currentUser: userData,
        })),
      clearMessages: (dmId) =>
        set((state) => {
          if (dmId) {
            return {
              ...state,
              messages: {
                ...state.messages,
                private: {
                  ...state.messages.private,
                  [dmId]: [],
                },
              },
            };
          }
          return {
            ...state,
            messages: {
              ...state.messages,
              mainThread: [],
            },
          };
        }),
      resetChatState: () =>
        set(() => ({
          messages: {} as ChatState["messages"],
          currentUser: {} as ChatState["currentUser"],
        })),
    }),
    {
      name: "just-chat-store", // name of the item in the storage.
    }
  )
);

export default chatStore;

// export const chatStore = create<ChatState & Actions>()((set) => ({
//   messages: [],
//   currentUser: "",
//   addMessage: (data) =>
//     set((state) => {
//       let transferType: "recieved" | "sent" = "recieved";
//       const random = Math.random().toString(36).substring(2, 10);
//       const id = `${data.username}_${data.timestamp}_${random}`;
//       if (state.currentUser === data.username) {
//         transferType = "sent";
//       }
//       return {
//         ...state,
//         messages: [...state.messages, { ...data, transferType, id }],
//       };
//     }),
//   addUser: (userData) =>
//     set((state) => ({
//       ...state,
//       currentUser: userData,
//     })),
// }));
