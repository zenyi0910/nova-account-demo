// === 推薦設定新增遊戲 modal ===
function openAddRecommendModal() {
  const modal = document.getElementById('addRecommendModal');
  const tabLabel = recommendSubTab === 'recent' ? '近期爆獎' : '最受歡迎';
  if (!modal) {
    const modalHtml = `
<div class="modal-overlay" id="addRecommendModal">
  <div class="modal" style="max-width:500px">
    <div class="modal-header">
      <h3 id="addRecommendModalTitle">${tabLabel} - 新增遊戲</h3>
      <button class="modal-expand" onclick="toggleExpand(this)">⤢</button>
      <button class="modal-close" onclick="closeModal('addRecommendModal')">&times;</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label>娛樂城 <span style="color:#DC2626">*</span></label>
        <select id="addRecHall" class="form-control">
          <option value="">請選擇娛樂城</option>
          <option value="VA">VA 娛樂城</option>
          <option value="YGR">YGR 娛樂城</option>
          <option value="JDB">JDB 娛樂城</option>
          <option value="PG">PG 娛樂城</option>
          <option value="PP">PP 娛樂城</option>
          <option value="CQ9">CQ9 娛樂城</option>
          <option value="RSG">RSG 娛樂城</option>
          <option value="FC">FC 娛樂城</option>
        </select>
      </div>
      <div class="form-group">
        <label>遊戲名稱 <span style="color:#DC2626">*</span></label>
        <select id="addRecGame" class="form-control">
          <option value="">請選擇遊戲</option>
        </select>
      </div>
      <div class="form-group">
        <label>圖片 <span style="color:#DC2626">*</span></label>
        <div style="font-size:12px;color:#F59E0B;margin-bottom:6px">建議尺寸：512 x 1024 px</div>
        <div class="upload-area" onclick="document.getElementById('recImageInput').click()" style="width:100%;height:200px;border:2px dashed #D1D5DB;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#FAFAFA;cursor:pointer;transition:all .2s">
          <svg viewBox="0 0 24 24" fill="none" stroke="#00bba7" stroke-width="2" width="40" height="40" style="margin-bottom:12px">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <div style="font-size:13px;color:#374151;margin-bottom:4px">點擊或拖放圖片至此處</div>
          <div style="font-size:11px;color:#9CA3AF;margin-top:2px">支援 JPG、PNG、GIF、WEBP 格式，最大 10MB</div>
          <button type="button" class="btn btn-outline" style="margin-top:12px;padding:6px 16px;font-size:12px" onclick="event.stopPropagation();document.getElementById('recImageInput').click()">選擇圖片</button>
        </div>
        <input type="file" id="recImageInput" accept="image/jpeg,image/png,image/gif,image/webp" style="display:none" onchange="handleRecImageUpload(event)">
        <div id="recImagePreview" style="margin-top:8px;display:none">
          <img id="recImagePreviewImg" style="max-width:100%;max-height:200px;border-radius:6px;border:1px solid oklch(0.922 0 0)">
        </div>
      </div>
    </div>
    <div class="modal-footer">
      ${UI.btn.modalFooter('新增', 'submitAddRecommend()', 'closeModal("addRecommendModal")')}
    </div>
  </div>
</div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // 娛樂城選擇變更時更新遊戲列表
    document.getElementById('addRecHall').addEventListener('change', function() {
      const hallId = this.value;
      const gameSelect = document.getElementById('addRecGame');
      gameSelect.innerHTML = '<option value="">請選擇遊戲</option>';
      if (hallId) {
        const hallGames = games.filter(g => g.hall === hallId && !g.recommend);
        hallGames.forEach(g => {
          gameSelect.innerHTML += `<option value="${g.id}">${g.name}</option>`;
        });
      }
    });
  } else {
    // modal 已存在，更新標題
    document.getElementById('addRecommendModalTitle').textContent = tabLabel + ' - 新增遊戲';
  }
  document.getElementById('addRecommendModal').classList.add('show');
}

function handleRecImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  if (file.size > 10 * 1024 * 1024) {
    showToast('圖片大小不能超過 10MB', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('recImagePreviewImg').src = e.target.result;
    document.getElementById('recImagePreview').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function submitAddRecommend() {
  const hallId = document.getElementById('addRecHall').value;
  const gameId = parseInt(document.getElementById('addRecGame').value);
  const imageInput = document.getElementById('recImageInput');
  
  if (!hallId) {
    showToast('請選擇娛樂城', 'warning');
    return;
  }
  if (!gameId) {
    showToast('請選擇遊戲', 'warning');
    return;
  }
  if (!imageInput.files.length) {
    showToast('請上傳圖片', 'warning');
    return;
  }
  
  const game = games.find(g => g.id === gameId);
  if (game) {
    game.recommend = true;
    closeModal('addRecommendModal');
    renderRecommendModalContent();
    renderTable();
    showToast(game.name + ' 已加入推薦', 'success');
  }
}

// === 上傳推薦遊戲長條圖 ===
function uploadBanner(gameId) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/jpeg,image/png,image/gif,image/webp';
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      showToast('圖片大小不能超過 10MB', 'error');
      return;
    }
    showToast('圖片上傳成功', 'success');
  };
  input.click();
}

// === 預覽推薦遊戲長條圖 ===
function previewBanner(gameId) {
  const game = games.find(g => g.id === gameId);
  if (!game) return;
  
  // 有圖片：另開分頁預覽
  if (game.bannerUrl) {
    window.open(game.bannerUrl, '_blank');
    return;
  }
  
  // 無圖片：顯示 modal 提示
  const modal = document.getElementById('bannerPreviewModal');
  if (!modal) {
    const modalHtml = `
<div class="modal-overlay" id="bannerPreviewModal">
  <div class="modal" style="max-width:600px">
    <div class="modal-header">
      <h3 id="bannerPreviewTitle">遊戲長條圖預覽</h3>
      <button class="modal-close" onclick="closeModal('bannerPreviewModal')">&times;</button>
    </div>
    <div class="modal-body" style="text-align:center">
      <div style="padding:40px;background:#F5F5F5;border-radius:8px">
        <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5" width="80" height="80">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="3" y1="15" x2="21" y2="15"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
        </svg>
        <div style="margin-top:16px;font-size:13px;color:#6B7280">尚未上傳圖片</div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal('bannerPreviewModal')">關閉</button>
    </div>
  </div>
</div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
  
  document.getElementById('bannerPreviewTitle').textContent = game.name + ' - 遊戲長條圖';
  document.getElementById('bannerPreviewModal').classList.add('show');
}

// === 共用設定 Icon 新增 modal ===
function openAddIconModal() {
  const modal = document.getElementById('addIconModal');
  if (!modal) {
    const modalHtml = `
<div class="modal-overlay" id="addIconModal">
  <div class="modal" style="max-width:500px">
    <div class="modal-header">
      <h3>媒體共用設定 - Icon新增</h3>
      <button class="modal-expand" onclick="toggleExpand(this)">⤢</button>
      <button class="modal-close" onclick="closeModal('addIconModal')">&times;</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label>Icon名稱 <span style="color:#DC2626">*</span></label>
        <input type="text" id="iconName" class="form-control" placeholder="請輸入Icon名稱">
      </div>
      <div class="form-group">
        <label>Logo圖片 <span style="color:#DC2626">*</span></label>
        <div class="upload-area" onclick="document.getElementById('iconImageInput').click()" style="width:100%;height:200px;border:2px dashed #D1D5DB;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#FAFAFA;cursor:pointer;transition:all .2s">
          <svg viewBox="0 0 24 24" fill="none" stroke="#00bba7" stroke-width="2" width="40" height="40" style="margin-bottom:12px">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <div style="font-size:13px;color:#374151;margin-bottom:4px">點擊或拖放圖片至此處</div>
          <div style="font-size:11px;color:#9CA3AF;margin-top:4px">支援 JPG、PNG、GIF、WEBP 格式，最大 10MB</div>
          <button type="button" class="btn btn-outline" style="margin-top:12px;padding:6px 16px;font-size:12px" onclick="event.stopPropagation();document.getElementById('iconImageInput').click()">瀏覽圖片</button>
        </div>
        <input type="file" id="iconImageInput" accept="image/jpeg,image/png,image/gif,image/webp" style="display:none" onchange="handleIconImageUpload(event)">
        <div id="iconImagePreview" style="margin-top:8px;display:none">
          <img id="iconImagePreviewImg" style="max-width:100%;max-height:200px;border-radius:6px;border:1px solid oklch(0.922 0 0)">
        </div>
      </div>
    </div>
    <div class="modal-footer">
      ${UI.btn.modalFooter('新增', 'submitAddIcon()', 'closeModal("addIconModal")')}
    </div>
  </div>
</div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
  document.getElementById('addIconModal').classList.add('show');
}

function handleIconImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  if (file.size > 10 * 1024 * 1024) {
    showToast('圖片大小不能超過 10MB', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('iconImagePreviewImg').src = e.target.result;
    document.getElementById('iconImagePreview').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function submitAddIcon() {
  const iconName = document.getElementById('iconName').value.trim();
  const imageInput = document.getElementById('iconImageInput');
  
  if (!iconName) {
    showToast('請輸入Icon名稱', 'warning');
    return;
  }
  if (!imageInput.files.length) {
    showToast('請上傳Logo圖片', 'warning');
    return;
  }
  
  closeModal('addIconModal');
  showToast('Icon 新增成功', 'success');
}

// === 歷史記錄 Modal ===
var historyPage = 1;
var historyPageSize = 10;
var historyFilterHall = '';
var historyFilterStart = '';
var historyFilterEnd = '';

function getHistoryData() {
  const now = new Date();
  let expired = [];
  Object.entries(halls).forEach(([hid, hall]) => {
    hall.schedules.forEach((s, i) => {
      const endTime = s.end ? new Date(s.end) : null;
      if (endTime && endTime < now) {
        expired.push({hallId: hid, hallName: hall.name, sched: s, idx: i});
      }
    });
  });
  // Add mock history data for demo
  const mockHistory = [
    {hallId:'VA',hallName:'VA 娛樂城',sched:{start:'2025-04-20 02:00',end:'2025-04-20 06:00',note:'例行維護',operator:'admin'},idx:99},
    {hallId:'YGR',hallName:'YGR 娛樂城',sched:{start:'2025-04-18 03:00',end:'2025-04-18 05:00',note:'緊急修復',operator:'casper'},idx:99},
    {hallId:'JDB',hallName:'JDB 娛樂城',sched:{start:'2025-04-15 01:00',end:'2025-04-15 04:00',note:'版本更新',operator:'admin'},idx:99},
    {hallId:'PG',hallName:'PG 娛樂城',sched:{start:'2025-04-12 02:00',end:'2025-04-12 06:00',note:'例行維護',operator:'casper'},idx:99},
    {hallId:'VA',hallName:'VA 娛樂城',sched:{start:'2025-04-10 00:00',end:'2025-04-10 03:00',note:'資料庫遷移',operator:'admin'},idx:99},
    {hallId:'PP',hallName:'PP 娛樂城',sched:{start:'2025-04-08 02:00',end:'2025-04-08 05:00',note:'例行維護',operator:'casper'},idx:99},
    {hallId:'CQ9',hallName:'CQ9 娛樂城',sched:{start:'2025-04-05 01:00',end:'2025-04-05 04:00',note:'供應商維護',operator:'admin'},idx:99},
    {hallId:'RSG',hallName:'RSG 娛樂城',sched:{start:'2025-04-02 03:00',end:'2025-04-02 06:00',note:'例行維護',operator:'casper'},idx:99},
    {hallId:'FC',hallName:'FC 娛樂城',sched:{start:'2025-03-30 02:00',end:'2025-03-30 05:00',note:'版本更新',operator:'admin'},idx:99},
    {hallId:'VA',hallName:'VA 娛樂城',sched:{start:'2025-03-28 01:00',end:'2025-03-28 04:00',note:'例行維護',operator:'casper'},idx:99},
    {hallId:'YGR',hallName:'YGR 娛樂城',sched:{start:'2025-03-25 02:00',end:'2025-03-25 06:00',note:'緊急修復',operator:'admin'},idx:99},
    {hallId:'JDB',hallName:'JDB 娛樂城',sched:{start:'2025-03-22 03:00',end:'2025-03-22 05:00',note:'例行維護',operator:'casper'},idx:99},
    {hallId:'PG',hallName:'PG 娛樂城',sched:{start:'2025-03-20 00:00',end:'2025-03-20 04:00',note:'供應商維護',operator:'admin'},idx:99},
    {hallId:'PP',hallName:'PP 娛樂城',sched:{start:'2025-03-18 02:00',end:'2025-03-18 05:00',note:'例行維護',operator:'casper'},idx:99},
    {hallId:'CQ9',hallName:'CQ9 娛樂城',sched:{start:'2025-03-15 01:00',end:'2025-03-15 03:00',note:'版本更新',operator:'admin'},idx:99},
    {hallId:'RSG',hallName:'RSG 娛樂城',sched:{start:'2025-03-12 02:00',end:'2025-03-12 06:00',note:'例行維護',operator:'casper'},idx:99},
    {hallId:'VA',hallName:'VA 娛樂城',sched:{start:'2025-03-10 03:00',end:'2025-03-10 05:00',note:'緊急修復',operator:'admin'},idx:99},
    {hallId:'FC',hallName:'FC 娛樂城',sched:{start:'2025-03-08 02:00',end:'2025-03-08 04:00',note:'例行維護',operator:'casper'},idx:99},
    {hallId:'YGR',hallName:'YGR 娛樂城',sched:{start:'2025-03-05 01:00',end:'2025-03-05 05:00',note:'供應商維護',operator:'admin'},idx:99},
    {hallId:'JDB',hallName:'JDB 娛樂城',sched:{start:'2025-03-02 02:00',end:'2025-03-02 06:00',note:'例行維護',operator:'casper'},idx:99},
  ];
  expired = expired.concat(mockHistory);
  // Apply filters
  if (historyFilterHall) {
    expired = expired.filter(item => item.hallId === historyFilterHall);
  }
  if (historyFilterStart) {
    expired = expired.filter(item => item.sched.start >= historyFilterStart);
  }
  if (historyFilterEnd) {
    expired = expired.filter(item => item.sched.end <= historyFilterEnd + ' 23:59');
  }
  // Sort by end time desc
  expired.sort((a, b) => (b.sched.end || '').localeCompare(a.sched.end || ''));
  return expired;
}

function openHistoryModal() {
  historyPage = 1;
  historyFilterHall = '';
  historyFilterStart = '';
  historyFilterEnd = '';
  let modal = document.getElementById('historyModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'historyModal';
    modal.innerHTML =
      '<div class="modal" style="max-width:750px">' +
        '<div class="modal-header"><h3>歷史記錄</h3><button class="modal-expand" onclick="toggleExpand(this)">⤢</button><button class="modal-close" onclick="closeModal(\'historyModal\')">&times;</button></div>' +
        '<div class="modal-body" style="padding:16px 20px">' +
          '<div style="display:flex;gap:10px;align-items:flex-end;margin-bottom:14px;flex-wrap:wrap">' +
            '<div class="filter-group"><label>娛樂城</label><select id="histHallFilter" onchange="filterHistory()" style="padding:6px 10px;border:1px solid #E5E7EB;border-radius:6px;font-size:12px;min-width:130px"><option value="">全部</option><option value="VA">VA 娛樂城</option><option value="YGR">YGR 娛樂城</option><option value="JDB">JDB 娛樂城</option><option value="PG">PG 娛樂城</option><option value="PP">PP 娛樂城</option><option value="CQ9">CQ9 娛樂城</option><option value="RSG">RSG 娛樂城</option><option value="FC">FC 娛樂城</option></select></div>' +
            '<div class="filter-group"><label>開始時間</label><input type="date" id="histStartFilter" onchange="filterHistory()" style="padding:6px 10px;border:1px solid #E5E7EB;border-radius:6px;font-size:12px"></div>' +
            '<div class="filter-group"><label>結束時間</label><input type="date" id="histEndFilter" onchange="filterHistory()" style="padding:6px 10px;border:1px solid #E5E7EB;border-radius:6px;font-size:12px"></div>' +
            '<button class="btn btn-outline" onclick="resetHistoryFilter()" style="padding:6px 12px;font-size:12px">重置</button>' +
          '</div>' +
          '<div id="historyTableWrap"></div>' +
          '<div id="historyPagination" style="margin-top:12px"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
  }
  modal.classList.add('show');
  renderHistoryTable();
}

function filterHistory() {
  historyFilterHall = document.getElementById('histHallFilter').value;
  historyFilterStart = document.getElementById('histStartFilter').value;
  historyFilterEnd = document.getElementById('histEndFilter').value;
  historyPage = 1;
  renderHistoryTable();
}

function resetHistoryFilter() {
  document.getElementById('histHallFilter').value = '';
  document.getElementById('histStartFilter').value = '';
  document.getElementById('histEndFilter').value = '';
  historyFilterHall = '';
  historyFilterStart = '';
  historyFilterEnd = '';
  historyPage = 1;
  renderHistoryTable();
}

function renderHistoryTable() {
  const data = getHistoryData();
  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / historyPageSize));
  if (historyPage > totalPages) historyPage = totalPages;
  const start = (historyPage - 1) * historyPageSize;
  const pageData = data.slice(start, start + historyPageSize);

  let rows = '';
  if (pageData.length === 0) {
    rows = '<tr><td colspan="5" style="text-align:center;color:#9CA3AF;padding:24px">無歷史記錄</td></tr>';
  } else {
    pageData.forEach(item => {
      const s = item.sched;
      rows += '<tr>' +
        '<td>' + item.hallName + '</td>' +
        '<td>' + fmtDT(s.start) + '</td>' +
        '<td>' + fmtDT(s.end) + '</td>' +
        '<td>' + (s.note || '-') + '</td>' +
        '<td>' + (s.operator || 'casper') + '</td></tr>';
    });
  }

  document.getElementById('historyTableWrap').innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;font-size:12px;color:#6B7280">' +
      '<span>第 ' + historyPage + ' 頁，共 ' + total + ' 筆資料</span>' +
      '<div>每頁 <select onchange="historyPageSize=+this.value;historyPage=1;renderHistoryTable()" style="padding:2px 6px;border:1px solid #E5E7EB;border-radius:4px;font-size:12px">' +
        '<option value="10"' + (historyPageSize===10?' selected':'') + '>10</option>' +
        '<option value="20"' + (historyPageSize===20?' selected':'') + '>20</option>' +
        '<option value="50"' + (historyPageSize===50?' selected':'') + '>50</option></select> 筆</div></div>' +
    '<table class="data-table"><thead><tr><th>娛樂城</th><th>開始時間</th><th>結束時間</th><th>備註</th><th>操作者</th></tr></thead><tbody>' + rows + '</tbody></table>';

  // Pagination buttons
  let pgHtml = '<div style="display:flex;justify-content:flex-end"><div class="pagination-pages">';
  pgHtml += '<button ' + (historyPage<=1?'disabled':'') + ' onclick="historyPage--;renderHistoryTable()">&lt;</button>';
  for (var i = 1; i <= totalPages; i++) {
    pgHtml += '<button class="' + (i===historyPage?'active':'') + '" onclick="historyPage='+i+';renderHistoryTable()">' + i + '</button>';
  }
  pgHtml += '<button ' + (historyPage>=totalPages?'disabled':'') + ' onclick="historyPage++;renderHistoryTable()">&gt;</button>';
  pgHtml += '</div></div>';
  document.getElementById('historyPagination').innerHTML = pgHtml;
}
