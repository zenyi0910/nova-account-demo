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
  {id:'m1',provider:'mycard',name:'點數卡',logo:'🎴',status:'on'},
  {id:'m2',provider:'mycard',name:'電信帳單',logo:'📱',status:'on'},
  {id:'m3',provider:'mycard',name:'線上轉點',logo:'💳',status:'off'},
  {id:'m4',provider:'gash',name:'點數卡',logo:'🎴',status:'on'},
  {id:'m5',provider:'gash',name:'會員扣點',logo:'👛',status:'on'},
  {id:'m6',provider:'linepay',name:'行動支付',logo:'📲',status:'on'},
  {id:'m7',provider:'ecpay',name:'信用卡',logo:'💳',status:'off'},
  {id:'m8',provider:'ecpay',name:'ATM轉帳',logo:'🏧',status:'off'},
  {id:'m9',provider:'startest',name:'測試支付',logo:'🧪',status:'on'}
];

const channels = [
  {id:'c1',provider:'mycard',method:'點數卡',name:'點數卡',code:'COPGAM05',status:'on'},
  {id:'c2',provider:'mycard',method:'電信帳單',name:'手機小額付款',code:'HE0004',status:'off'},
  {id:'c3',provider:'mycard',method:'線上轉點',name:'信用卡3D',code:'CHANNEL_1E8B',status:'off'},
  {id:'c4',provider:'gash',method:'點數卡',name:'點數卡',code:'GASH_PNT01',status:'on'},
  {id:'c5',provider:'gash',method:'會員扣點',name:'錢包扣點',code:'COPGAM09',status:'on'},
  {id:'c6',provider:'linepay',method:'行動支付',name:'LINE Pay',code:'LP_001',status:'on'},
  {id:'c7',provider:'ecpay',method:'信用卡',name:'信用卡一次付',code:'EC_CC01',status:'off'},
  {id:'c8',provider:'ecpay',method:'ATM轉帳',name:'ATM虛擬帳號',code:'EC_ATM01',status:'off'},
  {id:'c9',provider:'startest',method:'測試支付',name:'測試通道A',code:'TEST_A',status:'on'},
  {id:'c10',provider:'startest',method:'測試支付',name:'測試通道B',code:'TEST_B',status:'on'}
];

const amounts = [
  {id:'a1',provider:'mycard',method:'點數卡',channel:'點數卡',values:[50,100,300,500,1000],status:'on'},
  {id:'a2',provider:'gash',method:'點數卡',channel:'點數卡',values:[100,300,500,1000,2000],status:'on'},
  {id:'a3',provider:'gash',method:'會員扣點',channel:'錢包扣點',values:[50,100,500],status:'on'},
  {id:'a4',provider:'linepay',method:'行動支付',channel:'LINE Pay',values:[100,300,500,1000,3000],status:'on'},
  {id:'a5',provider:'startest',method:'測試支付',channel:'測試通道A',values:[10,50,100],status:'on'}
];

let currentProvider = 'mycard';
let currentTab = 'methods';
let currentPage = 1;
const pageSize = 10;

// === Init ===
function init() {
  renderProviders();
  renderDetail();
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
    return '<div class="sched-item">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
      '<span class="time">' + startStr + ' ~ ' + endStr + '</span>' +
      '<span class="action-tag ' + s.action + '">' + (s.action === 'off' ? '關閉' : '開啟') + '</span>' +
      '<span class="note">' + (s.note || '') + '</span>' +
      '<span class="spacer"></span>' +
      '<button class="del-btn" onclick="delSched(' + i + ')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' +
    '</div>';
  }).join('');
}

function openSchedModal() { document.getElementById('schedModal').classList.add('show'); }
function closeModal(id) { document.getElementById(id).classList.remove('show'); }

function addSchedule() {
  var p = providers.find(function(x){ return x.id === currentProvider; });
  var start = document.getElementById('schedStart').value;
  var end = document.getElementById('schedEnd').value;
  var action = document.getElementById('schedAction').value;
  var note = document.getElementById('schedNote').value;
  if (!start) { alert('請選擇開始時間'); return; }
  p.schedules.push({action:action, start:start, end:end, note:note});
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

// === Tabs ===
function switchTab(tab, el) {
  currentTab = tab;
  currentPage = 1;
  document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
  if (el) el.classList.add('active');
  else document.querySelector('.tab-btn[data-tab="' + tab + '"]').classList.add('active');
  renderTable();
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
    headers = '<th>Logo</th><th>支付方式</th><th>狀態</th><th>操作</th>';
  } else if (currentTab === 'channels') {
    data = channels.filter(function(c){ return c.provider === currentProvider; });
    headers = '<th>支付方式</th><th>付款通道</th><th>通道代碼</th><th>狀態</th><th>操作</th>';
  } else {
    data = amounts.filter(function(a){ return a.provider === currentProvider; });
    headers = '<th>支付方式</th><th>付款通道</th><th>金額選項</th><th>狀態</th><th>操作</th>';
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
    rows = pageData.map(function(m){ return '<tr><td>' + m.logo + '</td><td>' + m.name + '</td><td><span class="status-badge ' + m.status + '">' + (m.status === 'on' ? '啟用' : '停用') + '</span></td><td><button class="btn-outline" style="padding:4px 10px;font-size:12px">編輯</button></td></tr>'; }).join('');
  } else if (currentTab === 'channels') {
    rows = pageData.map(function(c){ return '<tr><td>' + c.method + '</td><td>' + c.name + '</td><td><code style="font-size:11px;color:#6B7280">' + c.code + '</code></td><td><span class="status-badge ' + c.status + '">' + (c.status === 'on' ? '啟用' : '停用') + '</span></td><td><button class="btn-outline" style="padding:4px 10px;font-size:12px">編輯</button></td></tr>'; }).join('');
  } else {
    rows = pageData.map(function(a){ return '<tr><td>' + a.method + '</td><td>' + a.channel + '</td><td>' + a.values.map(function(v){ return '<span style="display:inline-block;padding:2px 8px;background:#F3F4F6;border-radius:4px;margin:2px;font-size:11px">$' + v + '</span>'; }).join('') + '</td><td><span class="status-badge ' + a.status + '">' + (a.status === 'on' ? '啟用' : '停用') + '</span></td><td><button class="btn-outline" style="padding:4px 10px;font-size:12px">編輯</button></td></tr>'; }).join('');
  }

  if (!rows) rows = '<tr><td colspan="5" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';

  container.innerHTML = '<table class="data-table"><thead><tr>' + headers + '</tr></thead><tbody>' + rows + '</tbody></table>';

  document.getElementById('pageInfo').textContent = '顯示 ' + (total ? start + 1 : 0) + '-' + Math.min(start + pageSize, total) + ' 筆，共 ' + total + ' 筆';
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
