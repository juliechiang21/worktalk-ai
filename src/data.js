// ============================================================
//  WorkTalk AI · 預設資料層
//  所有對話、回應、分析皆預先寫好，無需呼叫 LLM API
// ============================================================

export const INDUSTRIES = [
  { id: "tech",     icon: "科", name: "科技業",   label: "Technology", desc: "工程、產品、設計，溝通直接、節奏快。" },
  { id: "finance",  icon: "金", name: "金融業",   label: "Finance",    desc: "風險敏感、流程嚴謹，重視專業用語。" },
  { id: "traditional", icon: "傳", name: "傳產", label: "Traditional",desc: "層級分明、講究人情與輩分倫理。" },
  { id: "edu",      icon: "教", name: "教育業",   label: "Education",  desc: "重視同理與責任感，溝通對象多元。" },
  { id: "med",      icon: "醫", name: "醫療業",   label: "Healthcare", desc: "高壓、時間壓力大，講求清晰精確。" },
];

export const DISC_QUESTIONS = [
  {
    q: "當主管臨時加派一項任務，你的第一反應通常是？",
    opts: [
      { l: "A", t: "立刻接下並排出優先順序，先動再說。",     score: { D: 3, I: 0, S: 1, C: 0 } },
      { l: "B", t: "用輕鬆的方式回應，順便了解任務背景。",   score: { D: 0, I: 3, S: 1, C: 0 } },
      { l: "C", t: "點頭答應，盡量配合不造成困擾。",         score: { D: 0, I: 0, S: 3, C: 1 } },
      { l: "D", t: "先釐清需求、時程與交付物再決定。",       score: { D: 0, I: 0, S: 0, C: 3 } },
    ],
  },
  {
    q: "跨部門協作意見分歧時，你比較像哪一種？",
    opts: [
      { l: "A", t: "直接點出問題，推動大家做決定。",         score: { D: 3, I: 0, S: 0, C: 1 } },
      { l: "B", t: "用故事或比喻緩和氣氛，再帶回主題。",     score: { D: 0, I: 3, S: 1, C: 0 } },
      { l: "C", t: "聆聽各方說法，避免衝突、找折衷。",       score: { D: 0, I: 1, S: 3, C: 0 } },
      { l: "D", t: "整理事實與數據，用邏輯說服對方。",       score: { D: 0, I: 0, S: 0, C: 3 } },
    ],
  },
  {
    q: "你最擔心在職場犯下哪一種錯？",
    opts: [
      { l: "A", t: "進度落後、被別人超越。",                 score: { D: 3, I: 1, S: 0, C: 0 } },
      { l: "B", t: "讓人覺得你冷淡、不合群。",               score: { D: 0, I: 3, S: 1, C: 0 } },
      { l: "C", t: "造成同事或主管困擾。",                   score: { D: 0, I: 0, S: 3, C: 0 } },
      { l: "D", t: "資料出錯、邏輯不嚴謹。",                 score: { D: 0, I: 0, S: 0, C: 3 } },
    ],
  },
  {
    q: "下班前主管請你幫忙看一份報告，你會？",
    opts: [
      { l: "A", t: "快速掃過，給出最關鍵的兩三條建議。",     score: { D: 3, I: 0, S: 0, C: 1 } },
      { l: "B", t: "順便聊兩句，肯定他的努力再給意見。",     score: { D: 0, I: 3, S: 1, C: 0 } },
      { l: "C", t: "再加班一下也要幫他看到滿意為止。",       score: { D: 0, I: 0, S: 3, C: 1 } },
      { l: "D", t: "認真逐段檢查，用註解清楚寫出修改原因。", score: { D: 0, I: 0, S: 0, C: 3 } },
    ],
  },
  {
    q: "你理想中的工作氛圍是？",
    opts: [
      { l: "A", t: "目標明確、結果導向，能放手做事。",       score: { D: 3, I: 1, S: 0, C: 0 } },
      { l: "B", t: "氣氛輕鬆、夥伴有趣，能一起激盪想法。",   score: { D: 0, I: 3, S: 1, C: 0 } },
      { l: "C", t: "穩定有節奏、彼此尊重、不要太多突發。",   score: { D: 0, I: 0, S: 3, C: 1 } },
      { l: "D", t: "規則清楚、品質高、容錯空間少。",         score: { D: 0, I: 0, S: 0, C: 3 } },
    ],
  },
];

export const DISC_TYPES = {
  D: { name: "支配型", label: "Dominance",  color: "#C8553D",
       desc: "目標導向、決策快、推進力強。需注意：語氣可能讓人覺得壓迫。" },
  I: { name: "影響型", label: "Influence",  color: "#B89455",
       desc: "善於表達、樂於互動、能帶動氣氛。需注意：細節容易被忽略。" },
  S: { name: "穩健型", label: "Steadiness", color: "#5C7A5A",
       desc: "重視關係、配合度高、態度穩定。需注意：容易過度討好、不敢拒絕。" },
  C: { name: "謹慎型", label: "Compliance", color: "#6F4063",
       desc: "重邏輯、講事實、要求精確。需注意：表達可能太防禦、缺人情味。" },
};

