// === 資料（與 v1 共用）===
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
  {
    id:'mycard', name:'MyCard', code:'MYCARD', status:'on',
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
  {
    id:'gash', name:'Gash', code:'COPGAM', status:'on',
    methods: [
      { id:'ga-point', name:'點數卡', status:'on', billingId:'bp-ga-pt',
        channels: [{id:'ch-gash-pt',name:'點數卡',code:'COPGAM05',status:'on'}] },
      { id:'ga-wallet', name:'會員扣點', status:'on', billingId:'bp-ga-wl',
        channels: [{id:'ch-gash-wl',name:'錢包扣點',code:'COPGAM09',status:'on'}] },
      { id:'ga-cvs', name:'超商儲值', status:'on', billingId:'bp-ga-cvs',
        channels: [{id:'ch-gash-cvs',name:'7-11即時儲',code:'GASH_711',status:'on'}] }
    ]
  },
  {
    id:'ecpay0918', name:'0918綠界', code:'0918EC', status:'off',
    methods: [
      { id:'ec-mobile', name:'行動支付', status:'off', billingId:null,
        channels: [{id:'ch-ec-lp',name:'0918 linepay',code:'CHANNEL_83DE0D1A',status:'off'},{id:'ch-ec-all',name:'0918全支付',code:'CHANNEL_81C410ED',status:'off'}] },
      { id:'ec-bank', name:'銀行轉帳', status:'off', billingId:null,
        channels: [{id:'ch-ec-bank',name:'0918銀行轉帳',code:'CHANNEL_9B4F3F8A',status:'off'}] },
      { id:'ec-cc', name:'信用卡', status:'on', billingId:'bp-ec-cc',
        channels: [{id:'ch-ec-cc',name:'0918信用卡',code:'0918_CC',status:'on'}] }
    ]
  },
  {
    id:'startest', name:'星運測試商', code:'AB00888', status:'on',
    methods: [
      { id:'st-mobile', name:'行動支付', status:'on', billingId:null,
        channels: [{id:'ch-st-lp',name:'LINE Pay',code:'STAR_LP',status:'on'}] }
    ]
  },
  {
    id:'rdtest', name:'RD 測試供應商', code:'AC9625BC', status:'off',
    methods: [
      { id:'rd-test', name:'RD 測試支付方式', status:'off', billingId:'bp-rd',
        channels: [{id:'ch-rd1',name:'RD 測試003',code:'AC9625BC',status:'off'},{id:'ch-rd2',name:'test111',code:'test456',status:'off'}] }
    ]
  }
];

// === Icons ===
const ICON = {
  chevron: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
  view: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'
};

// === State ===
const expanded = { l1: {}, l2: {} };

// === Filter ===
function initProviderFilter() {
  const sel = document.getElementById('providerFilter');
  treeData.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id; opt.textContent = p.name;
    sel.appendChild(opt);
  });
}

function applyFilter() { render(); }
function resetFilter() {
  document.getElementById('providerFilter').value = 'all';
  document.getElementById('billingFilter').value = 'all';
  render();
}

