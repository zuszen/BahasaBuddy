import { useState } from "react";
import "../styles/InputField.css";

interface InputFieldProps {
  onSendMessage: (message: string) => Promise<boolean>;
}

function InputField({ onSendMessage }: InputFieldProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    // if textarea is empty
    if (message.trim() === "") {
      return;
    }

    // if message is sent to backend
    const sent = await onSendMessage(message);
    if (sent){
      setMessage("");
    }
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