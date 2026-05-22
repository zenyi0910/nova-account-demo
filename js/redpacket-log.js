// === 紅包紀錄 JS ===
var rlPage = 1;
var rlPageSize = 10;
var rlFilterGuild = '';
var rlFilterStatus = '';
var rlFilterSn = '';
var rlFilterLeader = '';

var rlData = [
  {sn:'SN20260519002-001',orderId:'RP20260519002',guild:'皇家俱樂部',leader:'Wnp9012',perPack:10000,used:8,total:10,remain:2,status:'active',recipients:[{account:'Player001',time:'2026-05-19 15:10',amount:10000},{account:'Player002',time:'2026-05-19 15:12',amount:10000},{account:'Player003',time:'2026-05-19 15:15',amount:10000},{account:'Player004',time:'2026-05-19 15:20',amount:10000},{account:'Player005',time:'2026-05-19 16:00',amount:10000},{account:'Player006',time:'2026-05-19 16:30',amount:10000},{account:'Player007',time:'2026-05-19 17:00',amount:10000},{account:'Player008',time:'2026-05-20 09:00',amount:10000}]},
  {sn:'SN20260519002-002',orderId:'RP20260519002',guild:'皇家俱樂部',leader:'Wnp9012',perPack:5000,used:9,total:9,remain:0,status:'done',recipients:[{account:'ViceA01',time:'2026-05-19 15:05',amount:5000},{account:'ViceA02',time:'2026-05-19 15:08',amount:5000},{account:'ViceA03',time:'2026-05-19 15:10',amount:5000},{account:'ViceA04',time:'2026-05-19 15:12',amount:5000},{account:'ViceA05',time:'2026-05-19 15:15',amount:5000},{account:'ViceA06',time:'2026-05-19 15:20',amount:5000},{account:'ViceA07',time:'2026-05-19 16:00',amount:5000},{account:'ViceA08',time:'2026-05-19 16:30',amount:5000},{account:'ViceA09',time:'2026-05-19 17:00',amount:5000}]},
  {sn:'SN20260519002-003',orderId:'RP20260519002',guild:'皇家俱樂部',leader:'Wnp9012',perPack:2500,used:10,total:10,remain:0,status:'done',recipients:[{account:'Mem001',time:'2026-05-19 15:30',amount:2500},{account:'Mem002',time:'2026-05-19 15:32',amount:2500},{account:'Mem003',time:'2026-05-19 15:35',amount:2500},{account:'Mem004',time:'2026-05-19 15:40',amount:2500},{account:'Mem005',time:'2026-05-19 16:00',amount:2500},{account:'Mem006',time:'2026-05-19 16:10',amount:2500},{account:'Mem007',time:'2026-05-19 16:20',amount:2500},{account:'Mem008',time:'2026-05-19 16:30',amount:2500},{account:'Mem009',time:'2026-05-19 17:00',amount:2500},{account:'Mem010',time:'2026-05-19 17:30',amount:2500}]},
  {sn:'SN20260517004-001',orderId:'RP20260517004',guild:'龍之谷',leader:'Abk7382',perPack:2000,used:5,total:5,remain:0,status:'done',recipients:[{account:'DragonA',time:'2026-05-17 12:00',amount:2000},{account:'DragonB',time:'2026-05-17 12:05',amount:2000},{account:'DragonC',time:'2026-05-17 12:10',amount:2000},{account:'DragonD',time:'2026-05-17 12:15',amount:2000},{account:'DragonE',time:'2026-05-17 12:20',amount:2000}]},
  {sn:'SN20260517004-002',orderId:'RP20260517004',guild:'龍之谷',leader:'Abk7382',perPack:3000,used:3,total:5,remain:2,status:'active',recipients:[{account:'DragonF',time:'2026-05-17 13:00',amount:3000},{account:'DragonG',time:'2026-05-17 13:10',amount:3000},{account:'DragonH',time:'2026-05-17 14:00',amount:3000}]},
  {sn:'SN20260517004-003',orderId:'RP20260517004',guild:'龍之谷',leader:'Abk7382',perPack:1500,used:0,total:10,remain:10,status:'active',recipients:[]},
  {sn:'SN20260515006-001',orderId:'RP20260515006',guild:'皇家俱樂部',leader:'Wnp9012',perPack:3000,used:10,total:10,remain:0,status:'done',recipients:[{account:'Royal01',time:'2026-05-15 17:10',amount:3000},{account:'Royal02',time:'2026-05-15 17:15',amount:3000},{account:'Royal03',time:'2026-05-15 17:20',amount:3000},{account:'Royal04',time:'2026-05-15 17:25',amount:3000},{account:'Royal05',time:'2026-05-15 17:30',amount:3000},{account:'Royal06',time:'2026-05-15 18:00',amount:3000},{account:'Royal07',time:'2026-05-15 18:10',amount:3000},{account:'Royal08',time:'2026-05-15 18:20',amount:3000},{account:'Royal09',time:'2026-05-15 18:30',amount:3000},{account:'Royal10',time:'2026-05-15 19:00',amount:3000}]},
  {sn:'SN20260515006-002',orderId:'RP20260515006',guild:'皇家俱樂部',leader:'Wnp9012',perPack:6000,used:4,total:5,remain:1,status:'active',recipients:[{account:'Royal11',time:'2026-05-15 17:30',amount:6000},{account:'Royal12',time:'2026-05-15 18:00',amount:6000},{account:'Royal13',time:'2026-05-15 18:30',amount:6000},{account:'Royal14',time:'2026-05-15 19:00',amount:6000}]},
  {sn:'SN20260514007-001',orderId:'RP20260514007',guild:'星辰戰隊',leader:'Mhx6677',perPack:200,used:50,total:50,remain:0,status:'done',recipients:[{account:'Star01',time:'2026-05-14 20:35',amount:200},{account:'Star02',time:'2026-05-14 20:36',amount:200},{account:'Star03',time:'2026-05-14 20:37',amount:200}]},
  {sn:'SN20260512009-001',orderId:'RP20260512009',guild:'龍之谷',leader:'Abk7382',perPack:500,used:45,total:50,remain:5,status:'active',recipients:[{account:'DragonX1',time:'2026-05-12 09:20',amount:500},{account:'DragonX2',time:'2026-05-12 09:25',amount:500},{account:'DragonX3',time:'2026-05-12 09:30',amount:500}]},
  {sn:'SN20260511010-001',orderId:'RP20260511010',guild:'皇家俱樂部',leader:'Wnp9012',perPack:5000,used:20,total:20,remain:0,status:'done',recipients:[{account:'RoyalVIP1',time:'2026-05-11 13:30',amount:5000},{account:'RoyalVIP2',time:'2026-05-11 13:35',amount:5000}]},
  {sn:'SN20260511010-002',orderId:'RP20260511010',guild:'皇家俱樂部',leader:'Wnp9012',perPack:10000,used:3,total:5,remain:2,status:'active',recipients:[{account:'RoyalVIP3',time:'2026-05-11 14:00',amount:10000},{account:'RoyalVIP4',time:'2026-05-11 14:30',amount:10000},{account:'RoyalVIP5',time:'2026-05-11 15:00',amount:10000}]},
  {sn:'SN20260510011-001',orderId:'RP20260510011',guild:'星辰戰隊',leader:'Mhx6677',perPack:300,used:50,total:50,remain:0,status:'done',recipients:[{account:'StarM01',time:'2026-05-10 19:05',amount:300},{account:'StarM02',time:'2026-05-10 19:10',amount:300}]},
  {sn:'SN20260511010-003',orderId:'RP20260511010',guild:'皇家俱樂部',leader:'Wnp9012',perPack:5000,used:9,total:15,remain:6,status:'active',recipients:[{account:'RoyalM1',time:'2026-05-11 15:00',amount:5000},{account:'RoyalM2',time:'2026-05-11 15:30',amount:5000}]},
  {sn:'SN20260511010-004',orderId:'RP20260511010',guild:'皇家俱樂部',leader:'Wnp9012',perPack:2500,used:25,total:25,remain:0,status:'done',recipients:[{account:'RoyalAll1',time:'2026-05-11 16:00',amount:2500},{account:'RoyalAll2',time:'2026-05-11 16:05',amount:2500}]},
  {sn:'SN20260517004-004',orderId:'RP20260517004',guild:'龍之谷',leader:'Abk7382',perPack:1000,used:0,total:8,remain:8,status:'expired',recipients:[]},
  {sn:'SN20260517004-005',orderId:'RP20260517004',guild:'龍之谷',leader:'Abk7382',perPack:5000,used:2,total:3,remain:1,status:'active',recipients:[{account:'DragonVIP1',time:'2026-05-18 10:00',amount:5000},{account:'DragonVIP2',time:'2026-05-18 11:00',amount:5000}]},
  {sn:'SN20260514007-002',orderId:'RP20260514007',guild:'星辰戰隊',leader:'Mhx6677',perPack:500,used:30,total:30,remain:0,status:'done',recipients:[{account:'StarZ01',time:'2026-05-14 21:00',amount:500}]},
  {sn:'SN20260517004-006',orderId:'RP20260517004',guild:'龍之谷',leader:'Abk7382',perPack:800,used:0,total:5,remain:5,status:'expired',recipients:[]},
  {sn:'SN20260512009-002',orderId:'RP20260512009',guild:'龍之谷',leader:'Abk7382',perPack:1000,used:10,total:10,remain:0,status:'done',recipients:[{account:'DragonY1',time:'2026-05-12 10:00',amount:1000},{account:'DragonY2',time:'2026-05-12 10:05',amount:1000}]},
];

