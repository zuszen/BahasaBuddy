import { useState } from "react";
import "../styles/InputField.css";

interface InputFieldProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
}

function InputField({ onSendMessage, loading }: InputFieldProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    // if textarea is empty
    if (message.trim() === "") {
      return;
    }

    // if there's current message
    if(loading){
      alert("Please wait for the current message to finish processing.");
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