// Nova 系統維護 JS — 排程列表模式（類似三方支付維護排程）
const maintSchedules = [
  { id: 1, start: '2026-05-14T03:00', end: '2026-05-14T05:00', content: '系統例行維護，暫停所有服務', remark: '每月定期維護', operator: 'casper', scope: '全站' },
  { id: 2, start: '2026-05-16T02:00', end: '2026-05-16T04:00', content: '版本更新 v2.4.0', remark: '新功能上線', operator: 'casper', scope: '全站' },
  { id: 3, start: '2026-05-15T01:00', end: '2026-05-15T03:00', content: '星幣系統維護', remark: '資料庫優化', operator: 'casper', scope: '星幣' },
];

const maintHistory = [
  { id: 101, start: '2026-05-11T22:00', end: '2026-05-12T01:00', content: '緊急熱修復', remark: '登入異常', operator: 'admin', scope: '全站' },
  { id: 102, start: '2026-04-23T14:20', end: '2026-04-23T14:30', content: '緊急維護中，敬請見諒', remark: '測試2', operator: 'casper', scope: '全站' },
  { id: 103, start: '2026-04-15T03:00', end: '2026-04-15T05:00', content: '支付系統緊急修復', remark: '支付異常', operator: 'admin', scope: '全站' },
  { id: 104, start: '2026-04-01T02:00', end: '2026-04-01T04:00', content: '系統版本升級 v2.3.1', remark: '季度更新', operator: 'casper', scope: '全站' },
  { id: 105, start: '2026-03-15T02:00', end: '2026-03-15T04:00', content: '資料庫遷移', remark: '效能優化', operator: 'admin', scope: '全站' },
  { id: 201, start: '2026-05-11T23:00', end: '2026-05-12T00:30', content: '星幣結算異常修復', remark: '緊急處理', operator: 'admin', scope: '星幣' },
  { id: 202, start: '2026-04-20T03:00', end: '2026-04-20T04:30', content: '星幣交易異常修復', remark: '交易卡頓', operator: 'admin', scope: '星幣' },
  { id: 203, start: '2026-03-28T02:00', end: '2026-03-28T03:00', content: '星幣匯率調整', remark: '例行調整', operator: 'casper', scope: '星幣' },
];

let currentMaintTab = '全站';
let showHistory = false;
let schedIdCounter = 300;

function switchMaintTab(tab) {
  currentMaintTab = tab;
  renderMaintenance();
}

function toggleHistory() {
  showHistory = !showHistory;
  renderMaintenance();
}

