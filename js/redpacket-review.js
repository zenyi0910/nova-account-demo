// === 紅包審核 JS ===
var rpPage = 1;
var rpPageSize = 10;
var rpFilterStatus = '';
var rpFilterGuild = '';
var rpFilterOrder = '';

var rpData = [
  {id:'RP20260520001',guild:'龍之谷',leader:'Abk7382',mode:'一組',groups:1,amount:50000,perPack:500,qty:100,times:1,target:'全部會員',time:'2026-05-20 09:30',status:'pending',reviewer:'',reviewTime:'',reason:''},
  {id:'RP20260519002',guild:'皇家俱樂部',leader:'Wnp9012',mode:'多組',groups:3,amount:150000,perPack:0,qty:0,times:0,target:'全部會員',time:'2026-05-19 14:20',status:'approved',reviewer:'admin',reviewTime:'2026-05-19 15:00',reason:'',detail:[{qty:5,perPack:10000,times:2,target:'全部會員'},{qty:3,perPack:5000,times:3,target:'副會長'},{qty:2,perPack:2500,times:5,target:'指定帳號'}]},
  {id:'RP20260518003',guild:'星辰戰隊',leader:'Mhx6677',mode:'一組',groups:1,amount:20000,perPack:400,qty:50,times:1,target:'會員',time:'2026-05-18 22:00',status:'rejected',reviewer:'casper',reviewTime:'2026-05-19 09:00',reason:'金額異常，請確認後重新申請'},
  {id:'RP20260517004',guild:'龍之谷',leader:'Abk7382',mode:'上傳',groups:8,amount:80000,perPack:0,qty:0,times:0,target:'指定帳號',time:'2026-05-17 11:00',status:'approved',reviewer:'admin',reviewTime:'2026-05-17 11:30',reason:'',isWhitelist:true},
  {id:'RP20260516005',guild:'黃金獵人',leader:'Gld1234',mode:'一組',groups:1,amount:30000,perPack:600,qty:50,times:1,target:'全部會員',time:'2026-05-16 08:45',status:'pending',reviewer:'',reviewTime:'',reason:''},
  {id:'RP20260515006',guild:'皇家俱樂部',leader:'Wnp9012',mode:'多組',groups:2,amount:60000,perPack:0,qty:0,times:0,target:'副會長',time:'2026-05-15 16:30',status:'approved',reviewer:'casper',reviewTime:'2026-05-15 17:00',reason:'',detail:[{qty:10,perPack:3000,times:1,target:'副會長'},{qty:5,perPack:6000,times:1,target:'全部會員'}]},
  {id:'RP20260514007',guild:'星辰戰隊',leader:'Mhx6677',mode:'一組',groups:1,amount:10000,perPack:200,qty:50,times:1,target:'全部會員',time:'2026-05-14 20:15',status:'approved',reviewer:'admin',reviewTime:'2026-05-14 20:30',reason:''},
  {id:'RP20260513008',guild:'黃金獵人',leader:'Gld1234',mode:'上傳',groups:5,amount:45000,perPack:0,qty:0,times:0,target:'指定帳號',time:'2026-05-13 10:00',status:'rejected',reviewer:'casper',reviewTime:'2026-05-13 14:00',reason:'CSV格式錯誤，第3行缺少領取次數'},
  {id:'RP20260512009',guild:'龍之谷',leader:'Abk7382',mode:'一組',groups:1,amount:25000,perPack:500,qty:50,times:1,target:'會員',time:'2026-05-12 09:00',status:'approved',reviewer:'admin',reviewTime:'2026-05-12 09:15',reason:'',isWhitelist:true},
  {id:'RP20260511010',guild:'皇家俱樂部',leader:'Wnp9012',mode:'多組',groups:4,amount:200000,perPack:0,qty:0,times:0,target:'全部會員',time:'2026-05-11 13:00',status:'pending',reviewer:'',reviewTime:'',reason:'',detail:[{qty:10,perPack:5000,times:2,target:'全部會員'},{qty:5,perPack:10000,times:1,target:'副會長'},{qty:3,perPack:5000,times:3,target:'會員'},{qty:2,perPack:2500,times:5,target:'指定帳號'}]},
  {id:'RP20260510011',guild:'星辰戰隊',leader:'Mhx6677',mode:'一組',groups:1,amount:15000,perPack:300,qty:50,times:1,target:'全部會員',time:'2026-05-10 18:30',status:'approved',reviewer:'admin',reviewTime:'2026-05-10 19:00',reason:''},
  {id:'RP20260509012',guild:'黃金獵人',leader:'Gld1234',mode:'一組',groups:1,amount:40000,perPack:800,qty:50,times:1,target:'會長',time:'2026-05-09 07:00',status:'rejected',reviewer:'casper',reviewTime:'2026-05-09 10:00',reason:'可領取對象不可為會長本人'},
];

