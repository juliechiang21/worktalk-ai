import { useState } from "react";
import { SCHOOLS, COMPANIES } from "../data-careerfair.js";
import { SCENARIOS, AI_ROLES } from "../data.js";
import { SimpleTopBar } from "../components/Shared.jsx";

// ============================================================
//  CareerFairScreen · 學校列表
// ============================================================
export function CareerFairScreen({ user, setRoute, setSchoolId }) {
  const enter = (id) => { setSchoolId(id); setRoute("school"); };

  return (
    <div className="app" data-screen-label="10 CareerFair">
      <SimpleTopBar user={user} current="careerfair" setRoute={setRoute} />
      <div className="main">
        <div className="container">
          <div className="eyebrow" style={{ color: "var(--accent)" }}>線上就業博覽會 · ONLINE CAREER FAIR</div>
          <h1 className="h-page" style={{ marginTop: 8 }}>
            選一所學校，進入<em style={{ fontStyle: "italic", color: "var(--accent)" }}>校園專屬就業博覽會</em>
          </h1>
          <p className="lede mt-2">
            每所學校的校博集合該校重點合作企業，提供新鮮人友善的職缺。點任一職缺旁的「進入練習」，可直接以該職缺的真實情境啟動 AI 教練。
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            marginTop: 36,
          }}>
            {SCHOOLS.map((s) => (
              <button
                key={s.id}
                onClick={() => enter(s.id)}
                className="card"
                style={{
                  textAlign: "left",
                  cursor: "pointer",
                  padding: 0,
                  overflow: "hidden",
                  transition: "all 0.18s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  background: s.color,
                  color: "white",
                  padding: "22px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                }}>
                  <div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.25em", opacity: 0.8 }}>
                      {s.short} · {s.fair.dates}
                    </div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 700, marginTop: 4 }}>
                      {s.name}
                    </div>
                  </div>
                  <div style={{
                    width: 56, height: 56, borderRadius: 12,
                    background: "rgba(255,255,255,0.18)",
                    display: "grid", placeItems: "center",
                    fontFamily: "var(--serif)", fontSize: 22, fontWeight: 700,
                  }}>
                    {s.short.slice(0, 2)}
                  </div>
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
                    {s.fair.theme}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 14 }}>
                    📍 {s.fair.venue}
                  </div>
                  <div style={{ display: "flex", gap: 16, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
                    <Stat label="參展企業" value={s.fair.stats.companies} />
                    <Stat label="開放職缺" value={s.fair.stats.jobs} />
                    <Stat label="參與學生" value={s.fair.stats.students} />
                  </div>
                  <div style={{
                    marginTop: 16,
                    fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.15em",
                    color: s.color, textTransform: "uppercase",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    進入校博 →
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="card-elev" style={{ padding: 24, marginTop: 40, background: "var(--ink)", color: "var(--bg)", borderColor: "var(--ink)" }}>
            <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 8 }}>不確定哪個職缺適合你？</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
              <p style={{ margin: 0, color: "rgba(245,241,234,0.78)", lineHeight: 1.65, fontSize: 14 }}>
                讓 AI 依你的 DISC 人格、本季目標與練習紀錄，推薦最適合你練習的職缺。
              </p>
              <button className="btn btn-accent" onClick={() => setRoute("recommend")}>看我的職缺推薦 →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 18, color: "var(--ink)" }}>{value}</div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.18em", color: "var(--ink-4)", textTransform: "uppercase", marginTop: 2 }}>
        {label}
      </div>
    </div>
  );
}

