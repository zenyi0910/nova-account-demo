/**
 * Nova 系統維護 v15
 * 維護範圍：全站 / 星幣（移除付款通道）
 */

// === Mock Data ===
var maintData = {
  scope: '全站',
  startTime: '2026-05-25 12:42:00',
  endTime: '2026-05-25 12:42:59',
  maintainType: '維護更新',
  maintainUrl: '/systemMaintenance',
  content: '緊急維護中，敬請見諒',
  memo: '測試',
  subDomain: 'https://sewer.edcft.click'
};

var historyData = [
  {id:1, scope:'全站', start:'2026-05-25 12:42:00', end:'2026-05-25 12:42:59', type:'維護更新', operator:'casper', createdAt:'2026-05-25 12:41:30'},
  {id:2, scope:'星幣', start:'2026-05-20 03:00:00', end:'2026-05-20 05:00:00', type:'緊急更新', operator:'superadmin', createdAt:'2026-05-20 02:55:00'},
  {id:3, scope:'全站', start:'2026-05-15 02:00:00', end:'2026-05-15 04:00:00', type:'維護更新', operator:'casper', createdAt:'2026-05-15 01:50:00'},
  {id:4, scope:'全站', start:'2026-05-10 01:00:00', end:'2026-05-10 03:30:00', type:'維護更新', operator:'superadmin', createdAt:'2026-05-10 00:45:00'},
  {id:5, scope:'星幣', start:'2026-05-05 22:00:00', end:'2026-05-06 02:00:00', type:'緊急更新', operator:'casper', createdAt:'2026-05-05 21:50:00'},
  {id:6, scope:'全站', start:'2026-04-28 03:00:00', end:'2026-04-28 06:00:00', type:'維護更新', operator:'superadmin', createdAt:'2026-04-28 02:55:00'},
  {id:7, scope:'全站', start:'2026-04-20 02:00:00', end:'2026-04-20 04:00:00', type:'維護更新', operator:'casper', createdAt:'2026-04-20 01:50:00'},
  {id:8, scope:'星幣', start:'2026-04-15 01:00:00', end:'2026-04-15 03:00:00', type:'緊急更新', operator:'superadmin', createdAt:'2026-04-15 00:45:00'},
  {id:9, scope:'全站', start:'2026-04-10 03:00:00', end:'2026-04-10 05:00:00', type:'維護更新', operator:'casper', createdAt:'2026-04-10 02:50:00'},
  {id:10, scope:'全站', start:'2026-04-05 02:00:00', end:'2026-04-05 04:30:00', type:'維護更新', operator:'superadmin', createdAt:'2026-04-05 01:55:00'},
  {id:11, scope:'星幣', start:'2026-03-30 01:00:00', end:'2026-03-30 03:00:00', type:'緊急更新', operator:'casper', createdAt:'2026-03-30 00:50:00'},
  {id:12, scope:'全站', start:'2026-03-25 03:00:00', end:'2026-03-25 05:00:00', type:'維護更新', operator:'superadmin', createdAt:'2026-03-25 02:50:00'}
];

// === Render ===
function renderMaint() {
  var html = '';
  // Header
  html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">';
  html += '<button class="btn-add" onclick="openHistoryModal()"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> 歷史紀錄</button>';
  html += '<div class="seg-control">';
  html += '<button class="seg-btn' + (maintData.scope === '全站' ? ' active' : '') + '" onclick="switchScope(\'全站\')">全站</button>';
  html += '<button class="seg-btn' + (maintData.scope === '星幣' ? ' active' : '') + '" onclick="switchScope(\'星幣\')">星幣</button>';
  html += '</div></div>';

  // Form card
  html += '<div style="background:#fff;border:1px solid #E5E7EB;border-radius:14px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,.1),0 1px 2px rgba(0,0,0,.1)">';
  html += '<div class="form-row">';
  html += '<div class="form-group"><label>維護開始時間</label><input type="datetime-local" class="form-control" id="maintStart" value="' + toDatetimeLocal(maintData.startTime) + '"></div>';
  html += '<div class="form-group"><label>維護結束時間</label><input type="datetime-local" class="form-control" id="maintEnd" value="' + toDatetimeLocal(maintData.endTime) + '"></div>';
  html += '</div>';
  html += '<div class="form-row">';
  html += '<div class="form-group"><label>維護類型 <span style="color:#DC2626">*</span></label><select class="form-control" id="maintType"><option' + (maintData.maintainType==='維護更新'?' selected':'') + '>維護更新</option><option' + (maintData.maintainType==='緊急更新'?' selected':'') + '>緊急更新</option></select></div>';
  html += '<div class="form-group"><label>維護網址</label><input type="text" class="form-control" id="maintUrl" placeholder="請輸入維護網址" value="' + maintData.maintainUrl + '"></div>';
  html += '</div>';
  html += '<div class="form-group" style="margin-bottom:16px"><label>維護公告內容 <span style="color:#DC2626">*</span></label><textarea class="form-control" id="maintContent" rows="3" placeholder="輸入跑馬燈內容">' + maintData.content + '</textarea></div>';
  html += '<div class="form-row">';
  html += '<div class="form-group"><label>備註 <span style="color:#DC2626">*</span></label><textarea class="form-control" id="maintMemo" rows="2" placeholder="請輸入備註">' + maintData.memo + '</textarea></div>';
  html += '<div class="form-group"><label>維護白名單域名</label><input type="text" class="form-control" id="maintWhitelist" placeholder="請輸入維護白名單域名" value="' + maintData.subDomain + '"></div>';
  html += '</div>';
  html += '<div style="display:flex;justify-content:flex-end;margin-top:16px"><button class="btn btn-dark" onclick="saveMaint()"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg> 儲存</button></div>';
  html += '</div>';

  document.getElementById('maintContent').innerHTML = html;
}

