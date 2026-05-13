// === 樹狀資料（來源：Nova 測試後台實際資料）===
// 結構：供應商 → 支付方式 → 付款通道 → 儲值金額表（第四層）
// 一個金額表可被多個通道共用，但一個通道只對應一個金額表
const billingPlans = {
  'bp-mc-point': {id:'bp-mc-point',name:'點數卡金額表',status:'on',amounts:[{amount:150,base:150,rate:0,bonus:0,total:150},{amount:300,base:300,rate:3,bonus:9,total:309},{amount:500,base:500,rate:5,bonus:25,total:525},{amount:1000,base:1000,rate:8,bonus:80,total:1080}]},
  'bp-mc-tel': {id:'bp-mc-tel',name:'電信帳單金額表',status:'on',amounts:[{amount:50,base:50,rate:0,bonus:0,total:50},{amount:100,base:100,rate:3,bonus:3,total:103},{amount:300,base:300,rate:5,bonus:15,total:315}]},
  'bp-mc-cc': {id:'bp-mc-cc',name:'信用卡金額表',status:'on',amounts:[{amount:300,base:300,rate:0,bonus:0,total:300},{amount:500,base:500,rate:3,bonus:15,total:515},{amount:1000,base:1000,rate:5,bonus:50,total:1050}]},
  'bp-mc-bank': {id:'bp-mc-bank',name:'銀行轉帳金額表',status:'on',amounts:[{amount:500,base:500,rate:3,bonus:15,total:515},{amount:1000,base:1000,rate:5,bonus:50,total:1050},{amount:2000,base:2000,rate:8,bonus:160,total:2160}]},
  'bp-mc-mobile': {id:'bp-mc-mobile',name:'行動支付金額表',status:'on',amounts:[{amount:100,base:100,rate:0,bonus:0,total:100},{amount:500,base:500,rate:5,bonus:25,total:525}]},
  'bp-mc-online': {id:'bp-mc-online',name:'線上轉點金額表',status:'on',amounts:[{amount:100,base:100,rate:0,bonus:0,total:100},{amount:300,base:300,rate:3,bonus:9,total:309}]},
  'bp-mc-free': {id:'bp-mc-free',name:'免費抵扣金額表',status:'on',amounts:[{amount:0,base:100,rate:0,bonus:0,total:100}]},
  'bp-mc-guild': {id:'bp-mc-guild',name:'公會大禮包金額表',status:'on',amounts:[{amount:1000,base:1000,rate:10,bonus:100,total:1100}]},
  'bp-ga-pt': {id:'bp-ga-pt',name:'Gash點數卡金額表',status:'on',amounts:[{amount:150,base:150,rate:0,bonus:0,total:150},{amount:300,base:300,rate:3,bonus:9,total:309},{amount:500,base:500,rate:5,bonus:25,total:525}]},
  'bp-ga-wl': {id:'bp-ga-wl',name:'錢包扣點金額表',status:'on',amounts:[{amount:50,base:5000,rate:3,bonus:150,total:5150},{amount:100,base:10000,rate:5,bonus:500,total:10500}]},
  'bp-ga-cvs': {id:'bp-ga-cvs',name:'超商儲值金額表',status:'on',amounts:[{amount:100,base:100,rate:0,bonus:0,total:100},{amount:300,base:300,rate:3,bonus:9,total:309},{amount:500,base:500,rate:5,bonus:25,total:525}]},
  'bp-ec-cc': {id:'bp-ec-cc',name:'0918信用卡金額表',status:'on',amounts:[{amount:300,base:300,rate:0,bonus:0,total:300},{amount:1000,base:1000,rate:5,bonus:50,total:1050}]},
  'bp-rd': {id:'bp-rd',name:'RD測試金額表',status:'off',amounts:[{amount:10,base:10,rate:0,bonus:0,total:10},{amount:50,base:50,rate:3,bonus:1,total:51}]}
};

