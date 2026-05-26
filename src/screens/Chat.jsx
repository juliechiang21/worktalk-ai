import { useEffect, useRef, useState } from "react";
import { SCRIPTS, JARGON_DB, OPTIMIZE_SAMPLES, INDUSTRY_KNOWHOW } from "../data.js";
import { SimpleTopBar } from "../components/Shared.jsx";

export function ChatScreen({ user, setRoute, scenario, role, mode, endSession, practiceContext }) {
  const key = `${scenario.id}-${role.id}`;
  const script = SCRIPTS[key] || SCRIPTS[`${scenario.id}-boss`];

  const [messages, setMessages] = useState([{ who: "ai", text: script.opener }]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [turnIdx, setTurnIdx] = useState(0);
  const [metrics, setMetrics] = useState({ aggression: 12, submissive: 30, confidence: 55, persuasion: 50 });
  const [completed, setCompleted] = useState([]);
  const [showOptimize, setShowOptimize] = useState(false);
  const [optimizeOriginal, setOptimizeOriginal] = useState("");

  // Derived display fields from customization
  const displayName = role.customName?.trim() || role.name;
  const displayTitle = role.customTitle?.trim();
  const displayPersonality = role.customPersonality?.trim();
  const displayTone = role.customTone?.trim() || role.style;
  const avatarChar = displayName[0];

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  if (mode === "voice") {
    return <VoiceMode user={user} scenario={scenario} role={role} setRoute={setRoute} script={script} endSession={endSession} />;
  }

  const matchTurn = (text) => {
    for (let i = 0; i < script.turns.length; i++) {
      const t = script.turns[i];
      if (t.keys.some(k => text.includes(k))) return { turn: t, idx: i };
    }
    return null;
  };

  const send = (text) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { who: "user", text }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      const found = matchTurn(text);
      let reply, newScore;
      if (found) {
        reply = found.turn.reply;
        newScore = found.turn.score;
        setCompleted((c) => Array.from(new Set([...c, found.idx])));
        setTurnIdx(Math.max(turnIdx, found.idx + 1));
      } else {
        reply = script.fallback.reply;
        newScore = script.fallback.score;
      }
      setMetrics(newScore);
      setMessages((m) => [...m, { who: "ai", text: reply }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  const useOptimize = () => {
    if (!draft.trim()) return;
    setOptimizeOriginal(draft);
    setShowOptimize(true);
  };

  const allDone = completed.length >= script.turns.length;

  return (
    <div className="app" data-screen-label="07 Chat">
      <SimpleTopBar user={user} current="scenarios" setRoute={setRoute} />
      <div className="chat-shell">
        <aside className="chat-side">
          <div>
            <div className="label">情境</div>
            <div className="scenario-summary">
              <h4>{scenario.name}</h4>
              <p>{scenario.desc}</p>
            </div>
          </div>

          <div>
            <div className="label">對手</div>
            <div className="role-summary">
              <div className="role-avatar" style={{ background: role.color }}>{avatarChar}</div>
              <div style={{ minWidth: 0 }}>
                <div className="nm">{displayName}</div>
                {displayTitle && (
                  <div className="d" style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--ink-4)", textTransform: "uppercase", marginTop: 2 }}>
                    {displayTitle}
                  </div>
                )}
                <div className="d" style={{ marginTop: 4 }}>{displayTone}</div>
              </div>
            </div>
            {displayPersonality && (
              <div style={{
                marginTop: 8,
                padding: "10px 12px",
                background: "var(--bg-elevated)",
                border: "1px solid var(--line)",
                borderRadius: 10,
                fontSize: 11,
                color: "var(--ink-3)",
                lineHeight: 1.55,
              }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
                  個性
                </span>
                {displayPersonality}
              </div>
            )}
          </div>

          <div>
            <div className="label">本場目標 ({completed.length} / {script.turns.length})</div>
            <div className="objectives">
              {scenario.objectives.map((o, i) => (
                <div key={i} className={"objective " + (i < completed.length ? "done" : "")}>
                  <span className="chk"></span>
                  <span>{o}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="coach-tip">
            <span className="ct-label">教練私房話</span>
            {scenario.coachTip}
          </div>
        </aside>

        <main className="chat-main">
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-header-tag">● 演練中</span>
              {practiceContext?.source === "careerfair" && (
                <span style={{
                  fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.15em",
                  padding: "3px 9px", borderRadius: 4,
                  background: "var(--accent-soft)", color: "var(--accent-deep)",
                  textTransform: "uppercase",
                }}>
                  📌 校博 · {practiceContext.jobTitle}
                </span>
              )}
              <span className="chat-header-title">{scenario.name} · {displayName}{displayTitle ? `（${displayTitle}）` : ""}</span>
              <span className="chat-header-progress">{completed.length} / {script.turns.length} 目標</span>
            </div>
            <button className="btn-end-session" onClick={endSession}>
              <span className="dot"></span>
              結束並查看報告
              <span className="arr">→</span>
            </button>
          </div>
          <div className="chat-scroll" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={"message-row " + m.who}>
                {m.who === "ai" ? (
                  <div className="msg-avatar" style={{ background: role.color, color: "white" }}>{avatarChar}</div>
                ) : (
                  <div className="msg-avatar user">{user.nick?.[0] || "你"}</div>
                )}
                <div>
                  <div className="who">{m.who === "ai" ? displayName : user.nick}</div>
                  <div className="msg-bubble">{m.text}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="message-row ai">
                <div className="msg-avatar" style={{ background: role.color, color: "white" }}>{avatarChar}</div>
                <div>
                  <div className="who">{displayName} 正在輸入</div>
                  <div className="msg-bubble"><div className="typing"><span></span><span></span><span></span></div></div>
                </div>
              </div>
            )}
            {allDone && (
              <div className="message-row ai" style={{ alignSelf: "center", maxWidth: "100%" }}>
                <div style={{
                  background: "var(--accent-soft)", color: "var(--accent-deep)",
                  padding: "14px 22px", borderRadius: 12, textAlign: "center",
                  display: "flex", alignItems: "center", gap: 14, fontSize: 14
                }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.15em" }}>✓ ALL OBJECTIVES CLEARED</span>
                  <button className="btn btn-accent btn-sm" onClick={endSession}>查看完整診斷報告 →</button>
                </div>
              </div>
            )}
          </div>

          <div className="composer">
            <div className="composer-suggest">
              {(script.suggestions || []).map((s, i) => (
                <button key={i} className="suggest-chip" onClick={() => setDraft(s.t)}>
                  <span className="lbl">{s.lbl}</span> {s.t.length > 28 ? s.t.slice(0, 28) + "…" : s.t}
                </button>
              ))}
            </div>
            <div className="composer-input">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`回覆 ${displayName}…（試試上方建議句，或自由打字）`}
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(draft);
                  }
                }}
              />
              <button className="optimize" onClick={useOptimize} disabled={!draft.trim()}>
                ✨ AI 改寫
              </button>
              <button className="send" onClick={() => send(draft)} disabled={!draft.trim()}>↑</button>
            </div>
            <div className="composer-meta">
              <span>ENTER 送出 · SHIFT + ENTER 換行</span>
              <span>{draft.length > 0 ? `${draft.length} 字` : "·"}</span>
            </div>
          </div>
        </main>

        <aside className="live-panel">
          <div>
            <h4>即時情緒溫度</h4>
            <div className="temp-bar-wrap">
              <div className="nm"><span className="pulse"></span> 當前語氣定位</div>
              <div className="vl">{tempLabel(metrics)}</div>
              <div className="temp-bar">
                <div className="mark" style={{ left: tempPct(metrics) + "%" }} />
              </div>
              <div className="labels">
                <span>過於委屈</span>
                <span>平衡</span>
                <span>過於強勢</span>
              </div>
            </div>
          </div>

          <div>
            <h4>四項即時指標</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <LiveMetric nm="攻擊性" val={metrics.aggression} target="low" />
              <LiveMetric nm="委屈感" val={metrics.submissive} target="low" />
              <LiveMetric nm="自信度" val={metrics.confidence} target="high" />
              <LiveMetric nm="說服力" val={metrics.persuasion} target="high" />
            </div>
          </div>

          <IndustryTipsCard industryId={user.industry} />

          <div>
            <h4>職場黑話翻譯機</h4>
            <div className="jargon-list">
              {JARGON_DB.slice(0, 3).map((j, i) => (
                <div key={i} className="jargon-item">
                  <div className="q">{j.q}</div>
                  <div className="a">{j.a}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {showOptimize && (
        <OptimizeModal
          original={optimizeOriginal}
          onClose={() => setShowOptimize(false)}
          onUse={(text) => {
            setDraft(text);
            setShowOptimize(false);
          }}
        />
      )}
    </div>
  );
}

function IndustryTipsCard({ industryId }) {
  const k = INDUSTRY_KNOWHOW[industryId];
  if (!k) return null;
  const tip = k.dos[0];
  const trap = k.donts[0];
  const jargon = k.jargon[0];
  return (
    <div>
      <h4>
        產業實戰提示
        <span style={{
          fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.15em",
          marginLeft: 8, padding: "2px 6px", borderRadius: 4,
          background: "var(--accent-soft)", color: "var(--accent-deep)",
          textTransform: "uppercase",
        }}>
          {k.name}
        </span>
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{
          padding: "10px 12px",
          border: "1px solid var(--line)",
          borderLeft: "3px solid var(--sage)",
          background: "var(--bg-elevated)",
          borderRadius: 8,
        }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.18em", color: "var(--sage)", marginBottom: 4 }}>
            ✓ DO
          </div>
          <div style={{ fontSize: 11, lineHeight: 1.55, color: "var(--ink-2)" }}>{tip}</div>
        </div>
        <div style={{
          padding: "10px 12px",
          border: "1px solid var(--line)",
          borderLeft: "3px solid var(--accent)",
          background: "var(--bg-elevated)",
          borderRadius: 8,
        }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.18em", color: "var(--accent)", marginBottom: 4 }}>
            ✗ AVOID
          </div>
          <div style={{ fontSize: 11, lineHeight: 1.55, color: "var(--ink-2)" }}>{trap}</div>
        </div>
        <div style={{
          padding: "10px 12px",
          border: "1px solid var(--line)",
          background: "var(--bg-elevated)",
          borderRadius: 8,
        }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.18em", color: "var(--ink-4)", marginBottom: 4, textTransform: "uppercase" }}>
            慣用詞 · {jargon.q}
          </div>
          <div style={{ fontSize: 11, lineHeight: 1.55, color: "var(--ink-3)" }}>{jargon.a}</div>
        </div>
      </div>
    </div>
  );
}

function LiveMetric({ nm, val, target }) {
  const good = target === "low" ? val < 30 : val > 60;
  const warn = target === "low" ? val > 60 : val < 35;
  const cls = good ? "good" : warn ? "warn" : "";
  return (
    <div className="live-metric">
      <div className="row">
        <span className="nm">{nm}</span>
        <span className={"pc " + cls}>{val}<span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-4)", marginLeft: 2 }}>/100</span></span>
      </div>
      <div className="meter">
        <div className={"v " + (cls || "gold")} style={{ width: val + "%" }} />
      </div>
    </div>
  );
}

function tempLabel(m) {
  const balance = m.confidence - m.submissive - m.aggression * 0.5;
  if (m.aggression > 50) return "稍偏強勢 · 注意語氣";
  if (m.submissive > 50) return "過度退讓 · 缺乏立場";
  if (balance > 20) return "平衡有力 · 表現良好";
  return "中性 · 可再加強說服力";
}
function tempPct(m) {
  const v = 50 + (m.aggression - m.submissive) * 0.5;
  return Math.max(4, Math.min(96, v));
}

function OptimizeModal({ original, onClose, onUse }) {
  const optimized = optimizeText(original);
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(22,21,19,0.55)",
      zIndex: 200, display: "grid", placeItems: "center", animation: "slideIn 0.2s",
    }} onClick={onClose}>
      <div style={{ background: "var(--bg)", borderRadius: 18, maxWidth: 720, width: "92vw", padding: 32, position: "relative", boxShadow: "var(--shadow-lg)" }}
           onClick={(e) => e.stopPropagation()}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>✨ AI 一鍵優化表達</div>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, margin: "0 0 18px" }}>把你的話，包裝得更專業</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div className="card">
            <div className="label" style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 8 }}>你原本想說</div>
            <div style={{ color: "var(--ink-3)", fontSize: 14, lineHeight: 1.65 }}>{original}</div>
          </div>
          <div className="card" style={{ background: "var(--ink)", color: "var(--bg)", borderColor: "var(--ink)" }}>
            <div className="label" style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>AI 建議</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 15, lineHeight: 1.7 }}>{optimized}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <button className="btn btn-ghost" onClick={onClose}>不用了</button>
          <button className="btn btn-primary" onClick={() => onUse(optimized)}>用這個版本 →</button>
        </div>
      </div>
    </div>
  );
}

