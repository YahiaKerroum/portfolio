"""Build the web images the portfolio ships from the screenshots in PROJECTS/.

Writes, per project, public/work/<slug>/cover.webp (the title image) and one
webp per curated screenshot, then a manifest of paths and sizes to
src/content/media.generated.json.

Run from the project root:  python scripts/build_assets.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
P = ROOT / "PROJECTS"
PUB = ROOT / "public"

SHOTS = {
    "kanoun": [P / f"Kanoun-Portfolio/framed/{n}.png" for n in [
        "staff-kitchen", "guest-menu-mobile", "guest-dish-mobile", "staff-orders", "guest-receipt-mobile",
        "back-office-menu", "staff-tables", "back-office-reports", "desktop-launcher"]],
    "fpl-assistant": [P / f"fpl ASSISTANT Portfolio/screenshots/{n}.png" for n in [
        "lineup", "transfers", "captain", "fixtures", "compare", "news"]],
    "qima": [P / f"laptop price intelligence portfolio/{n}.png" for n in [
        "00-home", "01-estimate", "02-estimate-gaming", "03-deals", "04-market-overview", "05-market-condition", "06-market-scatter"]],
    "dzairai": [P / f"dzairai portfolio/screenshots/{n}.png" for n in [
        "home", "experts", "datasets", "dataset-detail", "events", "companies", "news", "blog-post"]],
    "drone-planner": [P / f"Drone Based Delivery Optimization Portfolio/{n}.png" for n in [
        "02-flight-replay", "01-planner", "03-convergence", "04-search-tree"]],
    "clinicpulse": [P / f"ClinicPulse-Portfolio/screenshots/{n}.png" for n in [
        "dashboard", "patients", "patient-detail", "appointments-schedule", "treatments", "finances-payments", "reports", "permissions"]],
    "quiz": [P / f"Quizplatform portfolio/framed/{n}.png" for n in [
        "05_quiz", "03_dashboard", "06_result", "04_history", "07_admin_catalog", "09_admin_import", "10_admin_simulate"]],
    "findar": [PUB / f"projects/{n}.webp" for n in ["findar-hero-mockup", "findar-advanced-search"]],
    "sentinel": [],
}

COVERS = {
    "kanoun": P / "Kanoun-Portfolio/kanoun-title.png",
    "fpl-assistant": P / "fpl ASSISTANT Portfolio/title.png",
    "qima": P / "laptop price intelligence portfolio/title.png",
    "dzairai": P / "dzairai portfolio/title.png",
    "drone-planner": P / "Drone Based Delivery Optimization Portfolio/title-image.png",
    "clinicpulse": P / "ClinicPulse-Portfolio/title-v2.png",
    "quiz": P / "Quizplatform portfolio/00_title_image.png",
    "findar": PUB / "projects/findar.webp",
    "sentinel": P / "Sentinel Title.jpg",
}


def slug(stem: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", stem.lower()).strip("-")


def save_webp(img: Image.Image, path: Path, width: int, q=82):
    img = img.convert("RGB")
    if img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    img.save(path, "WEBP", quality=q, method=6)
    return img.size


def main():
    manifest = {}
    for key, cover in COVERS.items():
        out = PUB / "work" / key
        out.mkdir(parents=True, exist_ok=True)
        w, h = save_webp(Image.open(cover), out / "cover.webp", 1800)
        shots = []
        for f in SHOTS[key]:
            name = slug(f.stem) + ".webp"
            sw, sh = save_webp(Image.open(f), out / name, 1600)
            shots.append({"src": f"/work/{key}/{name}", "w": sw, "h": sh, "file": f.stem})
        manifest[key] = {"cover": {"src": f"/work/{key}/cover.webp", "w": w, "h": h}, "shots": shots}
        print(key, len(shots))
    (ROOT / "src/content/media.generated.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
