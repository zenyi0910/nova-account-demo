// === Data ===
const providers = [
  {id:'mycard',name:'MyCard',code:'MYCARD01',status:'on',schedules:[{action:'off',start:'2026-05-12T02:00',end:'2026-05-12T04:00',note:'系統升級'}]},
  {id:'gash',name:'Gash',code:'GASH001',status:'on',schedules:[]},
  {id:'linepay',name:'LINE Pay',code:'LINEPAY01',status:'on',schedules:[]},
  {id:'ecpay',name:'綠界科技',code:'ECPAY01',status:'off',schedules:[]},
  {id:'esun',name:'玉山銀行',code:'70424393',status:'off',schedules:[]},
  {id:'fetnet',name:'遠傳電信',code:'93E5B061',status:'off',schedules:[]},
  {id:'startest',name:'星運測試商',code:'AB00888',status:'on',schedules:[]}
];

const methods = [
  {id:'m1',provider:'mycard',name:'點數卡',logo:'https://placehold.co/80x80/EEF2FF/4338CA?text=點數卡',status:'on'},
  {id:'m2',provider:'mycard',name:'電信帳單',logo:'https://placehold.co/80x80/FEF3C7/D97706?text=電信',status:'on'},
  {id:'m3',provider:'mycard',name:'線上轉點',logo:'https://placehold.co/80x80/DCFCE7/166534?text=轉點',status:'off'},
  {id:'m4',provider:'gash',name:'點數卡',logo:'https://placehold.co/80x80/EEF2FF/4338CA?text=點數卡',status:'on'},
  {id:'m5',provider:'gash',name:'會員扣點',logo:'https://placehold.co/80x80/F3E8FF/7C3AED?text=扣點',status:'on'},
  {id:'m6',provider:'linepay',name:'行動支付',logo:'https://placehold.co/80x80/DCFCE7/166534?text=行動',status:'on'},
  {id:'m7',provider:'ecpay',name:'信用卡',logo:'https://placehold.co/80x80/FEE2E2/991B1B?text=信用卡',status:'off'},
  {id:'m8',provider:'ecpay',name:'ATM轉帳',logo:'https://placehold.co/80x80/E0F2FE/0369A1?text=ATM',status:'off'},
  {id:'m9',provider:'startest',name:'測試支付',logo:'https://placehold.co/80x80/F3F4F6/374151?text=測試',status:'on'}
];

const channels = [
  {id:'c1',provider:'mycard',method:'點數卡',name:'點數卡',code:'COPGAM05',logo:'https://placehold.co/80x80/EEF2FF/4338CA?text=點數卡',status:'on',values:[{amount:50,type:'一般'},{amount:100,type:'一般'},{amount:300,type:'快速'},{amount:500,type:'一般'},{amount:1000,type:'快速'}]},
  {id:'c2',provider:'mycard',method:'電信帳單',name:'手機小額付款',code:'HE0004',logo:'https://placehold.co/80x80/FEF3C7/D97706?text=電信',status:'off',values:[{amount:100,type:'一般'},{amount:300,type:'快速'},{amount:500,type:'一般'}]},
  {id:'c3',provider:'mycard',method:'線上轉點',name:'信用卡3D',code:'CHANNEL_1E8B',logo:'https://placehold.co/80x80/DCFCE7/166534?text=3D',status:'off',values:[{amount:100,type:'一般'},{amount:300,type:'一般'},{amount:500,type:'快速'},{amount:1000,type:'一般'}]},
  {id:'c4',provider:'gash',method:'點數卡',name:'點數卡',code:'GASH_PNT01',logo:'https://placehold.co/80x80/EEF2FF/4338CA?text=點數卡',status:'on',values:[{amount:100,type:'一般'},{amount:300,type:'一般'},{amount:500,type:'快速'},{amount:1000,type:'一般'},{amount:2000,type:'快速'}]},
  {id:'c5',provider:'gash',method:'會員扣點',name:'錢包扣點',code:'COPGAM09',logo:'https://placehold.co/80x80/F3E8FF/7C3AED?text=錢包',status:'on',values:[{amount:50,type:'快速'},{amount:100,type:'一般'},{amount:500,type:'一般'}]},
  {id:'c6',provider:'linepay',method:'行動支付',name:'LINE Pay',code:'LP_001',logo:'https://placehold.co/80x80/DCFCE7/166534?text=LINE',status:'on',values:[{amount:100,type:'一般'},{amount:300,type:'一般'},{amount:500,type:'快速'},{amount:1000,type:'一般'},{amount:3000,type:'快速'}]},
  {id:'c7',provider:'ecpay',method:'信用卡',name:'信用卡一次付',code:'EC_CC01',logo:'https://placehold.co/80x80/FEE2E2/991B1B?text=信用卡',status:'off',values:[{amount:300,type:'一般'},{amount:500,type:'一般'},{amount:1000,type:'快速'},{amount:3000,type:'一般'}]},
  {id:'c8',provider:'ecpay',method:'ATM轉帳',name:'ATM虛擬帳號',code:'EC_ATM01',logo:'https://placehold.co/80x80/E0F2FE/0369A1?text=ATM',status:'off',values:[{amount:500,type:'一般'},{amount:1000,type:'一般'},{amount:3000,type:'快速'},{amount:5000,type:'一般'}]},
  {id:'c9',provider:'startest',method:'測試支付',name:'測試通道A',code:'TEST_A',logo:'https://placehold.co/80x80/F3F4F6/374151?text=測試A',status:'on',values:[{amount:10,type:'快速'},{amount:50,type:'一般'},{amount:100,type:'一般'}]},
  {id:'c10',provider:'startest',method:'測試支付',name:'測試通道B',code:'TEST_B',logo:'https://placehold.co/80x80/F3F4F6/374151?text=測試B',status:'on',values:[{amount:50,type:'一般'},{amount:100,type:'快速'},{amount:500,type:'一般'}]}
];

