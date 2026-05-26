# WorkTalk AI · 職場溝通教練

純前端 Demo — 所有對話腳本、分析報告、優化範例都預先寫死在 `src/data.js`，無 Backend、無資料庫，可直接部署到 Cloudflare Pages。

## 技術棧

- **Vite 8** + **React 19** — 編譯為靜態檔
- **Pure CSS** — 設計稿原樣的 CSS 變數系統（`src/styles.css`）
- **Google Fonts** — Noto Sans TC / Noto Serif TC / JetBrains Mono

## 本地開發

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # 輸出到 dist/
npm run preview      # 預覽 build 結果
```

快捷鍵（demo 用）：按 `h` 跳首頁、`r` 跳報告頁。

## 部署到 Cloudflare Pages

### 方法一：CLI 直接部署（最快）

```bash
npm run deploy
```

第一次執行會要求 `npx wrangler login` 做 OAuth 授權；之後就會把 `dist/` 推上去。

### 方法二：Cloudflare Dashboard 接 Git

1. 把 `worktalk-ai/` 推到 GitHub
2. Cloudflare Dashboard → Workers & Pages → Create → Connect to Git
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Framework preset: Vite

## 專案結構

```
src/
  data.js                  # 所有預設資料（對話腳本、分析報告、優化範例）
  App.jsx                  # Router & 全域狀態
  main.jsx                 # 入口
  styles.css               # 設計稿樣式
  components/Shared.jsx    # SimpleTopBar、Stepper、MultiPick
  screens/
    Auth.jsx               # Login / Profile / Industry / DISC
    Main.jsx               # Home / ScenarioPicker
    Chat.jsx               # ChatScreen / VoiceMode / OptimizeModal
    Analysis.jsx           # Report / Optimize
```

## 流程

```
login → profile → industry → disc → home
                                      ├── scenarios → chat → report
                                      ├── report
                                      └── optimize
```
