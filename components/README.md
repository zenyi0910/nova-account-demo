# Nova Demo 共用元件庫

## 檔案結構

```
components/
├── sidebar.js       → 左側導航列（自動渲染）
├── date-picker.js   → 日期時間選擇器
├── analytics-sidebar.js → 數據分析側邊欄
js/
└── components.js    → UI 元件工具函式庫
```

---

## 1. `js/components.js` — UI 元件工具庫

頁面引入後可用全域 `UI` 物件。所有方法回傳 HTML string。

### 按鈕 `UI.btn.*`

| 方法 | 用途 | 使用位置 |
|------|------|----------|
| `UI.btn.dark(text, onclick, opts)` | 深色主按鈕（儲存、確認） | Modal footer、表單送出 |
| `UI.btn.search(text, onclick)` | 搜尋按鈕 | Filter bar 右側 |
| `UI.btn.outline(text, onclick, opts)` | 輪廓按鈕（取消） | Modal footer |
| `UI.btn.add(text, onclick, opts)` | 綠色 ＋ 新增按鈕 | Page header 右側 |
| `UI.btn.secondary(text, onclick, opts)` | 灰色次要按鈕 | 工具列輔助操作 |
| `UI.btn.sort(text, onclick, opts)` | 排序模式按鈕 | 表格上方工具列 |
| `UI.btn.sortCancel(text, onclick, opts)` | 取消排序 | 排序模式工具列 |
| `UI.btn.sortSave(text, onclick, opts)` | 儲存排序 | 排序模式工具列 |
| `UI.btn.danger(text, onclick)` | 紅色危險按鈕（刪除） | Modal 確認刪除 |
| `UI.btn.modalFooter(confirmText, confirmOnclick, cancelOnclick)` | Modal 底部按鈕組（取消＋確認） | 所有 Modal footer |
| `UI.btn.toolbarActions(confirmText, confirmOnclick, cancelOnclick)` | 工具列按鈕組（取消＋新增） | 排序/批次操作工具列 |
| `UI.btn.icon(type, onclick, title)` | 圖示按鈕 | 表格操作欄 |

**icon types:** `edit`, `view`, `delete`, `upload`, `more`, `plus`

```js
// 範例：頁面標題右側新增按鈕
document.getElementById('header').innerHTML += UI.btn.add('新增商品', 'openAddModal()');

// 範例：表格操作欄
`<td>${UI.btn.icon('edit', 'edit(1)')} ${UI.btn.icon('delete', 'del(1)')}</td>`
```

### SVG 圖示 `UI.icon.*`

| 名稱 | 用途 |
|------|------|
| `clock` | 排程相關標記 |
| `edit` | 編輯提示 |
| `search` | 搜尋欄位內 |
| `sort` | 排序按鈕內 |
| `save` | 儲存按鈕內 |
| `image` | 圖片上傳區 |
| `drag` | 拖曳排序手柄 |
| `bulb` | Tips 提示框 |
| `monitor` | 系統/螢幕相關 |

```js
// 直接插入 SVG
html += UI.icon.clock + ' 排程中';
```

### Modal `UI.modal.*`

| 方法 | 用途 |
|------|------|
| `UI.modal.create(id, title, bodyHtml, opts)` | 產生 modal HTML 結構 |
| `UI.modal.open(id)` | 顯示 modal |
| `UI.modal.close(id)` | 關閉 modal |

**opts:** `{ width, footer, noFooter }`

```js
// 建立 modal（放在頁面底部）
document.body.insertAdjacentHTML('beforeend',
  UI.modal.create('editModal', '編輯商品', formHtml, {
    width: '520px',
    footer: UI.btn.modalFooter('確認儲存', 'saveItem()')
  })
);
// 開啟
UI.modal.open('editModal');
```

### 表單 `UI.form.*`

| 方法 | 用途 |
|------|------|
| `UI.form.select(id, label, options, opts)` | 下拉選單 |
| `UI.form.input(id, label, opts)` | 文字/數字輸入 |
| `UI.form.datetime(id, label, opts)` | 日期時間輸入 |
| `UI.form.time(id, label, opts)` | 時間輸入 |
| `UI.form.row(...fields)` | 兩欄並排 |

**opts 共用:** `{ required, placeholder, value, hint, onchange }`

```js
// Modal 內表單
const body = UI.form.row(
  UI.form.select('type', '維護類型', ['維護更新','緊急維護'], { required: true }),
  UI.form.input('url', '維護網址', { placeholder: '/systemMaintenance' })
) + UI.form.input('content', '公告內容', { required: true });
```

