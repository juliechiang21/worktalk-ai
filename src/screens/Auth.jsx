import { useState } from "react";
import { INDUSTRIES, DISC_QUESTIONS, DISC_TYPES } from "../data.js";
import { SimpleTopBar, Stepper, MultiPick } from "../components/Shared.jsx";

export function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("hsin.lin@worktalk.demo");
  const [password, setPassword] = useState("••••••••••");

  return (
    <div className="auth-shell" data-screen-label="01 Login">
      <div className="auth-art">
        <div className="auth-art-grid" />
        <div className="auth-brand">
          <div className="brand-mark">W</div>
          <div>
            <div className="brand-name">WorkTalk AI</div>
            <div className="brand-tag" style={{ color: "rgba(245,241,234,0.5)" }}>WORKPLACE COACH · v0.7 BETA</div>
          </div>
        </div>

        <div className="auth-art-hero">
          <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 20 }}>從<em style={{ fontStyle: "normal" }}> 校園</em> 到 <em style={{ fontStyle: "normal" }}>職場</em></div>
          <h1>把職場的<br /><em>「眉角」</em>,<br />練成本能。</h1>
          <p>透過貼近真實情境的對話演練，把提案、拒絕、協作、談薪這些難開口的時刻，提前在安全的環境練到滿意為止。</p>
        </div>

        <div className="auth-quotes">
          <div className="auth-quote">
            「我終於敢開口談加薪，而且真的成功了。」
            <span className="who">— Y. Chen · 軟體工程師 · 1.5 年資</span>
          </div>
          <div className="auth-quote">
            「以前覺得主管難搞，現在知道他只是要結論。」
            <span className="who">— P. Wang · 行銷專員 · 8 個月資</span>
          </div>
        </div>
      </div>

      <div className="auth-form">
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>登入</div>
          <h2>歡迎回來</h2>
        </div>
        <p className="sub">繼續你昨天未完成的「向主管提案」演練，或開始新的場景。</p>

        <div className="field">
          <label>EMAIL</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
        </div>
        <div className="field">
          <label>PASSWORD</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>

        <div className="auth-help">
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--sans)", textTransform: "none", letterSpacing: 0 }}>
            <input type="checkbox" defaultChecked /> 記住我
          </label>
          <a href="#" onClick={(e) => e.preventDefault()}>忘記密碼？</a>
        </div>

        <div className="auth-actions">
          <button className="btn btn-primary btn-lg" onClick={onLogin}>登入並開始演練 →</button>
          <div className="divider">OR</div>
          <div className="social-row">
            <button className="social-btn" onClick={onLogin}>
              <span style={{ fontWeight: 700, color: "#4285F4" }}>G</span> Google 登入
            </button>
            <button className="social-btn" onClick={onLogin}>
              <span style={{ fontWeight: 700 }}>LINE</span>
            </button>
          </div>
        </div>

        <p className="sub" style={{ marginTop: 8 }}>
          還沒有帳號？<a href="#" onClick={(e) => { e.preventDefault(); onLogin(); }} style={{ color: "var(--accent)" }}>30 秒建立</a>
        </p>
      </div>
    </div>
  );
}