const treeData = [
  {
    id:'mycard', name:'MyCard', code:'MYCARD', status:'on',
    methods: [
      { id:'mc-point', name:'點數卡', status:'on',
        channels: [{id:'ch-point',name:'序號儲值',code:'MYCARD_SEQ',status:'on',billingId:'bp-mc-point'}]
      },
      { id:'mc-tel', name:'電信帳單', status:'on',
        channels: [{id:'ch-tel',name:'手機小額付款',code:'HE0004',status:'off',billingId:'bp-mc-tel'}]
      },
      { id:'mc-credit', name:'信用卡', status:'on',
        channels: [{id:'ch-cc',name:'信用卡',code:'MYCARD_CC',status:'on',billingId:'bp-mc-cc'}]
      },
      { id:'mc-bank', name:'銀行轉帳', status:'on',
        channels: [{id:'ch-bank',name:'銀行轉帳',code:'FA038',status:'on',billingId:'bp-mc-bank'}]
      },
      { id:'mc-mobile', name:'行動支付', status:'on',
        channels: [{id:'ch-linepay2',name:'LINE Pay全支付',code:'MYCARD_LP',status:'on',billingId:'bp-mc-mobile'}]
      },
      { id:'mc-online', name:'線上轉點', status:'on',
        channels: [
          {id:'ch-cc3d',name:'信用卡3D',code:'CHANNEL_1E8B07D7',status:'off',billingId:'bp-mc-online'},
          {id:'ch-costpoint',name:'線上轉點',code:'COSTPOINT',status:'on',billingId:'bp-mc-online'}
        ]
      },
      { id:'mc-free', name:'免費抵扣', status:'on',
        channels: [{id:'ch-free',name:'免費扣抵',code:'HE0033',status:'off',billingId:'bp-mc-free'}]
      },
      { id:'mc-guild', name:'公會會長大禮包', status:'on',
        channels: [{id:'ch-guild',name:'公會會長大禮包',code:'FA200000002',status:'on',billingId:'bp-mc-guild'}]
      }
    ]
  },
  {
    id:'gash', name:'Gash', code:'COPGAM', status:'on',
    methods: [
      { id:'ga-point', name:'點數卡', status:'on',
        channels: [{id:'ch-gash-pt',name:'點數卡',code:'COPGAM05',status:'on',billingId:'bp-ga-pt'}]
      },
      { id:'ga-wallet', name:'會員扣點', status:'on',
        channels: [{id:'ch-gash-wl',name:'錢包扣點',code:'COPGAM09',status:'on',billingId:'bp-ga-wl'}]
      },
      { id:'ga-cvs', name:'超商儲值', status:'on',
        channels: [{id:'ch-gash-cvs',name:'7-11即時儲',code:'GASH_711',status:'on',billingId:'bp-ga-cvs'}]
      }
    ]
  },
  {
    id:'ecpay0918', name:'0918綠界', code:'0918EC', status:'off',
    methods: [
      { id:'ec-mobile', name:'行動支付', status:'off',
        channels: [{id:'ch-ec-lp',name:'0918 linepay',code:'CHANNEL_83DE0D1A',status:'off',billingId:null},{id:'ch-ec-all',name:'0918全支付',code:'CHANNEL_81C410ED',status:'off',billingId:null}]
      },
      { id:'ec-bank', name:'銀行轉帳', status:'off',
        channels: [{id:'ch-ec-bank',name:'0918銀行轉帳',code:'CHANNEL_9B4F3F8A',status:'off',billingId:null}]
      },
      { id:'ec-cc', name:'信用卡', status:'on',
        channels: [{id:'ch-ec-cc',name:'0918信用卡',code:'0918_CC',status:'on',billingId:'bp-ec-cc'}]
      }
    ]
  },
  {
    id:'startest', name:'星運測試商', code:'AB00888', status:'on',
    methods: [
      { id:'st-mobile', name:'行動支付', status:'on',
        channels: [{id:'ch-st-lp',name:'LINE Pay',code:'STAR_LP',status:'on',billingId:null}]
      }
    ]
  },
  {
    id:'rdtest', name:'RD 測試供應商', code:'AC9625BC', status:'off',
    methods: [
      { id:'rd-test', name:'RD 測試支付方式', status:'off',
        channels: [
          {id:'ch-rd1',name:'RD 測試003',code:'AC9625BC',status:'off',billingId:'bp-rd'},
          {id:'ch-rd2',name:'test111',code:'test456',status:'off',billingId:'bp-rd'}
        ]
      }
    ]
  }
];

// === SVG Icons ===
const ICON = {
  edit: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  add: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
  billing: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>'
};

