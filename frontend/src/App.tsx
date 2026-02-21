
import ChatBox from "./components/ChatBox";

export default function App() {
  return (
    <div>

      <section style={{ padding: 40, textAlign: "center" }}>
        <h1 style={{ fontSize: 40 }}>Huda Khan</h1>
        <p>Python Developer | React | FastAPI</p>
      </section>

      <section style={{ padding: 40 }}>
        <h2>Projects</h2>

        <div style={{ marginTop: 20 }}>
          <p>AI Resume Builder</p>
          <p>Pong Game using Python</p>
          <p>Portfolio with AI Chat</p>
        </div>
      </section>

      <ChatBox />

    </div>
  );
}
