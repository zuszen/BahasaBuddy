import { useEffect, useState } from "react";
import "./styles/App.css";

import Header from "./components/Header";
import Menu from "./components/Menu";
import InputField from "./components/InputField";
import Message from "./components/Message";

import type { MessageData } from "./types/Message";
import type { ChatMode } from "./types/ChatMode";

import { pdf } from "@react-pdf/renderer";
import ChatPDF from "./components/ChatPDF";

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
        return dots.length === 5 ? "." : dots + ".";
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
      const response = await fetch("https://bahasabuddy-8zct.onrender.com/api/chat", {
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

  // Function to export chat messages to a text file
  const exportChat = async () => {
    if (messages.length === 0) {
      alert("No messages to export.");
      return;
    }

    // Format: YYYY-MM-DD HH-MM AM/PM
    const now = new Date();
    const dateTime =  now.toLocaleDateString().replace(/\//g, '-') + 
                      " " + 
                      now.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      });

    const blob = await pdf(
      <ChatPDF messages={messages} dateTime={dateTime} />
    ).toBlob();

    // Download the PDF
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    // Use current time in the filename for uniqueness
    a.download = `BahasaBuddy chat [${dateTime}].pdf`;
    a.click();

    URL.revokeObjectURL(url);

  }

  return (

    <div className={`app ${darkMode ? "dark" : "light"}`}> 

      {menuOpen && (
        <Menu
          onClose={() => setMenuOpen(false)}
          mode={mode}
          onModeChange={setMode}
          onExport={exportChat}
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
        
        {/* Chat container: if touch the menu will close */}
        <main
          id="chat-container"
          className="chat-container"
          onClick={() => {
            if (menuOpen) {
              setMenuOpen(false);
            }
          }}
        >
          {/* Chat will go here */}

          {/* This holds the messages */}
          {messages.map((message) => (
            <Message
              key={message.id}
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
        {/* If the input area is touch and the width is less than 400 menu will close */}
        <div
          onClick={() => {
            if (window.innerWidth <= 400 && menuOpen) {
              setMenuOpen(false);
            }
          }}
        >
          <InputField onSendMessage={handleSendMessage} />
        </div>
      </div>
      
    </div>
  )
}

export default App