function getRpFiltered() {
  var data = rpData.slice();
  if (rpFilterStatus) data = data.filter(function(d){ return d.status === rpFilterStatus; });
  if (rpFilterGuild) data = data.filter(function(d){ return d.guild.indexOf(rpFilterGuild) >= 0; });
  if (rpFilterOrder) data = data.filter(function(d){ return d.id.indexOf(rpFilterOrder) >= 0; });
  return data;
}

function rpSearch() {
  rpFilterStatus = document.getElementById('rpStatusFilter').value;
  rpFilterGuild = document.getElementById('rpGuildFilter').value.trim();
  rpFilterOrder = document.getElementById('rpOrderFilter').value.trim();
  rpPage = 1;
  renderRpTable();
}

function rpReset() {
  document.getElementById('rpStatusFilter').value = '';
  document.getElementById('rpGuildFilter').value = '';
  document.getElementById('rpOrderFilter').value = '';
  rpFilterStatus = '';
  rpFilterGuild = '';
  rpFilterOrder = '';
  rpPage = 1;
  renderRpTable();
}

function statusBadge(s) {
  var map = {pending:'待審核',approved:'已通過',rejected:'已駁回'};
  var cls = {pending:'status-maint',approved:'status-online',rejected:'status-offline'};
  return '<span class="status-badge ' + cls[s] + '">' + map[s] + '</span>';
}

function renderRpTable() {
  var data = getRpFiltered();
  var total = data.length;
  var totalPages = Math.max(1, Math.ceil(total / rpPageSize));
  if (rpPage > totalPages) rpPage = totalPages;
  var start = (rpPage - 1) * rpPageSize;
  var pageData = data.slice(start, start + rpPageSize);

  var rows = '';
  if (pageData.length === 0) {
    rows = '<tr><td colspan="8" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';
  } else {
    pageData.forEach(function(item) {
      var ops = '';
      if (item.status === 'pending') {
        ops = '<button class="btn-icon-action" onclick="rpApprove(\'' + item.id + '\')" title="通過" style="color:#059669"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg></button>' +
              '<button class="btn-icon-action delete" onclick="rpReject(\'' + item.id + '\')" title="駁回"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
      } else {
        ops = '<button class="btn-icon-action" onclick="rpDetail(\'' + item.id + '\')" title="詳情" style="color:#4DD0C2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>';
      }
      rows += '<tr><td style="font-weight:500">' + item.guild + '</td><td>' + item.leader + '</td><td>' + item.mode + '</td><td>' + item.groups + ' 組</td><td style="color:#DC2626;font-weight:600">$' + item.amount.toLocaleString() + '</td><td style="color:#6B7280">' + item.time + '</td><td>' + statusBadge(item.status) + (item.isWhitelist ? ' <span style="font-size:10px;color:#2563EB;background:#EFF6FF;padding:1px 4px;border-radius:3px">白名單</span>' : '') + '</td><td style="display:flex;gap:4px">' + ops + '</td></tr>';
    });
  }

  // Top bar
  var topBar = '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;font-size:12px;color:#6B7280">';
  topBar += '<span>第 ' + rpPage + ' 頁，共 ' + total + ' 筆資料</span>';
  topBar += '<div style="display:flex;align-items:center;gap:4px">每頁顯示 <select onchange="rpPageSize=+this.value;rpPage=1;renderRpTable()" style="padding:2px 6px;border:1px solid #D1D5DB;border-radius:4px;font-size:12px">';
  [10,20,50].forEach(function(n){ topBar += '<option value="' + n + '"' + (n===rpPageSize?' selected':'') + '>' + n + '</option>'; });
  topBar += '</select> 筆</div></div>';

  // Bottom bar
  var bottomBar = '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0">';
  bottomBar += '<select onchange="rpGoPage(+this.value)" style="padding:3px 8px;border:1px solid #E5E7EB;border-radius:4px;font-size:12px">';
  for (var p = 1; p <= totalPages; p++) {
    bottomBar += '<option value="' + p + '"' + (p===rpPage?' selected':'') + '>第' + p + '頁</option>';
  }
  bottomBar += '</select>';
  bottomBar += '<div style="display:flex;align-items:center;gap:4px">';
  bottomBar += '<button class="page-btn" onclick="rpGoPage(' + (rpPage-1) + ')"' + (rpPage===1?' disabled':'') + '>&lt;</button>';
  for (var i = 1; i <= totalPages; i++) {
    bottomBar += '<button class="page-btn' + (i===rpPage?' active':'') + '" onclick="rpGoPage(' + i + ')">' + i + '</button>';
  }
  bottomBar += '<button class="page-btn" onclick="rpGoPage(' + (rpPage+1) + ')"' + (rpPage===totalPages?' disabled':'') + '>&gt;</button>';
  bottomBar += '</div></div>';

  document.getElementById('rpTableWrap').innerHTML = topBar +
    '<table class="data-table"><thead><tr><th>公會</th><th>會長帳號</th><th>申請模式</th><th>紅包組數</th><th>總金額</th><th>申請時間</th><th>狀態</th><th>操作</th></tr></thead><tbody>' + rows + '</tbody></table>' +
    bottomBar;
}

