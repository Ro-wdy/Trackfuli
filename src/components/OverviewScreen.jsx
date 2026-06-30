import React, { useState } from "react";
import { Flame, CalendarDays, Activity } from "lucide-react";

const GREEN = "#004A4C";
const GREY = "#F3F2EC";

function CylinderIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" id="icon-cylinder">
      {/* Cylinder body */}
      <rect x="8" y="7" width="8" height="13" rx="2" />
      {/* Collar/Cap on top */}
      <path d="M10 7V4h4v3" />
      {/* Top ring connection line */}
      <line x1="8" y1="10" x2="16" y2="10" />
    </svg>
  );
}

function BedIcon() {
  return (
    <div style={{ width: 22, height: 22 }} id="icon-bed" />
  );
}

function CalendarIcon({ color }) {
  return (
    <CalendarDays size={22} color={color || "#E16C6C"} strokeWidth={1.8} id="icon-calendar" />
  );
}

function PulseIcon() {
  return (
    <div style={{ width: 22, height: 22 }} id="icon-pulse" />
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
  const textColor = accent ? "#E16C6C" : GREEN;
  return (
    <div
      style={{
        background: GREY,
        borderRadius: 16,
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        minWidth: 0,
      }}
      id={`overview-stat-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 13, color: accent ? "#E16C6C" : "#6D7374", fontWeight: 500 }}>{label}</span>
        <div style={{ fontSize: 22, fontWeight: 600, color: textColor, marginTop: 3 }}>{value}</div>
        <div style={{ fontSize: 12, color: accent ? "#E16C6C" : "#8A8A85", marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ color: textColor, opacity: 1, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 12 }}>
        {icon}
      </div>
    </div>
  );
}

export function Pill({ children, active = false, onClick, variant }) {
  const bg = variant === "grey" ? "#E5E3DB" : "#FFFFFF";
  return (
    <button
      onClick={onClick}
      style={{
        border: "1.8px solid #1a1a1a",
        background: bg,
        color: "#1a1a1a",
        borderRadius: 999,
        padding: "9px 18px",
        fontSize: 13.5,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 8,
        whiteSpace: "nowrap",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
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
  const maxH = 130;

  return (
    <div 
      className="flex items-end justify-between gap-1.5 sm:gap-4 md:gap-6 w-full overflow-x-auto pb-2 mt-4"
      id="monthly-bar-chart-container"
      style={{ minHeight: maxH + 45 }}
    >
      {initialMonthData.map((d, i) => {
        const isHoveredOrActive = hoveredIndex === i;
        return (
          <div 
            className="flex flex-col items-center flex-1 min-w-[28px] relative"
            onMouseEnter={() => setHoveredIndex(i)}
            id={`chart-bar-col-${d.m}`}
            key={d.m}
          >
            {isHoveredOrActive && (
              <div
                style={{
                  position: "absolute",
                  bottom: maxH * d.h + 14,
                  background: "#FFFFFF",
                  border: "1px solid #E2E0D8",
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "#1a1a1a",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
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
                borderRadius: 999,
                cursor: "pointer",
                opacity: 1,
                transition: "transform 0.2s ease",
                transform: isHoveredOrActive ? "scaleX(1.05)" : "none",
              }}
            />
            <div style={{ marginTop: 6, fontSize: 13, color: "#1a1a1a", fontWeight: 500 }}>{d.m}</div>
          </div>
        );
      })}
    </div>
  );
}

export function DonutCard({ title, value, sub, pct }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  return (
    <div
      style={{
        background: GREY,
        borderRadius: 16,
        padding: "14px 18px",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      id={`donut-card-${title.toLowerCase()}`}
    >
      <div>
        <div style={{ fontSize: 13, color: "#6D7374", fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 22, fontWeight: 600, color: GREEN, margin: "4px 0 2px" }}>{value}</div>
        <div style={{ fontSize: 12.5, color: "#8a8a85" }}>{sub}</div>
      </div>
      <div style={{ position: "relative", width: 80, height: 80, marginLeft: 12 }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={r} fill="none" stroke="#d8d6cf" strokeWidth="5.5" />
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke={GREEN}
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform="rotate(-90 40 40)"
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
            fontSize: 14,
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
    <div id="overview-screen-layout" className="flex flex-col gap-4">
      {/* KPI Stats Cards - Top row in reference layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Current Available" value="345 kg" sub="As at 12:10 PM" icon={<CylinderIcon />} />
        <StatCard label="Today's Consumption" value="15 kg" sub="As at 12:10 PM" icon={<BedIcon />} />
        <StatCard label="This Month Consumption" value="545 kg" sub="12 Days" icon={<CalendarIcon color="#E16C6C" />} accent />
        <StatCard label="Monthly Average" value="245 kg" sub="20 Months" icon={<PulseIcon />} />
      </div>

      {/* Main Bar Chart Panel */}
      <div style={{ background: GREY, borderRadius: 24, padding: "18px 24px 14px" }} id="consumption-chart-panel">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 style={{ fontSize: 22, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Total Consumption</h2>
          <div className="flex flex-wrap gap-2.5">
            <Pill variant="grey" onClick={() => onLockedClick("Type Filters")}>All Types <Chevron /></Pill>
            <Pill variant="grey" onClick={() => onLockedClick("Location Filters")}>All Locations <Chevron /></Pill>
            <Pill variant="grey" onClick={() => onLockedClick("Timeframe Selector")}>This Year <Chevron /></Pill>
          </div>
        </div>
        <MonthlyBarChart />
      </div>

      {/* Location Section Heading & Timeframe Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Location Based Consumption By</h2>
        <div style={{ display: "flex", gap: 8, background: "#E5E3DB", borderRadius: 999, padding: 4 }}>
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
