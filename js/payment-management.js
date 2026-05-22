// === Data ===
const providers = [
  {id:'mycard',name:'MyCard',code:'MYCARD01',status:'on',schedules:[
    {action:'off',start:'2026-05-20T02:00',end:'2026-05-20T06:00',note:'v3.2 版本更新',channels:['點數卡','手機小額付款','信用卡3D','電信帳單','線上轉點','超商代碼']},
    {action:'off',start:'2026-05-22T03:00',end:'2026-05-22T05:00',note:'例行維護',channels:['點數卡','電信帳單']},
    {action:'off',start:'2026-05-16T02:00',end:'2026-05-16T04:00',note:'版本更新',channels:['點數卡','手機小額付款','信用卡3D','電信帳單','線上轉點','超商代碼']},
    {action:'off',start:'2026-05-14T03:00',end:'2026-05-14T05:00',note:'例行維護',channels:['點數卡']},
    {action:'off',start:'2026-05-12T22:00',end:'2026-05-13T01:00',note:'緊急安全修補'},
    {action:'off',start:'2026-05-07T01:00',end:'2026-05-07T04:00',note:'資料庫遷移',channels:['點數卡','手機小額付款','線上轉點']},
    {action:'off',start:'2026-04-30T02:00',end:'2026-04-30T05:00',note:'v3.1 版本更新',channels:['點數卡','信用卡3D','超商代碼']},
    {action:'off',start:'2026-04-23T03:00',end:'2026-04-23T04:30',note:'SSL 憑證更新',channels:['點數卡','手機小額付款','信用卡3D','電信帳單','線上轉點','超商代碼']}
  ]},
  {id:'gash',name:'Gash',code:'GASH001',status:'on',schedules:[
    {action:'off',start:'2026-05-21T22:00',end:'2026-05-22T02:00',note:'系統升級',channels:['點數卡','錢包扣點','信用卡','ATM轉帳','超商代碼']},
    {action:'off',start:'2026-05-11T22:00',end:'2026-05-12T02:00',note:'緊急修復',channels:['點數卡','錢包扣點','信用卡','ATM轉帳','超商代碼']},
    {action:'off',start:'2026-05-03T01:00',end:'2026-05-03T03:00',note:'例行維護',channels:['點數卡','錢包扣點']},
    {action:'off',start:'2026-04-26T02:00',end:'2026-04-26T04:00',note:'金流對帳修正',channels:['ATM轉帳','超商代碼']}
  ]},
  {id:'linepay',name:'LINE Pay',code:'LINEPAY01',status:'on',schedules:[
    {action:'off',start:'2026-05-19T01:00',end:'2026-05-19T03:00',note:'API 版本升級',channels:['LINE Pay']},
    {action:'off',start:'2026-05-15T01:00',end:'2026-05-15T03:00',note:'系統升級',channels:['LINE Pay']},
    {action:'off',start:'2026-05-08T02:00',end:'2026-05-08T04:00',note:'憑證更換',channels:['LINE Pay']},
    {action:'off',start:'2026-04-28T01:00',end:'2026-04-28T02:30',note:'例行維護',channels:['LINE Pay']}
  ]},
  {id:'ecpay',name:'綠界科技',code:'ECPAY01',status:'off',schedules:[
    {action:'off',start:'2026-05-10T00:00',end:'2026-05-10T06:00',note:'停機維護（全通道）',channels:['信用卡','ATM','超商代碼','網路ATM']},
    {action:'off',start:'2026-04-25T02:00',end:'2026-04-25T04:00',note:'系統更新',channels:['信用卡','超商代碼']}
  ]},
  {id:'esun',name:'玉山銀行',code:'70424393',status:'off',schedules:[
    {action:'off',start:'2026-05-06T00:00',end:'2026-05-06T05:00',note:'核心系統升級',channels:['虛擬帳號','WebATM']},
    {action:'off',start:'2026-04-22T01:00',end:'2026-04-22T03:00',note:'例行維護',channels:['虛擬帳號']}
  ]},
  {id:'fetnet',name:'遠傳電信',code:'93E5B061',status:'off',schedules:[
    {action:'off',start:'2026-05-09T03:00',end:'2026-05-09T05:00',note:'計費系統維護',channels:['小額付款','電信帳單']}
  ]},
  {id:'startest',name:'星運測試商',code:'AB00888',status:'on',schedules:[
    {action:'off',start:'2026-05-25T02:00',end:'2026-05-25T04:00',note:'測試環境重建',channels:['測試通道A','測試通道B']}
  ]}
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

// 儲值金額表資料（獨立實體，綁定一種支付方式 + 多個付款通道）
const billingPlans = [
  {id:'bp1',name:'MyCard點數卡方案',provider:'mycard',method:'點數卡',channels:['c1'],vip:['新手','銅牌','銀牌','金牌','白金','鑽石'],status:'on',amounts:[{amount:150,basePoints:150,bonusRate:0,bonusPoints:0,totalPoints:150},{amount:300,basePoints:300,bonusRate:3,bonusPoints:9,totalPoints:309},{amount:500,basePoints:500,bonusRate:5,bonusPoints:25,totalPoints:525},{amount:1000,basePoints:1000,bonusRate:8,bonusPoints:80,totalPoints:1080},{amount:2000,basePoints:2000,bonusRate:10,bonusPoints:200,totalPoints:2200}]},
  {id:'bp2',name:'電信帳單方案',provider:'mycard',method:'電信帳單',channels:['c2'],vip:['新手','白金','金牌','鑽石','銅牌','銀牌'],status:'on',amounts:[{amount:50,basePoints:50,bonusRate:0,bonusPoints:0,totalPoints:50},{amount:100,basePoints:100,bonusRate:3,bonusPoints:3,totalPoints:103},{amount:300,basePoints:300,bonusRate:5,bonusPoints:15,totalPoints:315}]},
  {id:'bp3',name:'Gash錢包方案',provider:'gash',method:'會員扣點',channels:['c5'],vip:['新手','白金','銅牌','鑽石','銀牌','金牌'],status:'on',amounts:[{amount:50,basePoints:5000,bonusRate:3,bonusPoints:150,totalPoints:5150},{amount:100,basePoints:10000,bonusRate:5,bonusPoints:500,totalPoints:10500},{amount:300,basePoints:30000,bonusRate:8,bonusPoints:2400,totalPoints:32400}]},
  {id:'bp4',name:'LINE Pay方案',provider:'linepay',method:'行動支付',channels:['c6'],vip:['新手','金牌','鑽石'],status:'on',amounts:[{amount:100,basePoints:100,bonusRate:0,bonusPoints:0,totalPoints:100},{amount:500,basePoints:500,bonusRate:5,bonusPoints:25,totalPoints:525},{amount:1000,basePoints:1000,bonusRate:10,bonusPoints:100,totalPoints:1100},{amount:3000,basePoints:3000,bonusRate:12,bonusPoints:360,totalPoints:3360}]},
  {id:'bp5',name:'星運測試方案',provider:'startest',method:'測試支付',channels:['c9','c10'],vip:['新手','銅牌','銀牌'],status:'on',amounts:[{amount:10,basePoints:10,bonusRate:0,bonusPoints:0,totalPoints:10},{amount:50,basePoints:50,bonusRate:3,bonusPoints:1,totalPoints:51},{amount:100,basePoints:100,bonusRate:5,bonusPoints:5,totalPoints:105}]}
];

let currentProvider = 'mycard';
let currentTab = 'methods';
let currentPage = 1;
let currentSection = 'payment'; // 'payment' or 'billing'
let pageSize = 20;
let billingPageSize = 20;
let billingPage = 1;

function changePageSize(val) {
  pageSize = parseInt(val);
  currentPage = 1;
  renderTable();
}
function changeBillingPageSize(val) {
  billingPageSize = parseInt(val);
  billingPage = 1;
  renderBillingTable();
}

// === Init ===
function init() {
  // 新增供應商按鈕移到供應商列表行
  var provBtn = document.getElementById('providerAddBtn');
  if (provBtn) { provBtn.innerHTML = '<button class="btn-outline" onclick="openProviderModal()" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;font-size:12px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>新增供應商</button>'; }
  // 顯示 sectionTabs
  var st = document.getElementById('sectionTabs');
  if (st) st.style.display = '';
  var sb = document.getElementById('sectionAddBtn');
  if (sb) sb.style.display = '';
  var bs = document.getElementById('billingSection');
  if (bs) bs.style.display = 'none';
  var ps = document.getElementById('paymentSection');
  if (ps) ps.style.display = '';
  renderSectionTabs();
  renderProviders();
  renderSchedules();
  renderDetail();
}

// === Section Tabs ===
function renderSectionTabs() {
  var container = document.getElementById('sectionTabs');
  if (!container) return;
  container.innerHTML =
    '<button class="section-tab' + (currentSection === 'payment' ? ' active' : '') + '" onclick="switchSection(\'payment\',this)">三方支付設定</button>' +
    '<button class="section-tab' + (currentSection === 'billing' ? ' active' : '') + '" onclick="switchSection(\'billing\',this)">儲值金額表</button>';
  // 儲值金額表 section 的新增按鈕
  var btnContainer = document.getElementById('sectionAddBtn');
  if (btnContainer) {
    btnContainer.innerHTML = currentSection === 'billing' ? '<button class="btn-add" onclick="openBillingAddModal()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> 新增儲值金額表</button>' : '';
  }
}

function switchSection(section, el) {
  currentSection = section;
  document.querySelectorAll('.section-tab').forEach(function(b){ b.classList.remove('active'); });
  if (el) el.classList.add('active');
  document.getElementById('paymentSection').style.display = section === 'payment' ? '' : 'none';
  document.getElementById('billingSection').style.display = section === 'billing' ? '' : 'none';
  if (section === 'billing') renderBillingTable();
  renderSectionTabs();
}

// === Billing Plan Section ===
function renderBillingTable() {
  var container = document.getElementById('billingTableContainer');
  if (!container) return;

  var nameFilter = (document.getElementById('billingFilterName') || {}).value || '';
  var statusFilter = (document.getElementById('billingFilterStatus') || {}).value || '';
  var methodFilter = (document.getElementById('billingFilterMethod') || {}).value || '';

  // Populate method filter dropdown
  var methodSel = document.getElementById('billingFilterMethod');
  if (methodSel && methodSel.options.length <= 1) {
    var uniqueMethods = [];
    billingPlans.forEach(function(bp) { if (uniqueMethods.indexOf(bp.method) < 0) uniqueMethods.push(bp.method); });
    uniqueMethods.forEach(function(m) { methodSel.innerHTML += '<option value="' + m + '">' + m + '</option>'; });
  }

  var data = billingPlans.filter(function(item) {
    if (nameFilter && item.name.toLowerCase().indexOf(nameFilter.toLowerCase()) < 0) return false;
    if (statusFilter && item.status !== statusFilter) return false;
    if (methodFilter && item.method !== methodFilter) return false;
    return true;
  });

  var total = data.length;
  var totalPages = Math.max(1, Math.ceil(total / billingPageSize));
  if (billingPage > totalPages) billingPage = totalPages;
  var start = (billingPage - 1) * billingPageSize;
  var pageData = data.slice(start, start + billingPageSize);

  var rows = pageData.map(function(item) {
    var provName = (providers.find(function(p){ return p.id === item.provider; }) || {}).name || item.provider || '-';
    var channelNames = item.channels.map(function(cid) {
      var ch = channels.find(function(c){ return c.id === cid; });
      return ch ? ch.name : cid;
    }).join(', ');
    var statusHtml = renderStatusCell(item.status, "toggleBillingStatus('" + item.id + "')");
    return '<tr>' +
      '<td>' + item.method + '</td>' +
      '<td>' + provName + '</td>' +
      '<td>' + channelNames + '</td>' +
      statusHtml +
      '<td class="action-cell"><div class="action-inner">' +
        UI.btn.icon('view', "viewBillingModal('" + item.id + "')", '檢視') +
        UI.btn.icon('edit', "openBillingModal('" + item.id + "')", '編輯') +
      '</div></td></tr>';
  }).join('');

  if (!rows) rows = '<tr><td colspan="5" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';

  container.innerHTML = '<table class="data-table"><thead><tr><th>支付方式</th><th>供應商</th><th>付款通道</th><th>狀態</th><th>操作</th></tr></thead><tbody>' + rows + '</tbody></table>';

  document.getElementById('billingPageInfo').textContent = '第 ' + billingPage + ' 頁，共 ' + total + ' 筆資料';
  var pageBtns = '<button class="page-arrow" onclick="goBillingPage(' + Math.max(1, billingPage - 1) + ')" ' + (billingPage <= 1 ? 'disabled' : '') + '>&lt;</button>';
  for (var i = 1; i <= totalPages; i++) {
    pageBtns += '<button class="' + (i === billingPage ? 'active' : '') + '" onclick="goBillingPage(' + i + ')">' + i + '</button>';
  }
  pageBtns += '<button class="page-arrow" onclick="goBillingPage(' + Math.min(totalPages, billingPage + 1) + ')" ' + (billingPage >= totalPages ? 'disabled' : '') + '>&gt;</button>';
  document.getElementById('billingPageButtons').innerHTML = pageBtns;

  var jumpOpts = '';
  for (var j = 1; j <= totalPages; j++) {
    jumpOpts += '<option value="' + j + '"' + (j === billingPage ? ' selected' : '') + '>第' + j + '頁</option>';
  }
  var jumpEl = document.getElementById('billingPageJump');
  if (jumpEl) jumpEl.innerHTML = jumpOpts;
}

function goBillingPage(p) { billingPage = p; renderBillingTable(); }

function applyBillingFilter() { billingPage = 1; renderBillingTable(); }
function resetBillingFilter() {
  document.getElementById('billingFilterName').value = '';
  document.getElementById('billingFilterStatus').value = '';
  document.getElementById('billingFilterMethod').value = '';
  billingPage = 1;
  renderBillingTable();
}

function toggleBillingStatus(id) {
  var item = billingPlans.find(function(x){ return x.id === id; });
  if (item) { item.status = item.status === 'on' ? 'off' : 'on'; }
  renderBillingTable();
}

// === Provider Table ===
function renderProviders() {
  const grid = document.getElementById('providerGrid');
  const nameFilter = (document.getElementById('providerSearchName') || {}).value || '';
  const statusFilter = (document.getElementById('providerFilterStatus') || {}).value || '';
  const filtered = providers.filter(function(p) {
    if (nameFilter && p.name.indexOf(nameFilter) === -1 && p.code.indexOf(nameFilter) === -1) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    return true;
  });
  var total = filtered.length;
  document.getElementById('providerPageInfo').innerHTML = '<span>第 1 頁，共 ' + total + ' 筆資料</span><div class="per-page-select">每頁顯示 <select onchange="changeProviderPageSize(this.value)" style="padding:2px 6px;border:1px solid #D1D5DB;border-radius:4px;font-size:13px"><option>20</option></select> 筆</div>';
  // Pagination buttons
  var paginationHtml = '<div class="pagination" style="display:flex;justify-content:space-between;align-items:center;padding:8px 0"><select style="font-size:13px;padding:4px 8px;border:1px solid #D1D5DB;border-radius:6px"><option>第1頁</option></select><div class="pagination-pages"><button class="page-arrow" disabled>&lt;</button><button class="active">1</button><button class="page-arrow" disabled>&gt;</button></div></div>';
  var paginationEl = document.getElementById('providerPagination');
  if (paginationEl) paginationEl.innerHTML = paginationHtml;
  var rows = filtered.map(function(p) {
    var statusHtml = '<td style="width:100px"><div class="switch-cell" onclick="toggleProviderStatus(\'' + p.id + '\')"><button class="toggle ' + p.status + '"></button><span class="status-label ' + p.status + '">' + (p.status === 'on' ? '啟用' : '停用') + '</span></div></td>';
    return '<tr><td>' + p.name + '</td><td style="font-family:monospace;font-size:12px;color:#6B7280">' + p.code + '</td>' + statusHtml + '<td style="width:70px" class="action-cell"><div class="action-inner">' + UI.btn.icon('edit', "openProviderModal('" + p.id + "')", '編輯') + '</div></td></tr>';
  }).join('');
  if (!rows) rows = '<tr><td colspan="4" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';
  grid.innerHTML = '<table class="data-table"><thead><tr><th>名稱</th><th>供應商代碼</th><th style="width:100px">狀態</th><th style="width:70px">操作</th></tr></thead><tbody>' + rows + '</tbody></table>';
}

function filterProviders() { renderProviders(); }
function resetProviderFilter() {
  document.getElementById('providerSearchName').value = '';
  document.getElementById('providerFilterStatus').value = '';
  renderProviders();
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
  var dp = document.getElementById('detailPanel');
  if (!dp) return;
  dp.style.display = '';
  document.getElementById('detailName').textContent = p.name + ' (' + p.code + ')';
  var toggle = document.getElementById('detailToggle');
  toggle.className = 'toggle ' + p.status;

  // Show/hide disabled banner
  var banner = document.getElementById('disabledBanner');
  if (banner) banner.style.display = p.status === 'off' ? '' : 'none';

  renderSchedules();
  renderTable();
}

function toggleProviderStatus(id) {
  var p = providers.find(function(x){ return x.id === id; });
  if (!p) return;
  var newStatus = p.status === 'on' ? 'off' : 'on';
  var action = newStatus === 'off' ? '停用' : '啟用';
  if (confirm('確定要' + action + '供應商「' + p.name + '」嗎？\n\n' + (newStatus === 'off' ? '停用後，該供應商底下所有支付方式與付款通道將一併停用。' : '啟用後，該供應商將恢復正常運作。'))) {
    p.status = newStatus;
    renderProviders();
    if (currentProvider === id) renderDetail();
  }
}

function toggleProvider() {
  toggleProviderStatus(currentProvider);
}

// === Schedules ===
function renderSchedules() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  // Populate filter dropdown
  var filterSel = document.getElementById('schedProviderFilter');
  var currentFilter = filterSel ? filterSel.value : '';
  if (filterSel && filterSel.options.length <= 1) {
    providers.forEach(function(p) {
      filterSel.innerHTML += '<option value="'+p.id+'">'+p.name+'</option>';
    });
  }
  let allScheds = [];
  providers.forEach(function(p) {
    if (currentFilter && p.id !== currentFilter) return;
    p.schedules.forEach(function(s, i) {
      allScheds.push({providerId: p.id, providerName: p.name, sched: s, idx: i});
    });
  });
  let activeScheds = [];
  let expiredScheds = [];
  allScheds.forEach(function(item) {
    const endTime = item.sched.end ? new Date(item.sched.end) : null;
    if (endTime && endTime < now) {
      if (endTime >= thirtyDaysAgo) expiredScheds.push(item);
    } else {
      activeScheds.push(item);
    }
  });
  var list = document.getElementById('schedList');
  if (activeScheds.length === 0 && expiredScheds.length === 0) {
    list.innerHTML = '<div style="color:#9CA3AF;font-size:12px;padding:8px 0">目前無排程</div>';
    return;
  }
  function fmtDT(dt) {
    return new Date(dt).toLocaleString('zh-TW', {year:'numeric',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});
  }
  function renderItems(items, showDelete, prefix) {
    if (showDelete === undefined) showDelete = true;
    if (!prefix) prefix = '';
    return items.map(function(item) {
      const s = item.sched;
      const timeDisplay = fmtDT(s.start) + (s.end ? ' ~ ' + fmtDT(s.end) : ' (手動恢復)');
      return '<div class="sched-item">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
        '<span style="font-weight:600;margin-right:6px">' + item.providerName + '</span>' +
        (s.channels && s.channels.length ? (function(){
          var first = s.channels[0];
          var rest = s.channels.length - 1;
          var uid = prefix + 'ch_' + item.providerId + '_' + item.idx;
          var badge = '<span class="ch-badge" data-uid="'+uid+'" onclick="toggleChInline(event,\''+uid+'\')" style="background:#F3F4F6;color:#374151;font-size:11px;padding:2px 6px;border-radius:4px;margin-right:6px;display:inline-flex;align-items:center;gap:4px;cursor:pointer">' + first;
          if (rest > 0) {
            badge += '<span style="background:#9CA3AF;color:#fff;font-size:10px;padding:0 4px;border-radius:3px;margin-left:2px">+' + rest + '</span>';
          }
          badge += '</span>';
          if (rest > 0) {
            badge += '<span id="'+uid+'" class="ch-expanded" style="display:none">' + s.channels.map(function(c){return '<span style="background:#F3F4F6;color:#374151;font-size:11px;padding:2px 6px;border-radius:4px;margin-right:4px">'+c+'</span>';}).join('') + '<span onclick="toggleChInline(event,\''+uid+'\')" style="cursor:pointer;font-size:11px;color:#6B7280;margin-left:2px">收合</span></span>';
          }
          return badge;
        })() : '') +
        '<span class="ch-after" data-uid="' + prefix + 'ch_' + item.providerId + '_' + item.idx + '">' +
        '<span class="time">' + timeDisplay + '</span>' +
        (s.note ? '<span class="note">' + s.note + '</span>' : '') +
        '</span>' +
        '<span class="spacer"></span>' +
        '<span style="color:#374151;font-size:12px;margin-right:12px">操作者：' + (s.operator || 'casper') + '</span>' +
        (showDelete ? '<button class="del-btn" onclick="delSched(\'' + item.providerId + '\',' + item.idx + ')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>' : '') +
      '</div>';
    }).join('');
  }
  let collapsed = '';
  let expanded = '';
  if (activeScheds.length <= 1 && expiredScheds.length === 0) {
    list.innerHTML = renderItems(activeScheds);
    return;
  }
  collapsed += renderItems(activeScheds.slice(0, 1), true, 'c_');
  if (activeScheds.length > 1) {
    collapsed += '<div style="position:relative;max-height:36px;overflow:hidden">' +
      '<div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,0.8) 50%,rgba(255,255,255,1));z-index:1;display:flex;align-items:center;justify-content:center">' +
      '<span onclick="expandSchedList()" style="cursor:pointer;font-size:12px;color:#9CA3AF;display:inline-flex;align-items:center;gap:4px;user-select:none">更多 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg></span></div>' +
      renderItems(activeScheds.slice(1, 2), true, 'c_') + '</div>';
  } else if (expiredScheds.length > 0) {
    collapsed += '<div style="text-align:center;margin-top:6px">' +
      '<span onclick="expandSchedList()" style="cursor:pointer;font-size:12px;color:#9CA3AF;display:inline-flex;align-items:center;gap:4px;user-select:none">更多 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg></span></div>';
  }
  expanded += renderItems(activeScheds, true, 'e_');
  // expired schedules moved to history modal
  list.innerHTML = '<div id="schedCollapsed">' + collapsed + '</div>' +
    '<div id="schedExpanded" style="display:none">' + expanded + '</div>';
}