// 商城管理資料（一般+快速合併，type 區分）
const storeItems = [
  {id:'sg1',name:'線上轉點',provider:'mycard',method:'線上轉點',channel:'信用卡3D',type:'一般',vip:['新手','金牌','鑽石','銀牌','白金','銅牌'],status:'on',amounts:[{amount:100,basePoints:100,bonusRate:0,bonusPoints:0,totalPoints:100},{amount:300,basePoints:300,bonusRate:3,bonusPoints:9,totalPoints:309},{amount:500,basePoints:500,bonusRate:5,bonusPoints:25,totalPoints:525},{amount:1000,basePoints:1000,bonusRate:8,bonusPoints:80,totalPoints:1080}]},
  {id:'sg2',name:'電信帳單',provider:'mycard',method:'電信帳單',channel:'手機小額付款',type:'一般',vip:['新手','白金','金牌','鑽石','銅牌','銀牌'],status:'on',amounts:[{amount:50,basePoints:50,bonusRate:0,bonusPoints:0,totalPoints:50},{amount:100,basePoints:100,bonusRate:3,bonusPoints:3,totalPoints:103},{amount:300,basePoints:300,bonusRate:5,bonusPoints:15,totalPoints:315}]},
  {id:'sg3',name:'Gash錢包扣點',provider:'gash',method:'會員扣點',channel:'錢包扣點',type:'一般',vip:['新手','白金','銅牌','鑽石','銀牌','金牌'],status:'on',amounts:[{amount:50,basePoints:5000,bonusRate:3,bonusPoints:150,totalPoints:5150},{amount:100,basePoints:10000,bonusRate:5,bonusPoints:500,totalPoints:10500},{amount:300,basePoints:30000,bonusRate:8,bonusPoints:2400,totalPoints:32400},{amount:500,basePoints:50000,bonusRate:10,bonusPoints:5000,totalPoints:55000},{amount:1000,basePoints:100000,bonusRate:12,bonusPoints:12000,totalPoints:112000}]},
  {id:'sg4',name:'LINE Pay儲值',provider:'linepay',method:'行動支付',channel:'LINE Pay',type:'一般',vip:['新手','金牌','鑽石'],status:'on',amounts:[{amount:100,basePoints:100,bonusRate:0,bonusPoints:0,totalPoints:100},{amount:500,basePoints:500,bonusRate:5,bonusPoints:25,totalPoints:525},{amount:1000,basePoints:1000,bonusRate:10,bonusPoints:100,totalPoints:1100},{amount:3000,basePoints:3000,bonusRate:12,bonusPoints:360,totalPoints:3360}]},
  {id:'sg5',name:'MyCard點數卡',provider:'mycard',method:'點數卡',channel:'點數卡',type:'一般',vip:['新手','銅牌','銀牌','金牌','白金','鑽石'],status:'on',amounts:[{amount:150,basePoints:150,bonusRate:0,bonusPoints:0,totalPoints:150},{amount:300,basePoints:300,bonusRate:3,bonusPoints:9,totalPoints:309},{amount:500,basePoints:500,bonusRate:5,bonusPoints:25,totalPoints:525},{amount:1000,basePoints:1000,bonusRate:8,bonusPoints:80,totalPoints:1080},{amount:2000,basePoints:2000,bonusRate:10,bonusPoints:200,totalPoints:2200}]},
  {id:'sf1',name:'快速儲值-點數卡',provider:'mycard',method:'點數卡',channel:'點數卡',type:'快速',vip:['新手','銅牌','銀牌'],status:'on',amounts:[{amount:50,basePoints:50,bonusRate:0,bonusPoints:0,totalPoints:50},{amount:100,basePoints:100,bonusRate:3,bonusPoints:3,totalPoints:103}]},
  {id:'sf2',name:'快速儲值-錢包',provider:'gash',method:'會員扣點',channel:'錢包扣點',type:'快速',vip:['新手','金牌'],status:'on',amounts:[{amount:50,basePoints:5000,bonusRate:3,bonusPoints:150,totalPoints:5150},{amount:100,basePoints:10000,bonusRate:5,bonusPoints:500,totalPoints:10500}]},
  {id:'sf3',name:'快速儲值-LINE',provider:'linepay',method:'行動支付',channel:'LINE Pay',type:'快速',vip:['新手','鑽石','白金'],status:'on',amounts:[{amount:100,basePoints:100,bonusRate:0,bonusPoints:0,totalPoints:100},{amount:500,basePoints:500,bonusRate:5,bonusPoints:25,totalPoints:525}]},
  {id:'sf4',name:'快速儲值-電信',provider:'mycard',method:'電信帳單',channel:'手機小額付款',type:'快速',vip:['新手','銅牌'],status:'on',amounts:[{amount:50,basePoints:50,bonusRate:0,bonusPoints:0,totalPoints:50},{amount:100,basePoints:100,bonusRate:3,bonusPoints:3,totalPoints:103},{amount:300,basePoints:300,bonusRate:5,bonusPoints:15,totalPoints:315}]}
];

let currentProvider = 'mycard';
let currentTab = 'methods';
let currentPage = 1;
let currentSection = 'payment'; // 'payment' or 'store'
let pageSize = 20;
let storePageSize = 20;