// ============================================================
//  情境定義
// ============================================================
export const SCENARIOS = [
  {
    id: "propose",
    name: "向主管提案",
    short: "Propose to Manager",
    level: "mid",
    levelLabel: "中等難度",
    duration: "8 分鐘",
    rounds: "5 回合",
    desc: "你想在週會上提一個新做法，主管以忙碌、保守著稱，你必須在三句話內讓他願意聽下去。",
    objectives: [
      "在開場 30 秒內點出對主管的價值",
      "用數據或案例支撐主張",
      "提出明確的下一步與時程",
      "為可能的反對意見預留 fallback",
    ],
    coachTip: "向主管提案最忌『流水帳開場』。先講『為什麼是現在、為什麼是你』，再講『要什麼資源』。",
  },
  {
    id: "refuse",
    name: "拒絕加班",
    short: "Refuse Overtime",
    level: "hi",
    levelLabel: "高壓情境",
    duration: "6 分鐘",
    rounds: "4 回合",
    desc: "週五晚上 7 點，主管在群組上 @你，說有個案子需要週末趕出來。你已有家庭聚餐，必須優雅拒絕。",
    objectives: [
      "表達理解、不直接拒絕",
      "說明無法配合的具體原因",
      "提出替代方案（時間/人力/範圍）",
      "保持關係不破裂",
    ],
    coachTip: "拒絕的核心句型：『理解 + 不能的具體理由 + 我可以做的替代方案』。三步缺一不可。",
  },
  {
    id: "cross",
    name: "跨部門協作",
    short: "Cross-team Sync",
    level: "mid",
    levelLabel: "中等難度",
    duration: "7 分鐘",
    rounds: "5 回合",
    desc: "你需要 RD 部門優先處理你這支 API，但他們手上有更高優先序的工作。你必須讓對方覺得幫你也是幫他們自己。",
    objectives: [
      "站在對方 KPI 立場切入",
      "量化你的需求對對方目標的助益",
      "提供清楚規格、降低對方理解成本",
      "建立後續追蹤機制",
    ],
    coachTip: "跨部門最有效的句子不是『拜託你』，而是『這件事對你那邊的目標也有幫助』。",
  },
  {
    id: "salary",
    name: "談加薪",
    short: "Salary Negotiation",
    level: "hi",
    levelLabel: "高壓情境",
    duration: "10 分鐘",
    rounds: "6 回合",
    desc: "你進公司一年半，績效 A，但薪水從未調整。考核面談時主管問你『有什麼想聊的？』──機會來了。",
    objectives: [
      "用具體成就與數據開場",
      "提出明確期望數字或區間",
      "避免情緒化或威脅性語句",
      "對方拒絕時，談 timeline 而非放棄",
    ],
    coachTip: "談加薪不是『要求』，而是『重新定價』。把對話從『我需要』轉向『我創造了什麼』。",
  },
];

export const AI_ROLES = [
  { id: "boss",     name: "主管", desc: "資深、忙碌、講重點", color: "#1A1A1A", style: "簡短犀利、要求結論" },
  { id: "peer",     name: "同事", desc: "平輩、半熟、有自己 KPI", color: "#5C7A5A", style: "客氣但會推託" },
  { id: "client",   name: "客戶", desc: "外部、付錢、敏感", color: "#B89455", style: "強勢、會挑戰預算" },
];

