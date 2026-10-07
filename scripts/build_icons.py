"""Builds the site icons from the clay avatar's own render (Yahia's pick, 2026-10-07:
his head in a paper circle).

Source: .impeccable/review/avatar-icon-src.png, rendered from the built site by
  powershell -File scripts/preview/preview.ps1 -Extra scripts/preview/capture_icon.py
Writes:
  src/app/favicon.ico    tab icon, head in a chalk-paper circle, 16-64 px
  src/app/apple-icon.png home-screen icon, 180 px, full-bleed paper (iOS masks it)
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / ".impeccable/review/avatar-icon-src.png"
PAPER = (0xEC, 0xEE, 0xF2, 255)


def head_square(img: Image.Image) -> Image.Image:
    """A square around the head: hair to chin with a little neck, ears inside."""
    alpha = img.getchannel("A")
    top = alpha.getbbox()[1]
    # the head is the widest thing above the shoulders
    head_w, cx = 0, img.width / 2
    for y in range(top, top + int(img.height * 0.42)):
        row = alpha.crop((0, y, img.width, y + 1)).getbbox()
        if row and row[2] - row[0] > head_w:
            head_w, cx = row[2] - row[0], (row[0] + row[2]) / 2
    side = head_w * 1.2
    y0 = top - side * 0.03
    return img.crop((round(cx - side / 2), round(y0), round(cx + side / 2), round(y0 + side)))


def in_circle(head: Image.Image, size: int) -> Image.Image:
    big = size * 8
    disc = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    ImageDraw.Draw(disc).ellipse([0, 0, big - 1, big - 1], fill=PAPER)
    face = head.resize((big, big), Image.LANCZOS)
    mask = Image.new("L", (big, big), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, big - 1, big - 1], fill=255)
    clipped = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    clipped.paste(face, (0, 0), Image.composite(face.getchannel("A"), mask, mask))
    disc.alpha_composite(clipped)
    return disc.resize((size, size), Image.LANCZOS)


def on_paper(head: Image.Image, size: int, fill: float = 0.86) -> Image.Image:
    tile = Image.new("RGBA", (size, size), PAPER)
    s = round(size * fill)
    face = head.resize((s, s), Image.LANCZOS)
    tile.alpha_composite(face, ((size - s) // 2, size - s))  # sits on the bottom edge
    return tile.convert("RGB")


if __name__ == "__main__":
    head = head_square(Image.open(SRC).convert("RGBA"))
    sizes = [16, 24, 32, 48, 64]
    frames = [in_circle(head, s) for s in sizes]
    frames[-1].save(ROOT / "src/app/favicon.ico", sizes=[(s, s) for s in sizes], append_images=frames[:-1])
    on_paper(head, 180).save(ROOT / "src/app/apple-icon.png", optimize=True)
    print("favicon.ico", sizes, "+ apple-icon.png 180")