function changePageSize(val) {
  pageSize = parseInt(val);
  currentPage = 1;
  renderTable();
}
function changeStorePageSize(val) {
  storePageSize = parseInt(val);
  currentPage = 1;
  renderStoreTable();
}

// === Init ===
function init() {
  renderSectionTabs();
  renderProviders();
  renderDetail();
}

// === Section Tabs (三方支付 / 商城管理) ===
function renderSectionTabs() {
  var container = document.getElementById('sectionTabs');
  if (!container) return;
  container.innerHTML =
    '<button class="section-tab' + (currentSection === 'payment' ? ' active' : '') + '" onclick="switchSection(\'payment\',this)">三方支付設定</button>' +
    '<button class="section-tab' + (currentSection === 'store' ? ' active' : '') + '" onclick="switchSection(\'store\',this)">商城管理</button>';
  // 右側新增按鈕
  var btnContainer = document.getElementById('sectionAddBtn');
  if (btnContainer) {
    if (currentSection === 'payment') {
      btnContainer.innerHTML = '<button class="btn-add" onclick="openProviderModal()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> 新增供應商</button>';
    } else {
      btnContainer.innerHTML = '<button class="btn-add" onclick="openStoreAddModal()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> 新增儲值類型</button>';
    }
  }
}

function switchSection(section, el) {
  currentSection = section;
  currentPage = 1;
  document.querySelectorAll('.section-tab').forEach(function(b){ b.classList.remove('active'); });
  if (el) el.classList.add('active');
  // Show/hide panels
  document.getElementById('paymentSection').style.display = section === 'payment' ? '' : 'none';
  document.getElementById('storeSection').style.display = section === 'store' ? '' : 'none';
  if (section === 'store') renderStoreTable();
  renderSectionTabs();
}

// === Store Section ===
function renderStoreTable() {
  var container = document.getElementById('storeTableContainer');
  if (!container) return;
  
  // Apply filters
  var nameFilter = (document.getElementById('storeFilterName') || {}).value || '';
  var statusFilter = (document.getElementById('storeFilterStatus') || {}).value || '';
  var typeFilter = (document.getElementById('storeFilterType') || {}).value || '';
  
  var data = storeItems.filter(function(item) {
    if (nameFilter && item.name.toLowerCase().indexOf(nameFilter.toLowerCase()) < 0) return false;
    if (statusFilter && item.status !== statusFilter) return false;
    if (typeFilter && item.type !== typeFilter) return false;
    return true;
  });
  
  var providerOff = providers.filter(function(p){ return p.status === 'off'; }).map(function(p){ return p.id; });

  var total = data.length;
  var totalPages = Math.max(1, Math.ceil(total / storePageSize));
  if (currentPage > totalPages) currentPage = totalPages;
  var start = (currentPage - 1) * storePageSize;
  var pageData = data.slice(start, start + storePageSize);

  var rows = pageData.map(function(item) {
    var blocked = providerOff.indexOf(item.provider) >= 0;
    var rowCls = blocked ? ' class="row-blocked"' : '';
    var provName = item.type === '快速' ? '-' : ((providers.find(function(p){ return p.id === item.provider; }) || {}).name || item.provider || '-');
    var statusHtml = blocked ?
      renderStatusCell('off', '', true) :
      renderStatusCell(item.status, "toggleStoreStatus('" + item.id + "')");
    var vipHtml = item.vip.map(function(v){ return '<span class="vip-tag">' + v + '</span>'; }).join('');
    return '<tr' + rowCls + '>' +
      '<td>' + provName + '</td>' +
      '<td>' + item.name + '</td>' +
      '<td><span class="type-badge ' + (item.type === '快速' ? 'fast' : 'normal') + '">' + item.type + '</span></td>' +
      '<td>' + (item.type === '快速' ? '-' : (item.method || '-')) + '</td>' +
      '<td>' + (item.type === '快速' ? '-' : (item.channel || '-')) + '</td>' +
      statusHtml +
      '<td><div class="vip-tags">' + vipHtml + '</div></td>' +
      renderActionCell('StoreEdit', item.id, blocked) + '</tr>';
  }).join('');

  if (!rows) rows = '<tr><td colspan="8" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';

  container.innerHTML = '<table class="data-table"><thead><tr><th>供應商</th><th>項目名稱</th><th>類型</th><th>支付方式</th><th>付款通道</th><th>狀態</th><th>適用 VIP 等級</th><th>操作</th></tr></thead><tbody>' + rows + '</tbody></table>';

  document.getElementById('storePageInfo').textContent = '第 ' + currentPage + ' 頁，共 ' + total + ' 筆資料';
  var pageBtns = '';
  for (var i = 1; i <= totalPages; i++) {
    pageBtns += '<button class="' + (i === currentPage ? 'active' : '') + '" onclick="goStorePage(' + i + ')">' + i + '</button>';
  }
  document.getElementById('storePageButtons').innerHTML = pageBtns;
}

function goStorePage(p) { currentPage = p; renderStoreTable(); }

function applyStoreFilter() { currentPage = 1; renderStoreTable(); }
function resetStoreFilter() {
  document.getElementById('storeFilterName').value = '';
  document.getElementById('storeFilterStatus').value = '';
  document.getElementById('storeFilterType').value = '';
  currentPage = 1;
  renderStoreTable();
}