// === Render ===
function render() {
  const provFilter = document.getElementById('providerFilter').value;
  const statusFilter = document.getElementById('billingFilter').value;
  const tbody = document.getElementById('accBody');
  let html = '';

  treeData.forEach(prov => {
    if (provFilter !== 'all' && prov.id !== provFilter) return;
    if (statusFilter !== 'all') {
      const hasMatch = prov.methods.some(m => m.billingId && billingPlans[m.billingId] && billingPlans[m.billingId].status === statusFilter);
      if (!hasMatch) return;
    }

    const l1Open = expanded.l1[prov.id];
    const statusBadge = prov.status === 'on'
      ? '<span class="status-on">啟用</span>'
      : '<span class="status-off">停用</span>';

    html += '<tr class="row-l1" onclick="toggleL1(\'' + prov.id + '\')">';
    html += '<td><span class="chevron' + (l1Open ? ' open' : '') + '">' + ICON.chevron + '</span></td>';
    html += '<td><span class="prov-badge"><span class="prov-dot"></span>' + prov.name + '</span></td>';
    html += '<td><span class="prov-code">' + prov.code + '</span></td>';
    html += '<td>' + statusBadge + '</td>';
    html += '<td>' + prov.methods.length + ' 種支付方式</td>';
    html += '<td></td></tr>';

    if (!l1Open) return;

    prov.methods.forEach(method => {
      if (statusFilter !== 'all') {
        const bp = method.billingId && billingPlans[method.billingId];
        if (!bp || bp.status !== statusFilter) return;
      }

      const l2Open = expanded.l2[method.id];
      const mStatus = method.status === 'on'
        ? '<span class="status-on">啟用</span>'
        : '<span class="status-off">停用</span>';

      const bp = method.billingId ? billingPlans[method.billingId] : null;
      const bpInfo = bp
        ? '<span class="amounts-badge">' + bp.amounts.length + ' 筆金額</span>'
        : '<span style="color:#9CA3AF;font-size:12px">未設定</span>';

      html += '<tr class="row-l2" onclick="toggleL2(\'' + method.id + '\')">';
      html += '<td><span class="chevron' + (l2Open ? ' open' : '') + '">' + ICON.chevron + '</span></td>';
      html += '<td><span class="method-icon">├</span>' + method.name + '</td>';
      html += '<td></td>';
      html += '<td>' + mStatus + '</td>';
      html += '<td>' + bpInfo + '</td>';
      html += '<td>';
      if (bp) {
        html += '<button class="action-btn" onclick="event.stopPropagation();openDetail(\'' + bp.id + '\')" title="檢視">' + ICON.view + '</button>';
        html += '<button class="action-btn" onclick="event.stopPropagation();openEdit(\'' + bp.id + '\')" title="編輯">' + ICON.edit + '</button>';
      }
      html += '</td></tr>';

      if (!l2Open) return;

      // L3 儲值金額表 row
      if (bp) {
        const toggleCls = bp.status === 'on' ? 'toggle on' : 'toggle';
        const toggleLabel = bp.status === 'on'
          ? '<span class="toggle-label on">啟用</span>'
          : '<span class="toggle-label off">停用</span>';

        html += '<tr class="row-l3">';
        html += '<td></td>';
        html += '<td colspan="2" style="padding-left:64px">📋 ' + bp.name + '</td>';
        html += '<td><span class="' + toggleCls + '" onclick="toggleStatus(\'' + bp.id + '\')"><span class="toggle-track"><span class="toggle-thumb"></span></span></span> ' + toggleLabel + '</td>';
        html += '<td><span class="amounts-badge">' + bp.amounts.length + ' 筆</span></td>';
        html += '<td><button class="action-btn" onclick="openDetail(\'' + bp.id + '\')">' + ICON.view + '</button><button class="action-btn" onclick="openEdit(\'' + bp.id + '\')">' + ICON.edit + '</button></td></tr>';
      }

      // L4 付款通道
      method.channels.forEach(ch => {
        const dotCls = ch.status === 'on' ? 'ch-dot' : 'ch-dot off';
        const chStatus = ch.status === 'on'
          ? '<span class="status-on">啟用</span>'
          : '<span class="status-off">停用</span>';
        html += '<tr class="row-l4">';
        html += '<td></td>';
        html += '<td style="padding-left:88px"><span class="' + dotCls + '"></span>' + ch.name + '</td>';
        html += '<td style="color:#9CA3AF;font-size:11px">' + ch.code + '</td>';
        html += '<td>' + chStatus + '</td>';
        html += '<td></td><td></td></tr>';
      });
    });
  });

  tbody.innerHTML = html;
}

// === Toggle expand ===
function toggleL1(id) { expanded.l1[id] = !expanded.l1[id]; render(); }
function toggleL2(id) { expanded.l2[id] = !expanded.l2[id]; render(); }

// === Toggle billing status ===
function toggleStatus(bpId) {
  const bp = billingPlans[bpId];
  if (!bp) return;
  const newStatus = bp.status === 'on' ? 'off' : 'on';
  const msg = newStatus === 'on' ? '確定要啟用該張儲值金額表嗎？' : '確定要停用該張儲值金額表嗎？';
  if (confirm(msg)) { bp.status = newStatus; render(); }
}

// === Modal ===
function openDetail(bpId) {
  const bp = billingPlans[bpId]; if (!bp) return;
  let provName='', methodName='', chNames=[];
  treeData.forEach(p => p.methods.forEach(m => {
    if (m.billingId === bpId) { provName=p.name; methodName=m.name; m.channels.forEach(ch => chNames.push(ch.name)); }
  }));

  const statusHtml = bp.status === 'on'
    ? '<span class="status-on">✓ 啟用</span>'
    : '<span class="status-off">停用</span>';

  let html = '<div class="bp-info-card"><h5>基本資訊</h5>';
  html += '<div class="bp-info-row"><span class="bp-label">金額表名稱</span><span>' + bp.name + '</span></div>';
  html += '<div class="bp-info-row"><span class="bp-label">供應商</span><span>' + provName + '</span></div>';
  html += '<div class="bp-info-row"><span class="bp-label">支付方式</span><span>' + methodName + '</span></div>';
  html += '<div class="bp-info-row"><span class="bp-label">付款通道</span><span>' + chNames.join('、') + '</span></div>';
  html += '<div class="bp-info-row"><span class="bp-label">狀態</span>' + statusHtml + '</div></div>';

  const rows = bp.amounts.map((a,i) =>
    '<tr><td>'+(i+1)+'</td><td>'+a.amount.toLocaleString()+'</td><td>'+a.base.toLocaleString()+'</td><td>'+a.rate+'%</td><td>'+a.bonus.toLocaleString()+'</td><td style="font-weight:600">'+a.total.toLocaleString()+'</td></tr>'
  ).join('');

  html += '<div class="bp-info-card"><h5>儲值金額表 <span style="font-weight:400;color:#6B7280;font-size:12px">總共 '+bp.amounts.length+' 筆</span></h5>';
  html += '<table class="data-table"><thead><tr><th>序</th><th>金額（台幣）</th><th>基本點數</th><th>贈比（%）</th><th>贈點</th><th>實際點數</th></tr></thead><tbody>'+rows+'</tbody></table></div>';

  document.getElementById('detailTitle').textContent = '儲值金額表詳細資訊';
  document.getElementById('detailBody').innerHTML = html;
  document.getElementById('detailFooter').innerHTML = '<button class="btn-close-modal" onclick="closeModal()">關閉</button><button class="btn-edit-modal" onclick="closeModal();openEdit(\''+bpId+'\')">'+ICON.edit+' 編輯</button>';
  document.getElementById('detailModal').classList.add('show');
}