// ============================================================
//  對話腳本（情境 × 角色 為單位）
// ============================================================
export const SCRIPTS = {
  "propose-boss": {
    opener: "嗯，這週很滿，你說。聽說你想提一個新做法？三分鐘版本，直接講重點。",
    suggestions: [
      { lbl: "弱開場", t: "嗨 老闆，我有個想法想跟你討論一下，不知道你會不會喜歡..." },
      { lbl: "強開場", t: "我想提一個能在下季把新人到職培訓的成本降低 30% 的做法，需要你 10 分鐘決定。" },
      { lbl: "結論句", t: "下一步我需要的是：一週內 PoC 預算 1.5 萬，以及 HR 和 IT 各派一人 review。" },
    ],
    turns: [
      { keys: ["新做法", "想法", "討論", "不知道"], reply: "你停一下。我每天聽十個『有個想法想討論』，沒人記得住。直接告訴我：解決什麼問題？對誰有用？多少錢？", score: { aggression: 10, submissive: 65, confidence: 28, persuasion: 30 } },
      { keys: ["降低", "成本", "30%", "新人", "培訓", "PoC"], reply: "嗯，數字有了。那你打算怎麼做？需要我給什麼？", score: { aggression: 25, submissive: 18, confidence: 78, persuasion: 80 } },
      { keys: ["預算", "資源", "下一步", "review", "PoC", "時程"], reply: "好。一週給我看 PoC，HR 那邊我來打招呼。記得 Loop 在小欣，她碰過類似的。", score: { aggression: 22, submissive: 12, confidence: 82, persuasion: 86 } },
    ],
    fallback: { reply: "嗯。可以再講清楚一點嗎？這對我或團隊有什麼直接好處？", score: { aggression: 18, submissive: 50, confidence: 40, persuasion: 38 } },
  },
  "propose-peer": {
    opener: "欸，你說那個新做法喔，我聽聽看～最近大家都在忙，你想幹嘛？",
    suggestions: [
      { lbl: "邀請式", t: "我想做一個能幫到我們兩邊的東西，想先聽你那邊的痛點，再看怎麼結合。" },
      { lbl: "互惠式", t: "如果我們合作，你那邊的客訴處理時間估計可以少 20%，要不要一起試試？" },
      { lbl: "結束句", t: "我寫個一頁的 proposal，週四丟你，你週五 30 分鐘 sync？" },
    ],
    turns: [
      { keys: ["幫到", "兩邊", "結合", "痛點"], reply: "聽起來不錯耶。我們最近最痛的是客訴回應時間太長。你那邊能幫上什麼？", score: { aggression: 8, submissive: 35, confidence: 65, persuasion: 70 } },
      { keys: ["客訴", "20%", "估計", "合作"], reply: "20% 是怎麼算的？有沒有 baseline 可以對？我老闆肯定會問。", score: { aggression: 5, submissive: 20, confidence: 78, persuasion: 82 } },
      { keys: ["proposal", "週四", "sync", "30 分鐘"], reply: "好啊我先卡時間。記得把你們的數據口徑寫清楚，這樣我才好對齊。", score: { aggression: 6, submissive: 15, confidence: 82, persuasion: 85 } },
    ],
    fallback: { reply: "可是這對我們這邊到底有什麼好處？我手上已經一堆事了...", score: { aggression: 12, submissive: 45, confidence: 42, persuasion: 40 } },
  },
  "propose-client": {
    opener: "我們時間有限。你說想提一個改善方案？我先聽，但別給我複雜流程圖。",
    suggestions: [
      { lbl: "客戶利益", t: "這個方案會在三個月內為您節省約 60 萬元採購成本，我用兩張投影片說明。" },
      { lbl: "風險回應", t: "您擔心的轉換成本，我們會吸收前三個月，並提供 SLA 保證。" },
      { lbl: "Close", t: "我這週寄出正式 proposal，希望下週能與您財務一起確認預算流程，可以嗎？" },
    ],
    turns: [
      { keys: ["節省", "60 萬", "三個月", "成本"], reply: "60 萬聽起來很美。怎麼算的？而且我之前換過一次系統，痛苦得要命。轉換成本你怎麼處理？", score: { aggression: 8, submissive: 25, confidence: 72, persuasion: 78 } },
      { keys: ["吸收", "SLA", "三個月", "轉換成本"], reply: "嗯，這誠意不錯。那合約怎麼簽？我們法務很龜毛。", score: { aggression: 6, submissive: 18, confidence: 80, persuasion: 84 } },
      { keys: ["proposal", "下週", "財務", "預算"], reply: "好，我請助理對一下行事曆。但記得，proposal 別超過 5 頁，我沒時間看小說。", score: { aggression: 5, submissive: 12, confidence: 84, persuasion: 86 } },
    ],
    fallback: { reply: "我聽不太懂你想幹嘛。對我有什麼直接幫助？", score: { aggression: 14, submissive: 48, confidence: 40, persuasion: 35 } },
  },
  "refuse-boss": {
    opener: "欸，這個案子很急，週末辛苦一下，禮拜一交。你應該可以吧？",
    suggestions: [
      { lbl: "硬拒絕", t: "不行，我週末有事，沒辦法做。" },
      { lbl: "完美拒絕", t: "我了解這很急，週末我有家人重要聚會無法配合。但我可以週五晚上加班三小時、週一早上 7 點開工，您看這樣的時程可以調整嗎？" },
      { lbl: "替代方案", t: "如果可以縮小範圍到只交付核心三頁，我週六上午能擠出兩小時處理。" },
    ],
    turns: [
      { keys: ["不行", "沒辦法", "我有事"], reply: "...你不覺得這樣有點不負責任嗎？這個案子是我們團隊整季 KPI 耶。", score: { aggression: 75, submissive: 8, confidence: 50, persuasion: 25 } },
      { keys: ["了解", "家人", "聚會", "週五", "週一", "7 點"], reply: "嗯...好，那這樣安排可以接受。你週五晚上把進度截圖丟給我，我安心一點。", score: { aggression: 12, submissive: 22, confidence: 85, persuasion: 88 } },
      { keys: ["縮小範圍", "核心三頁", "週六", "兩小時"], reply: "可以耶，這樣其實就夠用了。那就先這樣，剩下的我們週一再 cover。", score: { aggression: 10, submissive: 28, confidence: 80, persuasion: 84 } },
    ],
    fallback: { reply: "你倒是說清楚啊，是不能還是不想？", score: { aggression: 50, submissive: 40, confidence: 38, persuasion: 30 } },
  },
  "refuse-peer": {
    opener: "嘿，週末要不要一起把那個專案做完？我也想早點下班啊，但時間真的不夠。",
    suggestions: [
      { lbl: "推諉", t: "你怎麼不早講？我週末已經有約了沒辦法。" },
      { lbl: "同理 + 替代", t: "我懂你壓力大，但我週末真的不行。我可以週一早上提早兩小時來補你一段，這樣 OK 嗎？" },
      { lbl: "切分工作", t: "與其週末整個做，不如我們現在 30 分鐘對齊，把卡關的兩個地方解掉，可能週五就能搞定。" },
    ],
    turns: [
      { keys: ["不早講", "已經有約", "沒辦法"], reply: "哇，你這口氣有點傷耶...我也是沒辦法才開口問。", score: { aggression: 55, submissive: 15, confidence: 50, persuasion: 28 } },
      { keys: ["週一早上", "補你一段", "懂你壓力"], reply: "可以耶，那就先這樣。週一見，我先把昨天卡住的部分整理給你。", score: { aggression: 6, submissive: 25, confidence: 80, persuasion: 85 } },
      { keys: ["30 分鐘對齊", "卡關", "週五"], reply: "欸這想法不錯！這樣比加班划算。我馬上找會議室。", score: { aggression: 5, submissive: 18, confidence: 84, persuasion: 88 } },
    ],
    fallback: { reply: "所以你到底要不要幫？我們是隊友耶。", score: { aggression: 30, submissive: 45, confidence: 42, persuasion: 35 } },
  },
  "refuse-client": {
    opener: "我們希望這支功能下週五前上線，做不到不行喔，這是合約寫的。",
    suggestions: [
      { lbl: "硬擋", t: "下週五真的做不到，工程那邊就是來不及。" },
      { lbl: "理解 + 重設預期", t: "我完全理解這對您的時程很重要。基於目前的測試進度，我們最有把握的上線日是兩週後的週四。為了不耽誤您後續節奏，我建議我們先把 A、B 兩個關鍵功能在下週五上，C 則延後一週。" },
      { lbl: "授權對話", t: "為了給您確切的答覆，我想今天下午先與我們技術 Lead 確認可行性，最晚明早給您兩個版本的時程選項，您看如何？" },
    ],
    turns: [
      { keys: ["做不到", "來不及", "工程"], reply: "做不到？那我們合約怎麼辦？我是不是該找你們主管談？", score: { aggression: 82, submissive: 10, confidence: 35, persuasion: 18 } },
      { keys: ["完全理解", "兩週後", "A、B", "關鍵功能"], reply: "嗯，這樣切分我可以考慮。但 C 為什麼一定要延？這對我們行銷很重要。", score: { aggression: 20, submissive: 15, confidence: 82, persuasion: 86 } },
      { keys: ["技術 Lead", "明早", "兩個版本", "時程選項"], reply: "好，這誠意我收到了。明早我等你訊息，請務必準時。", score: { aggression: 12, submissive: 14, confidence: 85, persuasion: 88 } },
    ],
    fallback: { reply: "你這樣講等於什麼都沒講。我要的是 Yes or No。", score: { aggression: 60, submissive: 35, confidence: 38, persuasion: 25 } },
  },
  "cross-boss": {
    opener: "你要 RD 優先做你的東西？理由給我，他們上面那串 backlog 你也知道吧。",
    suggestions: [
      { lbl: "弱請求", t: "拜託啦老闆，這個對我很重要，你幫我跟 RD 講一下。" },
      { lbl: "雙贏切入", t: "RD Roadmap 上 Q3 的客戶留存目標，我這支 API 直接能貢獻 12% 的提升，所以對他們的 OKR 是加分的。" },
      { lbl: "降低成本", t: "我這邊已經把規格、測試案例、Mock 都做完了，RD 預估只需 3 個工程日。我建議併入他們下週的 sprint。" },
    ],
    turns: [
      { keys: ["拜託", "你幫我講"], reply: "你這樣講我沒辦法幫你。給我一個 RD 老闆會點頭的理由，不要『拜託』。", score: { aggression: 40, submissive: 70, confidence: 25, persuasion: 20 } },
      { keys: ["OKR", "12%", "客戶留存", "Roadmap"], reply: "這切角不錯。你直接寫成一頁紙，標題就用『協助 RD 達成 Q3 留存目標』，我幫你轉。", score: { aggression: 15, submissive: 12, confidence: 84, persuasion: 86 } },
      { keys: ["規格", "Mock", "3 個工程日", "sprint"], reply: "你準備得很完整。這樣 RD 那邊抗拒會少很多，我中午前幫你發訊息給他們 Lead。", score: { aggression: 12, submissive: 10, confidence: 88, persuasion: 90 } },
    ],
    fallback: { reply: "再講清楚一點，這對 RD 有什麼好處？", score: { aggression: 25, submissive: 50, confidence: 40, persuasion: 35 } },
  },
  "cross-peer": {
    opener: "欸我看到你開的單，老實說我這週 sprint 已經塞爆了。為什麼要這時候做？",
    suggestions: [
      { lbl: "強硬要求", t: "我這邊很急，下週要 demo，你能不能擠一下？" },
      { lbl: "對齊 KPI", t: "其實這個改動如果這 sprint 進，你那邊 P0 bug 量會少約 40%，因為現在 75% 的客訴都從這個流程來。" },
      { lbl: "降低成本 + 退路", t: "我準備了完整 spec + 自動測試，你只要 review 跟接 API 就好，預估半天。如果這 sprint 真擠不下，我可以接受併入下 sprint，但希望先排在第一順位。" },
    ],
    turns: [
      { keys: ["很急", "擠一下", "demo"], reply: "每個人都很急啊。你能不能給我一個非做不可的理由？", score: { aggression: 38, submissive: 25, confidence: 45, persuasion: 30 } },
      { keys: ["P0 bug", "40%", "客訴", "75%"], reply: "...等等，你這數字 source 從哪來？如果是真的，我去跟我老闆爭，這值得。", score: { aggression: 10, submissive: 12, confidence: 86, persuasion: 88 } },
      { keys: ["spec", "自動測試", "半天", "下 sprint", "第一順位"], reply: "OK 這 deal 我可以接。你週四把 spec 鎖好不要再改，我幫你排第一順位。", score: { aggression: 8, submissive: 10, confidence: 88, persuasion: 90 } },
    ],
    fallback: { reply: "你要這樣講我也只能說『再看看』，沒承諾喔。", score: { aggression: 25, submissive: 38, confidence: 45, persuasion: 38 } },
  },
  "cross-client": {
    opener: "你想要我們先給你資料？我們也很忙，憑什麼？",
    suggestions: [
      { lbl: "客戶利益", t: "我們手上有您季度報告的版本要在這週四出，您給的資料其實是讓您的數字呈現得更完整。" },
      { lbl: "降低成本", t: "我已經做好一份模板，您只需要填三欄、5 分鐘就能完成，不用整理。" },
      { lbl: "Soft close", t: "如果今天下午前能收到，週四的版本能放您 Logo 在封面。可以嗎？" },
    ],
    turns: [
      { keys: ["也很忙", "憑什麼"], reply: "對啦，我們也是要做事的，你以為只有你忙嗎？", score: { aggression: 55, submissive: 30, confidence: 40, persuasion: 25 } },
      { keys: ["季度報告", "數字呈現", "您的"], reply: "喔...這樣的話我們確實在意。你要哪些欄位？", score: { aggression: 12, submissive: 15, confidence: 82, persuasion: 85 } },
      { keys: ["模板", "5 分鐘", "三欄", "Logo"], reply: "OK 這誠意我給。我下午兩點前回給你。", score: { aggression: 8, submissive: 12, confidence: 85, persuasion: 88 } },
    ],
    fallback: { reply: "我聽不出來這對我有什麼幫助。", score: { aggression: 22, submissive: 45, confidence: 42, persuasion: 38 } },
  },
  "salary-boss": {
    opener: "好，你進來一年半了，績效不錯。你今天想聊什麼？",
    suggestions: [
      { lbl: "情緒開場", t: "其實我有點委屈，看到新來的薪水比我高，我也不知道該怎麼辦..." },
      { lbl: "成就開場", t: "過去 18 個月我獨立負責 3 個專案，其中 B 案為公司帶來年化 240 萬營收。我想藉這次考核討論我的 package。" },
      { lbl: "區間要價", t: "考量市場行情與我目前的職責，我希望調整到 78–82K 之間，您覺得這個區間如何？" },
      { lbl: "Timeline 接話", t: "如果這個月不方便，可以請您給我一個明確的時程嗎？例如下季 review 重啟，我想知道往哪邊努力。" },
    ],
    turns: [
      { keys: ["委屈", "新來的", "比我高", "不知道怎麼辦"], reply: "...嗯，我聽到你的感受。但我們公司不會用情緒決定薪水。你能不能換一個角度說？", score: { aggression: 28, submissive: 75, confidence: 22, persuasion: 18 } },
      { keys: ["過去 18 個月", "3 個專案", "240 萬", "package"], reply: "這數字我有印象。那你心裡的期望是什麼？", score: { aggression: 18, submissive: 15, confidence: 82, persuasion: 86 } },
      { keys: ["78", "82K", "區間", "市場行情", "職責"], reply: "區間 OK，我會去跟 HR 對。但我先說：80K 以上需要再一輪簽核，可能要拖到下個月。", score: { aggression: 20, submissive: 12, confidence: 86, persuasion: 88 } },
      { keys: ["明確的時程", "下季 review", "努力", "往哪邊"], reply: "問得好，這代表你想長期做。我列三件事給你，做到下季我替你爭資深 title。", score: { aggression: 15, submissive: 10, confidence: 90, persuasion: 92 } },
    ],
    fallback: { reply: "嗯，你想聊什麼，可以更具體嗎？", score: { aggression: 20, submissive: 55, confidence: 38, persuasion: 32 } },
  },
};

