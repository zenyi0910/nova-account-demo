// === 紅包紀錄 JS (v4 - 對齊系統結構+需求) ===
var rlPage = 1;
var rlPageSize = 10;
var rlFilterStatus = '';
var rlFilterSn = '';
var rlFilterLeader = '';

// 系統欄位：順序/紅包訂單編號/申請日期/紅包總金額/領取狀態/申請人帳號
// 需求新增：剩餘數量/有效期限/可領取公會
var rlData = [
  {id:'202605200001',account:'Abk7382',time:'2026-05-20 09:30:15',amount:15000,status:'active',claimed:8,total:15,expire:'2026-05-23 09:30:15',guildScope:['龍之谷','星辰戰隊']},
  {id:'202605190002',account:'Wnp9012',time:'2026-05-19 14:20:33',amount:30000,status:'done',claimed:15,total:15,expire:'2026-05-22 14:20:33',guildScope:['皇家俱樂部']},
  {id:'202605170004',account:'Abk7382',time:'2026-05-17 11:00:22',amount:80000,status:'expired',claimed:60,total:80,expire:'2026-05-20 11:00:22',guildScope:['龍之谷','黃金獵人','星辰戰隊']},
  {id:'202605150006',account:'Wnp9012',time:'2026-05-15 16:30:55',amount:60000,status:'done',claimed:6,total:6,expire:'2026-05-18 16:30:55',guildScope:['皇家俱樂部','龍之谷']},
  {id:'202605140007',account:'Mhx6677',time:'2026-05-14 20:15:00',amount:10000,status:'expired',claimed:0,total:1,expire:'2026-05-17 20:15:00',guildScope:['星辰戰隊']},
  {id:'202605120009',account:'Abk7382',time:'2026-05-12 09:00:00',amount:25000,status:'done',claimed:25,total:25,expire:'2026-05-15 09:00:00',guildScope:['龍之谷']},
  {id:'202605100011',account:'Mhx6677',time:'2026-05-10 18:30:00',amount:15000,status:'done',claimed:3,total:3,expire:'2026-05-13 18:30:00',guildScope:['星辰戰隊']},
  {id:'202605080013',account:'Gld1234',time:'2026-05-08 10:00:00',amount:20000,status:'expired',claimed:12,total:20,expire:'2026-05-11 10:00:00',guildScope:['黃金獵人']},
  {id:'202605050014',account:'Wnp9012',time:'2026-05-05 14:00:00',amount:50000,status:'done',claimed:50,total:50,expire:'2026-05-08 14:00:00',guildScope:['皇家俱樂部']},
  {id:'202605030015',account:'Abk7382',time:'2026-05-03 08:30:00',amount:8000,status:'done',claimed:8,total:8,expire:'2026-05-06 08:30:00',guildScope:['龍之谷']},
  {id:'202604280016',account:'Mhx6677',time:'2026-04-28 16:00:00',amount:12000,status:'expired',claimed:4,total:12,expire:'2026-05-01 16:00:00',guildScope:['星辰戰隊']},
  {id:'202604250017',account:'Gld1234',time:'2026-04-25 11:30:00',amount:35000,status:'done',claimed:35,total:35,expire:'2026-04-28 11:30:00',guildScope:['黃金獵人']},
];

function getRlFiltered() {
  var data = rlData.slice();
  if (rlFilterLeader) data = data.filter(function(d){ return d.account.indexOf(rlFilterLeader) >= 0; });
  if (rlFilterStatus) data = data.filter(function(d){ return d.status === rlFilterStatus; });
  if (rlFilterSn) data = data.filter(function(d){ return d.id.indexOf(rlFilterSn) >= 0; });
  return data;
}

function rlSearch() {
  rlFilterLeader = document.getElementById('rlLeaderFilter').value.trim();
  rlFilterStatus = document.getElementById('rlStatusFilter').value;
  rlFilterSn = document.getElementById('rlSnFilter').value.trim();
  rlPage = 1;
  renderRlTable();
}

function rlReset() {
  document.getElementById('rlLeaderFilter').value = '';
  document.getElementById('rlStatusFilter').value = '';
  document.getElementById('rlSnFilter').value = '';
  rlFilterLeader = '';
  rlFilterStatus = '';
  rlFilterSn = '';
  rlPage = 1;
  renderRlTable();
}

function rlStatusText(s) {
  var map = {active:'領取中',done:'已領完',expired:'已逾期'};
  return map[s] || s;
}

