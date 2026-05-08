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
  {id:1,hall:'VA',cat:'電動',name:'埃及三秘寶',status:'即將上線',vip:'不限制',goldMin:10,goldMax:50000,starMin:100,starMax:30000,tag:'-',recommend:false,note:'批次維護測試中'},
  {id:2,hall:'VA',cat:'電動',name:'財神倍倍發 X4096',status:'即將上線',vip:'不限制',goldMin:10,goldMax:80000,starMin:100,starMax:40000,tag:'-',recommend:false,note:'批次維護測試中'},
  {id:3,hall:'VA',cat:'電動',name:'印加祖瑪 豪華版',status:'停用中',vip:'不限制',goldMin:10,goldMax:60000,starMin:100,starMax:25000,tag:'推薦',recommend:true,note:''},
  {id:4,hall:'VA',cat:'電動',name:'財富金幣',status:'使用中',vip:'不限制',goldMin:10,goldMax:100000,starMin:100,starMax:50000,tag:'-',recommend:false,note:''},
  {id:5,hall:'VA',cat:'電動',name:'阿茲特克神話',status:'使用中',vip:'不限制',goldMin:10,goldMax:100000,starMin:100,starMax:50000,tag:'-',recommend:false,note:''},
  {id:6,hall:'VA',cat:'電動',name:'自摸無雙 2',status:'使用中',vip:'不限制',goldMin:20,goldMax:50000,starMin:200,starMax:30000,tag:'-',recommend:false,note:''},
  {id:7,hall:'VA',cat:'電動',name:'自摸無雙3',status:'使用中',vip:'不限制',goldMin:20,goldMax:50000,starMin:200,starMax:30000,tag:'-',recommend:false,note:''},
  {id:8,hall:'VA',cat:'電動',name:'法老祕寶',status:'使用中',vip:'不限制',goldMin:10,goldMax:100000,starMin:100,starMax:50000,tag:'-',recommend:true,note:''},
  {id:9,hall:'VA',cat:'電動',name:'印加女神',status:'使用中',vip:'不限制',goldMin:10,goldMax:100000,starMin:100,starMax:50000,tag:'-',recommend:false,note:''},
  {id:10,hall:'YGR',cat:'街機',name:'祖瑪探險',status:'即將上線',vip:'不限制',goldMin:10,goldMax:80000,starMin:100,starMax:30000,tag:'推薦',recommend:true,note:'批次維護測試中(原使用中)'},
  {id:11,hall:'YGR',cat:'電動',name:'自摸財神',status:'停用中',vip:'不限制',goldMin:20,goldMax:60000,starMin:200,starMax:25000,tag:'-',recommend:false,note:'批次維護測試中(原使用中)'},
  {id:12,hall:'YGR',cat:'電動',name:'聚寶福祿壽',status:'使用中',vip:'不限制',goldMin:10,goldMax:80000,starMin:100,starMax:30000,tag:'-',recommend:false,note:''},
  {id:13,hall:'YGR',cat:'電動',name:'甜蜜聖誕',status:'使用中',vip:'不限制',goldMin:10,goldMax:80000,starMin:100,starMax:30000,tag:'-',recommend:false,note:''},
  {id:14,hall:'YGR',cat:'電動',name:'福來臨',status:'使用中',vip:'不限制',goldMin:10,goldMax:80000,starMin:100,starMax:30000,tag:'-',recommend:false,note:''},
  {id:15,hall:'YGR',cat:'電動',name:'祥龍獻瑞',status:'使用中',vip:'不限制',goldMin:10,goldMax:80000,starMin:100,starMax:30000,tag:'-',recommend:false,note:''},
  {id:16,hall:'VA',cat:'電動',name:'星運雷神',status:'使用中',vip:'VIP1',goldMin:50,goldMax:200000,starMin:500,starMax:100000,tag:'最新',recommend:true,note:''},
  {id:17,hall:'VA',cat:'未分類',name:'爆礦傳奇',status:'使用中',vip:'不限制',goldMin:10,goldMax:100000,starMin:100,starMax:50000,tag:'-',recommend:false,note:''},
  {id:18,hall:'VA',cat:'未分類',name:'星運賽特',status:'使用中',vip:'不限制',goldMin:10,goldMax:100000,starMin:100,starMax:50000,tag:'-',recommend:false,note:''},
  {id:19,hall:'VA',cat:'未分類',name:'自摸無雙',status:'使用中',vip:'不限制',goldMin:20,goldMax:50000,starMin:200,starMax:30000,tag:'-',recommend:false,note:''},
  {id:20,hall:'VA',cat:'未分類',name:'自摸無雙 5',status:'使用中',vip:'不限制',goldMin:20,goldMax:50000,starMin:200,starMax:30000,tag:'-',recommend:false,note:''},
  {id:21,hall:'JDB',cat:'電動',name:'彩虹軟糖',status:'使用中',vip:'不限制',goldMin:5,goldMax:50000,starMin:50,starMax:20000,tag:'-',recommend:false,note:''},
  {id:22,hall:'JDB',cat:'電動',name:'鐵道富翁',status:'使用中',vip:'不限制',goldMin:5,goldMax:50000,starMin:50,starMax:20000,tag:'-',recommend:false,note:''},
  {id:23,hall:'JDB',cat:'電動',name:'豬滿滿',status:'使用中',vip:'不限制',goldMin:5,goldMax:50000,starMin:50,starMax:20000,tag:'-',recommend:false,note:''},
  {id:24,hall:'JDB',cat:'電動',name:'天上聖母',status:'使用中',vip:'不限制',goldMin:5,goldMax:50000,starMin:50,starMax:20000,tag:'-',recommend:false,note:''},
  {id:25,hall:'PG',cat:'電動',name:'麻將之路',status:'使用中',vip:'不限制',goldMin:10,goldMax:120000,starMin:0,starMax:0,tag:'-',recommend:false,note:''},
  {id:26,hall:'PG',cat:'電動',name:'寶石傳奇',status:'使用中',vip:'不限制',goldMin:10,goldMax:120000,starMin:0,starMax:0,tag:'-',recommend:false,note:''},
  {id:27,hall:'CQ9',cat:'電動',name:'跳跳樂',status:'使用中',vip:'不限制',goldMin:10,goldMax:60000,starMin:100,starMax:25000,tag:'-',recommend:false,note:''},
  {id:28,hall:'CQ9',cat:'電動',name:'捕魚達人',status:'使用中',vip:'不限制',goldMin:10,goldMax:60000,starMin:100,starMax:25000,tag:'-',recommend:false,note:''},
  {id:29,hall:'RSG',cat:'電動',name:'金猴爺',status:'使用中',vip:'不限制',goldMin:20,goldMax:100000,starMin:200,starMax:50000,tag:'-',recommend:false,note:''},
  {id:30,hall:'RSG',cat:'電動',name:'德州撲克',status:'使用中',vip:'不限制',goldMin:20,goldMax:100000,starMin:200,starMax:50000,tag:'-',recommend:false,note:''},
  {id:31,hall:'FC',cat:'電動',name:'招財進寶',status:'使用中',vip:'不限制',goldMin:10,goldMax:70000,starMin:100,starMax:35000,tag:'-',recommend:false,note:''},
  {id:32,hall:'FC',cat:'電動',name:'深海獵手',status:'使用中',vip:'不限制',goldMin:10,goldMax:70000,starMin:100,starMax:35000,tag:'-',recommend:false,note:''}
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
let hallDetailTab = 'schedule'; // schedule, currency, recommend

