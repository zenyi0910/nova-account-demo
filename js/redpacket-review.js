// === 紅包審核 JS (v4 - 對齊需求文件) ===
var rpPage = 1;
var rpPageSize = 10;
var rpFilterStatus = '';
var rpFilterGuild = '';
var rpFilterOrder = '';
var rpFilterLeader = '';

// Mock data 對齊需求：申請單號/公會/等級/會長/模式/數量/每包點數/組數/總金額/凍結扣除/狀態/白名單/時間/審核人/審核時間/駁回原因
var rpData = [
  {id:'RP20260520001',guild:'龍之谷',guildLv:5,leader:'Abk7382',mode:'single',qty:3,perAmount:1000,times:5,groups:3,totalAmount:15000,frozenDeduct:15000,status:'pending',whitelist:false,time:'2026-05-20 09:30:15',reviewer:'',reviewTime:'',reason:''},
  {id:'RP20260519002',guild:'皇家俱樂部',guildLv:10,leader:'Wnp9012',mode:'multi',qty:5,perAmount:2000,times:3,groups:5,totalAmount:30000,frozenDeduct:30000,status:'approved',whitelist:true,time:'2026-05-19 14:20:33',reviewer:'superadmin',reviewTime:'2026-05-19 15:00:12',reason:''},
  {id:'RP20260518003',guild:'星辰戰隊',guildLv:3,leader:'Mhx6677',mode:'single',qty:2,perAmount:5000,times:2,groups:2,totalAmount:20000,frozenDeduct:20000,status:'rejected',whitelist:false,time:'2026-05-18 22:00:45',reviewer:'casper',reviewTime:'2026-05-19 09:00:00',reason:'金額異常，請確認後重新申請'},
  {id:'RP20260517004',guild:'龍之谷',guildLv:5,leader:'Abk7382',mode:'upload',qty:10,perAmount:1000,times:8,groups:10,totalAmount:80000,frozenDeduct:80000,status:'approved',whitelist:false,time:'2026-05-17 11:00:22',reviewer:'superadmin',reviewTime:'2026-05-17 11:30:00',reason:''},
  {id:'RP20260516005',guild:'黃金獵人',guildLv:8,leader:'Gld1234',mode:'multi',qty:3,perAmount:2000,times:5,groups:3,totalAmount:30000,frozenDeduct:25000,status:'pending',whitelist:false,time:'2026-05-16 08:45:10',reviewer:'',reviewTime:'',reason:''},
  {id:'RP20260515006',guild:'皇家俱樂部',guildLv:10,leader:'Wnp9012',mode:'single',qty:6,perAmount:10000,times:1,groups:6,totalAmount:60000,frozenDeduct:50000,status:'approved',whitelist:true,time:'2026-05-15 16:30:55',reviewer:'(自動)',reviewTime:'2026-05-15 16:30:55',reason:''},
  {id:'RP20260514007',guild:'星辰戰隊',guildLv:3,leader:'Mhx6677',mode:'single',qty:1,perAmount:10000,times:1,groups:1,totalAmount:10000,frozenDeduct:10000,status:'expired',whitelist:false,time:'2026-05-14 20:15:00',reviewer:'superadmin',reviewTime:'2026-05-14 20:30:00',reason:''},
  {id:'RP20260513008',guild:'黃金獵人',guildLv:8,leader:'Gld1234',mode:'upload',qty:5,perAmount:3000,times:3,groups:5,totalAmount:45000,frozenDeduct:45000,status:'rejected',whitelist:false,time:'2026-05-13 10:00:18',reviewer:'casper',reviewTime:'2026-05-13 14:00:00',reason:'CSV格式錯誤，第3行缺少領取次數'},
  {id:'RP20260512009',guild:'龍之谷',guildLv:5,leader:'Abk7382',mode:'multi',qty:5,perAmount:1000,times:5,groups:5,totalAmount:25000,frozenDeduct:25000,status:'done',whitelist:false,time:'2026-05-12 09:00:00',reviewer:'superadmin',reviewTime:'2026-05-12 09:15:00',reason:''},
  {id:'RP20260511010',guild:'皇家俱樂部',guildLv:10,leader:'Wnp9012',mode:'single',qty:20,perAmount:10000,times:1,groups:20,totalAmount:200000,frozenDeduct:150000,status:'pending',whitelist:true,time:'2026-05-11 13:00:44',reviewer:'',reviewTime:'',reason:''},
  {id:'RP20260510011',guild:'星辰戰隊',guildLv:3,leader:'Mhx6677',mode:'single',qty:3,perAmount:5000,times:1,groups:3,totalAmount:15000,frozenDeduct:15000,status:'approved',whitelist:false,time:'2026-05-10 18:30:00',reviewer:'superadmin',reviewTime:'2026-05-10 19:00:00',reason:''},
  {id:'RP20260509012',guild:'黃金獵人',guildLv:8,leader:'Gld1234',mode:'multi',qty:4,perAmount:10000,times:1,groups:4,totalAmount:40000,frozenDeduct:30000,status:'rejected',whitelist:false,time:'2026-05-09 07:00:00',reviewer:'casper',reviewTime:'2026-05-09 10:00:00',reason:'可領取對象不可為會長本人'},
];