export const FALLBACK_SUGGESTIONS = [
  { lbl: "結論先行", t: "我先講結論：我希望我們今天能對齊一個明確的下一步。" },
  { lbl: "確認對方", t: "在我繼續之前，想先確認您現在比較在意的是時程、品質、還是預算？" },
];

export const JARGON_DB = [
  { q: "「你再想想看」",     a: "通常表示『目前不行，但留個面子』。需要再提供具體佐證或調整方向。" },
  { q: "「我們先這樣」",     a: "對話結束的訊號，但可能未真正決定。建議寄 Recap Mail 確認共識。" },
  { q: "「你能配合一下嗎？」", a: "這是要求，不是詢問。若無法配合，請用『同理＋具體理由＋替代方案』回應。" },
  { q: "「我有點 concern」", a: "= 我反對，但用比較柔軟的方式說。要把對方的 concern 變成可解決的條件。" },
  { q: "「再 Loop 一下他」", a: "把某人加入訊息圈，常代表責任分散或要拉位階更高的人介入。" },
];

export const REPORT = {
  scenario: "向主管提案 · 主管角色",
  duration: "06:42",
  rounds: 5,
  score: 82,
  grade: "A-",
  metrics: [
    { id: "aggression", nm: "攻擊性", val: 22, kind: "good", delta: "比上次 -8",  desc: "語氣穩定不衝撞，控制得宜。" },
    { id: "submissive", nm: "委屈感", val: 18, kind: "good", delta: "比上次 -22", desc: "減少『不好意思』『可不可以』等弱化詞。" },
    { id: "confidence", nm: "自信度", val: 78, kind: "good", delta: "比上次 +14", desc: "句尾肯定，語速平穩，數據佐證充足。" },
    { id: "persuasion", nm: "說服力", val: 80, kind: "good", delta: "比上次 +18", desc: "結論先行、有具體價值與下一步。" },
  ],
  transcript: [
    {
      ts: "00:42", user: "我想提一個能在下季把新人到職培訓的成本降低 30% 的做法，需要你 10 分鐘決定。",
      tags: [{ kind: "good", l: "結論先行" }, { kind: "good", l: "明確要求" }],
      hl: [{ t: "降低 30%", k: "sage" }, { t: "10 分鐘決定", k: "sage" }],
    },
    {
      ts: "02:18", user: "我覺得這個做法可能不錯啦，不過我也不太確定 HR 會不會接受。",
      tags: [{ kind: "warn", l: "弱化用語" }, { kind: "warn", l: "自我懷疑" }],
      hl: [{ t: "可能", k: "default" }, { t: "不太確定", k: "default" }],
    },
    {
      ts: "04:05", user: "下一步我需要的是：一週內 PoC 預算 1.5 萬，以及 HR 和 IT 各派一人 review。",
      tags: [{ kind: "good", l: "Ask 清楚" }, { kind: "good", l: "可執行" }],
      hl: [{ t: "一週內", k: "sage" }, { t: "1.5 萬", k: "sage" }],
    },
    {
      ts: "05:30", user: "如果你願意 buy in，我下週一就可以 kickoff。如果還有 concern，我這邊也準備了兩個 fallback 方案。",
      tags: [{ kind: "good", l: "預留退路" }, { kind: "gold", l: "黑話運用" }],
      hl: [{ t: "buy in", k: "gold" }, { t: "fallback", k: "gold" }],
    },
  ],
  rewrites: [
    {
      original: "我覺得這個做法可能不錯啦，不過我也不太確定 HR 會不會接受。",
      improved: "這個做法在另外兩家同產業公司已驗證。HR 端我預先談過，他們的疑慮我整理在第 4 頁。",
      reason: "把『我猜』換成『已驗證 + 已預處理』。把不確定，變成你已掌握的事。",
    },
  ],
  recommendations: [
    { n: "01", h: "減少弱化詞", p: "把『可能』『也許』『不知道』替換為具體的條件與佐證。例如「在 X 條件下」「以 Y 為例」。" },
    { n: "02", h: "練習要求", p: "你提案完整，但 75% 的句子沒有給出『下一步該誰、做什麼、何時前』。練習結尾必含 Action Item。" },
    { n: "03", h: "建立節奏感", p: "你說話速度均勻，但情緒太平穩。在關鍵數字前刻意停頓 0.5 秒，會讓主管更聚焦。" },
  ],
};

