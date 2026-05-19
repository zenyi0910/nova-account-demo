// === 資料 ===
const billingPlans = {
  'bp-mc-point': {id:'bp-mc-point',name:'序號儲值',status:'on',amounts:[{amount:150,base:150,rate:0,bonus:0,total:150},{amount:300,base:300,rate:3,bonus:9,total:309},{amount:500,base:500,rate:5,bonus:25,total:525},{amount:1000,base:1000,rate:8,bonus:80,total:1080}]},
  'bp-mc-tel': {id:'bp-mc-tel',name:'手機小額付款-測試 遠傳電信-測試',status:'on',amounts:[{amount:50,base:50,rate:0,bonus:0,total:50},{amount:100,base:100,rate:3,bonus:3,total:103},{amount:300,base:300,rate:5,bonus:15,total:315}]},
  'bp-mc-cc': {id:'bp-mc-cc',name:'信用卡',status:'on',amounts:[{amount:300,base:300,rate:0,bonus:0,total:300},{amount:500,base:500,rate:3,bonus:15,total:515},{amount:1000,base:1000,rate:5,bonus:50,total:1050}]},
  'bp-mc-bank': {id:'bp-mc-bank',name:'銀行轉帳',status:'on',amounts:[{amount:500,base:500,rate:3,bonus:15,total:515},{amount:1000,base:1000,rate:5,bonus:50,total:1050},{amount:2000,base:2000,rate:8,bonus:160,total:2160}]},
  'bp-mc-mobile': {id:'bp-mc-mobile',name:'LINE Pay 全支付',status:'on',amounts:[{amount:100,base:100,rate:0,bonus:0,total:100},{amount:500,base:500,rate:5,bonus:25,total:525}]},
  'bp-mc-online': {id:'bp-mc-online',name:'線上轉點',status:'on',amounts:[{amount:100,base:100,rate:0,bonus:0,total:100},{amount:300,base:300,rate:3,bonus:9,total:309}]},
  'bp-mc-free': {id:'bp-mc-free',name:'免費扣抵',status:'on',amounts:[{amount:0,base:100,rate:0,bonus:0,total:100}]},
  'bp-mc-guild': {id:'bp-mc-guild',name:'公會會長大禮包',status:'on',amounts:[{amount:1000,base:1000,rate:10,bonus:100,total:1100}]},
  'bp-ga-pt': {id:'bp-ga-pt',name:'點數卡',status:'on',amounts:[{amount:150,base:150,rate:0,bonus:0,total:150},{amount:300,base:300,rate:3,bonus:9,total:309},{amount:500,base:500,rate:5,bonus:25,total:525}]},
  'bp-ga-wl': {id:'bp-ga-wl',name:'錢包扣點',status:'on',amounts:[{amount:50,base:5000,rate:3,bonus:150,total:5150},{amount:100,base:10000,rate:5,bonus:500,total:10500}]},
  'bp-ga-cvs': {id:'bp-ga-cvs',name:'7-11即時儲',status:'on',amounts:[{amount:100,base:100,rate:0,bonus:0,total:100},{amount:300,base:300,rate:3,bonus:9,total:309},{amount:500,base:500,rate:5,bonus:25,total:525}]},
  'bp-ec-cc': {id:'bp-ec-cc',name:'0918信用卡',status:'on',amounts:[{amount:300,base:300,rate:0,bonus:0,total:300},{amount:1000,base:1000,rate:5,bonus:50,total:1050}]},
  'bp-rd': {id:'bp-rd',name:'RD 測試003',status:'off',amounts:[{amount:10,base:10,rate:0,bonus:0,total:10},{amount:50,base:50,rate:3,bonus:1,total:51}]}
};

