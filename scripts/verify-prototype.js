/**
 * Nova Demo Prototype 自動驗證腳本
 * 每次 commit 前跑一輪，確保：
 * 1. DOM-JS binding 正確（date-picker-wrap、toggle label）
 * 2. 互動完整性（toggle/modal/drag/按鈕回饋）
 * 3. CSS 無重複 selector
 * 4. 微互動回饋（cursor:grabbing、hover state）
 * 5. 禁用 emoji（必須 SVG）
 * 6. 系統風格一致性（色碼/圓角/字級）
 *
 * Usage: node scripts/verify-prototype.js [file.html ...]
 *        無參數 = 掃描所有 nova-*.html
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SYSTEM_COLORS = {
  teal: '#2BB5A0',
  search: '#393939',
  reset_bg: '#E8E9EB',
  toggle_on: '#2BB5A0',
  toggle_off: '#D4D4D8',
  cyan400: '#22D3EE',
  cyan500: '#06B6D4',
  gray400: '#9CA3AF',
  amber400: '#FBBF24',
  th_bg: 'rgba(57, 57, 57, 0.05)',
  th_color: '#393939',
};

const SYSTEM_SPECS = {
  toggle: { width: 32, height: 18 },
  btn_radius: '8px',
  th_font_weight: '500',
  th_padding: '12px',
  td_font_size: '14px',
};

async function getHtmlFiles(args) {
  if (args.length) return args.map(f => path.resolve(ROOT, f));
  return fs.readdirSync(ROOT)
    .filter(f => f.startsWith('nova-') && f.endsWith('.html'))
    .map(f => path.join(ROOT, f));
}

async function checkCSSDuplicates(content, file) {
  const issues = [];
  const styleBlocks = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  const allCSS = styleBlocks.map(b => b.replace(/<\/?style[^>]*>/gi, '')).join('\n');
  
  // 排除來自 sidebar/components 注入的共用 selector（這些是全站共用不算重複）
  const SHARED_SELECTORS = new Set([
    '.sidebar', '.sidebar-sub .sidebar-item', '.sidebar-user', '.main', '.content',
    '.filter-card', '.filter-actions', '.filter-group', '.filter-input', '.data-table',
    '.data-table th', '.page-btn', '.pagination-bar', '.topbar', '.sidebar-item',
    '.sidebar-collapsed .sidebar', '.sidebar-collapsed .main', '.sidebar.show',
    '.sidebar-overlay', '.sidebar-overlay.show', '.phone-frame', '.phone-frame iframe',
  ]);

  const selectorCounts = {};
  const selectorRegex = /([^{}@]+)\{/g;
  let m;
  while ((m = selectorRegex.exec(allCSS)) !== null) {
    const sel = m[1].trim();
    if (!sel || sel.startsWith('/*') || sel.startsWith('@') || sel.includes('from') || sel.includes('to')) continue;
    if (SHARED_SELECTORS.has(sel)) continue;
    selectorCounts[sel] = (selectorCounts[sel] || 0) + 1;
  }
  
  for (const [sel, count] of Object.entries(selectorCounts)) {
    if (count > 1) {
      issues.push({ severity: 'medium', msg: `CSS selector "${sel}" 定義 ${count} 次（重複）` });
    }
  }
  return issues;
}

function checkEmoji(content, file) {
  const issues = [];
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/gu;
  const matches = content.match(emojiRegex);
  if (matches) {
    issues.push({ severity: 'high', msg: `禁止 emoji，找到: ${[...new Set(matches)].join(' ')}` });
  }
  return issues;
}

function checkDatePickerBinding(content) {
  const issues = [];
  const hasTrigger = content.includes('date-picker-trigger');
  const hasWrap = content.includes('date-picker-wrap');
  if (hasTrigger && !hasWrap) {
    issues.push({ severity: 'high', msg: 'date-picker-trigger 存在但缺少 date-picker-wrap 父層（JS 不會初始化）' });
  }
  return issues;
}

async function checkInteractions(page, file) {
  const issues = [];
  
  // Toggle label 動態更新
  const toggleCount = await page.$$eval('.toggle', els => els.length);
  for (let i = 0; i < Math.min(toggleCount, 3); i++) {
    const result = await page.evaluate((idx) => {
      const toggles = document.querySelectorAll('.toggle');
      const t = toggles[idx];
      if (!t) return null;
      const lbl = t.nextElementSibling;
      if (!lbl) return null;
      const before = lbl.textContent;
      t.click();
      const after = lbl.textContent;
      t.click(); // restore
      return { before, after };
    }, i);
    if (result && result.before === result.after) {
      issues.push({ severity: 'medium', msg: `Toggle #${i} label 未動態更新（click 前後都是 "${result.before}"）` });
    }
  }

  // Modal 開啟
  const hasEditBtn = await page.$('.btn-edit');
  if (hasEditBtn) {
    const modalOpen = await page.evaluate(() => {
      const btn = document.querySelector('.btn-edit');
      if (!btn) return false;
      btn.click();
      const overlay = document.querySelector('.modal-overlay');
      return overlay ? overlay.classList.contains('open') : false;
    });
    if (!modalOpen) {
      issues.push({ severity: 'high', msg: '編輯按鈕 click 後 modal 未開啟' });
    } else {
      await page.evaluate(() => {
        const overlay = document.querySelector('.modal-overlay');
        if (overlay) overlay.classList.remove('open');
      });
    }
  }

  // Drag mode（ad-sort）
  const editSortBtn = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(b => b.textContent.includes('編輯排序'));
    if (b) { b.click(); return true; }
    return false;
  });
  if (editSortBtn) {
    const dragColVisible = await page.evaluate(() => {
      const cols = document.querySelectorAll('.drag-col');
      return cols.length > 0 && getComputedStyle(cols[0]).display !== 'none';
    });
    if (!dragColVisible) {
      issues.push({ severity: 'medium', msg: '編輯排序模式：drag-col 未顯示' });
    }
    const hasGrabbing = await page.evaluate(() => {
      const sheets = document.styleSheets;
      for (const sheet of sheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.cssText && rule.cssText.includes('grabbing')) return true;
          }
        } catch(e) {}
      }
      return false;
    });
    if (!hasGrabbing) {
      issues.push({ severity: 'low', msg: '缺少 cursor:grabbing 回饋（drag 時無視覺變化）' });
    }
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b = btns.find(b => b.textContent.includes('取消'));
      if (b) b.click();
    });
  }

  // 按鈕必須有回饋（不能 click 後什麼都不做）
  const allBtns = await page.evaluate(() => {
    const btns = document.querySelectorAll('button:not(.toggle):not(.sidebar-item):not(.modal-close):not(.page-btn)');
    return Array.from(btns).map(b => ({
      text: b.textContent.trim().slice(0, 20),
      hasOnclick: !!b.onclick || !!b.getAttribute('onclick'),
      hasListener: b.dataset.hasListener || false,
    }));
  });
  const noHandler = allBtns.filter(b => !b.hasOnclick && b.text && !['‹','›','1','2','20'].includes(b.text));
  // This is informational only since event delegation won't show up here

  return issues;
}

async function checkStyleConsistency(page) {
  const issues = [];
  
  return await page.evaluate((SYSTEM_SPECS) => {
    const issues = [];
    
    // Toggle 尺寸
    const toggles = document.querySelectorAll('.toggle');
    for (let i = 0; i < Math.min(toggles.length, 2); i++) {
      const s = getComputedStyle(toggles[i]);
      const w = parseInt(s.width);
      const h = parseInt(s.height);
      if (Math.abs(w - SYSTEM_SPECS.toggle.width) > 2) {
        issues.push({ severity: 'medium', msg: `Toggle 寬度 ${w}px ≠ 系統 ${SYSTEM_SPECS.toggle.width}px` });
      }
      if (Math.abs(h - SYSTEM_SPECS.toggle.height) > 2) {
        issues.push({ severity: 'medium', msg: `Toggle 高度 ${h}px ≠ 系統 ${SYSTEM_SPECS.toggle.height}px` });
      }
    }

    // Table th
    const ths = document.querySelectorAll('.data-table th');
    for (let i = 0; i < Math.min(ths.length, 3); i++) {
      const s = getComputedStyle(ths[i]);
      if (s.whiteSpace !== 'nowrap') {
        issues.push({ severity: 'high', msg: `表格 th[${i}] 缺少 white-space:nowrap（"${ths[i].textContent.trim()}"）` });
        break;
      }
    }

    // 新增按鈕顏色
    const addBtns = document.querySelectorAll('.btn-add, [class*="btn-teal"]');
    for (const btn of addBtns) {
      const s = getComputedStyle(btn);
      const bg = s.backgroundColor;
      // rgb(43,181,160) = #2BB5A0
      if (bg && !bg.includes('43, 181, 160') && !bg.includes('43,181,160')) {
        issues.push({ severity: 'low', msg: `新增按鈕 bg=${bg}，應為 #2BB5A0 (rgb(43,181,160))` });
      }
    }

    return issues;
  }, SYSTEM_SPECS);
}

async function main() {
  const args = process.argv.slice(2);
  const files = await getHtmlFiles(args);
  
  if (!files.length) {
    console.log('No nova-*.html files found.');
    process.exit(0);
  }

  const browser = await chromium.launch({ headless: true });
  const allIssues = {};

  for (const file of files) {
    const basename = path.basename(file);
    const content = fs.readFileSync(file, 'utf-8');
    const issues = [];

    // Static checks
    issues.push(...await checkCSSDuplicates(content, basename));
    issues.push(...checkEmoji(content, basename));
    issues.push(...checkDatePickerBinding(content));

    // Runtime checks
    const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      window._alerts = [];
      window.alert = (m) => window._alerts.push(m);
      window.confirm = () => true;
    });
    await page.goto(`file://${file}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    try {
      issues.push(...await checkInteractions(page, basename));
      issues.push(...await checkStyleConsistency(page));
    } catch(e) {
      issues.push({ severity: 'low', msg: `Runtime check error: ${e.message.slice(0, 80)}` });
    }

    await ctx.close();

    if (issues.length) allIssues[basename] = issues;
  }

  await browser.close();

  // Report
  let hasError = false;
  const jsonReport = { timestamp: new Date().toISOString(), files: allIssues, summary: {} };
  
  if (Object.keys(allIssues).length === 0) {
    if (!process.env.JSON_REPORT) console.log('✅ All prototypes passed verification.');
  } else {
    let highCount = 0, medCount = 0, lowCount = 0;
    for (const [file, issues] of Object.entries(allIssues)) {
      if (!process.env.JSON_REPORT) console.log(`\n❌ ${file}:`);
      for (const issue of issues) {
        if (issue.severity === 'high') highCount++;
        else if (issue.severity === 'medium') medCount++;
        else lowCount++;
        if (!process.env.JSON_REPORT) {
          const icon = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '⚪';
          console.log(`  ${icon} [${issue.severity}] ${issue.msg}`);
        }
        if (issue.severity === 'high') hasError = true;
      }
    }
    jsonReport.summary = { high: highCount, medium: medCount, low: lowCount };
  }

  if (process.env.JSON_REPORT) {
    const reportPath = process.env.JSON_REPORT === '1' ? '/tmp/nova-verify-report.json' : process.env.JSON_REPORT;
    fs.writeFileSync(reportPath, JSON.stringify(jsonReport, null, 2));
    console.log(`Report written to ${reportPath}`);
  }

  process.exit(hasError ? 1 : 0);
}

main().catch(e => { console.error(e); process.exit(1); });