function optimizeText(t) {
  for (const s of OPTIMIZE_SAMPLES) {
    if (t.includes(s.raw.slice(0, 4)) || t.includes(s.raw)) {
      return s.out.warm;
    }
  }
  let out = t
    .replace(/可能/g, "依目前資料")
    .replace(/不知道/g, "我會再確認")
    .replace(/不行/g, "目前的時程下不太能配合")
    .replace(/我覺得/g, "我評估")
    .replace(/不太確定/g, "想再對齊一下")
    .replace(/啦/g, "")
    .replace(/吧/g, "")
    .replace(/可不可以/g, "希望可以");
  if (out === t) {
    out = "我想跟你 share 一下我的想法：" + t + " 你看，這樣安排可以嗎？";
  }
  return out;
}

function VoiceMode({ user, scenario, role, setRoute, script, endSession }) {
  const [state, setState] = useState("listening");
  const [aiText, setAiText] = useState(script.opener);
  const [userTranscript, setUserTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [turnIdx, setTurnIdx] = useState(0);

  const simulateUserSpeak = (text) => {
    setRecording(true);
    setState("userTalking");
    setUserTranscript("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setUserTranscript(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setRecording(false);
          setState("thinking");
          setTimeout(() => {
            const matched = script.turns.find(t => t.keys.some(k => text.includes(k))) || script.fallback;
            setAiText(matched.reply);
            setState("speaking");
            setTimeout(() => {
              setState("listening");
              if (turnIdx + 1 < script.turns.length) setTurnIdx(turnIdx + 1);
            }, Math.max(2200, matched.reply.length * 120));
          }, 1100);
        }, 600);
      }
    }, 50);
  };

  const stateLabel = {
    listening: "● 等待你發言",
    userTalking: "● 你正在說話…",
    thinking: "● AI 正在思考…",
    speaking: "● AI 正在回應…",
  }[state];

  return (
    <div className="app" data-screen-label="07 Chat · Voice">
      <SimpleTopBar user={user} current="scenarios" setRoute={setRoute} />
      <div className="voice-shell">
        <div style={{ position: "absolute", top: 24, left: 32, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          🎙 VOICE MODE · {scenario.name} · {role.name}
        </div>
        <div style={{ position: "absolute", top: 24, right: 32 }}>
          <button className="btn btn-ghost btn-sm" onClick={endSession}>結束並查看報告 →</button>
        </div>

        <div className="voice-stage">
          <div className="role-avatar voice-orb" style={{ background: role.color }}>{role.name[0]}</div>
          <div className="voice-state">{stateLabel}</div>
          <div className="voice-text">
            {state === "userTalking" ? (
              <span style={{ color: "var(--ink-3)" }}>「{userTranscript}<span style={{ animation: "pulse 1s infinite" }}>｜</span>」</span>
            ) : (
              <span>「{aiText}」</span>
            )}
          </div>

          <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-4)", letterSpacing: "0.15em" }}>
            進度 {Math.min(turnIdx + 1, script.turns.length)} / {script.turns.length}
          </div>

          <div className="voice-controls">
            <button className="voice-btn">⏸</button>
            <button
              className={"voice-btn mic " + (recording ? "recording" : "")}
              onClick={() => state === "listening" && simulateUserSpeak(script.suggestions[turnIdx % script.suggestions.length].t)}
              disabled={state !== "listening"}
            >
              🎙
            </button>
            <button className="voice-btn" onClick={() => setState("listening")}>↻</button>
          </div>

          <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>
            按麥克風試試看（Demo 模式會自動帶入示範回答）
          </div>

          <div className="voice-suggest">
            {script.suggestions.map((s, i) => (
              <button
                key={i}
                className="suggest-chip"
                onClick={() => state === "listening" && simulateUserSpeak(s.t)}
                disabled={state !== "listening"}
              >
                <span className="lbl">{s.lbl}</span> {s.t.length > 22 ? s.t.slice(0, 22) + "…" : s.t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