// === Provider Cards ===
function renderProviders() {
  const grid = document.getElementById('providerGrid');
  grid.innerHTML = providers.map(function(p) {
    const methodCount = methods.filter(function(m){ return m.provider === p.id; }).length;
    const channelCount = channels.filter(function(c){ return c.provider === p.id; }).length;
    const isActive = p.id === currentProvider;
    const statusCls = p.status === 'on' ? 'on' : 'off';
    return '<div class="provider-card' + (isActive ? ' active' : '') + (p.status === 'off' ? ' disabled' : '') + '" onclick="selectProvider(\'' + p.id + '\')">' +
      '<div class="provider-header">' +
        '<div class="provider-logo">' + p.name.charAt(0) + '</div>' +
        '<div><div class="provider-name">' + p.name + '</div><div class="provider-code">' + p.code + '</div></div>' +
      '</div>' +
      '<div class="provider-meta">' +
        '<span class="count">支付方式: ' + methodCount + '</span>' +
        '<span class="count">通道: ' + channelCount + '</span>' +
      '</div>' +
      '<div class="provider-status"><span class="status-badge ' + statusCls + '">' + (p.status === 'on' ? '啟用' : '停用') + '</span></div>' +
    '</div>';
  }).join('');
}

function selectProvider(id) {
  currentProvider = id;
  currentPage = 1;
  renderProviders();
  renderDetail();
}

// === Detail Panel ===
function renderDetail() {
  var p = providers.find(function(x){ return x.id === currentProvider; });
  if (!p) return;
  document.getElementById('detailPanel').style.display = '';
  document.getElementById('detailName').textContent = p.name + ' (' + p.code + ')';
  var toggle = document.getElementById('detailToggle');
  toggle.className = 'toggle ' + p.status;

  // Show/hide disabled banner
  var banner = document.getElementById('disabledBanner');
  if (banner) banner.style.display = p.status === 'off' ? '' : 'none';

  renderSchedules();
  renderTable();
}

function toggleProvider() {
  var p = providers.find(function(x){ return x.id === currentProvider; });
  p.status = p.status === 'on' ? 'off' : 'on';
  renderProviders();
  renderDetail();
}

// === Schedules ===
function renderSchedules() {
  var p = providers.find(function(x){ return x.id === currentProvider; });
  var list = document.getElementById('schedList');
  if (!p.schedules.length) {
    list.innerHTML = '<div style="color:#9CA3AF;font-size:12px;padding:8px 0">目前無排程</div>';
    return;
  }
  list.innerHTML = p.schedules.map(function(s, i) {
    var startStr = new Date(s.start).toLocaleString('zh-TW');
    var endStr = s.end ? new Date(s.end).toLocaleString('zh-TW') : '無限期';
    var repeatLabel = {none:'',daily:'每天',weekly:'每週',monthly:'每月'}[s.repeat||'none'];
    var repeatHtml = repeatLabel ? '<span class="repeat-tag">' + repeatLabel + '</span>' : '';
    return '<div class="sched-item">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
      '<span class="time">' + startStr + ' ~ ' + endStr + '</span>' +
      '<span class="action-tag ' + s.action + '">' + (s.action === 'off' ? '關閉' : '開啟') + '</span>' +
      repeatHtml +
      '<span class="note">' + (s.note || '') + '</span>' +
      '<span class="spacer"></span>' +
      '<button class="del-btn" onclick="delSched(' + i + ')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
    '</div>';
  }).join('');
}

function openSchedModal() {
  var p = providers.find(function(x){ return x.id === currentProvider; });
  document.getElementById('schedTargetName').textContent = p ? p.name : '-';
  // 自動填入今天日期和預設時間
  var today = new Date().toISOString().split('T')[0];
  document.getElementById('schedStartDate').value = today;
  document.getElementById('schedEndDate').value = today;
  document.getElementById('schedStartTime').value = '00:00';
  document.getElementById('schedEndTime').value = '23:59';
  document.getElementById('schedModal').classList.add('show');
}
function closeModal(id) { document.getElementById(id).classList.remove('show'); }

function toggleExpand(btn) {
  var modal = btn.closest('.modal');
  if (modal.style.maxWidth === '95vw') {
    modal.style.maxWidth = '580px';
    btn.textContent = '⤢';
  } else {
    modal.style.maxWidth = '95vw';
    btn.textContent = '⤡';
  }
}

function addSchedule() {
  var p = providers.find(function(x){ return x.id === currentProvider; });
  var action = document.getElementById('schedAction').value;
  var note = document.getElementById('schedNote').value;
  var startDate = document.getElementById('schedStartDate').value;
  var endDate = document.getElementById('schedEndDate').value;
  var st = document.getElementById('schedStartTime').value || '00:00';
  var et = document.getElementById('schedEndTime').value || '23:59';
  if (!startDate) { alert('請選擇開始日期'); return; }
  if (!endDate) endDate = startDate;
  var start = startDate + 'T' + st;
  var end = endDate + 'T' + et;
  p.schedules.push({action:action, start:start, end:end, note:note, repeat:'none'});
  closeModal('schedModal');
  renderSchedules();
}

function delSched(i) {
  var p = providers.find(function(x){ return x.id === currentProvider; });
  p.schedules.splice(i, 1);
  renderSchedules();
}

function clearAllSched() {
  if (!confirm('確定清除所有排程？')) return;
  var p = providers.find(function(x){ return x.id === currentProvider; });
  p.schedules = [];
  renderSchedules();
}

// === 共用狀態欄元件（toggle + 文字標籤，對齊 Nova 系統） ===
function renderStatusCell(status, toggleFn, disabled) {
  var st = disabled ? 'off' : status;
  var dis = disabled ? ' disabled' : '';
  var onclick = disabled ? '' : ' onclick="' + toggleFn + '"';
  var label = st === 'on' ? '<span class="status-on">啟用</span>' : '<span class="status-off">停用</span>';
  return '<td><button class="toggle ' + st + '"' + dis + onclick + '></button>' + label + '</td>';
}

