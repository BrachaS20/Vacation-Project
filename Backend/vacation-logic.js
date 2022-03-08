const io = require("socket.io");

let socketsManager;

function start(listener) {

    // Connect once to socket.io library:
    socketsManager = io(listener, { cors: { origin: "http://localhost:3000" } });

    // Listen to any client connection: 
    socketsManager.sockets.on("connection", socket => {
        
        socket.on("msg-from-client", msg => {
            console.log("Client sent message: ", msg);
            socketsManager.sockets.emit("msg-from-server", msg);
        });

        socket.on("client-delete-vacation", id => {
            console.log("Client delete vacation: ", id);
            socketsManager.sockets.emit("msg-from-server2", id);
        });

    });
}

module.exports = {
    start
};