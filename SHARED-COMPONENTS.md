# Nova 共用元件清單

## 前台（Mobile）共用元件

### 1. 功能按鈕列表項 (FuncListItem)
- **樣式**: `bg-[#fafafa]`, `rounded-2xl`, `h-72px`, grid `[auto_1fr_auto]`, `gap-16px`, `px-24px`
- **陰影**: `0 4px 8px 0 rgba(174,108,108,.48), inset -2px -4px 2px 0 rgba(210,184,184,1), inset 0 2px 1px 0 rgba(255,253,247,.48)`
- **圖標**: Lucide SVG 24×24, stroke `#452201`, stroke-width 2
- **箭頭**: Lucide chevron-right, stroke-width 4
- **文字**: `text-sm text-[#452201]`
- **出現位置**:
  - `nova-redpacket-apply.html` — 公會功能列表（7 個按鈕）
  - 金幣卡片也用相同陰影

### 2. 半透明深棕卡片 (TranslucentCard)
- **樣式**: `bg-[#45220133]` (rgba(69,34,1,0.2)), `rounded-2xl`, `p-8px`
- **陰影**: `inset 1px 1px 6px rgba(0,0,0,.4), inset -1px -1px 5px rgba(255,255,255,.3)`
- **文字**: `text-sm font-semibold text-[#452201]`
- **出現位置**:
  - `nova-redpacket-apply.html` — 公會介紹區
  - `nova-redpacket-apply.html` — 公會幹部區

### 3. Pill 按鈕 (PillButton)
- **共通**: `border-radius: 9999px`, `font-size: 12px`, `font-weight: 600`, `h-40px`, `px-16px`, `color: #fff`
- **變體**:
  - 橘色 (進入社群/解散公會): `bg-[#ff842f]`
  - 藍色 (設定): `bg-[#4a6cf7]`
  - 青綠色 (金幣提領): `bg-[#00dda4]`
- **出現位置**:
  - `nova-redpacket-apply.html` — 進入社群、設定、金幣提領、解散公會

### 4. Tab 導航 (GuildTabs)
- **容器**: 金色漸層 `linear-gradient(135deg, #f5a623, #e8960c)`, `rounded-full`, absolute z-70 top-[80%]
- **Tab 按鈕**: `h-28px`, `flex-1`, `text-sm`, `font-semibold`, `rounded-full`, `color: #fff`, `text-shadow`, `letter-spacing .5px`
- **Active**: `bg-rgba(120,80,40,.2)` + `inset-shadow 1px 1px 1px #11111136, -1px -1px 1px #fff`
- **Inactive**: `bg-transparent`, hover `bg-rgba(120,80,40,.3)`
- **出現位置**:
  - `nova-redpacket-apply.html` — 我的公會/所有公會/公會說明

### 5. 漸層金色文字 (GradientGoldText)
- **樣式**: `background: linear-gradient(to right, oklch(0.646 0.222 41.116), oklch(0.75 0.183 55.934), oklch(0.852 0.199 91.936))`, `background-clip: text`, `color: transparent`
- **出現位置**:
  - `nova-redpacket-apply.html` — Lv.0 等級文字

### 6. 公會徽章 (GuildEmblem)
- **樣式**: `w-70px h-70px rounded-full`, `bg: linear-gradient(180deg, #2d5a3a, #1a3d28)`, `border: 3px solid #f5c842`
- **內容**: 等級數字 (28px bold 金色) + "LEVEL" 標籤
- **出現位置**:
  - `nova-redpacket-apply.html` — 公會資訊區

### 7. 頁面背景 (PageBackground)
- **前台**: `bg-yellow-50` (#fefce8)
- **出現位置**: 所有前台公會相關頁面的 scrollable area

## 後台（Desktop）共用元件

### 8. 資料表格 (DataTable)
- **表頭**: 灰色背景, 14px, bold
- **表格**: border-collapse, 全寬
- **出現位置**:
  - `nova-guild-list.html` — 公會列表
  - `nova-guild-withdraw.html` — 提領監控
  - `nova-guild-log.html` — 操作日誌
  - `nova-guild-contribution.html` — 貢獻查詢

### 9. 篩選器列 (FilterBar)
- **Input**: `border: 1px solid oklch(0.922 0 0)`, `border-radius: 8px`, `h-36px`, `text-sm`
- **出現位置**:
  - 所有後台列表頁面的頂部篩選區

### 10. 側邊欄 (Sidebar)
- **出現位置**: 所有後台頁面

## 前後台共用色彩

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-brown` | `#452201` | 主要文字色（前台） |
| `--gold-primary` | `#fbc323` | 金幣標籤、裝飾 |
| `--btn-orange` | `#ff842f` | CTA 按鈕 |
| `--btn-green` | `#00dda4` | 提領按鈕 |
| `--btn-blue` | `#4a6cf7` | 設定按鈕 |
| `--card-shadow` | `rgba(174,108,108,.48)` | 卡片陰影 |
| `--bg-light` | `#fafafa` | 卡片/按鈕背景 |
| `--bg-page` | `#fefce8` | 前台頁面背景 |
