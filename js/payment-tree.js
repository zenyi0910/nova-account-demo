const provColors = {'p1':'#6366F1','p2':'#F59E0B','p3':'#10B981','p4':'#EF4444','p5':'#3B82F6','p6':'#8B5CF6','p7':'#EC4899'};
const providers = [
  {id:'p1',name:'MyCard'},
  {id:'p2',name:'Gash'},
  {id:'p3',name:'LINE Pay'},
  {id:'p4',name:'綠界科技'},
  {id:'p5',name:'玉山銀行'},
  {id:'p6',name:'遠傳電信'},
  {id:'p7',name:'星運測試商'}
];

const methods = [
  {id:'m1',name:'點數卡',provider:'p1',logo:'https://placehold.co/56x56/DBEAFE/1E40AF?text=點數卡',status:'on'},
  {id:'m2',name:'電信帳單',provider:'p1',logo:'https://placehold.co/56x56/FEF3C7/92400E?text=電信',status:'on'},
  {id:'m3',name:'線上轉點',provider:'p1',logo:'https://placehold.co/56x56/E0E7FF/3730A3?text=轉點',status:'off'},
  {id:'m4',name:'點數卡',provider:'p2',logo:'https://placehold.co/56x56/DBEAFE/1E40AF?text=點數卡',status:'on'},
  {id:'m5',name:'會員扣點',provider:'p2',logo:'https://placehold.co/56x56/FEE2E2/991B1B?text=扣點',status:'on'},
  {id:'m6',name:'行動支付',provider:'p3',logo:'https://placehold.co/56x56/D1FAE5/065F46?text=行動',status:'on'},
  {id:'m7',name:'信用卡',provider:'p4',logo:'https://placehold.co/56x56/FEF3C7/92400E?text=信用卡',status:'off'},
  {id:'m8',name:'ATM轉帳',provider:'p4',logo:'https://placehold.co/56x56/E0E7FF/3730A3?text=ATM',status:'off'},
  {id:'m9',name:'測試支付',provider:'p7',logo:'https://placehold.co/56x56/F3E8FF/6B21A8?text=測試',status:'on'},
  {id:'m10',name:'超商代碼',provider:'p1',logo:'https://placehold.co/56x56/DBEAFE/1E40AF?text=超商',status:'on'},
  {id:'m11',name:'銀行轉帳',provider:'p5',logo:'https://placehold.co/56x56/FEF3C7/92400E?text=銀行',status:'on'},
  {id:'m12',name:'電子錢包',provider:'p3',logo:'https://placehold.co/56x56/D1FAE5/065F46?text=錢包',status:'on'},
  {id:'m13',name:'虛擬帳號',provider:'p4',logo:'https://placehold.co/56x56/E0E7FF/3730A3?text=虛擬',status:'on'},
  {id:'m14',name:'QR Code',provider:'p3',logo:'https://placehold.co/56x56/F3E8FF/6B21A8?text=QR',status:'on'},
  {id:'m15',name:'快速支付',provider:'p2',logo:'https://placehold.co/56x56/FEE2E2/991B1B?text=快付',status:'off'},
  {id:'m16',name:'代收代付',provider:'p6',logo:'https://placehold.co/56x56/DBEAFE/1E40AF?text=代收',status:'on'},
  {id:'m17',name:'第三方支付',provider:'p4',logo:'https://placehold.co/56x56/FEF3C7/92400E?text=第三方',status:'on'},
  {id:'m18',name:'區塊鏈支付',provider:'p7',logo:'https://placehold.co/56x56/D1FAE5/065F46?text=區塊鏈',status:'off'},
  {id:'m19',name:'預付卡',provider:'p1',logo:'https://placehold.co/56x56/E0E7FF/3730A3?text=預付',status:'on'},
  {id:'m20',name:'樂點卡',provider:'p2',logo:'https://placehold.co/56x56/F3E8FF/6B21A8?text=樂點',status:'on'}
];

