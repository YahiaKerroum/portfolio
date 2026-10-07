"""Renders the clay avatar from the preview on :3100 for the site icons: transparent
background, no grain or fade, eyes on the viewer, at 4x. Takes a few frames and
keeps the one with the eyes most open, so a blink never ends up in the icon.
Run via: powershell -File scripts/preview/preview.ps1 -Extra scripts/preview/capture_icon.py
Writes <out>/avatar-icon-src.png (argv[1]); scripts/build_icons.py turns it into icons."""
import io
import sys
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright

OUT = Path(sys.argv[1])
BASE = "http://localhost:3100"
GPU = ["--use-angle=d3d11", "--ignore-gpu-blocklist", "--enable-gpu"]
SWIFT = ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"]
CLEAN = """
html, body { background: transparent !important; }
.grain, .site-header, .soft-name, .hero__copy, .hero__hint { visibility: hidden !important; }
.avatar { -webkit-mask-image: none !important; mask-image: none !important; }
"""


def openness(img: Image.Image) -> int:
    """dark pixels in the eye band: more iris showing = eyes more open"""
    w, h = img.size
    flat = Image.alpha_composite(Image.new("RGBA", img.size, "white"), img).convert("L")
    band = flat.crop((int(w * 0.25), int(h * 0.22), int(w * 0.75), int(h * 0.36)))
    return sum(band.histogram()[:70])


def render(p, args):
    b = p.chromium.launch(args=args)
    page = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=4).new_page()
    page.goto(BASE + "/", wait_until="load", timeout=90000)
    page.add_style_tag(content=CLEAN)
    box = page.locator(".avatar").first.bounding_box()
    page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] * 0.35)  # look straight out
    page.wait_for_timeout(7000)
    shots = []
    for _ in range(5):
        png = page.locator(".avatar").first.screenshot(omit_background=True, timeout=90000)
        shots.append(Image.open(io.BytesIO(png)).convert("RGBA"))
        page.wait_for_timeout(450)
    b.close()
    return max(shots, key=openness)


with sync_playwright() as p:
    try:
        best = render(p, GPU)
    except Exception:  # no usable GPU in headless: software rendering is slower but fine
        best = render(p, SWIFT)
OUT.mkdir(parents=True, exist_ok=True)
best.save(OUT / "avatar-icon-src.png")
print(f"avatar-icon-src.png {best.size}")
