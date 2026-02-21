import { useState } from "react";
import "./App.css";

type Message = {
  role: "user" | "bot";
  text: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMessage: Message = {
        role: "bot",
        text: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error connecting to server." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <header className="hero">
        <h1>Huda Khan</h1>
        <p>Python Developer | FastAPI | React | AI Enthusiast</p>
      </header>

      <section className="projects">
        <h2>Projects</h2>
        <ul>
          <li>AI Resume Builder</li>
          <li>Pong Game using Python</li>
          <li>Portfolio with AI Chat</li>
        </ul>
      </section>

      <section className="chat">
        <h2>Ask My AI Assistant 🤖</h2>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.role === "user" ? "user-msg" : "bot-msg"}
            >
              {msg.text}
            </div>
          ))}

          {loading && <div className="bot-msg">Typing...</div>}
        </div>

        <div className="input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about skills, projects..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </section>
    </div>
  );
}

export default App;