function getRlFiltered() {
  var data = rlData.slice();
  if (rlFilterGuild) data = data.filter(function(d){ return d.guild.indexOf(rlFilterGuild) >= 0; });
  if (rlFilterStatus) data = data.filter(function(d){ return d.status === rlFilterStatus; });
  if (rlFilterSn) data = data.filter(function(d){ return d.sn.indexOf(rlFilterSn) >= 0; });
  if (rlFilterLeader) data = data.filter(function(d){ return d.leader.indexOf(rlFilterLeader) >= 0; });
  return data;
}

function rlSearch() {
  rlFilterGuild = document.getElementById('rlGuildFilter').value.trim();
  rlFilterStatus = document.getElementById('rlStatusFilter').value;
  rlFilterSn = document.getElementById('rlSnFilter').value.trim();
  rlFilterLeader = document.getElementById('rlLeaderFilter').value.trim();
  rlPage = 1;
  renderRlTable();
}

function rlReset() {
  document.getElementById('rlGuildFilter').value = '';
  document.getElementById('rlStatusFilter').value = '';
  document.getElementById('rlSnFilter').value = '';
  document.getElementById('rlLeaderFilter').value = '';
  rlFilterGuild = '';
  rlFilterStatus = '';
  rlFilterSn = '';
  rlFilterLeader = '';
  rlPage = 1;
  renderRlTable();
}

