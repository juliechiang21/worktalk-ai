import { DISC_TYPES } from "../data.js";

export function SimpleTopBar({ user, current, setRoute, onBack }) {
  return (
    <div className="topbar">
      <div className="brand" onClick={() => setRoute && setRoute("home")}>
        <div className="brand-mark">W</div>
        <div>
          <div className="brand-name">WorkTalk AI</div>
          <div className="brand-tag">職場溝通教練</div>
        </div>
      </div>
      {user ? (
        <>
          <div className="topbar-nav">
            <button className={current === "home" ? "active" : ""} onClick={() => setRoute("home")}>首頁</button>
            <button className={current === "careerfair" ? "active" : ""} onClick={() => setRoute("careerfair")}>就業博覽會</button>
            <button className={current === "recommend" ? "active" : ""} onClick={() => setRoute("recommend")}>職缺推薦</button>
            <button className={current === "scenarios" ? "active" : ""} onClick={() => setRoute("scenarios")}>情境演練</button>
            <button className={current === "report" ? "active" : ""} onClick={() => setRoute("report")}>溝通分析</button>
            <button className={current === "optimize" ? "active" : ""} onClick={() => setRoute("optimize")}>表達優化</button>
          </div>
          <div className="user-chip">
            <div className="user-avatar">{user.nick?.[0] || "H"}</div>
            <div className="user-meta">
              <span className="n">{user.nick}</span>
              <span className="r">{user.title} · {DISC_TYPES[user.disc?.type || "C"].name}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="topbar-nav">
          <button className="active">建立帳號</button>
        </div>
      )}
    </div>
  );
}

export function Stepper({ current, done }) {
  const steps = ["建立個資", "選擇產業", "DISC 測驗"];
  return (
    <div className="stepper">
      {steps.map((s, i) => (
        <span key={i} style={{ display: "contents" }}>
          <div className={"step " + (i < current ? "done " : "") + (i === current && !done ? "active" : "") + ((i === current && done) ? " done" : "")}>
            <span className="dot"></span> {String(i + 1).padStart(2, "0")} {s}
          </div>
          {i < steps.length - 1 && <div className="sep" />}
        </span>
      ))}
    </div>
  );
}

export function MultiPick({ options, values, onChange }) {
  const toggle = (o) => {
    if (values.includes(o)) onChange(values.filter(v => v !== o));
    else onChange([...values, o]);
  };
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
      {options.map((o) => {
        const on = values.includes(o);
        return (
          <button
            key={o}
            onClick={() => toggle(o)}
            style={{
              padding: "10px 16px",
              borderRadius: 100,
              border: `1px solid ${on ? "var(--ink)" : "var(--line-2)"}`,
              background: on ? "var(--ink)" : "var(--bg-card)",
              color: on ? "var(--bg)" : "var(--ink-2)",
              fontSize: 13,
              fontFamily: "inherit",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {on ? "✓ " : ""}{o}
          </button>
        );
      })}
    </div>
  );
}
