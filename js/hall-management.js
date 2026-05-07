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
  {id:1,hall:'VA',cat:'電子',name:'埃及三秘寶',status:'使用中',vip:'-',goldMin:10,goldMax:50000,starMin:100,starMax:30000,tag:'-',recommend:false,note:''},
  {id:2,hall:'VA',cat:'電子',name:'財神倍倍發 X4096',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:40000,tag:'-',recommend:false,note:''},
  {id:3,hall:'VA',cat:'電子',name:'印加祖瑪 豪華版',status:'停用中',vip:'-',goldMin:10,goldMax:60000,starMin:100,starMax:25000,tag:'推薦',recommend:true,note:''},
  {id:4,hall:'VA',cat:'電子',name:'財富金幣',status:'使用中',vip:'-',goldMin:10,goldMax:100000,starMin:100,starMax:50000,tag:'-',recommend:false,note:''},
  {id:5,hall:'VA',cat:'電子',name:'阿茲特克神話',status:'使用中',vip:'-',goldMin:10,goldMax:100000,starMin:100,starMax:50000,tag:'-',recommend:false,note:''},
  {id:6,hall:'VA',cat:'棋牌',name:'自摸無雙 2',status:'使用中',vip:'-',goldMin:20,goldMax:50000,starMin:200,starMax:30000,tag:'-',recommend:false,note:''},
  {id:7,hall:'VA',cat:'棋牌',name:'自摸無雙3',status:'使用中',vip:'-',goldMin:20,goldMax:50000,starMin:200,starMax:30000,tag:'-',recommend:false,note:''},
  {id:8,hall:'VA',cat:'電子',name:'法老祕寶',status:'使用中',vip:'-',goldMin:10,goldMax:100000,starMin:100,starMax:50000,tag:'-',recommend:true,note:''},
  {id:9,hall:'VA',cat:'電子',name:'印加女神',status:'使用中',vip:'-',goldMin:10,goldMax:100000,starMin:100,starMax:50000,tag:'-',recommend:false,note:''},
  {id:10,hall:'VA',cat:'電子',name:'星運雷神',status:'使用中',vip:'VIP 1',goldMin:50,goldMax:200000,starMin:500,starMax:100000,tag:'熱門',recommend:true,note:''},
  {id:11,hall:'VA',cat:'捕魚',name:'爆礦傳奇',status:'使用中',vip:'-',goldMin:10,goldMax:100000,starMin:100,starMax:50000,tag:'-',recommend:false,note:''},
  {id:12,hall:'VA',cat:'電子',name:'星運賽特',status:'使用中',vip:'-',goldMin:10,goldMax:100000,starMin:100,starMax:50000,tag:'-',recommend:false,note:''},
  {id:13,hall:'VA',cat:'棋牌',name:'自摸無雙',status:'使用中',vip:'-',goldMin:20,goldMax:50000,starMin:200,starMax:30000,tag:'-',recommend:false,note:''},
  {id:14,hall:'VA',cat:'棋牌',name:'自摸無雙 5',status:'使用中',vip:'-',goldMin:20,goldMax:50000,starMin:200,starMax:30000,tag:'-',recommend:false,note:''},
  {id:15,hall:'YGR',cat:'電子',name:'祖瑪探險',status:'即將上線',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000,tag:'-',recommend:false,note:''},
  {id:16,hall:'YGR',cat:'棋牌',name:'自摸財神',status:'停用中',vip:'-',goldMin:20,goldMax:60000,starMin:200,starMax:25000,tag:'-',recommend:false,note:''},
  {id:17,hall:'YGR',cat:'電子',name:'聚寶福祿壽',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000,tag:'-',recommend:false,note:''},
  {id:18,hall:'YGR',cat:'電子',name:'甜蜜聖誕',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000,tag:'-',recommend:false,note:''},
  {id:19,hall:'YGR',cat:'電子',name:'福來臨',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000,tag:'-',recommend:false,note:''},
  {id:20,hall:'YGR',cat:'捕魚',name:'祥龍獻瑞',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000,tag:'-',recommend:false,note:''},
  {id:21,hall:'YGR',cat:'電子',name:'龍族傳說6',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000,tag:'-',recommend:false,note:''},
  {id:22,hall:'YGR',cat:'電子',name:'龍族傳說7',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000,tag:'-',recommend:false,note:''},
  {id:23,hall:'YGR',cat:'電子',name:'賽特神話',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000,tag:'-',recommend:false,note:''},
  {id:24,hall:'YGR',cat:'捕魚',name:'王國秘寶',status:'使用中',vip:'-',goldMin:10,goldMax:80000,starMin:100,starMax:30000,tag:'-',recommend:false,note:''},
  {id:25,hall:'JDB',cat:'電子',name:'彩虹軟糖',status:'使用中',vip:'-',goldMin:5,goldMax:50000,starMin:50,starMax:20000,tag:'-',recommend:false,note:''},
  {id:26,hall:'JDB',cat:'電子',name:'鐵道富翁',status:'使用中',vip:'-',goldMin:5,goldMax:50000,starMin:50,starMax:20000,tag:'-',recommend:false,note:''},
  {id:27,hall:'JDB',cat:'捕魚',name:'豬滿滿',status:'使用中',vip:'-',goldMin:5,goldMax:50000,starMin:50,starMax:20000,tag:'-',recommend:false,note:''},
  {id:28,hall:'JDB',cat:'棋牌',name:'天上聖母',status:'使用中',vip:'-',goldMin:5,goldMax:50000,starMin:50,starMax:20000,tag:'-',recommend:false,note:''},
  {id:29,hall:'PG',cat:'電子',name:'麻將之路',status:'使用中',vip:'-',goldMin:10,goldMax:120000,starMin:0,starMax:0,tag:'-',recommend:false,note:''},
  {id:30,hall:'PG',cat:'電子',name:'寶石傳奇',status:'使用中',vip:'-',goldMin:10,goldMax:120000,starMin:0,starMax:0,tag:'-',recommend:false,note:''},
  {id:31,hall:'CQ9',cat:'電子',name:'跳跳樂',status:'使用中',vip:'-',goldMin:10,goldMax:60000,starMin:100,starMax:25000,tag:'-',recommend:false,note:''},
  {id:32,hall:'CQ9',cat:'捕魚',name:'捕魚達人',status:'使用中',vip:'-',goldMin:10,goldMax:60000,starMin:100,starMax:25000,tag:'-',recommend:false,note:''},
  {id:33,hall:'RSG',cat:'電子',name:'金猴爺',status:'使用中',vip:'-',goldMin:20,goldMax:100000,starMin:200,starMax:50000,tag:'-',recommend:false,note:''},
  {id:34,hall:'RSG',cat:'棋牌',name:'德州撲克',status:'使用中',vip:'-',goldMin:20,goldMax:100000,starMin:200,starMax:50000,tag:'-',recommend:false,note:''},
  {id:35,hall:'FC',cat:'電子',name:'招財進寶',status:'使用中',vip:'-',goldMin:10,goldMax:70000,starMin:100,starMax:35000,tag:'-',recommend:false,note:''},
  {id:36,hall:'FC',cat:'捕魚',name:'深海獵手',status:'使用中',vip:'-',goldMin:10,goldMax:70000,starMin:100,starMax:35000,tag:'-',recommend:false,note:''}
];

