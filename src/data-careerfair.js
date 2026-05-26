// ============================================================
//  Career Fair · 線上就業博覽會（學校 × 企業 × 職缺）
// ============================================================

export const SCHOOLS = [
  {
    id: "ntu",
    name: "國立臺灣大學",
    short: "NTU",
    color: "#0E4D8A",
    accent: "椰林大道藍",
    fair: {
      theme: "Forward 2026 · 從學術到產業",
      dates: "2026/03/12 – 03/14",
      venue: "綜合體育館 + 線上同步",
      stats: { companies: 8, jobs: 22, students: "12,400+" },
    },
    companyIds: ["tsmc", "google", "cathay", "jpmorgan", "kpmg", "vghtpe", "uni-president", "linecorp"],
  },
  {
    id: "nccu",
    name: "國立政治大學",
    short: "NCCU",
    color: "#7B2D26",
    accent: "指南山紅",
    fair: {
      theme: "Career Catalyst · 商管領導者搖籃",
      dates: "2026/03/19 – 03/20",
      venue: "綜合院館 + 線上",
      stats: { companies: 7, jobs: 19, students: "8,200+" },
    },
    companyIds: ["cathay", "jpmorgan", "kpmg", "uni-president", "pousheng", "chih-chih-edu", "linecorp"],
  },
  {
    id: "nthu",
    name: "國立清華大學",
    short: "NTHU",
    color: "#5B2D8A",
    accent: "梅園紫",
    fair: {
      theme: "Innovate 2026 · 科技與深科技",
      dates: "2026/03/21",
      venue: "大禮堂 + 線上",
      stats: { companies: 6, jobs: 17, students: "6,800+" },
    },
    companyIds: ["tsmc", "google", "mediatek", "asml", "linecorp", "vghtpe"],
  },
  {
    id: "ncku",
    name: "國立成功大學",
    short: "NCKU",
    color: "#0B6E4F",
    accent: "光復校區綠",
    fair: {
      theme: "Build the Future · 工程與製造領袖",
      dates: "2026/03/26 – 03/27",
      venue: "光復校區體育館 + 線上",
      stats: { companies: 7, jobs: 20, students: "9,500+" },
    },
    companyIds: ["tsmc", "mediatek", "asml", "uni-president", "pousheng", "chih-chih-edu", "cathay"],
  },
];

