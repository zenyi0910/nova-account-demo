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

// === State ===
const expandedProvs = {};

// === Filter ===
function initProviderFilter() {
  const sel = document.getElementById('providerFilter');
  treeData.forEach(p => { const o = document.createElement('option'); o.value = p.id; o.textContent = p.name; sel.appendChild(o); });
}
function applyFilter() { render(); }
function resetFilter() { document.getElementById('providerFilter').value='all'; document.getElementById('billingFilter').value='all'; render(); }

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
    const chevron = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>';

    // 供應商 header（不再用獨立 header row，改用 rowspan）
    if (!isOpen) {
      // 收合狀態：只顯示一列 summary
      html += '<tr class="prov-header" onclick="toggleProv(\'' + prov.id + '\')">';
      html += '<td class="col-lines"></td>';
      html += '<td colspan="5"><span class="prov-toggle"><span class="prov-chevron">' + chevron + '</span>';
      html += '<span class="prov-name">' + prov.name + '</span><span class="prov-code">' + prov.code + '</span></span>';
      html += '<span class="prov-count">' + filteredMethods.length + ' 種支付方式</span></td></tr>';
      return;
    }

    const len = filteredMethods.length;
    filteredMethods.forEach((method, mi) => {
      const bp = method.billingId ? billingPlans[method.billingId] : null;
      const isFirst = mi === 0;
      const isLast = mi === len - 1;
      const posClass = len === 1 ? 'row-only' : (isFirst ? 'row-first' : (isLast ? 'row-last' : ''));

      // 付款通道
      let chHtml = '<div class="ch-list">';
      method.channels.forEach(ch => {
        const cls = ch.status === 'on' ? 'ch-badge' : 'ch-badge off';
        const dot = ch.status === 'on' ? 'ch-dot' : 'ch-dot off';
        chHtml += '<span class="' + cls + '"><span class="' + dot + '"></span>' + ch.name + '</span>';
      });
      chHtml += '</div>';

      // 狀態（用共用元件 UI.toggle + 文字標籤）
      let statusHtml = '';
      if (bp) {
        const label = bp.status === 'on' ? '<span style="color:#059669;font-size:12px;margin-left:6px">啟用</span>' : '<span style="color:#DC2626;font-size:12px;margin-left:6px">停用</span>';
        statusHtml = UI.toggle(bp.status === 'on' ? 'on' : 'off', "event.stopPropagation();toggleStatus('" + bp.id + "')") + label;
      } else {
        statusHtml = '<span style="color:#9CA3AF;font-size:12px">未設定</span>';
      }

      // 操作（用共用元件 UI.btn.icon，左右擺放）
      let actHtml = '';
      if (bp) {
        actHtml = '<div class="act-cell">' + UI.btn.icon('view', "event.stopPropagation();openDetail('" + bp.id + "')", '檢視');
        actHtml += UI.btn.icon('edit', "event.stopPropagation();openEdit('" + bp.id + "')", '編輯') + '</div>';
      }

      html += '<tr class="' + posClass + '">';
      html += '<td class="col-lines"><div class="line-prov"></div><div class="line-method"></div></td>';

      // 供應商欄：第一列用 rowspan，其餘不輸出此 td
      if (isFirst) {
        html += '<td class="prov-cell" rowspan="' + len + '" onclick="toggleProv(\'' + prov.id + '\')">';
        html += '<span class="prov-chevron open">' + chevron + '</span>';
        html += '<span class="prov-name">' + prov.name + '</span>';
        html += '<span class="prov-code">' + prov.code + '</span></td>';
      }

      html += '<td>' + method.name + '</td>';
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

// === Modal: Detail ===
function openDetail(bpId) {
  const bp = billingPlans[bpId]; if (!bp) return;
  let provName='', methodName='', chNames=[];
  treeData.forEach(p => p.methods.forEach(m => {
    if (m.billingId === bpId) { provName=p.name; methodName=m.name; m.channels.forEach(ch => chNames.push(ch.name)); }
  }));
  const statusHtml = bp.status === 'on' ? UI.badge('啟用', 'on') : UI.badge('停用', 'off');
  let html = '<div class="bp-info-card"><h5>基本資訊</h5>';
  html += '<div class="bp-info-row"><span class="bp-label">金額表名稱</span><span>' + bp.name + '</span></div>';
  html += '<div class="bp-info-row"><span class="bp-label">供應商</span><span>' + provName + '</span></div>';
  html += '<div class="bp-info-row"><span class="bp-label">支付方式</span><span>' + methodName + '</span></div>';
  html += '<div class="bp-info-row"><span class="bp-label">付款通道</span><span>' + chNames.join('、') + '</span></div>';
  html += '<div class="bp-info-row"><span class="bp-label">狀態</span>' + statusHtml + '</div></div>';
  const rows = bp.amounts.map((a,i) => '<tr><td>'+(i+1)+'</td><td>'+a.amount.toLocaleString()+'</td><td>'+a.base.toLocaleString()+'</td><td>'+a.rate+'%</td><td>'+a.bonus.toLocaleString()+'</td><td style="font-weight:600">'+a.total.toLocaleString()+'</td></tr>').join('');
  html += '<div class="bp-info-card"><h5>儲值金額表 <span style="font-weight:400;color:#6B7280;font-size:12px">總共 '+bp.amounts.length+' 筆</span></h5>';
  html += UI.table.create(
    [{label:'序'},{label:'金額（台幣）'},{label:'基本點數'},{label:'贈比%'},{label:'贈點'},{label:'實際點數'}],
    bp.amounts.map((a,i) => [{cells:[(i+1), a.amount.toLocaleString(), a.base.toLocaleString(), a.rate+'%', a.bonus.toLocaleString(), '<b>'+a.total.toLocaleString()+'</b>']}][0])
  );
  html += '</div>';
  document.getElementById('detailTitle').textContent = '儲值金額表詳細資訊';
  document.getElementById('detailBody').innerHTML = html;
  document.getElementById('detailFooter').innerHTML = '<button class="btn btn-outline" onclick="closeModal()">關閉</button>' + UI.btn.dark('編輯', "closeModal();openEdit('" + bpId + "')", {icon:'<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>'});
  document.getElementById('detailModal').classList.add('show');
}

// === Modal: Edit ===
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

  document.getElementById('detailBody').innerHTML = html;
  document.getElementById('detailFooter').innerHTML = UI.btn.modalFooter('儲存', "alert('儲存成功（Demo）');closeModal()");
  document.getElementById('detailModal').classList.add('show');
}

function closeModal() { document.getElementById('detailModal').classList.remove('show'); }

// === Init ===
initProviderFilter();
treeData.forEach(p => { expandedProvs[p.id] = true; });
render();