function getRpFiltered() {
  var data = rpData.slice();
  if (rpFilterStatus) data = data.filter(function(d){ return d.status === rpFilterStatus; });
  if (rpFilterGuild) data = data.filter(function(d){ return d.guild.indexOf(rpFilterGuild) >= 0; });
  if (rpFilterOrder) data = data.filter(function(d){ return d.id.indexOf(rpFilterOrder) >= 0; });
  if (rpFilterLeader) data = data.filter(function(d){ return d.leader.indexOf(rpFilterLeader) >= 0; });
  return data;
}

function rpSearch() {
  rpFilterLeader = document.getElementById('rpLeaderFilter').value.trim();
  rpFilterGuild = document.getElementById('rpGuildFilter').value.trim();
  rpFilterStatus = document.getElementById('rpStatusFilter').value;
  rpFilterOrder = document.getElementById('rpOrderFilter').value.trim();
  rpPage = 1;
  renderRpTable();
}

function rpReset() {
  document.getElementById('rpLeaderFilter').value = '';
  document.getElementById('rpGuildFilter').value = '';
  document.getElementById('rpStatusFilter').value = '';
  document.getElementById('rpOrderFilter').value = '';
  if (document.getElementById('rpReviewerFilter')) document.getElementById('rpReviewerFilter').value = '';
  rpFilterStatus = '';
  rpFilterGuild = '';
  rpFilterOrder = '';
  rpFilterLeader = '';
  rpPage = 1;
  renderRpTable();
}

function rpModeText(m) {
  var map = {single:'一組',multi:'多組',upload:'上傳'};
  return map[m] || m;
}

function rpStatusBadge(s) {
  var map = {
    pending: '<span style="color:#D97706;font-weight:500">待審核</span>',
    approved: '<span style="color:#059669;font-weight:500">已通過</span>',
    rejected: '<span style="color:#DC2626;font-weight:500">已駁回</span>',
    expired: '<span style="color:#6B7280;font-weight:500">已失效</span>',
    done: '<span style="color:#2563EB;font-weight:500">已領完</span>'
  };
  return map[s] || s;
}

function guildLvBadge(lv) {
  var color = lv >= 10 ? '#7C3AED' : lv >= 5 ? '#059669' : '#6B7280';
  return '<span style="background:' + color + ';color:#fff;padding:2px 8px;border-radius:10px;font-size:11px">Lv.' + lv + '</span>';
}

