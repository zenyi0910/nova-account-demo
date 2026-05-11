/**
 * Nova UI 共用元件庫 v2
 * 統一按鈕、Modal、表單、表格、Badge、Toggle 的產生方式
 * 用法：UI.btn.dark('儲存', 'save()') → 回傳 HTML string
 */

// 自動注入元件庫 CSS（seg-control 等）
(function() {
  if (document.getElementById('ui-components-css')) return;
  const style = document.createElement('style');
  style.id = 'ui-components-css';
  style.textContent = [
    '.seg-control{display:inline-flex;background:oklch(0.95 0.003 264.542);border-radius:10px;padding:4px;box-shadow:inset 0 2px 4px rgba(0,0,0,0.1)}',
    '.seg-btn{padding:5px 16px;border:none;background:transparent;cursor:pointer;font-size:12px;font-family:inherit;color:#6B7280;border-radius:8px;font-weight:500;transition:all .15s}',
    '.seg-btn.active{background:#fff;color:#393939;font-weight:600;box-shadow:0 4px 10px rgba(0,0,0,0.2),0 1px 3px rgba(0,0,0,0.15);transform:translateY(-0.5px)}',
    '.seg-btn:hover:not(.active){background:rgba(255,255,255,0.5)}'
  ].join('\n');
  document.head.appendChild(style);
})();