const treeData = [
  { id:'mycard', name:'MyCard', code:'MYCARD', status:'on',
    methods: [
      { id:'mc-point', name:'點數卡', status:'on', billingId:'bp-mc-point',
        channels: [{id:'ch-point',name:'序號儲值',code:'MYCARD_SEQ',status:'on'}] },
      { id:'mc-tel', name:'電信帳單', status:'on', billingId:'bp-mc-tel',
        channels: [{id:'ch-tel',name:'手機小額付款',code:'HE0004',status:'off'},{id:'ch-tel2',name:'遠傳電信',code:'HE0004B',status:'off'}] },
      { id:'mc-credit', name:'信用卡', status:'on', billingId:'bp-mc-cc',
        channels: [{id:'ch-cc',name:'信用卡',code:'MYCARD_CC',status:'on'}] },
      { id:'mc-bank', name:'銀行轉帳', status:'on', billingId:'bp-mc-bank',
        channels: [{id:'ch-bank',name:'銀行轉帳',code:'FA038',status:'on'}] },
      { id:'mc-mobile', name:'行動支付', status:'on', billingId:'bp-mc-mobile',
        channels: [{id:'ch-linepay2',name:'LINE Pay全支付',code:'MYCARD_LP',status:'on'}] },
      { id:'mc-online', name:'線上轉點', status:'on', billingId:'bp-mc-online',
        channels: [{id:'ch-cc3d',name:'信用卡3D',code:'CHANNEL_1E8B07D7',status:'off'},{id:'ch-costpoint',name:'線上轉點',code:'COSTPOINT',status:'on'}] },
      { id:'mc-free', name:'免費抵扣', status:'on', billingId:'bp-mc-free',
        channels: [{id:'ch-free',name:'免費扣抵',code:'HE0033',status:'off'}] },
      { id:'mc-guild', name:'公會會長大禮包', status:'on', billingId:'bp-mc-guild',
        channels: [{id:'ch-guild',name:'公會會長大禮包',code:'FA200000002',status:'on'}] }
    ]
  },
  { id:'gash', name:'Gash', code:'COPGAM', status:'on',
    methods: [
      { id:'ga-point', name:'點數卡', status:'on', billingId:'bp-ga-pt',
        channels: [{id:'ch-gash-pt',name:'點數卡',code:'COPGAM05',status:'on'}] },
      { id:'ga-wallet', name:'會員扣點', status:'on', billingId:'bp-ga-wl',
        channels: [{id:'ch-gash-wl',name:'錢包扣點',code:'COPGAM09',status:'on'}] },
      { id:'ga-cvs', name:'超商儲值', status:'on', billingId:'bp-ga-cvs',
        channels: [{id:'ch-gash-cvs',name:'7-11即時儲',code:'GASH_711',status:'on'}] }
    ]
  },
  { id:'ecpay0918', name:'0918綠界', code:'0918EC', status:'off',
    methods: [
      { id:'ec-mobile', name:'行動支付', status:'off', billingId:null,
        channels: [{id:'ch-ec-lp',name:'0918 linepay',code:'CHANNEL_83DE0D1A',status:'off'},{id:'ch-ec-all',name:'0918全支付',code:'CHANNEL_81C410ED',status:'off'}] },
      { id:'ec-bank', name:'銀行轉帳', status:'off', billingId:null,
        channels: [{id:'ch-ec-bank',name:'0918銀行轉帳',code:'CHANNEL_9B4F3F8A',status:'off'}] },
      { id:'ec-cc', name:'信用卡', status:'on', billingId:'bp-ec-cc',
        channels: [{id:'ch-ec-cc',name:'0918信用卡',code:'0918_CC',status:'on'}] }
    ]
  },
  { id:'startest', name:'星運測試商', code:'AB00888', status:'on',
    methods: [
      { id:'st-mobile', name:'行動支付', status:'on', billingId:null,
        channels: [{id:'ch-st-lp',name:'LINE Pay',code:'STAR_LP',status:'on'}] }
    ]
  },
  { id:'rdtest', name:'RD 測試供應商', code:'AC9625BC', status:'off',
    methods: [
      { id:'rd-test', name:'RD 測試支付方式', status:'off', billingId:'bp-rd',
        channels: [{id:'ch-rd1',name:'RD 測試003',code:'AC9625BC',status:'off'},{id:'ch-rd2',name:'test111',code:'test456',status:'off'}] }
    ]
  }
];

// === Chevron icons ===
const CHEVRON_DOWN = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>';
const CHEVRON_UP = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 15 12 9 18 15"/></svg>';

// === State ===
const expandedProvs = {};

// === Filter ===
function initProviderFilter() {
  const sel = document.getElementById('providerFilter');
  treeData.forEach(p => { const o = document.createElement('option'); o.value = p.id; o.textContent = p.name; sel.appendChild(o); });
}
function applyFilter() { render(); }
function resetFilter() { document.getElementById('providerFilter').value='all'; document.getElementById('billingFilter').value='all'; render(); }