function rpWhitelistBadge(wl) {
  return wl ? '<span style="color:#059669">是</span>' : '<span style="color:#6B7280">否</span>';
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
    rows = '<tr><td colspan="14" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';
  } else {
    pageData.forEach(function(item, idx) {
      var ops = '';
      if (item.status === 'pending') {
        ops = '<div style="display:flex;gap:4px;flex-wrap:wrap">' +
          '<button style="background:#059669;color:#fff;border:none;border-radius:4px;padding:3px 10px;font-size:12px;cursor:pointer" onclick="rpApprove(\'' + item.id + '\')">通過</button>' +
          '<button style="background:#DC2626;color:#fff;border:none;border-radius:4px;padding:3px 10px;font-size:12px;cursor:pointer" onclick="rpReject(\'' + item.id + '\')">駁回</button>' +
          '</div>';
      } else if (item.status === 'approved') {
        ops = '<div style="display:flex;gap:4px;flex-wrap:wrap">' +
          '<button style="background:#2563EB;color:#fff;border:none;border-radius:4px;padding:3px 8px;font-size:11px;cursor:pointer" onclick="rpViewSerial(\'' + item.id + '\')">查看序號</button>' +
          '<button style="background:#7C3AED;color:#fff;border:none;border-radius:4px;padding:3px 8px;font-size:11px;cursor:pointer" onclick="rpViewClaims(\'' + item.id + '\')">領取名單</button>' +
          '<button style="background:#6B7280;color:#fff;border:none;border-radius:4px;padding:3px 8px;font-size:11px;cursor:pointer" onclick="rpDisable(\'' + item.id + '\')">停用</button>' +
          '</div>';
      } else {
        ops = '<button style="background:#F3F4F6;color:#374151;border:1px solid #D1D5DB;border-radius:4px;padding:3px 8px;font-size:11px;cursor:pointer" onclick="rpDetail(\'' + item.id + '\')">查看</button>';
      }
      rows += '<tr>' +
        '<td style="text-align:center">' + (start + idx + 1) + '</td>' +
        '<td><a href="javascript:void(0)" onclick="rpDetail(\'' + item.id + '\')" style="color:#2563EB;text-decoration:none;font-size:12px">' + item.id + '</a></td>' +
        '<td>' + item.guild + '</td>' +
        '<td>' + guildLvBadge(item.guildLv) + '</td>' +
        '<td>' + item.leader + '</td>' +
        '<td>' + rpModeText(item.mode) + '</td>' +
        '<td style="text-align:right">' + item.totalAmount.toLocaleString() + '</td>' +
        '<td style="text-align:right;color:#D97706">' + item.frozenDeduct.toLocaleString() + '</td>' +
        '<td>' + rpStatusBadge(item.status) + '</td>' +
        '<td>' + rpWhitelistBadge(item.whitelist) + '</td>' +
        '<td>' + item.time + '</td>' +
        '<td>' + (item.reviewer || '-') + '</td>' +
        '<td>' + (item.reviewTime || '-') + '</td>' +
        '<td>' + ops + '</td>' +
        '</tr>';
    });
  }

  var topBar = '<div style="padding:8px 0;font-size:13px;color:#374151">總共 ' + total + ' 筆資料</div>';
  var bottomBar = '<div style="display:flex;justify-content:flex-end;align-items:center;padding:12px 0;gap:8px">';
  bottomBar += '<span style="font-size:12px;color:#6B7280">第 ' + rpPage + ' / ' + totalPages + ' 頁</span>';
  bottomBar += '<button class="page-btn" onclick="rpGoPage(' + (rpPage-1) + ')"' + (rpPage===1?' disabled':'') + '>&lt;</button>';
  for (var i = 1; i <= totalPages; i++) {
    bottomBar += '<button class="page-btn' + (i===rpPage?' active':'') + '" onclick="rpGoPage(' + i + ')">' + i + '</button>';
  }
  bottomBar += '<button class="page-btn" onclick="rpGoPage(' + (rpPage+1) + ')"' + (rpPage===totalPages?' disabled':'') + '>&gt;</button>';
  bottomBar += '<select onchange="rpPageSize=+this.value;rpPage=1;renderRpTable()" style="padding:3px 8px;border:1px solid #D1D5DB;border-radius:4px;font-size:12px">';
  [10,20,50].forEach(function(n){ bottomBar += '<option value="' + n + '"' + (n===rpPageSize?' selected':'') + '>' + n + ' 筆/頁</option>'; });
  bottomBar += '</select></div>';

  document.getElementById('rpTableWrap').innerHTML = topBar +
    '<div style="overflow-x:auto"><table class="data-table"><thead><tr>' +
    '<th style="text-align:center">序</th><th>申請單號</th><th>公會名稱</th><th>公會等級</th><th>會長帳號</th><th>申請模式</th><th style="text-align:right">申請總金額</th><th style="text-align:right">扣除凍結</th><th>審核狀態</th><th>白名單</th><th>申請時間</th><th>審核人員</th><th>審核時間</th><th>操作</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table></div>' + bottomBar;
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
  if (confirm('確定通過「' + item.guild + '」的紅包申請（' + item.totalAmount.toLocaleString() + '）？\n通過後將自動產生紅包序號。')) {
    item.status = 'approved';
    item.reviewer = 'casper';
    item.reviewTime = new Date().toISOString().slice(0,19).replace('T',' ');
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
          '<p style="font-size:13px;color:#6B7280;margin-bottom:12px">駁回後將退回會長身上金幣並恢復凍結金幣數值。</p>' +
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
    item.reviewTime = new Date().toISOString().slice(0,19).replace('T',' ');
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
    modal.innerHTML = '<div class="modal" style="max-width:640px"><div class="modal-header"><h3>紅包申請詳情</h3><button class="modal-close" onclick="closeRpModal(\'rpDetailModal\')">&times;</button></div><div class="modal-body" id="rpDetailBody"></div></div>';
    document.body.appendChild(modal);
  }
  var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 24px;font-size:13px">';
  html += '<div><span style="color:#6B7280">申請單號：</span><strong>' + item.id + '</strong></div>';
  html += '<div><span style="color:#6B7280">公會名稱：</span><strong>' + item.guild + '</strong></div>';
  html += '<div><span style="color:#6B7280">公會等級：</span>' + guildLvBadge(item.guildLv) + '</div>';
  html += '<div><span style="color:#6B7280">會長帳號：</span>' + item.leader + '</div>';
  html += '<div><span style="color:#6B7280">申請模式：</span>' + rpModeText(item.mode) + '</div>';
  html += '<div><span style="color:#6B7280">白名單：</span>' + rpWhitelistBadge(item.whitelist) + '</div>';
  html += '<div><span style="color:#6B7280">紅包數量：</span>' + item.qty + '</div>';
  html += '<div><span style="color:#6B7280">每包點數：</span>' + item.perAmount.toLocaleString() + '</div>';
  html += '<div><span style="color:#6B7280">領取次數：</span>' + item.times + '</div>';
  html += '<div><span style="color:#6B7280">申請組數：</span>' + item.groups + '</div>';
  html += '<div><span style="color:#6B7280">申請總金額：</span><strong style="color:#111827">' + item.totalAmount.toLocaleString() + '</strong></div>';
  html += '<div><span style="color:#6B7280">扣除凍結金幣：</span><strong style="color:#D97706">' + item.frozenDeduct.toLocaleString() + '</strong></div>';
  html += '<div><span style="color:#6B7280">審核狀態：</span>' + rpStatusBadge(item.status) + '</div>';
  html += '<div><span style="color:#6B7280">申請時間：</span>' + item.time + '</div>';
  if (item.reviewer) {
    html += '<div><span style="color:#6B7280">審核人員：</span>' + item.reviewer + '</div>';
    html += '<div><span style="color:#6B7280">審核時間：</span>' + item.reviewTime + '</div>';
  }
  if (item.reason) {
    html += '<div style="grid-column:1/-1"><span style="color:#6B7280">駁回原因：</span><span style="color:#DC2626">' + item.reason + '</span></div>';
  }
  html += '</div>';
  document.getElementById('rpDetailBody').innerHTML = html;
  modal.classList.add('show');
}

