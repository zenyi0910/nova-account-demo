# Generate all analytics pages
import os

BASE_CSS = '''*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#F9FAFB;color:#1E293B;font-size:14px;line-height:1.5;min-height:100vh}
a{color:#3B82F6;text-decoration:none}
.layout{display:flex;min-height:100vh}
.sidebar{width:240px;background:rgba(255,255,255,.85);backdrop-filter:blur(12px);border-right:1px solid rgba(148,163,184,.15);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:10;transition:width .3s ease}
.sidebar.collapsed{width:60px}.sidebar.collapsed .sidebar-logo-text{display:none}.sidebar.collapsed .menu-item{justify-content:center;padding:12px 0;font-size:0;overflow:hidden}.sidebar.collapsed .menu-item svg{font-size:initial;width:20px;height:20px}.sidebar.collapsed .menu-item span{display:none}.sidebar.collapsed .menu-group-title{display:none}.sidebar.collapsed .sidebar-user-info{display:none}.sidebar.collapsed .sidebar-user{justify-content:center;padding:12px 0}.main.sidebar-collapsed{margin-left:60px}
.sidebar-logo{padding:16px 20px;border-bottom:1px solid rgba(148,163,184,.15);display:flex;align-items:center;gap:12px;position:relative}
.sidebar-logo-icon{width:40px;height:40px;flex-shrink:0}.sidebar-logo-icon img{width:40px;height:40px;display:block}
.sidebar-logo-text{display:flex;flex-direction:column;line-height:1.2}
.sidebar-logo-text .logo-nova{font-size:20px;font-weight:700;background:linear-gradient(to right,#3B82F6,#06B6D4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sidebar-logo-text .logo-analytics{font-size:10px;font-weight:400;color:#94A3B8;letter-spacing:0.2em;text-transform:uppercase}
.sidebar-menu{flex:1;padding:12px 8px;overflow-y:auto}
.menu-group{padding:4px 0}.menu-group-title{padding:8px 12px;font-size:11px;color:#94A3B8;text-transform:uppercase;letter-spacing:.5px;font-weight:600}
.menu-item{display:flex;align-items:center;padding:9px 12px;color:#64748B;cursor:pointer;transition:all .2s;font-size:13px;gap:8px;border-radius:8px;margin:1px 0;border-left:3px solid transparent;text-decoration:none}
.menu-item:hover{background:rgba(59,130,246,.08);color:#334155;border-left-color:rgba(59,130,246,.3)}
.menu-item.active{background:rgba(59,130,246,.1);color:#3B82F6;font-weight:500;border-left-color:#3B82F6}
.menu-item svg{width:16px;height:16px;flex-shrink:0}
.sidebar-footer{padding:0;border-top:1px solid rgba(148,163,184,.15)}
.sidebar-user{display:flex;align-items:center;gap:10px;padding:12px 16px;cursor:pointer;transition:all .2s}
.sidebar-user:hover{background:rgba(59,130,246,.06)}.sidebar-user-info{flex:1;min-width:0}
.main{margin-left:240px;flex:1;display:flex;flex-direction:column}
.topbar{height:56px;background:rgba(255,255,255,.8);backdrop-filter:blur(12px);border-bottom:1px solid rgba(148,163,184,.12);display:flex;align-items:center;padding:0 28px;position:sticky;top:0;z-index:5;gap:12px}
.breadcrumb{display:flex;align-items:center;gap:6px;font-size:13px;color:#94A3B8}.breadcrumb span.current{color:#1E293B;font-weight:500}
.topbar-right{display:flex;align-items:center;gap:12px;margin-left:auto}
.topbar-icon-btn{width:36px;height:36px;border:1px solid rgba(148,163,184,.15);border-radius:10px;background:rgba(255,255,255,.8);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#64748B;transition:all .2s}
.topbar-icon-btn:hover{background:#fff;color:#334155;border-color:rgba(59,130,246,.3)}
.content{padding:28px;flex:1}
.card{background:rgba(255,255,255,.6);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.6);border-radius:16px;padding:24px;box-shadow:0 4px 12px rgba(0,0,0,.05);margin-bottom:20px}
.card-title{font-size:16px;font-weight:700;color:#0F172A;display:flex;align-items:center;gap:8px;margin-bottom:4px}.card-title::before{content:'';width:4px;height:20px;background:#2563EB;border-radius:2px}
.card-desc{font-size:13px;color:#64748B;margin-bottom:16px}
.filter-section{background:rgba(255,255,255,.6);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.6);border-radius:16px;padding:24px;box-shadow:0 4px 12px rgba(0,0,0,.05);margin-bottom:20px}
.filter-row{display:flex;gap:16px;flex-wrap:wrap;align-items:flex-end}
.filter-group{display:flex;flex-direction:column;gap:6px}.filter-label{font-size:12px;font-weight:500;color:#64748B}
.filter-input,.filter-select{padding:8px 14px;border:1px solid #E5E7EB;border-radius:8px;font-size:13px;outline:none;min-width:160px;background:#fff}.filter-select{cursor:pointer}
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;font-size:13px;cursor:pointer;border:1px solid transparent;transition:all .2s;font-weight:500}
.btn-primary{background:#2563EB;color:#fff;border:none;font-weight:700}.btn-primary:hover{background:#1d4ed8}
.btn-outline{background:#fff;color:#64748B;border:1px solid #E5E7EB}.btn-outline:hover{background:#F9FAFB}
.table-wrap{overflow-x:auto;border-radius:8px}
table{width:100%;border-collapse:collapse}
th{background:#F9FAFB;padding:12px 14px;text-align:left;font-size:12px;color:#64748B;font-weight:600;border-bottom:1px solid #E5E7EB;white-space:nowrap}
td{padding:12px 14px;border-bottom:1px solid #F1F5F9;font-size:13px;color:#334155}
tr:hover td{background:rgba(59,130,246,.02)}
td a{color:#2563EB;font-weight:500}
.pagination{display:flex;align-items:center;justify-content:space-between;margin-top:16px;font-size:13px;color:#64748B}
.page-btn{padding:6px 11px;border:1px solid #E5E7EB;border-radius:6px;background:#fff;cursor:pointer;font-size:12px;color:#64748B}.page-btn.active{background:#2563EB;color:#fff;border-color:#2563EB}.page-btn:disabled{opacity:.4;cursor:not-allowed}
.avatar{width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,#3B82F6,#06B6D4);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600}
.sidebar-collapse-btn{position:absolute;right:12px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:#fff;border:1px solid #E5E7EB;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#94A3B8;transition:all .2s}.sidebar-collapse-btn:hover{border-color:#3B82F6;color:#3B82F6}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#D0D5DD;border-radius:3px}
@media(max-width:768px){.sidebar{width:60px}.sidebar .sidebar-logo-text,.sidebar .menu-item span,.sidebar .menu-group-title,.sidebar .sidebar-user-info{display:none}.main{margin-left:60px}.content{padding:16px}.filter-row{flex-direction:column}.filter-input,.filter-select{width:100%}}'''

