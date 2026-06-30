import React from "react";
import TrackfuliLogo from "./TrackfuliLogo.jsx";

const GREEN = "#004A4C";
const GREY = "#EDEBEB";

const navItems = [
  { key: "overview", label: "Overview", icon: "layout", enabled: true },
  { key: "trends", label: "Trends", icon: "trend", enabled: true },
  { key: "ai", label: "Trackfuli AI", icon: "ai", enabled: false },
  { key: "locations", label: "Locations", icon: "wifi", enabled: false },
  { key: "notifications", label: "Notifications", icon: "bell", enabled: false },
  { key: "settings", label: "Settings", icon: "gear", enabled: false },
  { key: "logout", label: "Logout", icon: "logout", enabled: false },
];

function NavIcon({ name }) {
  const stroke = GREEN;
  const common = { fill: "none", stroke, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "layout":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...common} id="nav-icon-layout">
          <rect x="3" y="3" width="18" height="7" rx="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" />
          <rect x="13" y="13" width="8" height="8" rx="1.5" />
        </svg>
      );
    case "trend":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...common} id="nav-icon-trend">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    case "ai":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...common} id="nav-icon-ai">
          <path d="M10.5 4.5C9.5 4 8 4 7 5 5.5 6.5 5 8 5 9.5c0 1.5-1 2.5-2 3.5a3 3 0 0 0 2 5c1 0 1.5 1 2 2 1 2 3 2 3 2s0-1.5 0-4.5c0-1 0-2 0-3c0-1.5 0-3 0-4.5z" />
          <path d="M8 7.5C7.5 8 7 9 7 10" />
          <path d="M6 13.5c.5.5 1 1 1 2" />
          <path d="M13.5 4.5c1-.5 2.5-.5 3.5.5 1.5 1.5 2 3 2 4.5 0 1 .5 1.5 1 2.5a3 3 0 0 1-1.5 4.5" />
          <path d="M16 7.5c.5.5 1 1.5 1 2.5" />
          <circle cx="16.5" cy="16.5" r="4" />
          <line x1="19.3" y1="19.3" x2="22" y2="22" />
        </svg>
      );
    case "wifi":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...common} id="nav-icon-wifi">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "bell":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...common} id="nav-icon-bell">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case "gear":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...common} id="nav-icon-gear">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "logout":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" {...common} id="nav-icon-logout">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar({ active, setTab, onLockedClick }) {
  return (
    <div
      className="w-full md:w-[248px] flex flex-col gap-1 p-4 md:p-7 shrink-0 md:min-h-screen border-b md:border-b-0 md:border-r border-[#dcdad4]"
      style={{
        background: GREY,
        boxSizing: "border-box",
      }}
      id="trackfuli-sidebar-panel"
    >
      {/* Brand logo wrapper */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px 32px" }} id="sidebar-logo-wrapper">
        <TrackfuliLogo />
      </div>

      {/* Navigation item loops */}
      <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-2 md:gap-1 pb-2 md:pb-0 scrollbar-none">
        {navItems.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              onClick={() => {
                if (item.enabled) {
                  setTab(item.key);
                } else {
                  onLockedClick(item.label);
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 12,
                background: isActive ? "#FFFFFF" : "transparent",
                color: GREEN,
                fontWeight: isActive ? 600 : 500,
                fontSize: 15,
                cursor: "pointer",
                border: "none",
                textAlign: "left",
                minWidth: "140px",
                width: "100%",
                transition: "all 0.2s ease",
                opacity: 1,
              }}
              id={`sidebar-item-${item.key}`}
            >
              <NavIcon name={item.icon} />
              <span style={{ flex: 1 }}>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Additional footer brand specs */}
      <div 
        className="hidden md:block"
        style={{ 
          marginTop: "auto", 
          paddingTop: 16, 
          borderTop: "1px solid #dcdad4", 
          fontSize: 11, 
          color: GREEN, 
          fontWeight: 600,
          opacity: 1,
          letterSpacing: "0.05em",
          textAlign: "center"
        }}
        id="sidebar-footer-info"
      >
        TRACKFULI V1.0 • LIVE
      </div>
    </div>
  );
}
