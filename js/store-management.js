// Store Management JS - 對照 Nova 後台實際頁面
const storeData = [
  { id: 1, type: '一般', name: '線上轉點', provider: 'MyCard', method: '線上轉點', channel: '線上轉點', vip: ['新手','金牌','鑽石','銀牌','白金','銅牌'], status: 'on' },
  { id: 2, type: '一般', name: '電信帳單', provider: 'MyCard', method: '電信帳單', channel: '手機小額付款', vip: ['新手','白金','金牌','鑽石','銅牌','銀牌'], status: 'on' },
  { id: 3, type: '一般', name: 'Gash錢包扣點', provider: 'Gash', method: '會員扣點', channel: '錢包扣點', vip: ['新手','白金','銅牌','鑽石','銀牌','金牌'], status: 'on' },
  { id: 4, type: '一般', name: 'LINE Pay儲值', provider: 'LINE Pay', method: '行動支付', channel: 'LINE Pay', vip: ['新手','金牌','鑽石'], status: 'on' },
  { id: 5, type: '一般', name: 'MyCard點數卡', provider: 'MyCard', method: '點數卡', channel: '點數卡', vip: ['新手','銅牌','銀牌','金牌','白金','鑽石'], status: 'on' },
  { id: 6, type: '快速', name: '快速儲值1', vip: ['VIP1','VIP2','VIP3','VIP4','VIP5','VIP6'], status: 'off' },
  { id: 7, type: '快速', name: '快速儲值2', vip: ['VIP1','VIP2','VIP3','VIP4','VIP5','VIP6'], status: 'on' },
];

let storePage = 1, storePageSize = 20, storeFiltered = [...storeData], currentTab = '一般';

function renderVipBadges(vips) {
  return vips.map(v => `<span class="vip-badge"><svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>${v}</span>`).join('');
}

function renderStoreTable() {
  const start = (storePage - 1) * storePageSize;
  const tabData = storeFiltered.filter(r => r.type === currentTab);
  const page = tabData.slice(start, start + storePageSize);
  let html = '';

  if (currentTab === '一般') {
    html = `<table class="data-table"><thead><tr>
      <th>供應商</th><th>項目名稱</th><th>支付方式</th><th>付款通道</th><th>狀態</th><th>適用 VIP 等級</th><th>操作</th>
    </tr></thead><tbody>`;
    page.forEach(r => {
      const statusClass = r.status === 'on' ? 'on' : 'off';
      const statusText = r.status === 'on' ? '<span class="status-on">啟用</span>' : '<span class="status-off">停用</span>';
      html += `<tr>
        <td>${r.provider || '-'}</td>
        <td>${r.name}</td>
        <td>${r.method || '-'}</td>
        <td><span class="channel-check">✓ ${r.channel || '-'}</span></td>
        <td><button class="toggle ${statusClass}" onclick="toggleStoreStatus(${r.id},this)"></button>${statusText}</td>
        <td class="vip-cell">${renderVipBadges(r.vip)}</td>
        <td class="actions">
          <button class="btn-icon" title="編輯" onclick="openStoreEditModal(${r.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
          <button class="btn-icon btn-delete" title="刪除" onclick="deleteStoreItem(${r.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>
          <button class="btn-icon" title="更多">⋮</button>
        </td>
      </tr>`;
    });
  } else {
    html = `<table class="data-table"><thead><tr>
      <th>項目名稱</th><th>使用 VIP</th><th>狀態</th><th>操作</th>
    </tr></thead><tbody>`;
    page.forEach(r => {
      const statusClass = r.status === 'on' ? 'on' : 'off';
      const statusText = r.status === 'on' ? '<span class="status-on">啟用</span>' : '<span class="status-off">停用</span>';
      html += `<tr>
        <td><a href="#" class="link-name">${r.name}</a></td>
        <td class="vip-cell">${renderVipBadges(r.vip)}</td>
        <td><button class="toggle ${statusClass}" onclick="toggleStoreStatus(${r.id},this)"></button>${statusText}</td>
        <td class="actions">
          <button class="btn-icon btn-delete" title="刪除" onclick="deleteStoreItem(${r.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>
          <button class="btn-icon" title="更多">⋮</button>
        </td>
      </tr>`;
    });
  }
  html += '</tbody></table>';
  document.getElementById('storeTableContainer').innerHTML = html;
  document.getElementById('storePageInfo').textContent = `第 ${storePage} 頁，共 ${tabData.length} 筆資料`;
  renderStorePages(tabData.length);
}