export const OPTIMIZE_TONES = [
  { id: "pro",      name: "高專業感" },
  { id: "warm",     name: "高情商" },
  { id: "exec",     name: "向上管理" },
  { id: "client",   name: "對客戶" },
];

// ============================================================
//  產業 Know-How · Industry-specific workplace wisdom
// ============================================================
export const INDUSTRY_KNOWHOW = {
  tech: {
    id: "tech",
    name: "科技業",
    label: "Technology",
    vibe: "扁平、直接、async-friendly。重數據、講結論、節奏快。會議要短、文件要精。",
    jargon: [
      { q: "ETA", a: "Estimated Time of Arrival。對方問 ETA 是要『一個你願意被釘的日期』，含糊回答會被連環追問。" },
      { q: "Loop in / cc", a: "把人加進對話圈。被 Loop in 通常代表『這跟你有關，但不需要你決定』。" },
      { q: "Ship it", a: "「上線吧」。Lead 說出這句話通常等於最終批准。" },
      { q: "Tech debt", a: "技術債。被當理由時要追問『欠在哪、什麼時候還、不還會怎樣』。" },
      { q: "P0 / P1 / P2", a: "Priority。P0 = 立刻停下所有事去處理；P1 = 本 sprint；P2 = 排進 backlog。" },
    ],
    dos: [
      "提案先放結論與 metrics，背景放附錄",
      "用 Jira/Linear ticket 而非口頭交辦（留 trace）",
      "1-on-1 帶 agenda，會議結束 5 分鐘內發 recap",
    ],
    donts: [
      "用 LINE / Slack 直接問需求，沒有 spec 沒 ticket 就動工",
      "提案時講『大概』『差不多』『應該可以』",
      "在 PR review 用『我覺得這樣比較好』而沒有理由",
    ],
    phrases: [
      {
        topic: "向工程師要資源",
        weak: "可不可以幫我做一下這個？",
        strong: "我開了個 P1 ticket，影響範圍是 checkout flow。預估 3 個工程日，能不能 cut-in 你下個 sprint？我這邊 spec、測試案例都齊了。",
      },
      {
        topic: "回主管 ETA 問題",
        weak: "我盡量在這週做完。",
        strong: "目前進度 60%，依現在的 risk，最快週四 EOD、最晚週五中午 ship。如果 unblock A，可以提前到週三。",
      },
    ],
  },
  finance: {
    id: "finance",
    name: "金融業",
    label: "Finance",
    vibe: "層級分明、流程嚴謹、留 paper trail。任何承諾都要有書面，溝通講究精準與合規。",
    jargon: [
      { q: "簽呈 / 會簽", a: "正式書面流程。口頭同意不算數，沒簽過的事約等於沒發生。" },
      { q: "風控 / 合規", a: "Risk & Compliance 把關。聽到『要先過風控』通常代表 +3 週起跳。" },
      { q: "我會 escalate", a: "對方準備往上層反映。聽到要立刻評估自己的立場與證據是否完備。" },
      { q: "留底", a: "把對話/承諾用 email 確認。在金融業，沒留底等於沒談過。" },
    ],
    dos: [
      "所有口頭共識都用 email recap 確認，並 cc 對方主管",
      "提案附風險評估、法遵檢查、與 fallback plan",
      "稱謂正確（總經理、副總、處長）、跳級溝通要先報備",
    ],
    donts: [
      "在 LINE / WhatsApp 群組討論客戶數字或敏感資料",
      "用『我跟某某口頭講過了』作為依據",
      "未取得直屬主管同意就跳級對話",
    ],
    phrases: [
      {
        topic: "跨部門要資料",
        weak: "幫我看一下這幾筆交易好嗎？",
        strong: "依 SOP-042 第 3 條，需要您部門協助提供 2025/Q1 的 A 類交易摘要。已附正式請求單編號 #2025-0142，預計 5 個工作天回覆。",
      },
      {
        topic: "向主管報告風險",
        weak: "好像有點問題，可能要再看一下。",
        strong: "我評估 A 案有兩個 compliance risk：(1) 法遵第 X 條、(2) 客戶資料路徑。建議今天下班前召集 30 分鐘對齊，附我整理的決策樹。",
      },
    ],
  },
  traditional: {
    id: "traditional",
    name: "傳產",
    label: "Traditional",
    vibe: "重輩分、講人情、給面子。文字訊息冰冷，當面 > 電話 > 訊息。話講三分留七分。",
    jargon: [
      { q: "再研究看看", a: "= 目前不行，但不想直接拒絕。需要找前輩私下探口風，或換時機再提。" },
      { q: "你還年輕", a: "= 我不打算跟你正面討論，這事輪不到你決定。應對：請前輩幫忙背書、別硬碰。" },
      { q: "大家都這樣做", a: "= 這是規矩，不要挑戰。改變要先讓老前輩覺得『這是他的主意』。" },
      { q: "等老闆指示", a: "= 老闆沒明確說 yes 之前，所有事都暫停。" },
    ],
    dos: [
      "重要事先打電話或當面聊，再用文字確認",
      "讓資深前輩成為你的『提案推手』，借他的位階說話",
      "稱呼用『X 哥 / X 姐 / X 經理』，避免直呼名字",
    ],
    donts: [
      "用 email 直接挑戰前輩或老闆的決定",
      "跳過直屬主管找老闆（即使老闆說過 anytime）",
      "在會議上當眾糾正前輩，即使他講錯",
    ],
    phrases: [
      {
        topic: "想改既有流程",
        weak: "這個流程很沒效率，我覺得應該改。",
        strong: "前輩，跟您請教一下，這個流程我做了幾次發現有個地方卡卡的。是不是我哪裡沒理解清楚？想聽聽您的看法。",
      },
      {
        topic: "拒絕老闆加班要求",
        weak: "老闆我週末有事不能來。",
        strong: "老闆，週六我有長輩的事得回中部一趟（給情感理由）。我週五晚上會把進度做到 80%、週日晚上回來後再衝刺，禮拜一早上 9 點之前一定給您。",
      },
    ],
  },
  edu: {
    id: "edu",
    name: "教育業",
    label: "Education",
    vibe: "重同理、講責任、情緒勞動多。對家長/學生要先處理情緒再處理事情。同儕間避免「打小報告」氛圍。",
    jargon: [
      { q: "再溝通看看", a: "對家長：通常是『先安撫情緒、未來再說』。對同事：可能是『我不打算改』。" },
      { q: "這是為了孩子好", a: "萬用句。對方搬出這句通常代表他覺得自己佔了道德高地。" },
      { q: "教研會議再討論", a: "把事情延後並擴散責任，避免一個人扛決定。" },
    ],
    dos: [
      "對家長：先肯定他的關心 → 再說明事實 → 提具體下一步",
      "與同事衝突先私下溝通，避免在學生面前」",
      "敏感對話（成績、行為問題）有第三方在場、留紀錄",
    ],
    donts: [
      "在群組 (LINE 班群) 公開點名單一學生或家長",
      "對家長承諾無法保證的結果（『一定考上』『一定改善』）",
      "用比較式語言（『別人家小孩...』）",
    ],
    phrases: [
      {
        topic: "回應抱怨型家長",
        weak: "他在學校沒這樣，可能您的觀察不完整。",
        strong: "謝謝您願意跟我說，這對我了解他很有幫助。在學校這邊，我觀察到的是 A、B、C。我們可以下週約 30 分鐘，一起拼出完整的圖像，再決定怎麼陪他。",
      },
      {
        topic: "向主管反映同事問題",
        weak: "X 老師最近都不交報告，影響到我。",
        strong: "想跟主任請教，最近教研進度上有個協作的卡點，影響到下週的家長日準備。我想了兩個方案，但需要您的判斷哪個比較合適。",
      },
    ],
  },
  med: {
    id: "med",
    name: "醫療業",
    label: "Healthcare",
    vibe: "高壓、時間極短、層級嚴明（主治 > 住院 > 護理長 > R > 護理師 > 實習）。講話快準狠，廢話會被嫌。",
    jargon: [
      { q: "On call", a: "輪值待命。打給 on call 醫師要在 10 秒內講完關鍵資訊。" },
      { q: "SBAR", a: "Situation-Background-Assessment-Recommendation。交班與通報的標準四段法。" },
      { q: "我等等過去看", a: "= 我手上還有事，但這件事我認為不是 immediate。如果你判斷 immediate，要直接說 STAT。" },
      { q: "你判斷一下", a: "= 我授權你決定，但出事你要負責。要先確認自己 scope of practice。" },
    ],
    dos: [
      "通報用 SBAR 結構，不超過 30 秒",
      "緊急程度明確：STAT / urgent / routine",
      "請示主治先給 assessment，再給選項，最後問建議",
    ],
    donts: [
      "在病人面前討論細節或團隊分歧",
      "用『可能』『大概』『好像』描述生命徵象",
      "跳過直屬主管打給更高階",
    ],
    phrases: [
      {
        topic: "向主治通報",
        weak: "X 床病人狀況不太好，您要不要看一下？",
        strong: "S：18 床術後 6 小時，B：原本 BP 110/70 HR 78，A：剛量 BP 88/52 HR 118 開始冒冷汗，R：建議 STAT 床邊評估、我已備 fluid bolus。",
      },
      {
        topic: "向護理長要支援",
        weak: "今天人手不夠，可不可以調人？",
        strong: "今晚 ICU ratio 是 1:3 含兩位 ventilator。X 床預計 23 點轉入，需要再一位人力，否則 ratio 1:4 風險偏高，建議從 7B 支援 4 小時。",
      },
    ],
  },
};