const channels = [
  {id:'c1',method:'m1',name:'點數卡',code:'COPGAM05',logo:'https://placehold.co/56x56/DBEAFE/1E40AF?text=點數卡',status:'on'},
  {id:'c2',method:'m2',name:'手機小額付款',code:'TEL_PAY01',logo:'https://placehold.co/56x56/FEF3C7/92400E?text=小額',status:'on'},
  {id:'c3',method:'m2',name:'遠傳電信',code:'FET_01',logo:'https://placehold.co/56x56/FEF3C7/92400E?text=遠傳',status:'on'},
  {id:'c4',method:'m3',name:'信用卡3D',code:'CC3D_01',logo:'https://placehold.co/56x56/E0E7FF/3730A3?text=3D',status:'off'},
  {id:'c5',method:'m3',name:'線上轉點',code:'ONLINE_01',logo:'https://placehold.co/56x56/E0E7FF/3730A3?text=轉點',status:'off'},
  {id:'c6',method:'m4',name:'點數卡',code:'GASH_01',logo:'https://placehold.co/56x56/DBEAFE/1E40AF?text=點數卡',status:'on'},
  {id:'c7',method:'m5',name:'錢包扣點',code:'WALLET_01',logo:'https://placehold.co/56x56/FEE2E2/991B1B?text=錢包',status:'on'},
  {id:'c8',method:'m6',name:'LINE Pay',code:'LINEPAY_01',logo:'https://placehold.co/56x56/D1FAE5/065F46?text=LINE',status:'on'},
  {id:'c9',method:'m6',name:'全支付',code:'ALLPAY_01',logo:'https://placehold.co/56x56/D1FAE5/065F46?text=全支付',status:'on'},
  {id:'c10',method:'m7',name:'信用卡',code:'ECPAY_CC01',logo:'https://placehold.co/56x56/FEF3C7/92400E?text=信用卡',status:'off'},
  {id:'c11',method:'m8',name:'ATM轉帳',code:'ECPAY_ATM01',logo:'https://placehold.co/56x56/E0E7FF/3730A3?text=ATM',status:'off'},
  {id:'c12',method:'m9',name:'測試通道A',code:'TEST_A01',logo:'https://placehold.co/56x56/F3E8FF/6B21A8?text=A',status:'on'},
  {id:'c13',method:'m9',name:'測試通道B',code:'TEST_B01',logo:'https://placehold.co/56x56/F3E8FF/6B21A8?text=B',status:'on'},
  {id:'c14',method:'m10',name:'7-11即時儲',code:'711_01',logo:'https://placehold.co/56x56/DBEAFE/1E40AF?text=711',status:'on'},
  {id:'c15',method:'m11',name:'銀行轉帳',code:'BANK_01',logo:'https://placehold.co/56x56/FEF3C7/92400E?text=銀行',status:'on'},
  {id:'c16',method:'m12',name:'電子錢包',code:'EWALLET_01',logo:'https://placehold.co/56x56/D1FAE5/065F46?text=錢包',status:'on'},
  {id:'c17',method:'m13',name:'虛擬帳號',code:'VACCOUNT_01',logo:'https://placehold.co/56x56/E0E7FF/3730A3?text=虛擬',status:'on'},
  {id:'c18',method:'m14',name:'QR Code',code:'QR_01',logo:'https://placehold.co/56x56/F3E8FF/6B21A8?text=QR',status:'on'},
  {id:'c19',method:'m19',name:'預付卡',code:'PREPAID_01',logo:'https://placehold.co/56x56/E0E7FF/3730A3?text=預付',status:'on'},
  {id:'c20',method:'m20',name:'GASH樂點卡',code:'GASH_LP01',logo:'https://placehold.co/56x56/F3E8FF/7C3AED?text=樂點',status:'on'}
];

let expanded = {};
let currentPage = 1;
let pageSize = 20;

function changePageSize(val) {
  pageSize = parseInt(val);
  currentPage = 1;
  renderTable();
}

function goPage(p) { currentPage = p; renderTable(); }

function resetFilter() {
  document.getElementById('filterMethod').value = '';
  document.getElementById('filterChannel').value = '';
  document.getElementById('filterProvider').value = '';
  document.getElementById('filterStatus').value = '';
  document.getElementById('globalSearch').value = '';
  currentPage = 1;
  renderTable();
}