export function ProfileScreen({ onNext, profile, setProfile }) {
  return (
    <div className="app" data-screen-label="02 Profile">
      <SimpleTopBar onBack={() => window.history.back()} />
      <div className="main">
        <div className="container-narrow">
          <Stepper current={0} />
          <div className="eyebrow">Step 01 / 03</div>
          <h1 className="h-page" style={{ marginTop: 8 }}>先讓我們認識你</h1>
          <p className="lede mt-2">這些資訊只用來客製化 AI 教練的對話風格與情境難度，不會用於其他用途。</p>

          <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field">
              <label>姓名</label>
              <input className="input" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="林心怡" />
            </div>
            <div className="field">
              <label>暱稱 (對話中 AI 會這樣叫你)</label>
              <input className="input" value={profile.nick} onChange={(e) => setProfile({ ...profile, nick: e.target.value })} placeholder="Hsin" />
            </div>
            <div className="field">
              <label>目前職位</label>
              <input className="input" value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} placeholder="行銷專員" />
            </div>
            <div className="field">
              <label>年資</label>
              <select className="input" value={profile.exp} onChange={(e) => setProfile({ ...profile, exp: e.target.value })}>
                <option>未滿 6 個月</option>
                <option>6 個月 – 1 年</option>
                <option>1 – 2 年</option>
                <option>2 – 5 年</option>
                <option>5 年以上</option>
              </select>
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label>本季想加強的能力（可複選）</label>
              <MultiPick
                options={["向上溝通", "拒絕請求", "跨部門協作", "談加薪", "客戶談判", "簡報表達"]}
                values={profile.goals}
                onChange={(g) => setProfile({ ...profile, goals: g })}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8" style={{ justifyContent: "flex-end" }}>
            <button className="btn btn-ghost" onClick={onNext}>跳過</button>
            <button className="btn btn-primary" onClick={onNext}>下一步：選擇產業 →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IndustryScreen({ onNext, profile, setProfile }) {
  return (
    <div className="app" data-screen-label="03 Industry">
      <SimpleTopBar />
      <div className="main">
        <div className="container-narrow">
          <Stepper current={1} />
          <div className="eyebrow">Step 02 / 03</div>
          <h1 className="h-page" style={{ marginTop: 8 }}>你的職場長什麼樣子？</h1>
          <p className="lede mt-2">不同產業的「溝通文法」差很多。選一個最接近你日常的，AI 教練會調整用語、節奏與情境設定。</p>

          <div className="industry-grid">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                className={"industry-card " + (profile.industry === ind.id ? "selected" : "")}
                onClick={() => setProfile({ ...profile, industry: ind.id })}
              >
                <div className="ic-icon">{ind.icon}</div>
                <div className="ic-label">{ind.label}</div>
                <div className="ic-name">{ind.name}</div>
                <div className="ic-desc">{ind.desc}</div>
              </button>
            ))}
          </div>

          <div className="flex gap-3 mt-8" style={{ justifyContent: "space-between" }}>
            <button className="btn subtle-link">← 上一步</button>
            <button
              className="btn btn-primary"
              disabled={!profile.industry}
              onClick={onNext}
              style={{ opacity: profile.industry ? 1 : 0.4 }}
            >
              下一步：DISC 人格測驗 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DISCScreen({ onNext, profile, setProfile }) {
  const Qs = DISC_QUESTIONS;
  const TYPES = DISC_TYPES;
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState({ D: 0, I: 0, S: 0, C: 0 });
  const [done, setDone] = useState(false);

  const pick = (opt) => {
    const s = { ...scores };
    for (const k in opt.score) s[k] += opt.score[k];
    setScores(s);
    if (idx + 1 < Qs.length) {
      setIdx(idx + 1);
    } else {
      const total = s.D + s.I + s.S + s.C;
      const pcs = {
        D: Math.round(s.D / total * 100),
        I: Math.round(s.I / total * 100),
        S: Math.round(s.S / total * 100),
        C: Math.round(s.C / total * 100),
      };
      const top = Object.entries(pcs).sort((a, b) => b[1] - a[1])[0][0];
      setProfile({ ...profile, disc: { type: top, scores: pcs } });
      setDone(true);
    }
  };

  if (done && profile.disc) {
    const top = profile.disc.type;
    const pcs = profile.disc.scores;
    return (
      <div className="app" data-screen-label="04 DISC Result">
        <SimpleTopBar />
        <div className="main">
          <div className="container-narrow">
            <Stepper current={2} done />
            <div className="eyebrow">RESULT · DISC 人格測驗</div>
            <h1 className="h-page" style={{ marginTop: 8 }}>
              你是<span style={{ color: TYPES[top].color }}> {TYPES[top].name}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 16, color: "var(--ink-3)", marginLeft: 12 }}>{TYPES[top].label}</span>
            </h1>
            <p className="lede mt-2">{TYPES[top].desc}</p>

            <div className="disc-result-grid">
              {["D", "I", "S", "C"].map((k) => (
                <div key={k} className={"disc-bar " + k}>
                  <div className="row">
                    <span className="nm">{TYPES[k].name} <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-4)" }}>({k})</span></span>
                    <span className="pc">{pcs[k]}%</span>
                  </div>
                  <div className="meter"><div className="v" style={{ width: pcs[k] + "%" }} /></div>
                  <div className="desc">{TYPES[k].desc.split("。")[0]}。</div>
                </div>
              ))}
            </div>

            <div className="card-elev" style={{ padding: 24, marginTop: 8 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>AI 教練給你的建議</div>
              <p style={{ margin: 0, lineHeight: 1.7, fontSize: 15 }}>
                根據你的 <b style={{ fontFamily: "var(--serif)", color: TYPES[top].color }}>{TYPES[top].name}</b> 特質，
                我會在演練時刻意安排<b>{top === "D" ? "需要耐心傾聽" : top === "I" ? "需要拿出數據" : top === "S" ? "需要堅定立場" : "需要展現溫度"}</b>
                的情境，幫助你補上盲區。
              </p>
            </div>

            <div className="flex gap-3 mt-6" style={{ justifyContent: "flex-end" }}>
              <button className="btn btn-primary btn-lg" onClick={onNext}>進入首頁 →</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = Qs[idx];
  const progress = ((idx) / Qs.length) * 100;

  return (
    <div className="app" data-screen-label="04 DISC Quiz">
      <SimpleTopBar />
      <div className="main">
        <div className="container-narrow">
          <Stepper current={2} />
          <div className="eyebrow">Step 03 / 03 · DISC 人格測驗</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-3)" }}>Question {idx + 1} / {Qs.length}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-3)" }}>約 2 分鐘</span>
          </div>
          <div className="disc-progress"><div className="fill" style={{ width: progress + "%" }} /></div>

          <div className="disc-q">{q.q}</div>
          <div className="disc-opts">
            {q.opts.map((o) => (
              <button key={o.l} className="disc-opt" onClick={() => pick(o)}>
                <div className="letter">{o.l}</div>
                <div style={{ flex: 1, lineHeight: 1.55 }}>{o.t}</div>
              </button>
            ))}
          </div>

          <div className="flex mt-6" style={{ justifyContent: "space-between" }}>
            <button className="btn subtle-link" onClick={() => idx > 0 && setIdx(idx - 1)}>{idx > 0 ? "← 上一題" : ""}</button>
            <button className="btn subtle-link" onClick={onNext}>跳過測驗 →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
