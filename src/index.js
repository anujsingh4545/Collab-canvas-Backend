import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";
import cors from "cors";

import RoomRoute from "./Routes/RoomCreator.js";
import UserRoute from "./Routes/UserRoute.js";
import socketLogic from "./Socket/SocketIndex.js";
import {DbConnect} from "./Controllers/DbConntect.js";

const Port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

// Call socketLogic function and pass the io instance to it
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
DbConnect();

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.use("/api/v1/room", RoomRoute);
app.use("/api/v1/user", UserRoute);

server.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