function rlStatusBadge(s) {
  var map = {active:'進行中',done:'已用完',expired:'已過期'};
  var cls = {active:'status-online',done:'status-maint',expired:'status-offline'};
  return '<span class="status-badge ' + cls[s] + '">' + map[s] + '</span>';
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
    rows = '<tr><td colspan="9" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';
  } else {
    pageData.forEach(function(item) {
      rows += '<tr>' +
        '<td style="font-family:monospace;font-size:11px;color:#2563EB;cursor:pointer" onclick="navigator.clipboard.writeText(\'' + item.sn + '\');alert(\'已複製\')">' + item.sn + ' 📋</td>' +
        '<td style="font-size:11px;color:#6B7280">' + item.orderId + '</td>' +
        '<td style="font-weight:500">' + item.guild + '</td>' +
        '<td>' + item.leader + '</td>' +
        '<td>$' + item.perPack.toLocaleString() + '</td>' +
        '<td>' + item.used + '/' + item.total + '</td>' +
        '<td>' + item.remain + '</td>' +
        '<td>' + rlStatusBadge(item.status) + '</td>' +
        '<td><button class="btn-icon-action" onclick="rlDetail(\'' + item.sn + '\')" title="領取明細" style="color:#4DD0C2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button></td>' +
        '</tr>';
    });
  }

  // Top bar
  var topBar = '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;font-size:12px;color:#6B7280">';
  topBar += '<span>第 ' + rlPage + ' 頁，共 ' + total + ' 筆資料</span>';
  topBar += '<div style="display:flex;align-items:center;gap:4px">每頁顯示 <select onchange="rlPageSize=+this.value;rlPage=1;renderRlTable()" style="padding:2px 6px;border:1px solid #D1D5DB;border-radius:4px;font-size:12px">';
  [10,20,50].forEach(function(n){ topBar += '<option value="' + n + '"' + (n===rlPageSize?' selected':'') + '>' + n + '</option>'; });
  topBar += '</select> 筆</div></div>';

  // Bottom bar
  var bottomBar = '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0">';
  bottomBar += '<select onchange="rlGoPage(+this.value)" style="padding:3px 8px;border:1px solid #E5E7EB;border-radius:4px;font-size:12px">';
  for (var p = 1; p <= totalPages; p++) {
    bottomBar += '<option value="' + p + '"' + (p===rlPage?' selected':'') + '>第' + p + '頁</option>';
  }
  bottomBar += '</select>';
  bottomBar += '<div style="display:flex;align-items:center;gap:4px">';
  bottomBar += '<button class="page-btn" onclick="rlGoPage(' + (rlPage-1) + ')"' + (rlPage===1?' disabled':'') + '>&lt;</button>';
  for (var i = 1; i <= totalPages; i++) {
    bottomBar += '<button class="page-btn' + (i===rlPage?' active':'') + '" onclick="rlGoPage(' + i + ')">' + i + '</button>';
  }
  bottomBar += '<button class="page-btn" onclick="rlGoPage(' + (rlPage+1) + ')"' + (rlPage===totalPages?' disabled':'') + '>&gt;</button>';
  bottomBar += '</div></div>';

  document.getElementById('rlTableWrap').innerHTML = topBar +
    '<table class="data-table"><thead><tr><th>序號</th><th>所屬訂單</th><th>公會</th><th>會長</th><th>每包金額</th><th>已領取/總份數</th><th>剩餘次數</th><th>狀態</th><th>操作</th></tr></thead><tbody>' + rows + '</tbody></table>' +
    bottomBar;
}

