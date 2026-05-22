// === 紅包審核 JS ===
var rpPage = 1;
var rpPageSize = 10;
var rpFilterStatus = '';
var rpFilterGuild = '';
var rpFilterOrder = '';
var rpFilterLeader = '';

var rpData = [
  {id:'RP20260520001',guild:'龍之谷',guildLv:5,leader:'Abk7382',amount:50000,time:'2026-05-20 09:30:15',status:'pending',reviewer:'',reviewTime:'',reason:''},
  {id:'RP20260519002',guild:'皇家俱樂部',guildLv:10,leader:'Wnp9012',amount:150000,time:'2026-05-19 14:20:33',status:'approved',reviewer:'superadmin',reviewTime:'2026-05-19 15:00:12',reason:''},
  {id:'RP20260518003',guild:'星辰戰隊',guildLv:3,leader:'Mhx6677',amount:20000,time:'2026-05-18 22:00:45',status:'rejected',reviewer:'casper',reviewTime:'2026-05-19 09:00:00',reason:'金額異常，請確認後重新申請'},
  {id:'RP20260517004',guild:'龍之谷',guildLv:5,leader:'Abk7382',amount:80000,time:'2026-05-17 11:00:22',status:'approved',reviewer:'superadmin',reviewTime:'2026-05-17 11:30:00',reason:''},
  {id:'RP20260516005',guild:'黃金獵人',guildLv:8,leader:'Gld1234',amount:30000,time:'2026-05-16 08:45:10',status:'pending',reviewer:'',reviewTime:'',reason:''},
  {id:'RP20260515006',guild:'皇家俱樂部',guildLv:10,leader:'Wnp9012',amount:60000,time:'2026-05-15 16:30:55',status:'approved',reviewer:'casper',reviewTime:'2026-05-15 17:00:30',reason:''},
  {id:'RP20260514007',guild:'星辰戰隊',guildLv:3,leader:'Mhx6677',amount:10000,time:'2026-05-14 20:15:00',status:'approved',reviewer:'superadmin',reviewTime:'2026-05-14 20:30:00',reason:''},
  {id:'RP20260513008',guild:'黃金獵人',guildLv:8,leader:'Gld1234',amount:45000,time:'2026-05-13 10:00:18',status:'rejected',reviewer:'casper',reviewTime:'2026-05-13 14:00:00',reason:'CSV格式錯誤，第3行缺少領取次數'},
  {id:'RP20260512009',guild:'龍之谷',guildLv:5,leader:'Abk7382',amount:25000,time:'2026-05-12 09:00:00',status:'approved',reviewer:'superadmin',reviewTime:'2026-05-12 09:15:00',reason:''},
  {id:'RP20260511010',guild:'皇家俱樂部',guildLv:10,leader:'Wnp9012',amount:200000,time:'2026-05-11 13:00:44',status:'pending',reviewer:'',reviewTime:'',reason:''},
  {id:'RP20260510011',guild:'星辰戰隊',guildLv:3,leader:'Mhx6677',amount:15000,time:'2026-05-10 18:30:00',status:'approved',reviewer:'superadmin',reviewTime:'2026-05-10 19:00:00',reason:''},
  {id:'RP20260509012',guild:'黃金獵人',guildLv:8,leader:'Gld1234',amount:40000,time:'2026-05-09 07:00:00',status:'rejected',reviewer:'casper',reviewTime:'2026-05-09 10:00:00',reason:'可領取對象不可為會長本人'},
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
  document.getElementById('rpReviewerFilter') && (document.getElementById('rpReviewerFilter').value = '');
  rpFilterStatus = '';
  rpFilterGuild = '';
  rpFilterOrder = '';
  rpFilterLeader = '';
  rpPage = 1;
  renderRpTable();
}

