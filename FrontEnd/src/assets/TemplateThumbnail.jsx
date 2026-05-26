export function TemplateThumbnail({ tpl, selected, onClick }) {
  const a = tpl.accent;
  const isBand = tpl.id === 2 || tpl.id === 3;
  const isDeveloper = tpl.id === 10;
  const isTimeline = tpl.id === 11;
  const isAts = tpl.id === 9;

  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        width: 110,
        cursor: "pointer",
        border: selected ? `2.5px solid ${a}` : "2px solid #e2e8f0",
        borderRadius: 10,
        overflow: "hidden",
        background: "#fff",
        padding: 0,
        boxShadow: selected ? `0 0 0 3px ${a}22` : "0 1px 4px rgba(0,0,0,0.07)",
        transition: "all 0.18s ease",
        outline: "none",
      }}
    >
      <div
        style={{
          height: 78,
          background: isDeveloper ? "#0f0f0f" : isAts ? "#fff" : tpl.bg,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {(tpl.sidebar || isDeveloper) && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 28,
              background: a,
              opacity: 0.9,
            }}
          />
        )}
        {isBand && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 22,
              background: a,
              opacity: 0.9,
            }}
          />
        )}
        {isTimeline && (
          <div
            style={{
              position: "absolute",
              left: 8,
              top: 0,
              bottom: 0,
              width: 2,
              background: a,
              opacity: 0.8,
            }}
          />
        )}
        <div
          style={{
            padding:
              tpl.sidebar || isDeveloper
                ? "6px 5px 6px 33px"
                : isBand
                  ? "28px 7px 6px"
                  : isTimeline
                    ? "6px 7px 6px 18px"
                    : "6px 7px",
          }}
        >
          <div
            style={{
              width: "60%",
              height: 5,
              borderRadius: 3,
              background: isBand
                ? "#e2e8f0"
                : isAts
                  ? "#000"
                  : isDeveloper
                    ? a
                    : a,
              marginBottom: 3,
            }}
          />
          <div
            style={{
              width: "40%",
              height: 3,
              borderRadius: 2,
              background: isBand || isAts ? "#e2e8f0" : isDeveloper ? a : a,
              opacity: 0.4,
              marginBottom: 6,
            }}
          />
          <div
            style={{
              width: "100%",
              height: 2,
              borderRadius: 1,
              background: isDeveloper ? "#333" : "#e2e8f0",
              marginBottom: 2,
            }}
          />
          <div
            style={{
              width: "85%",
              height: 2,
              borderRadius: 1,
              background: isDeveloper ? "#333" : "#e2e8f0",
              marginBottom: 2,
            }}
          />
          <div
            style={{
              width: "70%",
              height: 2,
              borderRadius: 1,
              background: isDeveloper ? "#333" : "#e2e8f0",
              marginBottom: 5,
            }}
          />
          <div
            style={{
              width: "45%",
              height: 3,
              borderRadius: 2,
              background: isBand || isAts ? "#e2e8f0" : isDeveloper ? a : a,
              opacity: 0.6,
              marginBottom: 3,
            }}
          />
          <div
            style={{
              width: "100%",
              height: 2,
              borderRadius: 1,
              background: isDeveloper ? "#333" : "#e2e8f0",
              marginBottom: 2,
            }}
          />
          <div
            style={{
              width: "80%",
              height: 2,
              borderRadius: 1,
              background: isDeveloper ? "#333" : "#e2e8f0",
            }}
          />
        </div>
      </div>
      <div
        style={{
          padding: "5px 6px",
          fontSize: 11,
          fontWeight: 600,
          color: selected ? a : "#64748b",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#fff",
          borderTop: "1px solid #f1f5f9",
        }}
      >
        {tpl.name}
      </div>
    </button>
  );
}
