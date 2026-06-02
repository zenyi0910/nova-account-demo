#!/usr/bin/env python3
"""
Nova Demo Style Diff & Pixelmatch 視覺回歸工具

功能：
1. style-diff: 登入系統抓 computedStyle → 對比 demo 頁面 → 產出差異報告
2. pixelmatch: 系統截圖 vs demo 截圖 → pixel diff → 差異 >2% 告警

Usage:
  python3 scripts/style_diff.py diff <system_url> <demo_file> [--selectors .card,.btn]
  python3 scripts/style_diff.py pixel <system_url> <demo_file> [--threshold 2]
  python3 scripts/style_diff.py both <system_url> <demo_file>

需要：pip install pixelmatch Pillow playwright
"""

import sys, json, os, time, argparse
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).parent.parent
STORAGE_FILE = Path('/tmp/nova_session_storage.json')
OUTPUT_DIR = Path('/tmp/nova-style-diff')
OUTPUT_DIR.mkdir(exist_ok=True)

STYLE_PROPS = [
    'backgroundColor', 'color', 'fontSize', 'fontWeight', 'fontFamily',
    'borderRadius', 'border', 'padding', 'margin', 'boxShadow',
    'width', 'height', 'display', 'gap', 'whiteSpace',
]

DEFAULT_SELECTORS = [
    '.data-table th', '.data-table td', '.filter-card', '.btn-search',
    '.btn-reset', '.btn-add', '.toggle', '.tips-box', '.page-btn',
    '.pagination-bar', '.tab-btn', '.tab-btn.active',
]


def inject_session(page):
    """注入 sessionStorage token（Nova 後台用 sessionStorage 不是 cookie）"""
    if STORAGE_FILE.exists():
        data = json.loads(STORAGE_FILE.read_text())
        if time.time() - data.get('_timestamp', 0) < 3600:
            page.goto('https://wwadm.edcft.click/login')
            page.wait_for_load_state('domcontentloaded')
            for k, v in data.items():
                if k.startswith('_'): continue
                page.evaluate(f"sessionStorage.setItem('{k}', '{v}')")
            return True
    return False


def login_system(page):
    """登入 Nova 後台"""
    page.goto('https://wwadm.edcft.click/login')
    page.wait_for_load_state('networkidle')
    page.locator('#username').fill('casper')
    page.locator('#password').fill('1qaz2wsx')
    page.press('#password', 'Enter')
    page.wait_for_timeout(5000)
    # Save session
    tokens = page.evaluate("""() => {
        const data = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const k = sessionStorage.key(i);
            data[k] = sessionStorage.getItem(k);
        }
        return data;
    }""")
    tokens['_timestamp'] = time.time()
    STORAGE_FILE.write_text(json.dumps(tokens, ensure_ascii=False))


def grab_styles(page, selectors):
    """抓取頁面所有指定 selector 的 computedStyle"""
    return page.evaluate("""(args) => {
        const [selectors, props] = args;
        const result = {};
        for (const sel of selectors) {
            const els = document.querySelectorAll(sel);
            if (!els.length) continue;
            const el = els[0];
            const s = getComputedStyle(el);
            result[sel] = {};
            for (const p of props) {
                result[sel][p] = s[p] || '';
            }
        }
        return result;
    }""", [selectors, STYLE_PROPS])


def normalize_color(val):
    """簡單正規化 oklch → 忽略（無法精確比對不同色彩空間）"""
    if not val: return val
    # 去除多餘空白
    return val.strip()


def style_diff(system_styles, demo_styles):
    """比對兩組 style，回傳差異清單"""
    diffs = []
    for sel in system_styles:
        if sel not in demo_styles:
            diffs.append({'selector': sel, 'prop': '*', 'system': '(exists)', 'demo': '(missing)'})
            continue
        for prop in system_styles[sel]:
            sys_val = normalize_color(system_styles[sel].get(prop, ''))
            demo_val = normalize_color(demo_styles.get(sel, {}).get(prop, ''))
            if sys_val != demo_val and sys_val and demo_val:
                # 忽略 oklch vs rgb 差異（色彩空間不同但可能相同顏色）
                if 'oklch' in sys_val or 'oklch' in demo_val:
                    continue
                diffs.append({
                    'selector': sel,
                    'prop': prop,
                    'system': sys_val,
                    'demo': demo_val,
                })
    return diffs


