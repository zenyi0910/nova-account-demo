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
  {id:'m9',provider:'startest',name:'測試支付',logo:'https://placehold.co/56x56/F3F4F6/374151?text=測試',status:'on'},
  {id:'m10',provider:'mycard',name:'超商代碼',logo:'https://placehold.co/56x56/FEF3C7/92400E?text=超商',status:'on'},
  {id:'m11',provider:'gash',name:'信用卡',logo:'https://placehold.co/56x56/FEE2E2/991B1B?text=信用卡',status:'on'},
  {id:'m12',provider:'linepay',name:'LINE Points',logo:'https://placehold.co/56x56/DCFCE7/166534?text=Points',status:'off'},
  {id:'m13',provider:'ecpay',name:'超商代碼',logo:'https://placehold.co/56x56/FEF3C7/92400E?text=超商',status:'on'},
  {id:'m14',provider:'esun',name:'信用卡',logo:'https://placehold.co/56x56/E0F2FE/0369A1?text=信用卡',status:'on'},
  {id:'m15',provider:'esun',name:'網路ATM',logo:'https://placehold.co/56x56/E0F2FE/0369A1?text=ATM',status:'on'},
  {id:'m16',provider:'fetnet',name:'電信小額',logo:'https://placehold.co/56x56/F3E8FF/7C3AED?text=電信',status:'on'},
  {id:'m17',provider:'fetnet',name:'遠傳幣',logo:'https://placehold.co/56x56/F3E8FF/7C3AED?text=遠傳幣',status:'off'},
  {id:'m18',provider:'startest',name:'免費抵扣',logo:'https://placehold.co/56x56/F3F4F6/374151?text=免費',status:'on'},
  {id:'m19',provider:'mycard',name:'MyCard儲值',logo:'https://placehold.co/56x56/EEF2FF/4338CA?text=儲值',status:'on'},
  {id:'m20',provider:'gash',name:'GASH樂點',logo:'https://placehold.co/56x56/F3E8FF/7C3AED?text=樂點',status:'on'}
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
  {id:'c10',method:'m9',name:'測試通道B',code:'TEST_B',logo:'https://placehold.co/56x56/F3F4F6/374151?text=B',status:'on'},
  {id:'c11',method:'m10',name:'超商代碼繳費',code:'MC_CVS01',logo:'https://placehold.co/56x56/FEF3C7/92400E?text=超商',status:'on'},
  {id:'c12',method:'m11',name:'信用卡分期',code:'GASH_CC01',logo:'https://placehold.co/56x56/FEE2E2/991B1B?text=分期',status:'on'},
  {id:'c13',method:'m12',name:'LINE Points兌換',code:'LP_PTS01',logo:'https://placehold.co/56x56/DCFCE7/166534?text=Points',status:'off'},
  {id:'c14',method:'m13',name:'超商代碼',code:'EC_CVS01',logo:'https://placehold.co/56x56/FEF3C7/92400E?text=超商',status:'on'},
  {id:'c15',method:'m14',name:'玉山信用卡',code:'ESUN_CC01',logo:'https://placehold.co/56x56/E0F2FE/0369A1?text=玉山',status:'on'},
  {id:'c16',method:'m15',name:'玉山網路ATM',code:'ESUN_ATM01',logo:'https://placehold.co/56x56/E0F2FE/0369A1?text=ATM',status:'on'},
  {id:'c17',method:'m16',name:'遠傳小額付款',code:'FET_SM01',logo:'https://placehold.co/56x56/F3E8FF/7C3AED?text=小額',status:'on'},
  {id:'c18',method:'m17',name:'遠傳幣兌換',code:'FET_COIN01',logo:'https://placehold.co/56x56/F3E8FF/7C3AED?text=遠傳幣',status:'off'},
  {id:'c19',method:'m19',name:'MyCard線上儲值',code:'MC_TOP01',logo:'https://placehold.co/56x56/EEF2FF/4338CA?text=儲值',status:'on'},
  {id:'c20',method:'m20',name:'GASH樂點卡',code:'GASH_LP01',logo:'https://placehold.co/56x56/F3E8FF/7C3AED?text=樂點',status:'on'}
];

let expanded = {};
let currentPage = 1;
let pageSize = 10;

function changePageSize(val) {
  pageSize = parseInt(val);
  currentPage = 1;
  renderTable();
}

function goPage(p) { currentPage = p; renderTable(); }

function init() {
  var sel = document.getElementById('filterProvider');
  sel.innerHTML = '<option value="">全部供應商</option>' + providers.map(function(p) {
    return '<option value="' + p.id + '">' + p.name + '</option>';
  }).join('');
  renderTable();
}

function resetFilter() {
  document.getElementById('filterMethod').value = '';
  document.getElementById('filterChannel').value = '';
  document.getElementById('filterProvider').value = '';
  document.getElementById('filterStatus').value = '';
  renderTable();
}

