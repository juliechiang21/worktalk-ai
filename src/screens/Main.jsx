import { useState } from "react";
import { DISC_TYPES, SCENARIOS, AI_ROLES } from "../data.js";
import { SimpleTopBar } from "../components/Shared.jsx";

const PERSONALITY_PRESETS = {
  boss: [
    { lbl: "保守 · 重風險", title: "資深處長", personality: "決策保守，凡事先評估風險，討厭驚喜", tone: "簡短、要求數據佐證" },
    { lbl: "結果導向", title: "業務副總", personality: "看數字、看 ROI，沒耐性聽過程", tone: "急、打斷你、丟問題回來" },
    { lbl: "技術出身", title: "技術 Lead", personality: "邏輯派、抓 corner case、喜歡追問細節", tone: "冷靜、針鋒相對、不留情面" },
  ],
  peer: [
    { lbl: "和善但忙", title: "資深工程師", personality: "願意幫但 KPI 也很重，會半推半就", tone: "客氣、會委婉拒絕" },
    { lbl: "競爭意識強", title: "同期 PM", personality: "暗中比較，幫你前要先確保自己不吃虧", tone: "表面熱情，實際保留" },
    { lbl: "新人怕事", title: "Junior 同事", personality: "怕擔責任、會 escalate 給主管", tone: "弱、模糊、推給上層" },
  ],
  client: [
    { lbl: "強勢採購", title: "採購總監", personality: "用合約壓人、拿其他 vendor 比價", tone: "強硬、不留情面、要折扣" },
    { lbl: "技術買家", title: "客戶 CTO", personality: "懂技術、會挑架構問題、不接受空話", tone: "理性、深入細節、要 SLA" },
    { lbl: "高階決策者", title: "客戶 VP", personality: "時間少、只看商業價值與風險", tone: "話少、要結論、會直接 cut 你" },
  ],
};