// === 共用操作按鈕元件（使用 UI.btn.icon 共用元件） ===
function renderActionCell(type, id, disabled) {
  var editOnclick = disabled ? '' : "open" + type + "Modal('" + id + "')";
  var deleteOnclick = disabled ? '' : "delete" + type + "('" + id + "')";
  return '<td class="action-cell"><div class="action-inner">' +
    UI.btn.icon('edit', editOnclick, '編輯') +
    UI.btn.icon('delete', deleteOnclick, '刪除') +
  '</div></td>';
}

// === 狀態切換 ===
function toggleItemStatus(type, id) {
  var arr = type === 'methods' ? methods : channels;
  var item = arr.find(function(x){ return x.id === id; });
  if (item) { item.status = item.status === 'on' ? 'off' : 'on'; }
  renderTable();
}

function toggleStoreStatus(id) {
  var item = storeItems.find(function(x){ return x.id === id; });
  if (item) { item.status = item.status === 'on' ? 'off' : 'on'; }
  renderStoreTable();
}

// === 刪除操作 ===
function deleteMethod(id) {
  if (!confirm('確定要刪除此支付方式？')) return;
  var idx = methods.findIndex(function(x){ return x.id === id; });
  if (idx >= 0) methods.splice(idx, 1);
  renderProviders();
  renderTable();
}

function deleteChannel(id) {
  if (!confirm('確定要刪除此付款通道？')) return;
  var idx = channels.findIndex(function(x){ return x.id === id; });
  if (idx >= 0) channels.splice(idx, 1);
  renderTable();
}

function deleteStoreEdit(id) {
  deleteStoreItem(id);
}

// === Tabs ===
function switchTab(tab, el) {
  currentTab = tab;
  currentPage = 1;
  document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
  if (el) el.classList.add('active');
  else document.querySelector('.tab-btn[data-tab="' + tab + '"]').classList.add('active');
  // Update add button label
  var label = document.getElementById('addItemLabel');
  if (label) {
    var labels = {methods:'新增支付方式', channels:'新增付款通道'};
    label.textContent = labels[tab] || '新增';
  }
  renderTable();
}

function openAddModal() {
  if (currentTab === 'methods') openMethodModal();
  else openChannelModal();
}

// === Table ===
function renderTable() {
  var container = document.getElementById('tableContainer');
  var nameFilter = document.getElementById('filterName').value.toLowerCase();
  var statusFilter = document.getElementById('filterStatus').value;
  var data = [];
  var headers = '';

  if (currentTab === 'methods') {
    data = methods.filter(function(m){ return m.provider === currentProvider; });
    headers = '<th>Logo</th><th>支付方式</th><th>供應商</th><th>狀態</th><th>操作</th>';
  } else {
    data = channels.filter(function(c){ return c.provider === currentProvider; });
    headers = '<th>Logo</th><th>支付方式</th><th>供應商</th><th>付款通道代碼</th><th>付款通道</th><th>狀態</th><th>操作</th>';
  }

  if (nameFilter) {
    data = data.filter(function(d){ return (d.name || d.method || '').toLowerCase().indexOf(nameFilter) >= 0; });
  }
  if (statusFilter) {
    data = data.filter(function(d){ return d.status === statusFilter; });
  }

  var total = data.length;
  var totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (currentPage > totalPages) currentPage = totalPages;
  var start = (currentPage - 1) * pageSize;
  var pageData = data.slice(start, start + pageSize);

  var rows = '';
  if (currentTab === 'methods') {
    rows = pageData.map(function(m){ 
      var provName = (providers.find(function(p){ return p.id === m.provider; }) || {}).name || m.provider;
      var initial = m.name.charAt(0);
      return '<tr><td><span class="avatar-sm">' + initial + '</span></td><td>' + m.name + '</td><td>' + provName + '</td>' + renderStatusCell(m.status, "toggleItemStatus('methods','" + m.id + "')") + renderActionCell('Method', m.id) + '</tr>'; 
    }).join('');
  } else {
    rows = pageData.map(function(c){ 
      var provName = (providers.find(function(p){ return p.id === c.provider; }) || {}).name || c.provider;
      var initial = c.name.charAt(0);
      return '<tr><td><span class="avatar-sm">' + initial + '</span></td><td>' + c.method + '</td><td>' + provName + '</td><td><code style="font-size:11px;color:#6B7280">' + c.code + '</code></td><td>' + c.name + '</td>' + renderStatusCell(c.status, "toggleItemStatus('channels','" + c.id + "')") + renderActionCell('Channel', c.id) + '</tr>'; 
    }).join('');
  }

  if (!rows) rows = '<tr><td colspan="7" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';

  container.innerHTML = '<table class="data-table"><thead><tr>' + headers + '</tr></thead><tbody>' + rows + '</tbody></table>';

  document.getElementById('pageInfo').textContent = '第 ' + currentPage + ' 頁，共 ' + total + ' 筆資料';
  var pageBtns = '';
  for (var i = 1; i <= totalPages; i++) {
    pageBtns += '<button class="' + (i === currentPage ? 'active' : '') + '" onclick="goPage(' + i + ')">' + i + '</button>';
  }
  document.getElementById('pageButtons').innerHTML = pageBtns;
}

function goPage(p) { currentPage = p; renderTable(); }
function applyFilter() { currentPage = 1; renderTable(); }
function resetFilter() {
  document.getElementById('filterName').value = '';
  document.getElementById('filterStatus').value = '';
  currentPage = 1;
  renderTable();
}

// Init on load
init();

// === Modal: New/Edit Provider ===
var editingProviderId = null;