const UI = {
  // ═══ 按鈕 ═══
  btn: {
    /** 深色主按鈕 */
    dark(text, onclick, opts = {}) {
      const cls = ['btn', 'btn-dark', opts.sm ? 'btn-sm' : ''].filter(Boolean).join(' ');
      const icon = opts.icon ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">${opts.icon}</svg> ` : '';
      return `<button class="${cls}" onclick="${onclick}"${opts.title ? ' title="'+opts.title+'"' : ''}>${icon}${text}</button>`;
    },
    /** 搜尋按鈕 */
    search(text, onclick) {
      return `<button class="btn btn-search" onclick="${onclick}" style="padding:7px 16px;font-size:13px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> ${text}</button>`;
    },
    /** 輪廓按鈕 */
    outline(text, onclick, opts = {}) {
      const cls = ['btn', 'btn-outline', opts.sm ? 'btn-sm' : ''].filter(Boolean).join(' ');
      return `<button class="${cls}" onclick="${onclick}">${text}</button>`;
    },
    /** 綠色新增按鈕（頁面級） */
    add(text, onclick, opts = {}) {
      const sm = opts.sm ? ' style="padding:4px 10px;font-size:12px;line-height:1"' : '';
      const iconSize = opts.sm ? 12 : 14;
      return `<button class="btn-add" onclick="${onclick}"${sm}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${iconSize}" height="${iconSize}" style="vertical-align:middle;margin-right:4px;position:relative;top:-1px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg><span style="vertical-align:middle">${text}</span></button>`;
    },
    /** 灰色次要按鈕 */
    secondary(text, onclick, opts = {}) {
      const icon = opts.icon || '';
      return `<button class="btn-sort" onclick="${onclick}">${icon}${text}</button>`;
    },
    /** 危險按鈕 */
    danger(text, onclick) {
      return `<button class="btn btn-danger" onclick="${onclick}">${text}</button>`;
    },
    /** Modal footer 按鈕組（取消 + 確認）— 共用元件 */
    modalFooter(confirmText, confirmOnclick, cancelOnclick) {
      cancelOnclick = cancelOnclick || "closeModal(event.target.closest('.modal-overlay').id)";
      return `<div class="modal-footer"><button class="btn-cancel" onclick="${cancelOnclick}">取消</button><button class="btn-confirm" onclick="${confirmOnclick}">${confirmText}</button></div>`;
    },
    /** 工具列按鈕組（取消 + 新增）— 共用元件 */
    toolbarActions(confirmText, confirmOnclick, cancelOnclick) {
      cancelOnclick = cancelOnclick || '';
      const plus = confirmText.includes('新增') ? '＋ ' : '';
      return `<button class="btn-toolbar-cancel" onclick="${cancelOnclick}">取消</button><button class="btn-toolbar-confirm" onclick="${confirmOnclick}">${plus}${confirmText}</button>`;
    },
    /** 圖示按鈕（編輯/刪除/上傳） */
    icon(type, onclick, title) {
      const svgs = {
        edit: '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>',
        delete: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
        upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
        more: '<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>',
        plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'
      };
      return `<button class="btn-icon-action ${type}" onclick="${onclick}" title="${title || type}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">${svgs[type] || ''}</svg></button>`;
    }
  },

  // ═══ SVG 圖示 ═══
  icon: {
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    sort: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="9" y2="18"/></svg>',
    save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    drag: '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><path d="M12 2v5"/><path d="M14.829 15.998a3 3 0 1 1-5.658 0"/><path d="M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z"/></svg>',
    monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
  },

  // ═══ Modal ═══
  modal: {
    open(id) { document.getElementById(id).classList.add('show'); },
    close(id) { document.getElementById(id).classList.remove('show'); },
    /** 產生 modal HTML 結構 */
    create(id, title, bodyHtml, opts = {}) {
      const width = opts.width || '520px';
      const footer = opts.footer || `<button class="btn btn-outline" onclick="UI.modal.close('${id}')">取消</button>`;
      return `<div class="modal-overlay" id="${id}"><div class="modal" style="max-width:${width}">` +
        `<div class="modal-header"><h3>${title}</h3><button class="modal-expand" onclick="toggleExpand(this)">⤢</button><button class="modal-close" onclick="UI.modal.close('${id}')">&times;</button></div>` +
        `<div class="modal-body">${bodyHtml}</div>` +
        (opts.noFooter ? '' : `<div class="modal-footer">${footer}</div>`) +
        `</div></div>`;
    }
  },

  // ═══ 表單 ═══
  form: {
    /** 下拉選單 */
    select(id, label, options, opts = {}) {
      const req = opts.required ? ' <span style="color:#DC2626">*</span>' : '';
      const change = opts.onchange ? ` onchange="${opts.onchange}"` : '';
      const optHtml = options.map(o =>
        typeof o === 'string' ? `<option value="${o}">${o}</option>`
          : `<option value="${o.value}"${o.selected ? ' selected' : ''}>${o.label}</option>`
      ).join('');
      return `<div class="form-group"><label>${label}${req}</label><select id="${id}" class="form-control"${change}>${optHtml}</select></div>`;
    },
    /** 文字/數字輸入 */
    input(id, label, opts = {}) {
      const req = opts.required ? ' <span style="color:#DC2626">*</span>' : '';
      const type = opts.type || 'text';
      const ph = opts.placeholder || '';
      const val = opts.value !== undefined ? ` value="${opts.value}"` : '';
      const hint = opts.hint ? `<div class="form-hint">${opts.hint}</div>` : '';
      return `<div class="form-group"><label>${label}${req}</label><input type="${type}" id="${id}" class="form-control" placeholder="${ph}"${val}>${hint}</div>`;
    },
    /** 日期時間 */
    datetime(id, label, opts = {}) {
      const req = opts.required ? ' <span style="color:#DC2626">*</span>' : '';
      const hint = opts.hint ? `<div class="form-hint">${opts.hint}</div>` : '';
      return `<div class="form-group"><label>${label}${req}</label><input type="datetime-local" id="${id}" class="form-control">${hint}</div>`;
    },
    /** 時間 */
    time(id, label, opts = {}) {
      const req = opts.required ? ' <span style="color:#DC2626">*</span>' : '';
      const hint = opts.hint ? `<div class="form-hint">${opts.hint}</div>` : '';
      return `<div class="form-group"><label>${label}${req}</label><input type="time" id="${id}" class="form-control">${hint}</div>`;
    },
    /** 兩欄排列 */
    row(...fields) {
      return `<div class="form-row">${fields.join('')}</div>`;
    }
  },

  // ═══ 表格 ═══
  table: {
    /** 建立表格 */
    create(columns, rows, opts = {}) {
      let html = '<table class="data-table"><thead><tr>';
      columns.forEach(col => {
        const w = col.width ? ` style="width:${col.width}"` : '';
        html += `<th${w}>${col.label}</th>`;
      });
      html += '</tr></thead><tbody>';
      if (rows.length === 0) {
        html += `<tr><td colspan="${columns.length}" style="text-align:center;padding:30px;color:#9CA3AF">${opts.empty || '無資料'}</td></tr>`;
      } else {
        rows.forEach(row => {
          const attrs = row._attrs || '';
          html += `<tr${attrs}>`;
          (Array.isArray(row) ? row : row.cells).forEach(cell => { html += `<td>${cell}</td>`; });
          html += '</tr>';
        });
      }
      html += '</tbody></table>';
      return html;
    }
  },

  // ═══ 提示 ═══
  tips(text) {
    return `<div class="tips-box">${this.icon.bulb}<span>Tips</span> ${text}</div>`;
  },
  infoBox(text) {
    return `<div class="info-box">${text}</div>`;
  },

  // ═══ Badge ═══
  badge(text, type) {
    const cls = { on: 'badge-on', off: 'badge-off', maint: 'badge-maint', soon: 'badge-soon' };
    return `<span class="badge ${cls[type] || ''}">${text}</span>`;
  },
  /** 根據遊戲狀態自動選 badge */
  statusBadge(status) {
    const map = { '使用中': 'on', '停用中': 'off', '維護中': 'maint', '即將上線': 'soon' };
    return this.badge(status, map[status] || '');
  },

  // ═══ Toggle 開關 ═══
  toggle(status, onclick) {
    return `<button class="toggle ${status}" onclick="${onclick}"></button>`;
  },

  // ═══ Segmented Control ═══
  segmented(items, opts = {}) {
    const id = opts.id || '';
    let html = `<div class="seg-control"${id ? ' id="'+id+'"' : ''}>`;
    items.forEach(item => {
      html += `<button class="seg-btn${item.active ? ' active' : ''}" onclick="${item.onclick}">${item.label}</button>`;
    });
    html += '</div>';
    return html;
  },

  // ═══ Toggle Button Group ═══
  toggleGroup(items) {
    let html = '<div class="toggle-btn-group">';
    items.forEach(item => {
      html += `<button class="toggle-btn${item.active ? ' active' : ''}" onclick="${item.onclick}">${item.label}</button>`;
    });
    html += '</div>';
    return html;
  },

  // ═══ Filter Bar ═══
  filterGroup(label, inputHtml) {
    return `<div class="filter-group"><label>${label}</label>${inputHtml}</div>`;
  },

  // ═══ Toast ═══
  toast(msg, type) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = 'toast ' + (type || 'success') + ' show';
    setTimeout(() => { el.className = 'toast'; }, 2500);
  }
};

// 全域 shortcut
function showToast(msg, type) { UI.toast(msg, type); }
function closeModal(id) { UI.modal.close(id); }
function toggleExpand(btn) {
  const modal = btn.closest('.modal');
  modal.classList.toggle('expanded');
  btn.textContent = modal.classList.contains('expanded') ? '⤡' : '⤢';
}