function renderTable() {
  var methodQ = (document.getElementById('filterMethod').value || '').toLowerCase();
  var channelQ = (document.getElementById('filterChannel').value || '').toLowerCase();
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
    return true;
  });

  document.getElementById('pageInfo').textContent = '第 ' + currentPage + ' 頁，共 ' + filtered.length + ' 筆資料';

  var totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (currentPage > totalPages) currentPage = totalPages;
  var start = (currentPage - 1) * pageSize;
  var pageData = filtered.slice(start, start + pageSize);

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

    rows += '<tr class="parent-row">' +
      '<td style="width:30px;text-align:center"><button class="' + chevCls + '" onclick="toggle(\'' + m.id + '\')">' + chevronIcon + '</button></td>' +
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
        var cBadge = '<span class="status-badge ' + c.status + '">' + (c.status === 'on' ? '啟用' : '停用') + '</span>';
        rows += '<tr class="child-row">' +
          '<td></td>' +
          '<td style="width:44px"><img src="' + c.logo + '"></td>' +
          '<td>-</td>' +
          '<td>' + c.name + '</td>' +
          '<td>' + provName + '</td>' +
          '<td><span class="code-text">' + c.code + '</span></td>' +
          '<td><div class="switch-cell" onclick="toggleStatus(\'channel\',\'' + c.id + '\')"><button class="toggle ' + c.status + '"></button><span class="status-label ' + c.status + '">' + (c.status === 'on' ? '啟用' : '停用') + '</span></div></td>' +
          '<td class="action-cell"><button class="btn-icon-sm" onclick="editChannel(\'' + c.id + '\')" title="編輯">' + editIcon + '</button></td>' +
          '</tr>';
      });
      rows += '<tr class="child-row"><td colspan="8" style="text-align:center"><span class="add-child-btn" onclick="addChannel(\'' + m.id + '\')">' + addIcon + ' 新增付款通道</span></td></tr>';
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

// === Modal ===
function openModal(title, fields) {
  var modal = document.getElementById('editModal');
  document.getElementById('modalTitle').textContent = title;
  var body = document.getElementById('modalBody');
  body.innerHTML = fields.map(function(f) {
    if (f.type === 'select') {
      var opts = f.options.map(function(o) { return '<option value="' + o.value + '"' + (o.value === f.value ? ' selected' : '') + '>' + o.label + '</option>'; }).join('');
      return '<div class="form-group"><label>' + f.label + (f.required ? ' <span style="color:#EF4444">*</span>' : '') + '</label><select>' + opts + '</select></div>';
    }
    if (f.type === 'upload') {
      return '<div class="form-group"><label>' + f.label + '</label><div style="width:80px;height:80px;border:2px dashed #E5E7EB;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;color:#9CA3AF;font-size:11px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>上傳圖片</span></div></div>';
    }
    if (f.type === 'toggle') {
      var cls = f.value === 'on' ? 'on' : 'off';
      return '<div class="form-group"><label>' + f.label + '</label><div style="display:flex;align-items:center;gap:8px"><button class="toggle ' + cls + '" onclick="this.className=this.className.includes(\'on\')?\'toggle off\':\'toggle on\'"></button><span class="status-label ' + cls + '">' + (f.value === 'on' ? '啟用' : '停用') + '</span></div></div>';
    }
    return '<div class="form-group"><label>' + f.label + (f.required ? ' <span style="color:#EF4444">*</span>' : '') + '</label><input type="text" value="' + (f.value || '') + '" placeholder="' + (f.placeholder || '') + '"></div>';
  }).join('');
  modal.classList.add('show');
}
function closeModal() { document.getElementById('editModal').classList.remove('show'); }

function openAddMethod() {
  openModal('新增支付方式', [
    {label:'供應商',type:'select',value:'',required:true,options:[{value:'',label:'請選擇'}].concat(providers.map(function(p){return {value:p.id,label:p.name};}))},
    {label:'支付方式名稱',type:'text',placeholder:'輸入名稱',required:true},
    {label:'Logo 圖片',type:'upload'},
    {label:'狀態',type:'toggle',value:'on'}
  ]);
}

function editMethod(id) {
  var m = methods.find(function(x) { return x.id === id; });
  if (!m) return;
  openModal('編輯支付方式 — ' + m.name, [
    {label:'供應商',type:'select',value:m.provider,required:true,options:providers.map(function(p){return {value:p.id,label:p.name};})},
    {label:'支付方式名稱',type:'text',value:m.name,required:true},
    {label:'Logo 圖片',type:'upload'},
    {label:'狀態',type:'toggle',value:m.status}
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

document.addEventListener('DOMContentLoaded', init);
