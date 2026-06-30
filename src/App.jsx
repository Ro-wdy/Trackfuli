import React, { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import OverviewScreen from "./components/OverviewScreen.jsx";
import TrendsScreen from "./components/TrendsScreen.jsx";

const GREEN = "#004A4C";

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.6" id="header-user-avatar-svg">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c1.2-3.7 4-5.5 7-5.5s5.8 1.8 7 5.5" strokeLinecap="round" />
    </svg>
  );
}

function TopBar({ title }) {
  return (
    <div className="flex justify-between items-center mb-3" id="main-header-bar">
      <h1 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] m-0">{title}</h1>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: `1.6px solid ${GREEN}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          cursor: "pointer",
        }}
        id="user-avatar-circle"
      >
        <UserIcon />
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("overview");
  const [toastMessage, setToastMessage] = useState(null);

  const handleLockedClick = (featureName) => {
    setToastMessage(`"${featureName}" is locked in prototype mode. Explore the fully active "Overview" or "Trends" screens.`);
    setTimeout(() => {
      setToastMessage((curr) => curr && curr.includes(featureName) ? null : curr);
    }, 4000);
  };

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen"
      style={{
        fontFamily: "'Bai Jamjuree', sans-serif",
        background: "#fff",
        color: "#1a1a1a",
        position: "relative",
        overflowX: "hidden",
      }}
      id="trackfuli-root-container"
    >
      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 9999,
            background: "#FFFFFF",
            borderLeft: `4px solid ${GREEN}`,
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            padding: "16px 20px",
            maxWidth: "380px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
          id="prototype-toast-alert"
        >
          <div style={{ fontWeight: 700, fontSize: "14px", color: GREEN }}>Interactive Preview Info</div>
          <div style={{ fontSize: "12.5px", color: "#555", lineHeight: 1.4 }}>{toastMessage}</div>
          <button
            onClick={() => setToastMessage(null)}
            style={{
              background: "none",
              border: "none",
              position: "absolute",
              top: 8,
              right: 8,
              cursor: "pointer",
              fontSize: 14,
              color: "#aaa",
              fontWeight: "bold",
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar active={tab} setTab={setTab} onLockedClick={handleLockedClick} />

      {/* Main Panel Area */}
      <div className="flex-1 p-4 md:p-6 overflow-x-hidden flex flex-col" id="main-content-panel">
        
        {/* Dynamic Screen Content Wrapper with micro-transitions */}
        <div style={{ flex: 1 }} id="screen-viewport-content">
          {tab === "overview" ? (
            <div>
              <TopBar title="Overview" />
              <OverviewScreen onLockedClick={handleLockedClick} />
            </div>
          ) : (
            <div>
              <TopBar title="Trends" />
              <TrendsScreen onLockedClick={handleLockedClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
