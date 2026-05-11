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
let fastRows = []; // 快速儲值 modal 明細列

function renderVipBadges(vips) {
  return vips.map(v => `<span class="vip-badge"><svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>${v}</span>`).join('');
}

function renderStoreTable() {
  const tabData = storeFiltered.filter(r => r.type === currentTab);
  const start = (storePage - 1) * storePageSize;
  const page = tabData.slice(start, start + storePageSize);
  let html = '';

  if (currentTab === '一般') {
    html = `<table class="data-table"><thead><tr>
      <th>供應商</th><th>項目名稱</th><th>支付方式</th><th>付款通道</th><th>狀態</th><th>適用 VIP 等級</th><th>操作</th>
    </tr></thead><tbody>`;
    page.forEach(r => {
      const sc = r.status === 'on' ? 'on' : 'off';
      const st = r.status === 'on' ? '<span class="status-on">啟用</span>' : '<span class="status-off">停用</span>';
      html += `<tr>
        <td>${r.provider || '-'}</td>
        <td>${r.name}</td>
        <td>${r.method || '-'}</td>
        <td><span class="channel-check">✓ ${r.channel || '-'}</span></td>
        <td><div class="toggle-wrap"><button class="toggle ${sc}" onclick="toggleStoreStatus(${r.id},this)"></button>${st}</div></td>
        <td class="vip-cell">${renderVipBadges(r.vip)}</td>
        <td class="actions">
          <div class="actions-wrap">
          ${UI.btn.icon('edit', 'openStoreEditModal('+r.id+')', '編輯')}
          ${UI.btn.icon('delete', 'deleteStoreItem('+r.id+')', '刪除')}
          ${UI.btn.icon('more', '', '更多')}
          </div>
        </td>
      </tr>`;
    });
  } else {
    html = `<table class="data-table"><thead><tr>
      <th>項目名稱</th><th>使用 VIP</th><th>狀態</th><th>操作</th>
    </tr></thead><tbody>`;
    page.forEach(r => {
      const sc = r.status === 'on' ? 'on' : 'off';
      const st = r.status === 'on' ? '<span class="status-on">啟用</span>' : '<span class="status-off">停用</span>';
      html += `<tr>
        <td><a href="#" class="link-name">${r.name}</a></td>
        <td class="vip-cell">${renderVipBadges(r.vip)}</td>
        <td><div class="toggle-wrap"><button class="toggle ${sc}" onclick="toggleStoreStatus(${r.id},this)"></button>${st}</div></td>
        <td class="actions">
          <div class="actions-wrap">
          ${UI.btn.icon('edit', 'openStoreEditModal('+r.id+')', '編輯')}
          ${UI.btn.icon('delete', 'deleteStoreItem('+r.id+')', '刪除')}
          ${UI.btn.icon('more', '', '更多')}
          </div>
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
  const label = tab === '一般' ? '新增一般儲值' : '新增快速儲值';
  document.getElementById('toolbarBtns').innerHTML = UI.btn.add(label, 'openStoreAddModal()');
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

// Modal logic
function openStoreAddModal() {
  if (currentTab === '一般') {
    document.getElementById('generalModal').classList.add('active');
    document.getElementById('gmTitle').textContent = '新增一般儲值';
    document.getElementById('gmName').value = '';
    document.getElementById('gmProvider').value = '';
    document.getElementById('gmMethod').value = '';
    document.getElementById('gmChannel').value = '';
    document.getElementById('gmVip').value = '';
    document.getElementById('gmStatus').className = 'toggle on';
  } else {
    document.getElementById('fastModal').classList.add('active');
    document.getElementById('fmTitle').textContent = '新增快速儲值';
    document.getElementById('fmName').value = '';
    document.getElementById('fmVip').value = '';
    document.getElementById('fmStatus').className = 'toggle on';
    fastRows = [{ provider: '', method: '', channel: '', amount: '', basePoints: 0, ratio: 0, bonus: 0, total: 0 }];
    renderFastRows();
  }
}

function openStoreEditModal(id) {
  const item = storeData.find(r => r.id === id);
  if (!item) return;
  if (item.type === '一般') {
    document.getElementById('generalModal').classList.add('active');
    document.getElementById('gmTitle').textContent = '編輯一般儲值';
    document.getElementById('gmName').value = item.name;
    document.getElementById('gmProvider').value = item.provider || '';
    document.getElementById('gmMethod').value = item.method || '';
    document.getElementById('gmChannel').value = item.channel || '';
    document.getElementById('gmStatus').className = 'toggle ' + item.status;
  } else {
    document.getElementById('fastModal').classList.add('active');
    document.getElementById('fmTitle').textContent = '編輯快速儲值';
    document.getElementById('fmName').value = item.name;
    document.getElementById('fmStatus').className = 'toggle ' + item.status;
    fastRows = [{ provider: '', method: '', channel: '', amount: '', basePoints: 0, ratio: 0, bonus: 0, total: 0 }];
    renderFastRows();
  }
}

function renderFastRows() {
  const tbody = document.getElementById('fastRowsBody');
  let html = '';
  fastRows.forEach((r, i) => {
    html += `<tr>
      <td>${i + 1}</td>
      <td><select class="sm-select"><option value="">請選擇供應商</option><option>MyCard</option><option>Gash</option><option>LINE Pay</option></select></td>
      <td><select class="sm-select"><option value="">請選擇支付方式</option><option>線上轉點</option><option>電信帳單</option><option>點數卡</option></select></td>
      <td><select class="sm-select"><option value="">請選擇付款通道</option><option>線上轉點</option><option>手機小額付款</option><option>錢包扣點</option></select></td>
      <td><select class="sm-select"><option value="">請選擇儲值金額</option><option>100</option><option>300</option><option>500</option><option>1000</option></select></td>
      <td>0</td><td>0</td><td>0</td><td>0</td>
      <td><button class="btn-sm-delete" onclick="removeFastRow(${i})">刪除</button></td>
    </tr>`;
  });
  tbody.innerHTML = html;
  document.getElementById('fastRowCount').textContent = fastRows.length;
}

function addFastRow() {
  fastRows.push({ provider: '', method: '', channel: '', amount: '', basePoints: 0, ratio: 0, bonus: 0, total: 0 });
  renderFastRows();
}

function removeFastRow(i) {
  fastRows.splice(i, 1);
  if (fastRows.length === 0) fastRows.push({ provider: '', method: '', channel: '', amount: '', basePoints: 0, ratio: 0, bonus: 0, total: 0 });
  renderFastRows();
}

function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function saveGeneralItem() {
  const name = document.getElementById('gmName').value.trim();
  if (!name) { alert('請填寫項目名稱'); return; }
  alert('儲存成功（Demo）');
  closeModal('generalModal');
}

function saveFastItem() {
  const name = document.getElementById('fmName').value.trim();
  if (!name) { alert('請填寫項目名稱'); return; }
  alert('儲存成功（Demo）');
  closeModal('fastModal');
}

function deleteStoreItem(id) {
  if (!confirm('確定要刪除此項目？')) return;
  const idx = storeData.findIndex(r => r.id === id);
  if (idx > -1) storeData.splice(idx, 1);
  storeFiltered = [...storeData];
  renderStoreTable();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('toolbarBtns').innerHTML = UI.btn.add('新增一般儲值', 'openStoreAddModal()');
  renderStoreTable();
});