// ============================================================
//  企業 × 職缺
//  practicePreset：點「進入練習」時帶入的情境設定
// ============================================================
export const COMPANIES = {
  tsmc: {
    id: "tsmc", name: "台積電", short: "TSMC",
    industry: "tech",
    size: "上市 · 5 萬人以上", color: "#C8553D",
    tag: "全球晶圓代工龍頭",
    culture: "紀律嚴明、講 SOP、看數據、不接受『差不多』",
    jobs: [
      {
        id: "tsmc-apm",
        title: "Associate PM（產品管理）",
        level: "新鮮人 · 1-2 年",
        location: "新竹",
        salary: "62-85K",
        industry: "tech",
        discFit: ["C", "D"],
        skills: ["向上溝通", "跨部門協作"],
        desc: "與 RD、生產、業務多方協作，推動新製程客戶導入。",
        tags: ["產品", "硬體", "新人友善"],
        practicePreset: {
          scenarioId: "propose",
          roleId: "boss",
          customName: "Lin 處長",
          customTitle: "資深廠長 / 副總",
          customPersonality: "數字派、看 ROI、不留時間給鋪陳",
          customTone: "簡短犀利、會打斷你問『所以呢？』",
        },
      },
      {
        id: "tsmc-fae",
        title: "Field Application Engineer",
        level: "新鮮人 · 0-2 年",
        location: "新竹 / 台南",
        salary: "60-78K",
        industry: "tech",
        discFit: ["D", "I"],
        skills: ["客戶談判", "跨部門協作"],
        desc: "客戶端技術窗口，處理 yield、design rule、量產問題。",
        tags: ["技術業務", "客戶端", "差旅"],
        practicePreset: {
          scenarioId: "cross",
          roleId: "client",
          customName: "Mr. Chen",
          customTitle: "客戶資深 IC 設計總監",
          customPersonality: "技術強硬、不接受空話、會挑 corner case",
          customTone: "冷靜、針鋒相對、英文夾雜",
        },
      },
    ],
  },
  google: {
    id: "google", name: "Google Taiwan", short: "Google",
    industry: "tech",
    size: "外商 · 3000 人以上", color: "#4285F4",
    tag: "AI 與雲端的全球領導者",
    culture: "扁平、async-friendly、結論先行、用 OKR 對齊",
    jobs: [
      {
        id: "google-apm",
        title: "Associate Product Manager",
        level: "新鮮人 · 0-2 年",
        location: "台北",
        salary: "120-150K",
        industry: "tech",
        discFit: ["D", "C"],
        skills: ["向上溝通", "簡報表達"],
        desc: "APM 輪調計畫，2 年內走過 3 個產品線。",
        tags: ["產品", "輪調", "高競爭"],
        practicePreset: {
          scenarioId: "propose",
          roleId: "boss",
          customName: "Sarah",
          customTitle: "Group PM Lead",
          customPersonality: "結構派、要求 1-pager、會追問『what could be wrong』",
          customTone: "中英夾雜、Direct but kind",
        },
      },
      {
        id: "google-uxr",
        title: "User Experience Researcher",
        level: "1-3 年",
        location: "台北",
        salary: "110-140K",
        industry: "tech",
        discFit: ["I", "S"],
        skills: ["客戶談判", "簡報表達"],
        desc: "負責亞太區產品研究，與 PM、設計、工程協作。",
        tags: ["研究", "跨國", "中英文"],
        practicePreset: {
          scenarioId: "cross",
          roleId: "peer",
          customName: "Kevin",
          customTitle: "Staff PM",
          customPersonality: "技術導向、對研究方法有意見、會 push back",
          customTone: "理性、要 evidence、節奏快",
        },
      },
    ],
  },
  mediatek: {
    id: "mediatek", name: "聯發科", short: "MediaTek",
    industry: "tech",
    size: "上市 · 1 萬人以上", color: "#1A1A1A",
    tag: "全球第二大 IC 設計廠",
    culture: "工程師文化、評審文化、會議多、技術深",
    jobs: [
      {
        id: "mtk-sde",
        title: "Software Development Engineer",
        level: "新鮮人 · 0-2 年",
        location: "新竹",
        salary: "70-95K",
        industry: "tech",
        discFit: ["C"],
        skills: ["跨部門協作", "簡報表達"],
        desc: "AI / 影像處理 / 5G modem 軟體開發。",
        tags: ["演算法", "C/C++", "新人友善"],
        practicePreset: {
          scenarioId: "cross",
          roleId: "peer",
          customName: "資深工程師 Wu",
          customTitle: "Principal Engineer",
          customPersonality: "技術潔癖、Code review 嚴格、不接受 hack",
          customTone: "冷淡、會直接指出問題、講話慢",
        },
      },
    ],
  },
  asml: {
    id: "asml", name: "ASML 台灣", short: "ASML",
    industry: "tech",
    size: "外商 · 3000 人以上", color: "#0F4C7C",
    tag: "全球唯一 EUV 微影設備商",
    culture: "歐式直接溝通、嚴謹、會議多",
    jobs: [
      {
        id: "asml-cse",
        title: "Customer Support Engineer",
        level: "新鮮人 · 0-3 年",
        location: "新竹 / 台南",
        salary: "75-110K",
        industry: "tech",
        discFit: ["C", "D"],
        skills: ["客戶談判", "拒絕請求"],
        desc: "客戶現場設備支援與性能調校。",
        tags: ["技術", "客戶端", "輪班"],
        practicePreset: {
          scenarioId: "refuse",
          roleId: "client",
          customName: "Engineer Liu",
          customTitle: "客戶廠務經理",
          customPersonality: "急、強勢、用 down-time 壓人",
          customTone: "短句、會升高音量、要立刻 commit",
        },
      },
    ],
  },
  cathay: {
    id: "cathay", name: "國泰金控", short: "Cathay",
    industry: "finance",
    size: "上市 · 5 萬人以上", color: "#0B6E4F",
    tag: "台灣最大金控集團",
    culture: "層級分明、簽呈文化、合規優先、保守",
    jobs: [
      {
        id: "cathay-mp",
        title: "管理培訓計畫（MA）",
        level: "新鮮人",
        location: "台北",
        salary: "55-75K + 獎金",
        industry: "finance",
        discFit: ["D", "C"],
        skills: ["向上溝通", "簡報表達"],
        desc: "兩年輪調制度，走過銀行、壽險、投資。",
        tags: ["MA", "輪調", "高潛力"],
        practicePreset: {
          scenarioId: "propose",
          roleId: "boss",
          customName: "張處長",
          customTitle: "資深處長 / 副總",
          customPersonality: "保守、重風險、要看簽呈與佐證",
          customTone: "客氣但會問層層細節、慢節奏",
        },
      },
      {
        id: "cathay-risk",
        title: "風險管理分析師",
        level: "1-3 年",
        location: "台北",
        salary: "60-80K",
        industry: "finance",
        discFit: ["C"],
        skills: ["跨部門協作"],
        desc: "市場風險 / 信用風險建模與報告。",
        tags: ["風控", "模型", "金融知識"],
        practicePreset: {
          scenarioId: "cross",
          roleId: "peer",
          customName: "Wendy",
          customTitle: "業務部協理",
          customPersonality: "業績壓力大、對風控有意見、會 escalate",
          customTone: "客氣但會抱怨、隱性對抗",
        },
      },
    ],
  },
  jpmorgan: {
    id: "jpmorgan", name: "摩根大通", short: "J.P. Morgan",
    industry: "finance",
    size: "外商 · 1000 人以上", color: "#3B5BA0",
    tag: "全球頂級投資銀行",
    culture: "高強度、PPT 文化、Up-or-Out、英文為主",
    jobs: [
      {
        id: "jpm-ib",
        title: "Investment Banking Analyst",
        level: "新鮮人 · 0-2 年",
        location: "台北",
        salary: "100-140K + 年終",
        industry: "finance",
        discFit: ["D", "C"],
        skills: ["向上溝通", "客戶談判"],
        desc: "M&A、IPO 案件支援，與全球團隊協作。",
        tags: ["IB", "高工時", "英文"],
        practicePreset: {
          scenarioId: "salary",
          roleId: "boss",
          customName: "VP Andrew",
          customTitle: "Vice President",
          customPersonality: "績效導向、不浪費時間、要量化成果",
          customTone: "Direct、英文、Brutally honest",
        },
      },
    ],
  },
  kpmg: {
    id: "kpmg", name: "KPMG 安侯建業", short: "KPMG",
    industry: "finance",
    size: "上市 · 3000 人以上", color: "#1A237E",
    tag: "全球四大會計師事務所",
    culture: "專案制、客戶導向、文件嚴謹、partner 制",
    jobs: [
      {
        id: "kpmg-aud",
        title: "查核員（Auditor）",
        level: "新鮮人",
        location: "台北 / 新竹 / 台南",
        salary: "48-58K",
        industry: "finance",
        discFit: ["C"],
        skills: ["客戶談判", "向上溝通"],
        desc: "客戶端駐點查核，與 senior、manager 協作。",
        tags: ["會計師證照", "客戶端", "高工時"],
        practicePreset: {
          scenarioId: "refuse",
          roleId: "client",
          customName: "客戶王副總",
          customTitle: "客戶財務副總",
          customPersonality: "不耐煩、覺得查核拖累進度",
          customTone: "強勢、會抱怨、要『盡快結案』",
        },
      },
      {
        id: "kpmg-con",
        title: "管理顧問（Strategy Consultant）",
        level: "新鮮人 · 1-2 年",
        location: "台北",
        salary: "70-95K",
        industry: "finance",
        discFit: ["D", "I"],
        skills: ["簡報表達", "客戶談判"],
        desc: "為客戶提供策略、營運、轉型專案。",
        tags: ["顧問", "差旅", "英文"],
        practicePreset: {
          scenarioId: "propose",
          roleId: "client",
          customName: "客戶執行長",
          customTitle: "客戶 CEO",
          customPersonality: "強勢、會挑戰假設、要 framework",
          customTone: "犀利、會打斷、要結論",
        },
      },
    ],
  },
  "uni-president": {
    id: "uni-president", name: "統一企業", short: "統一",
    industry: "traditional",
    size: "上市 · 5 萬人以上", color: "#B89455",
    tag: "台灣最大食品集團",
    culture: "層級分明、輩分文化、講人情、長期主義",
    jobs: [
      {
        id: "uni-mp",
        title: "儲備幹部（MA）",
        level: "新鮮人",
        location: "台南 / 全台",
        salary: "45-60K",
        industry: "traditional",
        discFit: ["I", "S"],
        skills: ["向上溝通", "跨部門協作"],
        desc: "三年輪調，從通路、生產、行銷走過一輪。",
        tags: ["MA", "輪調", "傳產"],
        practicePreset: {
          scenarioId: "propose",
          roleId: "boss",
          customName: "陳協理",
          customTitle: "資深協理",
          customPersonality: "重輩分、聽人情、要先建立關係",
          customTone: "溫和但有距離、不直接拒絕、會說『再研究看看』",
        },
      },
      {
        id: "uni-bd",
        title: "通路開發專員",
        level: "新鮮人 · 1-3 年",
        location: "全台",
        salary: "42-55K + 獎金",
        industry: "traditional",
        discFit: ["I", "D"],
        skills: ["客戶談判", "跨部門協作"],
        desc: "經銷商與量販店通路開發、訂單與促銷洽談。",
        tags: ["業務", "差旅", "獎金"],
        practicePreset: {
          scenarioId: "cross",
          roleId: "client",
          customName: "賣場王店長",
          customTitle: "量販店店長",
          customPersonality: "重關係、會跟你哭窮、要折扣與促銷支援",
          customTone: "熟絡但會殺價、會搬出其他品牌比較",
        },
      },
    ],
  },
  pousheng: {
    id: "pousheng", name: "寶成工業", short: "Pou Sheng",
    industry: "traditional",
    size: "上市 · 1 萬人以上", color: "#5D4037",
    tag: "全球最大運動鞋代工集團",
    culture: "傳產文化、外派文化、層級嚴明",
    jobs: [
      {
        id: "pou-mp",
        title: "海外儲備幹部",
        level: "新鮮人",
        location: "越南 / 印尼 / 中國",
        salary: "55-75K + 外派津貼",
        industry: "traditional",
        discFit: ["D", "S"],
        skills: ["跨部門協作", "客戶談判"],
        desc: "海外廠輪調，學供應鏈、品管、生管。",
        tags: ["外派", "海外", "輪調"],
        practicePreset: {
          scenarioId: "cross",
          roleId: "peer",
          customName: "廠長阮先生",
          customTitle: "越南廠生管廠長",
          customPersonality: "經驗老道、不喜歡台幹瞎指揮",
          customTone: "禮貌但保留、會回『按規定來』",
        },
      },
    ],
  },
  "chih-chih-edu": {
    id: "chih-chih-edu", name: "誠致教育基金會", short: "誠致",
    industry: "edu",
    size: "NGO · 200 人以下", color: "#5C7A5A",
    tag: "推動偏鄉教育的影響力組織",
    culture: "使命感強、扁平、講同理、會議多",
    jobs: [
      {
        id: "chih-pm",
        title: "學校經營專案經理",
        level: "1-3 年",
        location: "台東 / 雲林 / 桃園",
        salary: "42-55K",
        industry: "edu",
        discFit: ["S", "I"],
        skills: ["跨部門協作", "簡報表達"],
        desc: "與校長、老師、家長協作推動課程改革。",
        tags: ["教育", "影響力", "外派"],
        practicePreset: {
          scenarioId: "cross",
          roleId: "peer",
          customName: "周校長",
          customTitle: "合作學校校長",
          customPersonality: "資深、有教育理念、對外部專案謹慎",
          customTone: "溫和但堅定、會用『為了孩子』為由",
        },
      },
    ],
  },
  vghtpe: {
    id: "vghtpe", name: "臺北榮民總醫院", short: "北榮",
    industry: "med",
    size: "公立 · 5000 人以上", color: "#6F4063",
    tag: "全台頂尖醫學中心",
    culture: "層級嚴明、SOP 文化、講求精準、高壓",
    jobs: [
      {
        id: "vgh-nurse",
        title: "臨床護理師（新人計畫）",
        level: "新鮮人",
        location: "台北",
        salary: "48-65K（含夜班）",
        industry: "med",
        discFit: ["S", "C"],
        skills: ["向上溝通", "拒絕請求"],
        desc: "ICU / 急診 / 內外科輪訓。",
        tags: ["臨床", "輪班", "高壓"],
        practicePreset: {
          scenarioId: "refuse",
          roleId: "peer",
          customName: "資深學姊 May",
          customTitle: "資深護理師（學姊）",
          customPersonality: "權威、會壓新人、學長姐文化",
          customTone: "短促、會擺臉、用 SBAR 質問",
        },
      },
    ],
  },
  linecorp: {
    id: "linecorp", name: "LINE 台灣", short: "LINE",
    industry: "tech",
    size: "外商 · 500 人以上", color: "#06C755",
    tag: "亞洲領先的訊息與生活科技平台",
    culture: "扁平、創新、節奏快、跨國協作",
    jobs: [
      {
        id: "line-pm",
        title: "Product Manager（消費者產品）",
        level: "1-3 年",
        location: "台北",
        salary: "85-120K",
        industry: "tech",
        discFit: ["I", "D"],
        skills: ["向上溝通", "簡報表達"],
        desc: "負責 LINE 主應用功能開發，與日韓總部協作。",
        tags: ["產品", "B2C", "跨國"],
        practicePreset: {
          scenarioId: "propose",
          roleId: "boss",
          customName: "Yuki-san",
          customTitle: "日本總部產品總監",
          customPersonality: "謹慎、要 user data、會問 'why now'",
          customTone: "禮貌但保留、節奏慢、會視訊提問",
        },
      },
    ],
  },
};