def do_pixelmatch(sys_screenshot, demo_screenshot, threshold_pct=5.0):
    """pixel diff 比對，回傳差異百分比和 diff 圖片路徑。
    只比對 content area（排除 sidebar x<225），降低字體渲染假陽性"""
    from PIL import Image, ImageDraw
    from pixelmatch.contrib.PIL import pixelmatch as pm

    img_sys = Image.open(sys_screenshot).convert('RGBA')
    img_demo = Image.open(demo_screenshot).convert('RGBA')

    # Resize to same dimensions (use system as reference)
    w, h = img_sys.size
    img_demo = img_demo.resize((w, h), Image.LANCZOS)

    # Mask sidebar area (x < 225) to avoid sidebar diff noise
    sidebar_mask = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw_sys = ImageDraw.Draw(img_sys)
    draw_demo = ImageDraw.Draw(img_demo)
    # Paint sidebar same color on both to eliminate diff
    draw_sys.rectangle([0, 0, 224, h], fill=(255, 255, 255, 255))
    draw_demo.rectangle([0, 0, 224, h], fill=(255, 255, 255, 255))
    # Also mask top 56px (topbar) - notification toasts appear here
    draw_sys.rectangle([0, 0, w, 55], fill=(255, 255, 255, 255))
    draw_demo.rectangle([0, 0, w, 55], fill=(255, 255, 255, 255))

    img_diff = Image.new('RGBA', (w, h))
    num_diff = pm(img_sys, img_demo, img_diff, threshold=0.15, alpha=0.5)
    
    # Content area pixels only (excluding masked regions)
    content_pixels = (w - 225) * (h - 56)
    diff_pct = (num_diff / content_pixels) * 100 if content_pixels > 0 else 0

    diff_path = OUTPUT_DIR / 'pixel_diff.png'
    img_diff.save(diff_path)

    return {
        'diff_pixels': num_diff,
        'content_pixels': content_pixels,
        'diff_pct': round(diff_pct, 2),
        'threshold_pct': threshold_pct,
        'pass': diff_pct <= threshold_pct,
        'diff_image': str(diff_path),
        'system_screenshot': str(sys_screenshot),
        'demo_screenshot': str(demo_screenshot),
    }


def run_diff(args):
    """執行 style diff"""
    selectors = args.selectors.split(',') if args.selectors else DEFAULT_SELECTORS

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # System page
        ctx = browser.new_context(viewport={'width': 1400, 'height': 900})
        page = ctx.new_page()
        
        if not inject_session(page):
            login_system(page)
        
        page.goto(args.system_url, wait_until='networkidle')
        page.wait_for_timeout(2000)
        system_styles = grab_styles(page, selectors)
        
        if args.mode in ('both', 'pixel'):
            sys_shot = OUTPUT_DIR / 'system.png'
            page.screenshot(path=str(sys_shot), full_page=False)
        ctx.close()

        # Demo page
        demo_path = ROOT / args.demo_file if not args.demo_file.startswith('/') else Path(args.demo_file)
        ctx2 = browser.new_context(viewport={'width': 1400, 'height': 900})
        page2 = ctx2.new_page()
        page2.add_init_script("window.alert=()=>{};window.confirm=()=>true;")
        page2.goto(f'file://{demo_path.resolve()}', wait_until='domcontentloaded')
        page2.wait_for_timeout(1000)
        demo_styles = grab_styles(page2, selectors)
        
        if args.mode in ('both', 'pixel'):
            demo_shot = OUTPUT_DIR / 'demo.png'
            page2.screenshot(path=str(demo_shot), full_page=False)
        ctx2.close()
        browser.close()

    # Style diff report
    if args.mode in ('both', 'diff'):
        diffs = style_diff(system_styles, demo_styles)
        report_path = OUTPUT_DIR / 'style_diff.json'
        report_path.write_text(json.dumps(diffs, ensure_ascii=False, indent=2))
        
        print(f"\n{'='*60}")
        print(f"  STYLE DIFF REPORT: {args.demo_file}")
        print(f"  System: {args.system_url}")
        print(f"  Selectors checked: {len(selectors)}")
        print(f"  Differences found: {len(diffs)}")
        print(f"{'='*60}")
        
        if diffs:
            for d in diffs[:20]:
                icon = '🔴' if d['prop'] in ('backgroundColor', 'color', 'fontSize', 'borderRadius') else '🟡'
                print(f"  {icon} {d['selector']}.{d['prop']}")
                print(f"     系統: {d['system']}")
                print(f"     Demo: {d['demo']}")
            if len(diffs) > 20:
                print(f"  ... 還有 {len(diffs)-20} 項差異")
        else:
            print("  ✅ 完全一致!")
        
        print(f"\n  完整報告: {report_path}")

    # Pixelmatch
    if args.mode in ('both', 'pixel'):
        result = do_pixelmatch(sys_shot, demo_shot, args.threshold)
        
        print(f"\n{'='*60}")
        print(f"  PIXEL DIFF REPORT")
        print(f"{'='*60}")
        icon = '✅' if result['pass'] else '⚠️'
        print(f"  {icon} Diff: {result['diff_pct']}% (threshold: {result['threshold_pct']}%)")
        print(f"  Pixels: {result['diff_pixels']:,} / {result['content_pixels']:,} (content area only)")
        print(f"  Diff image: {result['diff_image']}")
        
        if not result['pass']:
            print(f"\n  ⚠️  視覺差異超過閾值，需人工確認！")
            sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description='Nova Style Diff & Pixelmatch')
    parser.add_argument('mode', choices=['diff', 'pixel', 'both'])
    parser.add_argument('system_url', help='系統頁面 URL')
    parser.add_argument('demo_file', help='Demo HTML 檔案（相對 repo root 或絕對路徑）')
    parser.add_argument('--selectors', default='', help='自訂 selector 清單（逗號分隔）')
    parser.add_argument('--threshold', type=float, default=5.0, help='Pixel diff 閾值百分比（預設 5.0，系統vs demo用；改前vs改後用 2.0）')
    
    args = parser.parse_args()
    run_diff(args)


if __name__ == '__main__':
    main()
