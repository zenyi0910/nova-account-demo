// Nova 系統維護 JS — 排程列表模式（類似三方支付維護排程）

// 供應商資料
const suppliers = [
  {id:'mycard',name:'MyCard'},
  {id:'gash',name:'Gash'},
  {id:'linepay',name:'LINE Pay'},
  {id:'ecpay',name:'綠界科技'},
  {id:'esun',name:'玉山銀行'},
  {id:'fetnet',name:'遠傳電信'},
  {id:'startest',name:'星運測試商'}
];

// 付款通道資料（已移除）

const maintSchedules = [
  { id: 1, start: '2026-06-14T03:00', end: '2026-06-14T05:00', content: '系統例行維護，暫停所有服務', remark: '每月定期維護', operator: 'casper', scope: '全站' },
  { id: 2, start: '2026-06-16T02:00', end: '2026-06-16T04:00', content: '版本更新 v2.4.0', remark: '新功能上線', operator: 'casper', scope: '全站' },
  { id: 3, start: '2026-06-15T01:00', end: '2026-06-15T03:00', content: '星幣系統維護', remark: '資料庫優化', operator: 'casper', scope: '星幣' },
  { id: 4, start: '2026-06-17T01:00', end: '2026-06-17T03:00', content: '星幣結算調整', remark: '匯率更新', operator: 'admin', scope: '星幣' },
  { id: 5, start: '2026-06-18T02:00', end: '2026-06-18T04:00', content: '資料庫備份', remark: '例行備份', operator: 'casper', scope: '全站' },
  { id: 6, start: '2026-06-20T03:00', end: '2026-06-20T05:00', content: '伺服器效能優化', remark: '提升載入速度', operator: 'admin', scope: '全站' },
  { id: 7, start: '2026-06-22T01:00', end: '2026-06-22T02:30', content: '星幣排行榜重算', remark: '月度排名', operator: 'casper', scope: '星幣' },
  { id: 8, start: '2026-06-25T02:00', end: '2026-06-25T04:00', content: 'CDN 節點更新', remark: '新增節點', operator: 'admin', scope: '全站' },
];

const maintHistory = [
  { id: 100, start: '2026-05-12T22:00', end: '2026-05-13T01:00', content: '緊急修補安全漏洞', remark: 'CVE-2026-1234', operator: 'admin', modifier: '-', opTime: '2026-05-12T21:45', scope: '全站', status: '已完成' },
  { id: 101, start: '2026-05-11T22:00', end: '2026-05-12T01:00', content: '緊急熱修復', remark: '登入異常', operator: 'admin', modifier: '-', opTime: '2026-05-11T21:30', scope: '全站', status: '已完成' },
  { id: 102, start: '2026-04-23T14:20', end: '2026-04-23T14:30', content: '緊急維護中，敬請見諒', remark: '測試2', operator: 'casper', modifier: 'admin', opTime: '2026-04-23T15:00', scope: '全站', status: '已刪除' },
  { id: 103, start: '2026-04-15T03:00', end: '2026-04-15T05:00', content: '支付系統緊急修復', remark: '支付異常', operator: 'admin', modifier: '-', opTime: '2026-04-15T02:50', scope: '全站', status: '已完成' },
  { id: 104, start: '2026-04-01T02:00', end: '2026-04-01T04:00', content: '系統版本升級 v2.3.1', remark: '季度更新', operator: 'casper', modifier: '-', opTime: '2026-04-01T01:50', scope: '全站', status: '已完成' },
  { id: 105, start: '2026-03-15T02:00', end: '2026-03-15T04:00', content: '資料庫遷移', remark: '效能優化', operator: 'admin', modifier: '-', opTime: '2026-03-15T01:45', scope: '全站', status: '已完成' },
  { id: 201, start: '2026-05-11T23:00', end: '2026-05-12T00:30', content: '星幣結算異常修復', remark: '緊急處理', operator: 'admin', modifier: '-', opTime: '2026-05-11T22:50', scope: '星幣', status: '已完成' },
  { id: 202, start: '2026-04-20T03:00', end: '2026-04-20T04:30', content: '星幣交易異常修復', remark: '交易卡頓', operator: 'admin', modifier: '-', opTime: '2026-04-20T02:45', scope: '星幣', status: '已完成' },
  { id: 203, start: '2026-03-28T02:00', end: '2026-03-28T03:00', content: '星幣匯率調整', remark: '例行調整', operator: 'casper', modifier: '-', opTime: '2026-03-28T01:50', scope: '星幣', status: '已完成' },
  { id: 301, start: '2026-05-10T01:00', end: '2026-05-10T03:00', content: '星幣系統例行維護', remark: '排行榜重算', operator: 'admin', modifier: '-', opTime: '2026-05-10T00:50', scope: '星幣', status: '已完成' },
  { id: 302, start: '2026-04-28T02:00', end: '2026-04-28T03:30', content: '星幣積分調整', remark: '規則變更', operator: 'casper', modifier: 'admin', opTime: '2026-04-28T04:00', scope: '星幣', status: '已刪除' },
];