// ============================================================
//  Helper：依 jobId 找出現在哪些校博
// ============================================================
export function getJobAppearances(jobId) {
  const companyId = Object.values(COMPANIES).find(c => c.jobs.some(j => j.id === jobId))?.id;
  if (!companyId) return [];
  return SCHOOLS.filter(s => s.companyIds.includes(companyId));
}

// ============================================================
//  推薦演算法
//  分數 = 基礎(40) + DISC 配對(25) + 產業偏好(15) + 目標配對(10*每命中) + 隨機微擾(0-10)
// ============================================================
export function recommendJobs(user, topN = 6) {
  const all = [];
  Object.values(COMPANIES).forEach(company => {
    company.jobs.forEach(job => {
      let score = 40;
      const reasons = [];

      // DISC 配對
      if (job.discFit?.includes(user.disc?.type)) {
        score += 25;
        reasons.push(`你的 ${user.disc.type} 型特質適合此職務`);
      }

      // 產業偏好
      if (job.industry === user.industry) {
        score += 15;
        reasons.push(`符合你選的「${labelOfIndustry(job.industry)}」`);
      }

      // 目標配對
      const hitGoals = (user.goals || []).filter(g => job.skills?.includes(g));
      if (hitGoals.length > 0) {
        score += 10 * hitGoals.length;
        reasons.push(`可練到你的目標：${hitGoals.join("、")}`);
      }

      // 加一點微擾讓排序不要太死
      score += Math.floor(Math.random() * 8);

      all.push({
        ...job,
        company,
        score: Math.min(99, score),
        reasons: reasons.length ? reasons : ["產業視野拓展推薦"],
        appearances: SCHOOLS.filter(s => s.companyIds.includes(company.id)),
      });
    });
  });
  all.sort((a, b) => b.score - a.score);
  return all.slice(0, topN);
}

function labelOfIndustry(id) {
  return ({ tech: "科技業", finance: "金融業", traditional: "傳產", edu: "教育業", med: "醫療業" })[id] || id;
}
