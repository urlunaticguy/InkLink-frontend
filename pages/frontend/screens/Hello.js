import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:5001");

export default function Hello() {
  const [note, setNote] = useState({ title: "", content: "" });
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on("note-updated", (updatedNote) => {
      console.log("Received updated note:", updatedNote);
      setNote(updatedNote);
      setCurrentContent(updatedNote.content);
      setCurrentTitle(updatedNote.title);
    });

    socket.on("update-note-error", (error) => {
      console.error("Error updating note:", error);
    });

    socket.on("prev-note", (prevNote) => {
      console.log("Received previous note:", prevNote);
      setCurrentTitle(prevNote.title);
      setCurrentContent(prevNote.content);
    });

    return () => {
      socket.off("note-updated");
      socket.off("update-note-error");
      socket.off("prev-note");
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (note.title !== currentTitle || note.content !== currentContent) {
        socket.emit("update-note", { title: currentTitle, content: currentContent });
      }
    }, 1000); // Update every 10 seconds

    return () => {
      clearInterval(interval);
    };
  }, [currentTitle, currentContent, note.title, note.content]);

  const handleTitleChange = (e) => {
    const updatedTitle = e.target.value;
    setCurrentTitle(updatedTitle);
  };

  const handleContentChange = (e) => {
    const updatedContent = e.target.value;
    setCurrentContent(updatedContent);
  };

  const handleSave = (e) => {
    socket.emit("join-room", "123", () => {
      console.log("Successfully joined the room");
      setLoading(true); // Set loading state to true after joining the room
    });
  };

  const handleLeave = (e) => {
    socket.emit("leave-room", "123", () => {
      console.log("Successfully left the room");
      setCurrentContent("");
      setCurrentTitle("");
      // Perform additional actions or UI updates after leaving the room
    });
  };

  useEffect(() => {
    if (loading) {
      socket.emit("get-prev-note", () => {
        console.log("Requesting previous note...");
      });
    }
  }, [loading]);

  useEffect(() => {
    setCurrentTitle(note.title);
    setCurrentContent(note.content);
    setLoading(false); // Set loading state to false after receiving the previous note
  }, [note]);

  return (
    <div>
      <div>
        <label>Title:</label>
        <textarea value={currentTitle} onChange={handleTitleChange} />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={currentContent} onChange={handleContentChange} />
      </div>
      <div>
        {loading ? (
          <div>Loading...</div> // Display loading state while fetching the previous note
        ) : (
          <>
            <button onClick={handleSave}>Join</button>
            <button onClick={handleLeave}>Leave</button>
          </>
        )}
      </div>
    </div>
  );
}
