/**
 * Nova 後臺共用 Sidebar 元件
 * 用法：在頁面 <nav class="sidebar" id="sidebar"></nav> 後引入此 JS
 * 會自動根據當前頁面 URL 標記 active 狀態並展開對應子選單
 */
(function() {
  const MENU = [
    {
      label: '營運管理',
      items: [
        { name: '用戶管理', id: 'userSub', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
          children: [
            { name: '用戶查詢', href: 'nova-user-query.html' }
          ]
        },
        { name: '帳務管理', id: 'financeSub', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8"/><path d="M12 18V6"/></svg>',
          children: [
            { name: '商城管理', href: 'nova-store-management.html' },
            { name: '供應商', href: 'nova-payment-management.html' },
            { name: '支付管理', href: 'nova-payment-methods.html' },
            { name: '儲值金額表', href: 'nova-billing-plans-v2.html' }
          ]
        },
        { name: '報表與查詢', id: 'reportSub', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
          children: [
            { name: '投注紀錄查詢', href: 'nova-bet-records.html' },
            { name: '交易紀錄查詢', href: 'nova-transaction-records.html' },
            { name: '會員支付查詢', href: 'nova-member-payment.html' },
            { name: '道具查詢', href: 'nova-item-query.html' }
          ]
        }
      ]
    },
    {
      label: '前台管理',
      items: [
        { name: '遊戲管理', id: 'gamesSub', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
          children: [
            { name: '娛樂城管理', href: 'nova-hall-management.html' },
            { name: '遊戲排序維護', href: 'nova-game-sort.html' },
            { name: '遊戲設定', href: 'nova-game-settings.html' },
            { name: '轉帳額度確認', href: 'nova-transfer-quota.html' }
          ]
        },
        { name: '公會管理', id: 'guildSub', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
          children: [
            { name: '公會列表', href: 'nova-guild-list.html' },
            { name: '提領監控', href: 'nova-guild-withdraw.html' },
            { name: '操作記錄', href: 'nova-guild-log.html' },
            { name: '貢獻查詢', href: 'nova-guild-contribution.html' },
            { name: '紅包審核', href: 'nova-redpacket-review.html' },
            { name: '紅包紀錄', href: 'nova-redpacket-log.html' }
          ]
        },
        { name: '活動與任務', id: 'activitySub', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
          children: [
            { name: '活動設定', href: 'nova-event-settings.html' },
            { name: '廣告排序清單', href: 'nova-ad-sort.html' },
            { name: '任務設定', href: 'nova-task-settings.html' }
          ]
        }
      ]
    },
    {
      label: '內容與社群',
      items: [
        { name: '內容發布', id: 'contentSub', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
          children: [
            { name: '橫幅管理', href: 'nova-banner.html' },
            { name: '跑馬燈管理', href: 'nova-marquee.html' },
            { name: '公告管理', href: 'nova-announcement.html' }
          ]
        },
        { name: '社群管控', id: 'communitySub', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
          children: [
            { name: '禁用語設定', href: 'nova-banned-words.html' },
            { name: '聊天室監控', href: 'nova-chat-monitor.html' },
            { name: '大聲公監控', href: 'nova-shout-monitor.html' }
          ]
        }
      ]
    },
    {
      label: '系統設定',
      items: [
        { name: '基本設定', id: 'settingsSub', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
          children: [
            { name: '系統設定', href: 'nova-system-settings.html' },
            { name: '序號產生', href: 'nova-serial-gen.html' },
            { name: '道具清單', href: 'nova-item-list.html' },
            { name: '系統維護', href: 'nova-maintenance.html' }
          ]
        },
        { name: '帳號管理', id: 'permSub', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>',
          children: [
            { name: '角色設定', href: 'nova-admin-roles.html' },
            { name: '帳號設定', href: 'nova-admin-users.html' },
            { name: '操作日誌', href: 'nova-account-log.html' }
          ]
        }
      ]
    }
  ];

  const currentPage = location.pathname.split('/').pop() || 'index.html';

  function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    let html = '';
    html += '<div class="sidebar-logo"><div class="logo-icon">N</div><div class="logo-text"><div class="logo-name">Nova</div><div class="logo-sub">測試後台</div></div></div>';
    html += '<div class="sidebar-nav">';

    for (const group of MENU) {
      html += '<div class="sidebar-group">';
      html += `<div class="sidebar-group-label">${group.label}</div>`;

      for (const item of group.items) {
        const hasActive = item.children.some(c => c.href === currentPage);
        const chevronClass = hasActive ? 'sidebar-chevron open' : 'sidebar-chevron';
        html += `<div class="sidebar-item" onclick="toggleSub('${item.id}')">${item.icon}${item.name}<svg class="${chevronClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></div>`;
        html += `<div class="sidebar-sub${hasActive ? ' open' : ''}" id="${item.id}">`;
        for (const child of item.children) {
          const activeClass = child.href === currentPage ? ' active' : '';
          html += `<a class="sidebar-item${activeClass}" href="${child.href}">${child.name}</a>`;
        }
        html += '</div>';
      }
      html += '</div>';
    }

    html += '</div>'; // sidebar-nav
    html += `<div class="sidebar-user" onclick="toggleUserMenu()">
      <div class="user-avatar">C</div>
      <div class="user-info"><div class="user-name">Casper Admin</div><div class="user-role">casper</div></div>
      <svg class="user-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="6" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="18" r="1.5"/></svg>
      <div class="user-popover" id="userPopover">
        <div class="user-popover-header">
          <div class="user-avatar">C</div>
          <div class="user-popover-info"><div class="user-popover-name">Casper Admin</div><div class="user-popover-sub">casper</div><div class="user-popover-sub">Admin</div></div>
        </div>
        <div class="user-popover-divider"></div>
        <a class="user-popover-item" href="#">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>登出
        </a>
      </div>
    </div>`;

    sidebar.innerHTML = html;
  }

  // Toggle submenu
  window.toggleSub = function(id) {
    const sub = document.getElementById(id);
    if (!sub) return;
    const isOpen = sub.classList.contains('open');
    // Close all
    document.querySelectorAll('.sidebar-sub').forEach(s => s.classList.remove('open'));
    document.querySelectorAll('.sidebar-chevron').forEach(c => c.classList.remove('open'));
    // Open clicked (if was closed)
    if (!isOpen) {
      sub.classList.add('open');
      sub.previousElementSibling.querySelector('.sidebar-chevron').classList.add('open');
    }
  };

  // Toggle user menu
  window.toggleUserMenu = function() {
    const el = document.querySelector('.sidebar-user');
    el.classList.toggle('open');
    if (event) event.stopPropagation();
  };

  // Close user menu on outside click
  document.addEventListener('click', function(e) {
    const u = document.querySelector('.sidebar-user');
    if (u && !u.contains(e.target)) u.classList.remove('open');
  });

  renderSidebar();
})();
