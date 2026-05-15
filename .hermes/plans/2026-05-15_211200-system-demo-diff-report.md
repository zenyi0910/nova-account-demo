# Nova Demo vs 系統差異比對報告

## 比對頁面：會員支付查詢

| 元件 | 屬性 | 系統值 | Demo 值 | 差異 |
|------|------|--------|---------|------|
| **搜尋按鈕** | background | `rgb(57,57,57)` | `rgb(31,41,55)` | ⚠️ 顏色偏深藍 |
| | borderRadius | `8px` | `6px` | ⚠️ |
| | padding | `8px 12px` | `7px 14px` | ⚠️ |
| | fontSize | `12px` | `13px` | ⚠️ |
| **清除按鈕** | background | `oklch(0.97 0.014 254.604)` 淡藍 | `#fff` 白色 | ❌ 完全不同 |
| | color | `oklch(0.623 0.214 259.815)` 藍字 | `rgb(55,65,81)` 灰字 | ❌ |
| | border | `1px solid oklch(0.809...)` 藍邊 | `1px solid #E5E7EB` 灰邊 | ❌ |
| | borderRadius | `8px` | `6px` | ⚠️ |
| **匯出報表** | background | `oklch(0.707 0.165 254.624)` 藍色 | `#fff` 白色 | ❌ 完全不同 |
| | color | 白字 | `rgb(55,65,81)` 灰字 | ❌ |
| **表格 th** | background | `oklab(0.344.../0.05)` 極淡灰 | `rgb(245,245,245)` | ✅ 近似 |
| | color | `rgb(57,57,57)` | `rgb(107,114,128)` | ⚠️ 系統較深 |
| | fontWeight | `500` | `600` | ⚠️ |
| | fontSize | `12px` | `12px` | ✅ |
| **表格 td** | color | `oklch(0.551 0.027 264.364)` 灰 | `rgb(31,41,55)` 深色 | ⚠️ |
| | fontSize | `14px` | `13px` | ⚠️ |
| | padding | `12px` | `10px 14px` | ⚠️ |
| **Input** | borderRadius | `8px` | `0px`(wrapper) | ⚠️ |
| | fontSize | `14px` | `13px` | ⚠️ |
| **頁碼 active** | — | — | — | ✅ 已對齊 |
| **頁碼 inactive** | — | — | — | ✅ 已對齊 |

## 需修正項目（優先級排序）

### P1 - 明顯不同
1. **清除按鈕**：改為淡藍底+藍邊+藍字（已在 components.js 定義 `btn-secondary`，但 nova-member-payment.html 未引用）
2. **匯出報表按鈕**：系統是藍色底白字，demo 是白底灰字灰邊

### P2 - 細節差異
3. **搜尋按鈕**：bg 改 `#393939`，borderRadius 改 `8px`，padding 改 `8px 12px`，fontSize 改 `12px`
4. **表格 th**：color 改 `#393939`，fontWeight 改 `500`
5. **表格 td**：fontSize 改 `14px`，padding 改 `12px`
6. **Input/Select**：borderRadius 改 `8px`，fontSize 改 `14px`

### P3 - 可接受
7. 頁碼按鈕 ✅ 已對齊
8. Tips Box ✅ 已統一

## 影響檔案

- `nova-member-payment.html`（主要）
- `js/components.js`（新增 exportBtn 元件）
- 其他有搜尋/清除按鈕的頁面（批次更新 borderRadius 6→8px）