function openSchedModal() {
  var sel = document.getElementById('sProvider');
  sel.innerHTML = '<option value="">請選擇</option>';
  providers.forEach(function(p) {
    sel.innerHTML += '<option value="'+p.id+'">'+p.name+'</option>';
  });
  if (currentProvider) sel.value = currentProvider;
  onSchedProviderChange();
  var dp = document.getElementById('schedDatePicker');
  if (dp._dpInstance) dp._dpInstance.reset();
  document.getElementById('schedNote').value = '';
  document.getElementById('schedNoteCount').textContent = '(0/50)';
  document.getElementById('schedModal').classList.add('show');
}
function closeModal(id) { document.getElementById(id).classList.remove('show'); }

function onSchedProviderChange() {
  var providerId = document.getElementById('sProvider').value;
  var group = document.getElementById('schedChannelGroup');
  var panel = document.getElementById('schedChannelPanel');
  var display = document.getElementById('schedChannelDisplay');
  if (!providerId) { group.style.display = 'none'; return; }
  var provChannels = channels.filter(function(c){ return c.provider === providerId; });
  if (provChannels.length === 0) { group.style.display = 'none'; return; }
  group.style.display = '';
  display.textContent = '請選擇付款通道';
  panel.style.display = 'none';
  var html = '<label style="display:flex;align-items:center;gap:6px;margin-bottom:6px;cursor:pointer;justify-content:flex-start"><input type="checkbox" id="schedSelectAll" onchange="toggleSchedAllChannels(this)" style="width:auto!important;flex:none"><span style="font-weight:600">全選</span></label>';
  provChannels.forEach(function(ch) {
    html += '<label style="display:flex;align-items:center;gap:6px;margin-bottom:4px;cursor:pointer;justify-content:flex-start"><input type="checkbox" class="sched-ch-cb" value="'+ch.code+'" data-name="'+ch.name+'" onchange="updateSchedChannelDisplay()" style="width:auto!important;flex:none"><span>'+ch.name+' ('+ch.code+')</span></label>';
  });
  panel.innerHTML = html;
}

