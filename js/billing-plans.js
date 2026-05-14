// === 樹狀資料（來源：Nova 測試後台實際資料）===
// 結構：供應商 → 支付方式 → 儲值金額表（第三層）→ 付款通道（第四層）
// 一個金額表可被多個通道共用，一個通道只對應一個金額表
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

// 新結構：供應商 → 支付方式 → 儲值金額表 → 付款通道
const treeData = [
  {
    id:'mycard', name:'MyCard', code:'MYCARD', status:'on',
    methods: [
      { id:'mc-point', name:'點數卡', status:'on',
        billingId:'bp-mc-point',
        channels: [{id:'ch-point',name:'序號儲值',code:'MYCARD_SEQ',status:'on'}]
      },
      { id:'mc-tel', name:'電信帳單', status:'on',
        billingId:'bp-mc-tel',
        channels: [{id:'ch-tel',name:'手機小額付款',code:'HE0004',status:'off'},{id:'ch-tel2',name:'遠傳電信',code:'HE0004B',status:'off'}]
      },
      { id:'mc-credit', name:'信用卡', status:'on',
        billingId:'bp-mc-cc',
        channels: [{id:'ch-cc',name:'信用卡',code:'MYCARD_CC',status:'on'}]
      },
      { id:'mc-bank', name:'銀行轉帳', status:'on',
        billingId:'bp-mc-bank',
        channels: [{id:'ch-bank',name:'銀行轉帳',code:'FA038',status:'on'}]
      },
      { id:'mc-mobile', name:'行動支付', status:'on',
        billingId:'bp-mc-mobile',
        channels: [{id:'ch-linepay2',name:'LINE Pay全支付',code:'MYCARD_LP',status:'on'}]
      },
      { id:'mc-online', name:'線上轉點', status:'on',
        billingId:'bp-mc-online',
        channels: [{id:'ch-cc3d',name:'信用卡3D',code:'CHANNEL_1E8B07D7',status:'off'},{id:'ch-costpoint',name:'線上轉點',code:'COSTPOINT',status:'on'}]
      },
      { id:'mc-free', name:'免費抵扣', status:'on',
        billingId:'bp-mc-free',
        channels: [{id:'ch-free',name:'免費扣抵',code:'HE0033',status:'off'}]
      },
      { id:'mc-guild', name:'公會會長大禮包', status:'on',
        billingId:'bp-mc-guild',
        channels: [{id:'ch-guild',name:'公會會長大禮包',code:'FA200000002',status:'on'}]
      }
    ]
  },
  {
    id:'gash', name:'Gash', code:'COPGAM', status:'on',
    methods: [
      { id:'ga-point', name:'點數卡', status:'on',
        billingId:'bp-ga-pt',
        channels: [{id:'ch-gash-pt',name:'點數卡',code:'COPGAM05',status:'on'}]
      },
      { id:'ga-wallet', name:'會員扣點', status:'on',
        billingId:'bp-ga-wl',
        channels: [{id:'ch-gash-wl',name:'錢包扣點',code:'COPGAM09',status:'on'}]
      },
      { id:'ga-cvs', name:'超商儲值', status:'on',
        billingId:'bp-ga-cvs',
        channels: [{id:'ch-gash-cvs',name:'7-11即時儲',code:'GASH_711',status:'on'}]
      }
    ]
  },
  {
    id:'ecpay0918', name:'0918綠界', code:'0918EC', status:'off',
    methods: [
      { id:'ec-mobile', name:'行動支付', status:'off',
        billingId:null,
        channels: [{id:'ch-ec-lp',name:'0918 linepay',code:'CHANNEL_83DE0D1A',status:'off'},{id:'ch-ec-all',name:'0918全支付',code:'CHANNEL_81C410ED',status:'off'}]
      },
      { id:'ec-bank', name:'銀行轉帳', status:'off',
        billingId:null,
        channels: [{id:'ch-ec-bank',name:'0918銀行轉帳',code:'CHANNEL_9B4F3F8A',status:'off'}]
      },
      { id:'ec-cc', name:'信用卡', status:'on',
        billingId:'bp-ec-cc',
        channels: [{id:'ch-ec-cc',name:'0918信用卡',code:'0918_CC',status:'on'}]
      }
    ]
  },
  {
    id:'startest', name:'星運測試商', code:'AB00888', status:'on',
    methods: [
      { id:'st-mobile', name:'行動支付', status:'on',
        billingId:null,
        channels: [{id:'ch-st-lp',name:'LINE Pay',code:'STAR_LP',status:'on'}]
      }
    ]
  },
  {
    id:'rdtest', name:'RD 測試供應商', code:'AC9625BC', status:'off',
    methods: [
      { id:'rd-test', name:'RD 測試支付方式', status:'off',
        billingId:'bp-rd',
        channels: [{id:'ch-rd1',name:'RD 測試003',code:'AC9625BC',status:'off'},{id:'ch-rd2',name:'test111',code:'test456',status:'off'}]
      }
    ]
  }
];

