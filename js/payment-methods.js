// === Data (shared with payment-management) ===
const providers = [
  {id:'mycard',name:'MyCard',code:'MYCARD01',status:'on'},
  {id:'gash',name:'Gash',code:'GASH001',status:'on'},
  {id:'linepay',name:'LINE Pay',code:'LINEPAY01',status:'on'},
  {id:'ecpay',name:'綠界科技',code:'ECPAY01',status:'off'},
  {id:'esun',name:'玉山銀行',code:'70424393',status:'off'},
  {id:'fetnet',name:'遠傳電信',code:'93E5B061',status:'off'},
  {id:'startest',name:'星運測試商',code:'AB00888',status:'on'}
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
  {id:'c1',provider:'mycard',method:'點數卡',name:'點數卡',code:'COPGAM05',logo:'https://placehold.co/80x80/EEF2FF/4338CA?text=點數卡',status:'on'},
  {id:'c2',provider:'mycard',method:'電信帳單',name:'手機小額付款',code:'HE0004',logo:'https://placehold.co/80x80/FEF3C7/D97706?text=電信',status:'off'},
  {id:'c3',provider:'mycard',method:'線上轉點',name:'信用卡3D',code:'CHANNEL_1E8B',logo:'https://placehold.co/80x80/DCFCE7/166534?text=3D',status:'off'},
  {id:'c4',provider:'gash',method:'點數卡',name:'點數卡',code:'GASH_PNT01',logo:'https://placehold.co/80x80/EEF2FF/4338CA?text=點數卡',status:'on'},
  {id:'c5',provider:'gash',method:'會員扣點',name:'錢包扣點',code:'COPGAM09',logo:'https://placehold.co/80x80/F3E8FF/7C3AED?text=錢包',status:'on'},
  {id:'c6',provider:'linepay',method:'行動支付',name:'LINE Pay',code:'LP_001',logo:'https://placehold.co/80x80/DCFCE7/166534?text=LINE',status:'on'},
  {id:'c7',provider:'ecpay',method:'信用卡',name:'信用卡一次付',code:'EC_CC01',logo:'https://placehold.co/80x80/FEE2E2/991B1B?text=信用卡',status:'off'},
  {id:'c8',provider:'ecpay',method:'ATM轉帳',name:'ATM虛擬帳號',code:'EC_ATM01',logo:'https://placehold.co/80x80/E0F2FE/0369A1?text=ATM',status:'off'},
  {id:'c9',provider:'startest',method:'測試支付',name:'測試通道A',code:'TEST_A',logo:'https://placehold.co/80x80/F3F4F6/374151?text=測試A',status:'on'},
  {id:'c10',provider:'startest',method:'測試支付',name:'測試通道B',code:'TEST_B',logo:'https://placehold.co/80x80/F3F4F6/374151?text=測試B',status:'on'}
];

let currentProvider = '';  // empty = all
let currentTab = 'methods';
let currentPage = 1;
let pageSize = 20;

// === Init ===
function init() {
  var sel = document.getElementById('providerSelect');
  sel.innerHTML = '<option value="">全部供應商</option>' + providers.map(function(p) {
    return '<option value="' + p.id + '">' + p.name + (p.status === 'off' ? ' [停用]' : '') + '</option>';
  }).join('');
  renderTable();
}

function selectProvider(id) {
  currentProvider = id;
  currentPage = 1;
  renderTable();
}

function changePageSize(val) {
  pageSize = parseInt(val);
  currentPage = 1;
  renderTable();
}

// === Tabs ===
function switchTab(tab, el) {
  currentTab = tab;
  currentPage = 1;
  document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
  if (el) el.classList.add('active');
  document.getElementById('addItemLabel').textContent = tab === 'methods' ? '新增支付方式' : '新增付款通道';
  renderTable();
}

