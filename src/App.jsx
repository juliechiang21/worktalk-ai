import { useState, useEffect } from "react";
import { SCENARIOS, AI_ROLES } from "./data.js";
import { LoginScreen, ProfileScreen, IndustryScreen, DISCScreen } from "./screens/Auth.jsx";
import { HomeScreen, ScenarioPickerScreen } from "./screens/Main.jsx";
import { ChatScreen } from "./screens/Chat.jsx";
import { ReportScreen, OptimizeScreen } from "./screens/Analysis.jsx";
import { CareerFairScreen, SchoolFairScreen, applyJobPreset } from "./screens/CareerFair.jsx";
import { RecommendationsScreen } from "./screens/Recommendations.jsx";

export default function App() {
  const [route, setRoute] = useState("login");
  const [profile, setProfile] = useState({
    name: "林心怡",
    nick: "Hsin",
    title: "行銷專員",
    exp: "1 – 2 年",
    goals: ["向上溝通", "拒絕請求"],
    industry: "tech",
    disc: { type: "S", scores: { D: 18, I: 22, S: 38, C: 22 } },
  });

  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [role, setRole] = useState(AI_ROLES[0]);
  const [mode, setMode] = useState("text");

  // Career fair state
  const [schoolId, setSchoolId] = useState("ntu");
  const [practiceContext, setPracticeContext] = useState(null); // { source, jobTitle, schoolName, ... }

  const startChat = () => { setPracticeContext(null); setRoute("chat"); };
  const endSession = () => setRoute("report");

  const startPracticeWithJob = (job, school) => {
    applyJobPreset(job, school, { setScenario, setRole, setMode, setRoute, setPracticeContext });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "h") setRoute("home");
      if (e.key === "r") setRoute("report");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const props = {
    user: profile, profile, setProfile,
    setRoute, scenario, setScenario, role, setRole, mode, setMode,
    startChat, endSession,
    schoolId, setSchoolId,
    practiceContext, setPracticeContext,
    startPracticeWithJob,
  };

  let screen;
  switch (route) {
    case "login":        screen = <LoginScreen onLogin={() => setRoute("profile")} />; break;
    case "profile":      screen = <ProfileScreen {...props} onNext={() => setRoute("industry")} />; break;
    case "industry":     screen = <IndustryScreen {...props} onNext={() => setRoute("disc")} />; break;
    case "disc":         screen = <DISCScreen {...props} onNext={() => setRoute("home")} />; break;
    case "home":         screen = <HomeScreen {...props} />; break;
    case "scenarios":    screen = <ScenarioPickerScreen {...props} />; break;
    case "chat":         screen = <ChatScreen {...props} />; break;
    case "report":       screen = <ReportScreen {...props} />; break;
    case "optimize":     screen = <OptimizeScreen {...props} />; break;
    case "careerfair":   screen = <CareerFairScreen {...props} />; break;
    case "school":       screen = <SchoolFairScreen {...props} startPracticeWithJob={startPracticeWithJob} />; break;
    case "recommend":    screen = <RecommendationsScreen {...props} />; break;
    default:             screen = <LoginScreen onLogin={() => setRoute("profile")} />;
  }

  return (
    <>
      <div className="grain" aria-hidden="true" />
      {screen}
    </>
  );
}
