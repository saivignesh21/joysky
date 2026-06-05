const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let onlineUsers = 0;
let waitingUsers = [];
let activePairs = {};

io.on("connection", (socket) => {
  onlineUsers++;

  io.emit("online-users", onlineUsers);

  console.log("Connected:", socket.id);

  socket.on("join-queue", (interest) => {
    console.log(`${socket.id} waiting for ${interest}`);

    // Remove duplicate queue entries
    waitingUsers = waitingUsers.filter(
      (user) => user.socketId !== socket.id
    );

    waitingUsers.push({
      socketId: socket.id,
      interest,
    });

    // Find another user with same interest
    const currentUserIndex = waitingUsers.findIndex(
      (u) => u.socketId === socket.id
    );

    const partnerIndex = waitingUsers.findIndex(
      (u) =>
        u.socketId !== socket.id &&
        u.interest === interest
    );

    if (partnerIndex !== -1) {
      const currentUser = waitingUsers[currentUserIndex];
      const partner = waitingUsers[partnerIndex];

      // Remove both from queue
      waitingUsers = waitingUsers.filter(
        (u) =>
          u.socketId !== currentUser.socketId &&
          u.socketId !== partner.socketId
      );

      // Save pairing
      activePairs[currentUser.socketId] =
        partner.socketId;

      activePairs[partner.socketId] =
        currentUser.socketId;

      io.to(currentUser.socketId).emit("matched", {
        partner: partner.socketId,
      });

      io.to(partner.socketId).emit("matched", {
        partner: currentUser.socketId,
      });

      console.log(
        "MATCHED:",
        currentUser.socketId,
        "<->",
        partner.socketId
      );
    }
  });

  // Chat messages
  socket.on("send-message", (message) => {
    const partnerId = activePairs[socket.id];

    if (partnerId) {
      io.to(partnerId).emit("receive-message", {
        text: message,
      });
    }
  });

  // Next button
  socket.on("next-user", () => {
    const partnerId = activePairs[socket.id];

    if (partnerId) {
      io.to(partnerId).emit("partner-left");

      delete activePairs[partnerId];
      delete activePairs[socket.id];

      waitingUsers.push({
        socketId: socket.id,
        interest: "General",
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers--;

    io.emit("online-users", onlineUsers);

    waitingUsers = waitingUsers.filter(
      (user) => user.socketId !== socket.id
    );

    const partnerId = activePairs[socket.id];

    if (partnerId) {
      io.to(partnerId).emit("partner-left");

      delete activePairs[partnerId];
      delete activePairs[socket.id];
    }

    console.log("Disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("JoySky Server Running On Port 5000");
});