// === Render Mind Map (4 layers) ===
function renderMindMap() {
  const container = document.getElementById('mindmap');
  let html = '';
  // Track rendered billing plans to handle shared ones
  const renderedBillings = {};

  treeData.forEach(function(prov) {
    const provTag = prov.status === 'on' ? '<span class="mm-tag mm-tag-on">啟用</span>' : '<span class="mm-tag mm-tag-off">停用</span>';

    html += '<div class="mm-provider-group" data-prov="' + prov.id + '">';
    // L1 供應商
    html += '<div class="mm-row">';
    html += '<div class="mm-node mm-l1" data-id="' + prov.id + '" onclick="onNodeClick(\'provider\',\'' + prov.id + '\')">';
    html += '<span>' + prov.name + '</span><span class="mm-code">' + prov.code + '</span>' + provTag;
    html += '</div>';

    // L2 支付方式
    html += '<div class="mm-children">';
    prov.methods.forEach(function(method) {
      const mTag = method.status === 'on' ? '<span class="mm-tag mm-tag-on">啟用</span>' : '<span class="mm-tag mm-tag-off">停用</span>';

      html += '<div class="mm-method-group">';
      html += '<div class="mm-node mm-l2" data-id="' + method.id + '" onclick="onNodeClick(\'method\',\'' + method.id + '\')">';
      html += '<span>' + method.name + '</span>' + mTag;
      html += '</div>';

      // L3 付款通道
      html += '<div class="mm-children">';
      method.channels.forEach(function(ch) {
        const cTag = ch.status === 'on' ? '<span class="mm-tag mm-tag-on">啟用</span>' : '<span class="mm-tag mm-tag-off">停用</span>';

        html += '<div class="mm-channel-group">';
        html += '<div class="mm-node mm-l3" data-id="' + ch.id + '">';
        html += '<span>' + ch.name + '</span><span class="mm-code">' + ch.code + '</span>' + cTag;
        html += '</div>';

        // L4 儲值金額表
        html += '<div class="mm-children">';
        if (ch.billingId && billingPlans[ch.billingId]) {
          const bp = billingPlans[ch.billingId];
          const bTag = bp.status === 'on' ? '<span class="mm-tag mm-tag-on">啟用</span>' : '<span class="mm-tag mm-tag-off">停用</span>';
          const shared = isSharedBilling(ch.billingId);
          const sharedLabel = shared ? '<span class="mm-tag mm-tag-shared">共用</span>' : '';
          html += '<div class="mm-node mm-l4" data-id="' + bp.id + '" data-billing="' + bp.id + '" onclick="openBillingDetail(\'' + bp.id + '\')">';
          html += ICON.billing + '<span>' + bp.name + '</span>' + bTag + '<span class="mm-amounts">' + bp.amounts.length + '筆</span>' + sharedLabel;
          html += '<span class="mm-edit-btn" onclick="event.stopPropagation();openBillingDetail(\'' + bp.id + '\')">' + ICON.edit + ' 編輯</span>';
          html += '</div>';
        } else {
          html += '<div class="mm-node mm-l4 empty mm-add" onclick="alert(\'新增儲值金額表: ' + ch.name + '\')">';
          html += ICON.add + '<span>新增金額表</span>';
          html += '</div>';
        }
        html += '</div>'; // L4 children
        html += '</div>'; // channel-group
      });
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

// === Draw SVG connecting lines ===
function drawLines() {
  const svg = document.getElementById('mmLines');
  const wrap = document.querySelector('.mindmap-wrap');
  const wrapRect = wrap.getBoundingClientRect();

  const mm = document.getElementById('mindmap');
  svg.style.width = mm.scrollWidth + 'px';
  svg.style.height = mm.scrollHeight + 'px';
  svg.setAttribute('viewBox', '0 0 ' + mm.scrollWidth + ' ' + mm.scrollHeight);

  let paths = '';

  document.querySelectorAll('.mm-provider-group').forEach(function(provGroup) {
    const provNode = provGroup.querySelector('.mm-l1');
    const methodNodes = provGroup.querySelectorAll('.mm-method-group > .mm-l2');

    methodNodes.forEach(function(mNode) {
      paths += connectNodes(provNode, mNode, wrapRect);

      const methodGroup = mNode.parentElement;
      const channelGroups = methodGroup.querySelectorAll(':scope > .mm-children > .mm-channel-group');
      channelGroups.forEach(function(chGroup) {
        const chNode = chGroup.querySelector('.mm-l3');
        paths += connectNodes(mNode, chNode, wrapRect);
        // L4 billing node
        const l4Node = chGroup.querySelector('.mm-children > .mm-node');
        if (l4Node) {
          paths += connectNodes(chNode, l4Node, wrapRect);
        }
      });
    });
  });

  svg.innerHTML = paths;
}

function connectNodes(from, to, wrapRect) {
  const fRect = from.getBoundingClientRect();
  const tRect = to.getBoundingClientRect();

  const x1 = fRect.right - wrapRect.left;
  const y1 = fRect.top + fRect.height / 2 - wrapRect.top;
  const x2 = tRect.left - wrapRect.left;
  const y2 = tRect.top + tRect.height / 2 - wrapRect.top;

  const midX = (x1 + x2) / 2;
  return '<path d="M' + x1 + ',' + y1 + ' C' + midX + ',' + y1 + ' ' + midX + ',' + y2 + ' ' + x2 + ',' + y2 + '"/>';
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

// === Billing Detail Modal ===
function openBillingDetail(billingId) {
  const bp = billingPlans[billingId];
  if (!bp) return;

  document.getElementById('detailTitle').textContent = bp.name;
  const rows = bp.amounts.map(function(a, i) {
    return '<tr><td>' + (i+1) + '</td><td>$' + a.amount.toLocaleString() + '</td><td>' + a.base.toLocaleString() + '</td><td>' + a.rate + '%</td><td>' + a.bonus.toLocaleString() + '</td><td style="font-weight:600">' + a.total.toLocaleString() + '</td></tr>';
  }).join('');

  document.getElementById('detailTable').innerHTML = '<table class="data-table"><thead><tr><th>#</th><th>金額</th><th>基本點數</th><th>贈比</th><th>贈點</th><th>實際點數</th></tr></thead><tbody>' + rows + '</tbody></table>';
  document.getElementById('detailModal').classList.add('show');
}

function closeDetailModal() {
  document.getElementById('detailModal').classList.remove('show');
}

// === Init ===
renderMindMap();
window.addEventListener('resize', drawLines);