function toggleSchedChannelPanel() {
  var panel = document.getElementById('schedChannelPanel');
  panel.style.display = panel.style.display === 'none' ? '' : 'none';
}

function updateSchedChannelDisplay() {
  var cbs = document.querySelectorAll('.sched-ch-cb:checked');
  var display = document.getElementById('schedChannelDisplay');
  if (cbs.length === 0) { display.textContent = '請選擇付款通道'; }
  else { display.textContent = '已選擇 ' + cbs.length + ' 個通道'; }
}

function toggleSchedAllChannels(el) {
  var cbs = document.querySelectorAll('.sched-ch-cb');
  cbs.forEach(function(cb){ cb.checked = el.checked; });
  updateSchedChannelDisplay();
}

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
  var providerId = document.getElementById('sProvider').value;
  if (!providerId) { alert('請選擇供應商'); return; }
  var p = providers.find(function(x){ return x.id === providerId; });

  // 驗證付款通道
  var checkedChs = Array.from(document.querySelectorAll('.sched-ch-cb:checked'));
  var provChannels = channels.filter(function(c){ return c.provider === providerId; });
  if (provChannels.length > 0 && checkedChs.length === 0) {
    alert('請至少選擇一個付款通道'); return;
  }

  var dp = document.getElementById('schedDatePicker');
  var startDate = dp._dpInstance ? dp._dpInstance.startDate : '';
  var endDate = dp._dpInstance ? dp._dpInstance.endDate : '';
  if (!startDate) { alert('請選擇維護時間'); return; }
  if (!endDate) endDate = startDate;

  var startTime = dp._dpInstance ? (dp._dpInstance.startTime || '00:00') : '00:00';
  var endTime = dp._dpInstance ? (dp._dpInstance.endTime || '23:59') : '23:59';
  var start = startDate + 'T' + startTime;
  var end = endDate + 'T' + endTime;

  // 開始時間必須在當前時間 10 分鐘之後
  var startDt = new Date(start);
  var minStart = new Date(Date.now() + 10 * 60 * 1000);
  if (startDt < minStart) { alert('開始時間必須在當前時間 10 分鐘之後'); return; }

  var note = document.getElementById('schedNote').value;
  var channels = checkedChs.map(function(cb){ return cb.dataset.name + ' (' + cb.value + ')'; });

  p.schedules.push({action:'off', start:start, end:end, note:note, repeat:'none', channels:channels});
  closeModal('schedModal');
  renderSchedules();
}

