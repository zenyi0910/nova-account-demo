// === 紅包紀錄 JS ===
var rlPage = 1;
var rlPageSize = 10;
var rlFilterGuild = '';
var rlFilterStatus = '';
var rlFilterSn = '';
var rlFilterLeader = '';

var rlData = [
  {id:'202605132927',account:'testuser001',time:'2026-05-13 13:18:24',amount:300,status:'expired'},
  {id:'202604217712',account:'maomao1',time:'2026-04-21 16:26:19',amount:1000,status:'expired'},
  {id:'202603253165',account:'testuser001',time:'2026-03-25 10:38:37',amount:1,status:'expired'},
  {id:'202602059083',account:'ox_5h96bJSdpswV0aOZ8ndkJi',time:'2026-02-05 10:04:25',amount:100,status:'expired'},
  {id:'202601296832',account:'ox_1l91Vgs2UxTAYSnmdh5d8T',time:'2026-01-29 14:28:53',amount:2000,status:'expired'},
  {id:'202601292532',account:'ox_1l91Vgs2UxTAYSnmdh5d8T',time:'2026-01-29 13:52:28',amount:1000,status:'expired'},
  {id:'202601161917',account:'ox_4ErAUEeTJi2AOCE7uRXXa0',time:'2026-01-16 11:27:11',amount:1000,status:'active'},
  {id:'202512208841',account:'testuser001',time:'2025-12-20 09:15:00',amount:500,status:'expired'},
  {id:'202512153322',account:'maomao1',time:'2025-12-15 14:30:22',amount:3000,status:'expired'},
  {id:'202511289901',account:'ox_5h96bJSdpswV0aOZ8ndkJi',time:'2025-11-28 08:45:10',amount:200,status:'expired'},
  {id:'202511201234',account:'testuser001',time:'2025-11-20 16:00:33',amount:5000,status:'done'},
  {id:'202511105566',account:'ox_1l91Vgs2UxTAYSnmdh5d8T',time:'2025-11-10 10:20:15',amount:800,status:'done'},
  {id:'202510307788',account:'maomao1',time:'2025-10-30 11:55:40',amount:1500,status:'done'},
  {id:'202510229900',account:'ox_4ErAUEeTJi2AOCE7uRXXa0',time:'2025-10-22 13:10:05',amount:600,status:'expired'},
  {id:'202510151122',account:'testuser001',time:'2025-10-15 09:30:18',amount:2500,status:'done'},
  {id:'202509283344',account:'ox_5h96bJSdpswV0aOZ8ndkJi',time:'2025-09-28 15:45:22',amount:400,status:'expired'},
  {id:'202509205566',account:'maomao1',time:'2025-09-20 12:00:00',amount:1200,status:'done'},
  {id:'202509107788',account:'ox_1l91Vgs2UxTAYSnmdh5d8T',time:'2025-09-10 17:30:45',amount:3500,status:'done'},
  {id:'202508309900',account:'testuser001',time:'2025-08-30 08:20:10',amount:700,status:'expired'},
  {id:'202508201122',account:'ox_4ErAUEeTJi2AOCE7uRXXa0',time:'2025-08-20 14:15:33',amount:900,status:'done'},
  {id:'202508103344',account:'maomao1',time:'2025-08-10 10:50:28',amount:4000,status:'done'},
  {id:'202507305566',account:'ox_5h96bJSdpswV0aOZ8ndkJi',time:'2025-07-30 16:40:12',amount:250,status:'expired'},
  {id:'202507207788',account:'testuser001',time:'2025-07-20 11:25:55',amount:1800,status:'done'},
  {id:'202507109900',account:'ox_1l91Vgs2UxTAYSnmdh5d8T',time:'2025-07-10 09:05:30',amount:600,status:'expired'},
  {id:'202506301122',account:'maomao1',time:'2025-06-30 13:35:18',amount:2200,status:'done'},
  {id:'202506203344',account:'ox_4ErAUEeTJi2AOCE7uRXXa0',time:'2025-06-20 15:50:42',amount:350,status:'expired'},
  {id:'202506105566',account:'testuser001',time:'2025-06-10 08:10:05',amount:1100,status:'done'},
  {id:'202505307788',account:'ox_5h96bJSdpswV0aOZ8ndkJi',time:'2025-05-30 12:45:30',amount:500,status:'expired'},
  {id:'202505209900',account:'maomao1',time:'2025-05-20 14:20:15',amount:750,status:'done'},
  {id:'202505101122',account:'ox_1l91Vgs2UxTAYSnmdh5d8T',time:'2025-05-10 10:00:00',amount:1600,status:'done'},
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
    rows = '<tr><td colspan="6" style="text-align:center;color:#9CA3AF;padding:24px">無資料</td></tr>';
  } else {
    pageData.forEach(function(item, idx) {
      rows += '<tr>' +
        '<td style="text-align:center">' + (start + idx + 1) + '</td>' +
        '<td><a href="javascript:void(0)" style="color:#2563EB;text-decoration:none">' + item.id + '</a></td>' +
        '<td>' + item.time + '</td>' +
        '<td style="text-align:center">' + item.amount.toLocaleString() + '</td>' +
        '<td style="text-align:center">' + rlStatusText(item.status) + '</td>' +
        '<td>' + item.account + '</td>' +
        '</tr>';
    });
  }

  var topBar = '<div style="padding:8px 0;font-size:13px;color:#374151">總共 ' + total + ' 筆資料</div>';

  var bottomBar = '<div style="display:flex;justify-content:flex-end;align-items:center;padding:12px 0;gap:8px">';
  bottomBar += '<span style="font-size:12px;color:#6B7280">第 ' + rlPage + ' / ' + totalPages + ' 頁</span>';
  bottomBar += '<button class="page-btn" onclick="rlGoPage(1)"' + (rlPage===1?' disabled':'') + '>&laquo;</button>';
  bottomBar += '<button class="page-btn" onclick="rlGoPage(' + (rlPage-1) + ')"' + (rlPage===1?' disabled':'') + '>&lt;</button>';
  for (var i = 1; i <= totalPages; i++) {
    bottomBar += '<button class="page-btn' + (i===rlPage?' active':'') + '" onclick="rlGoPage(' + i + ')">' + i + '</button>';
  }
  bottomBar += '<button class="page-btn" onclick="rlGoPage(' + (rlPage+1) + ')"' + (rlPage===totalPages?' disabled':'') + '>&gt;</button>';
  bottomBar += '<button class="page-btn" onclick="rlGoPage(' + totalPages + ')"' + (rlPage===totalPages?' disabled':'') + '>&raquo;</button>';
  bottomBar += '<select onchange="rlPageSize=+this.value;rlPage=1;renderRlTable()" style="padding:3px 8px;border:1px solid #D1D5DB;border-radius:4px;font-size:12px">';
  [10,20,50].forEach(function(n){ bottomBar += '<option value="' + n + '"' + (n===rlPageSize?' selected':'') + '>' + n + ' 筆/頁</option>'; });
  bottomBar += '</select></div>';

  document.getElementById('rlTableWrap').innerHTML = topBar +
    '<table class="data-table"><thead><tr><th style="text-align:center">順序</th><th>紅包訂單編號</th><th>申請日期</th><th style="text-align:center">紅包總金額</th><th style="text-align:center">領取狀態</th><th>申請人帳號</th></tr></thead><tbody>' + rows + '</tbody></table>' +
    bottomBar;
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
