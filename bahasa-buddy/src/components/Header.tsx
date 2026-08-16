import "../styles/Header.css";
import type { ChatMode } from "../types/ChatMode";

interface HeaderProps {
    menuOpen: boolean;
    darkMode: boolean;
    mode: ChatMode;
    onMenuClick: () => void;
    onToggleTheme: () => void;
    onModeChange: (mode: ChatMode) => void;
}

function Header({ menuOpen, onMenuClick, darkMode, onToggleTheme, mode, onModeChange }: HeaderProps) {

    const modeLabels: Record<ChatMode, string> = {
        "in-to-en": "Indonesian → English",
        "en-to-in": "English → Indonesian",
        "conversation": "Conversation",
    };

    return (
    
    <header className="header">
        <div className="header-left">
            { /* Menu button is only shown when the menu is closed */ }
            {!menuOpen && (
            <button
                className="menu-button"
                aria-label="Open menu"
                onClick={onMenuClick}
            >
                ☰
            </button>
            )}

            <div

                className="theme-toggle"
                title="Change mode"
                onClick={() => {
                    if (mode === "in-to-en") {
                        onModeChange("en-to-in");
                    } else if (mode === "en-to-in") {
                        onModeChange("in-to-en");
                    }
                }}
            >
                <h1>Mode: {modeLabels[mode]}</h1>
            </div>
            
        </div>

        <div className="header-right">
            <button
                className="theme-button"
                aria-label="Toggle theme"
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                onClick={onToggleTheme}
                >
                {darkMode ? "☀" : "☾"}
            </button>
        </div>
    </header>
    );
}

export default Header