function init() {
  var provSel = document.getElementById('filterProvider');
  provSel.innerHTML = '<option value="">全部供應商</option>' + providers.map(function(p) {
    return '<option value="' + p.id + '">' + p.name + '</option>';
  }).join('');
  renderTable();
}

function renderTable() {
  var methodQ = (document.getElementById('filterMethod').value || '').toLowerCase();
  var channelQ = (document.getElementById('filterChannel').value || '').toLowerCase();
  var globalQ = (document.getElementById('globalSearch').value || '').toLowerCase();
  var prov = document.getElementById('filterProvider').value;
  var status = document.getElementById('filterStatus').value;

  var filtered = methods.filter(function(m) {
    if (prov && m.provider !== prov) return false;
    if (status && m.status !== status) return false;
    if (methodQ && m.name.toLowerCase().indexOf(methodQ) < 0) return false;
    if (channelQ) {
      var hasMatch = channels.some(function(c) {
        return c.method === m.id && c.name.toLowerCase().indexOf(channelQ) >= 0;
      });
      if (!hasMatch) return false;
    }
    if (globalQ) {
      var matchMethod = m.name.toLowerCase().indexOf(globalQ) >= 0;
      var matchChannel = channels.some(function(c) {
        return c.method === m.id && c.name.toLowerCase().indexOf(globalQ) >= 0;
      });
      if (!matchMethod && !matchChannel) return false;
    }
    return true;
  });

  var totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (currentPage > totalPages) currentPage = totalPages;
  var start = (currentPage - 1) * pageSize;
  var pageData = filtered.slice(start, start + pageSize);

  // Update page info
  document.getElementById('pageInfo').textContent = '第 ' + currentPage + ' 頁，共 ' + filtered.length + ' 筆資料';

  // Update page dropdown
  document.getElementById('currentPageLabel').textContent = '第 ' + currentPage + ' 頁';
  var dropdownHtml = '';
  for (var i = 1; i <= totalPages; i++) {
    dropdownHtml += '<div onclick="goPage(' + i + ');togglePageDropdown()" style="padding:8px 12px;cursor:pointer;font-size:13px;color:#374151' + (i === currentPage ? ';background:#F3F4F6;font-weight:600' : '') + '" onmouseover="this.style.background=\'#F9FAFB\'" onmouseout="this.style.background=\'' + (i === currentPage ? '#F3F4F6' : 'transparent') + '\'">第 ' + i + ' 頁</div>';
  }
  document.getElementById('pageDropdown').innerHTML = dropdownHtml;

  var editIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
  var chevronIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>';
  var addIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';

  var rows = '';
  pageData.forEach(function(m) {
    var p = providers.find(function(x) { return x.id === m.provider; });
    var provName = p ? p.name : '';
    var mChannels = channels.filter(function(c) { return c.method === m.id; });
    var isOpen = expanded[m.id];
    var chevCls = isOpen ? 'expand-btn open' : 'expand-btn';
    var statusBadge = '<span class="status-badge ' + m.status + '">' + (m.status === 'on' ? '啟用' : '停用') + '</span>';

    var pColor = provColors[m.provider] || '#6366F1';
    rows += '<tr class="parent-row">' +
      '<td style="width:30px;text-align:center;border-left:4px solid ' + pColor + '"><button class="' + chevCls + '" onclick="toggle(\'' + m.id + '\')">' + chevronIcon + '</button></td>' +
      '<td style="width:44px"><img src="' + m.logo + '"></td>' +
      '<td><span>' + m.name + '</span></td>' +
      '<td><span class="badge-count">' + mChannels.length + ' 個通道</span></td>' +
      '<td>' + provName + '</td>' +
      '<td><span class="code-text">-</span></td>' +
      '<td><div class="switch-cell" onclick="toggleStatus(\'method\',\'' + m.id + '\')"><button class="toggle ' + m.status + '"></button><span class="status-label ' + m.status + '">' + (m.status === 'on' ? '啟用' : '停用') + '</span></div></td>' +
      '<td class="action-cell"><button class="btn-icon-sm" onclick="editMethod(\'' + m.id + '\')" title="編輯">' + editIcon + '</button></td>' +
      '</tr>';

    if (isOpen) {
      mChannels.forEach(function(c) {
        rows += '<tr class="child-row">' +
          '<td style="border-left:4px solid ' + pColor + '"></td>' +
          '<td style="width:44px"><img src="' + c.logo + '"></td>' +
          '<td><span class="code-text">-</span></td>' +
          '<td>' + c.name + '</td>' +
          '<td>' + provName + '</td>' +
          '<td><span class="code-text">' + c.code + '</span></td>' +
          '<td><div class="switch-cell" onclick="toggleStatus(\'channel\',\'' + c.id + '\')"><button class="toggle ' + c.status + '"></button><span class="status-label ' + c.status + '">' + (c.status === 'on' ? '啟用' : '停用') + '</span></div></td>' +
          '<td class="action-cell"><button class="btn-icon-sm" onclick="editChannel(\'' + c.id + '\')" title="編輯">' + editIcon + '</button></td>' +
          '</tr>';
      });
      rows += '<tr class="child-row"><td style="border-left:4px solid ' + pColor + '" colspan="8"><span class="add-child-btn" onclick="addChannel(\'' + m.id + '\')">' + addIcon + ' 新增付款通道</span></td></tr>';
    }
  });

  if (!rows) rows = '<tr><td colspan="8" style="text-align:center;color:#9CA3AF;padding:32px">無符合條件的資料</td></tr>';

  document.getElementById('tableWrap').innerHTML =
    '<table class="tree-table"><thead><tr><th style="width:30px"></th><th style="width:44px">Logo</th><th>支付方式</th><th>付款通道</th><th>供應商</th><th>代碼</th><th style="width:100px">狀態</th><th style="width:60px">操作</th></tr></thead><tbody>' + rows + '</tbody></table>';

  // Pagination buttons
  var pageBtns = '<button class="page-arrow" onclick="goPage(' + Math.max(1, currentPage - 1) + ')" ' + (currentPage <= 1 ? 'disabled' : '') + '>&lt;</button>';
  for (var i = 1; i <= totalPages; i++) {
    pageBtns += '<button class="' + (i === currentPage ? 'active' : '') + '" onclick="goPage(' + i + ')">' + i + '</button>';
  }
  pageBtns += '<button class="page-arrow" onclick="goPage(' + Math.min(totalPages, currentPage + 1) + ')" ' + (currentPage >= totalPages ? 'disabled' : '') + '>&gt;</button>';
  document.getElementById('pageButtons').innerHTML = pageBtns;
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

function openModal(title, fields) {
  console.log('Modal:', title, fields);
}

function editMethod(id) {
  var m = methods.find(function(x) { return x.id === id; });
  if (!m) return;
  var p = providers.find(function(x) { return x.id === m.provider; });
  openModal('編輯支付方式 — ' + m.name, [
    {label:'供應商',type:'select',value:m.provider,options:providers.map(function(x) { return {value:x.id,label:x.name}; })},
    {label:'支付方式名稱',type:'text',value:m.name,required:true},
    {label:'Logo 圖片',type:'upload'}
  ]);
}

function addChannel(methodId) {
  var m = methods.find(function(x) { return x.id === methodId; });
  expanded[methodId] = true;
  openModal('新增付款通道 — ' + (m ? m.name : ''), [
    {label:'通道名稱',type:'text',placeholder:'輸入通道名稱',required:true},
    {label:'通道代碼',type:'text',placeholder:'輸入代碼',required:true},
    {label:'Logo 圖片',type:'upload'},
    {label:'狀態',type:'toggle',value:'on'}
  ]);
}

function editChannel(id) {
  var c = channels.find(function(x) { return x.id === id; });
  if (!c) return;
  openModal('編輯付款通道 — ' + c.name, [
    {label:'通道名稱',type:'text',value:c.name,required:true},
    {label:'通道代碼',type:'text',value:c.code,required:true},
    {label:'Logo 圖片',type:'upload'},
    {label:'狀態',type:'toggle',value:c.status}
  ]);
}

function togglePageDropdown() {
  var dropdown = document.getElementById('pageDropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('pageDropdown');
  var btn = document.getElementById('pageDropdownBtn');
  if (dropdown && btn && !dropdown.contains(e.target) && !btn.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', init);