function openEdit(bpId) {
  const bp = billingPlans[bpId]; if (!bp) return;
  let provName='', methodName='', chNames=[];
  treeData.forEach(p => p.methods.forEach(m => {
    if (m.billingId === bpId) { provName=p.name; methodName=m.name; m.channels.forEach(ch => chNames.push(ch.name)); }
  }));

  document.getElementById('detailTitle').textContent = '編輯儲值金額表';
  let html = '<div style="margin-bottom:16px;display:flex;gap:16px">';
  html += '<div style="flex:1"><label style="display:block;font-size:12px;color:#374151;margin-bottom:4px;font-weight:500">供應商</label><select style="width:100%;padding:8px 12px;border:1px solid #D1D5DB;border-radius:8px;font-size:13px"><option>'+provName+'</option></select></div>';
  html += '<div style="flex:1"><label style="display:block;font-size:12px;color:#374151;margin-bottom:4px;font-weight:500">支付方式</label><select style="width:100%;padding:8px 12px;border:1px solid #D1D5DB;border-radius:8px;font-size:13px"><option>'+methodName+'</option></select></div></div>';
  html += '<div style="margin-bottom:16px"><label style="display:block;font-size:12px;color:#374151;margin-bottom:4px;font-weight:500">付款通道</label><select style="width:100%;padding:8px 12px;border:1px solid #D1D5DB;border-radius:8px;font-size:13px"><option>'+chNames.join('、')+'</option></select></div>';

  const rows = bp.amounts.map((a,i) =>
    '<tr><td>'+(i+1)+'</td><td><input type="number" value="'+a.amount+'" style="width:70px;padding:4px 8px;border:1px solid #D1D5DB;border-radius:6px;font-size:13px;text-align:right"></td><td><input type="number" value="'+a.base+'" style="width:70px;padding:4px 8px;border:1px solid #D1D5DB;border-radius:6px;font-size:13px;text-align:right"></td><td><input type="number" value="'+a.rate+'" style="width:60px;padding:4px 8px;border:1px solid #D1D5DB;border-radius:6px;font-size:13px;text-align:right"></td><td>'+a.bonus.toLocaleString()+'</td><td style="font-weight:600">'+a.total.toLocaleString()+'</td><td><button style="border:none;background:none;color:#DC2626;cursor:pointer;font-size:13px">刪除</button></td></tr>'
  ).join('');

  html += '<div class="bp-info-card"><h5>儲值金額表 <span style="font-weight:400;color:#6B7280;font-size:12px">總共 '+bp.amounts.length+' 筆</span></h5>';
  html += '<table class="data-table"><thead><tr><th>序</th><th>金額</th><th>基本點數</th><th>贈比%</th><th>贈點</th><th>實際點數</th><th>操作</th></tr></thead><tbody>'+rows+'</tbody></table>';
  html += '<div style="text-align:center;padding:10px;color:#6B7280;font-size:13px;cursor:pointer;border-top:1px solid #F3F4F6;margin-top:8px" onclick="alert(\'新增金額列（Demo）\')">+ 新增</div></div>';

  const toggleCls = bp.status === 'on' ? 'toggle on' : 'toggle';
  const toggleLabel = bp.status === 'on' ? '<span class="toggle-label on">啟用</span>' : '<span class="toggle-label off">停用</span>';
  html += '<div style="display:flex;align-items:center;gap:12px;margin-top:16px;padding:12px 0;border-top:1px solid #E5E7EB"><span class="bp-label">狀態</span><span class="'+toggleCls+'"><span class="toggle-track"><span class="toggle-thumb"></span></span></span>'+toggleLabel+'</div>';

  document.getElementById('detailBody').innerHTML = html;
  document.getElementById('detailFooter').innerHTML = '<button class="btn-close-modal" onclick="closeModal()">取消</button><button class="btn-edit-modal" onclick="alert(\'儲存成功（Demo）\');closeModal()"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg> 儲存</button>';
  document.getElementById('detailModal').classList.add('show');
}

function closeModal() { document.getElementById('detailModal').classList.remove('show'); }

// === Init ===
initProviderFilter();
// 預設展開第一個供應商
expanded.l1[treeData[0].id] = true;
render();
