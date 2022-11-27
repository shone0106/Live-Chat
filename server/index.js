const express = require("express");
const http = require("http");
const cors = require("cors");
const {Server} = require('socket.io')

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"https://chat-client-0z6j.onrender.com",
        methods: ['GET', 'POST']
    }
});

io.on("connection", (socket) => {

    console.log("User connected");

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(data)
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
      });
});

server.listen(process.env.PORT || 3001, () => {
    console.log("server running");
})