// ============================================================
//  SchoolFairScreen · 該校的所有公司與職缺
// ============================================================
export function SchoolFairScreen({ user, setRoute, schoolId, startPracticeWithJob }) {
  const school = SCHOOLS.find(s => s.id === schoolId) || SCHOOLS[0];
  const [industryFilter, setIndustryFilter] = useState("all");

  const companies = school.companyIds.map(id => COMPANIES[id]).filter(Boolean);
  const filtered = industryFilter === "all" ? companies : companies.filter(c => c.industry === industryFilter);
  const industries = Array.from(new Set(companies.map(c => c.industry)));

  return (
    <div className="app" data-screen-label="11 SchoolFair">
      <SimpleTopBar user={user} current="careerfair" setRoute={setRoute} />
      <div className="main">
        <div className="container">
          <button
            onClick={() => setRoute("careerfair")}
            style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em", color: "var(--ink-3)", textTransform: "uppercase", marginBottom: 16 }}
          >
            ← 返回校博列表
          </button>

          {/* 校博 Hero */}
          <div style={{
            background: school.color,
            color: "white",
            borderRadius: 18,
            padding: "32px 36px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 24,
            alignItems: "end",
          }}>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.25em", opacity: 0.75 }}>
                {school.short} CAREER FAIR · {school.fair.dates}
              </div>
              <h1 style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 700, margin: "10px 0 6px", letterSpacing: "-0.005em" }}>
                {school.name}
              </h1>
              <div style={{ fontSize: 16, opacity: 0.9, fontFamily: "var(--serif)" }}>
                {school.fair.theme}
              </div>
              <div style={{ fontSize: 13, opacity: 0.75, marginTop: 8 }}>
                📍 {school.fair.venue}
              </div>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <HeroStat label="參展企業" value={school.fair.stats.companies} />
              <HeroStat label="職缺" value={school.fair.stats.jobs} />
              <HeroStat label="參與學生" value={school.fair.stats.students} />
            </div>
          </div>

          {/* Filter */}
          <div style={{ marginTop: 32, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em", color: "var(--ink-3)", textTransform: "uppercase", marginRight: 6 }}>
              依產業過濾
            </span>
            <FilterChip active={industryFilter === "all"} onClick={() => setIndustryFilter("all")} label="全部" />
            {industries.map((i) => (
              <FilterChip key={i} active={industryFilter === i} onClick={() => setIndustryFilter(i)} label={industryLabel(i)} />
            ))}
          </div>

          {/* Company list */}
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 18 }}>
            {filtered.map((c) => (
              <CompanyBlock key={c.id} company={c} school={school} startPractice={startPracticeWithJob} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroStat({ label, value }) {
  return (
    <div style={{ textAlign: "right" }}>
      <div style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 26, lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.2em", opacity: 0.7, marginTop: 4, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function FilterChip({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: 100,
        border: `1px solid ${active ? "var(--ink)" : "var(--line-2)"}`,
        background: active ? "var(--ink)" : "var(--bg-card)",
        color: active ? "var(--bg)" : "var(--ink-2)",
        fontSize: 12,
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}

function CompanyBlock({ company, school, startPractice }) {
  return (
    <div className="card-elev" style={{ padding: 0, overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 24px",
        borderBottom: "1px solid var(--line)",
        background: "var(--bg-card)",
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 10,
          background: company.color,
          color: "white",
          display: "grid", placeItems: "center",
          fontFamily: "var(--serif)", fontSize: 18, fontWeight: 700,
          flexShrink: 0,
        }}>
          {(company.short || company.name)[0]}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 19, fontWeight: 600, margin: 0 }}>{company.name}</h3>
            <span style={{
              fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em",
              padding: "2px 8px", borderRadius: 4,
              background: "var(--bg-elevated)", color: "var(--ink-3)",
              textTransform: "uppercase",
            }}>
              {industryLabel(company.industry)}
            </span>
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>{company.tag}</div>
          <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 4, fontFamily: "var(--mono)", letterSpacing: "0.05em" }}>
            {company.size}
          </div>
        </div>
      </div>

      {/* Culture banner */}
      <div style={{
        padding: "12px 24px",
        background: "var(--bg-elevated)",
        borderBottom: "1px solid var(--line)",
        fontSize: 12,
        color: "var(--ink-3)",
      }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--accent)", marginRight: 8, textTransform: "uppercase" }}>
          公司文化
        </span>
        {company.culture}
      </div>

      {/* Jobs */}
      <div>
        {company.jobs.map((job, i) => (
          <div key={job.id} style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "18px 24px",
            borderBottom: i < company.jobs.length - 1 ? "1px solid var(--line)" : "none",
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                <h4 style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 600, margin: 0 }}>{job.title}</h4>
                <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{job.level}</span>
                <span style={{ fontSize: 12, color: "var(--ink-3)" }}>· 📍 {job.location}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)" }}>· {job.salary}</span>
              </div>
              <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--ink-3)", lineHeight: 1.55 }}>{job.desc}</p>
              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                {job.tags.map((t) => (
                  <span key={t} style={{
                    fontSize: 10, fontFamily: "var(--mono)",
                    padding: "3px 8px", borderRadius: 4,
                    background: "var(--bg-elevated)", color: "var(--ink-3)",
                    letterSpacing: "0.05em",
                  }}>{t}</span>
                ))}
              </div>
            </div>
            <button
              onClick={() => startPractice(job, school)}
              className="btn btn-primary btn-sm"
              style={{ flexShrink: 0, whiteSpace: "nowrap" }}
            >
              ✨ 進入練習 →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function industryLabel(id) {
  return ({ tech: "科技業", finance: "金融業", traditional: "傳產", edu: "教育業", med: "醫療業" })[id] || id;
}

// ============================================================
//  Helper exported: 套用職缺的 practicePreset 到 chat state
// ============================================================
export function applyJobPreset(job, school, { setScenario, setRole, setMode, setRoute, setPracticeContext }) {
  const preset = job.practicePreset;
  const sc = SCENARIOS.find(s => s.id === preset.scenarioId) || SCENARIOS[0];
  const baseRole = AI_ROLES.find(r => r.id === preset.roleId) || AI_ROLES[0];
  setScenario(sc);
  setRole({
    ...baseRole,
    customName: preset.customName || "",
    customTitle: preset.customTitle || "",
    customPersonality: preset.customPersonality || "",
    customTone: preset.customTone || "",
  });
  setMode("text");
  setPracticeContext({
    source: "careerfair",
    jobTitle: job.title,
    companyName: school ? `${school.short} 校博 · ` : "" + "",
    company: job.company || null,
    schoolName: school?.name || "",
  });
  setRoute("chat");
}