function renderStorePages(total) {
  const pages = Math.ceil(total / storePageSize) || 1;
  let html = '';
  for (let i = 1; i <= pages; i++) {
    html += `<button class="${i === storePage ? 'active' : ''}" onclick="storePage=${i};renderStoreTable()">${i}</button>`;
  }
  document.getElementById('storePageButtons').innerHTML = html;
}

function switchTab(tab) {
  currentTab = tab;
  storePage = 1;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  // Update add button text
  document.getElementById('addBtnText').textContent = tab === '一般' ? '新增一般儲值' : '新增快速儲值';
  renderStoreTable();
}

function changeStorePageSize(v) { storePageSize = +v; storePage = 1; renderStoreTable(); }

function applyStoreFilter() {
  const status = document.getElementById('storeFilterStatus').value;
  storeFiltered = storeData.filter(r => {
    if (status && r.status !== status) return false;
    return true;
  });
  storePage = 1;
  renderStoreTable();
}

function resetStoreFilter() {
  document.getElementById('storeFilterStatus').value = '';
  storeFiltered = [...storeData];
  storePage = 1;
  renderStoreTable();
}

function toggleStoreStatus(id, btn) {
  const item = storeData.find(r => r.id === id);
  if (item) { item.status = item.status === 'on' ? 'off' : 'on'; }
  btn.className = 'toggle ' + item.status;
  const span = btn.nextElementSibling;
  if (span) { span.className = item.status === 'on' ? 'status-on' : 'status-off'; span.textContent = item.status === 'on' ? '啟用' : '停用'; }
}

function toggleStoreTypeFields() {
  const type = document.getElementById('smType').value;
  document.getElementById('smGeneralFields').style.display = type === '快速' ? 'none' : '';
  document.getElementById('smFastFields').style.display = type === '快速' ? '' : 'none';
}

function toggleAllVip(cb) {
  document.querySelectorAll('.vip-cb').forEach(c => c.checked = cb.checked);
}

function openStoreAddModal() {
  document.getElementById('storeModalTitle').textContent = currentTab === '一般' ? '新增一般儲值' : '新增快速儲值';
  document.getElementById('smType').value = currentTab;
  document.getElementById('smName').value = '';
  document.getElementById('smSort').value = '0';
  document.getElementById('smStatus').className = 'toggle on';
  toggleStoreTypeFields();
  document.querySelectorAll('.vip-cb').forEach(c => c.checked = false);
  document.querySelector('[value="all"]').checked = false;
  if (document.getElementById('smDesc')) document.getElementById('smDesc').value = '';
  if (document.getElementById('smProvider')) document.getElementById('smProvider').value = '';
  if (document.getElementById('smMethod')) document.getElementById('smMethod').value = '';
  if (document.getElementById('smChannel')) document.getElementById('smChannel').value = '';
  if (document.getElementById('smAmountList')) document.getElementById('smAmountList').value = '';
  if (document.getElementById('smMinAmount')) document.getElementById('smMinAmount').value = '';
  if (document.getElementById('smMaxAmount')) document.getElementById('smMaxAmount').value = '';
  document.getElementById('storeModal').classList.add('active');
}

function openStoreEditModal(id) {
  const item = storeData.find(r => r.id === id);
  if (!item) return;
  document.getElementById('storeModalTitle').textContent = '編輯儲值類型';
  document.getElementById('smType').value = item.type;
  document.getElementById('smName').value = item.name;
  document.getElementById('smSort').value = item.sort || 0;
  document.getElementById('smStatus').className = 'toggle ' + item.status;
  toggleStoreTypeFields();
  document.getElementById('storeModal').classList.add('active');
}

function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function saveStoreItem() {
  const type = document.getElementById('smType').value;
  const name = document.getElementById('smName').value.trim();
  if (!type || !name) { alert('請填寫必填欄位'); return; }
  alert('儲存成功（Demo）');
  closeModal('storeModal');
}

function deleteStoreItem(id) {
  if (!confirm('確定要刪除此項目？')) return;
  const idx = storeData.findIndex(r => r.id === id);
  if (idx > -1) storeData.splice(idx, 1);
  storeFiltered = [...storeData];
  renderStoreTable();
}

document.addEventListener('DOMContentLoaded', renderStoreTable);