ICONS = {"即時 KPI 牆":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><polyline points="7 10 12 5 17 10 22 5"/></svg>',"登入數據":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',"營收報表":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',"留存率":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',"產出與消耗":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 010 4H8M12 18V6"/></svg>',"金幣總量趨勢":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',"餘額分佈":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',"儲值總表":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',"儲值品項明細":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',"玩家排行榜":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M18 2H6v7a6 6 0 0012 0V2z"/></svg>',"遊戲排行榜":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',"遊戲明細":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',"交易明細":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg>',"高風險明細":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',"帳號權限管理":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'}

MENU = [("管理總覽",[("即時 KPI 牆","analytics-kpi-wall.html"),("登入數據","analytics-login-data.html")]),("運營數據分析",[("營收報表","analytics-revenue.html"),("留存率","analytics-retention.html")]),("金幣數據分析",[("產出與消耗","analytics-coin-flow.html"),("金幣總量趨勢","analytics-coin-trend.html"),("餘額分佈","analytics-coin-balance.html")]),("儲值報表",[("儲值總表","analytics-topup-summary.html"),("儲值品項明細","analytics-topup-item-detail.html")]),("遊戲數據",[("玩家排行榜","analytics-player-ranking.html"),("遊戲排行榜","analytics-game-ranking.html"),("遊戲明細","analytics-game-detail.html")]),("風控管理",[("交易明細","analytics-transaction-detail.html"),("高風險明細","analytics-high-risk.html")]),("系統管理",[("帳號權限管理","index.html")])]

def sb(active):
    h=''
    for g,items in MENU:
        h+=f'<div class="menu-group"><div class="menu-group-title">{g}</div>\n'
        for t,href in items:
            a=' active' if t==active else ''
            h+=f'<a href="{href}" class="menu-item{a}" style="text-decoration:none">{ICONS[t]}<span>{t}</span></a>\n'
        h+='</div>\n'
    return h

def pg(title,bc,active,content,extra_css="",topbar_extra=""):
    bc_html=f'<span>{bc[0]}</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg><span class="current">{bc[1]}</span>'
    return f'''<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} - Nova Analytics</title>
<style>
{BASE_CSS}
{extra_css}
</style>
</head>
<body>
<div class="layout">
<aside class="sidebar" id="sidebar">
<div class="sidebar-logo">
<div class="sidebar-logo-icon"><img src="nova-logo.svg" alt="Nova Logo"></div>
<div class="sidebar-logo-text"><span class="logo-nova">NOVA</span><span class="logo-analytics">Analytics</span></div>
<button class="sidebar-collapse-btn" onclick="document.getElementById('sidebar').classList.toggle('collapsed');document.querySelector('.main').classList.toggle('sidebar-collapsed')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><polyline points="15 9 13 12 15 15"/></svg></button>
</div>
<nav class="sidebar-menu">{sb(active)}</nav>
<div class="sidebar-footer"><div class="sidebar-user"><div class="avatar">SU</div><div class="sidebar-user-info"><div style="font-weight:600;font-size:13px;color:#1E293B">superadmin</div><div style="font-size:11px;color:#94A3B8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">superadmin@nova-analytics.com</div></div><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div></div>
</aside>
<div class="main">
<div class="topbar"><div class="breadcrumb">{bc_html}</div>{topbar_extra}<div class="topbar-right"><div class="topbar-icon-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg></div><div class="topbar-icon-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg></div></div></div>
<div class="content">{content}</div>
</div>
</div>
</body>
</html>'''

print("Generator functions ready")

