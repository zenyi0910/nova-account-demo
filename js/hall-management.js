const halls = {
  VA: {name:'VA 娛樂廳',status:'on',gold:{enabled:true,min:10,max:100000,rate:'1:1'},star:{enabled:true,min:100,max:50000,rate:'10:1'},schedules:[{action:'off',start:'2026-05-10T03:00',end:'2026-05-10T05:00',note:'例行維護'}]},
  YGR: {name:'YGR 娛樂廳',status:'on',gold:{enabled:true,min:10,max:80000,rate:'1:1'},star:{enabled:true,min:100,max:30000,rate:'10:1'},schedules:[]},
  JDB: {name:'JDB 娛樂廳',status:'on',gold:{enabled:true,min:5,max:50000,rate:'1:1'},star:{enabled:true,min:50,max:20000,rate:'10:1'},schedules:[]},
  PG: {name:'PG 娛樂廳',status:'on',gold:{enabled:true,min:10,max:120000,rate:'1:1'},star:{enabled:false,min:0,max:0,rate:'0'},schedules:[]},
  PP: {name:'PP 娛樂廳',status:'off',gold:{enabled:true,min:10,max:90000,rate:'1:1'},star:{enabled:true,min:100,max:40000,rate:'10:1'},schedules:[{action:'on',start:'2026-05-12T10:00',end:'',note:'新廳上線'}]},
  CQ9: {name:'CQ9 娛樂廳',status:'on',gold:{enabled:true,min:10,max:60000,rate:'1:1'},star:{enabled:true,min:100,max:25000,rate:'10:1'},schedules:[]},
  RSG: {name:'RSG 娛樂廳',status:'on',gold:{enabled:true,min:20,max:100000,rate:'1:1'},star:{enabled:true,min:200,max:50000,rate:'10:1'},schedules:[]},
  FC: {name:'FC 娛樂廳',status:'on',gold:{enabled:true,min:10,max:70000,rate:'1:1'},star:{enabled:true,min:100,max:35000,rate:'10:1'},schedules:[]}
};

