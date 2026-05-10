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
  {id:'c1',provider:'mycard',method:'點數卡',name:'點數卡',code:'COPGAM05',status:'on',values:[50,100,300,500,1000]},
  {id:'c2',provider:'mycard',method:'電信帳單',name:'手機小額付款',code:'HE0004',status:'off',values:[100,300,500]},
  {id:'c3',provider:'mycard',method:'線上轉點',name:'信用卡3D',code:'CHANNEL_1E8B',status:'off',values:[100,300,500,1000]},
  {id:'c4',provider:'gash',method:'點數卡',name:'點數卡',code:'GASH_PNT01',status:'on',values:[100,300,500,1000,2000]},
  {id:'c5',provider:'gash',method:'會員扣點',name:'錢包扣點',code:'COPGAM09',status:'on',values:[50,100,500]},
  {id:'c6',provider:'linepay',method:'行動支付',name:'LINE Pay',code:'LP_001',status:'on',values:[100,300,500,1000,3000]},
  {id:'c7',provider:'ecpay',method:'信用卡',name:'信用卡一次付',code:'EC_CC01',status:'off',values:[300,500,1000,3000]},
  {id:'c8',provider:'ecpay',method:'ATM轉帳',name:'ATM虛擬帳號',code:'EC_ATM01',status:'off',values:[500,1000,3000,5000]},
  {id:'c9',provider:'startest',method:'測試支付',name:'測試通道A',code:'TEST_A',status:'on',values:[10,50,100]},
  {id:'c10',provider:'startest',method:'測試支付',name:'測試通道B',code:'TEST_B',status:'on',values:[50,100,500]}
];

// 商城管理資料（一般+快速合併，type 區分）
const storeItems = [
  {id:'sg1',name:'線上轉點',provider:'mycard',method:'線上轉點',channel:'信用卡3D',type:'一般',vip:['新手','金牌','鑽石','銀牌','白金','銅牌'],status:'on'},
  {id:'sg2',name:'電信帳單',provider:'mycard',method:'電信帳單',channel:'手機小額付款',type:'一般',vip:['新手','白金','金牌','鑽石','銅牌','銀牌'],status:'on'},
  {id:'sg3',name:'Gash錢包扣點',provider:'gash',method:'會員扣點',channel:'錢包扣點',type:'一般',vip:['新手','白金','銅牌','鑽石','銀牌','金牌'],status:'on'},
  {id:'sg4',name:'LINE Pay儲值',provider:'linepay',method:'行動支付',channel:'LINE Pay',type:'一般',vip:['新手','金牌','鑽石'],status:'on'},
  {id:'sg5',name:'MyCard點數卡',provider:'mycard',method:'點數卡',channel:'點數卡',type:'一般',vip:['新手','銅牌','銀牌','金牌','白金','鑽石'],status:'on'},
  {id:'sf1',name:'快速儲值-點數卡',provider:'mycard',method:'點數卡',channel:'點數卡',type:'快速',vip:['新手','銅牌','銀牌'],status:'on'},
  {id:'sf2',name:'快速儲值-錢包',provider:'gash',method:'會員扣點',channel:'錢包扣點',type:'快速',vip:['新手','金牌'],status:'on'},
  {id:'sf3',name:'快速儲值-LINE',provider:'linepay',method:'行動支付',channel:'LINE Pay',type:'快速',vip:['新手','鑽石','白金'],status:'on'},
  {id:'sf4',name:'快速儲值-電信',provider:'mycard',method:'電信帳單',channel:'手機小額付款',type:'快速',vip:['新手','銅牌'],status:'on'}
];

let currentProvider = 'mycard';
let currentTab = 'methods';
let currentPage = 1;
let currentSection = 'payment'; // 'payment' or 'store'
const pageSize = 10;

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
}

