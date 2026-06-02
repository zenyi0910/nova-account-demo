#!/usr/bin/env python3
"""自動 style diff 報告：系統 vs demo computedStyle JSON diff"""
import json, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
from nova_storage_state import get_context, ADMIN_URL, load_or_refresh, SESSION_PATH

DEMO_BASE = 'http://122.117.7.104:5050/static/nova-account-demo'
OUTPUT = Path('/tmp/nova_style_diff.json')

# 頁面對照表：(後台路徑, demo 檔名, 要抓的 selector 清單)
PAGE_MAP = [
    ('/guild-management/guild-list', 'nova-guild-list.html', [
        '.data-table th', '.data-table td', '.btn', '.badge'
    ]),
    ('/guild-management/red-envelope-review', 'nova-redpacket-review.html', [
        '.data-table th', '.data-table td', '.btn', '.badge'
    ]),
]

PROPS = ['backgroundColor', 'color', 'fontSize', 'fontWeight', 'borderRadius', 'padding', 'border']

EXTRACT_JS = '''(selectors) => {
    const props = %s;
    const result = {};
    selectors.forEach(sel => {
        const els = document.querySelectorAll(sel);
        if (els.length === 0) return;
        const el = els[0];
        const s = getComputedStyle(el);
        result[sel] = {};
        props.forEach(p => { result[sel][p] = s[p]; });
    });
    return result;
}''' % json.dumps(PROPS)


def extract_styles(page, selectors):
    return page.evaluate(EXTRACT_JS, selectors)


def diff_styles(system, demo):
    """比較兩組 styles，回傳差異"""
    diffs = []
    for sel in system:
        if sel not in demo:
            diffs.append({'selector': sel, 'issue': 'missing_in_demo'})
            continue
        for prop in system[sel]:
            sys_val = system[sel][prop]
            demo_val = demo[sel].get(prop, '')
            if sys_val != demo_val:
                diffs.append({
                    'selector': sel,
                    'property': prop,
                    'system': sys_val,
                    'demo': demo_val
                })
    return diffs


def run(pages=None):
    pages = pages or PAGE_MAP
    all_diffs = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for admin_path, demo_file, selectors in pages:
            page_key = admin_path.split('/')[-1]

            # 系統（用 get_context 注入 sessionStorage）
            ctx, page = get_context(browser)
            page.goto(f'{ADMIN_URL}{admin_path}', wait_until='networkidle', timeout=20000)
            sys_styles = extract_styles(page, selectors)
            ctx.close()

            # Demo
            ctx2 = browser.new_context(viewport={'width': 1700, 'height': 1000})
            page2 = ctx2.new_page()
            page2.goto(f'{DEMO_BASE}/{demo_file}?_={int(time.time())}', wait_until='networkidle', timeout=20000)
            demo_styles = extract_styles(page2, selectors)
            ctx2.close()

            diffs = diff_styles(sys_styles, demo_styles)
            if diffs:
                all_diffs[page_key] = diffs

        browser.close()

    OUTPUT.write_text(json.dumps(all_diffs, ensure_ascii=False, indent=2))
    total = sum(len(v) for v in all_diffs.values())
    print(f'[DONE] {total} differences across {len(all_diffs)} pages → {OUTPUT}')
    return all_diffs


if __name__ == '__main__':
    run()