function openProviderModal(id) {
  editingProviderId = id || null;
  var title = id ? '編輯供應商' : '新增供應商';
  document.getElementById('providerModalTitle').textContent = title;
  if (id) {
    var p = providers.find(function(x){ return x.id === id; });
    document.getElementById('pmName').value = p.name;
    document.getElementById('pmCode').value = p.code;
    document.getElementById('pmStatus').className = 'toggle ' + p.status;
  } else {
    document.getElementById('pmName').value = '';
    document.getElementById('pmCode').value = '';
    document.getElementById('pmStatus').className = 'toggle on';
  }
  document.getElementById('providerModal').classList.add('show');
}

function saveProvider() {
  var name = document.getElementById('pmName').value.trim();
  var code = document.getElementById('pmCode').value.trim();
  var status = document.getElementById('pmStatus').className.includes('on') ? 'on' : 'off';
  if (!name || !code) { alert('請填寫必填欄位'); return; }
  if (editingProviderId) {
    var p = providers.find(function(x){ return x.id === editingProviderId; });
    p.name = name; p.code = code; p.status = status;
  } else {
    var newId = name.toLowerCase().replace(/\s+/g,'');
    providers.push({id:newId, name:name, code:code, status:status, schedules:[]});
  }
  closeModal('providerModal');
  renderProviders();
  renderDetail();
}

// === Modal: New/Edit Method ===
var editingMethodId = null;

