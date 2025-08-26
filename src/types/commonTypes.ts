export type SocketMessage = {
  message: string;
  timestamp: string;
  messageId: string;
  messageType: "text" | "info";
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
};

export type UserListItem = {
  socketId: string;
  username: string;
  name: string;
};

export type UserResponse = {
  username: string;
  name: string;
};