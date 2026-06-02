#!/usr/bin/env python3
"""parallel context 加速：多頁截圖並行抓取（async playwright）"""
import asyncio, json, sys, time
from pathlib import Path
from playwright.async_api import async_playwright

sys.path.insert(0, str(Path(__file__).parent))

ADMIN_URL = 'https://wwadm.edcft.click'
STORAGE_PATH = Path('/tmp/nova_storage.json')
SESSION_PATH = Path('/tmp/nova_session_storage.json')
OUTPUT_DIR = Path('/tmp/nova_parallel_screenshots')
MAX_CONCURRENCY = 4

# 預設頁面清單
DEFAULT_PAGES = [
    ('/guild-management/guild-list', 'guild-list.png'),
    ('/guild-management/red-envelope-review', 'rp-review.png'),
    ('/guild-management/guild-action-history', 'action-log.png'),
    ('/guild-management/guild-contributions', 'contributions.png'),
    ('/guild-management/red-envelope-records', 'rp-records.png'),
]


async def screenshot_page(browser, storage, ss, path, output_file, semaphore):
    """單頁截圖（含 semaphore 限制並行數）"""
    async with semaphore:
        ctx = await browser.new_context(
            viewport={'width': 1700, 'height': 1000},
            storage_state=storage
        )
        page = await ctx.new_page()
        try:
            # 注入 sessionStorage
            await page.goto(f'{ADMIN_URL}/login', wait_until='domcontentloaded')
            await page.evaluate('(data) => { for(const [k,v] of Object.entries(data)) sessionStorage.setItem(k,v); }', ss)
            await page.goto(f'{ADMIN_URL}{path}', wait_until='networkidle', timeout=20000)
            await page.screenshot(path=str(output_file), full_page=True)
            print(f'  ✓ {path} → {output_file.name}')
        except Exception as e:
            print(f'  ✗ {path}: {e}')
        finally:
            await ctx.close()


async def batch_screenshots(pages=None, output_dir=None):
    pages = pages or DEFAULT_PAGES
    output_dir = Path(output_dir) if output_dir else OUTPUT_DIR
    output_dir.mkdir(parents=True, exist_ok=True)

    if not SESSION_PATH.exists():
        print('[ERROR] No session. Run nova_storage_state.py --refresh first.')
        sys.exit(1)

    storage = json.loads(STORAGE_PATH.read_text())
    ss = json.loads(SESSION_PATH.read_text())
    semaphore = asyncio.Semaphore(MAX_CONCURRENCY)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        tasks = [
            screenshot_page(browser, storage, ss, path, output_dir / fname, semaphore)
            for path, fname in pages
        ]
        t0 = time.time()
        await asyncio.gather(*tasks)
        elapsed = time.time() - t0
        await browser.close()

    print(f'\n[DONE] {len(pages)} pages in {elapsed:.1f}s (concurrency={MAX_CONCURRENCY})')


if __name__ == '__main__':
    asyncio.run(batch_screenshots())