export const OPTIMIZE_SAMPLES = [
  {
    raw: "這個我做不完啦，太多事了。",
    out: {
      pro:    "目前手上任務密度已達 120%，建議我們對齊優先順序：A 案我可以本週交付，B 案需順延一週，您看可以嗎？",
      warm:   "我想跟您 share 一下目前的狀況，怕影響到整體交期。手邊三件事我能在本週收掉兩件，第三件我希望我們一起對齊一下優先順序。",
      exec:   "我評估了一下時程：若三件都要本週做完，品質會有 risk。我建議先聚焦在 A，B 順延一週，C 由 Mark 接手。請您決定。",
      client: "為了確保品質與時程兼顧，我們建議分階段交付：第一階段於本週交付 A，第二階段於下週交付 B。這樣您的上線節奏也比較穩定。",
    },
  },
  {
    raw: "你寫的東西我看不懂，能不能講中文？",
    out: {
      pro:    "我想再對齊一下脈絡。可以請你用一句話告訴我，這份文件最希望讀者帶走的結論是什麼？",
      warm:   "我想我可能漏掉了一些前情提要，可以請你幫我快速 walk through 一下開頭嗎？這樣我能更精準地給回饋。",
      exec:   "為了讓決策層快速 sign-off，建議在開頭加一段 30 字內的 Executive Summary。我可以協助你下午一起改。",
      client: "為了讓我們團隊能更精準支援您，可以請您 share 一下這份文件的主要目標讀者，以及希望他們做出的決策嗎？",
    },
  },
  {
    raw: "為什麼這件事沒人跟我講？",
    out: {
      pro:    "我想對齊一下資訊流。這件事的 stakeholder 名單是否需要更新？我希望類似訊息能在發生時 24 小時內同步給我。",
      warm:   "我發現自己這次沒被 Loop 到，可能我們的同步機制可以再優化一下。要不要我整理一個固定的 weekly sync 模板？",
      exec:   "建議我們建立一個 RACI 表，讓資訊路徑明確。我可以草擬第一版，本週三前 review。",
      client: "為了讓我們能更即時為您服務，可以請您 share 一份內部 PIC 名單，讓我們建立雙向通報機制嗎？",
    },
  },
  {
    raw: "老闆你這樣很不公平，他比我晚進來薪水還比我高。",
    out: {
      pro:    "我想 review 一下我目前的職責與績效，並了解我的薪資路徑。可以請您給我一個 30 分鐘的 1-on-1 嗎？",
      warm:   "最近聽到一些薪資相關的訊息，我想確認自己有沒有理解錯。能不能找個時間，您幫我梳理一下我目前的位置與下一步？",
      exec:   "基於過去 12 個月的交付成果（A、B、C 三案），我希望啟動一次正式的薪資 review。請告知合適的時程。",
      client: "（此情境不適用於對外溝通）",
    },
  },
  {
    raw: "我覺得這個提案很爛，邏輯有問題。",
    out: {
      pro:    "我對提案的第 2、3 頁有幾個疑問想釐清。在我們前進之前，可以請你說明一下 X 假設背後的依據嗎？",
      warm:   "我可能漏掉了一些前提，所以對結論有點接不上。能不能幫我補一下 X→Y 之間的推論？",
      exec:   "提案方向我認同，但風險評估還不夠完整。建議第 2 頁補入 sensitivity analysis，下次會議再 review。",
      client: "我們團隊還需要更多細節才能給出正式回覆。能否請您下週前再 share 一份更完整的 assumption 說明？",
    },
  },
];
