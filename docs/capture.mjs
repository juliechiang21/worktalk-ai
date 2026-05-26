// docs/capture.mjs — 跑 Playwright 抓 demo 站關鍵畫面
// 用法：npx playwright @playwright/test or npm install playwright then `node docs/capture.mjs`

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = "http://localhost:5173";
const OUT = "docs/screenshots";
await mkdir(OUT, { recursive: true });

const VIEWPORT = { width: 1440, height: 900 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shot(page, name) {
  await sleep(800); // 讓動畫/fonts 都到位
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  console.log("✓", name);
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2 });
const page = await ctx.newPage();

// 等字型載完的小 helper
async function waitFonts() {
  await page.evaluate(() => document.fonts.ready);
}

// 01 Login
await page.goto(BASE);
await waitFonts();
await shot(page, "01-login");

// 進到首頁（跳過 onboarding）
await page.evaluate(() => {
  // 點登入按鈕走完 onboarding 三步
});
await page.click('button:has-text("登入並開始演練")');
await waitFonts();
await shot(page, "02-profile");

await page.click('button:has-text("跳過")');
await sleep(400);
// industry 頁需要選一個
await page.click('button:has-text("科技業")');
await sleep(200);
await shot(page, "03-industry");

await page.click('button:has-text("DISC 人格測驗")');
await sleep(400);
await shot(page, "04-disc-quiz");

// 跳過 DISC
await page.click('button:has-text("跳過測驗")');
await sleep(800);
await shot(page, "05-home");

// 情境演練
await page.click('button:has-text("情境演練")');
await sleep(500);
await page.click('button:has-text("拒絕加班")');
await sleep(200);
await page.click('button:has-text("主管"):visible');
await sleep(200);
await shot(page, "06-scenario-picker");

await page.click('button:has-text("開始演練")');
await sleep(900);
await shot(page, "07-chat");

// 報告頁
await page.keyboard.press("r");
await sleep(500);
await shot(page, "08-report");

// 表達優化
await page.click('button:has-text("表達優化")');
await sleep(500);
await shot(page, "09-optimize");

// 校博列表
await page.click('button:has-text("就業博覽會")');
await sleep(500);
await shot(page, "10-careerfair-list");

// 進台大校博
await page.click('button:has-text("國立臺灣大學")');
await sleep(500);
await shot(page, "11-school-fair");

// 職缺推薦
await page.click('button:has-text("職缺推薦")');
await sleep(500);
await shot(page, "12-recommendations");

await browser.close();
console.log("All screenshots captured.");