function statusBadge(s) {
  if (s === 'approved') return '<span style="color:#059669">已審核 <a href="javascript:void(0)" style="color:#7C3AED;font-size:11px;margin-left:4px">檢視詳情</a></span>';
  if (s === 'rejected') return '<span style="color:#DC2626">已拒絕</span>';
  return '<span style="color:#6B7280">待審核中</span>';
}

function guildLvBadge(lv) {
  var color = lv >= 10 ? '#7C3AED' : lv >= 5 ? '#059669' : '#6B7280';
  return '<span style="background:' + color + ';color:#fff;padding:2px 8px;border-radius:10px;font-size:11px">Lv.' + lv + '</span>';
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
    rows = '<tr><td colspan="11" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';
  } else {
    pageData.forEach(function(item, idx) {
      var ops = '-';
      if (item.status === 'pending') {
        ops = '<div style="display:flex;gap:4px;flex-wrap:wrap">' +
          '<button style="background:#059669;color:#fff;border:none;border-radius:4px;padding:3px 10px;font-size:12px;cursor:pointer" onclick="rpApprove(\'' + item.id + '\')">同意</button>' +
          '<button style="background:#DC2626;color:#fff;border:none;border-radius:4px;padding:3px 10px;font-size:12px;cursor:pointer" onclick="rpReject(\'' + item.id + '\')">拒絕</button>' +
          '<button style="background:#D97706;color:#fff;border:none;border-radius:4px;padding:3px 10px;font-size:12px;cursor:pointer" onclick="rpGenSerial(\'' + item.id + '\')">產生序號</button>' +
          '</div>';
      }
      rows += '<tr>' +
        '<td style="text-align:center">' + (start + idx + 1) + '</td>' +
        '<td><a href="javascript:void(0)" onclick="rpDetail(\'' + item.id + '\')" style="color:#2563EB;text-decoration:none">' + item.id + '</a> <span style="cursor:pointer;color:#9CA3AF" onclick="navigator.clipboard.writeText(\'' + item.id + '\')">📋</span></td>' +
        '<td>' + item.guild + '</td>' +
        '<td>' + guildLvBadge(item.guildLv) + '</td>' +
        '<td>' + item.leader + '</td>' +
        '<td>' + item.time + '</td>' +
        '<td style="font-weight:600">' + item.amount.toLocaleString() + '</td>' +
        '<td>' + statusBadge(item.status) + '</td>' +
        '<td>' + (item.reviewer || '-') + '</td>' +
        '<td>' + (item.reviewTime || '-') + '</td>' +
        '<td>' + ops + '</td>' +
        '</tr>';
    });
  }

  // Total count
  var topBar = '<div style="padding:8px 0;font-size:13px;color:#374151">總共 ' + total + ' 筆資料</div>';

  // Bottom pagination
  var bottomBar = '<div style="display:flex;justify-content:flex-end;align-items:center;padding:12px 0;gap:8px">';
  bottomBar += '<span style="font-size:12px;color:#6B7280">第 ' + rpPage + ' / ' + totalPages + ' 頁</span>';
  bottomBar += '<button class="page-btn" onclick="rpGoPage(1)"' + (rpPage===1?' disabled':'') + '>&laquo;</button>';
  bottomBar += '<button class="page-btn" onclick="rpGoPage(' + (rpPage-1) + ')"' + (rpPage===1?' disabled':'') + '>&lt;</button>';
  for (var i = 1; i <= totalPages; i++) {
    bottomBar += '<button class="page-btn' + (i===rpPage?' active':'') + '" onclick="rpGoPage(' + i + ')">' + i + '</button>';
  }
  bottomBar += '<button class="page-btn" onclick="rpGoPage(' + (rpPage+1) + ')"' + (rpPage===totalPages?' disabled':'') + '>&gt;</button>';
  bottomBar += '<button class="page-btn" onclick="rpGoPage(' + totalPages + ')"' + (rpPage===totalPages?' disabled':'') + '>&raquo;</button>';
  bottomBar += '<select onchange="rpPageSize=+this.value;rpPage=1;renderRpTable()" style="padding:3px 8px;border:1px solid #D1D5DB;border-radius:4px;font-size:12px">';
  [10,20,50].forEach(function(n){ bottomBar += '<option value="' + n + '"' + (n===rpPageSize?' selected':'') + '>' + n + ' 筆/頁</option>'; });
  bottomBar += '</select></div>';

  document.getElementById('rpTableWrap').innerHTML = topBar +
    '<table class="data-table"><thead><tr><th style="text-align:center">順序</th><th>紅包訂單編號</th><th>公會名稱</th><th>公會等級</th><th>會長帳號</th><th>申請日期</th><th>申請金額</th><th>審核狀態</th><th>審核人員</th><th>審核日期</th><th>審核操作</th></tr></thead><tbody>' + rows + '</tbody></table>' +
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
  if (confirm('確定通過「' + item.guild + '」的紅包申請（' + item.amount.toLocaleString() + '）？')) {
    item.status = 'approved';
    item.reviewer = 'casper';
    item.reviewTime = new Date().toISOString().slice(0,19).replace('T',' ');
    renderRpTable();
  }
}

