import { useEffect, useState } from "react";
import "./styles/App.css";

import Header from "./components/Header";
import Menu from "./components/Menu";
import InputField from "./components/InputField";
import Message from "./components/Message";

import type { MessageData } from "./types/Message";
import type { ChatMode } from "./types/ChatMode";

function App() {

  // Set Initial States
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState<ChatMode>("in-to-en");

  // This holds the messages in the chat, each message has a sender and a message
  const [messages, setMessages] = useState<MessageData[]>([]);

  // This holds the loading state for when the backend is processing a message
  const [loading, setLoading] = useState(false);
  const [processingDots, setProcessingDots] = useState(".");

  // Processing animation
  useEffect(() => {
    if (!loading) {
      setProcessingDots(".");
      return;
    }

    const interval = setInterval(() => {
      setProcessingDots((dots) => {
        return dots.length === 3 ? "." : dots + ".";
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);
  

  const handleSendMessage = async (message: string) => {
    // Show user's message immediately
    const userMessage: MessageData = {
      id: crypto.randomUUID(),
      sender: "You",
      message: message,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    // Start processing indicator
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          mode: mode,
        }),
      });

      const data = await response.json();

      console.log(
  "Frontend Gemini response:",
  JSON.stringify(data.message)
);

      // Add backend response to chat
      const botMessage: MessageData = {
        id: crypto.randomUUID(),
        sender: "BahasaBuddy",
        message: data.message,
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        botMessage,
      ]);
    } catch (error) {
      console.error("Backend error:", error);
    } finally {
      // Stop processing indicator
      setLoading(false);
    }
  };

  return (

    <div className={`app ${darkMode ? "dark" : "light"}`}> 

      {menuOpen && (
        <Menu
          onClose={() => setMenuOpen(false)}
          mode={mode}
          onModeChange={setMode}
        />
      )}

      <div className="main-content">
        <Header 
          menuOpen={menuOpen}
          onMenuClick={() => setMenuOpen(true)} 
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
          mode={mode}
          />
          
        <main className="chat-container">
          {/* Chat will go here */}

          {/* This holds the messages*/}
          {messages.map((message) => (
            <Message
              id={message.id}
              sender={message.sender}
              message={message.message}
            />
          ))}

          {/* loading indicator */}
          {loading && (
            <div className="message">
              <strong>BahasaBuddy</strong>
              <span>:</span>
              <span>Processing{processingDots}</span>
            </div>
          )}
        </main>

        {/* Input field for sending messages */}
        <InputField onSendMessage={handleSendMessage}/>
      </div>
      
    </div>
  )
}

export default App