function switchHallTab(tab) {
  hallDetailTab = tab;
  renderHallDetail();
}

function renderHallDetail() {
  if (!currentHall) {
    document.getElementById('hallDetail').innerHTML = '';
    document.getElementById('hallCards').innerHTML = '';
    return;
  }
  const id = currentHall;
  const h = halls[id];
  const gameCount = games.filter(g => g.hall === id).length;

  // Tab bar
  const tabs = [
    {key:'schedule', label:'排程開關', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'}
  ];
  const tabHtml = tabs.map(t => '<button class="hall-detail-tab' + (hallDetailTab === t.key ? ' active' : '') + '" onclick="switchHallTab(\'' + t.key + '\')">' + t.icon + ' ' + t.label + '</button>').join('');

  let bodyHtml = '';
  if (hallDetailTab === 'schedule') bodyHtml = renderScheduleTab(id, h);
  else if (hallDetailTab === 'currency') bodyHtml = renderCurrencyTab(id, h);
  else if (hallDetailTab === 'recommend') bodyHtml = renderRecommendHallTab(id);
  else if (hallDetailTab === 'sort') bodyHtml = renderSortTab(id);

  const html = '<div class="hall-card">' +
    '<div class="hall-header">' +
      '<span class="hall-name">' + h.name + '</span>' +
      '<span class="hall-meta">(' + gameCount + ' 款遊戲)</span>' +
      '<span class="spacer"></span>' +
      '<button class="toggle ' + h.status + '" onclick="requestToggle(\'' + id + '\')"></button>' +
    '</div>' +
    '<div class="hall-detail-tabs">' + tabHtml + '</div>' +
    '<div class="hall-tab-body">' + bodyHtml + '</div>' +
  '</div>';

  document.getElementById('hallDetail').innerHTML = html;
}

function renderCurrencyTab(id, h) {
  return '<div class="hall-sections">' +
    '<div class="sec-card gold"><div class="sec-title">' +
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 10h8M9 14h6"/></svg>' +
      '金幣<span class="sec-badge ' + (h.gold.enabled ? 'on' : 'off') + '">' + (h.gold.enabled ? '啟用' : '停用') + '</span>' +
      '<span class="spacer"></span><button class="edit-icon-btn" id="editBtn_gold_' + id + '" onclick="toggleCurrEdit(\'' + id + '\',\'gold\')" title="修改"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button></div>' +
      '<div class="curr-row" id="currGold_' + id + '">' + renderCurrFields(h.gold, id, 'gold', false) + '</div></div>' +
    '<div class="sec-card star"><div class="sec-title">' +
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
      '星幣<span class="sec-badge ' + (h.star.enabled ? 'on' : 'off') + '">' + (h.star.enabled ? '啟用' : '停用') + '</span>' +
      '<span class="spacer"></span><button class="edit-icon-btn" id="editBtn_star_' + id + '" onclick="toggleCurrEdit(\'' + id + '\',\'star\')" title="修改"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button></div>' +
      '<div class="curr-row" id="currStar_' + id + '">' + renderCurrFields(h.star, id, 'star', false) + '</div></div>' +
  '</div>';
}

let schedCurrency = 'gold'; // 排程幣種切換

function renderScheduleTab(id, h) {
  let schedHtml = '<div class="sched-empty">尚無排程</div>';
  if (h.schedules.length > 0) {
    schedHtml = h.schedules.map((s, i) => {
      const currLabel = s.currency === 'star' ? '<span style="color:#9333EA;font-size:10px;margin-right:4px">[星幣]</span>' : '<span style="color:#D97706;font-size:10px;margin-right:4px">[金幣]</span>';
      return '<div class="sched-item">' +
        '<svg class="sched-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
        '<div class="sched-text">' + currLabel + '<span class="sched-time">' + fmtDT(s.start) + '</span>' +
        (s.end ? ' ~ <span class="sched-time">' + fmtDT(s.end) + '</span>' : ' (手動恢復)') +
        ' <span class="sched-action ' + s.action + '">' + (s.action === 'off' ? '關閉' : '開啟') + '</span>' +
        (s.note ? ' — ' + s.note : '') + '</div>' +
        '<button class="del-btn" onclick="delSched(\'' + id + '\',' + i + ')" title="刪除">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>';
    }).join('');
  }
  return '<div class="sched-tab-content">' +
    '<div class="toggle-btn-group" style="margin-bottom:12px">' +
    '<button class="toggle-btn' + (schedCurrency === 'gold' ? ' active' : '') + '" onclick="switchSchedCurrency(\'gold\')">金幣</button>' +
    '<button class="toggle-btn' + (schedCurrency === 'star' ? ' active' : '') + '" onclick="switchSchedCurrency(\'star\')">星幣</button>' +
    '</div>' +
    '<div class="sched-tab-header"><span class="sched-tab-desc">設定自動開關排程，到時間自動執行，不需手動操作</span>' +
    '<button class="add-sched-btn" onclick="openSchedModal(\'' + id + '\')">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:10px;height:10px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新增排程</button></div>' +
    schedHtml + '</div>';
}

function switchSchedCurrency(curr) {
  schedCurrency = curr;
  renderHallDetail();
}

let recommendCurrency = 'gold'; // 預設金幣

function renderRecommendHallTab(hallId) {
  const hallGames = games.filter(g => g.hall === hallId);
  const recommended = hallGames.filter(g => g.recommend);
  const notRecommended = hallGames.filter(g => !g.recommend);

  let html = '<div class="recommend-tab-content">' +
    '<div class="recommend-header-row">' +
    '<div class="recommend-desc">推薦遊戲會顯示在前台該廳的推薦區塊，玩家優先看到這些遊戲</div>' +
    '<div class="currency-toggle-group">' +
    '<button class="currency-toggle-btn' + (recommendCurrency === 'gold' ? ' active' : '') + '" onclick="switchRecommendCurrency(\'gold\')">金幣</button>' +
    '<button class="currency-toggle-btn' + (recommendCurrency === 'star' ? ' active' : '') + '" onclick="switchRecommendCurrency(\'star\')">星幣</button>' +
    '</div>' +
    '</div>' +
    '<div class="recommend-layout">' +
    '<div class="recommend-col">' +
    '<div class="recommend-col-header"><span class="recommend-col-title">已推薦</span><span class="recommend-count">' + recommended.length + '</span></div>' +
    '<div class="recommend-list" id="recommendedList">';

  if (recommended.length === 0) {
    html += '<div class="recommend-empty">尚無推薦遊戲<br>從右側列表點擊 + 加入</div>';
  } else {
    recommended.forEach((g, i) => {
      html += '<div class="recommend-item active">' +
        '<span class="recommend-order">' + (i + 1) + '</span>' +
        '<span class="recommend-name">' + g.name + '</span>' +
        '<span class="recommend-cat">' + g.cat + '</span>' +
        '<button class="recommend-remove" onclick="removeFromRecommend(' + g.id + ')" title="移除推薦">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>';
    });
  }

  html += '</div></div>' +
    '<div class="recommend-col">' +
    '<div class="recommend-col-header"><span class="recommend-col-title">可加入推薦</span><span class="recommend-count">' + notRecommended.length + '</span></div>' +
    '<div class="recommend-list" id="availableList">';

  notRecommended.forEach(g => {
    html += '<div class="recommend-item">' +
      '<span class="recommend-name">' + g.name + '</span>' +
      '<span class="recommend-cat">' + g.cat + '</span>' +
      '<span class="badge ' + (g.status === '使用中' ? 'badge-on' : g.status === '停用中' ? 'badge-off' : g.status === '維護中' ? 'badge-maint' : 'badge-soon') + '" style="font-size:10px">' + g.status + '</span>' +
      '<button class="recommend-add" onclick="addToRecommend(' + g.id + ')" title="加入推薦">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button></div>';
  });

  html += '</div></div></div></div>';
  return html;
}

function addToRecommend(gameId) {
  const g = games.find(x => x.id === gameId);
  if (g) { g.recommend = true; renderRecommendModalContent(); renderTable(); showToast(g.name + ' 已加入推薦', 'success'); }
}

function removeFromRecommend(gameId) {
  const g = games.find(x => x.id === gameId);
  if (g) { g.recommend = false; renderRecommendModalContent(); renderTable(); showToast(g.name + ' 已移除推薦', 'warning'); }
}

function openRecommendModal() {
  document.getElementById('recommendModal').classList.add('show');
  renderRecommendModalContent();
}

let recommendSubTab = 'recent'; // recent, popular

function renderRecommendModalContent() {
  const recommended = games.filter(g => g.recommend);

  let html = '<div class="recommend-tab-content">' +
    '<div class="toggle-btn-group" style="margin-bottom:12px">' +
    '<button class="toggle-btn' + (recommendCurrency === 'gold' ? ' active' : '') + '" onclick="switchRecommendCurrency(\'gold\')">金幣</button>' +
    '<button class="toggle-btn' + (recommendCurrency === 'star' ? ' active' : '') + '" onclick="switchRecommendCurrency(\'star\')">星幣</button>' +
    '</div>' +
    '<div class="toggle-btn-group" style="margin-bottom:12px">' +
    '<button class="toggle-btn' + (recommendSubTab === 'recent' ? ' active' : '') + '" onclick="switchRecommendSubTab(\'recent\')">近期爆獎</button>' +
    '<button class="toggle-btn' + (recommendSubTab === 'popular' ? ' active' : '') + '" onclick="switchRecommendSubTab(\'popular\')">最受歡迎</button>' +
    '</div>' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
    '<span style="font-size:12px;color:#6B7280">總共 ' + recommended.length + ' 筆資料</span>' +
    '<div style="display:flex;gap:8px">' +
    '<button class="btn btn-outline" style="padding:6px 12px;font-size:12px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="9" y2="18"/></svg> 編輯排序</button>' +
    '<button class="btn btn-primary" style="padding:6px 12px;font-size:12px" onclick="addRecommendGame()">+ 新增遊戲</button>' +
    '</div></div>';

  html += '<table class="data-table"><thead><tr>' +
    '<th style="width:50px">順序</th>' +
    '<th style="width:70px">娛樂城</th>' +
    '<th>遊戲名稱</th>' +
    '<th style="width:140px">遊戲長條圖</th>' +
    '<th style="width:80px">操作</th>' +
    '</tr></thead><tbody>';

  if (recommended.length === 0) {
    html += '<tr><td colspan="5" style="text-align:center;padding:30px;color:#9CA3AF">尚無推薦遊戲</td></tr>';
  } else {
    recommended.forEach((g, i) => {
      html += '<tr>' +
        '<td style="text-align:center;color:#6B7280">' + (i + 1) + '</td>' +
        '<td style="text-align:center">' + g.hall + '</td>' +
        '<td style="font-weight:500">' + g.name + '</td>' +
        '<td><div class="recommend-banner-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="15" x2="21" y2="15"/><circle cx="8.5" cy="8.5" r="1.5"/></svg> <span style="color:#9CA3AF;font-size:11px">未設置</span></div></td>' +
        '<td><div style="display:flex;gap:6px">' +
        '<button class="btn-icon-action edit" onclick="editRecommendGame(' + g.id + ')" title="編輯"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
        '<button class="btn-icon-action delete" onclick="removeFromRecommend(' + g.id + ')" title="刪除"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
        '</div></td></tr>';
    });
  }

  html += '</tbody></table></div>';
  document.getElementById('recommendModalBody').innerHTML = html;
}

function switchRecommendSubTab(tab) {
  recommendSubTab = tab;
  renderRecommendModalContent();
}

function switchRecommendCurrency(curr) {
  recommendCurrency = curr;
  renderRecommendModalContent();
}

function addRecommendGame() {
  // 找出未推薦的遊戲，加入第一個
  const notRec = games.filter(g => !g.recommend);
  if (notRec.length === 0) { showToast('所有遊戲已加入推薦', 'warning'); return; }
  notRec[0].recommend = true;
  renderRecommendModalContent();
  renderTable();
  showToast(notRec[0].name + ' 已加入推薦', 'success');
}

function editRecommendGame(gameId) {
  openDetail(gameId);
}

function addToRecommend(gameId) {
  const g = games.find(x => x.id === gameId);
  if (g) { g.recommend = true; renderRecommendModalContent(); renderTable(); showToast(g.name + ' 已加入推薦', 'success'); }
}

function removeFromRecommend(gameId) {
  const g = games.find(x => x.id === gameId);
  if (g) { g.recommend = false; renderRecommendModalContent(); renderTable(); showToast(g.name + ' 已移除推薦', 'warning'); }
}

function renderSortTab(hallId) {
  const hallGames = games.filter(g => g.hall === hallId);

  let html = '<div class="sort-tab-content">' +
    '<div class="sort-desc">拖拉調整遊戲在前台的顯示順序，排在前面的遊戲玩家優先看到</div>' +
    '<div class="sort-list" id="sortList">';

  hallGames.forEach((g, i) => {
    const bc = g.status === '使用中' ? 'badge-on' : g.status === '停用中' ? 'badge-off' : g.status === '維護中' ? 'badge-maint' : 'badge-soon';
    html += '<div class="sort-item" data-id="' + g.id + '">' +
      '<span class="sort-handle" title="拖拉排序"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg></span>' +
      '<span class="sort-order">' + (i + 1) + '</span>' +
      '<span class="sort-name">' + g.name + '</span>' +
      '<span class="sort-cat">' + g.cat + '</span>' +
      '<span class="badge ' + bc + '" style="font-size:10px">' + g.status + '</span>' +
      '<div class="sort-arrows">' +
      '<button class="sort-arrow" onclick="moveGame(' + g.id + ',-1)" title="上移"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="18 15 12 9 6 15"/></svg></button>' +
      '<button class="sort-arrow" onclick="moveGame(' + g.id + ',1)" title="下移"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="6 9 12 15 18 9"/></svg></button>' +
      '</div></div>';
  });

  html += '</div></div>';
  return html;
}

function moveGame(gameId, dir) {
  const hallGames = games.filter(g => g.hall === currentHall);
  const idx = hallGames.findIndex(g => g.id === gameId);
  if (idx < 0) return;
  const newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= hallGames.length) return;
  // Swap in main games array
  const mainIdx1 = games.indexOf(hallGames[idx]);
  const mainIdx2 = games.indexOf(hallGames[newIdx]);
  [games[mainIdx1], games[mainIdx2]] = [games[mainIdx2], games[mainIdx1]];
  renderHallDetail();
  renderTable();
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
      '<div class="curr-field"><label>兌換比率</label><input class="curr-input" id="edit_' + type + '_rate_' + hallId + '" value="' + curr.rate + '"></div>';
  }
  return '<div class="curr-field"><label>最低投注</label><span class="val">$' + curr.min.toLocaleString() + '</span></div>' +
    '<div class="curr-field"><label>最高投注</label><span class="val">$' + curr.max.toLocaleString() + '</span></div>' +
    '<div class="curr-field"><label>兌換比率</label><span class="val">' + curr.rate + '</span></div>';
}