# Page content definitions
PAGES = {
"analytics-login-data.html": ("登入數據", ["管理總覽","登入數據"], '<span style="font-size:12px;color:#94A3B8;margin-left:auto;margin-right:12px">自動刷新 <span style="color:#3B82F6;font-weight:600">12:21</span></span>', ".chart-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}.chart-card{background:rgba(255,255,255,.6);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.6);border-radius:16px;padding:24px;box-shadow:0 4px 12px rgba(0,0,0,.05)}.chart-title{font-size:15px;font-weight:700;color:#0F172A;margin-bottom:8px}.chart-value{font-size:32px;font-weight:700;color:#0F172A}.chart-subtitle{font-size:12px;color:#94A3B8;margin-bottom:16px}.chart-area{height:200px;background:linear-gradient(180deg,rgba(59,130,246,.05),rgba(59,130,246,.02));border-radius:8px}@media(max-width:768px){.chart-grid{grid-template-columns:1fr}}", '''<div class="chart-grid">
<div class="chart-card"><h3 class="chart-title">登入人數</h3><div class="chart-value">0</div><div class="chart-subtitle">今日最新</div><div class="chart-area"></div></div>
<div class="chart-card"><h3 class="chart-title">遊戲人數</h3><div class="chart-value">0</div><div class="chart-subtitle">今日最新</div><div class="chart-area"></div></div>
</div>
<div class="card" style="margin-top:20px;padding:20px 24px"><ul style="font-size:13px;color:#475569;line-height:2;list-style:disc;padding-left:20px">
<li><strong>登入人數：</strong> 統計每小時遊戲的人數。即使同一個人重複登入多次，也只會計算為 1 人。</li>
<li><strong>遊戲人數：</strong> 統計每小時內至少有過一次投注行為的不重複玩家。</li></ul></div>'''),

"analytics-revenue.html": ("營收報表", ["運營數據分析","營收報表"], "", "", '''<div class="filter-section"><div class="filter-row">
<div class="filter-group"><label class="filter-label">日期範圍</label><input type="text" class="filter-input" value="2026/04/28 - 2026/05/05" readonly></div>
<div class="filter-group"><label class="filter-label">遊戲類型</label><select class="filter-select"><option>全部遊戲</option></select></div>
<button class="btn btn-primary">查詢</button><button class="btn btn-outline">重置</button>
</div></div>
<div class="card"><div class="card-title">營收報表</div><div class="card-desc">追蹤平台整體營收表現與趨勢分析。</div>
<div class="table-wrap"><table><thead><tr><th>日期</th><th>總營收</th><th>儲值金額</th><th>遊戲消耗</th><th>淨利潤</th><th>利潤率(%)</th></tr></thead>
<tbody><tr><td>2026/05/05</td><td>5,755</td><td>5,755</td><td>0</td><td>5,755</td><td>100.0</td></tr>
<tr><td>2026/05/04</td><td>0</td><td>0</td><td>0</td><td>0</td><td>-</td></tr>
<tr><td>2026/05/03</td><td>2,100</td><td>2,100</td><td>850</td><td>1,250</td><td>59.5</td></tr>
<tr><td>2026/05/02</td><td>3,200</td><td>3,200</td><td>1,400</td><td>1,800</td><td>56.3</td></tr>
<tr><td>2026/05/01</td><td>1,500</td><td>1,500</td><td>600</td><td>900</td><td>60.0</td></tr></tbody></table></div>
<div class="pagination"><div>共 5 筆</div><div style="display:flex;gap:4px"><button class="page-btn active">1</button></div></div></div>'''),

"analytics-retention.html": ("留存率", ["運營數據分析","留存率"], "", ".ret-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}.ret-card{background:rgba(255,255,255,.6);border:1px solid rgba(255,255,255,.6);border-radius:12px;padding:20px;text-align:center}.ret-card h4{font-size:12px;color:#64748B;margin-bottom:8px}.ret-card .val{font-size:28px;font-weight:700;color:#0F172A}@media(max-width:768px){.ret-grid{grid-template-columns:1fr 1fr}}", '''<div class="filter-section"><div class="filter-row">
<div class="filter-group"><label class="filter-label">日期範圍</label><input type="text" class="filter-input" value="2026/04/28 - 2026/05/05" readonly></div>
<div class="filter-group"><label class="filter-label">用戶類型</label><select class="filter-select"><option>全部用戶</option><option>付費用戶</option><option>免費用戶</option></select></div>
<button class="btn btn-primary">查詢</button><button class="btn btn-outline">重置</button></div></div>
<div class="ret-grid">
<div class="ret-card"><h4>次日留存</h4><div class="val">42.3%</div></div>
<div class="ret-card"><h4>3日留存</h4><div class="val">28.7%</div></div>
<div class="ret-card"><h4>7日留存</h4><div class="val">18.2%</div></div>
<div class="ret-card"><h4>30日留存</h4><div class="val">8.5%</div></div></div>
<div class="card"><div class="card-title">留存率</div><div class="card-desc">追蹤用戶在不同時間段的回訪比例。</div>
<div class="table-wrap"><table><thead><tr><th>註冊日期</th><th>新增人數</th><th>次日</th><th>3日</th><th>7日</th><th>14日</th><th>30日</th></tr></thead>
<tbody><tr><td>2026/05/05</td><td>1</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td>2026/05/04</td><td>3</td><td>66.7%</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td>2026/05/03</td><td>5</td><td>60.0%</td><td>40.0%</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td>2026/05/02</td><td>4</td><td>50.0%</td><td>25.0%</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td>2026/05/01</td><td>2</td><td>50.0%</td><td>50.0%</td><td>50.0%</td><td>-</td><td>-</td></tr></tbody></table></div>
<div class="pagination"><div>共 5 筆</div><div style="display:flex;gap:4px"><button class="page-btn active">1</button></div></div></div>'''),

"analytics-coin-flow.html": ("產出與消耗", ["金幣數據分析","產出與消耗"], "", ".flow-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}.flow-card{background:rgba(255,255,255,.6);border:1px solid rgba(255,255,255,.6);border-radius:16px;padding:24px}.flow-card h4{font-size:13px;color:#64748B;margin-bottom:8px}.flow-val{font-size:28px;font-weight:700}.flow-val.green{color:#10B981}.flow-val.red{color:#EF4444}@media(max-width:768px){.flow-grid{grid-template-columns:1fr}}", '''<div class="filter-section"><div class="filter-row">
<div class="filter-group"><label class="filter-label">日期範圍</label><input type="text" class="filter-input" value="2026/04/28 - 2026/05/05" readonly></div>
<div class="filter-group"><label class="filter-label">幣種</label><select class="filter-select"><option>金幣</option><option>星幣</option></select></div>
<button class="btn btn-primary">查詢</button><button class="btn btn-outline">重置</button></div></div>
<div class="flow-grid">
<div class="flow-card"><h4>總產出</h4><div class="flow-val green">600,165</div></div>
<div class="flow-card"><h4>總消耗</h4><div class="flow-val red">485,200</div></div></div>
<div class="card"><div class="card-title">產出與消耗</div><div class="card-desc">追蹤金幣的產出來源與消耗去向。</div>
<div class="table-wrap"><table><thead><tr><th>日期</th><th>產出金額</th><th>消耗金額</th><th>淨流量</th><th>產出來源</th></tr></thead>
<tbody><tr><td>2026/05/05</td><td>600,165</td><td>485,200</td><td>+114,965</td><td>儲值轉換</td></tr>
<tr><td>2026/05/04</td><td>0</td><td>12,500</td><td>-12,500</td><td>-</td></tr>
<tr><td>2026/05/03</td><td>210,000</td><td>185,000</td><td>+25,000</td><td>儲值轉換</td></tr></tbody></table></div>
<div class="pagination"><div>共 3 筆</div><div style="display:flex;gap:4px"><button class="page-btn active">1</button></div></div></div>'''),

"analytics-coin-trend.html": ("金幣總量趨勢", ["金幣數據分析","金幣總量趨勢"], "", ".trend-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px}.trend-item{background:rgba(255,255,255,.6);border:1px solid rgba(255,255,255,.6);border-radius:12px;padding:20px;text-align:center}.trend-item h4{font-size:12px;color:#64748B;margin-bottom:8px}.trend-item .val{font-size:24px;font-weight:700;color:#0F172A}.chart-placeholder{height:300px;background:linear-gradient(180deg,rgba(59,130,246,.05),rgba(59,130,246,.02));border-radius:12px;display:flex;align-items:center;justify-content:center;color:#94A3B8;font-size:13px}@media(max-width:768px){.trend-summary{grid-template-columns:1fr}}", '''<div class="filter-section"><div class="filter-row">
<div class="filter-group"><label class="filter-label">時間範圍</label><select class="filter-select"><option>近7天</option><option>近30天</option><option>近90天</option></select></div>
<div class="filter-group"><label class="filter-label">幣種</label><select class="filter-select"><option>金幣</option><option>星幣</option></select></div>
<button class="btn btn-primary">查詢</button><button class="btn btn-outline">重置</button></div></div>
<div class="trend-summary">
<div class="trend-item"><h4>當前總量</h4><div class="val">2,847,500</div></div>
<div class="trend-item"><h4>7日變化</h4><div class="val" style="color:#10B981">+127,465</div></div>
<div class="trend-item"><h4>日均流通</h4><div class="val">18,209</div></div></div>
<div class="card"><div class="card-title">金幣總量趨勢</div><div class="card-desc">追蹤系統內金幣總量的變化趨勢。</div>
<div class="chart-placeholder">趨勢圖表區域（Chart.js）</div></div>'''),

"analytics-coin-balance.html": ("餘額分佈", ["金幣數據分析","餘額分佈"], "", ".dist-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:20px}.dist-item{background:rgba(255,255,255,.6);border:1px solid rgba(255,255,255,.6);border-radius:12px;padding:16px;text-align:center}.dist-item h4{font-size:11px;color:#64748B;margin-bottom:6px}.dist-item .val{font-size:20px;font-weight:700;color:#0F172A}.dist-item .pct{font-size:12px;color:#3B82F6;margin-top:4px}@media(max-width:768px){.dist-grid{grid-template-columns:1fr 1fr}}", '''<div class="filter-section"><div class="filter-row">
<div class="filter-group"><label class="filter-label">幣種</label><select class="filter-select"><option>金幣</option><option>星幣</option></select></div>
<button class="btn btn-primary">查詢</button><button class="btn btn-outline">重置</button></div></div>
<div class="dist-grid">
<div class="dist-item"><h4>0-100</h4><div class="val">523</div><div class="pct">47.8%</div></div>
<div class="dist-item"><h4>101-1,000</h4><div class="val">285</div><div class="pct">26.1%</div></div>
<div class="dist-item"><h4>1,001-10,000</h4><div class="val">178</div><div class="pct">16.3%</div></div>
<div class="dist-item"><h4>10,001-100,000</h4><div class="val">82</div><div class="pct">7.5%</div></div>
<div class="dist-item"><h4>100,000+</h4><div class="val">25</div><div class="pct">2.3%</div></div></div>
<div class="card"><div class="card-title">餘額分佈</div><div class="card-desc">分析玩家帳戶餘額的分佈情況。</div>
<div class="table-wrap"><table><thead><tr><th>餘額區間</th><th>人數</th><th>佔比</th><th>總餘額</th><th>平均餘額</th></tr></thead>
<tbody><tr><td>0 - 100</td><td>523</td><td>47.8%</td><td>12,450</td><td>23.8</td></tr>
<tr><td>101 - 1,000</td><td>285</td><td>26.1%</td><td>142,500</td><td>500.0</td></tr>
<tr><td>1,001 - 10,000</td><td>178</td><td>16.3%</td><td>890,000</td><td>5,000.0</td></tr>
<tr><td>10,001 - 100,000</td><td>82</td><td>7.5%</td><td>2,460,000</td><td>30,000.0</td></tr>
<tr><td>100,000+</td><td>25</td><td>2.3%</td><td>5,125,000</td><td>205,000.0</td></tr></tbody></table></div>
<div class="pagination"><div>共 5 筆</div><div style="display:flex;gap:4px"><button class="page-btn active">1</button></div></div></div>'''),
}