// === Table ===
function renderTable() {
  var nameFilter = (document.getElementById('filterName') || {}).value || '';
  var statusFilter = (document.getElementById('filterStatus') || {}).value || '';

  if (currentTab === 'methods') {
    var data = methods.filter(function(m) {
      if (currentProvider && m.provider !== currentProvider) return false;
      if (nameFilter && m.name.indexOf(nameFilter) < 0) return false;
      if (statusFilter && m.status !== statusFilter) return false;
      return true;
    });
    var total = data.length;
    var totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;
    var start = (currentPage - 1) * pageSize;
    var pageData = data.slice(start, start + pageSize);

    var rows = pageData.map(function(m) {
      var prov = providers.find(function(x){ return x.id === m.provider; });
      var provName = prov ? prov.name : m.provider;
      var statusHtml = renderStatusCell(m.status, "toggleMethodStatus('" + m.id + "')");
      var provCol = currentProvider ? '' : '<td>' + provName + '</td>';
      return '<tr><td><img src="' + m.logo + '" style="width:32px;height:32px;border-radius:6px;object-fit:cover"></td><td>' + m.name + '</td>' + provCol + statusHtml + '<td class="action-cell"><div class="action-inner">' + UI.btn.icon('edit', "openMethodModal('" + m.id + "')", '編輯') + '</div></td></tr>';
    }).join('');
    var colCount = currentProvider ? 4 : 5;
    if (!rows) rows = '<tr><td colspan="'+colCount+'" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';
    var provTh = currentProvider ? '' : '<th>供應商</th>';
    document.getElementById('tableContainer').innerHTML = '<table class="data-table"><thead><tr><th>Logo</th><th>支付方式</th>' + provTh + '<th>狀態</th><th>操作</th></tr></thead><tbody>' + rows + '</tbody></table>';
  } else {
    var data = channels.filter(function(c) {
      if (currentProvider && c.provider !== currentProvider) return false;
      if (nameFilter && c.name.indexOf(nameFilter) < 0) return false;
      if (statusFilter && c.status !== statusFilter) return false;
      return true;
    });
    var total = data.length;
    var totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (currentPage > totalPages) currentPage = totalPages;
    var start = (currentPage - 1) * pageSize;
    var pageData = data.slice(start, start + pageSize);

    var rows = pageData.map(function(c) {
      var statusHtml = renderStatusCell(c.status, "toggleChannelStatus('" + c.id + "')");
      return '<tr><td><img src="' + c.logo + '" style="width:32px;height:32px;border-radius:6px;object-fit:cover"></td><td>' + c.name + '</td><td>' + c.method + '</td><td style="font-family:monospace;font-size:11px;color:#6B7280">' + c.code + '</td>' + statusHtml + '<td class="action-cell"><div class="action-inner">' + UI.btn.icon('edit', "openChannelModal('" + c.id + "')", '編輯') + '</div></td></tr>';
    }).join('');
    if (!rows) rows = '<tr><td colspan="6" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';
    document.getElementById('tableContainer').innerHTML = '<table class="data-table"><thead><tr><th>Logo</th><th>通道名稱</th><th>支付方式</th><th>代碼</th><th>狀態</th><th>操作</th></tr></thead><tbody>' + rows + '</tbody></table>';
  }

  // Pagination
  document.getElementById('pageInfo').textContent = '第 ' + currentPage + ' 頁，共 ' + total + ' 筆資料';
  var pageBtns = '<button class="page-arrow" onclick="goPage(' + Math.max(1, currentPage - 1) + ')" ' + (currentPage <= 1 ? 'disabled' : '') + '>&lt;</button>';
  for (var i = 1; i <= totalPages; i++) {
    pageBtns += '<button class="' + (i === currentPage ? 'active' : '') + '" onclick="goPage(' + i + ')">' + i + '</button>';
  }
  pageBtns += '<button class="page-arrow" onclick="goPage(' + Math.min(totalPages, currentPage + 1) + ')" ' + (currentPage >= totalPages ? 'disabled' : '') + '>&gt;</button>';
  document.getElementById('pageButtons').innerHTML = pageBtns;

  var jumpOpts = '';
  for (var j = 1; j <= totalPages; j++) {
    jumpOpts += '<option value="' + j + '"' + (j === currentPage ? ' selected' : '') + '>第' + j + '頁</option>';
  }
  document.getElementById('pageJump').innerHTML = jumpOpts;
}