// === 查看序號 Modal ===
function rpViewSerial(id) {
  var item = rpData.find(function(d){ return d.id === id; });
  if (!item) return;
  var modal = document.getElementById('rpSerialModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'rpSerialModal';
    modal.innerHTML = '<div class="modal" style="max-width:700px"><div class="modal-header"><h3>紅包序號</h3><button class="modal-close" onclick="closeRpModal(\'rpSerialModal\')">&times;</button></div><div class="modal-body" id="rpSerialBody"></div></div>';
    document.body.appendChild(modal);
  }
  // Mock serials
  var serials = [];
  for (var i = 0; i < item.groups; i++) {
    serials.push({
      sn: 'SN' + item.id.replace('RP','') + String(i+1).padStart(3,'0'),
      qty: item.qty,
      perAmount: item.perAmount,
      claimed: Math.floor(Math.random() * item.qty),
      status: item.status === 'expired' ? '已失效' : (Math.random() > 0.5 ? '可領取' : '已領完'),
      expire: '2026-05-' + (20 + i) + ' 09:30:15'
    });
  }
  var html = '<table class="data-table" style="font-size:12px"><thead><tr><th>序號</th><th>紅包份數</th><th>每包點數</th><th>已領取</th><th>剩餘</th><th>狀態</th><th>有效期限</th></tr></thead><tbody>';
  serials.forEach(function(s){
    var remain = s.qty - s.claimed;
    html += '<tr><td style="font-family:monospace">' + s.sn + ' <svg onclick="navigator.clipboard.writeText(\'' + s.sn + '\')" style="cursor:pointer;vertical-align:middle" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></td><td>' + s.qty + '</td><td>' + s.perAmount.toLocaleString() + '</td><td>' + s.claimed + '</td><td>' + remain + '</td><td>' + s.status + '</td><td>' + s.expire + '</td></tr>';
  });
  html += '</tbody></table>';
  document.getElementById('rpSerialBody').innerHTML = html;
  modal.classList.add('show');
}