function toggleChInline(e, uid) {
  e.stopPropagation();
  var expanded = document.getElementById(uid);
  if (!expanded) return;
  var item = expanded.closest('.sched-item');
  var badge = item.querySelector('.ch-badge[data-uid="'+uid+'"]');
  var after = item.querySelector('.ch-after[data-uid="'+uid+'"]');
  var isOpen = expanded.style.display !== 'none';
  if (isOpen) {
    expanded.style.display = 'none';
    if (badge) badge.style.display = 'inline-flex';
    if (after) after.style.display = '';
  } else {
    expanded.style.display = 'inline-flex';
    expanded.style.flexWrap = 'wrap';
    expanded.style.gap = '4px';
    expanded.style.alignItems = 'center';
    if (badge) badge.style.display = 'none';
    if (after) after.style.display = 'none';
  }
}
function delSched(providerId, i) {
  var p = providers.find(function(x){ return x.id === providerId; });
  p.schedules.splice(i, 1);
  renderSchedules();
}

function clearAllSched() {
  if (!confirm('確定清除所有排程？')) return;
  var p = providers.find(function(x){ return x.id === currentProvider; });
  p.schedules = [];
  renderSchedules();
}

function toggleExpiredSched() {
  const el = document.getElementById('expiredSchedList');
  const arrow = document.getElementById('expiredArrow');
  if (!el) return;
  const show = el.style.display === 'none';
  el.style.display = show ? 'block' : 'none';
  if (arrow) arrow.innerHTML = show ? '<polyline points="6 15 12 9 18 15"/>' : '<polyline points="6 9 12 15 18 9"/>';
}

