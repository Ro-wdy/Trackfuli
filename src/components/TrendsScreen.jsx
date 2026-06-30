import React, { useState } from "react";
import { StatCard, Pill } from "./OverviewScreen.jsx";
import { Clock3, CalendarDays, CalendarRange, Calendar } from "lucide-react";

const GREEN = "#004A4C";
const GREY = "#EDEBEB";

// Trend Icons
function ClockIcon() {
  return (
    <Clock3 size={22} color={GREEN} strokeWidth={1.8} id="icon-clock" />
  );
}

function CalDayIcon() {
  return (
    <CalendarDays size={22} color={GREEN} strokeWidth={1.8} id="icon-cal-day" />
  );
}

function FoldIcon() {
  return (
    <CalendarRange size={22} color={GREEN} strokeWidth={1.8} id="icon-fold" />
  );
}

function CalendarIcon() {
  return (
    <Calendar size={22} color={GREEN} strokeWidth={1.8} id="icon-trends-calendar" />
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" id="icon-trends-chevron">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Data matching the visual mockup
const hourData = [
  { h: "12 AM", v: 0, kg: 0 }, { h: "1 AM", v: 0, kg: 0 }, { h: "2 AM", v: 0, kg: 0 }, { h: "3 AM", v: 0, kg: 0 },
  { h: "4 AM", v: 0, kg: 0 }, { h: "5 AM", v: 0, kg: 0 }, { h: "6 AM", v: 0.16, kg: 38 }, { h: "7 AM", v: 0.28, kg: 65 },
  { h: "8 AM", v: 0.42, kg: 98 }, { h: "9 AM", v: 0.56, kg: 131 }, { h: "10 AM", v: 0.68, kg: 159 }, { h: "11 AM", v: 0.76, kg: 178 },
  { h: "12 PM", v: 0.84, kg: 196 }, { h: "1 PM", v: 1, kg: 234 }, { h: "2 PM", v: 0.97, kg: 227 }, { h: "3 PM", v: 0.78, kg: 182 },
  { h: "4 PM", v: 0.62, kg: 145 }, { h: "5 PM", v: 0.5, kg: 117 }, { h: "6 PM", v: 0.38, kg: 89 }, { h: "7 PM", v: 0.2, kg: 47 },
  { h: "8 PM", v: 0.06, kg: 14 }, { h: "9 PM", v: 0, kg: 0 }, { h: "10 PM", v: 0, kg: 0 }, { h: "11 AM2", v: 0, kg: 0 },
];

export function HourlyBarChart() {
  const [hoveredIndex, setHoveredIndex] = useState(13);
  const maxH = 320;

  return (
    <div 
      className="flex items-end justify-between gap-1 sm:gap-2.5 md:gap-3.5 w-full overflow-x-auto pb-2 mt-12"
      id="hourly-bar-chart-container"
      style={{ minHeight: maxH + 40 }}
    >
      {hourData.map((d, i) => {
        const displayLabel = d.h === "11 AM2" ? "11 PM" : d.h;
        const isHoveredOrActive = hoveredIndex === i;

        return (
          <div 
            key={i} 
            className="flex flex-col items-center flex-1 min-w-[20px] relative"
            onMouseEnter={() => setHoveredIndex(i)}
            id={`hourly-bar-col-${i}`}
          >
            {isHoveredOrActive && (
              <div
                style={{
                  position: "absolute",
                  bottom: Math.max(maxH * d.v, 6) + 12,
                  background: "#fff",
                  borderRadius: 9,
                  padding: "4px 8px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#1a1a1a",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  whiteSpace: "nowrap",
                  zIndex: 10,
                }}
              >
                {d.kg} kg
              </div>
            )}
            <div
              style={{
                width: "100%",
                maxWidth: 30,
                height: Math.max(maxH * d.v, 6),
                background: GREEN,
                borderRadius: 14,
                cursor: "pointer",
                opacity: 1,
                transition: "transform 0.2s ease",
                transform: isHoveredOrActive ? "scaleX(1.1)" : "none",
              }}
            />
            <div style={{ marginTop: 10, fontSize: 11, color: "#1a1a1a", fontWeight: 500, whiteSpace: "nowrap" }}>
              {displayLabel}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CylinderStatCard({ label, count, sub }) {
  return (
    <div style={{ background: GREY, borderRadius: 16, padding: "18px 20px", flex: 1 }} id={`cylinder-card-${label.toLowerCase()}`}>
      <div style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 500, marginBottom: 8 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
        <div style={{ fontSize: 24, fontWeight: 600, color: GREEN }}>
          {count} <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>Cylinders</span>
        </div>
        <div style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 500 }}>{sub}</div>
      </div>
    </div>
  );
}

export default function TrendsScreen({ onLockedClick }) {
  const [activeTrend, setActiveTrend] = useState("Highest Consumptions");

  return (
    <div id="trends-screen-layout" className="flex flex-col gap-6">
      {/* Navigation Sub-options */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div style={{ display: "flex", gap: 8, background: "#f4f3ee", borderRadius: 999, padding: 4, flexWrap: "wrap" }}>
          {["Highest Consumptions", "Lowest Consumptions"].map((t) => {
            const isSelected = t === activeTrend;
            return (
              <button
                key={t}
                onClick={() => {
                  if (t === "Lowest Consumptions") {
                    onLockedClick("Lowest Consumptions trend data");
                  } else {
                    setActiveTrend(t);
                  }
                }}
                style={{
                  padding: "11px 22px",
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
        <div className="flex flex-wrap gap-2.5">
          <Pill onClick={() => onLockedClick("Cylinder/Gas Type Filter")}>All Type <Chevron /></Pill>
          <Pill onClick={() => onLockedClick("Cylinder/Location Filter")}>All Locations <Chevron /></Pill>
        </div>
      </div>

      {/* KPI Cards - Fully Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="By time period" value="234 kg" sub="From 12:30 PM to 2:45 PM" icon={<ClockIcon />} />
        <StatCard label="By day of the week" value="470 kg" sub="Friday" icon={<CalDayIcon />} />
        <StatCard label="By date of the month" value="467 kg" sub="23rd Each month" icon={<FoldIcon />} />
        <StatCard label="By month" value="1.21 tons" sub="May" icon={<CalendarIcon />} />
      </div>

      {/* 24h Consumption Chart Panel */}
      <div style={{ background: GREY, borderRadius: 20, padding: "28px 32px 20px" }} id="trends-chart-panel">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Consumption Within 24 Hours</h2>
            <div style={{ marginTop: 8, fontSize: 15, color: "#1a1a1a" }}>
              <span style={{ fontWeight: 700, color: GREEN }}>1 PM &amp; 2PM:</span> Highest consumption times
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Pill onClick={() => onLockedClick("Hour Filter Type")}>All Type <Chevron /></Pill>
            <Pill onClick={() => onLockedClick("Hour Filter Location")}>All Locations <Chevron /></Pill>
            <Pill onClick={() => onLockedClick("Hour Filter Days")}>All Days <Chevron /></Pill>
          </div>
        </div>
        <HourlyBarChart />
      </div>

      {/* Consumption By Cylinders Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
        <h2 style={{ fontSize: 22, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Consumption By Cylinders</h2>
        <div className="flex flex-wrap gap-2.5">
          <Pill onClick={() => onLockedClick("Cylinder Stats Type")}>All Type <Chevron /></Pill>
          <Pill onClick={() => onLockedClick("Cylinder Stats Location")}>All Locations <Chevron /></Pill>
        </div>
      </div>

      {/* Cylinder Stats Cards - Fully Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CylinderStatCard label="Total" count={200} sub="9 tons" />
        <CylinderStatCard label="Weekly" count={4} sub="180 kg" />
        <CylinderStatCard label="Monthly" count={16} sub="720 kg" />
        <CylinderStatCard label="Yearly" count={192} sub="8.6 tons" />
      </div>
    </div>
  );
}