const games = [
  {id:1,hall:'VA',cat:'電子',name:'埃及三秘寶',status:'使用中',vip:'-',goldMin:10,goldMax:50000,starMin:100,starMax:30000},
  {id:2,hall:'VA',cat:'電子',name:'財神倍倍發 X4096',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:40000},
  {id:3,hall:'VA',cat:'電子',name:'印加祖瑪 豪華版',status:'停用中',vip:'-',goldMin:10,goldMax:60000,starMin:100,starMax:25000},
  {id:4,hall:'VA',cat:'電子',name:'財富金幣',status:'使用中',vip:'-',goldMin:10,goldMax:100000,starMin:100,starMax:50000},
  {id:5,hall:'VA',cat:'電子',name:'阿茲特克神話',status:'使用中',vip:'-',goldMin:10,goldMax:100000,starMin:100,starMax:50000},
  {id:6,hall:'VA',cat:'棋牌',name:'自摸無雙 2',status:'使用中',vip:'-',goldMin:20,goldMax:50000,starMin:200,starMax:30000},
  {id:7,hall:'VA',cat:'棋牌',name:'自摸無雙3',status:'使用中',vip:'-',goldMin:20,goldMax:50000,starMin:200,starMax:30000},
  {id:8,hall:'VA',cat:'電子',name:'法老祕寶',status:'使用中',vip:'-',goldMin:10,goldMax:100000,starMin:100,starMax:50000},
  {id:9,hall:'VA',cat:'電子',name:'印加女神',status:'使用中',vip:'-',goldMin:10,goldMax:100000,starMin:100,starMax:50000},
  {id:10,hall:'VA',cat:'電子',name:'星運雷神',status:'使用中',vip:'VIP 1',goldMin:50,goldMax:200000,starMin:500,starMax:100000},
  {id:11,hall:'VA',cat:'捕魚',name:'爆礦傳奇',status:'使用中',vip:'-',goldMin:10,goldMax:100000,starMin:100,starMax:50000},
  {id:12,hall:'VA',cat:'電子',name:'星運賽特',status:'使用中',vip:'-',goldMin:10,goldMax:100000,starMin:100,starMax:50000},
  {id:13,hall:'VA',cat:'棋牌',name:'自摸無雙',status:'使用中',vip:'-',goldMin:20,goldMax:50000,starMin:200,starMax:30000},
  {id:14,hall:'VA',cat:'棋牌',name:'自摸無雙 5',status:'使用中',vip:'-',goldMin:20,goldMax:50000,starMin:200,starMax:30000},
  {id:15,hall:'YGR',cat:'電子',name:'祖瑪探險',status:'即將上線',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000},
  {id:16,hall:'YGR',cat:'棋牌',name:'自摸財神',status:'停用中',vip:'-',goldMin:20,goldMax:60000,starMin:200,starMax:25000},
  {id:17,hall:'YGR',cat:'電子',name:'聚寶福祿壽',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000},
  {id:18,hall:'YGR',cat:'電子',name:'甜蜜聖誕',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000},
  {id:19,hall:'YGR',cat:'電子',name:'福來臨',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000},
  {id:20,hall:'YGR',cat:'捕魚',name:'祥龍獻瑞',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000},
  {id:21,hall:'YGR',cat:'電子',name:'龍族傳說6',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000},
  {id:22,hall:'YGR',cat:'電子',name:'龍族傳說7',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000},
  {id:23,hall:'YGR',cat:'電子',name:'賽特神話',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000},
  {id:24,hall:'YGR',cat:'捕魚',name:'王國秘寶',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000},
  {id:25,hall:'JDB',cat:'電子',name:'彩虹軟糖',status:'使用中',vip:'-',goldMin:5,goldMax:50000,starMin:50,starMax:20000},
  {id:26,hall:'JDB',cat:'電子',name:'鐵道富翁',status:'使用中',vip:'-',goldMin:5,goldMax:50000,starMin:50,starMax:20000},
  {id:27,hall:'JDB',cat:'捕魚',name:'豬滿滿',status:'使用中',vip:'-',goldMin:5,goldMax:50000,starMin:50,starMax:20000},
  {id:28,hall:'JDB',cat:'棋牌',name:'天上聖母',status:'使用中',vip:'-',goldMin:5,goldMax:50000,starMin:50,starMax:20000},
  {id:29,hall:'PG',cat:'電子',name:'麻將之路',status:'使用中',vip:'-',goldMin:10,goldMax:120000,starMin:0,starMax:0},
  {id:30,hall:'PG',cat:'電子',name:'寶石傳奇',status:'使用中',vip:'-',goldMin:10,goldMax:120000,starMin:0,starMax:0},
  {id:31,hall:'CQ9',cat:'電子',name:'跳跳樂',status:'使用中',vip:'-',goldMin:10,goldMax:60000,starMin:100,starMax:25000},
  {id:32,hall:'CQ9',cat:'捕魚',name:'捕魚達人',status:'使用中',vip:'-',goldMin:10,goldMax:60000,starMin:100,starMax:25000},
  {id:33,hall:'RSG',cat:'電子',name:'金猴爺',status:'使用中',vip:'-',goldMin:20,goldMax:100000,starMin:200,starMax:50000},
  {id:34,hall:'RSG',cat:'棋牌',name:'德州撲克',status:'使用中',vip:'-',goldMin:20,goldMax:100000,starMin:200,starMax:50000},
  {id:35,hall:'FC',cat:'電子',name:'招財進寶',status:'使用中',vip:'-',goldMin:10,goldMax:70000,starMin:100,starMax:35000},
  {id:36,hall:'FC',cat:'捕魚',name:'深海獵手',status:'使用中',vip:'-',goldMin:10,goldMax:70000,starMin:100,starMax:35000}
];

let pendingToggle = null;
let currentHall = 'VA';