function toggleCurrEdit(hallId, type) {
  const h = halls[hallId];
  const curr = type === 'gold' ? h.gold : h.star;
  const container = document.getElementById('curr' + (type === 'gold' ? 'Gold' : 'Star') + '_' + hallId);
  const btn = document.getElementById('editBtn_' + type + '_' + hallId);
  container.innerHTML = renderCurrFields(curr, hallId, type, true);
  btn.onclick = null;
  btn.innerHTML = '<button class="curr-save" onclick="saveCurrEdit(\'' + hallId + '\',\'' + type + '\')">儲存變更</button>' +
    '<button class="curr-cancel" onclick="cancelCurrEdit(\'' + hallId + '\',\'' + type + '\')">取消</button>';
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
  const btn = document.getElementById('editBtn_' + type + '_' + hallId);
  container.innerHTML = renderCurrFields(curr, hallId, type, false);
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
  btn.onclick = function() { toggleCurrEdit(hallId, type); };
  btn.title = '修改';
  renderTable();
}

function cancelCurrEdit(hallId, type) {
  const h = halls[hallId];
  const curr = type === 'gold' ? h.gold : h.star;
  const container = document.getElementById('curr' + (type === 'gold' ? 'Gold' : 'Star') + '_' + hallId);
  const btn = document.getElementById('editBtn_' + type + '_' + hallId);
  container.innerHTML = renderCurrFields(curr, hallId, type, false);
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
  btn.onclick = function() { toggleCurrEdit(hallId, type); };
  btn.title = '修改';
}

