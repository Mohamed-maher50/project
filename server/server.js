const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(require("cookie-parser")());
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
require("dotenv").config();
require("./db/connection");

//
app.use(express.json());

app.use(require("./routes/user"));
app.use(require("./routes/Postes"));
const server = app.listen(process.env.PORT, () => {
  console.log("listen in port 4000");
});
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  socket.on("setup", (data) => {
    socket.join("Room");
    console.log("first");
  });
  socket.on("joinWith", (roomName) => {
    socket.join(roomName);
    console.log(socket.rooms);
  });
});
