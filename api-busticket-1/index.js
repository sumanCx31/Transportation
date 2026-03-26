const http = require("http");
const { Server } = require("socket.io"); // 1. Add this
const app = require("./src/config/express.config");

const server = http.createServer(app);

// 2. Initialize Socket.io and attach it to the server
const io = new Server(server, {
    cors: {
        origin: "*", // Allows your Vite frontend to connect
        methods: ["GET", "POST"]
    }
});

// 3. Simple connection listener for testing
io.on("connection", (socket) => {
    console.log("Client connected to Suvyatra Chat:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

const PORT = 9005;
const HOST = "127.0.0.1";

server.listen(PORT, HOST, (err) => {
    if(!err) {
        console.log("Server is running on port:", PORT);
        console.log("Press CTRL+C to discontinue server...");
    }
});