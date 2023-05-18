const {Note} = require("../../models/note");
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./db");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

connectDB();

io.on("connection", (socket) => {
  console.log("New client connected ", socket.id);

  let note;

  // Listen for "note-edit" event
  socket.on("join-room", async (roomId, callback) => {
    socket.join("64579afa5bf650271e207a0d");
    note = await Note.findById("64579afa5bf650271e207a0d");
    // console.log('Client joined the room', note);

    socket.on("get-prev-note", async () => {
      // console.log("Fetching previous note...");
      socket.emit("prev-note", note);
    });

    // console.log('Client fetched previous note');

    socket.on("update-note", async (updatedNote) => {
      // console.log('hello i am updating this', socket.id);
      try {
        if (!note) {
          return socket.emit("note-not-found");
        }
    
        note.title = updatedNote.title;
        note.content = updatedNote.content;
        // ... update other fields
    
        // Save the updated note
        await note.save();
    
        // Emit the updated note to all connected clients in the same room or document
        io.to("64579afa5bf650271e207a0d").emit("note-updated", {
          title: note.title,
          content: note.content,
          // ... other fields
        });
      } catch (error) {
        // console.error("Error updating note:", error);
        socket.emit("update-note-error", { message: "Failed to update note." });
      }
    });
    

    callback();
  });

  socket.on("leave-room", (roomId, callback) => {
    // Remove the association between the user and the room or document ID
    socket.leave("64579afa5bf650271e207a0d");
    // console.log('Client left the room');
    callback();
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    socket.disconnect();
    // console.log("Client disconnected");
  });
});

server.listen(5001, () => {
  console.log("SERVER RUNNING");
});
