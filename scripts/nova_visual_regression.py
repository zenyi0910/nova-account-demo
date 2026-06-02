#!/usr/bin/env python3
"""pixelmatch 視覺回歸：系統截圖 vs demo 截圖 pixel diff，>2% 告警"""
import json, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
from nova_storage_state import get_context, ADMIN_URL

DEMO_BASE = 'http://122.117.7.104:5050/static/nova-account-demo'
OUTPUT_DIR = Path('/tmp/nova_visual_regression')
THRESHOLD = 0.02  # 2%

PAGE_MAP = [
    ('/guild-management/guild-list', 'nova-guild-list.html'),
    ('/guild-management/red-envelope-review', 'nova-redpacket-review.html'),
    ('/guild-management/guild-action-history', 'nova-guild-log.html'),
]


def pixel_diff_ratio(img1_path, img2_path, diff_path=None):
    """用 PIL 計算兩張圖的 pixel 差異比例"""
    from PIL import Image
    import numpy as np

    img1 = Image.open(img1_path).convert('RGB')
    img2 = Image.open(img2_path).convert('RGB')

    # 統一尺寸（取較小的）
    w = min(img1.width, img2.width)
    h = min(img1.height, img2.height)
    img1 = img1.resize((w, h))
    img2 = img2.resize((w, h))

    arr1 = np.array(img1)
    arr2 = np.array(img2)

    # 計算每 pixel RGB 差異 > 30 視為不同
    diff = np.abs(arr1.astype(int) - arr2.astype(int))
    diff_mask = diff.max(axis=2) > 30
    ratio = diff_mask.sum() / diff_mask.size

    # 產出 diff image（紅色標記差異區域）
    if diff_path:
        result = arr2.copy()
        result[diff_mask] = [255, 0, 0]
        Image.fromarray(result.astype(np.uint8)).save(diff_path)

    return ratio


def run(pages=None):
    pages = pages or PAGE_MAP
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for admin_path, demo_file in pages:
            name = admin_path.split('/')[-1]
            sys_png = OUTPUT_DIR / f'{name}_system.png'
            demo_png = OUTPUT_DIR / f'{name}_demo.png'
            diff_png = OUTPUT_DIR / f'{name}_diff.png'

            # 系統截圖（用 get_context 注入 sessionStorage）
            ctx, page = get_context(browser)
            page.goto(f'{ADMIN_URL}{admin_path}', wait_until='networkidle', timeout=20000)
            page.screenshot(path=str(sys_png), full_page=True)
            ctx.close()

            # Demo 截圖
            ctx2 = browser.new_context(viewport={'width': 1700, 'height': 1000})
            page2 = ctx2.new_page()
            page2.goto(f'{DEMO_BASE}/{demo_file}?_={int(time.time())}', wait_until='networkidle', timeout=20000)
            page2.screenshot(path=str(demo_png), full_page=True)
            ctx2.close()

            # Pixel diff
            ratio = pixel_diff_ratio(sys_png, demo_png, diff_png)
            status = '⚠️  FAIL' if ratio > THRESHOLD else '✓ PASS'
            results.append({'page': name, 'diff_ratio': f'{ratio:.2%}', 'status': status, 'diff_image': str(diff_png)})
            print(f'{status} {name}: {ratio:.2%}')

        browser.close()

    report_path = OUTPUT_DIR / 'report.json'
    report_path.write_text(json.dumps(results, ensure_ascii=False, indent=2))
    print(f'\n[DONE] Report → {report_path}')
    return results


if __name__ == '__main__':
    run()
