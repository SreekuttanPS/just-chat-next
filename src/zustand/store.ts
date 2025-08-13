import { IncomingMessage } from "@/types/commonTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MessageType = IncomingMessage & {
  transferType: "sent" | "recieved";
  messageType: "text" | "info";
  messageId: string;
  replyTo?: {
    messageId: string;
    message: string;
    username: string;
  };
};

type ChatState = {
  messages: {
    mainThread: MessageType[];
    private: {
      [key: string]: MessageType[];
    };
  };
  currentUser: { username: string; name: string };
  replyTo?: MessageType | null;
};

type Actions = {
  addMessage: (
    _data: IncomingMessage & { messageType: "text" | "info" }
  ) => void;
  addUser: (_userData: ChatState["currentUser"]) => void;
  clearMessages: (dmId?: string) => void;
  resetChatState: () => void;
  addReplyMessage: (messageId: string, chatType?: string) => void;
  removeReplyMessage: () => void;
};

export const chatStore = create<ChatState & Actions>()(
  persist(
    (set) => ({
      messages: {} as ChatState["messages"],
      currentUser: {} as ChatState["currentUser"],
      replyTo: null,
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
      addReplyMessage: (messageId, chatType = "main") =>
        set((state) => {
          if (chatType === "main") {
            return {
              ...state,
              replyTo: state.messages.mainThread.find(
                (msg) => msg.messageId === messageId
              ),
            };
          }

          return {
            ...state,
            replyTo: state.messages.private[chatType]?.find(
              (msg) => msg.messageId === messageId
            ),
          };
        }),
      removeReplyMessage: () =>
        set((state) => ({
          ...state,
          replyTo: null,
        })),
    }),
    {
      name: "just-chat-store", // name of the item in the storage.
    }
  )
);

export default chatStore;