// === 查看領取名單 ===
function rpViewClaims(id) {
  var item = rpData.find(function(d){ return d.id === id; });
  if (!item) return;
  var modal = document.getElementById('rpClaimsModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'rpClaimsModal';
    modal.innerHTML = '<div class="modal" style="max-width:600px"><div class="modal-header"><h3>領取紀錄</h3><button class="modal-close" onclick="closeRpModal(\'rpClaimsModal\')">&times;</button></div><div class="modal-body" id="rpClaimsBody"></div></div>';
    document.body.appendChild(modal);
  }
  var members = ['player001','lucky_cat','gamer2026','star_king','moon_walker'];
  var html = '<table class="data-table" style="font-size:12px"><thead><tr><th>序號</th><th>領取會員</th><th>領取金額</th><th>領取時間</th></tr></thead><tbody>';
  for (var i = 0; i < 5; i++) {
    html += '<tr><td style="font-family:monospace">SN' + item.id.replace('RP','') + '001</td><td>' + members[i] + '</td><td>' + item.perAmount.toLocaleString() + '</td><td>2026-05-' + (19-i) + ' ' + (10+i) + ':' + (15+i*3) + ':00</td></tr>';
  }
  html += '</tbody></table>';
  document.getElementById('rpClaimsBody').innerHTML = html;
  modal.classList.add('show');
}

// === 停用序號 ===
function rpDisable(id) {
  var item = rpData.find(function(d){ return d.id === id; });
  if (!item) return;
  if (confirm('確定停用「' + item.id + '」的所有紅包序號？\n停用後會員將無法再領取。')) {
    item.status = 'expired';
    renderRpTable();
  }
}

function closeRpModal(id) {
  var m = document.getElementById(id);
  if (m) m.classList.remove('show');
}

// Init
document.addEventListener('DOMContentLoaded', function() {
  renderRpTable();
});
