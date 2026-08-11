import type { MessageData } from "../types/Message";
import ReactMarkdown from "react-markdown";
import "../styles/Message.css";

function Message({ sender, message }: MessageData) {
  return (
    <div className="message">
      <strong className="message-sender">
        {sender}
      </strong>

      <span className="message-colon">:</span>

      <div className="message-text">
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Message;