// === Store Section ===
function renderStoreTable() {
  var container = document.getElementById('storeTableContainer');
  if (!container) return;
  var data = storeItems;
  var providerOff = providers.filter(function(p){ return p.status === 'off'; }).map(function(p){ return p.id; });

  var total = data.length;
  var totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (currentPage > totalPages) currentPage = totalPages;
  var start = (currentPage - 1) * pageSize;
  var pageData = data.slice(start, start + pageSize);

  var rows = pageData.map(function(item) {
    var blocked = providerOff.indexOf(item.provider) >= 0;
    var rowCls = blocked ? ' class="row-blocked"' : '';
    var provName = (providers.find(function(p){ return p.id === item.provider; }) || {}).name || item.provider;
    var statusHtml = blocked ?
      '<label class="switch-cell"><button class="toggle off" disabled></button></label>' :
      '<label class="switch-cell"><button class="toggle ' + item.status + '" onclick="toggleStoreStatus(\'' + item.id + '\')"></button></label>';
    var vipHtml = item.vip.map(function(v){ return '<span class="vip-tag">' + v + '</span>'; }).join('');
    return '<tr' + rowCls + '>' +
      '<td>' + provName + '</td>' +
      '<td>' + item.name + '</td>' +
      '<td><span class="type-badge ' + (item.type === '快速' ? 'fast' : 'normal') + '">' + item.type + '</span></td>' +
      '<td>' + item.method + '</td>' +
      '<td>' + item.channel + '</td>' +
      '<td>' + statusHtml + '</td>' +
      '<td><div class="vip-tags">' + vipHtml + '</div></td>' +
      renderActionCell('StoreEdit', item.id, blocked) + '</tr>';
  }).join('');

  if (!rows) rows = '<tr><td colspan="8" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';

  container.innerHTML = '<table class="data-table"><thead><tr><th>供應商</th><th>項目名稱</th><th>類型</th><th>支付方式</th><th>付款通道</th><th>狀態</th><th>適用 VIP 等級</th><th>操作</th></tr></thead><tbody>' + rows + '</tbody></table>';

  document.getElementById('storePageInfo').textContent = '顯示 ' + (total ? start + 1 : 0) + '-' + Math.min(start + pageSize, total) + ' 筆，共 ' + total + ' 筆';
  var pageBtns = '';
  for (var i = 1; i <= totalPages; i++) {
    pageBtns += '<button class="' + (i === currentPage ? 'active' : '') + '" onclick="goStorePage(' + i + ')">' + i + '</button>';
  }
  document.getElementById('storePageButtons').innerHTML = pageBtns;
}

function goStorePage(p) { currentPage = p; renderStoreTable(); }

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

// === 共用操作按鈕元件（編輯icon + 刪除icon） ===
function renderActionCell(type, id, disabled) {
  var dis = disabled ? ' disabled' : '';
  return '<td class="action-cell">' +
    '<button class="btn-icon" title="編輯"' + dis + ' onclick="open' + type + 'Modal(\'' + id + '\')">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>' +
    '</button>' +
    '<button class="btn-icon btn-icon-danger" title="刪除"' + dis + ' onclick="delete' + type + '(\'' + id + '\')">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
    '</button>' +
    '</td>';
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
    headers = '<th>Logo</th><th>支付方式</th><th>狀態</th><th>操作</th>';
  } else {
    data = channels.filter(function(c){ return c.provider === currentProvider; });
    headers = '<th>支付方式</th><th>付款通道</th><th>通道代碼</th><th>儲值金額</th><th>狀態</th><th>操作</th>';
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
    rows = pageData.map(function(m){ return '<tr><td>' + m.logo + '</td><td>' + m.name + '</td><td><label class="switch-cell"><button class="toggle ' + m.status + '" onclick="toggleItemStatus(\'methods\',\'' + m.id + '\')"></button></label></td>' + renderActionCell('Method', m.id) + '</tr>'; }).join('');
  } else {
    rows = pageData.map(function(c){ return '<tr><td>' + c.method + '</td><td>' + c.name + '</td><td><code style="font-size:11px;color:#6B7280">' + c.code + '</code></td><td>' + (c.values || []).map(function(v){ return '<span style="display:inline-block;padding:2px 8px;background:#F3F4F6;border-radius:4px;margin:2px;font-size:11px">$' + v + '</span>'; }).join('') + '</td><td><label class="switch-cell"><button class="toggle ' + c.status + '" onclick="toggleItemStatus(\'channels\',\'' + c.id + '\')"></button></label></td>' + renderActionCell('Channel', c.id) + '</tr>'; }).join('');
  }

  if (!rows) rows = '<tr><td colspan="6" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';

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
  
  // 清空金額 tags
  channelAmountValues = [];
  renderChannelAmountTags();
  
  if (id) {
    var c = channels.find(function(x){ return x.id === id; });
    document.getElementById('cmCode').value = c.code;
    document.getElementById('cmName').value = c.name;
    selP.value = c.provider;
    selM.value = c.method;
    document.getElementById('cmStatus').className = 'toggle ' + c.status;
    channelAmountValues = c.values || [];
    renderChannelAmountTags();
  } else {
    document.getElementById('cmCode').value = '';
    document.getElementById('cmName').value = '';
    selP.value = currentProvider;
    document.getElementById('cmStatus').className = 'toggle on';
  }
  document.getElementById('channelModal').classList.add('show');
}

