// === 樹狀資料：供應商 > 支付方式 > 付款通道 & 儲值金額表 ===
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

// === Render Tree ===
function renderTree() {
  var container = document.getElementById('treeContainer');
  var html = '';
  treeData.forEach(function(prov) {
    var provStatus = prov.status === 'on' ? '<span class="tag tag-on">啟用</span>' : '<span class="tag tag-off">停用</span>';
    html += '<div class="tree-l1">';
    html += '<div class="tree-node tree-provider" onclick="toggleNode(this)">';
    html += '<svg class="tree-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg>';
    html += '<svg class="tree-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>';
    html += '<span class="tree-label">' + prov.name + '</span><code class="tree-code">' + prov.code + '</code>' + provStatus;
    html += '</div>';
    html += '<div class="tree-children">';

    prov.methods.forEach(function(method) {
      var mStatus = method.status === 'on' ? '<span class="tag tag-on">啟用</span>' : '<span class="tag tag-off">停用</span>';
      html += '<div class="tree-l2">';
      html += '<div class="tree-node tree-method" onclick="toggleNode(this)">';
      html += '<svg class="tree-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg>';
      html += '<svg class="tree-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>';
      html += '<span class="tree-label">' + method.name + '</span>' + mStatus;
      html += '</div>';
      html += '<div class="tree-children">';

      // 付款通道
      method.channels.forEach(function(ch) {
        var cStatus = ch.status === 'on' ? '<span class="tag tag-on">啟用</span>' : '<span class="tag tag-off">停用</span>';
        html += '<div class="tree-l3">';
        html += '<div class="tree-node tree-channel">';
        html += '<svg class="tree-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
        html += '<span class="tree-label">' + ch.name + '</span><code class="tree-code">' + ch.code + '</code>' + cStatus;
        html += '</div></div>';
      });

      // 儲值金額表
      if (method.billing) {
        var bStatus = method.billing.status === 'on' ? '<span class="tag tag-on">啟用</span>' : '<span class="tag tag-off">停用</span>';
        var amountStr = method.billing.amounts.map(function(a){ return '$' + a.amount.toLocaleString(); }).join(', ');
        html += '<div class="tree-l3">';
        html += '<div class="tree-node tree-billing" onclick="openBillingDetail(\'' + method.id + '\')">';
        html += '<svg class="tree-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>';
        html += '<span class="tree-label">儲值金額表</span>' + bStatus;
        html += '<span class="tree-amounts">' + method.billing.amounts.length + ' 筆金額</span>';
        html += '<button class="btn-icon" title="查看明細" style="margin-left:auto"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>';
        html += '</div></div>';
      } else {
        html += '<div class="tree-l3"><div class="tree-node tree-billing tree-empty">';
        html += '<svg class="tree-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
        html += '<span class="tree-label" style="color:#9CA3AF">尚未設定金額表</span>';
        html += '<button class="btn-add-small" onclick="openBillingModal(\'' + method.id + '\')">+ 新增</button>';
        html += '</div></div>';
      }

      html += '</div></div>'; // close tree-children, tree-l2
    });

    html += '</div></div>'; // close tree-children, tree-l1
  });
  container.innerHTML = html;
}

function toggleNode(el) {
  var children = el.nextElementSibling;
  if (!children || !children.classList.contains('tree-children')) return;
  el.classList.toggle('collapsed');
  children.classList.toggle('collapsed');
}

// === Billing Detail Modal ===
function openBillingDetail(methodId) {
  var method = null;
  treeData.forEach(function(p){ p.methods.forEach(function(m){ if(m.id===methodId) method=m; }); });
  if (!method || !method.billing) return;

  var prov = treeData.find(function(p){ return p.methods.indexOf(method) >= 0; });
  document.getElementById('detailTitle').textContent = (prov?prov.name:'') + ' / ' + method.name + ' - 儲值金額表';

  var rows = method.billing.amounts.map(function(a, i) {
    return '<tr><td>' + (i+1) + '</td><td>$' + a.amount.toLocaleString() + '</td><td>' + a.base.toLocaleString() + '</td><td>' + a.rate + '%</td><td>' + a.bonus.toLocaleString() + '</td><td style="font-weight:600">' + a.total.toLocaleString() + '</td></tr>';
  }).join('');

  document.getElementById('detailTable').innerHTML = '<table class="data-table"><thead><tr><th>#</th><th>金額</th><th>基本點數</th><th>贈比</th><th>贈點</th><th>實際點數</th></tr></thead><tbody>' + rows + '</tbody></table>';
  document.getElementById('detailModal').classList.add('show');
}

function openBillingModal(methodId) {
  alert('新增儲值金額表 for method: ' + methodId);
}

function closeDetailModal() {
  document.getElementById('detailModal').classList.remove('show');
}

// === Init ===
renderTree();
