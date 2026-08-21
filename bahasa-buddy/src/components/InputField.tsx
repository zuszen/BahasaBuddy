import { useState } from "react";
import "../styles/InputField.css";
import type { AlertType } from "../types/AlertType"

interface InputFieldProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
  onAlertMessage: (alertMsg: string) => void;
  onAlertType: (alertType: AlertType | null) => void;
}

function InputField({ onSendMessage, loading, onAlertMessage, onAlertType }: InputFieldProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    // if textarea is empty
    if (message.trim() === "") {
      return;
    }

    // if there's current message
    if(loading){
      onAlertMessage("A message is still processing.");
      onAlertType("warning");
      return;
    }

    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="input-field">
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && event.ctrlKey) {
            event.preventDefault();
            handleSubmit();
          }
        }}
        placeholder="Type a message..."
        aria-label="Message"
        rows={1}
      />

      <button type="button" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
}

export default InputField;