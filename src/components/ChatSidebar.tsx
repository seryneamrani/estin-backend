import "./ChatSidebar.css";

type ChatSidebarProps = {
  onClose?: () => void;
};

export default function ChatSidebar({ onClose }: ChatSidebarProps) {
  const history = [
    { text: "What are the admission requirements?" },
    { text: "Tell me about the campus", sub: "(36 63.12)" },
  ];

  return (
    <aside className="chat-sidebar">
      {/* 🔘 Bouton "Close" visible uniquement sur mobile */}
      {onClose && (
        <button className="close-btn" onClick={onClose}>
          ✕ Close
        </button>
      )}

      <h2 className="sidebar-title">History</h2>

      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <img src="/user.svg" alt="user" className="icon" />
            <div className="message-text">
              {item.text}
              {item.sub && <div className="sub">{item.sub}</div>}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
