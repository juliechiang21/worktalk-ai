import { useMemo, useState } from "react";
import { recommendJobs, SCHOOLS } from "../data-careerfair.js";
import { DISC_TYPES } from "../data.js";
import { SimpleTopBar } from "../components/Shared.jsx";
import { applyJobPreset } from "./CareerFair.jsx";

export function RecommendationsScreen({ user, setRoute, setScenario, setRole, setMode, setSchoolId, setPracticeContext }) {
  // 將 recommendJobs 結果鎖在 mount 時，避免每次 re-render 都洗牌
  const [refreshKey, setRefreshKey] = useState(0);
  const jobs = useMemo(() => recommendJobs(user, 6), [user, refreshKey]);
  const disc = DISC_TYPES[user.disc?.type || "S"];

  const startPractice = (job) => {
    applyJobPreset(job, null, { setScenario, setRole, setMode, setRoute, setPracticeContext });
  };

  const goToSchool = (school) => {
    setSchoolId(school.id);
    setRoute("school");
  };

  return (
    <div className="app" data-screen-label="12 Recommendations">
      <SimpleTopBar user={user} current="recommend" setRoute={setRoute} />
      <div className="main">
        <div className="container">
          <div className="eyebrow" style={{ color: "var(--accent)" }}>個人職缺推薦 · MATCHED FOR YOU</div>
          <h1 className="h-page" style={{ marginTop: 8 }}>
            依你的<em style={{ fontStyle: "italic", color: "var(--accent)" }}>人格、產業、目標</em>，這 6 個職缺最值得你練。
          </h1>
          <p className="lede mt-2">
            演算法綜合考量你的 DISC、選擇的產業、本季想加強的能力與練習紀錄。每個職缺旁顯示它出現在哪些學校的就業博覽會中。
          </p>

          {/* 你的 profile 摘要 */}
          <div className="card-elev" style={{ padding: 22, marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 24, alignItems: "center" }}>
            <ProfileStat label="DISC 人格" value={disc.name} sub={disc.label} color={disc.color} />
            <ProfileStat label="鎖定產業" value={industryLabel(user.industry)} sub="可在 Profile 改" />
            <ProfileStat label="本季目標" value={`${(user.goals || []).length} 項`} sub={(user.goals || []).slice(0, 2).join("、") || "—"} />
            <button className="btn btn-ghost btn-sm" onClick={() => setRefreshKey(k => k + 1)}>↻ 重抽推薦</button>
          </div>

          {/* 推薦列表 */}
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>
            {jobs.map((job, idx) => (
              <RecCard
                key={job.id}
                rank={idx + 1}
                job={job}
                onPractice={() => startPractice(job)}
                onGoToSchool={goToSchool}
              />
            ))}
          </div>

          <div className="card-elev" style={{ padding: 24, marginTop: 36 }}>
            <div className="eyebrow" style={{ marginBottom: 8 }}>想看其他學校有什麼？</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <p style={{ margin: 0, fontSize: 14, color: "var(--ink-3)", lineHeight: 1.65 }}>
                到各校的線上就業博覽會逛逛，找出你還沒練過的產業情境。
              </p>
              <button className="btn btn-primary" onClick={() => setRoute("careerfair")}>看校博列表 →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileStat({ label, value, sub, color }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--ink-4)", textTransform: "uppercase", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 700, color: color || "var(--ink)" }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function RecCard({ rank, job, onPractice, onGoToSchool }) {
  return (
    <div className="card-elev" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, padding: "22px 26px", alignItems: "center" }}>
        {/* Rank + Score */}
        <div style={{ textAlign: "center", borderRight: "1px solid var(--line)", paddingRight: 20 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--ink-4)", textTransform: "uppercase" }}>
            MATCH · #{String(rank).padStart(2, "0")}
          </div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 700, color: "var(--accent)", lineHeight: 1, marginTop: 4 }}>
            {job.score}
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-4)", marginTop: 2 }}>/ 100</div>
        </div>

        {/* Job info */}
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              background: job.company.color, color: "white",
              display: "grid", placeItems: "center",
              fontFamily: "var(--serif)", fontSize: 12, fontWeight: 700,
              flexShrink: 0,
            }}>
              {(job.company.short || job.company.name)[0]}
            </div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 600, margin: 0 }}>{job.title}</h3>
            <span style={{ fontSize: 13, color: "var(--ink-3)" }}>· {job.company.name}</span>
            <span style={{ fontSize: 12, color: "var(--ink-3)" }}>· {industryLabel(job.industry)}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)" }}>· {job.salary}</span>
          </div>
          <p style={{ margin: "6px 0 10px", fontSize: 13, color: "var(--ink-3)", lineHeight: 1.55 }}>{job.desc}</p>

          {/* Why match */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {job.reasons.map((r, i) => (
              <span key={i} style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 100,
                background: "var(--accent-soft)",
                color: "var(--accent-deep)",
                fontFamily: "var(--sans)",
              }}>
                ✦ {r}
              </span>
            ))}
          </div>

          {/* Appearances */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--ink-4)", textTransform: "uppercase" }}>
              出現於校博
            </span>
            {job.appearances.map((s) => (
              <button
                key={s.id}
                onClick={() => onGoToSchool(s)}
                style={{
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 100,
                  border: `1px solid ${s.color}`,
                  color: s.color,
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.05em",
                }}
              >
                {s.short}
              </button>
            ))}
            {job.appearances.length === 0 && (
              <span style={{ fontSize: 11, color: "var(--ink-4)" }}>—</span>
            )}
          </div>
        </div>

        {/* Action */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button className="btn btn-primary" onClick={onPractice} style={{ whiteSpace: "nowrap" }}>
            ✨ 用此職缺練習 →
          </button>
          <div style={{ fontSize: 10, color: "var(--ink-4)", textAlign: "center", fontFamily: "var(--mono)", letterSpacing: "0.08em" }}>
            自動帶入情境
          </div>
        </div>
      </div>
    </div>
  );
}

function industryLabel(id) {
  return ({ tech: "科技業", finance: "金融業", traditional: "傳產", edu: "教育業", med: "醫療業" })[id] || id;
}
