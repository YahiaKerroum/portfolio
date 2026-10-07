"""Trace the monoline Arabic name into tube centrelines for the hero.

Renders the word in Readex Pro (thin), skeletonizes it, walks the skeleton graph
into strokes (merging through junctions along the straightest continuation),
smooths them, and writes src/content/name-strokes.json in a unit box.

Needs scripts/fonts/ReadexPro[HEXP,wght].ttf (OFL, from github.com/google/fonts,
ofl/readexpro) and Pillow with raqm, numpy, scikit-image.
"""
import json, math, sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from skimage.morphology import skeletonize
from skimage.measure import label, regionprops

ROOT = Path(__file__).resolve().parent.parent
WORD = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else "يحيى"

f = ImageFont.truetype(str(ROOT / "scripts/fonts/ReadexPro[HEXP,wght].ttf"), 900, layout_engine=ImageFont.Layout.RAQM)
f.set_variation_by_axes([200, 0])
img = Image.new("L", (2600, 1500), 0)
ImageDraw.Draw(img).text((1300, 700), WORD, font=f, fill=255, anchor="mm")
mask = np.array(img) > 128

lab = label(mask)
regions = regionprops(lab)
main_ids = [r.label for r in regions if r.area > 6000]
dots = [r for r in regions if r.area <= 6000]

sk = skeletonize(np.isin(lab, main_ids))
H, W = sk.shape
pts = set(zip(*np.nonzero(sk)))
N8 = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
def nbrs(p):
    return [(p[0]+dy, p[1]+dx) for dy,dx in N8 if (p[0]+dy, p[1]+dx) in pts]
deg = {p: len(nbrs(p)) for p in pts}
nodes = {p for p,d in deg.items() if d != 2}

# walk edges between nodes
edges, seen = [], set()
for n in nodes:
    for q in nbrs(n):
        if (n,q) in seen: continue
        path = [n, q]; prev, cur = n, q
        while cur not in nodes:
            nx = [r for r in nbrs(cur) if r != prev and r not in path[-3:]]
            if not nx: break
            prev, cur = cur, nx[0]; path.append(cur)
        seen.add((path[0], path[1])); seen.add((path[-1], path[-2]))
        edges.append(path)
# drop duplicate (reverse) edges and tiny spurs
uniq, keys = [], set()
for e in edges:
    k = frozenset([e[0], e[-1], len(e)])
    if k in keys: continue
    keys.add(k); uniq.append(e)
def is_spur(e):
    return len(e) < 40 and (deg[e[0]] == 1 or deg[e[-1]] == 1)
edges = [e for e in uniq if not is_spur(e) and len(e) > 3]

# merge edges at junctions along the straightest continuation
def direction(e, at_end, k=25):
    seg = e[-k:] if at_end else e[:k][::-1]
    a, b = np.array(seg[0], float), np.array(seg[-1], float)
    v = b - a; return v / (np.linalg.norm(v) + 1e-9)
def close(a, b, tol=6):
    return abs(a[0]-b[0]) <= tol and abs(a[1]-b[1]) <= tol
strokes = [list(e) for e in edges]
changed = True
while changed:
    changed = False
    best = None
    for i, a in enumerate(strokes):
        for j, b in enumerate(strokes):
            if i >= j: continue
            for ea in (True, False):
                for eb in (True, False):
                    pa = a[-1] if ea else a[0]; pb = b[-1] if eb else b[0]
                    if not close(pa, pb): continue
                    da = direction(a, ea); db = direction(b, eb)
                    score = float(np.dot(da, -db))  # 1 = perfectly continuous
                    if score > 0.72 and (best is None or score > best[0]):
                        best = (score, i, j, ea, eb)
    if best:
        _, i, j, ea, eb = best
        a, b = strokes[i], strokes[j]
        a2 = a if ea else a[::-1]
        b2 = b if not eb else b[::-1]
        merged = a2 + b2[1:]
        strokes = [s for k, s in enumerate(strokes) if k not in (i, j)] + [merged]
        changed = True

def smooth(path, n=60):
    p = np.array(path, float)[:, ::-1]  # (x, y)
    # moving average
    k = 9
    pad = np.pad(p, ((k, k), (0, 0)), mode="edge")
    ker = np.ones(2*k+1) / (2*k+1)
    sm = np.stack([np.convolve(pad[:, c], ker, mode="valid") for c in range(2)], 1)
    sm[0], sm[-1] = p[0], p[-1]
    # resample by arc length
    d = np.r_[0, np.cumsum(np.linalg.norm(np.diff(sm, axis=0), axis=1))]
    m = max(8, int(d[-1] / 28))
    t = np.linspace(0, d[-1], m)
    return np.stack([np.interp(t, d, sm[:, 0]), np.interp(t, d, sm[:, 1])], 1)

strokes = sorted([smooth(s) for s in strokes if len(s) > 30], key=lambda s: -s[:, 0].max())
dot_c = sorted([(r.centroid[1], r.centroid[0], math.sqrt(r.area / math.pi)) for r in dots], key=lambda c: -c[0])

allp = np.concatenate(strokes)
x0, x1 = allp[:, 0].min(), allp[:, 0].max()
y0, y1 = min(allp[:, 1].min(), min(c[1] for c in dot_c)), max(allp[:, 1].max(), max(c[1] for c in dot_c))
cx, cy, s = (x0 + x1) / 2, (y0 + y1) / 2, (x1 - x0)
def norm(x, y): return [round((x - cx) / s, 4), round(-(y - cy) / s, 4)]
stroke_px = 2 * np.sqrt(mask[lab == main_ids[0]].sum() / max(1, sk.sum()))
data = {
    "word": WORD,
    "aspect": round((y1 - y0) / s, 4),
    "strokeWidth": round(float(stroke_px) / s, 4),
    "strokes": [[norm(x, y) for x, y in st] for st in strokes],
    "dots": [norm(x, y) + [round(r / s, 4)] for x, y, r in dot_c],
}
(ROOT / "src/content/name-strokes.json").write_text(json.dumps(data), encoding="utf-8")

if "--preview" in sys.argv:
    vis = Image.fromarray((mask * 50).astype(np.uint8)).convert("RGB"); d = ImageDraw.Draw(vis)
    cols = [(255,80,60),(60,160,255),(80,220,120),(255,200,40),(200,90,255),(255,255,255)]
    for i, st in enumerate(strokes):
        d.line([tuple(p) for p in st], fill=cols[i % len(cols)], width=10)
        d.ellipse([st[0][0]-14, st[0][1]-14, st[0][0]+14, st[0][1]+14], outline=cols[i % len(cols)], width=4)
    for x, y, r in dot_c: d.ellipse([x-r, y-r, x+r, y+r], outline=(255,255,255), width=6)
    vis.resize((1300, 750)).save(sys.argv[-1])
print(len(strokes), "strokes", [len(s) for s in strokes], len(dot_c), "dots", "w", data["strokeWidth"])
