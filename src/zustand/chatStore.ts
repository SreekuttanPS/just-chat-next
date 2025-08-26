import toast from "react-hot-toast";

import { SocketMessage, StoreMessage, UserListItem } from "@/types/commonTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ChatState = {
  messages: {
    mainThread: StoreMessage[];
    private: Record<string, StoreMessage[]>;
  };
  allOnlineUsers: UserListItem[];
  replyTo: {
    messageId: string;
    message: string;
    username: string;
    name: string;
  } | null;
  notifications: {
    mainThread: boolean;
    private: Record<string, boolean>;
  };
};

type Actions = {
  updateMainThread: (_data: SocketMessage, username: string) => void;
  updateDirectMessage: (
    _data: SocketMessage,
    _roomName: string,
    username: string
  ) => void;
  clearMessages: (dmId?: string) => void;
  resetChatState: () => void;
  addReplyMessage: (messageId: string, chatType?: string) => void;
  removeReplyMessage: () => void;
  updateOnlineUsers: (users: UserListItem[]) => void;
  createDirectMessage: (_roomName: string) => void;
  updateNotifications: (type: "add" | "remove", _roomName?: string) => void;
};

const initialState: ChatState = {
  messages: {} as ChatState["messages"],
  allOnlineUsers: [],
  replyTo: null,
  notifications: {
    mainThread: false,
    private: {},
  },
};

export const chatStore = create<ChatState & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      updateMainThread: (data, currentUsername) =>
        set((state) => {
          let transferType: "recieved" | "sent" = "recieved";
          if (currentUsername === data?.user?.username) {
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
      updateDirectMessage: (data, roomName, currentUsername) =>
        set((state) => {
          let transferType: "recieved" | "sent" = "recieved";
          if (currentUsername === data?.user?.username) {
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
      updateNotifications: (type, roomName) =>
        set((state) => {
          if (roomName) {
            if (type === "add") {
              toast("Hello World");
            }
            return {
              ...state,
              notifications: {
                ...state.notifications,
                private: {
                  ...state.notifications.private,
                  [roomName]: type === "add" ? true : false,
                },
              },
            };
          }
          if (type === "add") {
            toast("New message in the main thread");
          }
          return {
            ...state,
            notifications: {
              ...state.notifications,
              mainThread: type === "add" ? true : false,
            },
          };
        }),
    }),
    {
      name: "just-chat-store", // name of the item in the storage.
    }
  )
);

export default chatStore;
