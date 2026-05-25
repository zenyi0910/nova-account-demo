/**
 * Nova Insight 共用 Header/Topbar 元件
 * 用法：<header class="topbar" id="insightTopbar"></header>
 *       <script src="components/header.js"></script>
 * 需在 <script> 前設定 window.INSIGHT_PAGE = { group: '管理總覽', title: '即時 KPI 牆' }
 */
(function() {
  const page = window.INSIGHT_PAGE || { group: '', title: '' };

  function renderTopbar() {
    const topbar = document.getElementById('insightTopbar');
    if (!topbar) return;

    let html = '';
    // Mobile menu button
    html += '<button class="mobile-menu-btn" onclick="document.getElementById(\'insightSidebar\').classList.add(\'mobile-open\');document.getElementById(\'sidebarOverlay\').classList.add(\'show\')"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>';

    // Breadcrumb
    html += '<div class="breadcrumb">';
    html += `<span>${page.group}</span>`;
    html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>';
    html += `<span class="current">${page.title}</span>`;
    html += '</div>';

    // Right actions
    html += '<div class="topbar-right">';
    // Auto-refresh pill (only on KPI wall)
    if (page.title === '即時 KPI 牆') {
      var now = new Date(); var hh = String(now.getHours()).padStart(2,'0'); var mm = String(now.getMinutes()).padStart(2,'0');
      html += '<div style="display:inline-flex;align-items:center;gap:6px;border:1px solid #E0E0E0;border-radius:9999px;padding:4px 12px;font-size:12px"><span style="color:#333">自動刷新</span><span id="kpiTime" style="color:#10B981;font-weight:600">' + hh + ':' + mm + '</span></div>';
    }
    html += '<div class="topbar-icon-btn" title="深色模式"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg></div>';
    html += '<div class="topbar-icon-btn" title="通知"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg></div>';
    html += '</div>';

    topbar.innerHTML = html;
  }

  renderTopbar();
})();