// === Hall Selector ===
function initHallSelector() {
  const sel = document.getElementById('hallSelect');
  sel.innerHTML = Object.entries(halls).map(([id, h]) => {
    const statusDot = h.status === 'on' ? '●' : '○';
    return '<option value="' + id + '">' + statusDot + ' ' + h.name + '</option>';
  }).join('');
  sel.value = currentHall;
}

function switchHall() {
  currentHall = document.getElementById('hallSelect').value;
  renderHallDetail();
  renderTable();
}

// === Render Single Hall Detail ===
function renderHallDetail() {
  const id = currentHall;
  const h = halls[id];
  const isOn = h.status === 'on';
  const gameCount = games.filter(g => g.hall === id).length;

  let schedHtml = '<div class="sched-empty">尚無排程</div>';
  if (h.schedules.length > 0) {
    schedHtml = h.schedules.map((s, i) => {
      return '<div class="sched-item">' +
        '<svg class="sched-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
        '<div class="sched-text"><span class="sched-time">' + fmtDT(s.start) + '</span>' +
        (s.end ? ' ~ <span class="sched-time">' + fmtDT(s.end) + '</span>' : ' (手動恢復)') +
        ' <span class="sched-action ' + s.action + '">' + (s.action === 'off' ? '關閉' : '開啟') + '</span>' +
        (s.note ? ' — ' + s.note : '') + '</div>' +
        '<button class="del-btn" onclick="delSched(\'' + id + '\',' + i + ')" title="刪除">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>';
    }).join('');
  }

  const html = '<div class="hall-card">' +
    '<div class="hall-header">' +
      '<span class="hall-name">' + h.name + '</span>' +
      '<span class="hall-meta">(' + gameCount + ' 款遊戲)</span>' +
      '<span class="spacer"></span>' +
      '<button class="btn btn-outline btn-sm" onclick="openCurrModal(\'' + id + '\')">幣種設定</button>' +
      '<button class="toggle ' + h.status + '" onclick="requestToggle(\'' + id + '\')"></button>' +
    '</div>' +
    '<div class="hall-body"><div class="hall-sections">' +
      '<div class="sec-card gold"><div class="sec-title">' +
        '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8M9 14h6"/></svg>' +
        '金幣<span class="sec-badge ' + (h.gold.enabled ? 'on' : 'off') + '">' + (h.gold.enabled ? '啟用' : '停用') + '</span></div>' +
        '<div class="curr-row"><div class="curr-field"><label>最低投注</label><span class="val">$' + h.gold.min.toLocaleString() + '</span></div>' +
        '<div class="curr-field"><label>最高投注</label><span class="val">$' + h.gold.max.toLocaleString() + '</span></div>' +
        '<div class="curr-field"><label>兌換比率</label><span class="val">' + h.gold.rate + '</span></div></div></div>' +
      '<div class="sec-card star"><div class="sec-title">' +
        '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
        '星幣<span class="sec-badge ' + (h.star.enabled ? 'on' : 'off') + '">' + (h.star.enabled ? '啟用' : '停用') + '</span></div>' +
        '<div class="curr-row"><div class="curr-field"><label>最低投注</label><span class="val">' + (h.star.enabled ? '$' + h.star.min.toLocaleString() : '-') + '</span></div>' +
        '<div class="curr-field"><label>最高投注</label><span class="val">' + (h.star.enabled ? '$' + h.star.max.toLocaleString() : '-') + '</span></div>' +
        '<div class="curr-field"><label>兌換比率</label><span class="val">' + (h.star.enabled ? h.star.rate : '-') + '</span></div></div></div>' +
      '<div class="sec-card sched"><div class="sec-title">' +
        '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
        '排程開關<button class="add-sched-btn" onclick="openSchedModal(\'' + id + '\')">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:10px;height:10px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新增</button></div>' +
        schedHtml + '</div>' +
    '</div></div></div>';

  document.getElementById('hallDetail').innerHTML = html;
  // hide old hallCards container
  document.getElementById('hallCards').innerHTML = '';
}

