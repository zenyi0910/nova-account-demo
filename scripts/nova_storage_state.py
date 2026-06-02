#!/usr/bin/env python3
"""Nova storageState 持久化工具：登入後存 session，後續直接載入跳過登入。"""
import json, os, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright

STORAGE_PATH = Path('/tmp/nova_storage.json')
SESSION_PATH = Path('/tmp/nova_session_storage.json')
ADMIN_URL = 'https://wwadm.edcft.click'
CREDS = {'username': 'casper', 'password': '1qaz2wsx'}
MAX_AGE = 3600  # 1 hour

def is_valid():
    """檢查 session 是否存在且未過期"""
    if not SESSION_PATH.exists():
        return False
    age = time.time() - SESSION_PATH.stat().st_mtime
    return age < MAX_AGE

def login_and_save():
    """登入後台並存 storageState + sessionStorage"""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(viewport={'width': 1700, 'height': 1000})
        page = ctx.new_page()
        page.goto(f'{ADMIN_URL}/login', wait_until='networkidle')
        page.locator('#username').fill(CREDS['username'])
        page.locator('#password').fill(CREDS['password'])
        page.press('#password', 'Enter')
        page.wait_for_timeout(3000)
        page.wait_for_load_state('networkidle')
        assert '/login' not in page.url, f'Login failed, still at {page.url}'
        # 存 storageState (localStorage)
        storage = ctx.storage_state()
        STORAGE_PATH.write_text(json.dumps(storage, ensure_ascii=False))
        # 存 sessionStorage (token 在這裡)
        ss = page.evaluate('() => { const d={}; for(let i=0;i<sessionStorage.length;i++){const k=sessionStorage.key(i);d[k]=sessionStorage.getItem(k);} return d; }')
        SESSION_PATH.write_text(json.dumps(ss, ensure_ascii=False))
        browser.close()
    print(f'[OK] session saved → {SESSION_PATH} ({len(ss)} keys)')
    return storage, ss

def load_or_refresh():
    """載入現有 session，過期則重新登入"""
    if is_valid():
        print(f'[OK] session valid (age: {int(time.time() - SESSION_PATH.stat().st_mtime)}s)')
        return json.loads(STORAGE_PATH.read_text()), json.loads(SESSION_PATH.read_text())
    print('[INFO] session expired or missing, re-login...')
    return login_and_save()

def get_context(browser, **kwargs):
    """建立帶 session 的 browser context + page（自動注入 sessionStorage）"""
    storage, ss = load_or_refresh()
    defaults = {'viewport': {'width': 1700, 'height': 1000}, 'storage_state': storage}
    defaults.update(kwargs)
    ctx = browser.new_context(**defaults)
    page = ctx.new_page()
    # 先載入任意頁面讓 origin 生效，再注入 sessionStorage
    page.goto(f'{ADMIN_URL}/login', wait_until='domcontentloaded')
    page.evaluate('(data) => { for(const [k,v] of Object.entries(data)) sessionStorage.setItem(k,v); }', ss)
    return ctx, page

if __name__ == '__main__':
    if '--check' in sys.argv:
        print(f'Valid: {is_valid()}')
        if SESSION_PATH.exists():
            print(f'Age: {int(time.time() - SESSION_PATH.stat().st_mtime)}s')
    elif '--refresh' in sys.argv:
        login_and_save()
    else:
        load_or_refresh()
