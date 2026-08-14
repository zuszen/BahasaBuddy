import "../styles/Menu.css";
import type { ChatMode } from "../types/ChatMode";

interface MenuProps {
  onClose: () => void;
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  onExport: () => void;
}

function Menu({ onClose, mode, onModeChange, onExport }: MenuProps) {
  return (
    <aside className="menu">
      <div className="menu-header">
        <h2>BahasaBuddy</h2>

        <button
          className="menu-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          ×
        </button>
      </div>

      <div className="menu-content">
        <h4>Chat Mode:</h4>

        <button
          className="menu-item"
          onClick={() => onModeChange("in-to-en")}
        >
          <span>Indonesian → English</span>

          {mode === "in-to-en" && (
            <span className="active-indicator" />
          )}
        </button>

        <button
          className="menu-item"
          onClick={() => onModeChange("en-to-in")}
        >
          <span>English → Indonesian</span>

          {mode === "en-to-in" && (
            <span className="active-indicator" />
          )}
        </button>

        {/* Export Chat */}  
        <div className="menu-content-bottom">
          <button
            className="export-button"
            onClick={onExport}
          >
            <span>Export Chat</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Menu;