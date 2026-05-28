
=== Nova 前台公會頁面完整佈局（from getComputedStyle） ===

【整體結構】
dialog (role="dialog")
├── div.sr-only (隱藏的 heading/paragraph)
└── div.content-wrapper
    ├── [0] tabs-wrap: flex-col justify-end items-center, h=72
    │   └── tablist: flex, rounded-8px, px-56, gap-8, w=384, h=28
    │       ├── tab "我的公會" (data-state=on): bg=oklab(0.553 0.00687528 0.0110332/0.2), color=white, rounded-full, px-12, font-14px/500, box-shadow: inset 1px 1px 1px rgba(17,17,17,0.21), inset -1px -1px 1px white
    │       ├── tab "所有公會" (data-state=off): bg=transparent, color=white, rounded-full, px-12
    │       └── tab "公會說明" (data-state=off): bg=transparent, color=white, rounded-full, px-12
    ├── [1] main-card-wrapper: flex-col, w=468, h=561
    │   └── card: relative z-20, overflow-y-auto, rounded-3xl(24px), bg=#fafafa, border=6px solid #f4b63f, padding=24px 8px 85px
    │       └── inner: flex-col items-center gap-16px, w=425
    │           ├── [0] profile-grid: grid grid-cols-[auto_1fr], gap-12px, h=100
    │           │   ├── badge: w-24 h-24(96px), rounded-full, bg=linear-gradient(to top, yellow-200, yellow-400)
    │           │   │   ├── overlay: absolute z-2, w-24 h-24, bg=white/10, rounded-full, shadow=inset -4px -6px 6px
    │           │   │   └── img: absolute z-1, w-24 h-24, object-cover, rounded-full, shadow=2px 2px 3px
    │           │   └── meta: flex-col items-start gap-4px
    │           │       ├── name-row: flex gap-4px → "窩要煙牌 Lv.0" (font-16px)
    │           │       └── btn-row: flex justify-end items-center gap-4px
    │           │           ├── 進入社群: w=104 h=48, rounded-full, inner bg=#ff842f, color=white, shadow=0 8px 16px rgba(230,60,0,.48) inset -2px -4px 2px rgba(230,80,0,1) inset 0 2px 1px rgba(255,253,247,.48)
    │           │           └── 設定: w=104 h=48, rounded-full, inner bg=blue-500(oklch 0.623 0.214 259.815), color=white, shadow=2px 2px 4px rgba(0,0,180,.4) inset...
    │           ├── [1] intro-card: grid grid-cols-[1fr_auto], p-8px, rounded-2xl(16px), bg=rgba(69,34,1,0.2), text=#452201, font-sm/semibold, min-h=80px
    │           │   → "這個公會很懶，沒有留下任何介紹^^"
    │           ├── [2] coin-section: button wrapper, rounded-16px, padding=4px
    │           │   └── inner: flex, bg=#fafafa, rounded-16px, shadow=0 4px 8px rgba(174,108,108,.48)..., color=#452201
    │           │       └── grid: grid-cols-1, py-24px, gap-12px, w=417, h=192
    │           │           ├── row1: grid grid-cols-[auto_1fr], px-24px, gap-16px, h=48 → "公會累積金幣 0"
    │           │           ├── divider: flex justify-evenly, px-16px, gap-12px, h=24
    │           │           └── row2: grid grid-cols-[1fr_auto], px-24px, gap-16px, h=48 → "金庫餘額 0 金幣提領"
    │           ├── [3] officers: w-full
    │           │   └── card: flex-col gap-16px, p-16px, rounded-2xl(16px), bg=rgba(69,34,1,0.2), text=#452201, font-sm/semibold
    │           │       → 會長/副會長/創會會長/公會人數
    │           └── [4] func-btns: flex-col items-center
    │               ├── btn: w=425 h=72, rounded-16px, padding=4px
    │               │   └── inner: flex, bg=#fafafa, rounded-16px, shadow=0 4px 8px rgba(174,108,108,.48)..., color=#452201
    │               │       └── grid: grid-cols-[auto_1fr_auto], px-24px, gap-16px, h=64
    │               │           ├── svg icon (24x24) — lucide icons
    │               │           ├── p.text-sm.text-[#452201] — 按鈕文字
    │               │           └── svg chevron-right (16x16)
    │               ├── 會員列表 (users)
    │               ├── 會員管理 (user-cog)
    │               ├── 紅包申請 (gem)
    │               ├── 紅包審核紀錄 (notebook-pen)
    │               ├── 紅包紀錄 (notebook-pen)
    │               ├── 入會審核 (newspaper)
    │               ├── 操作日誌 (scroll-text)
    │               └── 解散公會: w=200 h=56, rounded-full, bg=#ff842f, color=white, shadow=0 8px 16px rgba(230,60,0,.48)...
    └── [2] footer: fixed z-40 bottom-0, w=full, h=80, bg-repeat-x bg-center bg-contain
        → url("dialog_footer-Cp2HtLQf.png")

【關鍵色值】
- overlay: oklab(0 0 0 / 0.8)
- card bg: #fafafa
- card border: 6px solid #f4b63f
- text: #452201
- intro/officers bg: rgba(69,34,1, 0.2)
- 進入社群: #ff842f
- 設定: blue-500
- 解散公會: #ff842f
- tabs active: bg=oklab(0.553...) with inset shadow
- func btn shadow: 0 4px 8px rgba(174,108,108,.48)