// === Init shared component buttons ===
function initButtons() {
  document.getElementById('btnAdd').innerHTML = UI.btn.add('新增儲值金額表', "openNewBilling()");
  document.getElementById('filterBtns').innerHTML = UI.btn.dark('搜尋', 'applyFilter()', {icon:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'}) + ' ' + UI.btn.outline('重置', 'resetFilter()');
}
// === Render ===
function render() {
  const provFilter = document.getElementById('providerFilter').value;
  const statusFilter = document.getElementById('billingFilter').value;
  const tbody = document.getElementById('tblBody');
  let html = '';
  let totalRows = 0;

  treeData.forEach(prov => {
    if (provFilter !== 'all' && prov.id !== provFilter) return;

    let filteredMethods = prov.methods;
    if (statusFilter !== 'all') {
      filteredMethods = prov.methods.filter(m => {
        const bp = m.billingId && billingPlans[m.billingId];
        return bp && bp.status === statusFilter;
      });
      if (filteredMethods.length === 0) return;
    }

    const isOpen = expandedProvs[prov.id];

    // 供應商 header（不再用獨立 header row，改用 rowspan）
    const provOffTag = prov.status !== 'on' ? ' <span style="display:inline-flex;align-items:center;padding:2px 6px;border-radius:4px;background:#FEE2E2;color:#DC2626;font-size:10px;font-weight:500;margin-left:6px">停用</span>' : '';
    if (!isOpen) {
      // 收合狀態：section header
      html += '<tr class="prov-header" onclick="toggleProv(\'' + prov.id + '\')">';
      html += '<td colspan="4"><span class="prov-toggle"><span class="prov-chevron">' + CHEVRON_DOWN + '</span>';
      html += '<span class="prov-name">' + prov.name + '</span>' + provOffTag + '</span>';
      html += '<span class="prov-count">' + filteredMethods.length + ' 種支付方式</span></td></tr>';
      return;
    }

    // 展開狀態：section header + data rows (no repeated column headers)
    html += '<tr class="prov-header" onclick="toggleProv(\'' + prov.id + '\')">';
    html += '<td colspan="4"><span class="prov-toggle"><span class="prov-chevron">' + CHEVRON_UP + '</span>';
    html += '<span class="prov-name">' + prov.name + '</span>' + provOffTag + '</span></td></tr>';

    const len = filteredMethods.length;
    filteredMethods.forEach((method, mi) => {
      const bp = method.billingId ? billingPlans[method.billingId] : null;
      const methodOffTag = method.status !== 'on' ? ' <span style="display:inline-flex;align-items:center;padding:2px 6px;border-radius:4px;background:#FEE2E2;color:#DC2626;font-size:10px;font-weight:500;margin-left:6px">停用</span>' : '';

      // 付款通道
      let chHtml = '<div class="ch-list">';
      method.channels.forEach(ch => {
        const cls = ch.status === 'on' ? 'ch-badge' : 'ch-badge off';
        const dot = ch.status === 'on' ? 'ch-dot' : 'ch-dot off';
        chHtml += '<span class="' + cls + '"><span class="' + dot + '"></span>' + ch.name + '</span>';
      });
      chHtml += '</div>';

      // 狀態（用共用元件 UI.toggle + 文字標籤，水平對齊）
      let statusHtml = '';
      if (bp) {
        const label = bp.status === 'on'
          ? '<span style="color:#059669;font-size:12px;margin-left:6px">啟用</span>'
          : '<span style="color:#9CA3AF;font-size:12px;margin-left:6px">停用</span>';
        statusHtml = '<span style="display:inline-flex;align-items:center">' + UI.toggle(bp.status === 'on' ? 'on' : 'off', "event.stopPropagation();toggleStatus('" + bp.id + "')") + label + '</span>';
      } else {
        statusHtml = '';
      }

      // 操作（用共用元件 UI.btn.icon，左右擺放）
      let actHtml = '';
      if (bp) {
        actHtml = '<div class="act-cell">' + UI.btn.icon('view', "event.stopPropagation();openDetail('" + bp.id + "')", '檢視');
        actHtml += UI.btn.icon('edit', "event.stopPropagation();openEdit('" + bp.id + "')", '編輯') + '</div>';
      } else {
        actHtml = '<div class="act-cell"><span style="display:inline-flex;align-items:center;gap:4px;color:#9CA3AF;font-size:12px;cursor:pointer;white-space:nowrap" onclick="event.stopPropagation();openNewBilling(\'' + method.id + '\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>新增</span></div>';
      }

      html += '<tr>';
      html += '<td>' + method.name + methodOffTag + '</td>';
      html += '<td>' + chHtml + '</td>';
      html += '<td>' + statusHtml + '</td>';
      html += '<td>' + actHtml + '</td>';
      html += '</tr>';
      totalRows++;
    });
  });

  tbody.innerHTML = html;
  document.getElementById('tblInfo').textContent = '共 ' + totalRows + ' 筆資料';
}

// === Toggle ===
function toggleProv(id) { expandedProvs[id] = !expandedProvs[id]; render(); }

function toggleStatus(bpId) {
  const bp = billingPlans[bpId]; if (!bp) return;
  const msg = bp.status === 'on' ? '確定要停用該張儲值金額表嗎？' : '確定要啟用該張儲值金額表嗎？';
  if (confirm(msg)) { bp.status = bp.status === 'on' ? 'off' : 'on'; render(); }
}

// === Modal: reuse v1 style (openBillingDetail / openBillingEdit / openNewBilling) ===
function openDetail(bpId) {
  const bp = billingPlans[bpId]; if (!bp) return;
  let provName='', methodName='', chNames=[];
  treeData.forEach(p => p.methods.forEach(m => {
    if (m.billingId === bpId) { provName=p.name; methodName=m.name; m.channels.forEach(ch => chNames.push(ch.name)); }
  }));
  const statusHtml = bp.status === 'on'
    ? '<span class="badge badge-on">✓ 啟用</span>'
    : '<span class="badge badge-off">停用</span>';
  let html = '<div class="bp-info-card"><h5>基本資訊</h5>';
  html += '<div class="bp-info-row"><span class="bp-label">金額表名稱</span><span>' + bp.name + '</span></div>';
  html += '<div class="bp-info-row"><span class="bp-label">供應商</span><span>' + provName + '</span></div>';
  html += '<div class="bp-info-row"><span class="bp-label">支付方式</span><span>' + methodName + '</span></div>';
  html += '<div class="bp-info-row"><span class="bp-label">付款通道</span><span>' + chNames.join('、') + '</span></div>';
  html += '<div class="bp-info-row"><span class="bp-label">狀態</span>' + statusHtml + '</div></div>';
  const rows = bp.amounts.map((a,i) => '<tr><td>'+(i+1)+'</td><td>'+a.amount.toLocaleString()+'</td><td>'+a.base.toLocaleString()+'</td><td>'+a.rate+'%</td><td>'+a.bonus.toLocaleString()+'</td><td style="font-weight:600">'+a.total.toLocaleString()+'</td></tr>').join('');
  html += '<div class="bp-info-card"><h5>儲值金額表 <span style="font-weight:400;color:#6B7280;font-size:12px">總共 '+bp.amounts.length+' 筆</span></h5>';
  html += '<table class="data-table"><thead><tr><th>序</th><th>金額（台幣）</th><th>基本點數</th><th>贈比%</th><th>贈點</th><th>實際點數</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  document.getElementById('detailTitle').textContent = '儲值金額表詳細資訊';
  document.getElementById('detailBody').innerHTML = html;
  document.getElementById('detailFooter').innerHTML = '<button class="btn btn-outline" onclick="closeModal()">關閉</button>' + UI.btn.dark('編輯', "closeModal();openEdit('" + bpId + "')", {icon:'<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>'});
  document.getElementById('detailModal').classList.add('show');
}

function openEdit(bpId) {
  const bp = billingPlans[bpId]; if (!bp) return;
  let provName='', methodName='', chNames=[];
  treeData.forEach(p => p.methods.forEach(m => {
    if (m.billingId === bpId) { provName=p.name; methodName=m.name; m.channels.forEach(ch => chNames.push(ch.name)); }
  }));
  document.getElementById('detailTitle').textContent = '編輯儲值金額表';
  let html = UI.form.row(
    UI.form.select('edit-prov', '供應商', [{value:provName,label:provName,selected:true}], {required:true}),
    UI.form.select('edit-method', '支付方式', [{value:methodName,label:methodName,selected:true}], {required:true})
  );
  html += UI.form.select('edit-ch', '付款通道', [{value:chNames.join('、'),label:chNames.join('、'),selected:true}], {required:true});
  const rows = bp.amounts.map((a,i) =>
    '<tr><td>'+(i+1)+'</td><td><input type="number" value="'+a.amount+'" style="width:70px;padding:4px 8px;border:1px solid #D1D5DB;border-radius:6px;font-size:13px;text-align:right"></td><td><input type="number" value="'+a.base+'" style="width:70px;padding:4px 8px;border:1px solid #D1D5DB;border-radius:6px;font-size:13px;text-align:right"></td><td><input type="number" value="'+a.rate+'" style="width:60px;padding:4px 8px;border:1px solid #D1D5DB;border-radius:6px;font-size:13px;text-align:right"></td><td>'+a.bonus.toLocaleString()+'</td><td style="font-weight:600">'+a.total.toLocaleString()+'</td><td>'+UI.btn.icon('delete',"alert('刪除（Demo）')",'刪除')+'</td></tr>'
  ).join('');
  html += '<div class="bp-info-card"><h5>儲值金額表 <span style="font-weight:400;color:#6B7280;font-size:12px">總共 '+bp.amounts.length+' 筆</span></h5>';
  html += '<table class="data-table"><thead><tr><th>序</th><th>金額</th><th>基本點數</th><th>贈比%</th><th>贈點</th><th>實際點數</th><th>操作</th></tr></thead><tbody>'+rows+'</tbody></table>';
  html += '<div style="text-align:center;padding:10px;color:#6B7280;font-size:13px;cursor:pointer;border-top:1px solid #F3F4F6;margin-top:8px" onclick="alert(\'新增金額列（Demo）\')">+ 新增</div></div>';
  // 狀態 toggle
  const toggleCls = bp.status === 'on' ? 'on' : 'off';
  const toggleLabel = bp.status === 'on' ? '<span style="color:#059669;font-size:12px;margin-left:6px">啟用</span>' : '<span style="color:#9CA3AF;font-size:12px;margin-left:6px">停用</span>';
  html += '<div style="display:flex;align-items:center;gap:12px;margin-top:16px;padding:12px 0;border-top:1px solid #E5E7EB"><span class="bp-label">狀態</span>' + UI.toggle(toggleCls, "toggleStatus('" + bp.id + "')") + toggleLabel + '</div>';
  document.getElementById('detailBody').innerHTML = html;
  document.getElementById('detailFooter').innerHTML = UI.btn.modalFooter('儲存', "alert('儲存成功（Demo）');closeModal()");
  document.getElementById('detailModal').classList.add('show');
}

function openNewBilling(methodId) {
  let provName='', methodName='';
  if (methodId) {
    treeData.forEach(p => p.methods.forEach(m => {
      if (m.id === methodId) { provName=p.name; methodName=m.name; }
    }));
  }
  document.getElementById('detailTitle').textContent = '新增儲值金額表';
  let html = UI.form.row(
    UI.form.select('new-prov', '供應商', provName ? [{value:provName,label:provName,selected:true}] : [{value:'',label:'請選擇供應商'}], {required:true}),
    UI.form.select('new-method', '支付方式', methodName ? [{value:methodName,label:methodName,selected:true}] : [{value:'',label:'請選擇支付方式'}], {required:true})
  );
  html += UI.form.select('new-ch', '付款通道', [{value:'',label:'請選擇付款通道'}], {required:true});
  html += '<div class="bp-info-card"><h5>儲值金額表 <span style="font-weight:400;color:#6B7280;font-size:12px">總共 0 筆資料</span></h5>';
  html += '<table class="data-table"><thead><tr><th>序</th><th>金額（台幣）</th><th>基本點數</th><th>贈比%</th><th>贈點</th><th>實際點數</th><th>操作</th></tr></thead><tbody></tbody></table>';
  html += '<div style="text-align:center;padding:10px;color:#6B7280;font-size:13px;cursor:pointer;border-top:1px solid #F3F4F6;margin-top:8px" onclick="alert(\'新增金額列（Demo）\')">+ 新增</div></div>';
  html += '<div style="display:flex;align-items:center;gap:12px;margin-top:16px;padding:12px 0;border-top:1px solid #E5E7EB"><span class="bp-label">狀態</span>' + UI.toggle('on', '') + '<span style="color:#059669;font-size:12px;margin-left:6px">啟用</span></div>';
  document.getElementById('detailBody').innerHTML = html;
  document.getElementById('detailFooter').innerHTML = UI.btn.modalFooter('確認新增', "alert('新增成功（Demo）');closeModal()");
  document.getElementById('detailModal').classList.add('show');
}

function closeModal() { document.getElementById('detailModal').classList.remove('show'); }

// === Init ===
initProviderFilter();
initButtons();
treeData.forEach(p => { expandedProvs[p.id] = true; });
render();