// === Render Game Table ===
function renderTable() {
  const nameF = document.getElementById('filterName').value.toLowerCase();
  const hallF = document.getElementById('filterHall').value;
  const statusF = document.getElementById('filterStatus').value;
  const catF = document.getElementById('filterCat').value;
  const filtered = games.filter(g => {
    if (nameF && !g.name.toLowerCase().includes(nameF)) return false;
    if (hallF && g.hall !== hallF) return false;
    if (statusF && g.status !== statusF) return false;
    if (catF && g.cat !== catF) return false;
    return true;
  });
  document.getElementById('gameCount').textContent = filtered.length + ' 筆';
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = filtered.map(g => {
    const h = halls[g.hall];
    const bc = g.status === '使用中' ? 'badge-on' : g.status === '停用中' ? 'badge-off' : g.status === '維護中' ? 'badge-maint' : 'badge-soon';
    const goldOv = h.gold.min !== g.goldMin || h.gold.max !== g.goldMax;
    const starOv = h.star.min !== g.starMin || h.star.max !== g.starMax;
    const hasOv = goldOv || starOv;
    const goldD = goldOv
      ? '<span class="val override">$' + h.gold.min.toLocaleString() + '~$' + h.gold.max.toLocaleString() + '</span><br><span class="orig">$' + g.goldMin.toLocaleString() + '~$' + g.goldMax.toLocaleString() + '</span>'
      : '$' + g.goldMin.toLocaleString() + ' ~ $' + g.goldMax.toLocaleString();
    const starD = starOv
      ? '<span class="val override">$' + h.star.min.toLocaleString() + '~$' + h.star.max.toLocaleString() + '</span><br><span class="orig">$' + g.starMin.toLocaleString() + '~$' + g.starMax.toLocaleString() + '</span>'
      : '$' + g.starMin.toLocaleString() + ' ~ $' + g.starMax.toLocaleString();
    const ovCol = hasOv ? '<span class="override-indicator">廳級覆蓋</span>' : '<span class="inherit-indicator">原始設定</span>';
    return '<tr><td>' + g.id + '</td><td>' + g.hall + '</td><td>' + g.cat + '</td><td style="font-weight:500">' + g.name + '</td><td><span class="badge ' + bc + '">' + g.status + '</span></td><td>' + g.vip + '</td><td style="font-size:11px">' + goldD + '</td><td style="font-size:11px">' + starD + '</td><td>' + ovCol + '</td><td><button class="btn btn-outline btn-sm" onclick="showToast(\'遊戲詳情（Demo）\',\'success\')">詳情</button></td></tr>';
  }).join('');
}

function filterGames() { renderTable(); }

// === Populate filter dropdowns dynamically ===
function initFilters() {
  // Hall filter
  const hallSel = document.getElementById('filterHall');
  hallSel.innerHTML = '<option value="">所有娛樂廳</option>' +
    Object.entries(halls).map(([id, h]) => '<option value="' + id + '">' + id + '</option>').join('');
  // Cat filter - collect unique categories
  const cats = [...new Set(games.map(g => g.cat))].sort();
  const catSel = document.getElementById('filterCat');
  catSel.innerHTML = '<option value="">所有種類</option>' +
    cats.map(c => '<option>' + c + '</option>').join('');
}

// === Toggle Hall ===
function requestToggle(id) {
  const h = halls[id];
  const ns = h.status === 'on' ? 'off' : 'on';
  const act = ns === 'off' ? '關閉' : '開啟';
  const gc = games.filter(g => g.hall === id).length;
  pendingToggle = { id, newState: ns };
  document.getElementById('toggleMsg').innerHTML = '確定要<strong>' + act + ' ' + h.name + '</strong>？<br><br>此操作將影響該廳下 <strong>' + gc + '</strong> 款遊戲。' + (ns === 'off' ? '<br><span style="color:#DC2626">關閉後玩家將無法進入該廳所有遊戲。</span>' : '');
  document.getElementById('toggleConfirmBtn').textContent = '確認' + act;
  document.getElementById('toggleConfirmBtn').className = ns === 'off' ? 'btn btn-danger' : 'btn btn-primary';
  document.getElementById('toggleConfirm').classList.add('show');
}

