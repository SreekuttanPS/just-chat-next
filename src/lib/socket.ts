import { io, Socket } from "socket.io-client";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

let socket: Socket;

export function getSocket() {
  if (!socket) {
    socket = io(backendURL, {
      transports: ["websocket"],
      autoConnect: false,
    });
  }
  return socket;
}