function rlGoPage(p) {
  var data = getRlFiltered();
  var totalPages = Math.max(1, Math.ceil(data.length / rlPageSize));
  if (p < 1 || p > totalPages) return;
  rlPage = p;
  renderRlTable();
}

// === 領取明細 Modal ===
function rlDetail(sn) {
  var item = rlData.find(function(d){ return d.sn === sn; });
  if (!item) return;
  var modal = document.getElementById('rlDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'rlDetailModal';
    modal.innerHTML = '<div class="modal" style="max-width:600px"><div class="modal-header"><h3>領取明細</h3><button class="modal-close" onclick="closeRlModal()">&times;</button></div><div class="modal-body" id="rlDetailBody"></div></div>';
    document.body.appendChild(modal);
  }

  var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 20px;font-size:13px;margin-bottom:14px">';
  html += '<div><span style="color:#6B7280">序號：</span><code style="font-size:11px">' + item.sn + '</code></div>';
  html += '<div><span style="color:#6B7280">公會：</span>' + item.guild + '</div>';
  html += '<div><span style="color:#6B7280">每包金額：</span>$' + item.perPack.toLocaleString() + '</div>';
  html += '<div><span style="color:#6B7280">已領取/總份數：</span>' + item.used + '/' + item.total + '</div>';
  html += '<div><span style="color:#6B7280">狀態：</span>' + rlStatusBadge(item.status) + '</div>';
  html += '</div>';

  if (item.recipients.length === 0) {
    html += '<div style="text-align:center;color:#9CA3AF;padding:24px">尚無領取紀錄</div>';
  } else {
    html += '<table class="data-table" style="font-size:12px"><thead><tr><th>會員帳號</th><th>領取時間</th><th>領取金額</th></tr></thead><tbody>';
    item.recipients.forEach(function(r) {
      html += '<tr><td>' + r.account + '</td><td style="color:#6B7280">' + r.time + '</td><td>$' + r.amount.toLocaleString() + '</td></tr>';
    });
    html += '</tbody></table>';
  }

  document.getElementById('rlDetailBody').innerHTML = html;
  modal.classList.add('show');
}

function closeRlModal() {
  var m = document.getElementById('rlDetailModal');
  if (m) m.classList.remove('show');
}

// Init
document.addEventListener('DOMContentLoaded', function() {
  renderRlTable();
});
