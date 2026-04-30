import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function ChatRoom() {
  const { roomName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "Anonymous";

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatSocketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the newest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const wsProtocol =
      window.location.protocol === "https:" ? "wss://" : "ws://";
    const backendHost = import.meta.env.VITE_BACKEND_URL || "127.0.0.1:8000";
    const wsUrl = `${wsProtocol}${backendHost}/ws/chat/${roomName}/`;
    chatSocketRef.current = new WebSocket(wsUrl);

    chatSocketRef.current.onmessage = function (event) {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    chatSocketRef.current.onclose = function () {
      console.error("Chat socket closed unexpectedly");
    };

    return () => {
      if (chatSocketRef.current) {
        chatSocketRef.current.close();
      }
    };
  }, [roomName]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && chatSocketRef.current) {
      chatSocketRef.current.send(
        JSON.stringify({
          message: inputMessage,
          username: username,
        })
      );
      setInputMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
            title="Leave Room"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-800">#{roomName}</h2>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Connected as {username}
            </p>
          </div>
        </div>
      </header>

      {/* Message Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => {
          const isMe = msg.username === username;

          return (
            <div
              key={index}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              <span className="text-xs text-gray-500 mb-1 ml-1 mr-1">
                {msg.username}
              </span>
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                  isMe
                    ? "bg-indigo-600 text-white rounded-br-none shadow-md"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                }`}
              >
                {msg.message}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} /> {/* Invisible div to scroll to */}
      </main>

      {/* Input Form */}
      <footer className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={sendMessage} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-5 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-full px-6 py-3 font-medium transition-colors flex items-center justify-center"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
