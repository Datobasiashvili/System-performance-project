const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const ramRoutes = require("./routes/ramRoutes");
const cpuRoutes = require("./routes/cpuRoutes");
const { emitRamStats } = require("./controllers/ramController");
const { emitCpuStats } = require("./controllers/cpuController");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://127.0.0.1:5173" }
});

app.use(express.json());
app.use(cors());

app.use("/api", ramRoutes);
app.use("/api", cpuRoutes)


io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    emitRamStats(io);
    emitCpuStats(io);

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

setInterval(() => {
    emitRamStats(io);
    emitCpuStats(io);
}, 1000);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});