// === 樹狀資料 ===
const treeData = [
  {
    id:'mycard', name:'MyCard', code:'MYCARD01', status:'on',
    methods: [
      { id:'m1', name:'點數卡', status:'on',
        channels: [{id:'c1',name:'點數卡',code:'MYCARD_CARD',status:'on'}],
        billing: {id:'bp1',status:'on',amounts:[{amount:150,base:150,rate:0,bonus:0,total:150},{amount:300,base:300,rate:3,bonus:9,total:309},{amount:500,base:500,rate:5,bonus:25,total:525},{amount:1000,base:1000,rate:8,bonus:80,total:1080},{amount:2000,base:2000,rate:10,bonus:200,total:2200}]}
      },
      { id:'m2', name:'電信帳單', status:'on',
        channels: [{id:'c2',name:'手機小額付款',code:'MYCARD_TEL',status:'on'}],
        billing: {id:'bp2',status:'on',amounts:[{amount:50,base:50,rate:0,bonus:0,total:50},{amount:100,base:100,rate:3,bonus:3,total:103},{amount:300,base:300,rate:5,bonus:15,total:315}]}
      },
      { id:'m3', name:'線上轉點', status:'on',
        channels: [{id:'c3',name:'信用卡3D',code:'MYCARD_CC3D',status:'on'},{id:'c4',name:'WebATM',code:'MYCARD_WATM',status:'off'}],
        billing: null
      }
    ]
  },
  {
    id:'gash', name:'Gash', code:'GASH001', status:'on',
    methods: [
      { id:'m4', name:'會員扣點', status:'on',
        channels: [{id:'c5',name:'錢包扣點',code:'GASH_WALLET',status:'on'}],
        billing: {id:'bp3',status:'on',amounts:[{amount:50,base:5000,rate:3,bonus:150,total:5150},{amount:100,base:10000,rate:5,bonus:500,total:10500},{amount:300,base:30000,rate:8,bonus:2400,total:32400}]}
      }
    ]
  },
  {
    id:'linepay', name:'LINE Pay', code:'LINEPAY01', status:'on',
    methods: [
      { id:'m5', name:'行動支付', status:'on',
        channels: [{id:'c6',name:'LINE Pay',code:'LINEPAY_STD',status:'on'}],
        billing: {id:'bp4',status:'on',amounts:[{amount:100,base:100,rate:0,bonus:0,total:100},{amount:500,base:500,rate:5,bonus:25,total:525},{amount:1000,base:1000,rate:10,bonus:100,total:1100}]}
      }
    ]
  },
  {
    id:'ecpay', name:'綠界科技', code:'ECPAY01', status:'on',
    methods: [
      { id:'m6', name:'信用卡', status:'on',
        channels: [{id:'c7',name:'信用卡一次付',code:'ECPAY_CC',status:'on'}],
        billing: null
      },
      { id:'m7', name:'ATM轉帳', status:'off',
        channels: [{id:'c8',name:'ATM虛擬帳號',code:'ECPAY_ATM',status:'off'}],
        billing: null
      }
    ]
  },
  {
    id:'startest', name:'星運測試商', code:'AB00888', status:'off',
    methods: [
      { id:'m8', name:'測試支付', status:'off',
        channels: [{id:'c9',name:'測試通道A',code:'TEST_A',status:'off'},{id:'c10',name:'測試通道B',code:'TEST_B',status:'off'}],
        billing: {id:'bp5',status:'off',amounts:[{amount:10,base:10,rate:0,bonus:0,total:10},{amount:50,base:50,rate:3,bonus:1,total:51}]}
      }
    ]
  }
];

// === Render Mind Map ===
function renderMindMap() {
  const container = document.getElementById('mindmap');
  let html = '';

  treeData.forEach(function(prov) {
    const provTag = prov.status === 'on' ? '<span class="mm-tag mm-tag-on">啟用</span>' : '<span class="mm-tag mm-tag-off">停用</span>';

    html += '<div class="mm-provider-group" data-prov="' + prov.id + '">';
    // L1 供應商
    html += '<div class="mm-row">';
    html += '<div class="mm-node mm-l1" data-id="' + prov.id + '" onclick="onNodeClick(\'provider\',\'' + prov.id + '\')">';
    html += '<span>' + prov.name + '</span><span class="mm-code">' + prov.code + '</span>' + provTag;
    html += '</div>';

    // L2 支付方式 column
    html += '<div class="mm-children">';
    prov.methods.forEach(function(method) {
      const mTag = method.status === 'on' ? '<span class="mm-tag mm-tag-on">啟用</span>' : '<span class="mm-tag mm-tag-off">停用</span>';

      html += '<div class="mm-method-group">';
      html += '<div class="mm-node mm-l2" data-id="' + method.id + '" onclick="onNodeClick(\'method\',\'' + method.id + '\')">';
      html += '<span>' + method.name + '</span>' + mTag;
      html += '</div>';

      // L3 付款通道 + 儲值金額表
      html += '<div class="mm-children">';
      method.channels.forEach(function(ch) {
        const cTag = ch.status === 'on' ? '<span class="mm-tag mm-tag-on">啟用</span>' : '<span class="mm-tag mm-tag-off">停用</span>';
        html += '<div class="mm-node mm-l3" data-id="' + ch.id + '">';
        html += '<span>' + ch.name + '</span>' + cTag;
        html += '</div>';
      });

      // 儲值金額表
      if (method.billing) {
        const bTag = method.billing.status === 'on' ? '<span class="mm-tag mm-tag-on">啟用</span>' : '<span class="mm-tag mm-tag-off">停用</span>';
        html += '<div class="mm-node mm-l3-billing" data-id="' + method.billing.id + '" onclick="openBillingDetail(\'' + method.id + '\')">';
        html += '<span>💰 儲值金額表</span>' + bTag + '<span class="mm-amounts">' + method.billing.amounts.length + '筆</span>';
        html += '</div>';
      }
      // 每個支付方式都有新增入口
      html += '<div class="mm-node mm-l3-billing empty mm-add" onclick="alert(\'新增儲值金額表: ' + method.name + '\')">';
      html += '<span>+ 新增金額表</span>';
      html += '</div>';
      html += '</div>'; // mm-children L3
      html += '</div>'; // mm-method-group
    });
    html += '</div>'; // mm-children L2
    html += '</div>'; // mm-row
    html += '</div>'; // mm-provider-group
  });

  container.innerHTML = html;
  requestAnimationFrame(drawLines);
}

// === Draw SVG connecting lines ===
function drawLines() {
  const svg = document.getElementById('mmLines');
  const wrap = document.querySelector('.mindmap-wrap');
  const wrapRect = wrap.getBoundingClientRect();

  // Size SVG to content
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
      const l3Nodes = methodGroup.querySelectorAll('.mm-children > .mm-node');
      l3Nodes.forEach(function(l3) {
        paths += connectNodes(mNode, l3, wrapRect);
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
function openBillingDetail(methodId) {
  let method = null, prov = null;
  treeData.forEach(function(p){ p.methods.forEach(function(m){ if(m.id===methodId){ method=m; prov=p; } }); });
  if (!method || !method.billing) return;

  document.getElementById('detailTitle').textContent = prov.name + ' / ' + method.name + ' - 儲值金額表';
  const rows = method.billing.amounts.map(function(a, i) {
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