function openMethodModal(id) {
  editingMethodId = id || null;
  var title = id ? '編輯支付方式' : '新增支付方式';
  document.getElementById('methodModalTitle').textContent = title;
  // Populate provider dropdown
  var sel = document.getElementById('mmProvider');
  sel.innerHTML = '<option value="">請選擇供應商</option>' + providers.map(function(p){ return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
  if (id) {
    var m = methods.find(function(x){ return x.id === id; });
    document.getElementById('mmName').value = m.name;
    sel.value = m.provider;
    document.getElementById('mmStatus').className = 'toggle ' + m.status;
  } else {
    document.getElementById('mmName').value = '';
    sel.value = currentProvider;
    document.getElementById('mmStatus').className = 'toggle on';
  }
  document.getElementById('methodModal').classList.add('show');
}

function saveMethod() {
  var name = document.getElementById('mmName').value.trim();
  var provider = document.getElementById('mmProvider').value;
  var status = document.getElementById('mmStatus').className.includes('on') ? 'on' : 'off';
  if (!name || !provider) { alert('請填寫必填欄位'); return; }
  if (editingMethodId) {
    var m = methods.find(function(x){ return x.id === editingMethodId; });
    m.name = name; m.provider = provider; m.status = status;
  } else {
    methods.push({id:'m'+(methods.length+1), provider:provider, name:name, logo:'🆕', status:status});
  }
  closeModal('methodModal');
  renderProviders();
  renderTable();
}

// === Modal: New/Edit Channel ===
var editingChannelId = null;

function openChannelModal(id) {
  editingChannelId = id || null;
  var title = id ? '編輯付款通道' : '新增付款通道';
  document.getElementById('channelModalTitle').textContent = title;
  var selP = document.getElementById('cmProvider');
  selP.innerHTML = '<option value="">請選擇供應商</option>' + providers.map(function(p){ return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
  var selM = document.getElementById('cmMethod');
  selM.innerHTML = '<option value="">請選擇支付方式</option>' + methods.filter(function(m){ return m.provider === currentProvider; }).map(function(m){ return '<option value="' + m.name + '">' + m.name + '</option>'; }).join('');
  
  if (id) {
    var c = channels.find(function(x){ return x.id === id; });
    document.getElementById('cmCode').value = c.code;
    document.getElementById('cmName').value = c.name;
    selP.value = c.provider;
    selM.value = c.method;
    document.getElementById('cmStatus').className = 'toggle ' + c.status;
  } else {
    document.getElementById('cmCode').value = '';
    document.getElementById('cmName').value = '';
    selP.value = currentProvider;
    document.getElementById('cmStatus').className = 'toggle on';
  }
  document.getElementById('channelModal').classList.add('show');
}

function saveChannel() {
  var code = document.getElementById('cmCode').value.trim();
  var name = document.getElementById('cmName').value.trim();
  var provider = document.getElementById('cmProvider').value;
  var method = document.getElementById('cmMethod').value;
  var status = document.getElementById('cmStatus').className.includes('on') ? 'on' : 'off';
  if (!code || !name || !provider || !method) { alert('請填寫必填欄位'); return; }
  if (!channelAmountValues.length) { alert('請至少新增一個儲值金額'); return; }
  
  if (editingChannelId) {
    var c = channels.find(function(x){ return x.id === editingChannelId; });
    c.code = code; c.name = name; c.provider = provider; c.method = method; c.status = status; c.values = channelAmountValues.slice();
  } else {
    channels.push({id:'c'+(channels.length+1), provider:provider, method:method, name:name, code:code, status:status, values:channelAmountValues.slice()});
  }
  closeModal('channelModal');
  renderProviders();
  renderTable();
}

// === Modal: New/Edit Amount ===
var editingAmountId = null;
var tempAmounts = [];

function openAmountModal(id) {
  editingAmountId = id || null;
  var title = id ? '編輯儲值金額' : '新增儲值金額';
  document.getElementById('amountModalTitle').textContent = title;
  var selM = document.getElementById('amMethod');
  selM.innerHTML = '<option value="">請選擇支付方式</option>' + methods.filter(function(m){ return m.provider === currentProvider; }).map(function(m){ return '<option value="' + m.name + '">' + m.name + '</option>'; }).join('');
  var selC = document.getElementById('amChannel');
  selC.innerHTML = '<option value="">請選擇付款通道</option>' + channels.filter(function(c){ return c.provider === currentProvider; }).map(function(c){ return '<option value="' + c.name + '">' + c.name + '</option>'; }).join('');
  if (id) {
    var a = amounts.find(function(x){ return x.id === id; });
    selM.value = a.method;
    selC.value = a.channel;
    tempAmounts = a.values.slice();
    document.getElementById('amStatus').className = 'toggle ' + a.status;
  } else {
    tempAmounts = [];
    document.getElementById('amStatus').className = 'toggle on';
  }
  renderAmountTags();
  document.getElementById('amountModal').classList.add('show');
}

function renderAmountTags() {
  document.getElementById('amTags').innerHTML = tempAmounts.map(function(v, i){
    return '<span class="amount-tag">$' + v + '<span class="del" onclick="removeAmountTag(' + i + ')">x</span></span>';
  }).join('');
}

function addAmountTag() {
  var input = document.getElementById('amNewAmount');
  var val = parseInt(input.value);
  if (!val || val <= 0) return;
  tempAmounts.push(val);
  tempAmounts.sort(function(a,b){ return a - b; });
  input.value = '';
  renderAmountTags();
}

function removeAmountTag(i) {
  tempAmounts.splice(i, 1);
  renderAmountTags();
}

function saveAmount() {
  var method = document.getElementById('amMethod').value;
  var channel = document.getElementById('amChannel').value;
  var status = document.getElementById('amStatus').className.includes('on') ? 'on' : 'off';
  if (!method || !channel || !tempAmounts.length) { alert('請填寫必填欄位'); return; }
  if (editingAmountId) {
    var a = amounts.find(function(x){ return x.id === editingAmountId; });
    a.method = method; a.channel = channel; a.values = tempAmounts.slice(); a.status = status;
  } else {
    amounts.push({id:'a'+(amounts.length+1), provider:currentProvider, method:method, channel:channel, values:tempAmounts.slice(), status:status});
  }
  closeModal('amountModal');
  renderTable();
}

// === Store Modal: New/Edit ===
var editingStoreId = null;
var storeAmountValues = [];

function toggleStoreTypeFields() {
  var type = document.getElementById('smType').value;
  var generalFields = document.getElementById('smGeneralFields');
  if (type === '快速') {
    generalFields.style.display = 'none';
  } else {
    generalFields.style.display = '';
  }
}

function toggleAllVip(el) {
  var cbs = document.querySelectorAll('.vip-cb');
  cbs.forEach(function(cb) { cb.checked = el.checked; });
}

function getSelectedVips() {
  var cbs = document.querySelectorAll('.vip-cb:checked');
  return Array.from(cbs).map(function(cb) { return cb.value; });
}

function setSelectedVips(vipArr) {
  document.querySelectorAll('.vip-cb').forEach(function(cb) {
    cb.checked = vipArr.indexOf(cb.value) >= 0;
  });
  // Update "全選" checkbox
  var allCbs = document.querySelectorAll('.vip-cb');
  var allChecked = Array.from(allCbs).every(function(cb) { return cb.checked; });
  var selectAllCb = document.querySelector('input[value="全選"]');
  if (selectAllCb) selectAllCb.checked = allChecked;
}

function openStoreAddModal() {
  editingStoreId = null;
  storeAmountValues = [];
  document.getElementById('storeModalTitle').textContent = '新增儲值類型';
  document.getElementById('smType').value = '';
  document.getElementById('smName').value = '';
  document.getElementById('smDesc').value = '';
  setSelectedVips([]);
  var selP = document.getElementById('smProvider');
  selP.innerHTML = '<option value="">請選擇供應商</option>' + providers.map(function(p){ return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
  document.getElementById('smMethod').innerHTML = '<option value="">請選擇支付方式</option>';
  document.getElementById('smChannel').innerHTML = '<option value="">請選擇付款通道</option>';
  document.getElementById('smStatus').className = 'toggle on';
  document.getElementById('smGeneralFields').style.display = '';
  renderStoreAmountTable();
  selP.onchange = function() { populateStoreDropdowns(selP.value); };
  document.getElementById('storeModal').classList.add('show');
}

function openStoreEditModal(id) {
  editingStoreId = id;
  var item = storeItems.find(function(x){ return x.id === id; });
  if (!item) return;
  document.getElementById('storeModalTitle').textContent = '編輯儲值類型';
  document.getElementById('smType').value = item.type || '一般';
  document.getElementById('smName').value = item.name || '';
  document.getElementById('smDesc').value = item.desc || '';
  setSelectedVips(item.vip || []);
  var selP = document.getElementById('smProvider');
  selP.innerHTML = '<option value="">請選擇供應商</option>' + providers.map(function(p){ return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
  selP.value = item.provider;
  populateStoreDropdowns(item.provider);
  document.getElementById('smMethod').value = item.method;
  document.getElementById('smChannel').value = item.channel;
  storeAmountValues = (item.amounts || []).slice();
  renderStoreAmountTable();
  document.getElementById('smStatus').className = 'toggle ' + item.status;
  toggleStoreTypeFields();
  selP.onchange = function() { populateStoreDropdowns(selP.value); };
  document.getElementById('storeModal').classList.add('show');
}

function populateStoreDropdowns(providerId) {
  var selM = document.getElementById('smMethod');
  var selC = document.getElementById('smChannel');
  var filteredMethods = methods.filter(function(m){ return m.provider === providerId; });
  selM.innerHTML = '<option value="">請選擇支付方式</option>' + filteredMethods.map(function(m){ return '<option value="' + m.name + '">' + m.name + '</option>'; }).join('');
  var filteredChannels = channels.filter(function(c){ return c.provider === providerId; });
  selC.innerHTML = '<option value="">請選擇付款通道</option>' + filteredChannels.map(function(c){ return '<option value="' + c.name + '">' + c.name + '</option>'; }).join('');
}

function addStoreAmountRow() {
  storeAmountValues.push({amount: '', basePoints: '', bonusRate: 0, bonusPoints: 0, totalPoints: 0});
  renderStoreAmountTable();
}

function addStoreAmount() { addStoreAmountRow(); }

function updateStoreAmountField(idx, field, value) {
  var row = storeAmountValues[idx];
  if (!row) return;
  var val = parseInt(value) || 0;
  if (field === 'amount') row.amount = val;
  else if (field === 'basePoints') row.basePoints = val;
  else if (field === 'bonusRate') row.bonusRate = val;
  row.bonusPoints = Math.floor((row.basePoints || 0) * (row.bonusRate || 0) / 100);
  row.totalPoints = (row.basePoints || 0) + row.bonusPoints;
  // Update readonly cells without full re-render
  var bpCell = document.getElementById('smBonusPoints_' + idx);
  var tpCell = document.getElementById('smTotalPoints_' + idx);
  if (bpCell) bpCell.textContent = row.bonusPoints;
  if (tpCell) tpCell.textContent = row.totalPoints;
  document.getElementById('smAmountCount').textContent = storeAmountValues.length;
}

// 自動計算贈點和實際點數（legacy, kept for compatibility）
function calcStoreAmountPreview() {}

function removeStoreAmount(idx) {
  storeAmountValues.splice(idx, 1);
  renderStoreAmountTable();
}

function renderStoreAmountTable() {
  var tbody = document.getElementById('smAmountTableBody');
  if (!tbody) return;
  var countEl = document.getElementById('smAmountCount');
  if (countEl) countEl.textContent = storeAmountValues.length;
  if (storeAmountValues.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#9CA3AF;padding:12px">尚未有任何資料</td></tr>';
    return;
  }
  tbody.innerHTML = storeAmountValues.map(function(v, i) {
    return '<tr>' +
      '<td style="text-align:center">' + (i + 1) + '</td>' +
      '<td><input type="number" value="' + (v.amount || '') + '" placeholder="請輸入金額" style="width:100%;padding:4px;border:1px solid #D1D5DB;border-radius:4px" oninput="updateStoreAmountField(' + i + ',\'amount\',this.value)"></td>' +
      '<td><input type="number" value="' + (v.basePoints || '') + '" placeholder="請輸入基本點數" style="width:100%;padding:4px;border:1px solid #D1D5DB;border-radius:4px" oninput="updateStoreAmountField(' + i + ',\'basePoints\',this.value)"></td>' +
      '<td><input type="number" value="' + (v.bonusRate || 0) + '" placeholder="請輸入贈比" style="width:100%;padding:4px;border:1px solid #D1D5DB;border-radius:4px" oninput="updateStoreAmountField(' + i + ',\'bonusRate\',this.value)"></td>' +
      '<td style="text-align:center" id="smBonusPoints_' + i + '">' + (v.bonusPoints || 0) + '</td>' +
      '<td style="text-align:center" id="smTotalPoints_' + i + '">' + (v.totalPoints || 0) + '</td>' +
      '<td style="text-align:center"><button class="btn-icon btn-icon-danger" onclick="removeStoreAmount(' + i + ')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></td>' +
      '</tr>';
  }).join('');
}

function saveStoreItem() {
  var type = document.getElementById('smType').value;
  var name = document.getElementById('smName').value.trim();
  var vips = getSelectedVips();
  var status = document.getElementById('smStatus').className.includes('on') ? 'on' : 'off';
  
  if (!type) { alert('請選擇儲值類型'); return; }
  if (!name) { alert('請輸入項目名稱'); return; }
  if (vips.length === 0) { alert('請選擇適用 VIP 等級'); return; }
  
  var provider = '', method = '', channel = '', desc = '';
  if (type === '一般') {
    provider = document.getElementById('smProvider').value;
    method = document.getElementById('smMethod').value;
    channel = document.getElementById('smChannel').value;
    desc = document.getElementById('smDesc').value.trim();
    if (!provider || !method || !channel) { alert('請填寫必填欄位'); return; }
  }
  
  if (editingStoreId) {
    var item = storeItems.find(function(x){ return x.id === editingStoreId; });
    item.type = type; item.name = name; item.vip = vips; item.status = status; item.desc = desc;
    if (type === '一般') {
      item.provider = provider; item.method = method; item.channel = channel; item.amounts = storeAmountValues.slice();
    } else {
      item.provider = ''; item.method = ''; item.channel = ''; item.amounts = [];
    }
  } else {
    var newItem = {id: 'sg' + (storeItems.length + 1), name: name, type: type, vip: vips, status: status, desc: desc};
    if (type === '一般') {
      newItem.provider = provider; newItem.method = method; newItem.channel = channel; newItem.amounts = storeAmountValues.slice();
    } else {
      newItem.provider = ''; newItem.method = ''; newItem.channel = ''; newItem.amounts = [];
    }
    storeItems.push(newItem);
  }
  closeModal('storeModal');
  renderStoreTable();
}

function deleteStoreItem(id) {
  if (!confirm('確定要刪除此項目？')) return;
  var idx = storeItems.findIndex(function(x){ return x.id === id; });
  if (idx >= 0) storeItems.splice(idx, 1);
  renderStoreTable();
}
