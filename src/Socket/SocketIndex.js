// socketLogic.js
const socketLogic = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id);
    // Joining a room
    socket.on("joinRoom", (roomId) => {
      console.log(socket.id + " Joined room " + roomId);
      socket.join(roomId);
    });

    socket.on("newUserWrite", (roomId) => {
      socket.to(roomId).emit("requestDataWrite", socket.id);
    });
    socket.on("newUserDraw", (roomId) => {
      socket.to(roomId).emit("requestDataDraw", socket.id);
    });

    // Handling drawing updates from clients for a specific room
    socket.on("text", (data) => {
      const {roomId, text} = data;

      socket.to(roomId).emit("text", text);
    });

    socket.on("element", (data) => {
      const {roomId, drawing} = data;
      socket.to(roomId).emit("element", drawing);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected" + socket.id);
    });
  });
};

export default socketLogic;