function RoleCustomizer({ role, setRole }) {
  const [open, setOpen] = useState(false);
  const presets = PERSONALITY_PRESETS[role.id] || [];

  const applyPreset = (p) => {
    setRole({
      ...role,
      customTitle: p.title,
      customPersonality: p.personality,
      customTone: p.tone,
    });
  };

  const reset = () => {
    setRole({ ...role, customName: "", customTitle: "", customPersonality: "", customTone: "" });
  };

  const update = (k, v) => setRole({ ...role, [k]: v });

  const hasCustom = role.customName || role.customTitle || role.customPersonality || role.customTone;

  return (
    <div style={{
      marginTop: 16,
      border: "1px solid var(--line)",
      borderRadius: 14,
      background: "var(--bg-card)",
      overflow: "hidden",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          textAlign: "left",
          fontFamily: "var(--sans)",
          fontSize: 14,
          color: "var(--ink)",
          background: "transparent",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase" }}>
            ✨ 客製化對手
          </span>
          <span style={{ color: "var(--ink-3)", fontSize: 12 }}>
            {hasCustom ? "已自訂" : "讓 AI 更像你真實會遇到的那個人（選擇性）"}
          </span>
        </span>
        <span style={{ color: "var(--ink-3)", fontSize: 18, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>⌄</span>
      </button>

      {open && (
        <div style={{ padding: "0 20px 22px", borderTop: "1px solid var(--line)" }}>
          {presets.length > 0 && (
            <div style={{ marginTop: 18 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--ink-4)", textTransform: "uppercase", marginBottom: 10 }}>
                快速套用 · 常見人設
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {presets.map((p) => (
                  <button
                    key={p.lbl}
                    onClick={() => applyPreset(p)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 100,
                      border: "1px solid var(--line-2)",
                      background: "var(--bg)",
                      color: "var(--ink-2)",
                      fontSize: 12,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.color = "var(--ink)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--line-2)"; e.currentTarget.style.color = "var(--ink-2)"; }}
                  >
                    {p.lbl}
                  </button>
                ))}
                {hasCustom && (
                  <button
                    onClick={reset}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 100,
                      border: "1px dashed var(--line-2)",
                      background: "transparent",
                      color: "var(--ink-4)",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    ↺ 重設
                  </button>
                )}
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 18 }}>
            <div className="field">
              <label>稱呼 / 名字</label>
              <input
                className="input"
                placeholder={`預設：${role.name}（例如 王經理、Allen）`}
                value={role.customName || ""}
                onChange={(e) => update("customName", e.target.value)}
              />
            </div>
            <div className="field">
              <label>職位</label>
              <input
                className="input"
                placeholder="例如：資深處長 / RD Lead / 採購總監"
                value={role.customTitle || ""}
                onChange={(e) => update("customTitle", e.target.value)}
              />
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label>個性特質</label>
              <input
                className="input"
                placeholder="例如：決策保守、注重風險、討厭驚喜"
                value={role.customPersonality || ""}
                onChange={(e) => update("customPersonality", e.target.value)}
              />
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label>說話風格 / 語氣</label>
              <input
                className="input"
                placeholder={`預設：${role.style}（例如：簡短犀利、會打斷你）`}
                value={role.customTone || ""}
                onChange={(e) => update("customTone", e.target.value)}
              />
            </div>
          </div>

          <p style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 10, lineHeight: 1.6 }}>
            💡 這些設定會影響聊天室中對手的顯示資訊與情境氛圍。對話回應仍依據預設劇本（Demo 版）。
          </p>
        </div>
      )}
    </div>
  );
}

export function HomeScreen({ user, setRoute, setScenario, setRole, setMode }) {
  const TYPES = DISC_TYPES;
  const top = user.disc?.type || "C";

  const startScenario = (sc, r = "boss", m = "text") => {
    setScenario(sc);
    setRole(AI_ROLES.find(x => x.id === r));
    setMode(m);
    setRoute("chat");
  };

  return (
    <div className="app" data-screen-label="05 Home">
      <SimpleTopBar user={user} current="home" setRoute={setRoute} />
      <div className="main">
        <div className="container">

          <div className="home-hero">
            <div className="hero-main">
              <div className="eyebrow" style={{ color: "var(--accent)" }}>個人首頁 · YOUR DASHBOARD</div>
              <div className="hero-greeting">下午好，{user.nick}。<br />今天想<em>練哪一段</em>對話？</div>
              <div className="hero-sub">這是你的職場溝通訓練中心。下方三大模組對應你需要的三件事：<b style={{ color: "var(--bg)" }}>練對話、看診斷、改說法</b>。</div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="v">{user.disc?.type || "S"}<span className="u">型</span></div>
                  <div className="l">你的 DISC 人格</div>
                </div>
                <div className="hero-stat">
                  <div className="v">12<span className="u">場</span></div>
                  <div className="l">已完成演練</div>
                </div>
                <div className="hero-stat">
                  <div className="v">A-<span className="u"></span></div>
                  <div className="l">本月綜合評級</div>
                </div>
              </div>
            </div>

            <div className="hero-side">
              <div className="disc-tag">
                <span className="pill">{top}</span>
                <span>你的 DISC：{TYPES[top].name}</span>
              </div>
              <h3>本週弱點 · AI 教練偵測</h3>
              <div className="weak-list">
                <div className="weak-item">
                  <span className="badge">委屈感</span>
                  <span>向上溝通時，仍有 35% 句子帶自我貶低用語。</span>
                </div>
                <div className="weak-item">
                  <span className="badge">說服力</span>
                  <span>65% 對話沒明確結尾的 Ask（下一步）。</span>
                </div>
              </div>
              <div style={{ fontSize: 11, color: "var(--ink-4)", fontFamily: "var(--mono)", letterSpacing: "0.1em", marginTop: 4 }}>↓ 系統根據這些弱點推薦下方訓練</div>
            </div>
          </div>

          {/* 校博 + 推薦入口 */}
          <div style={{
            marginTop: 32,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}>
            <button onClick={() => setRoute("careerfair")} className="card-elev" style={{
              padding: 22, textAlign: "left", cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
              transition: "all 0.15s",
            }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--ink)"}
              onMouseOut={(e) => e.currentTarget.style.borderColor = ""}
            >
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>🎓 線上就業博覽會</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 600 }}>逛你學校的校博 →</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>4 所合作學校、30+ 企業職缺</div>
              </div>
              <div style={{ fontSize: 28, color: "var(--accent)" }}>→</div>
            </button>
            <button onClick={() => setRoute("recommend")} className="card-elev" style={{
              padding: 22, textAlign: "left", cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
              background: "var(--ink)", color: "var(--bg)", borderColor: "var(--ink)",
            }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6, color: "var(--accent)" }}>✨ AI 個人化推薦</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 600 }}>看我適合練哪些職缺 →</div>
                <div style={{ fontSize: 12, color: "rgba(245,241,234,0.6)", marginTop: 4 }}>依你的 DISC、產業、目標推薦</div>
              </div>
              <div style={{ fontSize: 28, color: "var(--accent)" }}>→</div>
            </button>
          </div>

          <div style={{ marginTop: 48 }}>
            <div className="eyebrow">三大訓練模組 · CORE FEATURES</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 700, margin: "10px 0 6px", letterSpacing: "-0.005em" }}>
              一套完整的<em style={{ fontStyle: "italic", color: "var(--accent)" }}>練 → 診 → 改</em>循環
            </h2>
            <p className="lede">每個模組對應上方導覽列。你可以從任何一個開始，也可以照順序走一輪。</p>
          </div>

          <FeatureBlock
            n="01"
            tagline="練"
            taglineEn="PRACTICE"
            title="職場情境模擬"
            subtitle="與 AI 進行真實職場對話演練"
            body="挑一個你不擅長的情境，AI 會扮演主管、同事或客戶，逼你練到能應對為止。"
            cta="進入情境演練 →"
            onCta={() => setRoute("scenarios")}
            accent="var(--accent)"
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {SCENARIOS.map((sc, i) => (
                <button key={sc.id} className="mini-scenario" onClick={() => startScenario(sc)}>
                  <div className="ix">{String(i + 1).padStart(2, "0")}</div>
                  <div className="nm">{sc.name}</div>
                  <div className="lv">{sc.levelLabel}</div>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14, fontSize: 12, color: "var(--ink-3)", flexWrap: "wrap" }}>
              <span className="mini-tag">💬 文字聊天</span>
              <span className="mini-tag">🎙 語音面談</span>
              <span className="mini-tag">3 種 AI 角色</span>
              <span className="mini-tag">即時情緒溫度條</span>
            </div>
          </FeatureBlock>

          <FeatureBlock
            n="02"
            tagline="診"
            taglineEn="DIAGNOSE"
            title="溝通診斷分析"
            subtitle="分析語氣、邏輯、情緒與職場表現"
            body="每場演練結束後自動產生報告。告訴你哪裡過度討好、太防禦、或缺乏重點。"
            cta="查看上次的分析報告 →"
            onCta={() => setRoute("report")}
            accent="var(--sage)"
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              <MetricPreview nm="攻擊性" val={22} hint="↓ 控制得宜" good />
              <MetricPreview nm="委屈感" val={18} hint="↓ 比上次 -22" good />
              <MetricPreview nm="自信度" val={78} hint="↑ 比上次 +14" />
              <MetricPreview nm="說服力" val={80} hint="↑ 比上次 +18" />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14, fontSize: 12, color: "var(--ink-3)", flexWrap: "wrap" }}>
              <span className="mini-tag">🌡 情緒溫度條</span>
              <span className="mini-tag">📝 逐句標註</span>
              <span className="mini-tag">📖 職場黑話翻譯</span>
              <span className="mini-tag">💡 AI 重點回饋</span>
            </div>
          </FeatureBlock>

          <FeatureBlock
            n="03"
            tagline="改"
            taglineEn="OPTIMIZE"
            title="專業表達優化"
            subtitle="將直白說法升級為高情商表達"
            body="把「我做不完啦」這種真實對話，一鍵改寫成更有專業感、影響力的版本。"
            cta="體驗一鍵優化 →"
            onCta={() => setRoute("optimize")}
            accent="var(--gold)"
          >
            <div className="rewrite-mini">
              <div className="col">
                <div className="lbl">你原本想說</div>
                <div className="raw">「這個我做不完啦，太多事了。」</div>
              </div>
              <div className="arr">→</div>
              <div className="col">
                <div className="lbl">AI 優化後</div>
                <div className="opt">「我想跟您 share 一下目前的狀況。手邊三件事我能在本週收掉兩件，第三件我希望我們一起對齊一下優先順序。」</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14, fontSize: 12, color: "var(--ink-3)", flexWrap: "wrap" }}>
              <span className="mini-tag">✏️ AI 幫我改寫 (寫)</span>
              <span className="mini-tag">🎚 一鍵優化語氣 (說)</span>
              <span className="mini-tag">4 種語氣風格</span>
            </div>
          </FeatureBlock>

          <div className="section-title-row" style={{ marginTop: 64 }}>
            <h2>你的近期練習</h2>
            <button className="more" style={{ background: "none", cursor: "pointer", color: "var(--accent)" }} onClick={() => setRoute("report")}>查看全部 →</button>
          </div>
          <p style={{ color: "var(--ink-3)", fontSize: 14, margin: "0 0 16px" }}>點任一場可看到完整的溝通診斷分析。</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            <PastSessionCard title="向主管提案 v1" role="主管" score={82} grade="A-" delta="+14" onClick={() => setRoute("report")} />
            <PastSessionCard title="拒絕加班" role="主管" score={68} grade="B+" delta="+8" onClick={() => setRoute("report")} />
            <PastSessionCard title="跨部門協作" role="同事" score={75} grade="B+" delta="+11" onClick={() => setRoute("report")} />
          </div>

        </div>
      </div>
    </div>
  );
}