function fmtDT(dt) {
  return new Date(dt).toLocaleString('zh-TW', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function renderMaintenance() {
  const container = document.getElementById('maintContent');

  const historyBtn = showHistory
    ? `<button class="btn-outline" onclick="toggleHistory()" style="margin-left:auto;font-size:13px;padding:6px 14px">← 返回</button>`
    : `<button class="btn-add" onclick="toggleHistory()" style="margin-left:auto">${UI.icon.clock} <span style="vertical-align:middle">操作紀錄</span></button>`;

  let html = `<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">${historyBtn}</div>`;

  if (showHistory) {
    html += renderHistoryTable();
  } else {
    html += renderScheduleList();
  }

  container.innerHTML = html;
}

function renderScheduleList() {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const active = maintSchedules.filter(s => new Date(s.end) >= now);
  const expired = maintHistory.filter(s => {
    const end = new Date(s.end);
    return end < now && end >= yesterday;
  });

  let html = `<div class="sched-section">`;
  // Header: title + filter + add + clear
  html += `<div class="sched-header">`;
  html += `${UI.icon.clock} <span class="sched-title">維護排程</span>`;
  html += `<span class="spacer"></span>`;
  html += UI.btn.add('新增排程', 'openMaintSchedModal()', {sm: true});
  html += `<button class="btn-sched-clear" onclick="clearAllMaintSched()" title="全部清除"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>`;
  html += `</div>`;

  if (active.length === 0 && expired.length === 0) {
    html += `<div style="text-align:center;padding:40px;color:#9CA3AF">目前無排程</div>`;
  } else {
    // Collapsed view: first item full, second with gradient
    let collapsed = '';
    let expanded = '';
    if (active.length > 0) {
      collapsed += renderSchedItem(active[0], 0, true);
      if (active.length > 1) {
        collapsed += `<div class="sched-fade-wrap">` +
          `<div class="sched-fade-overlay"><span onclick="expandSchedList()" class="more-btn">更多 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg></span></div>` +
          renderSchedItem(active[1], 1, false) + `</div>`;
      }
    }
    // Expanded: all active
    active.forEach((s, i) => { expanded += renderSchedItem(s, i, true); });
    // Expired section
    if (expired.length > 0) {
      expanded += `<div class="expired-toggle" onclick="toggleExpiredMaint()"><span>昨日已結束</span><svg id="expiredMaintArrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg></div>`;
      expanded += `<div id="expiredMaintList" class="expired-list" style="display:none">`;
      expired.forEach((s, i) => { expanded += renderSchedItem(s, i, false, true); });
      expanded += `</div>`;
    }

    html += `<div id="schedCollapsed">${collapsed}</div>`;
    html += `<div id="schedExpanded" style="display:none">${expanded}</div>`;
  }
  html += `</div>`;
  return html;
}

function renderSchedItem(s, idx, isActive, isExpired) {
  const clockIcon = `<svg class="sched-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
  const cls = isExpired ? ' expired' : (isActive ? '' : ' faded');
  const scopeBadge = s.scope === '星幣' ? `<span style="background:#EDE9FE;color:#7C3AED;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:500">星幣</span>` : `<span style="background:#FEF3C7;color:#D97706;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:500">全站</span>`;
  return `<div class="sched-item${cls}">
    ${clockIcon}
    ${scopeBadge}
    <span class="time">${fmtDT(s.start)} ~ ${fmtDT(s.end)}</span>
    <span class="note">${s.content}</span>
    <span class="spacer"></span>
    <button class="del-btn" onclick="delMaintSched(${idx})" title="刪除"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
  </div>`;
}

function expandSchedList() {
  document.getElementById('schedCollapsed').style.display = 'none';
  document.getElementById('schedExpanded').style.display = '';
}

function toggleExpiredMaint() {
  const el = document.getElementById('expiredMaintList');
  const arrow = document.getElementById('expiredMaintArrow');
  if (el.style.display === 'none') {
    el.style.display = '';
    arrow.style.transform = 'rotate(180deg)';
  } else {
    el.style.display = 'none';
    arrow.style.transform = '';
  }
}

function clearAllMaintSched() {
  if (!confirm('確定清除所有排程？')) return;
  maintSchedules.length = 0;
  renderMaintenance();
  UI.toast('已清除所有排程');
}

function renderHistoryTable() {
  const items = maintHistory;
  if (items.length === 0) {
    return `<div style="text-align:center;padding:40px;color:#9CA3AF;background:#fff;border:1px solid #E5E7EB;border-radius:10px">尚無歷史紀錄</div>`;
  }
  const columns = [
    { label: '範圍', width: '60px' },
    { label: '開始時間', width: '160px' },
    { label: '結束時間', width: '160px' },
    { label: '公告內容' },
    { label: '備註' },
    { label: '操作者', width: '80px' },
    { label: '狀態', width: '80px' }
  ];
  const rows = items.map(r => ({
    cells: [
      r.scope === '星幣' ? `<span style="background:#EDE9FE;color:#7C3AED;padding:2px 6px;border-radius:4px;font-size:11px">星幣</span>` : `<span style="background:#FEF3C7;color:#D97706;padding:2px 6px;border-radius:4px;font-size:11px">全站</span>`,
      `<span style="color:#6B7280">${fmtDT(r.start)}</span>`,
      `<span style="color:#6B7280">${fmtDT(r.end)}</span>`,
      r.content,
      r.remark || '-',
      r.operator,
      `<span class="status-badge status-online">已完成</span>`
    ]
  }));
  return UI.table.create(columns, rows);
}

function openMaintSchedModal() {
  UI.modal.open('maintSchedModal');
}

function addMaintSched() {
  const startEl = document.querySelector('#maintSchedModal #schedStartDate');
  const endEl = document.querySelector('#maintSchedModal #schedEndDate');
  const content = document.getElementById('schedContent').value.trim();
  const remark = document.getElementById('schedRemark').value.trim();
  const scopeEl = document.getElementById('schedScope');
  const scope = scopeEl ? scopeEl.value : '全站';

  if (!startEl || !endEl || !startEl.value || !endEl.value) {
    UI.toast('請選擇開始與結束時間', 'error'); return;
  }
  if (!content) {
    UI.toast('請填寫公告內容', 'error'); return;
  }

  const start = startEl.value.includes('T') ? startEl.value : startEl.value + 'T00:00';
  const end = endEl.value.includes('T') ? endEl.value : endEl.value + 'T23:59';

  maintSchedules.push({
    id: ++schedIdCounter, start, end, content, remark, operator: 'casper', scope
  });

  UI.modal.close('maintSchedModal');
  renderMaintenance();
  UI.toast('排程新增成功');
}

function delMaintSched(idx) {
  if (!confirm('確定刪除此排程？')) return;
  maintSchedules.splice(idx, 1);
  renderMaintenance();
  UI.toast('排程已刪除');
}

document.addEventListener('DOMContentLoaded', renderMaintenance);
