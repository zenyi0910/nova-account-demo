// === 紅包審核 JS (v8 - 完整對齊開發文件：駁回退回/停用序號/公會範圍檢核/白名單標記) ===
var rpPage = 1;
var rpPageSize = 10;
var rpFilterStatus = '';
var rpFilterGuild = '';
var rpFilterOrder = '';
var rpFilterLeader = '';

var rpData = [
  {id:'RP20260520001',guild:'龍之谷',guildLv:5,leader:'Abk7382',mode:'single',totalAmount:15000,frozenDeduct:15000,status:'pending',whitelist:false,time:'2026-05-20 09:30:15',reviewer:'',reviewTime:'',reason:'',guildScope:['龍之谷','星辰戰隊']},
  {id:'RP20260519002',guild:'皇家俱樂部',guildLv:10,leader:'Wnp9012',mode:'multi',totalAmount:30000,frozenDeduct:30000,status:'approved',whitelist:true,time:'2026-05-19 14:20:33',reviewer:'superadmin',reviewTime:'2026-05-19 15:00:12',reason:'',guildScope:['皇家俱樂部']},
  {id:'RP20260518003',guild:'星辰戰隊',guildLv:3,leader:'Mhx6677',mode:'single',totalAmount:20000,frozenDeduct:20000,status:'rejected',whitelist:false,time:'2026-05-18 22:00:45',reviewer:'casper',reviewTime:'2026-05-19 09:00:00',reason:'金額異常，請確認後重新申請',guildScope:['星辰戰隊']},
  {id:'RP20260517004',guild:'龍之谷',guildLv:5,leader:'Abk7382',mode:'upload',totalAmount:80000,frozenDeduct:80000,status:'approved',whitelist:false,time:'2026-05-17 11:00:22',reviewer:'superadmin',reviewTime:'2026-05-17 11:30:00',reason:'',guildScope:['龍之谷','黃金獵人','星辰戰隊']},
  {id:'RP20260516005',guild:'黃金獵人',guildLv:8,leader:'Gld1234',mode:'multi',totalAmount:30000,frozenDeduct:25000,status:'pending',whitelist:false,time:'2026-05-16 08:45:10',reviewer:'',reviewTime:'',reason:'',guildScope:['黃金獵人']},
  {id:'RP20260515006',guild:'皇家俱樂部',guildLv:10,leader:'Wnp9012',mode:'single',totalAmount:60000,frozenDeduct:50000,status:'approved',whitelist:true,time:'2026-05-15 16:30:55',reviewer:'(自動)',reviewTime:'2026-05-15 16:30:55',reason:'',guildScope:['皇家俱樂部','龍之谷']},
  {id:'RP20260514007',guild:'星辰戰隊',guildLv:3,leader:'Mhx6677',mode:'single',totalAmount:10000,frozenDeduct:10000,status:'expired',whitelist:false,time:'2026-05-14 20:15:00',reviewer:'superadmin',reviewTime:'2026-05-14 20:30:00',reason:'',guildScope:['星辰戰隊']},
  {id:'RP20260513008',guild:'黃金獵人',guildLv:8,leader:'Gld1234',mode:'upload',totalAmount:45000,frozenDeduct:45000,status:'rejected',whitelist:false,time:'2026-05-13 10:00:18',reviewer:'casper',reviewTime:'2026-05-13 14:00:00',reason:'CSV格式錯誤，第3行缺少領取次數',guildScope:['黃金獵人']},
  {id:'RP20260512009',guild:'龍之谷',guildLv:5,leader:'Abk7382',mode:'multi',totalAmount:25000,frozenDeduct:25000,status:'done',whitelist:false,time:'2026-05-12 09:00:00',reviewer:'superadmin',reviewTime:'2026-05-12 09:15:00',reason:'',guildScope:['龍之谷']},
  {id:'RP20260511010',guild:'皇家俱樂部',guildLv:10,leader:'Wnp9012',mode:'single',totalAmount:200000,frozenDeduct:150000,status:'pending',whitelist:true,time:'2026-05-11 13:00:44',reviewer:'',reviewTime:'',reason:'',guildScope:['皇家俱樂部','龍之谷','黃金獵人']},
  {id:'RP20260510011',guild:'星辰戰隊',guildLv:3,leader:'Mhx6677',mode:'single',totalAmount:15000,frozenDeduct:15000,status:'approved',whitelist:false,time:'2026-05-10 18:30:00',reviewer:'superadmin',reviewTime:'2026-05-10 19:00:00',reason:'',guildScope:['星辰戰隊']},
  {id:'RP20260509012',guild:'黃金獵人',guildLv:8,leader:'Gld1234',mode:'multi',totalAmount:40000,frozenDeduct:30000,status:'rejected',whitelist:false,time:'2026-05-09 07:00:00',reviewer:'casper',reviewTime:'2026-05-09 10:00:00',reason:'可領取對象不可為會長本人',guildScope:['黃金獵人','星辰戰隊']},
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

// 產生6碼隨機序號（大小寫英數混合）
function rpGenCode() {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var code = '';
  for (var i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

function rpRandomSerial() {
  var input = document.getElementById('rpNewSerial');
  if (input) input.value = rpGenCode();
}

function rpStatusText(s) {
  if (s === 'approved') return '<span style="color:#00bba7;white-space:nowrap">已審核</span>';
  if (s === 'rejected') return '<span style="color:#e7000b;white-space:nowrap">已拒絕</span>';
  if (s === 'expired') return '<span style="color:#6a7282;white-space:nowrap">已失效</span>';
  if (s === 'done') return '<span style="color:#6a7282;white-space:nowrap">已領完</span>';
  return '<span style="color:#6a7282;white-space:nowrap">待審核中</span>';
}

// 系統風格按鈕：pill shape, icon + text
function rpBtnApprove(id) {
  return '<button onclick="rpApprove(\'' + id + '\')" style="display:inline-flex;align-items:center;gap:4px;padding:6px 14px;border-radius:9999px;border:none;background:#4CAF50;color:#fff;font-size:12px;cursor:pointer;font-family:inherit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>同意</button>';
}
function rpBtnReject(id) {
  return '<button onclick="rpReject(\'' + id + '\')" style="display:inline-flex;align-items:center;gap:4px;padding:6px 14px;border-radius:9999px;border:none;background:#9E9E9E;color:#fff;font-size:12px;cursor:pointer;font-family:inherit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>拒絕</button>';
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
    rows = '<tr><td colspan="12" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';
  } else {
    pageData.forEach(function(item, idx) {
      var ops = '';
      if (item.status === 'pending') {
        ops = '<div style="display:flex;gap:6px;flex-wrap:nowrap">' + rpBtnApprove(item.id) + rpBtnReject(item.id) + '</div>';
      } else {
        ops = '<a href="javascript:void(0)" onclick="rpDetail(\'' + item.id + '\')" style="color:oklch(0.777 0.152 181.912);font-size:12px">檢視詳情</a>';
      }
      rows += '<tr>' +
        '<td style="text-align:center">' + (start + idx + 1) + '</td>' +
        '<td>' + item.id + '</td>' +
        '<td>' + item.guild + '</td>' +
        '<td><span style="display:inline-flex;align-items:center;gap:4px;padding:2px 10px;background:#F3E8FF;border:1px solid #A855F7;border-radius:9999px;color:#7C3AED;font-size:11px;font-weight:500;white-space:nowrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2"><path d="M3 21h18M5 21V7l7-4 7 4v14"/><rect x="9" y="13" width="6" height="8"/></svg>Lv.' + item.guildLv + '</span></td>' +
        '<td>' + item.leader + '</td>' +
        '<td>' + rpModeText(item.mode) + '</td>' +
        '<td>' + item.time + '</td>' +
        '<td style="text-align:right">' + item.totalAmount.toLocaleString() + '</td>' +

        '<td>' + rpStatusText(item.status) + '</td>' +
        '<td>' + (item.reviewer || '-') + '</td>' +
        '<td>' + (item.reviewTime || '-') + '</td>' +
        '<td>' + ops + '</td>' +
        '</tr>';
    });
  }

  var topBar = '<div class="pagination-bar"><span>總共 ' + total + ' 筆資料</span><div class="page-size-select">每頁顯示 <select onchange="rpPageSize=+this.value;rpPage=1;renderRpTable()"><option value="10"' + (rpPageSize===10?' selected':'') + '>10</option><option value="20"' + (rpPageSize===20?' selected':'') + '>20</option><option value="50"' + (rpPageSize===50?' selected':'') + '>50</option></select> 筆</div></div>';

  var bottomBar = '<div class="pagination-bar"><div></div><div style="display:flex;gap:4px;align-items:center">';
  bottomBar += '<button class="page-btn" onclick="rpGoPage(' + (rpPage-1) + ')"' + (rpPage===1?' disabled':'') + '>&lt;</button>';
  for (var i = 1; i <= totalPages; i++) {
    bottomBar += '<button class="page-btn' + (i===rpPage?' active':'') + '" onclick="rpGoPage(' + i + ')">' + i + '</button>';
  }
  bottomBar += '<button class="page-btn" onclick="rpGoPage(' + (rpPage+1) + ')"' + (rpPage===totalPages?' disabled':'') + '>&gt;</button>';
  bottomBar += '</div></div>';

  document.getElementById('rpTableWrap').innerHTML = topBar +
    '<div style="overflow-x:auto"><table class="data-table" style="white-space:nowrap"><thead><tr>' +
    '<th style="text-align:center">順序</th><th>紅包訂單編號</th><th>公會名稱</th><th>公會等級</th><th>會長帳號</th><th>申請模式</th><th>申請日期</th><th style="text-align:right">申請金額</th><th>審核狀態</th><th>審核人員</th><th>審核日期</th><th style="min-width:140px">審核操作</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table></div>' + bottomBar;
}

function rpGoPage(p) {
  var data = getRpFiltered();
  var totalPages = Math.max(1, Math.ceil(data.length / rpPageSize));
  if (p < 1 || p > totalPages) return;
  rpPage = p;
  renderRpTable();
}

// === 通過 → 產生序號畫面 ===
function rpApprove(id) {
  var item = rpData.find(function(d){ return d.id === id; });
  if (!item) return;
  var modal = document.getElementById('rpApproveModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'rpApproveModal';
    modal.innerHTML =
      '<div class="modal" style="max-width:600px">' +
        '<div class="modal-header"><h3>審核通過 - 產生紅包序號</h3><button class="modal-close" onclick="closeRpModal(\'rpApproveModal\')">&times;</button></div>' +
        '<div class="modal-body" id="rpApproveBody"></div>' +
        '<div class="modal-footer" id="rpApproveFooter"></div>' +
      '</div>';
    document.body.appendChild(modal);
  }
  // 顯示申請摘要 + 即將產生的序號預覽
  var html = '<table style="width:100%;font-size:12px;border-collapse:collapse;margin-bottom:16px">';
  html += '<tr><td style="padding:6px 10px;color:#6B7280;width:30%">申請單號</td><td style="padding:6px 10px;font-weight:500">' + item.id + '</td></tr>';
  html += '<tr><td style="padding:6px 10px;color:#6B7280">公會 / 會長</td><td style="padding:6px 10px">' + item.guild + ' / ' + item.leader + '</td></tr>';
  html += '<tr><td style="padding:6px 10px;color:#6B7280">申請模式</td><td style="padding:6px 10px">' + rpModeText(item.mode) + '</td></tr>';
  html += '<tr><td style="padding:6px 10px;color:#6B7280">申請總金額</td><td style="padding:6px 10px;font-weight:600">' + item.totalAmount.toLocaleString() + '</td></tr>';
  html += '</table>';
  html += '<div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:12px 16px;margin-bottom:12px">';
  html += '<p style="font-size:12px;font-weight:600;color:#166534;margin-bottom:8px">通過後將產生以下序號：</p>';
  html += '<table class="data-table" style="font-size:12px"><thead><tr style="color:#00897B"><th>順序</th><th>紅包序號</th><th>序號有效期限</th><th>可使用次數</th><th>序號金幣</th><th>操作</th></tr></thead><tbody>';
  for (var i = 0; i < 3; i++) {
    var rowId = 'rpSn_' + i;
    html += '<tr><td style="text-align:center;width:60px">' + (i+1) + '</td>';
    html += '<td><div style="display:flex;align-items:center;gap:8px"><button class="btn btn-dark" style="background:#00bba7;border-color:#00bba7;font-size:12px;white-space:nowrap;padding:6px 12px" onclick="document.getElementById(\'' + rowId + '\').value=rpGenCode()">隨機產出序號</button><input type="text" id="' + rowId + '" class="form-control" style="width:100px;font-family:monospace;font-size:13px;padding:6px 10px" value="' + rpGenCode() + '" readonly></div></td>';
    html += '<td>不限期</td>';
    html += '<td style="text-align:center">5</td>';
    html += '<td style="text-align:right">1,000</td>';
    html += '<td>-</td>';
    html += '</tr>';
  }
  html += '</tbody></table>';
  html += '</div>';
  document.getElementById('rpApproveBody').innerHTML = html;
  document.getElementById('rpApproveFooter').innerHTML =
    '<button class="btn btn-outline" onclick="closeRpModal(\'rpApproveModal\')">取消</button>' +
    '<button class="btn btn-dark" style="background:#00bba7;border-color:#00bba7" onclick="confirmApprove(\'' + item.id + '\')">確認通過並產生序號</button>';
  modal.classList.add('show');
}

function confirmApprove(id) {
  var item = rpData.find(function(d){ return d.id === id; });
  if (item) {
    item.status = 'approved';
    item.reviewer = 'casper';
    item.reviewTime = new Date().toISOString().slice(0,19).replace('T',' ');
  }
  closeRpModal('rpApproveModal');
  renderRpTable();
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
          '<div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:12px 16px;margin-bottom:12px"><p style="font-size:12px;color:#991B1B;margin:0"><strong>⚠ 駁回後系統將自動執行：</strong></p><ul style="font-size:11px;color:#991B1B;margin:6px 0 0 16px;padding:0"><li>退回會長身上金幣（申請總金額）</li><li>恢復本次同步扣除的凍結金幣數值</li></ul></div>' +
          '<div class="form-group"><label>駁回原因 <span style="color:#DC2626">*</span></label><textarea id="rpRejectReason" class="form-control" rows="3" placeholder="請輸入駁回原因"></textarea></div>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<button class="btn btn-outline" onclick="closeRpModal(\'rpRejectModal\')">取消</button>' +
          '<button class="btn btn-dark" onclick="confirmReject()">確認駁回</button>' +
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

// === 詳情子頁面 (Modal) ===
function rpDetail(id) {
  var item = rpData.find(function(d){ return d.id === id; });
  if (!item) return;
  var modal = document.getElementById('rpDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'rpDetailModal';
    modal.innerHTML = '<div class="modal" style="max-width:750px"><div class="modal-header"><h3>紅包申請詳情</h3><button class="modal-close" onclick="closeRpModal(\'rpDetailModal\')">&times;</button></div><div class="modal-body" id="rpDetailBody"></div></div>';
    document.body.appendChild(modal);
  }

  // 基本資訊表格
  var html = '<h4 style="font-size:13px;font-weight:600;margin-bottom:10px;color:#374151">申請資訊</h4>';
  html += '<table style="width:100%;font-size:12px;border-collapse:collapse;margin-bottom:20px">';
  var fields = [
    ['申請單號', item.id], ['公會名稱', item.guild],
    ['公會等級', 'Lv.' + item.guildLv], ['會長帳號', item.leader],
    ['申請模式', rpModeText(item.mode)], ['白名單', item.whitelist ? '<span style="color:#00bba7;font-weight:600">是（自動通過）</span>' : '<span style="color:#6a7282">否（需人工審核）</span>'],
    ['申請總金額', item.totalAmount.toLocaleString()], ['審核狀態', rpStatusText(item.status)],
    ['申請時間', item.time],
    ['可領取公會', (item.guildScope||[]).join('、')]
  ];
  if (item.reviewer) {
    fields.push(['審核人員', item.reviewer]);
    fields.push(['審核時間', item.reviewTime]);
  }
  if (item.reason) fields.push(['駁回原因', '<span style="color:#DC2626">' + item.reason + '</span>']);
  for (var i = 0; i < fields.length; i += 2) {
    html += '<tr>';
    html += '<td style="padding:8px 12px;color:#6B7280;width:20%;border-bottom:1px solid #F3F4F6">' + fields[i][0] + '</td><td style="padding:8px 12px;border-bottom:1px solid #F3F4F6">' + fields[i][1] + '</td>';
    if (fields[i+1]) html += '<td style="padding:8px 12px;color:#6B7280;width:20%;border-bottom:1px solid #F3F4F6">' + fields[i+1][0] + '</td><td style="padding:8px 12px;border-bottom:1px solid #F3F4F6">' + fields[i+1][1] + '</td>';
    else html += '<td></td><td></td>';
    html += '</tr>';
  }
  html += '</table>';

  // 序號列表（已通過才顯示）
  if (item.status === 'approved' || item.status === 'done') {
    html += '<h4 style="font-size:13px;font-weight:600;margin-bottom:10px;color:#374151">紅包序號</h4>';
    html += '<table class="data-table" style="margin-bottom:16px"><thead><tr><th>順序</th><th>紅包序號</th><th>序號有效期限</th><th>剩餘/總次數</th><th>序號金幣</th><th>狀態</th><th>操作</th></tr></thead><tbody>';
    for (var s = 0; s < 3; s++) {
      var sn = 'SN' + item.id.replace('RP','') + String(s+1).padStart(3,'0');
      var remaining = item.status === 'done' ? 0 : (5 - Math.floor(Math.random()*3));
      var snStatus = remaining === 0 ? '<span style="color:#6a7282">已領完</span>' : '<span style="color:#00bba7">使用中</span>';
      html += '<tr><td style="text-align:center">' + (s+1) + '</td><td style="font-family:monospace;font-size:11px">' + sn + '</td><td>不限期</td><td style="text-align:center">' + remaining + ' / 5</td><td style="text-align:right">1,000</td><td>' + snStatus + '</td><td><a href="javascript:void(0)" onclick="rpShowRedemptions(\'' + sn + '\')" style="color:#00bba7;font-size:12px;margin-right:8px">領取名單</a><a href="javascript:void(0)" onclick="rpDisableSerial(\'' + sn + '\')" style="color:#EF4444;font-size:12px">停用</a></td></tr>';
    }
    html += '</tbody></table>';
    html += '</div>';
  }

  document.getElementById('rpDetailBody').innerHTML = html;
  modal.classList.add('show');
}

function closeRpModal(id) {
  var m = document.getElementById(id);
  if (m) m.classList.remove('show');
}

// === 領取名單 Modal ===
function rpShowRedemptions(sn) {
  var modal = document.getElementById('rpRedemptionModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'rpRedemptionModal';
    modal.innerHTML = '<div class="modal" style="max-width:650px"><div class="modal-header"><h3>領取名單</h3><button class="modal-close" onclick="closeRpModal(\'rpRedemptionModal\')">&times;</button></div><div class="modal-body" id="rpRedemptionBody"></div></div>';
    document.body.appendChild(modal);
  }
  // Mock redemption data
  var mockMembers = ['Player_A01','Lucky777','GoldKing99','StarFish22','MoonWalk88'];
  var mockGuilds = ['龍之谷','皇家俱樂部','星辰戰隊','黃金獵人'];
  var html = '<p style="font-size:12px;color:#6B7280;margin-bottom:12px">序號：<strong style="color:#374151">' + sn + '</strong></p>';
  html += '<table class="data-table"><thead><tr><th>順序</th><th>領取會員</th><th>所屬公會</th><th>公會範圍檢核</th><th>領取時間</th><th>領取金幣</th></tr></thead><tbody>';
  var count = 2 + Math.floor(Math.random() * 3);
  for (var i = 0; i < count; i++) {
    var d = new Date(2026, 4, 20 - i, 10 + i, Math.floor(Math.random()*60));
    var guildMatch = i < count - 1 ? '<span style="color:#00bba7">✓ 符合</span>' : '<span style="color:#00bba7">✓ 符合</span>';
    html += '<tr><td style="text-align:center">' + (i+1) + '</td><td>' + mockMembers[i % mockMembers.length] + '</td><td>' + mockGuilds[i % mockGuilds.length] + '</td><td style="text-align:center">' + guildMatch + '</td><td>' + d.toISOString().slice(0,19).replace('T',' ') + '</td><td style="text-align:right">1,000</td></tr>';
  }
  html += '</tbody></table>';
  html += '<div style="margin-top:10px;padding:10px 12px;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:6px;font-size:11px;color:#166534"><strong>領取檢核規則：</strong>序號存在 → 剩餘份數 > 0 → 未重複領取 → 符合公會範圍 → 發放金幣</div>';
  document.getElementById('rpRedemptionBody').innerHTML = html;
  modal.classList.add('show');
}

// === 停用序號確認 ===
function rpDisableSerial(sn) {
  if (confirm('確定要停用序號 ' + sn + '？\n\n停用後該序號將無法再被領取。')) {
    alert('✅ 序號 ' + sn + ' 已停用');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  renderRpTable();
});
