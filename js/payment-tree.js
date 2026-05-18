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
  {id:'m1',provider:'mycard',name:'點數卡',logo:'https://placehold.co/56x56/EEF2FF/4338CA?text=點數卡',status:'on'},
  {id:'m2',provider:'mycard',name:'電信帳單',logo:'https://placehold.co/56x56/FEF3C7/D97706?text=電信',status:'on'},
  {id:'m3',provider:'mycard',name:'線上轉點',logo:'https://placehold.co/56x56/DCFCE7/166534?text=轉點',status:'off'},
  {id:'m4',provider:'gash',name:'點數卡',logo:'https://placehold.co/56x56/EEF2FF/4338CA?text=點數卡',status:'on'},
  {id:'m5',provider:'gash',name:'會員扣點',logo:'https://placehold.co/56x56/F3E8FF/7C3AED?text=扣點',status:'on'},
  {id:'m6',provider:'linepay',name:'行動支付',logo:'https://placehold.co/56x56/DCFCE7/166534?text=行動',status:'on'},
  {id:'m7',provider:'ecpay',name:'信用卡',logo:'https://placehold.co/56x56/FEE2E2/991B1B?text=信用卡',status:'off'},
  {id:'m8',provider:'ecpay',name:'ATM轉帳',logo:'https://placehold.co/56x56/E0F2FE/0369A1?text=ATM',status:'off'},
  {id:'m9',provider:'startest',name:'測試支付',logo:'https://placehold.co/56x56/F3F4F6/374151?text=測試',status:'on'}
];

const channels = [
  {id:'c1',method:'m1',name:'點數卡',code:'COPGAM05',logo:'https://placehold.co/56x56/EEF2FF/4338CA?text=點數',status:'on'},
  {id:'c2',method:'m2',name:'手機小額付款',code:'HE0004',logo:'https://placehold.co/56x56/FEF3C7/D97706?text=手機',status:'off'},
  {id:'c3',method:'m3',name:'信用卡3D',code:'CHANNEL_1E8B',logo:'https://placehold.co/56x56/DCFCE7/166534?text=3D',status:'off'},
  {id:'c4',method:'m4',name:'點數卡',code:'GASH_PNT01',logo:'https://placehold.co/56x56/EEF2FF/4338CA?text=點數',status:'on'},
  {id:'c5',method:'m5',name:'錢包扣點',code:'COPGAM09',logo:'https://placehold.co/56x56/F3E8FF/7C3AED?text=錢包',status:'on'},
  {id:'c6',method:'m6',name:'LINE Pay',code:'LP_001',logo:'https://placehold.co/56x56/DCFCE7/166534?text=LINE',status:'on'},
  {id:'c7',method:'m7',name:'信用卡一次付',code:'EC_CC01',logo:'https://placehold.co/56x56/FEE2E2/991B1B?text=信用',status:'off'},
  {id:'c8',method:'m8',name:'ATM虛擬帳號',code:'EC_ATM01',logo:'https://placehold.co/56x56/E0F2FE/0369A1?text=ATM',status:'off'},
  {id:'c9',method:'m9',name:'測試通道A',code:'TEST_A',logo:'https://placehold.co/56x56/F3F4F6/374151?text=A',status:'on'},
  {id:'c10',method:'m9',name:'測試通道B',code:'TEST_B',logo:'https://placehold.co/56x56/F3F4F6/374151?text=B',status:'on'}
];

let expanded = {};

function init() {
  var sel = document.getElementById('filterProvider');
  sel.innerHTML = '<option value="">全部供應商</option>' + providers.map(function(p) {
    return '<option value="' + p.id + '">' + p.name + '</option>';
  }).join('');
  renderTable();
}

function resetFilter() {
  document.getElementById('filterName').value = '';
  document.getElementById('filterProvider').value = '';
  document.getElementById('filterStatus').value = '';
  renderTable();
}