let currentCurrTab = 'gold'; // gold or star

// === Render Game Table ===
function renderTable() {
  const nameF = document.getElementById('filterName').value.toLowerCase();
  const statusF = document.getElementById('filterStatus').value;
  const catF = document.getElementById('filterCat').value;
  // Advanced filters (now inline)
  const hallAdvEl = document.getElementById('filterHallAdv');
  const tagAdvEl = document.getElementById('filterTagAdv');
  const vipAdvEl = document.getElementById('filterVipAdv');
  const hallAdv = hallAdvEl ? hallAdvEl.value : '';
  const tagAdv = tagAdvEl ? tagAdvEl.value : '';
  const vipAdv = vipAdvEl ? vipAdvEl.value : '';
  const filtered = games.filter(g => {
    if (nameF && !g.name.toLowerCase().includes(nameF)) return false;
    if (statusF && g.status !== statusF) return false;
    if (catF && g.cat !== catF) return false;
    if (hallAdv && g.hall !== hallAdv) return false;
    if (tagAdv && g.tag !== tagAdv) return false;
    if (vipAdv && g.vip !== vipAdv) return false;
    return true;
  });
  document.getElementById('gameCount').textContent = '第 1 頁，共 ' + filtered.length + ' 筆資料';
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = filtered.map((g, idx) => {
    const bc = g.status === '使用中' ? 'badge-on' : g.status === '停用中' ? 'badge-off' : g.status === '維護中' ? 'badge-maint' : 'badge-soon';
    const tagDisplay = g.tag === '-' ? '-' : '<span class="tag-badge">' + g.tag + '</span>';
    const dragHandle = sortMode ? '<td class="sort-handle-cell" style="cursor:grab;color:#9CA3AF"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg></td>' : '';
    const sortNum = sortMode ? '<td class="sort-num">' + (idx + 1) + '</td>' : '<td>' + (idx + 1) + '</td>';
    return '<tr' + (sortMode ? ' draggable="true"' : '') + '>' +
      dragHandle +
      sortNum +
      '<td>' + tagDisplay + '</td>' +
      '<td>' + g.hall + '</td>' +
      '<td>' + g.cat + '</td>' +
      '<td><button class="game-name-link" onclick="openDetail(' + g.id + ')">' + g.name + '</button></td>' +
      '<td><span class="badge ' + bc + '">' + g.status + '</span></td>' +
      '<td>' + g.vip + '</td>' +
      '<td class="action-cell"><button class="btn-edit-icon" onclick="openDetail(' + g.id + ')" title="編輯"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button><button class="btn-more-icon" onclick="toggleMoreMenu(event,' + g.id + ')" title="更多"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg></button></td>' +
      '<td class="note-cell">' + (g.note || '') + '</td>' +
      '</tr>';
  }).join('');
  // Update table header for sort mode
  const thead = document.querySelector('.data-table thead tr');
  if (sortMode) {
    if (!thead.querySelector('.sort-th')) {
      thead.insertAdjacentHTML('afterbegin', '<th class="sort-th" style="width:30px"></th>');
    }
  } else {
    const sortTh = thead.querySelector('.sort-th');
    if (sortTh) sortTh.remove();
  }
  if (sortMode) initDragSort();
}

