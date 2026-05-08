// === 推薦設定新增遊戲 modal ===
function openAddRecommendModal() {
  const modal = document.getElementById('addRecommendModal');
  if (!modal) {
    const modalHtml = `
<div class="modal-overlay" id="addRecommendModal">
  <div class="modal" style="max-width:500px">
    <div class="modal-header">
      <h3>推薦設定 - 新增遊戲</h3>
      <button class="modal-close" onclick="closeModal('addRecommendModal')">&times;</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label>娛樂城 <span style="color:#DC2626">*</span></label>
        <select id="addRecHall" class="form-control">
          <option value="">請選擇娛樂城</option>
          <option value="VA">VA 娛樂廳</option>
          <option value="YGR">YGR 娛樂廳</option>
          <option value="JDB">JDB 娛樂廳</option>
          <option value="PG">PG 娛樂廳</option>
          <option value="PP">PP 娛樂廳</option>
          <option value="CQ9">CQ9 娛樂廳</option>
          <option value="RSG">RSG 娛樂廳</option>
          <option value="FC">FC 娛樂廳</option>
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
        <div class="upload-area" onclick="document.getElementById('recImageInput').click()" style="width:100%;height:200px;border:2px dashed #D1D5DB;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#FAFAFA;cursor:pointer;transition:all .2s">
          <svg viewBox="0 0 24 24" fill="none" stroke="#00bba7" stroke-width="2" width="40" height="40" style="margin-bottom:12px">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <div style="font-size:13px;color:#374151;margin-bottom:4px">點擊或拖放圖片至此處</div>
          <div style="font-size:11px;color:#9CA3AF">建議尺寸 512 × 1024 px</div>
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
      <button class="btn btn-outline" onclick="closeModal('addRecommendModal')" style="background:#8B7E2A;color:#fff;border:none">取消</button>
      <button class="btn btn-dark" onclick="submitAddRecommend()">新增</button>
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
      <button class="btn btn-outline" onclick="closeModal('addIconModal')" style="background:#8B7E2A;color:#fff;border:none">取消</button>
      <button class="btn btn-dark" onclick="submitAddIcon()">新增</button>
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
