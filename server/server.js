const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://127.0.0.1:5173" }
});

const ramRoutes = require("./routes/ramRoutes");
const { emitRamStats } = require("./controllers/ramController"); 

app.use(express.json());
app.use(cors());


app.use("/api", ramRoutes);


io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});


setInterval(() => {
    emitRamStats(io); 
}, 1000);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});