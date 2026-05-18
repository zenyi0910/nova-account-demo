// === Data ===
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
  {id:'c1',provider:'mycard',method:'m1',name:'點數卡',code:'COPGAM05',logo:'https://placehold.co/80x80/EEF2FF/4338CA?text=點數卡',status:'on'},
  {id:'c2',provider:'mycard',method:'m2',name:'手機小額付款',code:'HE0004',logo:'https://placehold.co/80x80/FEF3C7/D97706?text=電信',status:'off'},
  {id:'c3',provider:'mycard',method:'m3',name:'信用卡3D',code:'CHANNEL_1E8B',logo:'https://placehold.co/80x80/DCFCE7/166534?text=3D',status:'off'},
  {id:'c4',provider:'gash',method:'m4',name:'點數卡',code:'GASH_PNT01',logo:'https://placehold.co/80x80/EEF2FF/4338CA?text=點數卡',status:'on'},
  {id:'c5',provider:'gash',method:'m5',name:'錢包扣點',code:'COPGAM09',logo:'https://placehold.co/80x80/F3E8FF/7C3AED?text=錢包',status:'on'},
  {id:'c6',provider:'linepay',method:'m6',name:'LINE Pay',code:'LP_001',logo:'https://placehold.co/80x80/DCFCE7/166534?text=LINE',status:'on'},
  {id:'c7',provider:'ecpay',method:'m7',name:'信用卡一次付',code:'EC_CC01',logo:'https://placehold.co/80x80/FEE2E2/991B1B?text=信用卡',status:'off'},
  {id:'c8',provider:'ecpay',method:'m8',name:'ATM虛擬帳號',code:'EC_ATM01',logo:'https://placehold.co/80x80/E0F2FE/0369A1?text=ATM',status:'off'},
  {id:'c9',provider:'startest',method:'m9',name:'測試通道A',code:'TEST_A',logo:'https://placehold.co/80x80/F3F4F6/374151?text=測試A',status:'on'},
  {id:'c10',provider:'startest',method:'m9',name:'測試通道B',code:'TEST_B',logo:'https://placehold.co/80x80/F3F4F6/374151?text=測試B',status:'on'}
];

let expandedMethods = {};

// === Init ===
function init() {
  var sel = document.getElementById('filterProvider');
  sel.innerHTML = '<option value="">全部供應商</option>' + providers.map(function(p) {
    return '<option value="' + p.id + '">' + p.name + '</option>';
  }).join('');
  renderList();
}

function resetFilter() {
  document.getElementById('filterName').value = '';
  document.getElementById('filterProvider').value = '';
  document.getElementById('filterStatus').value = '';
  renderList();
}

// === Render ===
function renderList() {
  var nameFilter = document.getElementById('filterName').value.toLowerCase();
  var provFilter = document.getElementById('filterProvider').value;
  var statusFilter = document.getElementById('filterStatus').value;

  var filtered = methods.filter(function(m) {
    if (provFilter && m.provider !== provFilter) return false;
    if (statusFilter && m.status !== statusFilter) return false;
    if (nameFilter && m.name.toLowerCase().indexOf(nameFilter) < 0) {
      // Also check channels
      var chs = channels.filter(function(c) { return c.method === m.id; });
      var hasMatch = chs.some(function(c) { return c.name.toLowerCase().indexOf(nameFilter) >= 0; });
      if (!hasMatch) return false;
    }
    return true;
  });

  document.getElementById('pageInfo').textContent = '共 ' + filtered.length + ' 個支付方式';

  var html = filtered.map(function(m) {
    var prov = providers.find(function(p) { return p.id === m.provider; });
    var provName = prov ? prov.name : m.provider;
    var mChannels = channels.filter(function(c) { return c.method === m.id; });
    var isOpen = expandedMethods[m.id];
    var chevronCls = isOpen ? 'method-chevron open' : 'method-chevron';
    var channelListCls = isOpen ? 'channel-list open' : 'channel-list';

    var card = '<div class="method-card">' +
      '<div class="method-header" onclick="toggleMethod(\'' + m.id + '\')">' +
        '<img src="' + m.logo + '">' +
        '<span class="method-name">' + m.name + '</span>' +
        '<span class="method-provider">' + provName + '</span>' +
        '<span class="method-count">' + mChannels.length + ' 通道</span>' +
        '<span class="method-toggle" onclick="event.stopPropagation()"><button class="toggle ' + m.status + '" onclick="toggleMethodStatus(\'' + m.id + '\')"></button><span class="status-label ' + m.status + '">' + (m.status === 'on' ? '啟用' : '停用') + '</span></span>' +
        '<button class="btn-icon-sm" onclick="event.stopPropagation();editMethod(\'' + m.id + '\')" title="編輯"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
        '<svg class="' + chevronCls + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
      '</div>' +
      '<div class="' + channelListCls + '">';

    mChannels.forEach(function(c) {
      card += '<div class="channel-row">' +
        '<img src="' + c.logo + '">' +
        '<span class="channel-name">' + c.name + '</span>' +
        '<span class="channel-code">' + c.code + '</span>' +
        '<span class="channel-toggle"><button class="toggle ' + c.status + '" onclick="toggleChannelStatus(\'' + c.id + '\')"></button><span class="status-label ' + c.status + '">' + (c.status === 'on' ? '啟用' : '停用') + '</span></span>' +
        '<span class="channel-actions">' +
          '<button class="btn-icon-sm" title="編輯"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
        '</span>' +
      '</div>';
    });

    card += '<div class="add-channel-row" onclick="addChannel(\'' + m.id + '\')">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
      '<span>新增付款通道</span></div>';

    card += '</div></div>';
    return card;
  }).join('');

  document.getElementById('methodList').innerHTML = html || '<div style="text-align:center;color:#9CA3AF;padding:40px">無符合條件的支付方式</div>';
}

// === Interactions ===
function toggleMethod(id) {
  expandedMethods[id] = !expandedMethods[id];
  renderList();
}

function toggleMethodStatus(id) {
  var m = methods.find(function(x) { return x.id === id; });
  if (m) m.status = m.status === 'on' ? 'off' : 'on';
  renderList();
}

function toggleChannelStatus(id) {
  var c = channels.find(function(x) { return x.id === id; });
  if (c) c.status = c.status === 'on' ? 'off' : 'on';
  renderList();
}

function addChannel(methodId) {
  expandedMethods[methodId] = true;
  alert('新增付款通道（Demo）— 實際會開啟 modal');
}

function openAddMethodModal() {
  alert('新增支付方式（Demo）— 實際會開啟 modal');
}

function editMethod(id) {
  var m = methods.find(function(x) { return x.id === id; });
  if (m) alert('編輯支付方式：' + m.name + '（Demo）');
}

// === Start ===
document.addEventListener('DOMContentLoaded', init);
