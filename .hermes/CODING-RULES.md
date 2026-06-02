# Hermes 開發規則（強制執行）

## 🚨 最高優先規則：必須使用共用元件

### 禁止事項
1. **禁止 inline 重寫 sidebar CSS** — sidebar 樣式由 `components/sidebar.js` 負責渲染
2. **禁止自定義按鈕 class**（如 `btn-export`, `btn-batch`）— 必須使用 `js/components.js` 的 `UI.btn.*` 方法
3. **禁止在 `<style>` 中重複定義 `.toggle`, `.data-table`, `.filter-card` 等共用樣式** — 這些由 `js/components.js` 的 CSS 注入處理
4. **禁止用純文字顯示狀態**（如「顯示中」「已停用」）— 必須用 `UI.toggle()` 或 `UI.statusBadge()`

### 必須引入的檔案
每個後台頁面 **必須** 引入以下 script（依序）：
```html
<script src="components/sidebar.js"></script>
<!-- ... page content ... -->
<script src="js/components.js"></script>
<script src="components/date-picker.js"></script>  <!-- 如有日期篩選 -->
```

### 按鈕使用對照表
| 場景 | 正確用法 | 禁止用法 |
|------|----------|----------|
| 編輯排序 | `UI.btn.sort('編輯排序', 'enterEdit()')` | `<button class="btn-export">` |
| 取消排序 | `UI.btn.sortCancel('取消', 'exitEdit()')` | `<button class="btn-batch">` |
| 儲存排序 | `UI.btn.sortSave('儲存排序', 'saveSort()')` | 自定義 button |
| 新增 | `UI.btn.add('新增', 'openAdd()')` | 自定義 class |
| 搜尋 | `UI.btn.search('搜尋', 'doSearch()')` | 自定義 class |
| 表格內編輯 | `UI.btn.icon('edit', 'edit(id)')` | 自定義 SVG button |
| 表格內刪除 | `UI.btn.icon('delete', 'del(id)')` | 自定義 SVG button |
| Toggle 開關 | `UI.toggle(status, 'toggleFn(id)')` | 手寫 toggle HTML |

### 表格使用
```javascript
// 正確：使用 UI.table.create
const tableHtml = UI.table.create(columns, rows, { empty: '尚無資料' });

// 禁止：手寫 <table class="data-table">
```

### 排序頁面模板
排序頁面必須包含：
1. `UI.btn.sort()` — 進入排序模式
2. `UI.btn.sortCancel()` — 取消
3. `UI.btn.sortSave()` — 儲存
4. 拖曳手柄使用 `UI.icon.drag`
5. 顯示開關使用 `UI.toggle()`

### CSS 規則
- **後台頁面只寫頁面專屬樣式**（如特殊 layout），不重複共用元件的樣式定義
- Sidebar 的全部 CSS（`.sidebar`, `.sidebar-nav`, `.sidebar-item` 等）由 `components/sidebar.js` 注入，頁面不得重複定義
- `.data-table`, `.toggle`, `.filter-card`, `.filter-group`, `.btn-search`, `.btn-reset`, `.page-header`, `.topbar` 等共用 class 的樣式由 `js/components.js` 注入

### 頁面結構模板
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>Nova 後台 - [頁面名稱]</title>
  <style>
    /* 只寫此頁面專屬的樣式，不重複共用元件 CSS */
  </style>
</head>
<body>
  <nav class="sidebar" id="sidebar"></nav>
  <script src="components/sidebar.js"></script>

  <div class="main">
    <div class="topbar">...</div>
    <div class="content">
      <!-- 頁面內容，使用 UI.* 方法動態生成 -->
    </div>
  </div>

  <script src="js/components.js"></script>
  <script src="components/date-picker.js"></script>
  <script>
    // 頁面邏輯，使用 UI.* 生成 HTML
  </script>
</body>
</html>
```

## 檢查清單（每次提交前自查）
- [ ] 是否引入了 `js/components.js`？
- [ ] 按鈕是否全部使用 `UI.btn.*`？
- [ ] Toggle 是否使用 `UI.toggle()`？
- [ ] 表格是否使用 `UI.table.create()`？
- [ ] Sidebar CSS 是否只依賴 `components/sidebar.js`，沒有 inline？
- [ ] `<style>` 中是否只有頁面專屬樣式？
