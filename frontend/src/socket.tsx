import { useEffect } from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:8000", {
  path: "/socket.io",
  autoConnect: false,
});

export const connectSocket = (userId: any) => {
  if (!socket.connected) {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to the server");
      socket.emit("register", userId);
    });
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
function setconversation(arg0: (oldarray: any) => any[]) {
  throw new Error("Function not implemented.");
}