const commonTags = ['刮刮樂','連消','推薦','星幣','最新','熱門','限制'];

let pendingToggle = null;
let currentHall = 'VA';
let currentDetailId = null;

// === Hall Selector (now horizontal tabs with arrows) ===
function initHallSelector() {
  const container = document.getElementById('hallCards');
  const tabsHtml = Object.entries(halls).map(([id, h]) => {
    const dotColor = h.status === 'on' ? '#22C55E' : '#EF4444';
    const gc = games.filter(g => g.hall === id).length;
    return '<div class="hall-tab' + (id === currentHall ? ' active' : '') + '" onclick="selectHall(\'' + id + '\')">' +
      '<div class="ht-name"><span class="dot" style="background:' + dotColor + '"></span>' + h.name + '</div>' +
      '<div class="ht-meta">' + gc + ' 款遊戲</div></div>';
  }).join('');
  container.innerHTML = '<div class="hall-tabs-wrapper">' +
    '<button class="hall-tabs-arrow arr-left" id="arrLeft" onclick="scrollTabs(-1)">&#8249;</button>' +
    '<div class="hall-tabs-scroll-area" id="hallTabsArea">' +
    '<div class="hall-tabs" id="hallTabsScroll">' + tabsHtml + '</div></div>' +
    '<button class="hall-tabs-arrow arr-right" id="arrRight" onclick="scrollTabs(1)">&#8250;</button></div>';
  // Update gradient state after render
  setTimeout(updateScrollGradients, 50);
}

