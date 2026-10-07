"""Headless review captures of the preview on :3100 (desktop 1440 + mobile 390 @2x).
Run via scripts/preview/preview.ps1 -Capture; output dir is the first argument."""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(sys.argv[1])
BASE = "http://localhost:3100"
OUT.mkdir(parents=True, exist_ok=True)
ARGS = ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"]

def settle(page, ms=4500):
    page.wait_for_timeout(ms)

def full(page, name):
    # walk down so lazy images load and scroll reveals fire, then come back
    h = page.evaluate("document.documentElement.scrollHeight")
    y = 0
    while y < h:
        page.mouse.wheel(0, 700)
        page.wait_for_timeout(220)
        y += 700
        h = page.evaluate("document.documentElement.scrollHeight")
    page.wait_for_timeout(1500)
    page.evaluate("window.__lenis ? window.__lenis.scrollTo(0, {immediate: true}) : window.scrollTo(0, 0)")
    page.wait_for_timeout(800)
    page.screenshot(path=str(OUT / name), full_page=True)

with sync_playwright() as p:
    b = p.chromium.launch(args=ARGS)
    logs = []
    for label, vp, dpr in [("desktop", {"width": 1440, "height": 900}, 1), ("mobile", {"width": 390, "height": 844}, 2)]:
        ctx = b.new_context(viewport=vp, device_scale_factor=dpr, is_mobile=label == "mobile", has_touch=label == "mobile")
        page = ctx.new_page()
        page.on("console", lambda m, l=label: logs.append(f"[{l}] {m.type}: {m.text[:200]}") if m.type in ("error", "warning") else None)
        page.on("pageerror", lambda e, l=label: logs.append(f"[{l}] PAGEERROR {e}"))
        page.goto(BASE + "/", wait_until="load", timeout=90000)
        if label == "desktop":
            page.mouse.move(1000, 300)
        settle(page)
        page.screenshot(path=str(OUT / f"{label}-hero.png"))
        if label == "desktop":
            # poke the name: drag a stroke and let go, mid-wobble capture
            page.mouse.move(870, 300)
            page.mouse.down()
            page.mouse.move(820, 220, steps=8)
            page.wait_for_timeout(250)
            page.screenshot(path=str(OUT / "desktop-grab.png"))
            page.mouse.up()
            page.wait_for_timeout(300)
            page.screenshot(path=str(OUT / "desktop-wobble.png"))
        if label == "desktop":
            page.evaluate("document.querySelector('#work').scrollIntoView()")
            page.wait_for_timeout(1500)
            row = page.locator(".work-row__link").nth(2).bounding_box()
            page.mouse.move(row["x"] + 300, row["y"] + row["height"] / 2, steps=6)
            page.wait_for_timeout(900)
            page.mouse.move(row["x"] + 340, row["y"] + row["height"] / 2 + 6, steps=4)
            page.wait_for_timeout(400)
            page.screenshot(path=str(OUT / "desktop-work-hover.png"))
            page.mouse.move(5, 5)
            page.evaluate("document.querySelector('#contact').scrollIntoView({block: 'end'})")
            page.wait_for_timeout(2500)
            page.screenshot(path=str(OUT / "desktop-contact.png"))
            page.evaluate("window.scrollTo(0, 0)")
            page.wait_for_timeout(600)
        full(page, f"{label}.png")
        logs.append(f"[{label}] scrollWidth={page.evaluate('document.documentElement.scrollWidth')} innerWidth={page.evaluate('innerWidth')}")
        if label == "mobile":
            # viewport slices down to the footer: full-page mode repeats the top on mobile
            for old in OUT.glob("mobile-[0-9]*.png"):
                old.unlink()
            total = page.evaluate("document.documentElement.scrollHeight")
            vh = vp["height"]
            i, y = 1, 0
            while y < total:
                page.evaluate(f"window.__lenis ? window.__lenis.scrollTo({y}, {{immediate: true}}) : window.scrollTo(0, {y})")
                page.wait_for_timeout(1300)
                page.screenshot(path=str(OUT / f"mobile-{i}.png"))
                i += 1
                y += vh - 80
            logs.append(f"[mobile] slices={i-1} total={total}")
        page.goto(BASE + "/work/clinicpulse", wait_until="load", timeout=90000)
        settle(page, 1500)
        full(page, f"{label}-project.png")
        ctx.close()
    b.close()
    (OUT / "console.txt").write_text("\n".join(logs), encoding="utf-8")
    print("\n".join(logs[-20:]) or "no console errors/warnings")
