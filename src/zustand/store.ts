import { SocketMessage, StoreMessage, UserListItem } from "@/types/commonTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ChatState = {
  messages: {
    mainThread: StoreMessage[];
    private: {
      [key: string]: StoreMessage[];
    };
  };
  currentUser: { username: string; name: string };
  allOnlineUsers: UserListItem[];
  replyTo: {
    messageId: string;
    message: string;
    username: string;
    name: string;
  } | null;
};

type Actions = {
  updateMainThread: (_data: SocketMessage) => void;
  updateDirectMessage: (_data: SocketMessage, _roomName: string) => void;
  addUser: (_userData: ChatState["currentUser"]) => void;
  clearMessages: (dmId?: string) => void;
  resetChatState: () => void;
  addReplyMessage: (messageId: string, chatType?: string) => void;
  removeReplyMessage: () => void;
  updateOnlineUsers: (users: UserListItem[]) => void;
  createDirectMessage: (_roomName: string) => void;
};

export const chatStore = create<ChatState & Actions>()(
  persist(
    (set) => ({
      messages: {} as ChatState["messages"],
      currentUser: {} as ChatState["currentUser"],
      allOnlineUsers: [],
      replyTo: null,
      updateMainThread: (data) =>
        set((state) => {
          let transferType: "recieved" | "sent" = "recieved";
          if (state.currentUser?.username === data?.user?.username) {
            transferType = "sent";
          }
          return {
            ...state,
            messages: {
              ...(state?.messages || {}),
              mainThread: [
                ...(state?.messages?.mainThread || []),
                { ...data, transferType },
              ],
            },
          };
        }),
      updateDirectMessage: (data, roomName) =>
        set((state) => {
          let transferType: "recieved" | "sent" = "recieved";
          if (state.currentUser?.username === data?.user?.username) {
            transferType = "sent";
          }
          return {
            ...state,
            messages: {
              ...(state?.messages || {}),
              private: {
                ...state?.messages?.private,
                [roomName]: [
                  ...(state?.messages?.private?.[roomName] || []),
                  { ...data, transferType },
                ],
              },
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
      addReplyMessage: (messageId, chatType = "main") =>
        set((state) => {
          if (chatType === "main") {
            const messageObject = state.messages.mainThread.find(
              (msg) => msg.messageId === messageId
            );
            return {
              ...state,
              replyTo: {
                messageId: messageObject?.messageId || "",
                message: messageObject?.message || "",
                username: messageObject?.user?.username || "",
                name: messageObject?.user?.name || "",
              },
            };
          }

          const messageObject = state.messages.private[chatType]?.find(
            (msg) => msg.messageId === messageId
          );
          return {
            ...state,
            replyTo: {
              messageId: messageObject?.messageId || "",
              message: messageObject?.message || "",
              username: messageObject?.user?.username || "",
              name: messageObject?.user?.name || "",
            },
          };
        }),
      removeReplyMessage: () =>
        set((state) => ({
          ...state,
          replyTo: null,
        })),
      updateOnlineUsers: (users) =>
        set((state) => ({
          ...state,
          allOnlineUsers: users,
        })),
      createDirectMessage: (roomName) =>
        set((state) => {
          if (!state.messages.private?.[roomName]) {
            return {
              ...state,
              messages: {
                ...state?.messages,
                private: {
                  ...state?.messages?.private,
                  [roomName]: [],
                },
              },
            };
          }
          return state;
        }),
    }),
    {
      name: "just-chat-store", // name of the item in the storage.
    }
  )
);

export default chatStore;