function scrollTabs(dir) {
  const el = document.getElementById('hallTabsArea');
  el.scrollBy({ left: dir * 200, behavior: 'smooth' });
  setTimeout(updateScrollGradients, 350);
}

function updateScrollGradients() {
  const area = document.getElementById('hallTabsArea');
  if (!area) return;
  const atStart = area.scrollLeft <= 5;
  const atEnd = area.scrollLeft + area.clientWidth >= area.scrollWidth - 5;
  const left = document.getElementById('arrLeft');
  const right = document.getElementById('arrRight');
  if (left) left.classList.toggle('show-grad', !atStart);
  if (right) right.classList.toggle('hide-grad', atEnd);
}

function selectHall(id) {
  currentHall = id;
  initHallSelector();
  renderHallDetail();
  renderTable();
}

// === Render Hall Detail ===
function renderHallDetail() {
  if (!currentHall) {
    document.getElementById('hallDetail').innerHTML = '';
    document.getElementById('hallCards').innerHTML = '';
    return;
  }
  const id = currentHall;
  const h = halls[id];
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
      '<button class="toggle ' + h.status + '" onclick="requestToggle(\'' + id + '\')"></button>' +
    '</div>' +
    '<div class="hall-body"><div class="hall-sections">' +
      '<div class="sec-card gold"><div class="sec-title">' +
        '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8M9 14h6"/></svg>' +
        '金幣<span class="sec-badge ' + (h.gold.enabled ? 'on' : 'off') + '">' + (h.gold.enabled ? '啟用' : '停用') + '</span>' +
        '<span class="spacer"></span><button class="edit-inline-btn" onclick="toggleCurrEdit(\'' + id + '\',\'gold\')">修改</button></div>' +
        '<div class="curr-row" id="currGold_' + id + '">' + renderCurrFields(h.gold, id, 'gold', false) + '</div></div>' +
      '<div class="sec-card star"><div class="sec-title">' +
        '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
        '星幣<span class="sec-badge ' + (h.star.enabled ? 'on' : 'off') + '">' + (h.star.enabled ? '啟用' : '停用') + '</span>' +
        '<span class="spacer"></span><button class="edit-inline-btn" onclick="toggleCurrEdit(\'' + id + '\',\'star\')">修改</button></div>' +
        '<div class="curr-row" id="currStar_' + id + '">' + renderCurrFields(h.star, id, 'star', false) + '</div></div>' +
      '<div class="sec-card sched"><div class="sec-title">' +
        '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
        '排程開關<button class="add-sched-btn" onclick="openSchedModal(\'' + id + '\')">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:10px;height:10px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新增</button></div>' +
        schedHtml + '</div>' +
    '</div></div></div>';

  document.getElementById('hallDetail').innerHTML = html;
}

// === Inline Currency Edit ===
function renderCurrFields(curr, hallId, type, editing) {
  if (!curr.enabled) {
    return '<div class="curr-field"><label>最低投注</label><span class="val">-</span></div>' +
      '<div class="curr-field"><label>最高投注</label><span class="val">-</span></div>' +
      '<div class="curr-field"><label>兌換比率</label><span class="val">-</span></div>';
  }
  if (editing) {
    return '<div class="curr-field"><label>最低投注</label><input class="curr-input" id="edit_' + type + '_min_' + hallId + '" value="' + curr.min + '"></div>' +
      '<div class="curr-field"><label>最高投注</label><input class="curr-input" id="edit_' + type + '_max_' + hallId + '" value="' + curr.max + '"></div>' +
      '<div class="curr-field"><label>兌換比率</label><input class="curr-input" id="edit_' + type + '_rate_' + hallId + '" value="' + curr.rate + '"></div>' +
      '<div class="curr-actions">' +
        '<button class="curr-save" onclick="saveCurrEdit(\'' + hallId + '\',\'' + type + '\')" title="儲存">&#10003;</button>' +
        '<button class="curr-cancel" onclick="cancelCurrEdit(\'' + hallId + '\',\'' + type + '\')" title="取消">&#10005;</button></div>';
  }
  return '<div class="curr-field"><label>最低投注</label><span class="val">$' + curr.min.toLocaleString() + '</span></div>' +
    '<div class="curr-field"><label>最高投注</label><span class="val">$' + curr.max.toLocaleString() + '</span></div>' +
    '<div class="curr-field"><label>兌換比率</label><span class="val">' + curr.rate + '</span></div>';
}

