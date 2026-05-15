# Nova Demo 實作流程優化

## 目標

建立一套高效的 SA Demo 實作流程，從需求分析到交付一次到位，減少來回修改。

## 現況問題

1. 收到需求直接改 → 沒有全局觀，容易漏改或風格不一致
2. 逐項改逐項驗證 → 多次 commit，效率低
3. 沒有先比對系統 → 改完才發現跟系統不一致，要返工
4. 共用元件沒有先規劃 → 每頁各自定義，後續統一要逐檔改

## 優化後流程（4 階段）

### Phase 1：需求分析 & 系統比對（10 min）

1. **解讀需求**：Boss 說什麼就做什麼，不腦補
2. **系統連線判斷**：
   - **方案 A（本機 Playwright）**：先確認系統是否能從本機（東京 IP）連線
     - `curl -s -o /dev/null -w "%{http_code}" https://wwadm.edcft.click/`
     - 回 200 或 302 → 用本機 Playwright 登入抓樣式
   - **方案 B（AWS WorkSpaces）**：本機連不上（403/timeout）→ 透過 WorkSpaces 遠端操控
     - Endpoint: `http://100.74.85.6:9222`
     - 用 PowerShell + Playwright (Node) 在 WorkSpaces 上截圖/抓 style
     - 截圖傳回本機分析
3. **系統截圖**：截取目標頁面/元件
4. **抓 computed style**：用 `getComputedStyle` 取精確數值（顏色、間距、圓角、字體）
5. **記錄差異**：列出 demo 目前樣式 vs 系統樣式的差異清單

### Phase 2：Plan 規劃（5 min）

1. **影響範圍盤點**：哪些檔案用到這個元件/樣式
2. **共用元件判斷**：是否該抽到 `components.js`
3. **批次修改清單**：列出所有要改的檔案 + 具體改什麼
4. **驗證標準**：改完後用什麼方式確認正確

### Phase 3：批次實作（一次改完）

1. 先改 `js/components.js`（共用元件）
2. 再改各頁面的 inline style（統一引用共用元件）
3. 一次 commit + push
4. 不要逐項 commit

### Phase 4：驗證 & 交付（5 min）

1. Playwright 截圖（`Cache-Control: no-cache` + 新 context）
2. `getComputedStyle` 比對系統數值
3. 標註截圖（annotate_screenshot.py）
4. 附連結交付

## 系統連線方案對照

| | 方案 A（本機） | 方案 B（AWS WorkSpaces） |
|---|---|---|
| 條件 | 系統允許東京 IP 存取 | 系統限制 AWS IP 才能存取 |
| 工具 | 本機 Playwright (Python) | WorkSpaces Node Playwright via HTTP |
| 截圖 | 直接存本機 | 需 base64 傳回或 SCP |
| 速度 | 快（3-5s） | 慢（10-15s） |
| 適用 | wwadm.edcft.click（目前可連） | 未來若 IP 白名單收緊 |

## SA 角度的效率調整

| 傳統 SA | 我的情況（AI + SA） |
|---------|-------------------|
| 寫 PRD → 交給前端 → review | 自己分析 + 自己實作 + 自己驗證 |
| 用 Figma 標註設計稿 | 直接從系統抓 computed style |
| 多輪 review 修改 | Plan 階段一次想清楚，實作一次到位 |
| 手動比對 UI | Playwright 自動截圖 + 數值比對 |

## 關鍵原則

- **先看系統再動手**：任何 UI 修改前，先去系統確認真實樣式
- **連線先判斷**：先 curl 測試，不通就走 WorkSpaces
- **共用優先**：能抽到 components.js 的就抽，不要各頁面各自定義
- **批次修改**：同類型的改動一次做完，不要改一個 push 一個
- **數值驗證**：不用 vision 猜，用 getComputedStyle 確認
- **CDN 確認**：截圖前加 no-cache header 確保最新版

## 適用場景

- Boss 說「這個跟系統不一樣」→ Phase 1 比對 → Phase 3 批次修
- Boss 說「加一個新元件」→ Phase 1 看系統怎麼做 → Phase 2 規劃共用 → Phase 3 實作
- Boss 說「把 X 套用到所有頁面」→ Phase 2 盤點影響範圍 → Phase 3 批次改

## 檔案結構

```
js/components.js     ← 共用元件（CSS 自動注入 + HTML 生成函數）
demo-components.html ← 元件展示頁（使用說明 + live demo）
nova-*.html          ← 各功能頁面（引用 components.js）
```