# Generate first batch
for fn, (title, bc, topbar, css, content) in PAGES.items():
    html = pg(title, bc, title, content, css, topbar)
    with open(fn, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Generated: {fn}")

print(f"\nBatch 1 done: {len(PAGES)} pages")

# Batch 2: Remaining 7 pages
PAGES2 = {
"analytics-topup-summary.html": ("儲值總表", ["儲值報表","儲值總表"], "", "", '''<div class="filter-section"><div class="filter-row">
<div class="filter-group"><label class="filter-label">日期範圍</label><input type="text" class="filter-input" value="2026/04/28 - 2026/05/05" readonly></div>
<div class="filter-group"><label class="filter-label">VIP 等級</label><select class="filter-select"><option>全部 VIP</option></select></div>
<div class="filter-group"><label class="filter-label">儲值方式</label><select class="filter-select"><option>全部方式</option></select></div>
<button class="btn btn-primary">查詢</button><button class="btn btn-outline">重置</button></div></div>
<div class="card"><div class="card-title">儲值總表</div><div class="card-desc">追蹤整體儲值表現與用戶付費行為。</div>
<div class="table-wrap"><table><thead><tr><th>日期</th><th>總儲值金額</th><th>儲值人數</th><th>儲值次數</th><th>ARPU</th><th>ARPPU</th><th>首儲人數</th><th>首儲金額</th></tr></thead>
<tbody><tr><td>2026/05/05</td><td>5,755</td><td>5</td><td>7</td><td>5.26</td><td>1,151.00</td><td>2</td><td>650</td></tr>
<tr><td>2026/05/04</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>2026/05/03</td><td>2,100</td><td>3</td><td>4</td><td>420.00</td><td>700.00</td><td>1</td><td>150</td></tr>
<tr><td>2026/05/02</td><td>3,200</td><td>4</td><td>5</td><td>800.00</td><td>800.00</td><td>1</td><td>500</td></tr></tbody></table></div>
<div class="pagination"><div>共 4 筆</div><div style="display:flex;gap:4px"><button class="page-btn active">1</button></div></div></div>'''),

"analytics-topup-item-detail.html": ("儲值品項明細", ["儲值報表","儲值品項明細"], "", "", '''<div class="filter-section"><div class="filter-row">
<div class="filter-group"><label class="filter-label">日期範圍</label><input type="text" class="filter-input" value="2026/04/28 - 2026/05/05" readonly></div>
<div class="filter-group"><label class="filter-label">VIP 等級</label><select class="filter-select"><option>全部 VIP</option></select></div>
<div class="filter-group"><label class="filter-label">儲值方式</label><select class="filter-select"><option>全部方式</option></select></div>
<div class="filter-group"><label class="filter-label">裝置平台</label><select class="filter-select"><option>全部平台</option></select></div>
<button class="btn btn-primary">查詢</button><button class="btn btn-outline">重置</button></div></div>
<div class="card"><div class="card-title">儲值品項明細</div><div class="card-desc">追蹤各別商品品項的銷售表現與首儲轉換率。</div>
<button class="btn btn-outline" style="margin-bottom:16px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>匯出 CSV</button>
<div class="table-wrap"><table><thead><tr><th>日期</th><th>品項名稱</th><th>總儲值金額</th><th>購買人數</th><th>購買次數</th><th>平均購買次數</th><th>總轉換點數</th><th>首儲佔比(%)</th></tr></thead>
<tbody><tr><td>2026/04/28 - 2026/05/05</td><td>錢包扣點 $1</td><td><a href="#">5</a></td><td>2</td><td>5</td><td>2.5</td><td>515</td><td>0%</td></tr>
<tr><td>2026/04/28 - 2026/05/05</td><td>OpenXin $100</td><td><a href="#">100</a></td><td>1</td><td>1</td><td>1</td><td>10,000</td><td>0%</td></tr>
<tr><td>2026/04/28 - 2026/05/05</td><td>線上轉點 $150</td><td><a href="#">150</a></td><td>1</td><td>1</td><td>1</td><td>15,150</td><td>100%</td></tr>
<tr><td>2026/04/28 - 2026/05/05</td><td>遠傳電信-測試 $500</td><td><a href="#">500</a></td><td>1</td><td>1</td><td>1</td><td>51,500</td><td>100%</td></tr>
<tr><td>2026/04/28 - 2026/05/05</td><td>手機小額付款-測試 $500</td><td><a href="#">1,000</a></td><td>1</td><td>2</td><td>2</td><td>103,000</td><td>0%</td></tr>
<tr><td>2026/04/28 - 2026/05/05</td><td>遠傳電信-測試 $1000</td><td><a href="#">2,000</a></td><td>2</td><td>2</td><td>1</td><td>208,000</td><td>50%</td></tr>
<tr><td>2026/04/28 - 2026/05/05</td><td>遠傳電信-測試 $2000</td><td><a href="#">2,000</a></td><td>1</td><td>1</td><td>1</td><td>212,000</td><td>100%</td></tr></tbody></table></div>
<p style="font-size:13px;color:#64748B;margin-top:12px">* 平均購買次數 = 購買次數 / 購買人數。首儲佔比指該品項作為用戶第一次儲值的比例。</p>
<div class="pagination"><div>共 7 筆</div><div style="display:flex;gap:4px"><button class="page-btn active">1</button></div></div></div>'''),

"analytics-player-ranking.html": ("玩家排行榜", ["遊戲數據","玩家排行榜"], "", ".rank-tabs{display:flex;gap:8px;margin-bottom:20px;border-bottom:1px solid #E5E7EB}.rank-tab{padding:12px 20px;font-size:14px;color:#64748B;cursor:pointer;border-bottom:2px solid transparent;transition:all .2s}.rank-tab:hover{color:#334155}.rank-tab.active{color:#3B82F6;border-bottom-color:#3B82F6;font-weight:600}.rank-badge{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:6px;font-weight:700;font-size:12px}.rank-badge.gold{background:linear-gradient(135deg,#FFD700,#FFA500);color:#fff}.rank-badge.silver{background:linear-gradient(135deg,#C0C0C0,#A8A8A8);color:#fff}.rank-badge.bronze{background:linear-gradient(135deg,#CD7F32,#B8860B);color:#fff}.rank-badge.normal{background:#F1F5F9;color:#64748B}", '''<div class="filter-section"><div class="filter-row">
<div class="filter-group"><label class="filter-label">時間範圍</label><select class="filter-select"><option>今日</option><option>本週</option><option>本月</option></select></div>
<div class="filter-group"><label class="filter-label">遊戲類型</label><select class="filter-select"><option>全部遊戲</option></select></div>
<button class="btn btn-primary">查詢</button><button class="btn btn-outline">重置</button></div></div>
<div class="rank-tabs">
<div class="rank-tab active">贏分榜</div>
<div class="rank-tab">投注榜</div>
<div class="rank-tab">連勝榜</div></div>
<div class="card"><div class="card-title">玩家排行榜</div><div class="card-desc">追蹤玩家的遊戲表現與活躍度。</div>
<div class="table-wrap"><table><thead><tr><th style="width:60px">排名</th><th>玩家 ID</th><th>暱稱</th><th>VIP 等級</th><th>贏分</th><th>投注額</th><th>遊戲局數</th></tr></thead>
<tbody><tr><td><div class="rank-badge gold">1</div></td><td>P00523</td><td>幸運星</td><td>VIP 5</td><td style="color:#10B981;font-weight:600">+125,800</td><td>580,000</td><td>1,245</td></tr>
<tr><td><div class="rank-badge silver">2</div></td><td>P00891</td><td>贏家</td><td>VIP 4</td><td style="color:#10B981;font-weight:600">+98,500</td><td>420,000</td><td>980</td></tr>
<tr><td><div class="rank-badge bronze">3</div></td><td>P01234</td><td>大富翁</td><td>VIP 6</td><td style="color:#10B981;font-weight:600">+87,200</td><td>650,000</td><td>1,580</td></tr>
<tr><td><div class="rank-badge normal">4</div></td><td>P00456</td><td>好運來</td><td>VIP 3</td><td style="color:#10B981;font-weight:600">+65,400</td><td>280,000</td><td>720</td></tr>
<tr><td><div class="rank-badge normal">5</div></td><td>P00789</td><td>發財哥</td><td>VIP 5</td><td style="color:#10B981;font-weight:600">+52,100</td><td>380,000</td><td>890</td></tr></tbody></table></div>
<div class="pagination"><div>共 5 筆</div><div style="display:flex;gap:4px"><button class="page-btn active">1</button></div></div></div>'''),

"analytics-game-ranking.html": ("遊戲排行榜", ["遊戲數據","遊戲排行榜"], "", ".game-tabs{display:flex;gap:8px;margin-bottom:20px;border-bottom:1px solid #E5E7EB}.game-tab{padding:12px 20px;font-size:14px;color:#64748B;cursor:pointer;border-bottom:2px solid transparent;transition:all .2s}.game-tab:hover{color:#334155}.game-tab.active{color:#3B82F6;border-bottom-color:#3B82F6;font-weight:600}", '''<div class="filter-section"><div class="filter-row">
<div class="filter-group"><label class="filter-label">時間範圍</label><select class="filter-select"><option>今日</option><option>本週</option><option>本月</option></select></div>
<div class="filter-group"><label class="filter-label">遊戲類型</label><select class="filter-select"><option>全部遊戲</option><option>老虎機</option><option>捕魚</option><option>棋牌</option></select></div>
<button class="btn btn-primary">查詢</button><button class="btn btn-outline">重置</button></div></div>
<div class="game-tabs">
<div class="game-tab active">熱門度</div>
<div class="game-tab">營收</div>
<div class="game-tab">活躍玩家</div></div>
<div class="card"><div class="card-title">遊戲排行榜</div><div class="card-desc">追蹤各遊戲的表現與玩家偏好。</div>
<div class="table-wrap"><table><thead><tr><th style="width:60px">排名</th><th>遊戲名稱</th><th>遊戲類型</th><th>遊戲人數</th><th>遊戲局數</th><th>投注額</th><th>營收</th></tr></thead>
<tbody><tr><td style="font-weight:700;color:#3B82F6">1</td><td>金龍傳說</td><td>老虎機</td><td>523</td><td>12,450</td><td>2,580,000</td><td>258,000</td></tr>
<tr><td style="font-weight:700;color:#3B82F6">2</td><td>捕魚達人</td><td>捕魚</td><td>412</td><td>8,920</td><td>1,850,000</td><td>185,000</td></tr>
<tr><td style="font-weight:700;color:#3B82F6">3</td><td>百家樂</td><td>棋牌</td><td>385</td><td>6,780</td><td>3,200,000</td><td>320,000</td></tr>
<tr><td>4</td><td>水果派對</td><td>老虎機</td><td>298</td><td>7,650</td><td>1,420,000</td><td>142,000</td></tr>
<tr><td>5</td><td>德州撲克</td><td>棋牌</td><td>256</td><td>4,890</td><td>2,100,000</td><td>210,000</td></tr></tbody></table></div>
<div class="pagination"><div>共 5 筆</div><div style="display:flex;gap:4px"><button class="page-btn active">1</button></div></div></div>'''),

"analytics-game-detail.html": ("遊戲明細", ["遊戲數據","遊戲明細"], "", "", '''<div class="filter-section"><div class="filter-row">
<div class="filter-group"><label class="filter-label">日期範圍</label><input type="text" class="filter-input" value="2026/04/28 - 2026/05/05" readonly></div>
<div class="filter-group"><label class="filter-label">遊戲名稱</label><select class="filter-select"><option>全部遊戲</option><option>金龍傳說</option><option>捕魚達人</option></select></div>
<div class="filter-group"><label class="filter-label">遊戲類型</label><select class="filter-select"><option>全部類型</option><option>老虎機</option><option>捕魚</option><option>棋牌</option></select></div>
<button class="btn btn-primary">查詢</button><button class="btn btn-outline">重置</button></div></div>
<div class="card"><div class="card-title">遊戲明細</div><div class="card-desc">追蹤各遊戲的詳細數據與表現指標。</div>
<div class="table-wrap"><table><thead><tr><th>日期</th><th>遊戲名稱</th><th>遊戲類型</th><th>遊戲人數</th><th>遊戲局數</th><th>投注額</th><th>派彩</th><th>營收</th><th>RTP(%)</th></tr></thead>
<tbody><tr><td>2026/05/05</td><td>金龍傳說</td><td>老虎機</td><td>125</td><td>2,850</td><td>580,000</td><td>550,000</td><td>30,000</td><td>94.8</td></tr>
<tr><td>2026/05/05</td><td>捕魚達人</td><td>捕魚</td><td>98</td><td>1,920</td><td>420,000</td><td>400,000</td><td>20,000</td><td>95.2</td></tr>
<tr><td>2026/05/05</td><td>百家樂</td><td>棋牌</td><td>85</td><td>1,450</td><td>650,000</td><td>620,000</td><td>30,000</td><td>95.4</td></tr>
<tr><td>2026/05/04</td><td>金龍傳說</td><td>老虎機</td><td>110</td><td>2,450</td><td>520,000</td><td>495,000</td><td>25,000</td><td>95.2</td></tr></tbody></table></div>
<div class="pagination"><div>共 4 筆</div><div style="display:flex;gap:4px"><button class="page-btn active">1</button></div></div></div>'''),

"analytics-transaction-detail.html": ("交易明細", ["風控管理","交易明細"], "", ".tx-type{display:inline-block;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600}.tx-type.deposit{background:rgba(16,185,129,.1);color:#10B981}.tx-type.withdraw{background:rgba(239,68,68,.1);color:#EF4444}.tx-type.bet{background:rgba(59,130,246,.1);color:#3B82F6}.tx-type.win{background:rgba(16,185,129,.1);color:#10B981}", '''<div class="filter-section"><div class="filter-row">
<div class="filter-group"><label class="filter-label">日期範圍</label><input type="text" class="filter-input" value="2026/04/28 - 2026/05/05" readonly></div>
<div class="filter-group"><label class="filter-label">交易類型</label><select class="filter-select"><option>全部類型</option><option>儲值</option><option>提領</option><option>投注</option><option>派彩</option></select></div>
<div class="filter-group"><label class="filter-label">玩家 ID</label><input type="text" class="filter-input" placeholder="輸入玩家 ID"></div>
<button class="btn btn-primary">查詢</button><button class="btn btn-outline">重置</button></div></div>
<div class="card"><div class="card-title">交易明細</div><div class="card-desc">追蹤所有金流交易記錄與異常行為。</div>
<div class="table-wrap"><table><thead><tr><th>交易時間</th><th>交易 ID</th><th>玩家 ID</th><th>交易類型</th><th>金額</th><th>餘額</th><th>IP 位址</th></tr></thead>
<tbody><tr><td>2026/05/05 14:25:30</td><td>TX20260505142530001</td><td>P00523</td><td><span class="tx-type deposit">儲值</span></td><td style="color:#10B981;font-weight:600">+2,000</td><td>125,800</td><td>192.168.1.100</td></tr>
<tr><td>2026/05/05 14:20:15</td><td>TX20260505142015002</td><td>P00523</td><td><span class="tx-type bet">投注</span></td><td style="color:#EF4444;font-weight:600">-500</td><td>123,800</td><td>192.168.1.100</td></tr>
<tr><td>2026/05/05 14:18:45</td><td>TX20260505141845003</td><td>P00523</td><td><span class="tx-type win">派彩</span></td><td style="color:#10B981;font-weight:600">+1,200</td><td>124,300</td><td>192.168.1.100</td></tr>
<tr><td>2026/05/05 13:55:20</td><td>TX20260505135520004</td><td>P00891</td><td><span class="tx-type deposit">儲值</span></td><td style="color:#10B981;font-weight:600">+1,000</td><td>98,500</td><td>192.168.2.50</td></tr>
<tr><td>2026/05/05 13:50:10</td><td>TX20260505135010005</td><td>P01234</td><td><span class="tx-type bet">投注</span></td><td style="color:#EF4444;font-weight:600">-800</td><td>87,200</td><td>192.168.3.20</td></tr></tbody></table></div>
<div class="pagination"><div>共 5 筆</div><div style="display:flex;gap:4px"><button class="page-btn active">1</button></div></div></div>'''),

"analytics-high-risk.html": ("高風險明細", ["風控管理","高風險明細"], "", ".risk-level{display:inline-block;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600}.risk-level.high{background:rgba(239,68,68,.1);color:#EF4444}.risk-level.medium{background:rgba(245,158,11,.1);color:#F59E0B}.risk-level.low{background:rgba(59,130,246,.1);color:#3B82F6}", '''<div class="filter-section"><div class="filter-row">
<div class="filter-group"><label class="filter-label">日期範圍</label><input type="text" class="filter-input" value="2026/04/28 - 2026/05/05" readonly></div>
<div class="filter-group"><label class="filter-label">風險等級</label><select class="filter-select"><option>全部等級</option><option>高風險</option><option>中風險</option><option>低風險</option></select></div>
<div class="filter-group"><label class="filter-label">風險類型</label><select class="filter-select"><option>全部類型</option><option>異常登入</option><option>異常投注</option><option>多帳號</option></select></div>
<button class="btn btn-primary">查詢</button><button class="btn btn-outline">重置</button></div></div>
<div class="card"><div class="card-title">高風險明細</div><div class="card-desc">追蹤異常行為與潛在風險帳號。</div>
<div class="table-wrap"><table><thead><tr><th>偵測時間</th><th>玩家 ID</th><th>風險等級</th><th>風險類型</th><th>風險描述</th><th>IP 位址</th><th>狀態</th></tr></thead>
<tbody><tr><td>2026/05/05 15:30:20</td><td>P01567</td><td><span class="risk-level high">高風險</span></td><td>異常登入</td><td>短時間內多地登入（台北→高雄，15分鐘內）</td><td>192.168.5.100</td><td>待處理</td></tr>
<tr><td>2026/05/05 14:45:10</td><td>P02345</td><td><span class="risk-level high">高風險</span></td><td>異常投注</td><td>單日投注額超過平均值 500%</td><td>192.168.6.50</td><td>待處理</td></tr>
<tr><td>2026/05/05 13:20:30</td><td>P03456</td><td><span class="risk-level medium">中風險</span></td><td>多帳號</td><td>與 P03457 共用相同裝置 ID</td><td>192.168.7.20</td><td>已處理</td></tr>
<tr><td>2026/05/04 18:15:45</td><td>P04567</td><td><span class="risk-level medium">中風險</span></td><td>異常投注</td><td>連續 20 局相同投注模式</td><td>192.168.8.30</td><td>已處理</td></tr>
<tr><td>2026/05/04 16:50:20</td><td>P05678</td><td><span class="risk-level low">低風險</span></td><td>異常登入</td><td>首次從新 IP 登入</td><td>192.168.9.40</td><td>已處理</td></tr></tbody></table></div>
<div class="pagination"><div>共 5 筆</div><div style="display:flex;gap:4px"><button class="page-btn active">1</button></div></div></div>'''),
}

for fn, (title, bc, topbar, css, content) in PAGES2.items():
    html = pg(title, bc, title, content, css, topbar)
    with open(fn, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Generated: {fn}")

print(f"\nBatch 2 done: {len(PAGES2)} pages")
print(f"Total generated: {len(PAGES) + len(PAGES2)} pages")