// === 產生序號 ===
function rpGenSerial(id) {
  var item = rpData.find(function(d){ return d.id === id; });
  if (!item) return;
  var serial = 'SN' + Date.now().toString().slice(-10) + Math.floor(Math.random()*100).toString().padStart(2,'0');
  alert('已產生序號：' + serial + '\n\n紅包訂單：' + item.id + '\n公會：' + item.guild + '\n金額：' + item.amount.toLocaleString());
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
        '<div class="modal-header"><h3>拒絕紅包申請</h3><button class="modal-close" onclick="closeRpModal(\'rpRejectModal\')">&times;</button></div>' +
        '<div class="modal-body">' +
          '<div class="form-group"><label>拒絕原因 <span style="color:#DC2626">*</span></label><textarea id="rpRejectReason" class="form-control" rows="3" placeholder="請輸入拒絕原因"></textarea></div>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<button class="btn btn-outline" onclick="closeRpModal(\'rpRejectModal\')">取消</button>' +
          '<button class="btn btn-danger" onclick="confirmReject()">確認拒絕</button>' +
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
  if (!reason) { alert('請輸入拒絕原因'); return; }
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
    modal.innerHTML = '<div class="modal" style="max-width:600px"><div class="modal-header"><h3>紅包申請詳情</h3><button class="modal-close" onclick="closeRpModal(\'rpDetailModal\')">&times;</button></div><div class="modal-body" id="rpDetailBody"></div></div>';
    document.body.appendChild(modal);
  }

  var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;font-size:13px">';
  html += '<div><span style="color:#6B7280">公會名稱：</span><strong>' + item.guild + '</strong></div>';
  html += '<div><span style="color:#6B7280">公會等級：</span>' + guildLvBadge(item.guildLv) + '</div>';
  html += '<div><span style="color:#6B7280">會長帳號：</span>' + item.leader + '</div>';
  html += '<div><span style="color:#6B7280">申請金額：</span><strong>' + item.amount.toLocaleString() + '</strong></div>';
  html += '<div><span style="color:#6B7280">申請日期：</span>' + item.time + '</div>';
  html += '<div><span style="color:#6B7280">審核狀態：</span>' + statusBadge(item.status) + '</div>';
  if (item.reviewer) {
    html += '<div><span style="color:#6B7280">審核人員：</span>' + item.reviewer + '</div>';
    html += '<div><span style="color:#6B7280">審核日期：</span>' + item.reviewTime + '</div>';
  }
  if (item.reason) {
    html += '<div style="grid-column:1/-1"><span style="color:#6B7280">拒絕原因：</span><span style="color:#DC2626">' + item.reason + '</span></div>';
  }
  html += '</div>';

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