function toggleCurrEdit(hallId, type) {
  const h = halls[hallId];
  const curr = type === 'gold' ? h.gold : h.star;
  const container = document.getElementById('curr' + (type === 'gold' ? 'Gold' : 'Star') + '_' + hallId);
  container.innerHTML = renderCurrFields(curr, hallId, type, true);
}

function saveCurrEdit(hallId, type) {
  const h = halls[hallId];
  const curr = type === 'gold' ? h.gold : h.star;
  const minVal = parseInt(document.getElementById('edit_' + type + '_min_' + hallId).value) || curr.min;
  const maxVal = parseInt(document.getElementById('edit_' + type + '_max_' + hallId).value) || curr.max;
  const rateVal = document.getElementById('edit_' + type + '_rate_' + hallId).value || curr.rate;
  curr.min = minVal;
  curr.max = maxVal;
  curr.rate = rateVal;
  const container = document.getElementById('curr' + (type === 'gold' ? 'Gold' : 'Star') + '_' + hallId);
  container.innerHTML = renderCurrFields(curr, hallId, type, false);
  renderTable();
}

function cancelCurrEdit(hallId, type) {
  const h = halls[hallId];
  const curr = type === 'gold' ? h.gold : h.star;
  const container = document.getElementById('curr' + (type === 'gold' ? 'Gold' : 'Star') + '_' + hallId);
  container.innerHTML = renderCurrFields(curr, hallId, type, false);
}

// === Render Game Table ===
function renderTable() {
  const nameF = document.getElementById('filterName').value.toLowerCase();
  const hallF = currentHall;
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
    return '<tr><td>' + g.id + '</td><td>' + g.hall + '</td><td>' + g.cat + '</td><td style="font-weight:500">' + g.name + '</td><td><span class="badge ' + bc + '">' + g.status + '</span></td><td>' + g.vip + '</td><td style="font-size:11px">' + goldD + '</td><td style="font-size:11px">' + starD + '</td><td>' + ovCol + '</td><td><button class="btn btn-outline btn-sm" onclick="openDetail(' + g.id + ')">詳情</button></td></tr>';
  }).join('');
}

function filterGames() { renderTable(); }