function toggleMoreMenu(event, gameId) {
  event.stopPropagation();
  const existing = document.querySelector('.more-menu');
  if (existing) existing.remove();
  const g = games.find(x => x.id === gameId);
  if (!g) return;
  const menu = document.createElement('div');
  menu.className = 'more-menu';
  menu.innerHTML = '<div class="more-item" onclick="changeGameStatus(' + gameId + ',\'使用中\')">設為使用中</div>' +
    '<div class="more-item" onclick="changeGameStatus(' + gameId + ',\'停用中\')">設為停用中</div>' +
    '<div class="more-item" onclick="changeGameStatus(' + gameId + ',\'維護中\')">設為維護中</div>' +
    '<div class="more-item" onclick="changeGameStatus(' + gameId + ',\'即將上線\')">設為即將上線</div>';
  const btn = event.currentTarget;
  const rect = btn.getBoundingClientRect();
  menu.style.position = 'fixed';
  menu.style.top = (rect.bottom + 4) + 'px';
  menu.style.left = (rect.left - 80) + 'px';
  document.body.appendChild(menu);
  setTimeout(() => { document.addEventListener('click', closeMoreMenu, { once: true }); }, 10);
}

function closeMoreMenu() {
  const m = document.querySelector('.more-menu');
  if (m) m.remove();
}