function rpGoPage(p) {
  var data = getRpFiltered();
  var totalPages = Math.max(1, Math.ceil(data.length / rpPageSize));
  if (p < 1 || p > totalPages) return;
  rpPage = p;
  renderRpTable();
}

// === 通過 ===
function rpApprove(id) {
  var item = rpData.find(function(d){ return d.id === id; });
  if (!item) return;
  if (confirm('確定通過「' + item.guild + '」的紅包申請（$' + item.amount.toLocaleString() + '）？')) {
    item.status = 'approved';
    item.reviewer = 'casper';
    item.reviewTime = new Date().toISOString().slice(0,16).replace('T',' ');
    renderRpTable();
  }
}

// === 駁回 Modal ===
function rpReject(id) {
  var modal = document.getElementById('rpRejectModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'rpRejectModal';
    modal.innerHTML =
      '<div class="modal" style="max-width:420px">' +
        '<div class="modal-header"><h3>駁回紅包申請</h3><button class="modal-close" onclick="closeRpModal(\'rpRejectModal\')">&times;</button></div>' +
        '<div class="modal-body">' +
          '<div class="form-group"><label>駁回原因 <span style="color:#DC2626">*</span></label><textarea id="rpRejectReason" class="form-control" rows="3" placeholder="請輸入駁回原因"></textarea></div>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<button class="btn btn-outline" onclick="closeRpModal(\'rpRejectModal\')">取消</button>' +
          '<button class="btn btn-danger" onclick="confirmReject()">確認駁回</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
  }
  modal.dataset.targetId = id;
  document.getElementById('rpRejectReason').value = '';
  modal.classList.add('show');
}

function confirmReject() {
  var modal = document.getElementById('rpRejectModal');
  var reason = document.getElementById('rpRejectReason').value.trim();
  if (!reason) { alert('請輸入駁回原因'); return; }
  var id = modal.dataset.targetId;
  var item = rpData.find(function(d){ return d.id === id; });
  if (item) {
    item.status = 'rejected';
    item.reviewer = 'casper';
    item.reviewTime = new Date().toISOString().slice(0,16).replace('T',' ');
    item.reason = reason;
  }
  modal.classList.remove('show');
  renderRpTable();
}

