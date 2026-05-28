# Nova 前台公會頁面 CSS 規格（從系統 console 提取）

## 佈局結構
- dialog: fixed, 1280x633, justify:center, align:center
- inner: relative, 500x633(h-full), flex-col, justify:flex-end, px-4, max-w-500px
- header: 468x72, shrink-0, flex-col justify-end
- cardContainer: 468x561, relative, flex-col, shrink, min-h-0
- card: 468x561, flex-1, overflow-y-auto, px-2 pt-6 pb-[85px], rounded-3xl
  - bg: #fafafa, border: 6px solid #f4b63f, border-radius: 24px
- footer: fixed z-40 bottom-0 w-full h-80px, bg-repeat-x
- close: absolute z-50, 72x72, top=539 (from dialog top)

## Tabs
- container: 384x28, padding: 0 56px, gap: 8px, bg: transparent, border-radius: 8px
- active tab: bg rgba(69,34,1,0.2), color #fff, border-radius: 9999px
  - box-shadow: inset 1px 1px 1px rgba(17,17,17,.21), inset -1px -1px 1px rgb(255,255,255)
- inactive: bg transparent, color #fff

## 進入社群按鈕
- outer: 104x48, padding: 4px
- inner: 96x40, bg: #ff842f, color: #fff, border-radius: 9999px
- shadow: 0 8px 16px rgba(230,60,0,.48), inset -2px -4px 2px rgb(230,80,0), inset 0 2px 1px rgba(255,253,247,.48)

## 設定按鈕
- outer: 104x48, padding: 4px
- inner: 96x40, bg: oklch(0.623 0.214 259.815), color: #fff, border-radius: 9999px
- shadow: 0 8px 16px rgba(0,0,180,.4), inset -2px -4px 2px rgba(0,0,100,.3), inset 0 2px 1px rgba(255,253,247,.48)

## 金幣區
- outer: 425x200, padding: 4px, border-radius: 16px
- inner: 417x192, bg: #fafafa, border-radius: 16px
- shadow: 0 4px 8px rgba(174,108,108,.48), inset -2px -4px 2px rgb(210,184,184), inset 0 2px 1px rgba(255,253,247,.48)

## 金幣提領按鈕
- inner: 88x40, bg: #00dda4, color: #fff, border-radius: 9999px
- shadow: 0 8px 16px rgba(3,165,123,.48), inset -2px -4px 2px rgb(3,165,123), inset 0 2px 1px rgba(255,253,247,.48)

## 功能按鈕（會員列表等）
- outer: 425x72, padding: 4px, border-radius: 16px
- inner: 417x64, bg: #fafafa, border-radius: 16px
- shadow: 0 4px 8px rgba(174,108,108,.48), inset -2px -4px 2px rgb(210,184,184), inset 0 2px 1px rgba(255,253,247,.48)
- grid: auto 1fr auto, gap: 16px, padding: 0 24px
- font: 14px/500, color: #452201

## 解散公會按鈕
- outer: 200x56, padding: 4px, margin: 8px 0
- inner: 192x48, bg: #ff842f, color: #fff, border-radius: 9999px
- shadow: 0 8px 16px rgba(230,60,0,.48), inset -2px -4px 2px rgb(230,80,0), inset 0 2px 1px rgba(255,253,247,.48)

## 公會介紹區
- 425x96, bg: rgba(69,34,1,0.2), border-radius: 16px, padding: 8px

## 徽章
- 96x96, border-radius: 50%

## 幹部區
- 425x160, bg: transparent, no border-radius
