import { useEffect, useState } from "react";
import { sendMessage } from "../Api/aiApi";
import "./Ai_Assistant.css";

const HISTORY_KEY = "movie_ai_conversations";
const OLD_HISTORY_KEY = "movie_ai_chat_history";

function createConversation() {
  return {
    id: Date.now().toString(),
    title: "New Chat",
    messages: [],
  };
}

function loadConversations() {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }

    const oldHistory = localStorage.getItem(OLD_HISTORY_KEY);
    if (oldHistory) {
      const messages = JSON.parse(oldHistory);
      if (Array.isArray(messages) && messages.length > 0) {
        const firstUserMessage = messages.find((m) => m.role === "user")?.content || "Previous Chat";
        return [{
          id: Date.now().toString(),
          title: firstUserMessage.slice(0, 35) + (firstUserMessage.length > 35 ? "..." : ""),
          messages,
        }];
      }
    }
  } catch {}

  return [createConversation()];
}

function Ai_Assistant() {
  const [conversations, setConversations] = useState(loadConversations);
  const [activeId, setActiveId] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed[0].id;
      }
    } catch {}
    return null;
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const activeConversation = conversations.find((conversation) => conversation.id === activeId) || conversations[0];
  const messages = activeConversation?.messages || [];

  useEffect(() => {
    if (!activeId && conversations.length > 0) setActiveId(conversations[0].id);
  }, [activeId, conversations]);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(conversations));
    } catch {}
  }, [conversations]);

  useEffect(() => {
    try {
      localStorage.removeItem(OLD_HISTORY_KEY);
    } catch {}
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading || !activeConversation) return;

    const userMessage = input.trim();
    const historyBeforeMessage = [...messages];
    const newMessages = [...historyBeforeMessage, { role: "user", content: userMessage }];
    const title = activeConversation.title === "New Chat"
      ? userMessage.slice(0, 35) + (userMessage.length > 35 ? "..." : "")
      : activeConversation.title;

    setConversations((previous) => previous.map((conversation) =>
      conversation.id === activeConversation.id
        ? { ...conversation, title, messages: newMessages }
        : conversation
    ));
    setInput("");
    setLoading(true);

    try {
      const aiReply = await sendMessage(userMessage, historyBeforeMessage);
      setConversations((previous) => previous.map((conversation) =>
        conversation.id === activeConversation.id
          ? { ...conversation, messages: [...newMessages, { role: "assistant", content: aiReply }] }
          : conversation
      ));
    } catch (error) {
      console.error("AI ERROR:", error);
      setConversations((previous) => previous.map((conversation) =>
        conversation.id === activeConversation.id
          ? { ...conversation, messages: [...newMessages, { role: "assistant", content: `AI Error: ${error.message}` }] }
          : conversation
      ));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    if (loading) return;
    const newConversation = createConversation();
    setConversations((previous) => [newConversation, ...previous]);
    setActiveId(newConversation.id);
    setInput("");
  };

  const deleteConversation = (event, id) => {
    event.stopPropagation();
    if (loading) return;

    setConversations((previous) => {
      const remaining = previous.filter((conversation) => conversation.id !== id);
      if (id === activeId) setActiveId(remaining[0]?.id || null);
      return remaining.length > 0 ? remaining : [createConversation()];
    });
  };

  return (
    <main className="ai-page" style={{marginTop:"130px"}}>
      <section className="ai-chat-card">
        <aside className="ai-history">
          <div className="ai-history-header">
            <h3>History</h3>
            <button className="ai-new-chat-btn" onClick={handleNewChat} disabled={loading}>+ New Chat</button>
          </div>

          <div className="ai-history-list">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`ai-history-item ${conversation.id === activeConversation?.id ? "active" : ""}`}
                onClick={() => !loading && setActiveId(conversation.id)}
              >
                <span className="ai-history-title">{conversation.title}</span>
                <button
                  className="ai-delete-chat"
                  onClick={(event) => deleteConversation(event, conversation.id)}
                  disabled={loading}
                  aria-label={`Delete ${conversation.title}`}
                  title="Delete chat"
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
        </aside>

        <div className="ai-chat-main">
          <header className="ai-chat-header">
            <div>
              <h1>🎬 AI Movie Assistant</h1>
              <p>Ask me about movies and TV shows</p>
            </div>
          </header>

          <div className="ai-messages" aria-live="polite">
            {messages.length === 0 && (
              <div className="ai-empty">
                <div>🎥</div>
                <h2>How can I help?</h2>
                <p>Ask about a movie, TV show, actor, genre, recommendation, or comparison.</p>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`ai-message-row ${message.role === "user" ? "user" : "assistant"}`}>
                <div className={`ai-message ${message.role === "user" ? "user-message" : "assistant-message"}`}>
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="ai-message-row assistant">
                <div className="ai-message assistant-message ai-thinking">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          <div className="ai-input-area">
            <div className="ai-input-wrapper">
              <input
                className="ai-input"
                type="text"
                placeholder="Ask about a movie or TV show..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button className="ai-send-btn" onClick={handleSend} disabled={loading || !input.trim()}>
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
            <small className="ai-hint">Press Enter to send</small>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Ai_Assistant;