function renderRlTable() {
  var data = getRlFiltered();
  var total = data.length;
  var totalPages = Math.max(1, Math.ceil(total / rlPageSize));
  if (rlPage > totalPages) rlPage = totalPages;
  var start = (rlPage - 1) * rlPageSize;
  var pageData = data.slice(start, start + rlPageSize);

  var rows = '';
  if (pageData.length === 0) {
    rows = '<tr><td colspan="8" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';
  } else {
    pageData.forEach(function(item, idx) {
      var remaining = item.status === 'expired' ? '-' : (item.total - item.claimed);
      rows += '<tr>' +
        '<td style="text-align:center">' + (start + idx + 1) + '</td>' +
        '<td>' + item.id + '</td>' +
        '<td>' + item.time + '</td>' +
        '<td style="text-align:right">' + item.amount.toLocaleString() + '</td>' +
        '<td>' + rlStatusText(item.status) + '</td>' +
        '<td style="text-align:center">' + remaining + '</td>' +
        '<td>' + item.account + '</td>' +
        '<td>' + item.expire + '</td>' +
        '<td><a href="javascript:void(0)" onclick="rlShowDetail(\'' + item.id + '\')" style="color:#00bba7;font-size:12px">領取明細</a></td>' +
        '</tr>';
    });
  }

  var topBar = '<div class="pagination-bar"><span>總共 ' + total + ' 筆資料</span><div class="page-size-select">每頁顯示 <select onchange="rlPageSize=+this.value;rlPage=1;renderRlTable()"><option value="10"' + (rlPageSize===10?' selected':'') + '>10</option><option value="20"' + (rlPageSize===20?' selected':'') + '>20</option><option value="50"' + (rlPageSize===50?' selected':'') + '>50</option></select> 筆</div></div>';

  var bottomBar = '<div class="pagination-bar"><div></div><div style="display:flex;gap:4px;align-items:center">';
  bottomBar += '<button class="page-btn" onclick="rlGoPage(' + (rlPage-1) + ')"' + (rlPage===1?' disabled':'') + '>&lt;</button>';
  for (var i = 1; i <= totalPages; i++) {
    bottomBar += '<button class="page-btn' + (i===rlPage?' active':'') + '" onclick="rlGoPage(' + i + ')">' + i + '</button>';
  }
  bottomBar += '<button class="page-btn" onclick="rlGoPage(' + (rlPage+1) + ')"' + (rlPage===totalPages?' disabled':'') + '>&gt;</button>';
  bottomBar += '</div></div>';

  document.getElementById('rlTableWrap').innerHTML = topBar +
    '<div style="overflow-x:auto"><table class="data-table"><thead><tr>' +
    '<th style="text-align:center">順序</th><th>紅包訂單編號</th><th>申請日期</th><th style="text-align:right">紅包總金額</th><th>領取狀態</th><th style="text-align:center">剩餘數量</th><th>申請人帳號</th><th>有效期限</th><th>操作</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table></div>' + bottomBar;
}

function rlGoPage(p) {
  var data = getRlFiltered();
  var totalPages = Math.max(1, Math.ceil(data.length / rlPageSize));
  if (p < 1 || p > totalPages) return;
  rlPage = p;
  renderRlTable();
}

document.addEventListener('DOMContentLoaded', function() {
  renderRlTable();
});

// === 領取明細 Modal ===
function rlShowDetail(id) {
  var item = rlData.find(function(d){ return d.id === id; });
  if (!item) return;
  
  var modal = document.getElementById('rlDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'rlDetailModal';
    modal.innerHTML = '<div class="modal" style="max-width:650px"><div class="modal-header"><h3>紅包領取明細</h3><button class="modal-close" onclick="closeRlModal()">&times;</button></div><div class="modal-body" id="rlDetailBody"></div><div class="modal-footer"><button class="btn btn-outline" onclick="closeRlModal()">關閉</button></div></div>';
    document.body.appendChild(modal);
  }
  
  var html = '<table style="width:100%;font-size:12px;border-collapse:collapse;margin-bottom:16px">';
  html += '<tr><td style="padding:8px 12px;color:#6B7280;width:30%">紅包訂單編號</td><td style="padding:8px 12px">' + item.id + '</td></tr>';
  html += '<tr><td style="padding:8px 12px;color:#6B7280">申請人帳號</td><td style="padding:8px 12px">' + item.account + '</td></tr>';
  html += '<tr><td style="padding:8px 12px;color:#6B7280">紅包總金額</td><td style="padding:8px 12px">' + item.amount.toLocaleString() + '</td></tr>';
  html += '<tr><td style="padding:8px 12px;color:#6B7280">領取狀態</td><td style="padding:8px 12px">' + rlStatusText(item.status) + '</td></tr>';
  html += '<tr><td style="padding:8px 12px;color:#6B7280;vertical-align:top">可領取公會</td><td style="padding:8px 12px">';
  if (item.guildScope && item.guildScope.length > 0) {
    item.guildScope.forEach(function(g) {
      html += '<span style="display:inline-block;padding:2px 8px;background:#EEF2FF;border:1px solid #C7D2FE;border-radius:4px;font-size:11px;color:#4338CA;margin:2px 4px 2px 0">' + g + '</span>';
    });
  }
  html += '</td></tr>';
  html += '</table>';
  
  html += '<h4 style="font-size:13px;font-weight:600;margin-bottom:10px;color:#374151">領取紀錄</h4>';
  html += '<p style="font-size:12px;color:#6B7280;margin-bottom:10px">總共 ' + item.claimed + ' 筆領取</p>';
  html += '<table class="data-table"><thead><tr><th>順序</th><th>領取帳號</th><th>領取時間</th><th>領取金額</th></tr></thead><tbody>';
  for (var i = 0; i < Math.min(item.claimed, 5); i++) {
    html += '<tr><td style="text-align:center">' + (i+1) + '</td><td>User' + (Math.floor(Math.random()*9000)+1000) + '</td><td>2026-05-' + (20-i) + ' ' + (10+i) + ':30:00</td><td style="text-align:right">' + Math.floor(item.amount/item.total) + '</td></tr>';
  }
  html += '</tbody></table>';
  
  document.getElementById('rlDetailBody').innerHTML = html;
  modal.classList.add('show');
}

function closeRlModal() {
  var m = document.getElementById('rlDetailModal');
  if (m) m.classList.remove('show');
}
