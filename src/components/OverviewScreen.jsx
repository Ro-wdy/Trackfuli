import React, { useState } from "react";
import { Flame, CalendarDays, Activity } from "lucide-react";

const GREEN = "#004A4C";
const GREY = "#EDEBEB";

// Icons specifically matched to the visual designs
function CylinderIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.6" id="icon-cylinder">
      <rect x="6" y="3" width="4" height="3" />
      <path d="M5 7h6v13a1 1 0 01-1 1H6a1 1 0 01-1-1V7z" />
    </svg>
  );
}

function BedIcon() {
  return (
    <Flame size={18} color={GREEN} strokeWidth={1.8} id="icon-bed" />
  );
}

function CalendarIcon() {
  return (
    <CalendarDays size={18} color={GREEN} strokeWidth={1.8} id="icon-calendar" />
  );
}

function PulseIcon() {
  return (
    <Activity size={18} color={GREEN} strokeWidth={1.8} id="icon-pulse" />
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" id="icon-chevron">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StatCard({ label, value, sub, icon, accent = false }) {
  const textColor = accent ? "#F46D6D" : GREEN;
  return (
    <div
      style={{
        background: GREY,
        borderRadius: 16,
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        minWidth: 0,
      }}
      id={`overview-stat-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 14, color: accent ? "#F46D6D" : "#555", fontWeight: 500 }}>{label}</span>
        <div style={{ fontSize: 26, fontWeight: 600, color: textColor, marginTop: 6 }}>{value}</div>
        <div style={{ fontSize: 12.5, color: accent ? "#F46D6D" : "#8a8a85", marginTop: 4 }}>{sub}</div>
      </div>
      <div style={{ color: textColor, opacity: 1, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 12 }}>
        {icon}
      </div>
    </div>
  );
}

export function Pill({ children, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "1px solid #1a1a1a",
        background: active ? "#1a1a1a" : "transparent",
        color: active ? "#fff" : "#1a1a1a",
        borderRadius: 999,
        padding: "9px 18px",
        fontSize: 14,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: 6,
        whiteSpace: "nowrap",
        cursor: "pointer",
        transition: "all 0.25s ease",
      }}
    >
      {children}
    </button>
  );
}

const initialMonthData = [
  { m: "Jan", v: 245, h: 0.62 },
  { m: "Feb", v: 200, h: 0.5 },
  { m: "Mar", v: 290, h: 0.74 },
  { m: "Apr", v: 230, h: 0.58 },
  { m: "May", v: 335, h: 0.86 },
  { m: "Jun", v: 295, h: 0.78 },
  { m: "Jul", v: 60, h: 0.16 },
  { m: "Aug", v: 0, h: 0.02 },
  { m: "Sep", v: 0, h: 0.02 },
  { m: "Oct", v: 0, h: 0.02 },
  { m: "Nov", v: 0, h: 0.02 },
  { m: "Dec", v: 0, h: 0.02 },
];

export function MonthlyBarChart() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const maxH = 380;

  return (
    <div 
      className="flex items-end justify-between gap-1.5 sm:gap-4 md:gap-6 w-full overflow-x-auto pb-2 mt-8"
      id="monthly-bar-chart-container"
      style={{ minHeight: maxH + 40 }}
    >
      {initialMonthData.map((d, i) => {
        const isHoveredOrActive = hoveredIndex === i;
        return (
          <div 
            key={d.m} 
            className="flex flex-col items-center flex-1 min-w-[28px] relative"
            onMouseEnter={() => setHoveredIndex(i)}
            id={`chart-bar-col-${d.m}`}
          >
            {isHoveredOrActive && (
              <div
                style={{
                  position: "absolute",
                  bottom: maxH * d.h + 14,
                  background: "#fff",
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1a1a1a",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  whiteSpace: "nowrap",
                  zIndex: 10,
                }}
              >
                {d.v} kg
              </div>
            )}
            <div
              style={{
                width: "100%",
                maxWidth: 46,
                height: Math.max(maxH * d.h, 10),
                background: GREEN,
                borderRadius: 18,
                cursor: "pointer",
                opacity: 1,
                transition: "transform 0.2s ease",
                transform: isHoveredOrActive ? "scaleX(1.05)" : "none",
              }}
            />
            <div style={{ marginTop: 14, fontSize: 13, color: "#1a1a1a", fontWeight: 500 }}>{d.m}</div>
          </div>
        );
      })}
    </div>
  );
}

export function DonutCard({ title, value, sub, pct }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  return (
    <div
      style={{
        background: GREY,
        borderRadius: 16,
        padding: "22px 26px",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      id={`donut-card-${title.toLowerCase()}`}
    >
      <div>
        <div style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 26, fontWeight: 600, color: GREEN, margin: "6px 0 4px" }}>{value}</div>
        <div style={{ fontSize: 13, color: "#8a8a85" }}>{sub}</div>
      </div>
      <div style={{ position: "relative", width: 110, height: 110, marginLeft: 12 }}>
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r={r} fill="none" stroke="#d8d6cf" strokeWidth="6" />
          <circle
            cx="55"
            cy="55"
            r={r}
            fill="none"
            stroke={GREEN}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform="rotate(-90 55 55)"
            style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 17,
            fontWeight: 600,
            color: "#1a1a1a",
          }}
        >
          {pct}%
        </div>
      </div>
    </div>
  );
}

export default function OverviewScreen({ onLockedClick }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("Weekly");

  return (
    <div id="overview-screen-layout" className="flex flex-col gap-6">
      {/* KPI Stats Cards - Top row in reference layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Current Available" value="345 kg" sub="As at 12:10 PM" icon={<CylinderIcon />} />
        <StatCard label="Today's Consumption" value="15 kg" sub="As at 12:10 PM" icon={<BedIcon />} />
        <StatCard label="This Month Consumption" value="545 kg" sub="12 Days" icon={<CalendarIcon />} accent />
        <StatCard label="Monthly Average" value="245 kg" sub="20 Months" icon={<PulseIcon />} />
      </div>

      {/* Main Bar Chart Panel */}
      <div style={{ background: GREY, borderRadius: 20, padding: "28px 32px 20px" }} id="consumption-chart-panel">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 style={{ fontSize: 26, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Total Consumption</h2>
          <div className="flex flex-wrap gap-2.5">
            <Pill onClick={() => onLockedClick("Type Filters")}>All Types <Chevron /></Pill>
            <Pill onClick={() => onLockedClick("Location Filters")}>All Locations <Chevron /></Pill>
            <Pill onClick={() => onLockedClick("Timeframe Selector")}>This Year <Chevron /></Pill>
          </div>
        </div>
        <MonthlyBarChart />
      </div>

      {/* Location Section Heading & Timeframe Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
        <h2 style={{ fontSize: 22, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Location Based Consumption By</h2>
        <div style={{ display: "flex", gap: 8, background: "#f4f3ee", borderRadius: 999, padding: 4 }}>
          {["Yearly", "Monthly", "Weekly"].map((t) => {
            const isSelected = t === selectedTimeframe;
            return (
              <button
                key={t}
                onClick={() => setSelectedTimeframe(t)}
                style={{
                  padding: "9px 20px",
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 500,
                  background: isSelected ? GREEN : "transparent",
                  color: isSelected ? "#fff" : "#1a1a1a",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location Donut Cards - Responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedTimeframe === "Weekly" ? (
          <>
            <DonutCard title="Highest" value="325 kg" sub="Uphill" pct={46} />
            <DonutCard title="Second Highest" value="283 kg" sub="Kimathi" pct={40} />
            <DonutCard title="Lowest" value="85 kg" sub="Orbit Place" pct={12} />
          </>
        ) : selectedTimeframe === "Monthly" ? (
          <>
            <DonutCard title="Highest" value="1,420 kg" sub="Uphill" pct={48} />
            <DonutCard title="Second Highest" value="1,180 kg" sub="Kimathi" pct={38} />
            <DonutCard title="Lowest" value="410 kg" sub="Orbit Place" pct={14} />
          </>
        ) : (
          <>
            <DonutCard title="Highest" value="15,400 kg" sub="Uphill" pct={45} />
            <DonutCard title="Second Highest" value="13,200 kg" sub="Kimathi" pct={39} />
            <DonutCard title="Lowest" value="5,100 kg" sub="Orbit Place" pct={16} />
          </>
        )}
      </div>
    </div>
  );
}