function renderStatusCell(status, onclick) {
  return '<td><div class="switch-cell" onclick="' + onclick + '"><button class="toggle ' + status + '"></button><span class="status-label ' + status + '">' + (status === 'on' ? '啟用' : '停用') + '</span></div></td>';
}

function goPage(p) { currentPage = p; renderTable(); }
function applyFilter() { currentPage = 1; renderTable(); }
function resetFilter() {
  document.getElementById('filterName').value = '';
  document.getElementById('filterStatus').value = '';
  currentPage = 1;
  renderTable();
}

// === Status toggles ===
function toggleMethodStatus(id) {
  var m = methods.find(function(x){ return x.id === id; });
  if (m) { m.status = m.status === 'on' ? 'off' : 'on'; }
  renderTable();
}
function toggleChannelStatus(id) {
  var c = channels.find(function(x){ return x.id === id; });
  if (c) { c.status = c.status === 'on' ? 'off' : 'on'; }
  renderTable();
}

// === Modals ===
function openAddModal() {
  if (currentTab === 'methods') openMethodModal();
  else openChannelModal();
}

function openMethodModal(id) {
  var modal = document.getElementById('methodModal');
  var title = document.getElementById('methodModalTitle');
  var sel = document.getElementById('mmProvider');
  sel.innerHTML = '<option value="">請選擇供應商</option>' + providers.map(function(p){ return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
  if (id) {
    var m = methods.find(function(x){ return x.id === id; });
    title.textContent = '編輯支付方式';
    sel.value = m.provider;
    document.getElementById('mmName').value = m.name;
    document.getElementById('mmStatus').className = 'toggle ' + m.status;
  } else {
    title.textContent = '新增支付方式';
    sel.value = currentProvider;
    document.getElementById('mmName').value = '';
    document.getElementById('mmStatus').className = 'toggle on';
  }
  modal.classList.add('show');
}

function openChannelModal(id) {
  var modal = document.getElementById('channelModal');
  var title = document.getElementById('channelModalTitle');
  var pSel = document.getElementById('cmProvider');
  pSel.innerHTML = '<option value="">請選擇供應商</option>' + providers.map(function(p){ return '<option value="' + p.id + '">' + p.name + '</option>'; }).join('');
  var mSel = document.getElementById('cmMethod');
  mSel.innerHTML = '<option value="">請選擇支付方式</option>' + methods.filter(function(m){ return m.provider === currentProvider; }).map(function(m){ return '<option value="' + m.name + '">' + m.name + '</option>'; }).join('');
  if (id) {
    var c = channels.find(function(x){ return x.id === id; });
    title.textContent = '編輯付款通道';
    pSel.value = c.provider;
    mSel.value = c.method;
    document.getElementById('cmName').value = c.name;
    document.getElementById('cmCode').value = c.code || '';
    document.getElementById('cmStatus').className = 'toggle ' + c.status;
  } else {
    title.textContent = '新增付款通道';
    pSel.value = currentProvider;
    document.getElementById('cmName').value = '';
    document.getElementById('cmCode').value = '';
    document.getElementById('cmStatus').className = 'toggle on';
  }
  modal.classList.add('show');
}

function closeModal(id) { document.getElementById(id).classList.remove('show'); }
function saveMethod() { closeModal('methodModal'); }
function saveChannel() { closeModal('channelModal'); }

// === Start ===
document.addEventListener('DOMContentLoaded', init);