### 表格 `UI.table.create(columns, rows, opts)`

```js
UI.table.create(
  [{ label: '名稱', width: '200px' }, { label: '狀態' }, { label: '操作' }],
  data.map(r => ({ cells: [r.name, UI.statusBadge(r.status), UI.btn.icon('edit', `edit(${r.id})`)] })),
  { empty: '尚無資料' }
);
```

**rows 格式:** `Array<string[]>` 或 `Array<{ cells: string[], _attrs?: string }>`

### Badge / Status

| 方法 | 用途 |
|------|------|
| `UI.badge(text, type)` | 手動指定 badge（on/off/maint/soon） |
| `UI.statusBadge(status)` | 自動對應狀態文字 → badge 樣式 |
| `UI.toggle(status, onclick)` | Toggle 開關（on/off） |

### 其他元件

| 方法 | 用途 | 使用位置 |
|------|------|----------|
| `UI.tips(text)` | 黃色 Tips 提示框 | 表單下方說明 |
| `UI.infoBox(text)` | 資訊框 | 頁面說明區 |
| `UI.segmented(items, opts)` | 分段控制器（tab 切換） | 頁面 tab 區 |
| `UI.toggleGroup(items)` | Toggle 按鈕組 | 篩選切換 |
| `UI.filterGroup(label, inputHtml)` | 篩選欄位包裝 | Filter bar 內 |
| `UI.pagination(opts)` | 分頁元件 | 表格下方 |
| `UI.toast(msg, type)` | Toast 通知 | 操作成功/失敗提示 |

```js
// 分頁
UI.pagination({ containerId: 'pager', currentPage: 1, totalPages: 5, onPageChange: 'goPage' });

// Segmented control
UI.segmented([
  { label: '一般', active: true, onclick: "switchTab('一般')" },
  { label: '快速', active: false, onclick: "switchTab('快速')" }
]);
```

---

## 2. `components/sidebar.js` — 左側導航列

**引入方式：** 頁面放 `<nav class="sidebar" id="sidebar"></nav>` + `<script src="components/sidebar.js"></script>`

自動根據 `location.pathname` 標記 active 並展開對應子選單。

**提供的全域函式：**
- `toggleSub(id)` — 展開/收合子選單
- `toggleUserMenu()` — 展開用戶 popover

---

## 3. `components/date-picker.js` — 日期時間選擇器

**引入方式：** `<script src="components/date-picker.js"></script>`

自動初始化所有 `.date-picker-wrap` 元素。提供日曆 + 滾輪時間 + 快速選擇。

**HTML 結構：**
```html
<div class="date-picker-wrap" id="startTime">
  <input type="text" placeholder="選擇時間日期" readonly>
</div>
```

**特性：**
- 過去日期自動 disabled
- 支援 range 模式（開始/結束）
- 點擊外部自動關閉

---

## 4. 頁面共用 CSS 慣例

| 類別 | 用途 |
|------|------|
| `.filter-card` | 篩選區塊容器（白底圓角卡片） |
| `.filter-group` | 單一篩選欄位（label + input） |
| `.filter-input` | 輸入框外殼（含 icon） |
| `.data-table` | 資料表格 |
| `.page-header` | 頁面標題列（icon + h1 + spacer + 按鈕） |
| `.content` | 主內容區（padding: 24px） |
| `.topbar` | 頂部導航列（breadcrumb + warning） |
| `.toggle.on / .toggle.off` | Toggle 開關狀態 |
| `.status-badge` | 狀態標籤（搭配 .status-online/.status-maint/.status-offline） |

---

## 5. 頁面模板結構

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>Nova 後台 - [頁面名稱]</title>
  <link rel="stylesheet" href="css/common.css"> <!-- 如有 -->
  <style>/* 頁面專屬樣式 */</style>
</head>
<body>
  <nav class="sidebar" id="sidebar"></nav>
  <script src="components/sidebar.js"></script>

  <div class="main">
    <div class="topbar">...</div>
    <div class="content">
      <div class="page-header">
        <svg>...</svg>
        <h1>頁面標題</h1>
        <div class="spacer"></div>
        <!-- UI.btn.add / 歷史紀錄按鈕 -->
      </div>
      <!-- filter-card / data-table / form -->
    </div>
  </div>

  <script src="js/components.js"></script>
  <script src="components/date-picker.js"></script>
  <script src="js/[page]-management.js"></script>
</body>
</html>
```
