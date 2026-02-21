
import { useState } from "react";
import axios from "axios";

export default function ChatBox() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([]);

  const sendMessage = async () => {

    if (!message) return;

    const res = await axios.post("http://localhost:8000/chat", {
      message,
    });

    setChat([
      ...chat,
      { role: "user", text: message },
      { role: "ai", text: res.data.reply },
    ]);

    setMessage("");
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 20,
      right: 20,
      width: 320,
      background: "#1e293b",
      padding: 20,
      borderRadius: 10
    }}>

      <div style={{ height: 250, overflowY: "auto" }}>
        {chat.map((c, i) => (
          <div key={i} style={{
            textAlign: c.role === "user" ? "right" : "left",
            margin: 5
          }}>
            {c.text}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%", marginTop: 10 }}
      />

      <button onClick={sendMessage} style={{ marginTop: 10 }}>
        Send
      </button>

    </div>
  );
}