function FeatureBlock({ n, tagline, taglineEn, title, subtitle, body, cta, onCta, accent, children }) {
  return (
    <section className="feature-block" style={{ "--accent-local": accent }}>
      <header className="fb-head">
        <div className="fb-num">{n}</div>
        <div className="fb-tagline">
          <div className="ch" style={{ color: accent }}>{tagline}</div>
          <div className="en">{taglineEn}</div>
        </div>
        <div className="fb-titles">
          <h3>{title}</h3>
          <p className="st">{subtitle}</p>
          <p className="bd">{body}</p>
        </div>
        <button className="btn btn-primary" onClick={onCta} style={{ alignSelf: "center" }}>{cta}</button>
      </header>
      <div className="fb-body">{children}</div>
    </section>
  );
}

function MetricPreview({ nm, val, hint, good }) {
  return (
    <div className="metric-prev">
      <div className="nm">{nm}</div>
      <div className="vl">{val}<span>/100</span></div>
      <div className="meter"><div className="v" style={{ width: val + "%", background: good ? "var(--sage)" : "var(--accent)" }} /></div>
      <div className="hint">{hint}</div>
    </div>
  );
}

function PastSessionCard({ title, role, score, grade, delta, onClick }) {
  return (
    <button className="card" style={{ textAlign: "left", cursor: "pointer", transition: "all 0.15s" }}
      onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--ink-3)"}
      onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--line)"}
      onClick={onClick}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--ink-4)", textTransform: "uppercase", marginBottom: 4 }}>{role}</div>
          <div style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 17 }}>{title}</div>
        </div>
        <div style={{ background: "var(--ink)", color: "var(--bg)", padding: "4px 10px", borderRadius: 6, fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600 }}>{grade}</div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 700 }}>{score}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>/ 100</span>
        <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)" }}>↑ {delta}</span>
      </div>
    </button>
  );
}