function initFilters() {
  const cats = [...new Set(games.map(g => g.cat))].sort();
  const catSel = document.getElementById('filterCat');
  catSel.innerHTML = '<option value="">所有種類</option>' + cats.map(c => '<option>' + c + '</option>').join('');
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

// === Game Detail Modal ===
function openDetail(gameId) {
  const g = games.find(x => x.id === gameId);
  if (!g) return;
  currentDetailId = gameId;
  document.getElementById('detailTitle').textContent = g.name + ' — 遊戲詳情';
  const h = halls[g.hall];
  const goldOv = h.gold.min !== g.goldMin || h.gold.max !== g.goldMax;
  const starOv = h.star.min !== g.starMin || h.star.max !== g.starMax;

  let html = '<div class="detail-section"><h6>基本資訊</h6>' +
    '<div class="form-row"><div class="form-group"><label>娛樂廳</label><input type="text" value="' + g.hall + ' 娛樂廳" disabled></div>' +
    '<div class="form-group"><label>種類</label><input type="text" value="' + g.cat + '" disabled></div></div>' +
    '<div class="form-row"><div class="form-group"><label>狀態</label><select id="dStatus"><option' + (g.status==='使用中'?' selected':'') + '>使用中</option><option' + (g.status==='停用中'?' selected':'') + '>停用中</option><option' + (g.status==='維護中'?' selected':'') + '>維護中</option><option' + (g.status==='即將上線'?' selected':'') + '>即將上線</option></select></div>' +
    '<div class="form-group"><label>VIP 等級限制</label><select id="dVip"><option value="-"' + (g.vip==='-'?' selected':'') + '>不限制</option><option value="VIP 1"' + (g.vip==='VIP 1'?' selected':'') + '>VIP 1</option><option value="VIP 2"' + (g.vip==='VIP 2'?' selected':'') + '>VIP 2</option><option value="VIP 3"' + (g.vip==='VIP 3'?' selected':'') + '>VIP 3</option></select></div></div>' +
    '<div class="form-group"><label>標籤</label><select id="dTag"><option value="-">無</option>' + commonTags.map(t => '<option' + (g.tag===t?' selected':'') + '>' + t + '</option>').join('') + '</select></div>' +
    '<div class="form-group"><label>備註</label><input type="text" id="dNote" value="' + (g.note||'') + '" placeholder="選填"></div></div>';

  html += '<div class="detail-section"><h6><span class="dot" style="background:#D97706"></span>金幣投注設定</h6>' +
    (goldOv ? '<div class="info-box" style="margin-bottom:10px">目前為廳級覆蓋（' + h.name + '：$' + h.gold.min.toLocaleString() + ' ~ $' + h.gold.max.toLocaleString() + '）</div>' : '') +
    '<div class="form-row"><div class="form-group"><label>最低投注</label><input type="number" id="dGoldMin" value="' + g.goldMin + '"></div>' +
    '<div class="form-group"><label>最高投注</label><input type="number" id="dGoldMax" value="' + g.goldMax + '"></div></div></div>';

  html += '<div class="detail-section"><h6><span class="dot" style="background:#7C3AED"></span>星幣投注設定</h6>' +
    (starOv ? '<div class="info-box" style="margin-bottom:10px">目前為廳級覆蓋（' + h.name + '：$' + h.star.min.toLocaleString() + ' ~ $' + h.star.max.toLocaleString() + '）</div>' : '') +
    '<div class="form-row"><div class="form-group"><label>最低投注</label><input type="number" id="dStarMin" value="' + g.starMin + '"></div>' +
    '<div class="form-group"><label>最高投注</label><input type="number" id="dStarMax" value="' + g.starMax + '"></div></div></div>';

  html += '<div class="detail-section"><h6>推薦設定</h6>' +
    '<div class="form-group"><label><input type="checkbox" id="dRecommend"' + (g.recommend?' checked':'') + '> 加入推薦列表（近期爆獎 / 最受歡迎）</label></div></div>';

  document.getElementById('detailBody').innerHTML = html;
  document.getElementById('detailModal').classList.add('show');
}

function saveDetail() {
  const g = games.find(x => x.id === currentDetailId);
  if (!g) return;
  g.status = document.getElementById('dStatus').value;
  g.vip = document.getElementById('dVip').value;
  g.tag = document.getElementById('dTag').value;
  g.note = document.getElementById('dNote').value;
  g.goldMin = parseInt(document.getElementById('dGoldMin').value) || 0;
  g.goldMax = parseInt(document.getElementById('dGoldMax').value) || 0;
  g.starMin = parseInt(document.getElementById('dStarMin').value) || 0;
  g.starMax = parseInt(document.getElementById('dStarMax').value) || 0;
  g.recommend = document.getElementById('dRecommend').checked;
  closeModal('detailModal');
  renderTable();
  showToast(g.name + ' 設定已儲存', 'success');
}

// === Common Settings Modal ===
function openCommonModal() {
  document.getElementById('commonModal').classList.add('show');
  switchCommonTab('maint');
}

function switchCommonTab(tab) {
  document.querySelectorAll('.common-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  const container = document.getElementById('commonTabContent');
  if (tab === 'maint') renderMaintTab(container);
  else if (tab === 'recommend') renderRecommendTab(container);
  else renderTagsTab(container);
}

function renderMaintTab(el) {
  let html = '<div style="margin-bottom:12px;font-size:12px;color:#6B7280">批次設定遊戲維護狀態，不需逐一操作</div>';
  html += '<div style="display:flex;gap:8px;margin-bottom:12px"><select id="maintHallFilter" onchange="renderMaintList()" style="padding:5px 10px;border:1px solid oklch(0.922 0 0);border-radius:5px;font-size:12px;font-family:inherit"><option value="">所有娛樂廳</option>' +
    Object.keys(halls).map(k => '<option value="' + k + '">' + k + '</option>').join('') + '</select>' +
    '<select id="maintStatusFilter" onchange="renderMaintList()" style="padding:5px 10px;border:1px solid oklch(0.922 0 0);border-radius:5px;font-size:12px;font-family:inherit"><option value="">所有狀態</option><option>使用中</option><option>停用中</option><option>維護中</option><option>即將上線</option></select></div>';
  html += '<div id="maintList"></div>';
  el.innerHTML = html;
  renderMaintList();
}

function renderMaintList() {
  const hf = document.getElementById('maintHallFilter').value;
  const sf = document.getElementById('maintStatusFilter').value;
  let list = games.filter(g => {
    if (hf && g.hall !== hf) return false;
    if (sf && g.status !== sf) return false;
    return true;
  }).slice(0, 15);
  const html = list.map(g => {
    const bc = g.status === '使用中' ? 'badge-on' : g.status === '停用中' ? 'badge-off' : g.status === '維護中' ? 'badge-maint' : 'badge-soon';
    return '<div class="maint-row"><span style="font-size:10px;color:#9CA3AF;width:20px">' + g.id + '</span><span class="maint-name">' + g.name + '</span><span style="font-size:10px;color:#6B7280">' + g.hall + '</span><span class="badge ' + bc + '" style="font-size:10px">' + g.status + '</span>' +
      '<select onchange="changeMaintStatus(' + g.id + ',this.value)" style="padding:3px 6px;border:1px solid oklch(0.922 0 0);border-radius:4px;font-size:11px"><option value="">變更...</option><option value="使用中">使用中</option><option value="停用中">停用中</option><option value="維護中">維護中</option><option value="即將上線">即將上線</option></select></div>';
  }).join('');
  document.getElementById('maintList').innerHTML = html || '<div style="font-size:12px;color:#9CA3AF;padding:12px">無符合條件的遊戲</div>';
}

function changeMaintStatus(id, val) {
  if (!val) return;
  const g = games.find(x => x.id === id);
  if (g) { g.status = val; renderMaintList(); renderTable(); showToast(g.name + ' → ' + val, 'success'); }
}

function renderRecommendTab(el) {
  const recommended = games.filter(g => g.recommend);
  let html = '<div style="margin-bottom:10px;font-size:12px;color:#6B7280">管理推薦遊戲列表（近期爆獎 / 最受歡迎）</div>';
  html += '<table class="recommend-table"><thead><tr><th>順序</th><th>娛樂廳</th><th>遊戲名稱</th><th>操作</th></tr></thead><tbody>';
  if (recommended.length === 0) {
    html += '<tr><td colspan="4" style="text-align:center;color:#9CA3AF;padding:16px">尚無推薦遊戲</td></tr>';
  } else {
    recommended.forEach((g, i) => {
      html += '<tr><td>' + (i+1) + '</td><td>' + g.hall + '</td><td>' + g.name + '</td><td><button class="btn btn-outline btn-sm" style="font-size:10px;padding:2px 6px;color:#DC2626;border-color:#FCA5A5" onclick="removeRecommend(' + g.id + ')">移除</button></td></tr>';
    });
  }
  html += '</tbody></table>';
  el.innerHTML = html;
}

function removeRecommend(id) {
  const g = games.find(x => x.id === id);
  if (g) { g.recommend = false; switchCommonTab('recommend'); renderTable(); showToast(g.name + ' 已移除推薦', 'warning'); }
}

function renderTagsTab(el) {
  let html = '<div style="margin-bottom:10px;font-size:12px;color:#6B7280">管理遊戲標籤（刮刮樂、推薦、熱門等）</div>';
  html += '<div class="tag-list">';
  commonTags.forEach((t, i) => {
    html += '<div class="tag-item"><span class="tag-order">#' + (i+1) + '</span><span>' + t + '</span><button class="tag-del" onclick="removeTag(' + i + ')" title="刪除">&times;</button></div>';
  });
  html += '</div>';
  html += '<div style="margin-top:12px;display:flex;gap:8px"><input type="text" id="newTagInput" placeholder="新增標籤名稱..." style="padding:6px 10px;border:1px solid oklch(0.922 0 0);border-radius:5px;font-size:12px;flex:1"><button class="btn btn-primary btn-sm" onclick="addTag()">新增</button></div>';
  el.innerHTML = html;
}

function removeTag(idx) {
  commonTags.splice(idx, 1);
  switchCommonTab('tags');
  showToast('標籤已刪除', 'warning');
}

function addTag() {
  const input = document.getElementById('newTagInput');
  const val = input.value.trim();
  if (!val) { showToast('請輸入標籤名稱', 'error'); return; }
  if (commonTags.includes(val)) { showToast('標籤已存在', 'error'); return; }
  commonTags.push(val);
  switchCommonTab('tags');
  showToast('標籤已新增：' + val, 'success');
}

// === Utilities ===
function closeModal(id) { document.getElementById(id).classList.remove('show'); }

function toggleExpand(btn) {
  const modal = btn.closest('.modal');
  modal.classList.toggle('expanded');
  btn.textContent = modal.classList.contains('expanded') ? '⤡' : '⤢';
}

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

// === Init ===
initHallSelector();
initFilters();
renderHallDetail();
renderTable();

