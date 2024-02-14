import { Server as socketIo } from "socket.io";
let io;
const userSockets = new Map();
export function getUserSocketId(userId) {
  return userSockets.get(userId);
}
export function initSocket(server) {
  io = new socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("register", (userId) => {
      const user = getUserSocketId(userId);
      if (!user) {
        console.log(`Client conncted: ${socket.id}`);
        userSockets.set(userId, socket.id);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
      const userId = [...userSockets.entries()].find(
        ([_, v]) => v === socket.id
      )?.[0];
      if (userId) {
        userSockets.delete(userId);
      }
    });
  });

  return io;
}

export const getIo = () => {
  if (!io) throw new Error("Socket.io hasn't been initialized!");
  return io;
};