// === SVG Icons ===
const ICON = {
  edit: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  view: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  add: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
  billing: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>'
};

function makeToggle(on, id) {
  const cls = on ? 'mm-toggle on' : 'mm-toggle';
  return '<label class="' + cls + '" data-id="' + id + '" onclick="event.stopPropagation();toggleBillingStatus(\'' + id + '\')"><span class="mm-toggle-track"><span class="mm-toggle-thumb"></span></span></label>';
}

// === Toggle 確認彈窗 ===
function toggleBillingStatus(bpId) {
  const bp = billingPlans[bpId];
  if (!bp) return;
  const newStatus = bp.status === 'on' ? 'off' : 'on';
  const msg = newStatus === 'on' ? '確定要啟用該張儲值金額表嗎？' : '確定要停用該張儲值金額表嗎？';
  if (confirm(msg)) {
    bp.status = newStatus;
    renderMindMap();
  }
}

// === 篩選功能 ===
var currentFilter = 'all';
var currentProviderFilter = 'all';

function applyFilter() {
  currentProviderFilter = document.getElementById('providerFilter').value;
  currentFilter = document.getElementById('billingFilter').value;
  panX = 0; panY = 0; currentZoom = 100;
  document.getElementById('zoomRange').value = 100;
  applyTransform();
  renderMindMap();
}
function resetFilter() {
  document.getElementById('providerFilter').value = 'all';
  document.getElementById('billingFilter').value = 'all';
  currentProviderFilter = 'all';
  currentFilter = 'all';
  panX = 0; panY = 0; currentZoom = 100;
  document.getElementById('zoomRange').value = 100;
  applyTransform();
  renderMindMap();
}
function filterBillingStatus(status) {
  currentFilter = status;
  renderMindMap();
}
// 初始化供應商下拉
function initProviderFilter() {
  var sel = document.getElementById('providerFilter');
  if (!sel) return;
  treeData.forEach(function(prov) {
    var opt = document.createElement('option');
    opt.value = prov.id;
    opt.textContent = prov.name;
    sel.appendChild(opt);
  });
}