function toDatetimeLocal(str) {
  return str ? str.replace(' ', 'T').substring(0, 16) : '';
}

function switchScope(scope) {
  maintData.scope = scope;
  renderMaint();
}

function saveMaint() {
  maintData.startTime = document.getElementById('maintStart').value.replace('T', ' ') + ':00';
  maintData.endTime = document.getElementById('maintEnd').value.replace('T', ' ') + ':00';
  maintData.maintainType = document.getElementById('maintType').value;
  maintData.maintainUrl = document.getElementById('maintUrl').value;
  maintData.content = document.getElementById('maintContent').value;
  maintData.memo = document.getElementById('maintMemo').value;
  maintData.subDomain = document.getElementById('maintWhitelist').value;
  showToast('儲存成功', 'success');
}

// === History Modal ===
var histPage = 1;
var histPageSize = 10;

function openHistoryModal() {
  histPage = 1;
  var html = '<div class="modal-overlay show" id="histModal" style="display:flex">';
  html += '<div class="modal" style="max-width:750px;transition:all .3s">';
  html += '<div class="modal-header"><h3>歷史紀錄</h3>';
  html += '<div style="display:flex;align-items:center;gap:4px">';
  html += '<button style="background:none;border:none;cursor:pointer;color:#6B7280;padding:4px" onclick="var m=this.closest(\'.modal\');if(m.style.maxWidth===\'100%\'){m.style.maxWidth=\'750px\';m.style.width=\'90%\';m.style.height=\'\';m.style.maxHeight=\'85vh\';m.style.borderRadius=\'12px\'}else{m.style.maxWidth=\'100%\';m.style.width=\'100%\';m.style.height=\'100vh\';m.style.maxHeight=\'100vh\';m.style.borderRadius=\'0\'}"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg></button>';
  html += '<button class="modal-close" onclick="closeHistModal()">&times;</button></div></div>';
  html += '<div class="modal-body" id="histBody"></div>';
  html += '<div class="modal-footer" id="histFooter"></div>';
  html += '</div></div>';
  document.body.insertAdjacentHTML('beforeend', html);
  renderHistory();
}

function closeHistModal() {
  var m = document.getElementById('histModal');
  if (m) m.remove();
}

function renderHistory() {
  var total = historyData.length;
  var totalPages = Math.ceil(total / histPageSize);
  var start = (histPage - 1) * histPageSize;
  var pageData = historyData.slice(start, start + histPageSize);

  var html = '<div style="margin-bottom:12px;display:flex;justify-content:space-between;font-size:12px;color:#6B7280"><span>第 ' + histPage + ' 頁，共 ' + total + ' 筆資料</span><span>每頁顯示 ' + histPageSize + ' 筆</span></div>';
  html += '<table class="data-table"><thead><tr><th>維護範圍</th><th>開始時間</th><th>結束時間</th><th>維護類型</th><th>操作人員</th><th>建立時間</th></tr></thead><tbody>';
  pageData.forEach(function(r) {
    html += '<tr><td><span class="status-badge ' + (r.scope === '全站' ? 'status-online' : 'status-maint') + '">' + r.scope + '</span></td>';
    html += '<td>' + r.start + '</td><td>' + r.end + '</td>';
    html += '<td>' + r.type + '</td><td>' + r.operator + '</td><td>' + r.createdAt + '</td></tr>';
  });
  html += '</tbody></table>';
  document.getElementById('histBody').innerHTML = html;

  // pagination
  var phtml = '<div style="display:flex;align-items:center;gap:4px">';
  phtml += '<button class="btn btn-outline" style="padding:4px 10px;font-size:12px" ' + (histPage<=1?'disabled':'') + ' onclick="histPage--;renderHistory()">‹</button>';
  for (var i = 1; i <= totalPages; i++) {
    phtml += '<button class="btn ' + (i===histPage?'btn-dark':'btn-outline') + '" style="padding:4px 10px;font-size:12px" onclick="histPage=' + i + ';renderHistory()">' + i + '</button>';
  }
  phtml += '<button class="btn btn-outline" style="padding:4px 10px;font-size:12px" ' + (histPage>=totalPages?'disabled':'') + ' onclick="histPage++;renderHistory()">›</button>';
  phtml += '</div>';
  document.getElementById('histFooter').innerHTML = phtml;
}

// === Toast ===
function showToast(msg, type) {
  var el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast ' + (type || 'success') + ' show';
  setTimeout(function() { el.className = 'toast'; }, 2500);
}

// === 移除付款通道 ===
function togglePaymentFields() {
  var scope = document.getElementById('schedScope').value;
  document.getElementById('paymentFields').style.display = 'none';
}

// === Init ===
renderMaint();
