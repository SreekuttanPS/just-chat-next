export type IncomingMessage = {
  username: { username: string; name: string };
  message: string;
  timestamp: string;
  messageId?: string;
};