function changeGameStatus(gameId, newStatus) {
  const g = games.find(x => x.id === gameId);
  if (g) { g.status = newStatus; renderTable(); showToast(g.name + ' → ' + newStatus, 'success'); }
  closeMoreMenu();
}

function switchCurrTab(tab) {
  currentCurrTab = tab;
  document.querySelectorAll('.curr-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  renderTable();
}

function filterGames() { renderTable(); }

let gameCurrency = 'gold'; // 遊戲列表幣種切換

function switchGameCurrency(curr) {
  gameCurrency = curr;
  document.getElementById('currTabGold').classList.toggle('active', curr === 'gold');
  document.getElementById('currTabStar').classList.toggle('active', curr === 'star');
  renderTable();
}

function toggleAdvFilter() {
  const panel = document.getElementById('advFilterPanel');
  const arrow = document.getElementById('advFilterArrow');
  if (panel.style.display === 'none') {
    panel.style.display = 'flex';
    arrow.style.transform = 'rotate(180deg)';
  } else {
    panel.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
  }
}

function resetFilters() {
  document.getElementById('filterName').value = '';
  document.getElementById('filterStatus').value = '';
  document.getElementById('filterCat').value = '';
  const hallAdvEl = document.getElementById('filterHallAdv');
  const tagAdvEl = document.getElementById('filterTagAdv');
  const vipAdvEl = document.getElementById('filterVipAdv');
  if (hallAdvEl) hallAdvEl.value = '';
  if (tagAdvEl) tagAdvEl.value = '';
  if (vipAdvEl) vipAdvEl.value = '';
  renderTable();
}

function toggleAdvFilter() {
  // Removed - filters are now inline
}

function applyAdvFilter() {
  renderTable();
}

function openBatchMaintModal() {
  document.getElementById('commonModal').classList.add('show');
  switchCommonTab('maint');
}

function initFilters() {
  const cats = [...new Set(games.map(g => g.cat))].sort();
  const catSel = document.getElementById('filterCat');
  catSel.innerHTML = '<option value="">選擇種類</option>' + cats.map(c => '<option>' + c + '</option>').join('');
  // Populate advanced hall filter
  const hallAdvSel = document.getElementById('filterHallAdv');
  if (hallAdvSel) {
    hallAdvSel.innerHTML = '<option value="">全部</option>' + Object.keys(halls).map(k => '<option value="' + k + '">' + k + '</option>').join('');
  }
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
  const currency = document.getElementById('sCurrency').value;
  if (!start) { showToast('請選擇開始時間', 'error'); return; }
  halls[id].schedules.push({ action, start, end, note, currency });
  closeModal('schedModal');
  renderHallDetail();
  showToast('排程已新增：' + halls[id].name + ' (' + (currency === 'star' ? '星幣' : '金幣') + ')', 'success');
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
  document.getElementById('detailTitle').textContent = '編輯遊戲';
  const h = halls[g.hall];

  // 模擬遊戲圖片（用 emoji 代替）
  const gameIcons = {'埃及三秘寶':'🏺','財神倍倍發 X4096':'🧧','印加祖瑪 豪華版':'🗿','財富金幣':'💰','阿茲特克神話':'🌮','自摸無雙 2':'🀄','自摸無雙3':'🀄','法老祕寶':'👑','印加女神':'👸','祖瑪探險':'🌋','星運雷神':'⚡','黃金礦工':'⛏️','龍虎鬥':'🐉','百家樂':'🃏'};
  const icon = gameIcons[g.name] || '🎮';

  let html = '<div class="form-group"><label>狀態</label>' +
    '<select id="dStatus"><option' + (g.status==='使用中'?' selected':'') + '>使用中</option><option' + (g.status==='停用中'?' selected':'') + '>停用中</option><option' + (g.status==='維護中'?' selected':'') + '>維護中</option><option' + (g.status==='即將上線'?' selected':'') + '>即將上線</option></select></div>';

  html += '<div class="form-group"><label>標籤</label>' +
    '<select id="dTag"><option value="-">請選擇標籤</option>' + commonTags.map(t => '<option' + (g.tag===t?' selected':'') + '>' + t + '</option>').join('') + '</select></div>';

  html += '<div class="form-group"><label>圖片 <span style="color:#EF4444">*</span></label>' +
    '<div class="game-img-preview"><span style="font-size:64px">' + icon + '</span></div>' +
    '<div style="margin-top:6px;font-size:11px;color:#E97B2C">建議尺寸：615 x 512 px</div></div>';

  html += '<div class="form-group"><label>名稱</label>' +
    '<input type="text" id="dName" value="' + g.name + '"></div>';

  html += '<div class="form-group"><label>娛樂城</label>' +
    '<select id="dHall" disabled><option>' + g.hall + '</option></select></div>';

  html += '<div class="form-group"><label>遊戲種類</label>' +
    '<select id="dCat" disabled><option>' + g.cat + '</option></select></div>';

  html += '<div class="form-group"><label>備註</label>' +
    '<input type="text" id="dNote" value="' + (g.note||'') + '" placeholder="選填"></div>';

  html += '<div class="form-group"><label>限制VIP等級以上</label>' +
    '<select id="dVip"><option value="-"' + (g.vip==='-'?' selected':'') + '>不限制</option><option value="VIP 1"' + (g.vip==='VIP 1'?' selected':'') + '>VIP 1</option><option value="VIP 2"' + (g.vip==='VIP 2'?' selected':'') + '>VIP 2</option><option value="VIP 3"' + (g.vip==='VIP 3'?' selected':'') + '>VIP 3</option></select></div>';

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
  const nameInput = document.getElementById('dName');
  if (nameInput) g.name = nameInput.value;
  closeModal('detailModal');
  renderTable();
  showToast(g.name + ' 設定已儲存', 'success');
}

// === Common Settings Modal (標籤管理) ===
function openCommonModal() {
  document.getElementById('commonModal').classList.add('show');
  renderTagsManagement();
}

function renderTagsManagement() {
  const container = document.getElementById('commonTabContent');
  let html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">' +
    '<span style="font-size:12px;color:#6B7280">總共 ' + commonTags.length + ' 筆資料</span>' +
    '<button class="btn btn-primary btn-sm" onclick="addTagPrompt()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> 新增</button></div>';
  html += '<table class="data-table"><thead><tr><th style="width:50px">順序</th><th style="width:50px">圖片</th><th>標籤名稱</th><th style="width:80px">操作</th></tr></thead><tbody>';
  const tagIcons = {
    '超熱門':'🏆','推薦':'😊','穩贏':'🟢','星幣':'⭐','最新':'🆕','刮刮樂':'🎰','熱門':'🔥','限時':'⏰','連消':'🎯'
  };
  commonTags.forEach((t, i) => {
    const icon = tagIcons[t] || '🏷️';
    html += '<tr><td style="text-align:center;color:#6B7280">' + (i + 1) + '</td>' +
      '<td style="text-align:center;font-size:18px">' + icon + '</td>' +
      '<td style="font-weight:500">' + t + '</td>' +
      '<td><div style="display:flex;gap:6px">' +
      '<button class="btn-icon-action edit" onclick="editTag(' + i + ')" title="編輯"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
      '<button class="btn-icon-action delete" onclick="removeTag(' + i + ')" title="刪除"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
      '</div></td></tr>';
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

function addTagPrompt() {
  openTagEditModal(-1);
}

function editTag(idx) {
  openTagEditModal(idx);
}

function openTagEditModal(idx) {
  const isNew = idx === -1;
  const name = isNew ? '' : commonTags[idx];
  const tagIcons = {'超熱門':'🏆','推薦':'😊','穩贏':'🟢','星幣':'⭐','最新':'🆕','刮刮樂':'🎰','熱門':'🔥','限時':'⏰','連消':'🎯'};
  const icon = isNew ? '🏷️' : (tagIcons[name] || '🏷️');
  const title = isNew ? '遊戲共用設定 - Icon新增' : '遊戲共用設定 - Icon編輯';

  let html = '<div class="modal-overlay show" id="tagEditOverlay" style="z-index:600">' +
    '<div class="modal" style="max-width:480px">' +
    '<div class="modal-header"><h3>' + title + '</h3>' +
    '<button class="modal-close" onclick="closeTagEditModal()">×</button></div>' +
    '<div class="modal-body">' +
    '<div class="form-group"><label>Icon名稱</label>' +
    '<input type="text" id="tagEditName" class="form-control" value="' + name + '" placeholder="輸入標籤名稱"></div>' +
    '<div class="form-group"><label>Logo圖片 <span style="color:#EF4444">*</span></label>' +
    '<div class="tag-logo-preview"><span style="font-size:48px">' + icon + '</span></div>' +
    '<div style="margin-top:8px;font-size:11px;color:#9CA3AF">建議尺寸：200x200px，支援 PNG/JPG</div></div>' +
    '</div>' +
    '<div class="modal-footer">' +
    '<button class="btn-tag-cancel" onclick="closeTagEditModal()">取消</button>' +
    '<button class="btn-tag-save" onclick="saveTagFromModal(' + idx + ')">儲存</button>' +
    '</div></div></div>';

  document.body.insertAdjacentHTML('beforeend', html);
  document.getElementById('tagEditName').focus();
}

function closeTagEditModal() {
  const el = document.getElementById('tagEditOverlay');
  if (el) el.remove();
}

function saveTagFromModal(idx) {
  const input = document.getElementById('tagEditName');
  if (!input) return;
  const val = input.value.trim();
  if (!val) { showToast('名稱不能為空', 'error'); return; }
  if (idx === -1) {
    if (commonTags.includes(val)) { showToast('標籤已存在', 'error'); return; }
    commonTags.push(val);
    showToast('標籤已新增：' + val, 'success');
  } else {
    commonTags[idx] = val;
    showToast('標籤已更新', 'success');
  }
  closeTagEditModal();
  renderTagsManagement();
}

function saveTagEdit(idx) { saveTagFromModal(idx); }

function removeTag(idx) {
  const name = commonTags[idx];
  commonTags.splice(idx, 1);
  renderTagsManagement();
  showToast('已刪除：' + name, 'warning');
}

function removeRecommend(id) {
  const g = games.find(x => x.id === id);
  if (g) { g.recommend = false; renderTable(); showToast(g.name + ' 已移除推薦', 'warning'); }
}

// Old renderTagsTab / addTag removed — replaced by renderTagsManagement above

// === Game Sort Mode (integrated into table) ===
let sortMode = false;
let currentSortHall = 'VA';

function toggleSortMode() {
  sortMode = !sortMode;
  const btn = document.getElementById('sortModeBtn');
  const saveBtn = document.getElementById('saveSortBtn');
  if (sortMode) {
    btn.classList.add('active');
    btn.style.background = '#393939';
    btn.style.color = '#fff';
    saveBtn.style.display = '';
    renderTable();
  } else {
    btn.classList.remove('active');
    btn.style.background = '';
    btn.style.color = '';
    saveBtn.style.display = 'none';
    renderTable();
  }
}

function initSortSection() {
  // No longer needed as separate section — sort is integrated into table
}

function switchSortHall(hall) {
  currentSortHall = hall;
}

function renderSortList() {
  // Deprecated — sort is now in table rows
}

function initDragSort() {
  const tbody = document.getElementById('tableBody');
  if (!tbody) return;
  let dragRow = null;
  tbody.querySelectorAll('tr[draggable]').forEach(row => {
    row.addEventListener('dragstart', function(e) {
      dragRow = this;
      this.style.opacity = '0.4';
      e.dataTransfer.effectAllowed = 'move';
    });
    row.addEventListener('dragend', function() {
      this.style.opacity = '1';
      dragRow = null;
      tbody.querySelectorAll('tr').forEach(r => r.style.borderTop = '');
    });
    row.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      this.style.borderTop = '2px solid #393939';
    });
    row.addEventListener('dragleave', function() {
      this.style.borderTop = '';
    });
    row.addEventListener('drop', function(e) {
      e.preventDefault();
      this.style.borderTop = '';
      if (dragRow && dragRow !== this) {
        tbody.insertBefore(dragRow, this);
        updateSortNumbers();
      }
    });
  });
}

function updateSortNumbers() {
  document.querySelectorAll('#tableBody tr .sort-num').forEach((el, i) => {
    el.textContent = i + 1;
  });
}

function saveSortOrder() {
  showToast('遊戲排序已儲存', 'success');
  sortMode = false;
  const btn = document.getElementById('sortModeBtn');
  const saveBtn = document.getElementById('saveSortBtn');
  btn.classList.remove('active');
  btn.style.background = '';
  btn.style.color = '';
  saveBtn.style.display = 'none';
  renderTable();
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
initSortSection();