// === Render Mind Map (4 layers: 供應商→支付方式→儲值金額表→付款通道) ===
function renderMindMap() {
  const container = document.getElementById('mindmap');
  let html = '';

  treeData.forEach(function(prov) {
    // 供應商篩選：隱藏整條分支
    if (currentProviderFilter !== 'all' && prov.id !== currentProviderFilter) return;
    // 狀態篩選：檢查該供應商下是否有符合狀態的儲值金額表
    if (currentFilter !== 'all') {
      var hasMatch = prov.methods.some(function(m) {
        return m.billingId && billingPlans[m.billingId] && billingPlans[m.billingId].status === currentFilter;
      });
      if (!hasMatch) return;
    }
    const provOffTag = prov.status !== 'on' ? '<span class="mm-tag mm-tag-off">停用</span>' : '';
    html += '<div class="mm-provider-group" data-prov="' + prov.id + '">';
    html += '<div class="mm-row">';
    // L1 供應商
    html += '<div class="mm-node mm-l1" data-id="' + prov.id + '">';
    html += '<span class="mm-name">' + prov.name + '</span><span class="mm-code">' + prov.code + '</span>' + provOffTag;
    html += '</div>';

    // L2 支付方式
    html += '<div class="mm-children">';
    prov.methods.forEach(function(method) {
      // 狀態篩選：隱藏不符合的整條支付方式分支
      if (currentFilter !== 'all') {
        var bp = method.billingId && billingPlans[method.billingId];
        if (!bp || bp.status !== currentFilter) return;
      }
      const mOffTag = method.status !== 'on' ? '<span class="mm-tag mm-tag-off">停用</span>' : '';
      html += '<div class="mm-method-group">';
      html += '<div class="mm-node mm-l2" data-id="' + method.id + '">';
      html += '<span class="mm-name">' + method.name + '</span>' + mOffTag;
      html += '</div>';

      // L3 儲值金額表
      html += '<div class="mm-children">';
      if (method.billingId && billingPlans[method.billingId]) {
        const bp = billingPlans[method.billingId];
        html += '<div class="mm-billing-group">';
        html += '<div class="mm-node mm-l3" data-id="' + bp.id + '" data-billing="' + bp.id + '" onclick="openBillingDetail(\'' + bp.id + '\')">';
        html += makeToggle(bp.status === 'on', bp.id);
        html += '<span class="mm-toggle-text ' + (bp.status === 'on' ? 'on' : 'off') + '">' + (bp.status === 'on' ? '啟用' : '停用') + '</span>';
        html += '<span class="mm-amounts">' + bp.amounts.length + '筆</span>';
        html += '<span class="mm-actions">';
        html += '<span class="mm-view-btn" onclick="event.stopPropagation();openBillingDetail(\'' + bp.id + '\')" title="檢視">' + ICON.view + '</span>';
        html += '<span class="mm-edit-btn" onclick="event.stopPropagation();openBillingEdit(\'' + bp.id + '\')" title="編輯">' + ICON.edit + '</span>';
        html += '</span>';
        html += '</div>';

        // L4 付款通道
        html += '<div class="mm-children">';
        method.channels.forEach(function(ch) {
          const cOffTag = ch.status !== 'on' ? '<span class="mm-tag mm-tag-off">停用</span>' : '';
          const canUnlink = method.channels.length > 1;
          html += '<div class="mm-l4-row">';
          if (canUnlink) {
            html += '<div class="mm-link-zone"><span class="mm-unlink" onclick="event.stopPropagation();unlinkChannel(\'' + method.id + '\',\'' + ch.id + '\',\'' + bp.id + '\')" title="解開此通道">×</span></div>';
          }
          html += '<div class="mm-node mm-l4" data-id="' + ch.id + '" data-method="' + method.id + '" data-billing="' + bp.id + '">';
          html += '<span class="mm-name">' + ch.name + '</span><span class="mm-code">' + ch.code + '</span>' + cOffTag;
          html += '</div>';
          html += '</div>';
        });
        html += '</div>'; // L4 children
        html += '</div>'; // billing-group
      } else {
        // 無金額表
        const prefill = method._prefill ? JSON.stringify(method._prefill).replace(/'/g,'&#39;').replace(/"/g,'&quot;') : '';
        html += '<div class="mm-billing-group">';
        html += '<div class="mm-node mm-l3 empty mm-add" onclick="openNewBilling(\'' + method.id + '\',\'' + prefill + '\')">';
        html += ICON.add + '<span class="mm-name">新增儲值金額表</span>';
        html += '</div>';
        // L4 付款通道（即使沒金額表也顯示）
        html += '<div class="mm-children">';
        method.channels.forEach(function(ch) {
          const cOffTag = ch.status !== 'on' ? '<span class="mm-tag mm-tag-off">停用</span>' : '';
          html += '<div class="mm-node mm-l4" data-id="' + ch.id + '">';
          html += '<span class="mm-name">' + ch.name + '</span><span class="mm-code">' + ch.code + '</span>' + cOffTag;
          html += '</div>';
        });
        html += '</div>';
        html += '</div>';
      }
      html += '</div>'; // L3 children
      html += '</div>'; // method-group
    });
    html += '</div>'; // L2 children
    html += '</div>'; // mm-row
    html += '</div>'; // provider-group
  });

  container.innerHTML = html;
  requestAnimationFrame(drawLines);
}

// 判斷金額表是否被多個通道共用
function isSharedBilling(billingId) {
  let count = 0;
  treeData.forEach(function(p) {
    p.methods.forEach(function(m) {
      m.channels.forEach(function(ch) {
        if (ch.billingId === billingId) count++;
      });
    });
  });
  return count > 1;
}

// 解開通道：從金額表移出，變成獨立通道連到「新增儲值金額表」
function unlinkChannel(methodId, channelId, billingId) {
  treeData.forEach(function(p) {
    p.methods.forEach(function(m) {
      if (m.id === methodId && m.channels.length > 1) {
        const chIdx = m.channels.findIndex(function(c) { return c.id === channelId; });
        if (chIdx === -1) return;
        const ch = m.channels.splice(chIdx, 1)[0];
        const newMethod = {
          id: m.id + '-unlinked-' + ch.id,
          name: m.name,
          status: m.status,
          billingId: null,
          channels: [ch],
          _prefill: { billingId: billingId, channel: ch }
        };
        const mIdx = p.methods.indexOf(m);
        p.methods.splice(mIdx + 1, 0, newMethod);
      }
    });
  });
  renderMindMap();
  panX = 0; panY = 0; currentZoom = 100;
  document.getElementById('zoomRange').value = 100;
  applyTransform();
}

// 新增儲值金額表（帶入解開通道的原設定）
function openNewBilling(methodId, prefillStr) {
  const prefill = prefillStr ? JSON.parse(prefillStr.replace(/&quot;/g,'"').replace(/&#39;/g,"'")) : null;
  // 找到 method 資訊
  let provName='', methodName='';
  treeData.forEach(function(p) {
    p.methods.forEach(function(m) {
      if (m.id === methodId) { provName=p.name; methodName=m.name; }
    });
  });

  document.getElementById('detailTitle').textContent = '新增儲值金額表';
  let html = '<div class="bp-edit-form">';
  html += '<div class="bp-form-row"><div class="bp-form-field"><label>供應商<span class="req">*</span></label><select class="bp-select"><option>' + provName + '</option></select></div>';
  html += '<div class="bp-form-field"><label>支付方式<span class="req">*</span></label><select class="bp-select"><option>' + methodName + '</option></select></div></div>';
  html += '<div class="bp-form-row"><div class="bp-form-field full"><label>付款通道<span class="req">*</span></label><select class="bp-select"><option>' + (prefill ? prefill.channel.name : '請選擇付款通道') + '</option></select></div></div>';
  html += '</div>';

  // 金額表格
  html += '<div class="bp-info-card"><div class="bp-card-header"><h5>儲值金額表 <span style="font-weight:400;color:#6B7280;font-size:12px">總共 0 筆資料</span></h5>';
  html += '<button class="btn-sort-header" onclick="alert(\'編輯排序（Demo）\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h12M3 18h6"/></svg> 編輯排序</button></div>';
  html += '<table class="data-table"><thead><tr><th>順序</th><th>金額（台幣）</th><th>基本點數</th><th>贈比（%）</th><th>贈點</th><th>實際點數</th><th>操作</th></tr></thead><tbody>';
  if (prefill && billingPlans[prefill.billingId]) {
    const bp = billingPlans[prefill.billingId];
    bp.amounts.forEach(function(a, i) {
      html += '<tr><td>' + (i+1) + '</td><td><input type="number" value="' + a.amount + '" class="bp-input sm"></td><td><input type="number" value="' + a.base + '" class="bp-input sm"></td><td><input type="number" value="' + a.rate + '" class="bp-input sm"></td><td>' + a.bonus.toLocaleString() + '</td><td style="font-weight:600">' + a.total.toLocaleString() + '</td><td><button class="btn-del-text">刪除</button></td></tr>';
    });
  }
  html += '</tbody></table>';
  html += '<div class="bp-add-row" onclick="alert(\'新增金額列（Demo）\')">+ 新增</div>';
  html += '</div>';

  // 狀態 toggle
  html += '<div class="bp-status-row"><span class="bp-label">狀態</span>' + makeToggle(true, 'new-bp') + '<span class="bp-status-text on">啟用</span></div>';

  document.getElementById('detailTable').innerHTML = html;
  document.getElementById('detailFooter').innerHTML = '<button class="btn-close-modal" onclick="closeDetailModal()">取消</button><button class="btn-edit-modal" onclick="alert(\'新增成功（Demo）\');closeDetailModal()"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg> 確認新增</button>';
  document.getElementById('detailModal').classList.add('show');
}

// === Draw SVG connecting lines ===
function drawLines() {
  const svg = document.getElementById('mmLines');
  const wrap = document.querySelector('.mindmap-wrap');
  const wrapRect = wrap.getBoundingClientRect();

  const mm = document.getElementById('mindmap');
  const scale = currentZoom / 100;
  const w = mm.scrollWidth;
  const h = mm.scrollHeight;
  svg.style.width = w + 'px';
  svg.style.height = h + 'px';
  svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);

  let paths = '';

  document.querySelectorAll('.mm-provider-group').forEach(function(provGroup) {
    const provNode = provGroup.querySelector('.mm-l1');
    const methodGroups = provGroup.querySelectorAll('.mm-method-group');

    methodGroups.forEach(function(mGroup) {
      const mNode = mGroup.querySelector('.mm-l2');
      paths += connectNodes(provNode, mNode, wrapRect);

      // L3 billing node
      const billingGroup = mGroup.querySelector('.mm-billing-group');
      if (billingGroup) {
        const bNode = billingGroup.querySelector('.mm-l3');
        if (bNode) {
          paths += connectNodes(mNode, bNode, wrapRect);
          // L4 channel nodes
          const l4Nodes = billingGroup.querySelectorAll(':scope > .mm-children > .mm-l4-row > .mm-l4, :scope > .mm-children > .mm-l4');
          l4Nodes.forEach(function(chNode) {
            paths += connectNodes(bNode, chNode, wrapRect);
          });
        }
      }
    });
  });

  svg.innerHTML = paths;
}

function connectNodes(from, to, wrapRect, dashed) {
  const fRect = from.getBoundingClientRect();
  const tRect = to.getBoundingClientRect();
  const scale = currentZoom / 100;

  const x1 = (fRect.right - wrapRect.left) / scale;
  const y1 = (fRect.top + fRect.height / 2 - wrapRect.top) / scale;
  const x2 = (tRect.left - wrapRect.left) / scale;
  const y2 = (tRect.top + tRect.height / 2 - wrapRect.top) / scale;

  const midX = (x1 + x2) / 2;
  const style = dashed ? ' stroke-dasharray="4 3" stroke="#6366F1"' : '';
  return '<path d="M' + x1 + ',' + y1 + ' C' + midX + ',' + y1 + ' ' + midX + ',' + y2 + ' ' + x2 + ',' + y2 + '"' + style + '/>';
}

// === Node click ===
function onNodeClick(type, id) {
  if (type === 'provider') {
    const prov = treeData.find(function(p){ return p.id === id; });
    alert('編輯供應商: ' + prov.name + ' (' + prov.code + ')');
  } else if (type === 'method') {
    let method = null;
    treeData.forEach(function(p){ p.methods.forEach(function(m){ if(m.id===id) method=m; }); });
    if (method) alert('編輯支付方式: ' + method.name);
  }
}

// === Billing Detail Modal (檢視模式) ===
function openBillingDetail(billingId) {
  const bp = billingPlans[billingId];
  if (!bp) return;
  // 找到對應的供應商/支付方式/通道
  let provName='', methodName='', chNames=[];
  treeData.forEach(function(p) {
    p.methods.forEach(function(m) {
      if (m.billingId === billingId) {
        provName=p.name; methodName=m.name;
        m.channels.forEach(function(ch){ chNames.push(ch.name); });
      }
    });
  });

  const statusHtml = bp.status === 'on'
    ? '<span class="mm-tag mm-tag-on" style="font-size:12px;padding:4px 10px;position:static"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> 啟用</span>'
    : '<span class="mm-tag mm-tag-off" style="font-size:12px;padding:4px 10px;position:static">停用</span>';

  let info = '<div class="bp-info-card"><h5>基本資訊</h5>';
  info += '<div class="bp-info-row"><span class="bp-label">金額表名稱</span><span>' + bp.name + '</span></div>';
  info += '<div class="bp-info-row"><span class="bp-label">供應商</span><span>' + provName + '</span></div>';
  info += '<div class="bp-info-row"><span class="bp-label">支付方式</span><span>' + methodName + '</span></div>';
  info += '<div class="bp-info-row"><span class="bp-label">付款通道</span><span>' + chNames.join('、') + '</span></div>';
  info += '<div class="bp-info-row"><span class="bp-label">狀態</span>' + statusHtml + '</div>';
  info += '</div>';

  document.getElementById('detailTitle').textContent = '儲值金額表詳細資訊';
  const rows = bp.amounts.map(function(a, i) {
    return '<tr><td>' + (i+1) + '</td><td>' + a.amount.toLocaleString() + '</td><td>' + a.base.toLocaleString() + '</td><td>' + a.rate + '%</td><td>' + a.bonus.toLocaleString() + '</td><td style="font-weight:600">' + a.total.toLocaleString() + '</td></tr>';
  }).join('');

  document.getElementById('detailTable').innerHTML = info + '<div class="bp-info-card"><h5>儲值金額表 <span style="font-weight:400;color:#6B7280;font-size:12px">總共 ' + bp.amounts.length + ' 筆資料</span></h5><table class="data-table"><thead><tr><th>順序</th><th>金額（台幣）</th><th>基本點數</th><th>贈比（%）</th><th>贈點</th><th>實際點數</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
  // 底部按鈕：關閉 + 編輯
  document.getElementById('detailFooter').innerHTML = '<button class="btn-close-modal" onclick="closeDetailModal()">關閉</button><button class="btn-edit-modal" onclick="closeDetailModal();openBillingEdit(\'' + billingId + '\')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> 編輯</button>';
  document.getElementById('detailModal').classList.add('show');
}

// === Billing Edit Modal (編輯模式 - 對齊系統) ===
function openBillingEdit(billingId) {
  const bp = billingPlans[billingId];
  if (!bp) return;
  // 找到對應的供應商/支付方式/通道
  let provName='', methodName='', chNames=[];
  treeData.forEach(function(p) {
    p.methods.forEach(function(m) {
      if (m.billingId === billingId) {
        provName=p.name; methodName=m.name;
        m.channels.forEach(function(ch){ chNames.push(ch.name); });
      }
    });
  });

  document.getElementById('detailTitle').textContent = '編輯儲值金額表';

  let html = '<div class="bp-edit-form">';
  html += '<div class="bp-form-row"><div class="bp-form-field"><label>供應商<span class="req">*</span></label><select class="bp-select"><option>' + provName + '</option></select></div>';
  html += '<div class="bp-form-field"><label>支付方式<span class="req">*</span></label><select class="bp-select"><option>' + methodName + '</option></select></div></div>';
  html += '<div class="bp-form-row"><div class="bp-form-field full"><label>付款通道<span class="req">*</span></label><select class="bp-select"><option>' + chNames.join('、') + '</option></select></div></div>';
  html += '</div>';

  // 金額表格
  html += '<div class="bp-info-card"><div class="bp-card-header"><h5>儲值金額表 <span style="font-weight:400;color:#6B7280;font-size:12px">總共 ' + bp.amounts.length + ' 筆資料</span></h5>';
  html += '<button class="btn-sort-header" onclick="alert(\'編輯排序（Demo）\')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h12M3 18h6"/></svg> 編輯排序</button></div>';
  html += '<table class="data-table"><thead><tr><th>順序</th><th>金額（台幣）</th><th>基本點數</th><th>贈比（%）</th><th>贈點</th><th>實際點數</th><th>操作</th></tr></thead><tbody>';
  bp.amounts.forEach(function(a, i) {
    html += '<tr><td>' + (i+1) + '</td><td><input type="number" value="' + a.amount + '" class="bp-input sm"></td><td><input type="number" value="' + a.base + '" class="bp-input sm"></td><td><input type="number" value="' + a.rate + '" class="bp-input sm"></td><td>' + a.bonus.toLocaleString() + '</td><td style="font-weight:600">' + a.total.toLocaleString() + '</td><td><button class="btn-del-text" onclick="alert(\'刪除第' + (i+1) + '筆（Demo）\')">刪除</button></td></tr>';
  });
  html += '</tbody></table>';
  html += '<div class="bp-add-row" onclick="alert(\'新增金額列（Demo）\')">+ 新增</div>';
  html += '</div>';

  // 狀態 toggle（獨立區塊）
  html += '<div class="bp-status-row"><span class="bp-label">狀態</span>' + makeToggle(bp.status === 'on', bp.id) + '<span class="bp-status-text ' + (bp.status === 'on' ? 'on' : '') + '">' + (bp.status === 'on' ? '啟用' : '停用') + '</span></div>';

  document.getElementById('detailTable').innerHTML = html;
  document.getElementById('detailFooter').innerHTML = '<button class="btn-close-modal" onclick="closeDetailModal()">取消</button><button class="btn-edit-modal" onclick="alert(\'儲存成功（Demo）\');closeDetailModal()"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg> 儲存</button>';
  document.getElementById('detailModal').classList.add('show');
}

function closeDetailModal() {
  document.getElementById('detailModal').classList.remove('show');
}

// === Init ===
initProviderFilter();
renderMindMap();
window.addEventListener('resize', drawLines);

// === Zoom & Pan ===
var currentZoom = 100;
var panX = 0, panY = 0;
var isDragging = false, startX = 0, startY = 0;

function setZoom(val) {
  currentZoom = parseInt(val);
  document.getElementById('zoomRange').value = currentZoom;
  applyTransform();
}
function zoomIn() { setZoom(Math.min(150, currentZoom + 10)); }
function zoomOut() { setZoom(Math.max(30, currentZoom - 10)); }
function applyTransform() {
  const mm = document.getElementById('mindmap');
  const svg = document.getElementById('mmLines');
  const scale = currentZoom / 100;
  const t = 'translate(' + panX + 'px,' + panY + 'px) scale(' + scale + ')';
  mm.style.transform = t;
  mm.style.transformOrigin = '0 0';
  svg.style.transform = t;
  svg.style.transformOrigin = '0 0';
}

(function initPan() {
  const wrap = document.getElementById('mindmapWrap');
  wrap.addEventListener('mousedown', function(e) {
    if (e.target.closest('.mm-node, .mm-toggle, .mm-unlink, .mm-edit-btn, .mm-view-btn, .mm-zoom-controls')) return;
    isDragging = true;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
    wrap.classList.add('dragging');
    e.preventDefault();
  });
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    applyTransform();
  });
  document.addEventListener('mouseup', function() {
    isDragging = false;
    wrap.classList.remove('dragging');
  });
  wrap.addEventListener('wheel', function(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -5 : 5;
    const newZoom = Math.max(30, Math.min(150, currentZoom + delta));
    if (newZoom === currentZoom) return;
    // 以鼠標位置為中心縮放
    const wrapRect = wrap.getBoundingClientRect();
    const mouseX = e.clientX - wrapRect.left;
    const mouseY = e.clientY - wrapRect.top;
    const oldScale = currentZoom / 100;
    const newScale = newZoom / 100;
    // 計算新的 pan 使鼠標位置不變
    panX = mouseX - (mouseX - panX) * (newScale / oldScale);
    panY = mouseY - (mouseY - panY) * (newScale / oldScale);
    currentZoom = newZoom;
    document.getElementById('zoomRange').value = currentZoom;
    applyTransform();
  }, {passive: false});
})();
