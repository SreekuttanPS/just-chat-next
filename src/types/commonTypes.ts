export type SocketMessage = {
  message: string;
  timestamp: string;
  messageId: string;
  user: {
    name: string;
    username: string;
  };
  replyTo: {
    messageId: string;
    message: string;
    username: string;
    name: string;
  } | null;
};

export type StoreMessage = SocketMessage & {
  transferType: "sent" | "recieved";
  messageType: "text" | "info";
};
