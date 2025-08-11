import { io, Socket } from "socket.io-client";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const socket: Socket = io(backendURL, {
  transports: ["websocket"], // force websocket only (faster, avoids polling)
});
