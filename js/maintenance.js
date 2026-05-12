// Nova 系統維護 JS
const maintData = [
  { id: 1, tab: '全站', startTime: '2026-05-10 02:00', endTime: '2026-05-10 04:00', type: '維護更新', url: '/systemMaintenance', content: '系統例行維護，暫停所有服務', remark: '每月定期維護', whitelist: '', operator: 'casper', status: 'scheduled' },
  { id: 2, tab: '全站', startTime: '2026-04-23 14:20', endTime: '2026-04-23 14:30', type: '維護更新', url: '/systemMaintenance', content: '緊急維護中，敬請見諒', remark: '測試2', whitelist: 'https://sewer.edcft.click', operator: 'casper', status: 'completed' },
  { id: 3, tab: '全站', startTime: '2026-04-15 03:00', endTime: '2026-04-15 05:00', type: '緊急維護', url: '/systemMaintenance', content: '支付系統緊急修復', remark: '支付異常', whitelist: '', operator: 'admin', status: 'completed' },
  { id: 4, tab: '全站', startTime: '2026-04-01 02:00', endTime: '2026-04-01 04:00', type: '維護更新', url: '/systemMaintenance', content: '系統版本升級 v2.3.1', remark: '季度更新', whitelist: '', operator: 'casper', status: 'completed' },
  { id: 5, tab: '星幣', startTime: '2026-05-08 01:00', endTime: '2026-05-08 02:00', type: '維護更新', url: '/coinMaintenance', content: '星幣系統維護', remark: '資料庫優化', whitelist: '', operator: 'casper', status: 'scheduled' },
  { id: 6, tab: '星幣', startTime: '2026-04-20 03:00', endTime: '2026-04-20 04:30', type: '緊急維護', url: '/coinMaintenance', content: '星幣交易異常修復', remark: '交易卡頓', whitelist: '', operator: 'admin', status: 'completed' },
  { id: 7, tab: '星幣', startTime: '2026-03-28 02:00', endTime: '2026-03-28 03:00', type: '維護更新', url: '/coinMaintenance', content: '星幣匯率調整', remark: '例行調整', whitelist: '', operator: 'casper', status: 'completed' },
];

let currentMaintTab = '全站';
let showHistory = false;

function getCurrentMaint() {
  const now = new Date();
  const tabData = maintData.filter(r => r.tab === currentMaintTab);
  if (showHistory) return tabData.filter(r => r.status === 'completed');
  // 顯示最新一筆（預定或進行中）
  const active = tabData.find(r => r.status === 'scheduled' || r.status === 'active');
  return active ? [active] : [];
}

function switchMaintTab(tab) {
  currentMaintTab = tab;
  showHistory = false;
  renderMaintenance();
}

function toggleHistory() {
  showHistory = !showHistory;
  renderMaintenance();
}

function renderMaintenance() {
  const container = document.getElementById('maintContent');
  // Tab buttons
  const tabs = UI.segmented([
    { label: '全站', active: currentMaintTab === '全站', onclick: "switchMaintTab('全站')" },
    { label: '星幣', active: currentMaintTab === '星幣', onclick: "switchMaintTab('星幣')" }
  ]);

  const historyBtn = `<button class="btn-add" onclick="toggleHistory()" style="margin-left:auto">${showHistory ? '← 返回' : UI.icon.clock + ' 歷史紀錄'}</button>`;

  let html = `<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">${tabs}${historyBtn}</div>`;

  if (showHistory) {
    html += renderHistoryTable();
  } else {
    html += renderMaintForm();
  }

  container.innerHTML = html;
  // 初始化 date picker
  if (!showHistory) initMaintDatePickers();
}

function renderMaintForm() {
  const items = getCurrentMaint();
  const item = items[0] || { startTime: '', endTime: '', type: '維護更新', url: '/systemMaintenance', content: '', remark: '', whitelist: '' };

  return `<div class="maint-form">
    <div class="form-row">
      <div class="form-group"><label>維護開始時間 <span style="color:#DC2626">*</span></label>
        <div class="date-picker-wrap" id="maintStart"><input type="text" placeholder="選擇時間日期" value="${item.startTime}" readonly></div>
      </div>
      <div class="form-group"><label>維護結束時間 <span style="color:#DC2626">*</span></label>
        <div class="date-picker-wrap" id="maintEnd"><input type="text" placeholder="選擇時間日期" value="${item.endTime}" readonly></div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>維護類型 <span style="color:#DC2626">*</span></label>
        <select class="form-control" id="maintType">
          <option${item.type==='維護更新'?' selected':''}>維護更新</option>
          <option${item.type==='緊急維護'?' selected':''}>緊急維護</option>
          <option${item.type==='版本更新'?' selected':''}>版本更新</option>
        </select>
      </div>
      <div class="form-group"><label>維護網址</label>
        <input type="text" class="form-control" id="maintUrl" value="${item.url}" disabled style="background:#F3F4F6;color:#6B7280">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>維護公告內容 <span style="color:#DC2626">*</span></label>
        <textarea class="form-control" id="maintContent" rows="3" placeholder="請輸入維護公告內容">${item.content}</textarea>
      </div>
      <div class="form-group"><label>備註 <span style="color:#DC2626">*</span></label>
        <textarea class="form-control" id="maintRemark" rows="3" placeholder="請輸入備註">${item.remark}</textarea>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>維護白名單域名</label>
        <input type="text" class="form-control" id="maintWhitelist" value="${item.whitelist}" disabled style="background:#F3F4F6;color:#6B7280">
      </div>
      <div class="form-group"></div>
    </div>
    <div style="display:flex;justify-content:flex-end;margin-top:16px">
      ${UI.btn.dark('儲存', 'saveMaintenance()')}
    </div>
  </div>`;
}

function renderHistoryTable() {
  const items = getCurrentMaint();
  if (items.length === 0) {
    return `<div style="text-align:center;padding:40px;color:#9CA3AF">尚無歷史紀錄</div>`;
  }

  const columns = [
    { label: '維護類型', width: '100px' },
    { label: '開始時間', width: '150px' },
    { label: '結束時間', width: '150px' },
    { label: '公告內容' },
    { label: '備註' },
    { label: '操作者', width: '80px' },
    { label: '狀態', width: '80px' }
  ];

  const rows = items.map(r => ({
    cells: [
      `<span style="font-weight:500">${r.type}</span>`,
      `<span style="color:#6B7280">${r.startTime}</span>`,
      `<span style="color:#6B7280">${r.endTime}</span>`,
      r.content,
      r.remark || '-',
      r.operator,
      `<span class="status-badge status-online">已完成</span>`
    ]
  }));

  return UI.table.create(columns, rows);
}

function initMaintDatePickers() {
  // date-picker.js 會自動初始化 .date-picker-wrap
  if (window.initDatePickers) window.initDatePickers();
}

function saveMaintenance() {
  const content = document.getElementById('maintContent')?.value;
  const remark = document.getElementById('maintRemark')?.value;
  if (!content || !remark) {
    UI.toast('請填寫必填欄位', 'error');
    return;
  }
  UI.toast('儲存成功');
}

// 初始渲染
document.addEventListener('DOMContentLoaded', renderMaintenance);
