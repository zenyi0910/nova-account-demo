# Nova 公會頁面完整 CSS 規格（系統實測數據）

## 容器結構
- dialog: 1280x633, fixed, justify:center, align:center
- inner: 500x633, relative, flex-col, justify:flex-end, px-4
- header: 468x72, flex-col justify-end, shrink-0
- card: 468x561, flex-1, overflow-y-auto, bg:#fafafa, border:6px solid #f4b63f, border-radius:24px, padding:24px 8px 85px

## Tabs
- container: padding 0 56px, gap 8px, height 28px
- active: bg rgba(69,34,1,0.2), border-radius 9999px, height 28px
- shadow: inset 1px 1px 1px rgba(17,17,17,.21), inset -1px -1px 1px rgb(255,255,255)

## 徽章
- 96x96, border-radius 50%

## 進入社群/設定按鈕
- outer: padding 4px
- inner: 96x40, border-radius 9999px
- 進入社群: bg #ff842f, shadow: 0 8px 16px rgba(230,60,0,.48), inset -2px -4px 2px rgb(230,80,0), inset 0 2px 1px rgba(255,253,247,.48)
- 設定: bg oklch(0.623 0.214 259.815), shadow: 0 8px 16px rgba(0,0,180,.4), inset -2px -4px 2px rgba(0,0,100,.3), inset 0 2px 1px rgba(255,253,247,.48)

## 介紹區
- 425x96 (實測高度異常1196，應該是包含其他元素)
- bg: rgba(69,34,1,0.2), border-radius: 16px, padding: 8px
- font-size: 14px (系統實測16px但視覺是14px)

## 金幣區
- outer: padding 4px
- inner: 417x192, bg: #fafafa, border-radius: 16px
- shadow: 0 4px 8px rgba(174,108,108,.48), inset -2px -4px 2px rgb(210,184,184), inset 0 2px 1px rgba(255,253,247,.48)

## 金幣提領按鈕
- inner: 88x40, bg: #00dda4, border-radius: 9999px
- shadow: 0 8px 16px rgba(3,165,123,.48), inset -2px -4px 2px rgb(3,165,123), inset 0 2px 1px rgba(255,253,247,.48)

## 幹部區
- 425x160 (實測1196異常)
- bg: transparent, padding: 0, gap: 16px
- 每行: padding 6px 0, font-size 14px

## 功能按鈕（會員列表等）
- outer: padding 4px, height 72px
- inner: 417x64, bg: #fafafa, border-radius: 16px
- shadow: 0 4px 8px rgba(174,108,108,.48), inset -2px -4px 2px rgb(210,184,184), inset 0 2px 1px rgba(255,253,247,.48)
- grid: auto 1fr auto, gap 16px, padding 0 24px

## 解散公會按鈕
- outer: 200x56, padding 4px
- inner: 192x48, bg: #ff842f, border-radius: 9999px
- font: 14px/500
- shadow: 0 8px 16px rgba(230,60,0,.48), inset -2px -4px 2px rgb(230,80,0), inset 0 2px 1px rgba(255,253,247,.48)

## Footer & Close
- footer: fixed z-40 bottom-0, h-80px
- close: absolute z-50, 72x72, bottom 約20px
