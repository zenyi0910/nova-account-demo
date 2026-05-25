// === 紅包紀錄 JS (v3 - 對齊需求：序號領取紀錄) ===
var rlPage = 1;
var rlPageSize = 10;
var rlFilterStatus = '';
var rlFilterSn = '';
var rlFilterLeader = '';
var rlFilterMember = '';

// 需求十四：紅包紀錄 = 序號維度的紀錄（含領取進度）
var rlData = [
  {sn:'SN2026052000101',orderId:'RP20260520001',guild:'龍之谷',leader:'Abk7382',mode:'single',qty:3,perAmount:1000,times:5,totalAmount:15000,status:'active',claimed:8,total:15,createTime:'2026-05-20 09:30:15',expireTime:'2026-05-23 09:30:15'},
  {sn:'SN2026052000102',orderId:'RP20260520001',guild:'龍之谷',leader:'Abk7382',mode:'single',qty:3,perAmount:1000,times:5,totalAmount:15000,status:'active',claimed:5,total:15,createTime:'2026-05-20 09:30:15',expireTime:'2026-05-23 09:30:15'},
  {sn:'SN2026052000103',orderId:'RP20260520001',guild:'龍之谷',leader:'Abk7382',mode:'single',qty:3,perAmount:1000,times:5,totalAmount:15000,status:'active',claimed:2,total:15,createTime:'2026-05-20 09:30:15',expireTime:'2026-05-23 09:30:15'},
  {sn:'SN2026051900201',orderId:'RP20260519002',guild:'皇家俱樂部',leader:'Wnp9012',mode:'multi',qty:5,perAmount:2000,times:3,totalAmount:30000,status:'done',claimed:15,total:15,createTime:'2026-05-19 15:00:12',expireTime:'2026-05-22 15:00:12'},
  {sn:'SN2026051900202',orderId:'RP20260519002',guild:'皇家俱樂部',leader:'Wnp9012',mode:'multi',qty:5,perAmount:2000,times:3,totalAmount:30000,status:'done',claimed:15,total:15,createTime:'2026-05-19 15:00:12',expireTime:'2026-05-22 15:00:12'},
  {sn:'SN2026051900203',orderId:'RP20260519002',guild:'皇家俱樂部',leader:'Wnp9012',mode:'multi',qty:5,perAmount:2000,times:3,totalAmount:30000,status:'active',claimed:10,total:15,createTime:'2026-05-19 15:00:12',expireTime:'2026-05-22 15:00:12'},
  {sn:'SN2026051700401',orderId:'RP20260517004',guild:'龍之谷',leader:'Abk7382',mode:'upload',qty:10,perAmount:1000,times:8,totalAmount:80000,status:'expired',claimed:60,total:80,createTime:'2026-05-17 11:30:00',expireTime:'2026-05-20 11:30:00'},
  {sn:'SN2026051500601',orderId:'RP20260515006',guild:'皇家俱樂部',leader:'Wnp9012',mode:'single',qty:6,perAmount:10000,times:1,totalAmount:60000,status:'done',claimed:6,total:6,createTime:'2026-05-15 16:30:55',expireTime:'2026-05-18 16:30:55'},
  {sn:'SN2026051400701',orderId:'RP20260514007',guild:'星辰戰隊',leader:'Mhx6677',mode:'single',qty:1,perAmount:10000,times:1,totalAmount:10000,status:'expired',claimed:0,total:1,createTime:'2026-05-14 20:30:00',expireTime:'2026-05-17 20:30:00'},
  {sn:'SN2026051200901',orderId:'RP20260512009',guild:'龍之谷',leader:'Abk7382',mode:'multi',qty:5,perAmount:1000,times:5,totalAmount:25000,status:'done',claimed:25,total:25,createTime:'2026-05-12 09:15:00',expireTime:'2026-05-15 09:15:00'},
  {sn:'SN2026051200902',orderId:'RP20260512009',guild:'龍之谷',leader:'Abk7382',mode:'multi',qty:5,perAmount:1000,times:5,totalAmount:25000,status:'done',claimed:25,total:25,createTime:'2026-05-12 09:15:00',expireTime:'2026-05-15 09:15:00'},
  {sn:'SN2026051001101',orderId:'RP20260510011',guild:'星辰戰隊',leader:'Mhx6677',mode:'single',qty:3,perAmount:5000,times:1,totalAmount:15000,status:'done',claimed:3,total:3,createTime:'2026-05-10 19:00:00',expireTime:'2026-05-13 19:00:00'},
];

