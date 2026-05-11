// Store Management JS
const storeData = [
  { id: 1, type: '一般', name: '信用卡儲值', provider: '綠界科技', method: '信用卡', channel: '通道A', vip: 'VIP1-VIP6', sort: 1, status: 'on' },
  { id: 2, type: '一般', name: 'ATM轉帳儲值', provider: '藍新金流', method: 'ATM轉帳', channel: '通道B', vip: 'VIP2-VIP6', sort: 2, status: 'on' },
  { id: 3, type: '快速', name: '快速儲值-100', amounts: '100,300,500,1000', min: 100, max: 5000, vip: 'VIP1-VIP6', sort: 3, status: 'on' },
  { id: 4, type: '快速', name: '快速儲值-VIP', amounts: '500,1000,3000,5000', min: 500, max: 10000, vip: 'VIP3-VIP6', sort: 4, status: 'off' },
  { id: 5, type: '一般', name: '超商代碼儲值', provider: '綠界科技', method: '超商代碼', channel: '通道A', vip: 'VIP1-VIP4', sort: 5, status: 'on' },
  { id: 6, type: '一般', name: '銀聯卡儲值', provider: '藍新金流', method: '信用卡', channel: '通道B', vip: 'VIP4-VIP6', sort: 6, status: 'off' },
];

let storePage = 1, storePageSize = 20, storeFiltered = [...storeData];

function renderStoreTable() {
  const start = (storePage - 1) * storePageSize;
  const page = storeFiltered.slice(start, start + storePageSize);
  let html = `<table class="data-table"><thead><tr>
    <th style="width:40px"><input type="checkbox" onchange="toggleAllStore(this)"></th>
    <th>ID</th><th>類型</th><th>名稱</th><th>適用VIP</th><th>排序</th><th>狀態</th><th>操作</th>
  </tr></thead><tbody>`;
  page.forEach(r => {
    const statusClass = r.status === 'on' ? 'on' : 'off';
    html += `<tr>
      <td><input type="checkbox" class="store-cb" value="${r.id}"></td>
      <td>${r.id}</td>
      <td><span class="badge ${r.type === '快速' ? 'badge-warning' : 'badge-info'}">${r.type}儲值</span></td>
      <td>${r.name}</td>
      <td>${r.vip}</td>
      <td>${r.sort}</td>
      <td><button class="toggle ${statusClass}" onclick="toggleStoreStatus(${r.id},this)"></button></td>
      <td class="actions">
        <button class="btn-icon" title="編輯" onclick="openStoreEditModal(${r.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
        <button class="btn-icon" title="刪除" onclick="deleteStoreItem(${r.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>
      </td>
    </tr>`;
  });
  html += '</tbody></table>';
  document.getElementById('storeTableContainer').innerHTML = html;
  document.getElementById('storePageInfo').textContent = `共 ${storeFiltered.length} 筆`;
  renderStorePages();
}

function renderStorePages() {
  const total = Math.ceil(storeFiltered.length / storePageSize) || 1;
  let html = '';
  for (let i = 1; i <= total; i++) {
    html += `<button class="${i === storePage ? 'active' : ''}" onclick="storePage=${i};renderStoreTable()">${i}</button>`;
  }
  document.getElementById('storePageButtons').innerHTML = html;
}

function changeStorePageSize(v) { storePageSize = +v; storePage = 1; renderStoreTable(); }

function applyStoreFilter() {
  const name = document.getElementById('storeFilterName').value.trim().toLowerCase();
  const status = document.getElementById('storeFilterStatus').value;
  const type = document.getElementById('storeFilterType').value;
  storeFiltered = storeData.filter(r => {
    if (name && !r.name.toLowerCase().includes(name)) return false;
    if (status && r.status !== status) return false;
    if (type && r.type !== type) return false;
    return true;
  });
  storePage = 1;
  renderStoreTable();
}

function resetStoreFilter() {
  document.getElementById('storeFilterName').value = '';
  document.getElementById('storeFilterStatus').value = '';
  document.getElementById('storeFilterType').value = '';
  storeFiltered = [...storeData];
  storePage = 1;
  renderStoreTable();
}

function toggleStoreStatus(id, btn) {
  const item = storeData.find(r => r.id === id);
  if (item) { item.status = item.status === 'on' ? 'off' : 'on'; }
  btn.className = 'toggle ' + item.status;
}

function toggleAllStore(cb) {
  document.querySelectorAll('.store-cb').forEach(c => c.checked = cb.checked);
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
  document.getElementById('storeModalTitle').textContent = '新增儲值類型';
  document.getElementById('smType').value = '';
  document.getElementById('smName').value = '';
  document.getElementById('smSort').value = '0';
  document.getElementById('smStatus').className = 'toggle on';
  document.getElementById('smGeneralFields').style.display = '';
  document.getElementById('smFastFields').style.display = 'none';
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
  document.getElementById('smSort').value = item.sort;
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

// Init
document.addEventListener('DOMContentLoaded', renderStoreTable);