function expandSchedList() {
  const c = document.getElementById('schedCollapsed');
  const e = document.getElementById('schedExpanded');
  if (c) c.style.display = 'none';
  if (e) e.style.display = 'block';
}

// === 共用狀態欄元件（toggle + 文字標籤，對齊 Nova 系統） ===
function renderStatusCell(status, toggleFn, disabled) {
  var st = disabled ? 'off' : status;
  var dis = disabled ? ' disabled' : '';
  var onclick = disabled ? '' : ' onclick="' + toggleFn + '"';
  var label = st === 'on' ? '<span style="font-size:12px;color:#059669;font-weight:500;margin-left:6px">啟用</span>' : '<span style="font-size:12px;color:#6B7280;font-weight:500;margin-left:6px">停用</span>';
  return '<td style="white-space:nowrap"><button class="toggle ' + st + '"' + dis + onclick + '></button>' + label + '</td>';
}

// === 共用操作按鈕元件（使用 UI.btn.icon 共用元件） ===
function renderActionCell(type, id, disabled) {
  var editOnclick = disabled ? '' : "open" + type + "Modal('" + id + "')";
  return '<td class="action-cell"><div class="action-inner">' +
    UI.btn.icon('edit', editOnclick, '編輯') +
  '</div></td>';
}

// === 狀態切換 ===
function toggleItemStatus(type, id) {
  var arr = type === 'methods' ? methods : channels;
  var item = arr.find(function(x){ return x.id === id; });
  if (item) { item.status = item.status === 'on' ? 'off' : 'on'; }
  renderTable();
}