export function ScenarioPickerScreen({ user, setRoute, scenario, setScenario, role, setRole, mode, setMode, startChat }) {
  const ready = scenario && role && mode;

  return (
    <div className="app" data-screen-label="06 Scenario">
      <SimpleTopBar user={user} current="scenarios" setRoute={setRoute} />
      <div className="main">
        <div className="container">
          <div className="eyebrow">情境演練 · STEP 1 / 3</div>
          <h1 className="h-page" style={{ marginTop: 8 }}>選擇你要練習的<em style={{ fontStyle: "italic", color: "var(--accent)" }}>職場時刻</em></h1>
          <p className="lede mt-2">每個情境都有預設的對話結構與評估標準。練完會自動產生診斷報告。</p>

          <div className="scenario-grid">
            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                className={"scenario-card " + (scenario?.id === sc.id ? "selected" : "")}
                onClick={() => setScenario(sc)}
              >
                <div className="sc-tag">
                  <span className={"lvl " + sc.level}>{sc.levelLabel}</span>
                  <span>· {sc.short}</span>
                </div>
                <h3>{sc.name}</h3>
                <p>{sc.desc}</p>
                <div className="sc-meta">
                  <span>⏱ {sc.duration}</span>
                  <span>↳ {sc.rounds}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="section-title-row">
            <h2>誰來扮演對手？</h2>
            <span className="more">STEP 2 / 3</span>
          </div>
          <div className="role-row">
            {AI_ROLES.map((r) => (
              <button
                key={r.id}
                className={"role-card " + (role?.id === r.id ? "selected" : "")}
                onClick={() => setRole({
                  ...r,
                  customName: "",
                  customTitle: "",
                  customPersonality: "",
                  customTone: "",
                })}
              >
                <div className="role-avatar" style={{ background: r.color }}>{r.name[0]}</div>
                <div>
                  <div className="nm">{r.name}</div>
                  <div className="d">{r.desc}</div>
                  <div className="d" style={{ marginTop: 2, fontStyle: "italic" }}>風格：{r.style}</div>
                </div>
              </button>
            ))}
          </div>

          {role && <RoleCustomizer role={role} setRole={setRole} />}

          <div className="section-title-row">
            <h2>對話模式</h2>
            <span className="more">STEP 3 / 3</span>
          </div>
          <div className="mode-toggle">
            <button className={mode === "text" ? "active" : ""} onClick={() => setMode("text")}>
              <span>💬</span> 文字聊天室
            </button>
            <button className={mode === "voice" ? "active" : ""} onClick={() => setMode("voice")}>
              <span>🎙</span> 語音模擬面談
            </button>
          </div>

          <div className="flex gap-3 mt-8" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "var(--ink-3)", fontSize: 13 }}>
              {ready
                ? `準備：${scenario.name} · ${role.customName?.trim() || role.name}${role.customTitle?.trim() ? `（${role.customTitle.trim()}）` : ""} · ${mode === "text" ? "文字" : "語音"}`
                : "請完成上方三個選擇"}
            </span>
            <button
              className="btn btn-primary btn-lg"
              disabled={!ready}
              style={{ opacity: ready ? 1 : 0.4 }}
              onClick={startChat}
            >
              開始演練 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