var channelAmountValues = [];

function addChannelAmountTag() {
  var input = document.getElementById('cmNewAmount');
  var val = parseInt(input.value);
  if (!val || val <= 0) { alert('請輸入有效金額'); return; }
  if (channelAmountValues.indexOf(val) >= 0) { alert('金額已存在'); return; }
  channelAmountValues.push(val);
  channelAmountValues.sort(function(a,b){ return a - b; });
  renderChannelAmountTags();
  input.value = '';
}

function removeChannelAmountTag(val) {
  var idx = channelAmountValues.indexOf(val);
  if (idx >= 0) channelAmountValues.splice(idx, 1);
  renderChannelAmountTags();
}

function renderChannelAmountTags() {
  var container = document.getElementById('cmAmountTags');
  if (!channelAmountValues.length) {
    container.innerHTML = '<div style="color:#9CA3AF;font-size:12px;padding:8px 0">尚未新增金額</div>';
    return;
  }
  container.innerHTML = channelAmountValues.map(function(v){
    return '<span class="amount-tag">$' + v + '<button onclick="removeChannelAmountTag(' + v + ')">&times;</button></span>';
  }).join('');
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

function openStoreAddModal() {
  editingStoreId = null;
  var title = currentStoreTab === 'general' ? '新增一般儲值' : '新增快速儲值';
  document.getElementById('storeModalTitle').textContent = title;
  document.getElementById('smName').value = '';
  var selP = document.getElementById('smProvider');
  selP.innerHTML = '<option value="">請選擇供應商</option>' + providers.map(function(p){ return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
  document.getElementById('smMethod').innerHTML = '<option value="">請選擇支付方式</option>';
  document.getElementById('smChannel').innerHTML = '<option value="">請選擇付款通道</option>';
  // Reset VIP checkboxes
  document.querySelectorAll('#smVipGroup input').forEach(function(cb){ cb.checked = cb.value === '新手'; });
  document.getElementById('smStatus').className = 'toggle on';
  // Provider change → populate method/channel
  selP.onchange = function() { populateStoreDropdowns(selP.value); };
  document.getElementById('storeModal').classList.add('show');
}

function openStoreEditModal(id) {
  editingStoreId = id;
  var item = storeItems.find(function(x){ return x.id === id; });
  if (!item) return;
  var title = '編輯儲值類型';
  document.getElementById('storeModalTitle').textContent = title;
  document.getElementById('smName').value = item.name;
  var selP = document.getElementById('smProvider');
  selP.innerHTML = '<option value="">請選擇供應商</option>' + providers.map(function(p){ return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
  selP.value = item.provider;
  populateStoreDropdowns(item.provider);
  document.getElementById('smMethod').value = item.method;
  document.getElementById('smChannel').value = item.channel;
  // Set VIP checkboxes
  document.querySelectorAll('#smVipGroup input').forEach(function(cb){
    cb.checked = item.vip.indexOf(cb.value) >= 0;
  });
  document.getElementById('smStatus').className = 'toggle ' + item.status;
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

function saveStoreItem() {
  var provider = document.getElementById('smProvider').value;
  var name = document.getElementById('smName').value.trim();
  var method = document.getElementById('smMethod').value;
  var channel = document.getElementById('smChannel').value;
  var status = document.getElementById('smStatus').className.includes('on') ? 'on' : 'off';
  var vip = [];
  document.querySelectorAll('#smVipGroup input:checked').forEach(function(cb){ vip.push(cb.value); });
  if (!provider || !name || !method || !channel) { alert('請填寫必填欄位'); return; }
  var data = currentStoreTab === 'general' ? storeGeneral : storeFast;
  if (editingStoreId) {
    var item = data.find(function(x){ return x.id === editingStoreId; });
    item.provider = provider; item.name = name; item.method = method; item.channel = channel; item.vip = vip; item.status = status;
  } else {
    var prefix = currentStoreTab === 'general' ? 'sg' : 'sf';
    data.push({id: prefix + (data.length + 1), provider: provider, name: name, method: method, channel: channel, vip: vip, status: status});
  }
  closeModal('storeModal');
  renderStoreTable();
}

function deleteStoreItem(id) {
  if (!confirm('確定要刪除此商品？')) return;
  var idx = storeItems.findIndex(function(x){ return x.id === id; });
  if (idx >= 0) storeItems.splice(idx, 1);
  renderStoreTable();
}