function toggleBillingPlanStatus(id) {
  toggleBillingStatus(id);
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

function deleteBillingPlan(id) {
  if (!confirm('確定要刪除此儲值金額表？')) return;
  var idx = billingPlans.findIndex(function(x){ return x.id === id; });
  if (idx >= 0) billingPlans.splice(idx, 1);
  renderBillingTable();
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
  var pageBtns = '<button class="page-arrow" onclick="goPage(' + Math.max(1, currentPage - 1) + ')" ' + (currentPage <= 1 ? 'disabled' : '') + '>&lt;</button>';
  for (var i = 1; i <= totalPages; i++) {
    pageBtns += '<button class="' + (i === currentPage ? 'active' : '') + '" onclick="goPage(' + i + ')">' + i + '</button>';
  }
  pageBtns += '<button class="page-arrow" onclick="goPage(' + Math.min(totalPages, currentPage + 1) + ')" ' + (currentPage >= totalPages ? 'disabled' : '') + '>&gt;</button>';
  document.getElementById('pageButtons').innerHTML = pageBtns;

  // 頁碼下拉選單
  var jumpOpts = '';
  for (var j = 1; j <= totalPages; j++) {
    jumpOpts += '<option value="' + j + '"' + (j === currentPage ? ' selected' : '') + '>第' + j + '頁</option>';
  }
  var jumpEl = document.getElementById('pageJump');
  if (jumpEl) jumpEl.innerHTML = jumpOpts;
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

function viewMethodModal(id) {
  var m = methods.find(function(x){ return x.id === id; });
  if (!m) return;
  document.getElementById('methodModalTitle').textContent = '檢視支付方式';
  document.getElementById('mmName').value = m.name;
  var sel = document.getElementById('mmProvider');
  sel.innerHTML = '<option value="' + m.provider + '">' + (providers.find(function(p){return p.id===m.provider;})||{}).name + '</option>';
  sel.value = m.provider;
  document.getElementById('mmStatus').className = 'toggle ' + m.status;
  // 設為唯讀
  document.getElementById('mmName').setAttribute('readonly', true);
  sel.setAttribute('disabled', true);
  document.querySelector('#methodModal .modal-footer').style.display = 'none';
  document.getElementById('methodModal').classList.add('show');
}

function viewChannelModal(id) {
  var c = channels.find(function(x){ return x.id === id; });
  if (!c) return;
  document.getElementById('channelModalTitle').textContent = '檢視付款通道';
  document.getElementById('cmCode').value = c.code;
  document.getElementById('cmName').value = c.name;
  var selP = document.getElementById('cmProvider');
  selP.innerHTML = '<option value="' + c.provider + '">' + (providers.find(function(p){return p.id===c.provider;})||{}).name + '</option>';
  selP.value = c.provider;
  var selM = document.getElementById('cmMethod');
  selM.innerHTML = '<option value="' + c.method + '">' + c.method + '</option>';
  selM.value = c.method;
  document.getElementById('cmStatus').className = 'toggle ' + c.status;
  // Show billing plan link
  var bp = billingPlans.find(function(b){ return b.channels.indexOf(c.id) >= 0; });
  var nameEl = document.getElementById('cmBillingPlanName');
  var jumpEl = document.getElementById('cmBillingPlanJump');
  if (bp) {
    nameEl.textContent = bp.name;
    jumpEl.style.display = '';
  } else {
    nameEl.textContent = '未綁定';
    jumpEl.style.display = 'none';
  }
  // 設為唯讀
  document.getElementById('cmCode').setAttribute('readonly', true);
  document.getElementById('cmName').setAttribute('readonly', true);
  selP.setAttribute('disabled', true);
  selM.setAttribute('disabled', true);
  document.querySelector('#channelModal .modal-footer').style.display = 'none';
  document.getElementById('channelModal').classList.add('show');
}

function viewBillingModal(id) {
  openBillingModal(id, true);
}

function openMethodModal(id) {
  editingMethodId = id || null;
  var title = id ? '編輯支付方式' : '新增支付方式';
  document.getElementById('methodModalTitle').textContent = title;
  // 恢復可編輯
  document.getElementById('mmName').removeAttribute('readonly');
  document.getElementById('mmProvider').removeAttribute('disabled');
  document.querySelector('#methodModal .modal-footer').style.display = '';
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
  // 恢復可編輯
  document.getElementById('cmCode').removeAttribute('readonly');
  document.getElementById('cmName').removeAttribute('readonly');
  document.getElementById('cmProvider').removeAttribute('disabled');
  document.getElementById('cmMethod').removeAttribute('disabled');
  document.querySelector('#channelModal .modal-footer').style.display = '';
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
  // Show billing plan link
  var bp = id ? billingPlans.find(function(b){ return b.channels.indexOf(id) >= 0; }) : null;
  var nameEl = document.getElementById('cmBillingPlanName');
  var jumpEl = document.getElementById('cmBillingPlanJump');
  if (bp) {
    nameEl.textContent = bp.name;
    jumpEl.style.display = '';
  } else {
    nameEl.textContent = '未綁定';
    jumpEl.style.display = 'none';
  }
  document.getElementById('channelModal').classList.add('show');
}

function saveChannel() {
  var code = document.getElementById('cmCode').value.trim();
  var name = document.getElementById('cmName').value.trim();
  var provider = document.getElementById('cmProvider').value;
  var method = document.getElementById('cmMethod').value;
  var status = document.getElementById('cmStatus').className.includes('on') ? 'on' : 'off';
  if (!name || !provider || !method) { alert('請填寫必填欄位'); return; }
  
  if (editingChannelId) {
    var c = channels.find(function(x){ return x.id === editingChannelId; });
    c.code = code; c.name = name; c.provider = provider; c.method = method; c.status = status;
  } else {
    channels.push({id:'c'+(channels.length+1), provider:provider, method:method, name:name, code:code, status:status, values:[]});
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

// === Billing Plan Modal ===
var editingBillingId = null;
var billingAmountValues = [];

function toggleAllBpVip(el) {
  var cbs = document.querySelectorAll('.bp-vip-cb');
  cbs.forEach(function(cb) { cb.checked = el.checked; });
}

function getSelectedBpVips() {
  var cbs = document.querySelectorAll('.bp-vip-cb:checked');
  return Array.from(cbs).map(function(cb) { return cb.value; });
}

function setSelectedBpVips(vipArr) {
  document.querySelectorAll('.bp-vip-cb').forEach(function(cb) {
    cb.checked = vipArr.indexOf(cb.value) >= 0;
  });
  var allCbs = document.querySelectorAll('.bp-vip-cb');
  var allChecked = Array.from(allCbs).every(function(cb) { return cb.checked; });
  var selectAllCb = document.querySelector('#bpVipCheckboxes input[value="全選"]');
  if (selectAllCb) selectAllCb.checked = allChecked;
}

function onBillingMethodChange() {
  var methodName = document.getElementById('bpMethod').value;
  var providerEl = document.getElementById('bpProvider');
  var checkboxContainer = document.getElementById('bpChannelCheckboxes');
  if (!methodName) {
    providerEl.value = '';
    checkboxContainer.innerHTML = '<span style="font-size:13px;color:#9CA3AF">請先選擇支付方式</span>';
    return;
  }
  // Find provider from method
  var method = methods.find(function(m){ return m.name === methodName; });
  if (!method) return;
  var prov = providers.find(function(p){ return p.id === method.provider; });
  providerEl.value = prov ? prov.name : method.provider;
  // List channels under same provider+method
  var availableChannels = channels.filter(function(c){ return c.provider === method.provider && c.method === methodName; });
  if (availableChannels.length === 0) {
    checkboxContainer.innerHTML = '<span style="font-size:13px;color:#9CA3AF">此支付方式下無可用付款通道</span>';
    return;
  }
  checkboxContainer.innerHTML = availableChannels.map(function(ch) {
    var boundBy = billingPlans.find(function(bp){ return bp.id !== editingBillingId && bp.channels.indexOf(ch.id) >= 0; });
    var disabled = boundBy ? ' disabled' : '';
    var hint = boundBy ? ' <span style="color:#EF4444;font-size:11px">(已綁定: ' + boundBy.name + ')</span>' : '';
    var checked = editingBillingId && billingPlans.find(function(bp){ return bp.id === editingBillingId; }) && billingPlans.find(function(bp){ return bp.id === editingBillingId; }).channels.indexOf(ch.id) >= 0 ? ' checked' : '';
    return '<label style="display:flex;align-items:center;gap:6px;padding:4px 0;font-size:13px;cursor:' + (boundBy ? 'not-allowed' : 'pointer') + '">' +
      '<input type="checkbox" value="' + ch.id + '" class="bp-channel-cb"' + disabled + checked + '> ' + ch.name + ' <code style="font-size:11px;color:#6B7280">' + ch.code + '</code>' + hint + '</label>';
  }).join('');
}

function openBillingModal(id, viewOnly) {
  editingBillingId = id || null;
  billingAmountValues = [];
  var title = id ? (viewOnly ? '檢視儲值金額表' : '編輯儲值金額表') : '新增儲值金額表';
  document.getElementById('billingModalTitle').textContent = title;

  // Populate method dropdown
  var selM = document.getElementById('bpMethod');
  var uniqueMethods = [];
  methods.forEach(function(m) { if (uniqueMethods.indexOf(m.name) < 0) uniqueMethods.push(m.name); });
  selM.innerHTML = '<option value="">請選擇支付方式</option>' + uniqueMethods.map(function(m){ return '<option value="' + m + '">' + m + '</option>'; }).join('');

  if (id) {
    var bp = billingPlans.find(function(x){ return x.id === id; });
    document.getElementById('bpName').value = bp.name;
    selM.value = bp.method;
    onBillingMethodChange();
    // Re-check channels
    bp.channels.forEach(function(cid) {
      var cb = document.querySelector('.bp-channel-cb[value="' + cid + '"]');
      if (cb) cb.checked = true;
    });
    setSelectedBpVips(bp.vip);
    billingAmountValues = bp.amounts.map(function(a){ return Object.assign({}, a); });
    document.getElementById('bpStatus').className = 'toggle ' + bp.status;
  } else {
    document.getElementById('bpName').value = '';
    document.getElementById('bpProvider').value = '';
    document.getElementById('bpChannelCheckboxes').innerHTML = '<span style="font-size:13px;color:#9CA3AF">請先選擇支付方式</span>';
    setSelectedBpVips([]);
    document.getElementById('bpStatus').className = 'toggle on';
  }
  renderBillingAmountTable();

  // View-only mode
  if (viewOnly) {
    document.getElementById('bpName').setAttribute('readonly', true);
    selM.setAttribute('disabled', true);
    document.querySelectorAll('.bp-channel-cb').forEach(function(cb){ cb.setAttribute('disabled', true); });
    document.querySelectorAll('.bp-vip-cb').forEach(function(cb){ cb.setAttribute('disabled', true); });
    document.querySelector('#billingModal .modal-footer').style.display = 'none';
  } else {
    document.getElementById('bpName').removeAttribute('readonly');
    selM.removeAttribute('disabled');
    document.querySelector('#billingModal .modal-footer').style.display = '';
  }
  document.getElementById('billingModal').classList.add('show');
}

function renderBillingAmountTable() {
  var tbody = document.getElementById('bpAmountTableBody');
  if (!tbody) return;
  var countEl = document.getElementById('bpAmountCount');
  if (countEl) countEl.textContent = billingAmountValues.length;
  if (billingAmountValues.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#9CA3AF;padding:12px">尚未有任何資料</td></tr>';
    return;
  }
  tbody.innerHTML = billingAmountValues.map(function(v, i) {
    return '<tr>' +
      '<td style="text-align:center">' + (i + 1) + '</td>' +
      '<td><input type="number" value="' + (v.amount || '') + '" style="width:100%;padding:4px;border:1px solid #D1D5DB;border-radius:4px" oninput="updateBillingAmountField(' + i + ',\'amount\',this.value)"></td>' +
      '<td><input type="number" value="' + (v.basePoints || '') + '" style="width:100%;padding:4px;border:1px solid #D1D5DB;border-radius:4px" oninput="updateBillingAmountField(' + i + ',\'basePoints\',this.value)"></td>' +
      '<td><input type="number" value="' + (v.bonusRate || 0) + '" style="width:100%;padding:4px;border:1px solid #D1D5DB;border-radius:4px" oninput="updateBillingAmountField(' + i + ',\'bonusRate\',this.value)"></td>' +
      '<td style="text-align:center" id="bpBonusPoints_' + i + '">' + (v.bonusPoints || 0) + '</td>' +
      '<td style="text-align:center" id="bpTotalPoints_' + i + '">' + (v.totalPoints || 0) + '</td>' +
      '<td style="text-align:center"><button class="btn-icon btn-icon-danger" onclick="removeBillingAmount(' + i + ')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></td>' +
      '</tr>';
  }).join('');
}

function addBillingAmountRow() {
  billingAmountValues.push({amount: '', basePoints: '', bonusRate: 0, bonusPoints: 0, totalPoints: 0});
  renderBillingAmountTable();
}

function updateBillingAmountField(idx, field, value) {
  var row = billingAmountValues[idx];
  if (!row) return;
  var val = parseInt(value) || 0;
  if (field === 'amount') row.amount = val;
  else if (field === 'basePoints') row.basePoints = val;
  else if (field === 'bonusRate') row.bonusRate = val;
  row.bonusPoints = Math.floor((row.basePoints || 0) * (row.bonusRate || 0) / 100);
  row.totalPoints = (row.basePoints || 0) + row.bonusPoints;
  var bpCell = document.getElementById('bpBonusPoints_' + idx);
  var tpCell = document.getElementById('bpTotalPoints_' + idx);
  if (bpCell) bpCell.textContent = row.bonusPoints;
  if (tpCell) tpCell.textContent = row.totalPoints;
  document.getElementById('bpAmountCount').textContent = billingAmountValues.length;
}

function removeBillingAmount(idx) {
  billingAmountValues.splice(idx, 1);
  renderBillingAmountTable();
}

function saveBillingPlan() {
  var name = document.getElementById('bpName').value.trim();
  var methodName = document.getElementById('bpMethod').value;
  var vips = getSelectedBpVips();
  var status = document.getElementById('bpStatus').className.includes('on') ? 'on' : 'off';
  var selectedChannels = Array.from(document.querySelectorAll('.bp-channel-cb:checked')).map(function(cb){ return cb.value; });

  if (!name) { alert('請輸入金額表名稱'); return; }
  if (!methodName) { alert('請選擇支付方式'); return; }
  if (selectedChannels.length === 0) { alert('請至少選擇一個付款通道'); return; }
  if (vips.length === 0) { alert('請選擇適用 VIP 等級'); return; }
  if (billingAmountValues.length === 0) { alert('請至少新增一筆金額項目'); return; }

  // Find provider from method
  var method = methods.find(function(m){ return m.name === methodName; });
  var providerId = method ? method.provider : '';

  if (editingBillingId) {
    var bp = billingPlans.find(function(x){ return x.id === editingBillingId; });
    bp.name = name; bp.provider = providerId; bp.method = methodName;
    bp.channels = selectedChannels; bp.vip = vips; bp.status = status;
    bp.amounts = billingAmountValues.slice();
  } else {
    billingPlans.push({id:'bp'+(billingPlans.length+1), name:name, provider:providerId, method:methodName, channels:selectedChannels, vip:vips, status:status, amounts:billingAmountValues.slice()});
  }
  closeModal('billingModal');
  renderBillingTable();
}

function openBillingAddModal() {
  openBillingModal(null, false);
}

// === 支付管理歷史記錄 Modal ===
var payHistPage = 1;
var payHistPageSize = 10;
var payHistFilterProvider = '';
var payHistFilterStart = '';
var payHistFilterEnd = '';

var payHistoryData = [
  {provider:'綠界科技',start:'2026-04-20 02:00',end:'2026-04-20 06:00',note:'例行維護',operator:'admin'},
  {provider:'藍新金流',start:'2026-04-18 03:00',end:'2026-04-18 05:00',note:'緊急修復',operator:'casper'},
  {provider:'歐付寶',start:'2026-04-15 01:00',end:'2026-04-15 04:00',note:'版本更新',operator:'admin'},
  {provider:'LINE Pay',start:'2026-04-12 02:00',end:'2026-04-12 06:00',note:'例行維護',operator:'casper'},
  {provider:'綠界科技',start:'2026-04-05 03:00',end:'2026-04-05 05:00',note:'供應商維護',operator:'admin'},
  {provider:'藍新金流',start:'2026-03-28 01:00',end:'2026-03-28 04:00',note:'系統升級',operator:'casper'},
  {provider:'歐付寶',start:'2026-03-20 02:00',end:'2026-03-20 06:00',note:'例行維護',operator:'admin'},
  {provider:'LINE Pay',start:'2026-03-15 03:00',end:'2026-03-15 05:00',note:'緊急修復',operator:'casper'},
  {provider:'綠界科技',start:'2026-03-10 01:00',end:'2026-03-10 04:00',note:'版本更新',operator:'admin'},
  {provider:'藍新金流',start:'2026-03-05 02:00',end:'2026-03-05 06:00',note:'供應商維護',operator:'admin'},
  {provider:'歐付寶',start:'2026-02-28 03:00',end:'2026-02-28 05:00',note:'例行維護',operator:'casper'},
  {provider:'LINE Pay',start:'2026-02-20 01:00',end:'2026-02-20 04:00',note:'系統升級',operator:'admin'},
];

function getPayHistFiltered() {
  var data = payHistoryData.slice();
  if (payHistFilterProvider) {
    data = data.filter(function(d){ return d.provider === payHistFilterProvider; });
  }
  if (payHistFilterStart) {
    data = data.filter(function(d){ return d.end >= payHistFilterStart; });
  }
  if (payHistFilterEnd) {
    data = data.filter(function(d){ return d.end <= payHistFilterEnd + ' 23:59'; });
  }
  data.sort(function(a,b){ return b.end.localeCompare(a.end); });
  return data;
}

function openPayHistoryModal() {
  payHistPage = 1;
  payHistFilterProvider = '';
  payHistFilterStart = '';
  payHistFilterEnd = '';
  var modal = document.getElementById('payHistModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'payHistModal';
    modal.innerHTML =
      '<div class="modal" style="max-width:750px">' +
        '<div class="modal-header"><h3>歷史記錄</h3><button class="modal-close" onclick="closePayHistModal()">&times;</button></div>' +
        '<div class="modal-body" style="padding:16px 20px">' +
          '<div style="display:flex;gap:10px;align-items:flex-end;margin-bottom:14px;flex-wrap:wrap">' +
            '<div style="display:flex;flex-direction:column;gap:4px"><label style="font-size:11px;font-weight:500;color:#6B7280">供應商</label><select id="payHistProvFilter" style="padding:6px 10px;border:1px solid #E5E7EB;border-radius:6px;font-size:12px;min-width:120px"><option value="">全部</option><option value="綠界科技">綠界科技</option><option value="藍新金流">藍新金流</option><option value="歐付寶">歐付寶</option><option value="LINE Pay">LINE Pay</option></select></div>' +
            '<div style="display:flex;flex-direction:column;gap:4px"><label style="font-size:11px;font-weight:500;color:#6B7280">結束時間</label><div class="date-picker-wrap" id="payHistDatePicker"><div class="date-picker-trigger"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span class="date-display">選擇日期範圍</span></div></div></div>' +
            '<div style="margin-left:auto;display:flex;gap:6px;align-items:flex-end">' +
              '<button class="btn btn-dark" onclick="filterPayHist()" style="padding:6px 14px;font-size:12px">搜尋</button>' +
              '<button class="btn btn-outline" onclick="resetPayHist()" style="padding:6px 14px;font-size:12px">重置</button>' +
            '</div>' +
          '</div>' +
          '<div id="payHistTableWrap"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
    setTimeout(function() {
      var wrap = document.getElementById('payHistDatePicker');
      if (wrap && !wrap._dpInstance && window.NovaDatePicker) {
        window.NovaDatePicker.init(wrap);
      }
    }, 100);
  }
  modal.classList.add('show');
  renderPayHistTable();
}

function closePayHistModal() {
  var modal = document.getElementById('payHistModal');
  if (modal) modal.classList.remove('show');
}

function filterPayHist() {
  payHistFilterProvider = document.getElementById('payHistProvFilter').value;
  var dp = document.querySelector('#payHistDatePicker .date-display');
  if (dp && dp.textContent && dp.textContent !== '選擇日期範圍') {
    var parts = dp.textContent.split(' ~ ');
    if (parts.length === 2) {
      payHistFilterStart = parts[0].trim().split(' ')[0];
      payHistFilterEnd = parts[1].trim().split(' ')[0];
    }
  } else {
    payHistFilterStart = '';
    payHistFilterEnd = '';
  }
  payHistPage = 1;
  renderPayHistTable();
}

function resetPayHist() {
  document.getElementById('payHistProvFilter').value = '';
  var dp = document.querySelector('#payHistDatePicker .date-display');
  if (dp) dp.textContent = '選擇日期範圍';
  payHistFilterProvider = '';
  payHistFilterStart = '';
  payHistFilterEnd = '';
  payHistPage = 1;
  renderPayHistTable();
}

function renderPayHistTable() {
  var data = getPayHistFiltered();
  var total = data.length;
  var totalPages = Math.max(1, Math.ceil(total / payHistPageSize));
  if (payHistPage > totalPages) payHistPage = totalPages;
  var start = (payHistPage - 1) * payHistPageSize;
  var pageData = data.slice(start, start + payHistPageSize);

  var rows = '';
  if (pageData.length === 0) {
    rows = '<tr><td colspan="5" style="text-align:center;color:#9CA3AF;padding:24px">無歷史記錄</td></tr>';
  } else {
    pageData.forEach(function(item) {
      rows += '<tr><td>' + item.provider + '</td><td>' + item.start + '</td><td>' + item.end + '</td><td>' + (item.note||'-') + '</td><td>' + item.operator + '</td></tr>';
    });
  }

  var paginationHtml = '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0">';
  // Left: page selector
  paginationHtml += '<div style="display:flex;align-items:center;gap:6px"><select onchange="payHistGoPage(+this.value)" style="padding:3px 8px;border:1px solid #E5E7EB;border-radius:4px;font-size:12px">';
  for (var p = 1; p <= totalPages; p++) {
    paginationHtml += '<option value="' + p + '"' + (p===payHistPage?' selected':'') + '>第' + p + '頁</option>';
  }
  paginationHtml += '</select>';
  paginationHtml += '<button style="padding:4px 8px;border:1px solid #E5E7EB;border-radius:4px;background:#fff;cursor:pointer;font-size:12px' + (payHistPage===1?';opacity:.4;cursor:not-allowed':'') + '" onclick="payHistGoPage(' + (payHistPage-1) + ')"' + (payHistPage===1?' disabled':'') + '>&lt;</button>';
  for (var i = 1; i <= totalPages; i++) {
    paginationHtml += '<button style="padding:4px 8px;border:1px solid #E5E7EB;border-radius:4px;font-size:12px;cursor:pointer;' + (i===payHistPage?'background:#1F2937;color:#fff;border-color:#1F2937':'background:#fff') + '" onclick="payHistGoPage(' + i + ')">' + i + '</button>';
  }
  paginationHtml += '<button style="padding:4px 8px;border:1px solid #E5E7EB;border-radius:4px;background:#fff;cursor:pointer;font-size:12px' + (payHistPage===totalPages?';opacity:.4;cursor:not-allowed':'') + '" onclick="payHistGoPage(' + (payHistPage+1) + ')"' + (payHistPage===totalPages?' disabled':'') + '>&gt;</button>';
  paginationHtml += '</div>';
  // Right: per-page selector
  paginationHtml += '<div style="font-size:12px;color:#6B7280;display:flex;align-items:center;gap:4px">每頁顯示 <select onchange="payHistPageSize=+this.value;payHistPage=1;renderPayHistTable()" style="padding:2px 6px;border:1px solid #D1D5DB;border-radius:4px;font-size:12px">';
  [10,20,50].forEach(function(n){ paginationHtml += '<option value="' + n + '"' + (n===payHistPageSize?' selected':'') + '>' + n + '</option>'; });
  paginationHtml += '</select> 筆</div>';
  paginationHtml += '</div>';

  document.getElementById('payHistTableWrap').innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;font-size:12px;color:#6B7280"><span>第 ' + payHistPage + ' 頁，共 ' + total + ' 筆資料</span></div>' +
    '<table class="data-table" style="font-size:12px"><thead><tr><th>供應商</th><th>維護開始時間</th><th>維護結束時間</th><th>備註</th><th>操作者</th></tr></thead><tbody>' + rows + '</tbody></table>' +
    paginationHtml;
}

function payHistGoPage(p) {
  var data = getPayHistFiltered();
  var totalPages = Math.max(1, Math.ceil(data.length / payHistPageSize));
  if (p < 1 || p > totalPages) return;
  payHistPage = p;
  renderPayHistTable();
}
