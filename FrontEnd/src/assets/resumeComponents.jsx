/* ── Shared sub-components (all inline styles for PDF export) ── */
import { TemplateThumbnail } from "./TemplateThumbnail";

export function SecHeader({ a, title }) {
  return (
    <div
      style={{
        fontSize: 9.5,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: a,
        borderBottom: `1.5px solid ${a}`,
        paddingBottom: 3,
        margin: "14px 0 7px",
      }}
    >
      {title}
    </div>
  );
}

export function BandSecHeader({ a, title }) {
  return (
    <div
      style={{
        fontSize: 9.5,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: a,
        borderLeft: `3px solid ${a}`,
        paddingLeft: 8,
        margin: "13px 0 7px",
      }}
    >
      {title}
    </div>
  );
}

export function ExpBlock({ a, role, company, date, desc }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 1,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 700, color: "#111827" }}>
          {role}
        </span>
        <span style={{ fontSize: 8, color: "#9ca3af", whiteSpace: "nowrap" }}>
          {date}
        </span>
      </div>
      <div style={{ fontSize: 9, color: a, fontWeight: 600, marginBottom: 3 }}>
        {company}
      </div>
      {desc && (
        <p
          style={{
            margin: 0,
            fontSize: 8.5,
            color: "#4b5563",
            lineHeight: 1.6,
          }}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

export function EduBlock({ a, degree, school, date, grade }) {
  if (!degree && !school) return null;
  return (
    <div style={{ marginBottom: 9 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 700, color: "#111827" }}>
          {degree}
        </span>
        <span style={{ fontSize: 8, color: "#9ca3af" }}>{date}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 9, color: a, fontWeight: 500 }}>{school}</span>
        {grade && (
          <span style={{ fontSize: 8, color: "#6b7280" }}>{grade}</span>
        )}
      </div>
    </div>
  );
}

export function ProjBlock({ a, title, link, time, desc }) {
  if (!title) return null;
  return (
    <div style={{ marginBottom: 9 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 700, color: "#111827" }}>
          {title}
        </span>
        <span style={{ fontSize: 8, color: "#9ca3af" }}>{time}</span>
      </div>
      {link && (
        <div style={{ fontSize: 8, color: a, marginBottom: 2 }}>{link}</div>
      )}
      {desc && (
        <p
          style={{
            margin: 0,
            fontSize: 8.5,
            color: "#4b5563",
            lineHeight: 1.6,
          }}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

export function SkillTags({ a, skills }) {
  if (!skills.length) return null;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "4px 5px",
        marginTop: 4,
      }}
    >
      {skills.map((s, i) => (
        <span
          key={i}
          style={{
            fontSize: 8,
            background: `${a}15`,
            color: a,
            border: `1px solid ${a}30`,
            borderRadius: 4,
            padding: "2px 7px",
            fontWeight: 500,
          }}
        >
          {s}
        </span>
      ))}
    </div>
  );
}