function renderTable() {
  var q = (document.getElementById('filterName').value || '').toLowerCase();
  var prov = document.getElementById('filterProvider').value;
  var status = document.getElementById('filterStatus').value;

  var filtered = methods.filter(function(m) {
    if (prov && m.provider !== prov) return false;
    if (status && m.status !== status) return false;
    if (q) {
      var mMatch = m.name.toLowerCase().indexOf(q) >= 0;
      var cMatch = channels.some(function(c) {
        return c.method === m.id && (c.name.toLowerCase().indexOf(q) >= 0 || c.code.toLowerCase().indexOf(q) >= 0);
      });
      if (!mMatch && !cMatch) return false;
    }
    return true;
  });

  document.getElementById('pageInfo').textContent = '共 ' + filtered.length + ' 個支付方式';

  var editIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
  var chevronIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>';
  var addIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';

  var rows = '';
  filtered.forEach(function(m) {
    var p = providers.find(function(x) { return x.id === m.provider; });
    var provName = p ? p.name : '';
    var mChannels = channels.filter(function(c) { return c.method === m.id; });
    var isOpen = expanded[m.id];
    var chevCls = isOpen ? 'expand-btn open' : 'expand-btn';

    rows += '<tr class="parent-row">' +
      '<td><div class="name-cell"><button class="' + chevCls + '" onclick="toggle(\'' + m.id + '\')">' + chevronIcon + '</button><img src="' + m.logo + '"><span>' + m.name + '<span class="badge-count">' + mChannels.length + '</span></span></div></td>' +
      '<td>' + provName + '</td>' +
      '<td><span class="code-text">—</span></td>' +
      '<td><div class="switch-cell" onclick="toggleStatus(\'method\',\'' + m.id + '\')"><button class="toggle ' + m.status + '"></button><span class="status-label ' + m.status + '">' + (m.status === 'on' ? '啟用' : '停用') + '</span></div></td>' +
      '<td class="action-cell"><button class="btn-icon-sm" onclick="alert(\'編輯 ' + m.name + '\')" title="編輯">' + editIcon + '</button></td>' +
      '</tr>';

    if (isOpen) {
      mChannels.forEach(function(c) {
        rows += '<tr class="child-row">' +
          '<td><div class="name-cell" style="padding-left:28px"><span class="child-indent"></span><img src="' + c.logo + '"><span>' + c.name + '</span></div></td>' +
          '<td></td>' +
          '<td><span class="code-text">' + c.code + '</span></td>' +
          '<td><div class="switch-cell" onclick="toggleStatus(\'channel\',\'' + c.id + '\')"><button class="toggle ' + c.status + '"></button><span class="status-label ' + c.status + '">' + (c.status === 'on' ? '啟用' : '停用') + '</span></div></td>' +
          '<td class="action-cell"><button class="btn-icon-sm" onclick="alert(\'編輯通道 ' + c.name + '\')" title="編輯">' + editIcon + '</button></td>' +
          '</tr>';
      });
      // Add channel row
      rows += '<tr class="child-row"><td colspan="5"><span class="add-child-btn" onclick="alert(\'新增通道到 ' + m.name + '\')" style="margin-left:56px">' + addIcon + ' 新增付款通道</span></td></tr>';
    }
  });

  if (!rows) rows = '<tr><td colspan="5" style="text-align:center;color:#9CA3AF;padding:32px">無符合條件的資料</td></tr>';

  document.getElementById('tableWrap').innerHTML =
    '<table class="tree-table"><thead><tr><th>名稱</th><th>供應商</th><th>代碼</th><th style="width:100px">狀態</th><th style="width:60px">操作</th></tr></thead><tbody>' + rows + '</tbody></table>';
}

function toggle(id) {
  expanded[id] = !expanded[id];
  renderTable();
}

function toggleStatus(type, id) {
  if (type === 'method') {
    var m = methods.find(function(x) { return x.id === id; });
    if (m) m.status = m.status === 'on' ? 'off' : 'on';
  } else {
    var c = channels.find(function(x) { return x.id === id; });
    if (c) c.status = c.status === 'on' ? 'off' : 'on';
  }
  renderTable();
}

document.addEventListener('DOMContentLoaded', init);
