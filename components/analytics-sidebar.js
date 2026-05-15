/**
 * Nova 數據後臺共用 Sidebar 元件
 * 用法：<aside class="sidebar" id="analyticsSidebar"></aside> + <script src="components/analytics-sidebar.js"></script>
 * 自動根據當前頁面 URL 標記 active 狀態
 */
(function() {
  const MENU = [
    {
      label: '管理總覽',
      items: [
        { name: '即時 KPI 牆', href: 'analytics-kpi-wall.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><polyline points="7 10 12 5 17 10 22 5"/></svg>' },
        { name: '登入數據', href: 'analytics-login-data.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>' }
      ]
    },
    {
      label: '運營數據分析',
      items: [
        { name: '營收報表', href: 'analytics-revenue.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>' },
        { name: '留存率', href: 'analytics-retention.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>' }
      ]
    },
    {
      label: '金幣數據分析',
      items: [
        { name: '產出與消耗', href: 'analytics-coin-flow.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 010 4H8M12 18V6"/></svg>' },
        { name: '金幣總量趨勢', href: 'analytics-coin-trend.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
        { name: '餘額分佈', href: 'analytics-coin-balance.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' }
      ]
    },
    {
      label: '儲值報表',
      items: [
        { name: '儲值總表', href: 'analytics-topup-summary.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' },
        { name: '儲值品項明細', href: 'analytics-topup-item-detail.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' }
      ]
    },
    {
      label: '遊戲數據',
      items: [
        { name: '玩家排行榜', href: 'analytics-player-ranking.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M18 2H6v7a6 6 0 0012 0V2z"/></svg>' },
        { name: '遊戲排行榜', href: 'analytics-game-ranking.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>' },
        { name: '遊戲明細', href: 'analytics-game-detail.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' }
      ]
    },
    {
      label: '風控管理',
      items: [
        { name: '交易明細', href: 'analytics-transaction-detail.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' },
        { name: '高風險明細', href: 'analytics-high-risk.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' }
      ]
    },
    {
      label: '系統管理',
      items: [
        { name: '帳號權限管理', href: 'analytics-admin.html', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>' }
      ]
    }
  ];

  const currentPage = location.pathname.split('/').pop() || 'index.html';

  function renderSidebar() {
    const sidebar = document.getElementById('analyticsSidebar');
    if (!sidebar) return;

    let html = '';
    // Logo + collapse button
    html += '<div class="sidebar-header">';
    html += '<div class="sidebar-logo"><span class="sidebar-logo-icon">N</span><span class="sidebar-logo-text">NOVA ANALYTICS</span></div>';
    html += '<button class="sidebar-collapse-btn" onclick="document.querySelector(\'.sidebar\').classList.toggle(\'collapsed\')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><polyline points="15 9 13 12 15 15"/></svg></button>';
    html += '</div>';

    // Nav area (scrollable)
    html += '<nav class="sidebar-nav">';
    for (const group of MENU) {
      html += '<div class="menu-group">';
      html += `<div class="menu-group-title">${group.label}</div>`;
      for (const item of group.items) {
        const activeClass = item.href === currentPage ? ' active' : '';
        html += `<a href="${item.href}" class="menu-item${activeClass}" style="text-decoration:none">${item.icon}<span>${item.name}</span></a>`;
      }
      html += '</div>';
    }
    html += '</nav>';

    // Footer (fixed)
    html += '<div class="sidebar-footer">';
    html += '<div class="sidebar-user" onclick="document.getElementById(\'userPopover\').classList.toggle(\'show\')">';
    html += '<div class="avatar">SU</div>';
    html += '<div class="sidebar-user-info">';
    html += '<div style="font-weight:600;font-size:13px;color:#1E293B">superadmin</div>';
    html += '<div style="font-size:11px;color:#94A3B8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">superadmin@nova-analytics.com</div>';
    html += '</div>';
    html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2"><circle cx="12" cy="6" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="18" r="1.5"/></svg>';
    html += '</div>';
    html += '<div class="user-popover" id="userPopover">';
    html += '<div class="popover-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>通知設定</div>';
    html += '<div class="popover-divider"></div>';
    html += '<div class="popover-item popover-logout"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>登出</div>';
    html += '<div class="popover-divider"></div>';
    html += '<div class="popover-user"><div class="popover-avatar">Y</div><div class="popover-user-info"><div class="popover-user-name">Yi</div><div class="popover-user-email">yi@nova-analytics.com</div></div></div>';
    html += '</div>';
    html += '</div>';

    sidebar.innerHTML = html;
  }

  // Close popover on outside click
  document.addEventListener('click', function(e) {
    const popover = document.getElementById('userPopover');
    const userBtn = document.querySelector('.sidebar-user');
    if (popover && userBtn && !userBtn.contains(e.target) && !popover.contains(e.target)) {
      popover.classList.remove('show');
    }
  });

  renderSidebar();
})();