// === 詳情 Modal ===
function rpDetail(id) {
  var item = rpData.find(function(d){ return d.id === id; });
  if (!item) return;
  var modal = document.getElementById('rpDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'rpDetailModal';
    modal.innerHTML = '<div class="modal" style="max-width:700px"><div class="modal-header"><h3>紅包申請詳情</h3><button class="modal-close" onclick="closeRpModal(\'rpDetailModal\')">&times;</button></div><div class="modal-body" id="rpDetailBody"></div></div>';
    document.body.appendChild(modal);
  }

  var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;font-size:13px;margin-bottom:16px">';
  html += '<div><span style="color:#6B7280">公會：</span><strong>' + item.guild + '</strong></div>';
  html += '<div><span style="color:#6B7280">會長：</span>' + item.leader + '</div>';
  html += '<div><span style="color:#6B7280">申請時間：</span>' + item.time + '</div>';
  html += '<div><span style="color:#6B7280">申請模式：</span>' + item.mode + '</div>';
  html += '<div><span style="color:#6B7280">總金額：</span><strong style="color:#DC2626">$' + item.amount.toLocaleString() + '</strong></div>';
  html += '<div><span style="color:#6B7280">狀態：</span>' + statusBadge(item.status) + '</div>';
  if (item.reviewer) {
    html += '<div><span style="color:#6B7280">審核人：</span>' + item.reviewer + '</div>';
    html += '<div><span style="color:#6B7280">審核時間：</span>' + item.reviewTime + '</div>';
  }
  if (item.reason) {
    html += '<div style="grid-column:1/-1"><span style="color:#6B7280">駁回原因：</span><span style="color:#DC2626">' + item.reason + '</span></div>';
  }
  html += '</div>';

  // 明細表格
  html += '<div style="font-size:13px;font-weight:600;margin-bottom:8px">紅包明細</div>';
  html += '<table class="data-table" style="font-size:12px"><thead><tr><th>組別</th><th>數量</th><th>每包點數</th><th>領取次數</th><th>可領取對象</th><th>小計</th></tr></thead><tbody>';
  if (item.detail && item.detail.length) {
    item.detail.forEach(function(d, i) {
      var subtotal = d.qty * d.perPack * d.times;
      html += '<tr><td>' + (i+1) + '</td><td>' + d.qty + '</td><td>' + d.perPack.toLocaleString() + '</td><td>' + d.times + '</td><td>' + d.target + '</td><td>$' + subtotal.toLocaleString() + '</td></tr>';
    });
  } else {
    var subtotal = item.qty * item.perPack * item.times;
    html += '<tr><td>1</td><td>' + item.qty + '</td><td>' + item.perPack.toLocaleString() + '</td><td>' + item.times + '</td><td>' + item.target + '</td><td>$' + subtotal.toLocaleString() + '</td></tr>';
  }
  html += '</tbody></table>';

  // 序號列表（已通過才有）
  if (item.status === 'approved') {
    html += '<div style="font-size:13px;font-weight:600;margin:16px 0 8px">紅包序號</div>';
    html += '<table class="data-table" style="font-size:12px"><thead><tr><th>序號</th><th>已領取/總份數</th><th>剩餘次數</th><th>狀態</th></tr></thead><tbody>';
    var totalQty = item.detail ? item.detail.reduce(function(s,d){return s+d.qty;},0) : item.groups;
    for (var i = 0; i < Math.min(totalQty, 5); i++) {
      var used = Math.floor(Math.random() * 10);
      var total = 10;
      var remain = total - used;
      var sn = item.id.replace('RP','SN') + '-' + String(i+1).padStart(3,'0');
      html += '<tr><td style="font-family:monospace;font-size:11px;color:#2563EB;cursor:pointer" onclick="navigator.clipboard.writeText(\'' + sn + '\');alert(\'已複製\')">' + sn + ' 📋</td><td>' + used + '/' + total + '</td><td>' + remain + '</td><td>' + (remain===0?'<span style="color:#9CA3AF">已用完</span>':'<span style="color:#059669">進行中</span>') + '</td></tr>';
    }
    html += '</tbody></table>';
  }

  document.getElementById('rpDetailBody').innerHTML = html;
  modal.classList.add('show');
}

function closeRpModal(id) {
  var m = document.getElementById(id);
  if (m) m.classList.remove('show');
}

// Init
document.addEventListener('DOMContentLoaded', function() {
  renderRpTable();
});
