import { useState } from "react";
import { REPORT, JARGON_DB, OPTIMIZE_SAMPLES, OPTIMIZE_TONES, INDUSTRY_KNOWHOW } from "../data.js";
import { SimpleTopBar } from "../components/Shared.jsx";

export function ReportScreen({ user, setRoute, scenario, role }) {
  const R = REPORT;
  return (
    <div className="app" data-screen-label="08 Report">
      <SimpleTopBar user={user} current="report" setRoute={setRoute} />
      <div className="main">
        <div className="container">
          <div className="report-hero">
            <div>
              <div className="eyebrow">SESSION REPORT · 06/14</div>
              <h1 className="h-page" style={{ marginTop: 8 }}>{scenario?.name || "向主管提案"}<br /><span style={{ fontFamily: "var(--mono)", fontSize: 14, color: "var(--ink-3)" }}>· {role?.name || "主管"}角色 · 已完成</span></h1>
              <div className="meta" style={{ marginTop: 20 }}>
                <span>⏱ 耗時 {R.duration}</span>
                <span>↳ {R.rounds} 回合</span>
                <span>📊 已分析 18 句話</span>
              </div>
            </div>
            <div className="score-card">
              <div className="lbl">綜合表現</div>
              <div className="num"><em>{R.score}</em><span className="sl">/100</span></div>
              <div className="gr">GRADE {R.grade} · 比上次 +14</div>
            </div>
          </div>

          <div className="report-section">
            <h2>四項核心指標 <span className="sm">/ Core Metrics</span></h2>
            <div className="metric-grid">
              {R.metrics.map((m) => (
                <div key={m.id} className={"metric-card " + m.kind}>
                  <div className="top">
                    <div className="nm">{m.nm}</div>
                    <div className="ic">{m.id === "aggression" ? "AG" : m.id === "submissive" ? "SB" : m.id === "confidence" ? "CF" : "PS"}</div>
                  </div>
                  <div className="vl">{m.val}<span className="sl">/100</span></div>
                  <div className={"delta " + (m.id === "confidence" || m.id === "persuasion" ? "up" : "down")}>{m.delta}</div>
                  <div className="arc"><div className="v" style={{ width: m.val + "%" }} /></div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 10, lineHeight: 1.55 }}>{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <h2>關鍵句逐句分析 <span className="sm">/ Sentence-level Audit</span></h2>
            <div className="transcript-list">
              {R.transcript.map((t, i) => (
                <div key={i} className="transcript-item">
                  <div className="ts">{t.ts}</div>
                  <div className="ut">{highlight(t.user, t.hl)}</div>
                  <div className="tags">
                    {t.tags.map((tg, j) => (
                      <span key={j} className={"tag " + tg.kind}><span className="dot"></span> {tg.l}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <h2>AI 一鍵改寫 <span className="sm">/ Suggested Rewrite</span></h2>
            {R.rewrites.map((r, i) => (
              <div key={i} className="rewrite-card">
                <div className="col">
                  <div className="lbl">你原本說</div>
                  <div className="original strike">{r.original}</div>
                </div>
                <div className="arrow">→</div>
                <div className="col">
                  <div className="lbl">建議改寫</div>
                  <div className="improved">{r.improved}</div>
                </div>
              </div>
            ))}
            <div className="rewrite-explain">
              <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase" }}>WHY</span>
              <span><b>{R.rewrites[0].reason.split("。")[0]}。</b>{R.rewrites[0].reason.split("。").slice(1).join("。")}</span>
            </div>
          </div>

          <div className="report-section">
            <h2>下一步建議 <span className="sm">/ Recommendations</span></h2>
            <div className="reco-grid">
              {R.recommendations.map((r) => (
                <div key={r.n} className="reco-card">
                  <div className="n">RECOMMENDATION · {r.n}</div>
                  <h4>{r.h}</h4>
                  <p>{r.p}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="report-section">
            <h2>職場黑話翻譯 <span className="sm">/ Office Speak Decoded</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {JARGON_DB.map((j, i) => (
                <div key={i} className="jargon-item" style={{ borderLeftWidth: 4 }}>
                  <div className="q" style={{ fontSize: 14, marginBottom: 6 }}>{j.q}</div>
                  <div className="a" style={{ fontSize: 13 }}>{j.a}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-8" style={{ justifyContent: "space-between" }}>
            <button className="btn btn-ghost" onClick={() => setRoute("home")}>← 回首頁</button>
            <div className="flex gap-3">
              <button className="btn btn-ghost" onClick={() => setRoute("optimize")}>體驗一鍵優化 →</button>
              <button className="btn btn-primary" onClick={() => setRoute("scenarios")}>再練一場 →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function highlight(text, parts) {
  if (!parts || !parts.length) return text;
  let result = [text];
  parts.forEach((p, idx) => {
    const next = [];
    result.forEach((seg) => {
      if (typeof seg !== "string") { next.push(seg); return; }
      const i = seg.indexOf(p.t);
      if (i === -1) { next.push(seg); return; }
      if (i > 0) next.push(seg.slice(0, i));
      next.push(<span key={"h" + idx + i} className={"hl " + (p.k === "default" ? "" : p.k)}>{p.t}</span>);
      if (i + p.t.length < seg.length) next.push(seg.slice(i + p.t.length));
    });
    result = next;
  });
  return result;
}

export function OptimizeScreen({ user, setRoute }) {
  const SAMPLES = OPTIMIZE_SAMPLES;
  const TONES = OPTIMIZE_TONES;
  const [input, setInput] = useState(SAMPLES[0].raw);
  const [tone, setTone] = useState("warm");
  const [output, setOutput] = useState(SAMPLES[0].out.warm);
  const [animKey, setAnimKey] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState(user.industry || "tech");

  const optimize = () => {
    const match = SAMPLES.find(s => input.includes(s.raw.slice(0, 4)) || s.raw.includes(input.slice(0, 4)));
    if (match && match.out[tone]) {
      setOutput(match.out[tone]);
    } else {
      const base = input
        .replace(/啦$/g, "").replace(/吧$/g, "")
        .replace(/不行/g, "目前的時程下不太能配合")
        .replace(/我覺得/g, "我評估");
      const framing = {
        pro: `從專業面看，${base}，建議我們可以對齊一下優先順序。`,
        warm: `我想跟您 share 一下我的想法：${base}。您看，這樣安排會不會比較順？`,
        exec: `Update：${base}。建議的下一步是先聚焦在最關鍵的項目，再逐步展開。`,
        client: `為了確保品質與時程兼顧，${base}。我們會在期中再向您同步進度。`,
      };
      setOutput(framing[tone]);
    }
    setAnimKey(k => k + 1);
  };

  const selectTone = (t) => {
    setTone(t);
    const match = SAMPLES.find(s => input.includes(s.raw.slice(0, 4)));
    if (match && match.out[t]) {
      setOutput(match.out[t]);
      setAnimKey(k => k + 1);
    }
  };

  const useSample = (s) => {
    setInput(s.raw);
    setOutput(s.out[tone] || s.out.warm);
    setAnimKey(k => k + 1);
  };

  return (
    <div className="app" data-screen-label="09 Optimize">
      <SimpleTopBar user={user} current="optimize" setRoute={setRoute} />
      <div className="main">
        <div className="container">
          <div className="eyebrow">表達優化工具</div>
          <h1 className="h-page" style={{ marginTop: 8 }}>
            把<em style={{ fontStyle: "italic", color: "var(--accent)" }}>直白</em>的說法，<br />
            換成<em style={{ fontStyle: "italic", color: "var(--accent)" }}>高情商</em>的職場語言。
          </h1>
          <p className="lede mt-2">把你想說但不知道怎麼包裝的話貼進左邊，AI 會幫你改寫成有專業感、有溫度、有影響力的版本。</p>

          <div style={{ marginTop: 28 }}>
            <div className="label" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>選擇語氣風格</div>
            <div className="tone-pill-row" style={{ marginTop: 0 }}>
              {TONES.map((t) => (
                <button key={t.id} className={"tone-pill " + (tone === t.id ? "active" : "")} onClick={() => selectTone(t.id)}>
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="optim-shell">
            <div className="optim-side">
              <div className="lbl">你想說的（直白版）</div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="例如：這個我做不完啦，太多事了。"
              />
              <div className="footer">
                <span>{input.length} 字</span>
                <button className="btn btn-accent btn-sm" onClick={optimize}>✨ 一鍵優化 →</button>
              </div>
            </div>
            <div className="optim-side optim-output">
              <div className="lbl">AI 優化後（{TONES.find(t => t.id === tone)?.name}）</div>
              <div key={animKey} className="out-text" style={{ animation: "slideIn 0.35s ease" }}>{output}</div>
              <div className="footer">
                <span>{output.length} 字</span>
                <button className="btn btn-sm" style={{ background: "var(--accent)", color: "white" }} onClick={() => navigator.clipboard?.writeText(output)}>
                  📋 複製
                </button>
              </div>
            </div>
          </div>

          <div className="section-title-row" style={{ marginTop: 40 }}>
            <h2>看別人怎麼說 <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-4)", letterSpacing: "0.15em", marginLeft: 8, textTransform: "uppercase" }}>5 個常見句</span></h2>
            <span className="more">點擊載入範例</span>
          </div>
          <div className="sample-list">
            {SAMPLES.map((s, i) => (
              <button key={i} className="sample-item" onClick={() => useSample(s)} style={{ textAlign: "left" }}>
                <span className="qm">#{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div style={{ color: "var(--ink)", fontWeight: 500 }}>{s.raw}</div>
                  <div style={{ color: "var(--ink-3)", fontSize: 12, marginTop: 4, fontFamily: "var(--serif)", fontStyle: "italic" }}>→ {s.out.warm.slice(0, 50)}…</div>
                </div>
              </button>
            ))}
          </div>

          <IndustryKnowHow active={activeIndustry} setActive={setActiveIndustry} userIndustry={user.industry} />

          <div className="card-elev" style={{ padding: 28, marginTop: 40, background: "var(--ink)", color: "var(--bg)", borderColor: "var(--ink)" }}>
            <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 12 }}>下次演練時</div>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 22, margin: "0 0 8px" }}>在聊天室直接呼叫「AI 改寫」</h3>
            <p style={{ color: "rgba(245,241,234,0.7)", lineHeight: 1.7, margin: 0, fontSize: 14, maxWidth: "60ch" }}>
              在演練過程中，當你打到一半發現語氣不對，按下輸入框右側的 <b style={{ color: "var(--accent)" }}>✨ AI 改寫</b> 按鈕，
              系統會立即幫你產生 1 個專業版本，按「使用」就能送出。
            </p>
            <button className="btn btn-accent" style={{ marginTop: 18 }} onClick={() => setRoute("scenarios")}>立即試試 →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IndustryKnowHow({ active, setActive, userIndustry }) {
  const k = INDUSTRY_KNOWHOW[active];
  if (!k) return null;
  const industries = Object.values(INDUSTRY_KNOWHOW);

  return (
    <div style={{ marginTop: 56 }}>
      <div className="section-title-row" style={{ marginBottom: 6 }}>
        <h2>
          產業 Know-How
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-4)", letterSpacing: "0.15em", marginLeft: 10, textTransform: "uppercase" }}>
            / 5 個產業的溝通文法
          </span>
        </h2>
        <span className="more">點切換</span>
      </div>
      <p style={{ color: "var(--ink-3)", fontSize: 13, margin: "0 0 18px", lineHeight: 1.6 }}>
        同樣一句話，在不同產業的「正確」表達方式可能完全相反。下方是各產業實際在用的溝通文法、地雷、與升級句型。
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        {industries.map((ind) => {
          const on = ind.id === active;
          const isUser = ind.id === userIndustry;
          return (
            <button
              key={ind.id}
              onClick={() => setActive(ind.id)}
              style={{
                padding: "10px 18px",
                borderRadius: 100,
                border: `1px solid ${on ? "var(--ink)" : "var(--line-2)"}`,
                background: on ? "var(--ink)" : "var(--bg-card)",
                color: on ? "var(--bg)" : "var(--ink-2)",
                fontSize: 13,
                fontFamily: "inherit",
                cursor: "pointer",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>{ind.name}</span>
              {isUser && (
                <span style={{
                  fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.15em",
                  padding: "2px 6px", borderRadius: 4,
                  background: on ? "var(--accent)" : "var(--accent-soft)",
                  color: on ? "var(--bg)" : "var(--accent-deep)",
                }}>
                  你的
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="card-elev" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "24px 28px", background: "var(--bg-card)", borderBottom: "1px solid var(--line)" }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>產業氛圍 · Vibe</div>
          <p style={{ margin: 0, fontFamily: "var(--serif)", fontSize: 18, lineHeight: 1.65, color: "var(--ink)" }}>
            {k.vibe}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--line)" }}>
          <div style={{ padding: "22px 28px", borderRight: "1px solid var(--line)" }}>
            <div className="eyebrow" style={{ marginBottom: 10, color: "var(--sage)" }}>✓ DO · 這樣做</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {k.dos.map((d, i) => (
                <li key={i} style={{ display: "flex", gap: 8, fontSize: 13, lineHeight: 1.6, color: "var(--ink-2)" }}>
                  <span style={{ color: "var(--sage)", fontWeight: 700 }}>·</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ padding: "22px 28px" }}>
            <div className="eyebrow" style={{ marginBottom: 10, color: "var(--accent)" }}>✗ DON'T · 千萬別</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {k.donts.map((d, i) => (
                <li key={i} style={{ display: "flex", gap: 8, fontSize: 13, lineHeight: 1.6, color: "var(--ink-2)" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 700 }}>·</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ padding: "22px 28px", borderBottom: "1px solid var(--line)" }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>慣用詞與真實涵義 · Jargon</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {k.jargon.map((j, i) => (
              <div key={i} className="jargon-item" style={{ borderLeftWidth: 4 }}>
                <div className="q" style={{ fontSize: 13, marginBottom: 4 }}>{j.q}</div>
                <div className="a" style={{ fontSize: 12 }}>{j.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "22px 28px" }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>實戰句型 · Before / After</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {k.phrases.map((p, i) => (
              <div key={i} style={{
                border: "1px solid var(--line)",
                borderRadius: 12,
                overflow: "hidden",
                background: "var(--bg)",
              }}>
                <div style={{
                  padding: "10px 16px",
                  borderBottom: "1px solid var(--line)",
                  background: "var(--bg-elevated)",
                  fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.15em",
                  color: "var(--ink-3)", textTransform: "uppercase",
                }}>
                  情境 · {p.topic}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <div style={{ padding: "14px 18px", borderRight: "1px solid var(--line)" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.18em", marginBottom: 6, textTransform: "uppercase" }}>
                      ✗ Before
                    </div>
                    <div style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.65, textDecoration: "line-through", textDecorationColor: "var(--line-2)" }}>
                      「{p.weak}」
                    </div>
                  </div>
                  <div style={{ padding: "14px 18px", background: "var(--bg-card)" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--sage)", letterSpacing: "0.18em", marginBottom: 6, textTransform: "uppercase" }}>
                      ✓ After
                    </div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--ink)", lineHeight: 1.7 }}>
                      「{p.strong}」
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