let currentMaintTab = '全部';
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
  const d = new Date(dt);
  const y = d.getFullYear();
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  const hh = String(d.getHours()).padStart(2,'0');
  const mi = String(d.getMinutes()).padStart(2,'0');
  return `${y}-${mm}-${dd} ${hh}:${mi}`;
}
function fmtDTLong(dt) {
  return new Date(dt).toLocaleString('zh-TW', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function renderMaintenance() {
  const container = document.getElementById('maintContent');
  let html = renderScheduleList();
  html += `<div style="margin-top:24px">${renderHistoryTable()}</div>`;
  container.innerHTML = html;
  // Init history filter date picker
  const hdp = document.getElementById('histEndDatePicker');
  if (hdp && !hdp._dpInstance && window.NovaDatePicker) { NovaDatePicker.init(hdp); hdp._dpInstance = true; }
}

function renderScheduleList() {
  const now = new Date();
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  // 篩選
  let filtered = maintSchedules;
  if (currentMaintTab !== '全部') {
    filtered = maintSchedules.filter(s => s.scope === currentMaintTab);
  }
  const active = filtered.filter(s => new Date(s.end) >= now);
  const expired = filtered.filter(s => {
    const end = new Date(s.end);
    return end < now && end >= oneMonthAgo;
  });

  let html = `<div class="sched-section" style="background:#fff;border:1px solid #E5E7EB;border-radius:10px;padding:16px 20px;box-shadow:0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.06)">`;
  // Header
  html += `<div class="sched-header">`;
  html += `${UI.icon.clock} <span class="sched-title">維護排程</span>`;
  html += `<select style="margin-left:12px;border:1px solid #E5E7EB;border-radius:6px;padding:4px 10px;font-size:12px;font-family:inherit;color:#374151;background:#F9FAFB;cursor:pointer" onchange="switchMaintTab(this.value)">`;
  html += `<option value="全部"${currentMaintTab==='全部'?' selected':''}>全部</option>`;
  html += `<option value="全站"${currentMaintTab==='全站'?' selected':''}>全站</option>`;
  html += `<option value="星幣"${currentMaintTab==='星幣'?' selected':''}>星幣</option>`;
  html += `</select>`;
  html += `<span class="spacer"></span>`;
  html += UI.btn.add('新增排程', 'openMaintSchedModal()', {sm: true});
  html += `<button class="btn-sched-clear" onclick="clearAllMaintSched()" title="全部清除"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>`;
  html += `</div>`;

  if (active.length === 0 && expired.length === 0) {
    html += `<div style="text-align:center;padding:40px;color:#9CA3AF">目前無排程</div>`;
  } else {
    // Collapsed view
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
    active.forEach((s, i) => { expanded += renderSchedItem(s, i, true); });
    if (expired.length > 0) {
      expanded += `<div class="expired-toggle" onclick="toggleExpiredMaint()"><span>近一個月已結束</span><svg id="expiredMaintArrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg></div>`;
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
  
  let scopeBadge = '';
  if (s.scope === '星幣') {
    scopeBadge = `<span style="background:#DBEAFE;color:#1E40AF;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:500">星幣</span>`;
  } else {
    scopeBadge = `<span style="background:#E5E7EB;color:#374151;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:500">全站</span>`;
  }
  
  let detailInfo = '';
  
  return `<div class="sched-item${cls}">
    ${clockIcon}
    ${scopeBadge}
    <span class="time">${fmtDTLong(s.start)} ~ ${fmtDTLong(s.end)}</span>
    <span class="note">${s.content}${detailInfo}</span>
    <span class="spacer"></span>
    <span style="color:#374151;font-size:12px;margin-right:12px">操作者：${s.operator}</span>
    ${isExpired ? '' : `<button class="del-btn" onclick="delMaintSched(${idx})" title="刪除"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>`}
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

let historyPage = 1;
const historyPageSize = 20;
let histFilterScope = '全部';
let histFilterEndDate = '';

function filterHistory() {
  histFilterScope = document.getElementById('histScopeFilter')?.value || '全部';
  histFilterEndDate = document.getElementById('histEndDateRange')?.value || '';
  historyPage = 1;
  renderMaintenance();
}
function resetHistFilter() {
  histFilterScope = '全部';
  histFilterEndDate = '';
  const s = document.getElementById('histScopeFilter'); if(s) s.value='全部';
  const d = document.getElementById('histEndDateDisplay'); if(d) d.textContent='選擇日期範圍';
  const h = document.getElementById('histEndDateRange'); if(h) h.value='';
  historyPage = 1;
  renderMaintenance();
}

function renderHistoryTable() {
  let items = maintHistory;
  if (histFilterScope !== '全部') items = items.filter(r => r.scope === histFilterScope);
  if (histFilterEndDate) {
    const parts = histFilterEndDate.split(' ~ ');
    if (parts.length === 2) {
      const from = new Date(parts[0]);
      const to = new Date(parts[1]);
      items = items.filter(r => { const d = new Date(r.end); return d >= from && d <= to; });
    }
  }
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / historyPageSize));
  const start = (historyPage - 1) * historyPageSize;
  const pageData = items.slice(start, start + historyPageSize);

  const columns = [
    { label: '範圍', width: '60px' },
    { label: '開始時間', width: '140px' },
    { label: '結束時間', width: '140px' },
    { label: '公告內容' },
    { label: '備註' },
    { label: '操作者', width: '70px' },
    { label: '操作時間', width: '140px' },
    { label: '狀態', width: '80px' },
    { label: '異動者', width: '70px' }
  ];
  const rows = pageData.map(r => {
    const scopeBadge = r.scope === '星幣'
      ? `<span style="display:inline-block;background:#DBEAFE;color:#1E40AF;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:500;white-space:nowrap">星幣</span>`
      : `<span style="display:inline-block;background:#E5E7EB;color:#374151;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:500;white-space:nowrap">全站</span>`;
    const statusBadge = r.status === '已刪除'
      ? `<span class="status-badge" style="background:#FEE2E2;color:#991B1B;white-space:nowrap">已刪除</span>`
      : `<span class="status-badge status-online" style="white-space:nowrap">已完成</span>`;
    return {
      cells: [
        scopeBadge,
        `<span style="color:#6B7280;white-space:nowrap">${fmtDT(r.start)}</span>`,
        `<span style="color:#6B7280;white-space:nowrap">${fmtDT(r.end)}</span>`,
        r.content,
        r.remark || '-',
        r.operator || '-',
        r.opTime ? `<span style="color:#6B7280;white-space:nowrap">${fmtDT(r.opTime)}</span>` : '-',
        statusBadge,
        r.modifier || '-'
      ]
    };
  });
  let html = `<div style="background:#fff;border:1px solid #E5E7EB;border-radius:10px;padding:16px 20px;box-shadow:0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.06)">`;
  html += `<div class="sched-header" style="margin-bottom:10px">${UI.icon.clock} <span class="sched-title">歷史記錄</span></div>`;
  // Filter bar
  html += `<div style="display:flex;align-items:flex-end;gap:16px;margin-bottom:12px;padding:12px 16px;background:#F9FAFB;border:1px solid #E5E7EB;border-radius:8px">`;
  html += `<div style="display:flex;flex-direction:column;gap:4px"><label style="font-size:11px;font-weight:500;color:#6B7280">維護範圍</label><select id="histScopeFilter" class="form-control" style="width:120px;font-size:12px;padding:6px 8px"><option value="全部"${histFilterScope==='全部'?' selected':''}>全部</option><option value="全站"${histFilterScope==='全站'?' selected':''}>全站</option><option value="星幣"${histFilterScope==='星幣'?' selected':''}>星幣</option></select></div>`;
  html += `<div style="display:flex;flex-direction:column;gap:4px"><label style="font-size:11px;font-weight:500;color:#6B7280">結束時間</label><div class="date-picker-wrap" id="histEndDatePicker"><div class="date-picker-trigger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span class="date-display" id="histEndDateDisplay">${histFilterEndDate||'選擇日期範圍'}</span></div><input type="hidden" id="histEndDateRange" value="${histFilterEndDate}"></div></div>`;
  html += `<button class="btn btn-dark" style="padding:6px 16px;font-size:12px" onclick="filterHistory()">搜尋</button>`;
  html += `<button class="btn btn-outline" style="padding:6px 16px;font-size:12px" onclick="resetHistFilter()">重置</button>`;
  html += `</div>`;
  // 分頁上方
  html += `<div class="pagination-bar" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:12px;color:#6B7280"><span>第 ${historyPage} 頁，共 ${total} 筆資料</span><span>每頁顯示 <select style="border:1px solid #E5E7EB;border-radius:4px;padding:2px 6px;font-size:12px" disabled><option>${historyPageSize}</option></select> 筆</span></div>`;
  html += UI.table.create(columns, rows);
  // 分頁下方（左：頁碼選擇，右：< 1 2 > 按鈕）
  html += `<div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;font-size:12px;color:#6B7280">`;
  html += `<div><select style="border:1px solid #E5E7EB;border-radius:6px;padding:4px 8px;font-size:12px;font-family:inherit" onchange="historyPage=parseInt(this.value);renderMaintenance()">`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<option value="${i}"${i===historyPage?' selected':''}>第 ${i} 頁</option>`;
  }
  html += `</select></div>`;
  html += `<div style="display:flex;align-items:center;gap:4px">`;
  html += `<button class="btn btn-outline" style="padding:4px 10px;font-size:12px" ${historyPage<=1?'disabled':''} onclick="historyPage--;renderMaintenance()">‹</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="btn ${i===historyPage?'btn-dark':'btn-outline'}" style="padding:4px 10px;font-size:12px" onclick="historyPage=${i};renderMaintenance()">${i}</button>`;
  }
  html += `<button class="btn btn-outline" style="padding:4px 10px;font-size:12px" ${historyPage>=totalPages?'disabled':''} onclick="historyPage++;renderMaintenance()">›</button>`;
  html += `</div></div>`;
  html += `</div>`;
  return html;
}

function openMaintSchedModal() {
  // 初始化供應商下拉選單
  const supplierSelect = document.getElementById('schedSupplier');
  if (supplierSelect) {
    supplierSelect.innerHTML = '<option value="">請選擇供應商</option>' +
      suppliers.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  }
  UI.modal.open('maintSchedModal');
}



function updateRemarkCount() {
  const remark = document.getElementById('schedRemark').value;
  const limit = document.getElementById('remarkLimit');
  limit.textContent = `(${remark.length}/50)`;
}

function addMaintSched() {
  const rangeEl = document.getElementById('schedDateRange');
  const scopeEl = document.getElementById('schedScope');
  const scope = scopeEl ? scopeEl.value : '全站';
  const remark = document.getElementById('schedRemark').value.trim();

  if (!rangeEl || !rangeEl.value) {
    UI.toast('請選擇維護時間', 'error'); return;
  }

  let content = '';

  content = document.getElementById('schedContent').value.trim();
  if (!content) {
    UI.toast('請填寫公告內容', 'error'); return;
  }

  // Parse "2026-05-14 03:00:00 ~ 2026-05-14 05:00:59"
  const parts = rangeEl.value.split(' ~ ');
  if (parts.length !== 2) {
    UI.toast('時間格式錯誤', 'error'); return;
  }

  const start = parts[0].replace(' ', 'T').substring(0, 16);
  const end = parts[1].replace(' ', 'T').substring(0, 16);

  // 開始時間必須在當前時間 10 分鐘之後
  const startDate = new Date(start);
  const minStart = new Date(Date.now() + 10 * 60 * 1000);
  if (startDate < minStart) {
    UI.toast('開始時間必須在當前時間 10 分鐘之後', 'error'); return;
  }

  const newSched = {
    id: ++schedIdCounter, start, end, content, remark, operator: 'casper', scope
  };
  
  maintSchedules.push(newSched);

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
