const express = require("express");
const socket = require("socket.io");


// app setup

let app = express();

const port = 5000;

app.use(express.static("public"));

let server = app.listen(port, () => {
    console.log(`listenning on ${port}`)
})


// socket setup

let io = socket(server);

io.on("connection", function(socket) {
    console.log(socket.id);

    socket.on("chat", function(data) {
        io.sockets.emit("chat", data);
    });

    socket.on("typing", function(data) {
        socket.broadcast.emit("typing", data);
    });
});