function getRlFiltered() {
  var data = rlData.slice();
  if (rlFilterLeader) data = data.filter(function(d){ return d.leader.indexOf(rlFilterLeader) >= 0; });
  if (rlFilterStatus) data = data.filter(function(d){ return d.status === rlFilterStatus; });
  if (rlFilterSn) data = data.filter(function(d){ return d.sn.indexOf(rlFilterSn) >= 0 || d.orderId.indexOf(rlFilterSn) >= 0; });
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

function rlStatusBadge(s) {
  var map = {
    active: '<span style="color:#D97706;font-weight:500">領取中</span>',
    done: '<span style="color:#059669;font-weight:500">已領完</span>',
    expired: '<span style="color:#6B7280;font-weight:500">已失效</span>'
  };
  return map[s] || s;
}

function rlModeText(m) {
  var map = {single:'一組',multi:'多組',upload:'上傳'};
  return map[m] || m;
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
    rows = '<tr><td colspan="11" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';
  } else {
    pageData.forEach(function(item, idx) {
      var progress = item.claimed + '/' + item.total;
      var pct = Math.round(item.claimed / item.total * 100);
      var progressBar = '<div style="display:flex;align-items:center;gap:6px"><div style="width:60px;height:6px;background:#E5E7EB;border-radius:3px;overflow:hidden"><div style="width:' + pct + '%;height:100%;background:' + (pct>=100?'#059669':'#D97706') + ';border-radius:3px"></div></div><span style="font-size:11px;color:#6B7280">' + progress + '</span></div>';
      rows += '<tr>' +
        '<td style="text-align:center">' + (start + idx + 1) + '</td>' +
        '<td style="font-family:monospace;font-size:12px">' + item.sn + '</td>' +
        '<td><a href="javascript:void(0)" style="color:#2563EB;text-decoration:none;font-size:12px">' + item.orderId + '</a></td>' +
        '<td>' + item.guild + '</td>' +
        '<td>' + item.leader + '</td>' +
        '<td>' + rlModeText(item.mode) + '</td>' +
        '<td style="text-align:right">' + item.perAmount.toLocaleString() + '</td>' +
        '<td>' + progressBar + '</td>' +
        '<td>' + rlStatusBadge(item.status) + '</td>' +
        '<td>' + item.createTime + '</td>' +
        '<td>' + item.expireTime + '</td>' +
        '</tr>';
    });
  }

  var topBar = '<div style="padding:8px 0;font-size:13px;color:#374151">總共 ' + total + ' 筆資料</div>';
  var bottomBar = '<div style="display:flex;justify-content:flex-end;align-items:center;padding:12px 0;gap:8px">';
  bottomBar += '<span style="font-size:12px;color:#6B7280">第 ' + rlPage + ' / ' + totalPages + ' 頁</span>';
  bottomBar += '<button class="page-btn" onclick="rlGoPage(' + (rlPage-1) + ')"' + (rlPage===1?' disabled':'') + '>&lt;</button>';
  for (var i = 1; i <= totalPages; i++) {
    bottomBar += '<button class="page-btn' + (i===rlPage?' active':'') + '" onclick="rlGoPage(' + i + ')">' + i + '</button>';
  }
  bottomBar += '<button class="page-btn" onclick="rlGoPage(' + (rlPage+1) + ')"' + (rlPage===totalPages?' disabled':'') + '>&gt;</button>';
  bottomBar += '<select onchange="rlPageSize=+this.value;rlPage=1;renderRlTable()" style="padding:3px 8px;border:1px solid #D1D5DB;border-radius:4px;font-size:12px">';
  [10,20,50].forEach(function(n){ bottomBar += '<option value="' + n + '"' + (n===rlPageSize?' selected':'') + '>' + n + ' 筆/頁</option>'; });
  bottomBar += '</select></div>';

  document.getElementById('rlTableWrap').innerHTML = topBar +
    '<div style="overflow-x:auto"><table class="data-table"><thead><tr>' +
    '<th style="text-align:center">序</th><th>紅包序號</th><th>申請單號</th><th>公會名稱</th><th>會長帳號</th><th>申請模式</th><th style="text-align:right">每包點數</th><th>領取進度</th><th>狀態</th><th>建立時間</th><th>有效期限</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table></div>' + bottomBar;
}

function rlGoPage(p) {
  var data = getRlFiltered();
  var totalPages = Math.max(1, Math.ceil(data.length / rlPageSize));
  if (p < 1 || p > totalPages) return;
  rlPage = p;
  renderRlTable();
}

// Init
document.addEventListener('DOMContentLoaded', function() {
  renderRlTable();
});