function confirmToggle() {
  if (!pendingToggle) return;
  halls[pendingToggle.id].status = pendingToggle.newState;
  closeModal('toggleConfirm');
  initHallSelector();
  renderHallDetail();
  showToast(halls[pendingToggle.id].name + (pendingToggle.newState === 'on' ? ' 已開啟' : ' 已關閉'), pendingToggle.newState === 'on' ? 'success' : 'warning');
  pendingToggle = null;
}

// === Schedule ===
function openSchedModal(id) {
  document.getElementById('sHall').value = id;
  document.getElementById('sStart').value = '';
  document.getElementById('sEnd').value = '';
  document.getElementById('sNote').value = '';
  document.getElementById('schedModal').classList.add('show');
}

function addSchedule() {
  const id = document.getElementById('sHall').value;
  const action = document.getElementById('sAction').value;
  const start = document.getElementById('sStart').value;
  const end = document.getElementById('sEnd').value;
  const note = document.getElementById('sNote').value;
  if (!start) { showToast('請選擇開始時間', 'error'); return; }
  halls[id].schedules.push({ action, start, end, note });
  closeModal('schedModal');
  renderHallDetail();
  showToast('排程已新增：' + halls[id].name, 'success');
}

function delSched(id, idx) {
  halls[id].schedules.splice(idx, 1);
  renderHallDetail();
  showToast('排程已刪除', 'warning');
}

// === Currency Modal ===
function openCurrModal(id) {
  const h = halls[id];
  document.getElementById('currModalTitle').textContent = h.name + ' — 幣種設定';
  document.getElementById('cGoldMin').value = h.gold.min;
  document.getElementById('cGoldMax').value = h.gold.max;
  document.getElementById('cGoldRate').value = h.gold.rate;
  document.getElementById('cGoldStatus').value = h.gold.enabled ? 'on' : 'off';
  document.getElementById('cStarMin').value = h.star.min;
  document.getElementById('cStarMax').value = h.star.max;
  document.getElementById('cStarRate').value = h.star.rate;
  document.getElementById('cStarStatus').value = h.star.enabled ? 'on' : 'off';
  document.getElementById('currModal').dataset.hall = id;
  document.getElementById('currModal').classList.add('show');
}

function saveCurr() {
  const id = document.getElementById('currModal').dataset.hall;
  halls[id].gold.min = parseInt(document.getElementById('cGoldMin').value) || 0;
  halls[id].gold.max = parseInt(document.getElementById('cGoldMax').value) || 0;
  halls[id].gold.rate = document.getElementById('cGoldRate').value;
  halls[id].gold.enabled = document.getElementById('cGoldStatus').value === 'on';
  halls[id].star.min = parseInt(document.getElementById('cStarMin').value) || 0;
  halls[id].star.max = parseInt(document.getElementById('cStarMax').value) || 0;
  halls[id].star.rate = document.getElementById('cStarRate').value;
  halls[id].star.enabled = document.getElementById('cStarStatus').value === 'on';
  closeModal('currModal');
  renderHallDetail();
  renderTable();
  showToast('幣種設定已儲存：' + halls[id].name, 'success');
}

// === Utilities ===
function closeModal(id) { document.getElementById(id).classList.remove('show'); }

function fmtDT(dt) {
  if (!dt) return '';
  const d = new Date(dt);
  return d.toLocaleDateString('zh-TW') + ' ' + d.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
}

function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast ' + type + ' show';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = 'toast'; }, 2500);
}

function toggleSidebarMobile() {
  if (window.innerWidth <= 768) {
    document.querySelector('.sidebar').classList.toggle('show');
  } else {
    document.body.classList.toggle('sidebar-collapsed');
  }
}

function toggleSub(id) {
  const el = document.getElementById(id);
  el.classList.toggle('open');
  const chev = el.previousElementSibling ? el.previousElementSibling.querySelector('.sidebar-chevron') : null;
  if (chev) chev.classList.toggle('open');
}

// === Init ===
initHallSelector();
initFilters();
renderHallDetail();
renderTable();
