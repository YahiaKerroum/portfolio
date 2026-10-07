"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { DOT_GLAZE, DOT_R, NAME, PAD, STROKE_GLAZE, TUBE_R } from "./name";
import { SoftTube } from "./SoftTube";
import { afterPageTransition, compileScene, releaseRenderer, roomEnvironment } from "../glStart";

type Node = { p: THREE.Vector3; q: THREE.Vector3; r: THREE.Vector3 };

const DT = 1 / 120;
const FOV = 26;
const CAM_Z = 18;

/* Spring constants live in the word's own units (the word is one unit wide),
   so the feel is identical at every screen size. */
const TUBE = { k: 58, damp: 0.052, stiff: 0.5 };
const DOT = { k: 24, damp: 0.03 };
const REPEL_R = 0.085;
const GRAB_R = 0.05;

const ease = {
  outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  outElastic: (t: number) =>
    t <= 0 ? 0 : t >= 1 ? 1 : Math.pow(2, -9 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3.2)) + 1,
  outBack: (t: number) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2),
};

type NameFlags = Window & { __ykLanded?: boolean; __ykNameReady?: boolean };

/** "ready" (first frame drawn), "landed" (piped in), "fail", "grab", "release" */
function emit(kind: string) {
  window.dispatchEvent(new CustomEvent("yk:name", { detail: kind }));
}

type Callbacks = { onReady: () => void; onFail: () => void };

export default function SoftNameCanvas({ anchorId, onReady, onFail }: { anchorId: string } & Callbacks) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const anchor = document.getElementById(anchorId);
    if (!host || !anchor) return;
    let cancelled = false;
    let teardown = () => {};
    afterPageTransition().then(() => {
      if (!cancelled) teardown = mount(host, anchor, { onReady, onFail });
    });
    return () => {
      cancelled = true;
      teardown();
      // a later visit to the page starts the entrance over
      (window as NameFlags).__ykLanded = false;
      (window as NameFlags).__ykNameReady = false;
    };
  }, [anchorId, onReady, onFail]);

  return <div ref={hostRef} className="soft-name__gl" />;
}

function mount(host: HTMLDivElement, anchor: HTMLElement, { onReady, onFail }: Callbacks): () => void {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    onFail(); // no WebGL: the SVG poster stays, in its glazed form
    emit("fail");
    return () => {};
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let dpr = Math.min(window.devicePixelRatio, 1.75);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.04;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  scene.environmentIntensity = 0.85; // the environment itself arrives before the first frame
  let env: THREE.Texture | null = null;

  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
  camera.position.set(0, 0, CAM_Z);

  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.castShadow = true;
  // the shadow is a soft blur, so a 1024 map with half the texel radius looks
  // the same as 2048 at a quarter of the per-frame blur cost
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.radius = 9;
  key.shadow.blurSamples = 16;
  key.shadow.bias = -0.0004;
  scene.add(key, key.target);
  scene.add(new THREE.HemisphereLight(0xf4f6ff, 0xd9d2c8, 0.55));

  const catcher = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.ShadowMaterial({ color: 0x1b1d2a, opacity: 0.13, transparent: true }),
  );
  catcher.receiveShadow = true;
  scene.add(catcher);

  const material = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    roughness: 0.3,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.14,
    iridescence: 0.28,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [140, 460],
    sheen: 0.35,
    sheenRoughness: 0.45,
    sheenColor: new THREE.Color("#ffffff"),
  });
  const sphere = new THREE.SphereGeometry(1, 40, 28);

  // --- the word, simulated in its own unit space ---------------------------
  const strokes: Node[][] = NAME.strokes.map((pts) =>
    pts.map(([x, y]) => ({
      p: new THREE.Vector3(x, y, 0),
      q: new THREE.Vector3(x, y, 0),
      r: new THREE.Vector3(x, y, 0),
    })),
  );
  const rest = strokes.map((nodes) => nodes.slice(1).map((n, i) => n.r.distanceTo(nodes[i].r)));
  const dots: Node[] = NAME.dots.map(([x, y]) => {
    const lift = reduced ? 0 : 0.32;
    return { p: new THREE.Vector3(x, y + lift, 0), q: new THREE.Vector3(x, y + lift, 0), r: new THREE.Vector3(x, y, 0) };
  });

  const word = new THREE.Group();
  scene.add(word);
  const tubes = strokes.map((nodes, i) => {
    const [a, b] = STROKE_GLAZE[i % STROKE_GLAZE.length];
    const t = new SoftTube(nodes.length, [new THREE.Color(a), new THREE.Color(b)], material, sphere);
    word.add(t.mesh, ...t.caps);
    return t;
  });
  const dotMeshes = dots.map((_, i) => {
    const m = material.clone();
    m.vertexColors = false;
    m.color.set(DOT_GLAZE[i % DOT_GLAZE.length]);
    const mesh = new THREE.Mesh(sphere, m);
    mesh.castShadow = true;
    word.add(mesh);
    return mesh;
  });
  const scratch = strokes.map((nodes) => nodes.map(() => new THREE.Vector3()));

  // --- layout: the 3D word sits exactly on the SVG poster -------------------
  let W = 1;
  let H = 1;
  let ppu = 1; // css px per world unit at z = 0
  let S = 1; // word width in world units
  const C = new THREE.Vector2();
  const layout = () => {
    const box = host.getBoundingClientRect();
    W = Math.max(1, box.width);
    H = Math.max(1, box.height);
    renderer.setSize(W, H, false);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    ppu = H / (2 * CAM_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
    const a = anchor.getBoundingClientRect();
    S = a.width / (1 + 2 * PAD) / ppu;
    C.set((a.left + a.width / 2 - box.left - W / 2) / ppu, -(a.top + a.height / 2 - box.top - H / 2) / ppu);
    word.position.set(C.x, C.y, 0);
    word.scale.setScalar(S);
    catcher.position.set(C.x, C.y, -0.055 * S);
    catcher.scale.set(S * 2.4, S * 1.4, 1);
    key.position.set(C.x - 0.3 * S, C.y + 0.55 * S, 1.2 * S);
    key.target.position.set(C.x, C.y, 0);
    const cam = key.shadow.camera;
    cam.left = -0.9 * S; cam.right = 0.9 * S; cam.top = 0.7 * S; cam.bottom = -0.7 * S;
    cam.near = 0.1; cam.far = 3 * S;
    cam.updateProjectionMatrix();
  };
  layout();
  const ro = new ResizeObserver(layout);
  ro.observe(host);
  ro.observe(anchor);

  // --- pointer --------------------------------------------------------------
  const pointer = { x: 0, y: 0, active: false, speed: 0, lx: 0, ly: 0, lt: 0 };
  const local = new THREE.Vector2(); // pointer in word units
  let grabbed: { node: Node; ox: number; oy: number } | null = null;

  const toWord = (cx: number, cy: number) => {
    const box = host.getBoundingClientRect();
    const wx = (cx - box.left - W / 2) / ppu;
    const wy = -(cy - box.top - H / 2) / ppu;
    local.set((wx - C.x) / S, (wy - C.y) / S);
  };
  const nearest = () => {
    let best: Node | null = null;
    let bd = Infinity;
    for (const nodes of strokes) for (const n of nodes) {
      const d = Math.hypot(n.p.x - local.x, n.p.y - local.y);
      if (d < bd) { bd = d; best = n; }
    }
    for (const n of dots) {
      const d = Math.hypot(n.p.x - local.x, n.p.y - local.y) - (DOT_R - TUBE_R);
      if (d < bd) { bd = d; best = n; }
    }
    return { node: best, dist: bd };
  };
  const onMove = (e: PointerEvent) => {
    const now = performance.now();
    const dt = Math.max(1, now - pointer.lt);
    pointer.speed = pointer.speed * 0.6 + (Math.hypot(e.clientX - pointer.lx, e.clientY - pointer.ly) / dt) * 1000 * 0.4;
    pointer.lx = e.clientX; pointer.ly = e.clientY; pointer.lt = now;
    pointer.x = e.clientX; pointer.y = e.clientY;
    pointer.active = true;
    toWord(e.clientX, e.clientY);
    if (!grabbed) canvas.style.cursor = nearest().dist < GRAB_R ? "grab" : "";
  };
  const onDown = (e: PointerEvent) => {
    toWord(e.clientX, e.clientY);
    const { node, dist } = nearest();
    if (!node || dist > GRAB_R) return;
    grabbed = { node, ox: node.p.x - local.x, oy: node.p.y - local.y };
    node.q.z += 0.012; // a little squish on contact
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = "grabbing";
    emit("grab");
  };
  const onUp = (e: PointerEvent) => {
    if (!grabbed) return;
    grabbed = null;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    canvas.style.cursor = "";
    emit("release");
  };
  const onLeave = () => { pointer.active = false; };
  canvas.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);
  document.documentElement.addEventListener("pointerleave", onLeave);

  // --- simulation -----------------------------------------------------------
  const integrate = (n: Node, k: number, damp: number, t: number, phase: number) => {
    const idle = reduced ? 0 : 1;
    const rx = n.r.x;
    const ry = n.r.y + idle * 0.0035 * Math.sin(t * 1.3 + rx * 7 + phase);
    const rz = idle * 0.012 * Math.sin(t * 1.05 + rx * 5 + phase * 1.7);
    let ax = k * (rx - n.p.x);
    let ay = k * (ry - n.p.y);
    let az = k * (rz - n.p.z);
    if (pointer.active && grabbed?.node !== n) {
      const dx = n.p.x - local.x;
      const dy = n.p.y - local.y;
      const d = Math.hypot(dx, dy);
      if (d < REPEL_R && d > 1e-5) {
        const f = Math.pow(1 - d / REPEL_R, 2) * 9 * (0.2 + Math.min(pointer.speed / 900, 1.6));
        ax += (dx / d) * f;
        ay += (dy / d) * f;
        az -= f * 0.9;
      }
    }
    const vx = (n.p.x - n.q.x) * (1 - damp);
    const vy = (n.p.y - n.q.y) * (1 - damp);
    const vz = (n.p.z - n.q.z) * (1 - damp);
    n.q.copy(n.p);
    n.p.x += vx + ax * DT * DT;
    n.p.y += vy + ay * DT * DT;
    n.p.z += vz + az * DT * DT;
  };

  const step = (t: number) => {
    if (grabbed) {
      const n = grabbed.node;
      n.p.x += (local.x + grabbed.ox - n.p.x) * 0.45;
      n.p.y += (local.y + grabbed.oy - n.p.y) * 0.45;
    }
    strokes.forEach((nodes, si) => nodes.forEach((n) => integrate(n, TUBE.k, TUBE.damp, t, si)));
    dots.forEach((n, i) => integrate(n, DOT.k, DOT.damp, t, i * 1.3));
    // keep each stroke's length: stretchy, never tearing
    for (let it = 0; it < 2; it++) {
      strokes.forEach((nodes, si) => {
        for (let i = 0; i < nodes.length - 1; i++) {
          const a = nodes[i].p;
          const b = nodes[i + 1].p;
          const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
          const len = Math.hypot(dx, dy, dz) || 1e-6;
          const diff = ((len - rest[si][i]) / len) * 0.5 * TUBE.stiff;
          a.x += dx * diff; a.y += dy * diff; a.z += dz * diff;
          b.x -= dx * diff; b.y -= dy * diff; b.z -= dz * diff;
        }
      });
    }
  };

  // --- entrance: strokes are piped in the order the word is written ---------
  // the clock starts at the first frame actually drawn, however long setup took
  let t0 = -1;
  const growAt = (i: number, el: number) => (reduced ? 1 : ease.outCubic(Math.min(1, Math.max(0, (el - 0.2 - i * 0.17) / 0.7))));
  const radAt = (i: number, el: number) => (reduced ? 1 : ease.outElastic(Math.min(1, Math.max(0, (el - 0.15 - i * 0.17) / 1.1))));
  const dotAt = (i: number, el: number) => (reduced ? 1 : ease.outBack(Math.min(1, Math.max(0, (el - 1.05 - i * 0.09) / 0.45))));
  let readySent = false;

  // --- loop -----------------------------------------------------------------
  let acc = 0;
  let last = performance.now();
  let visible = true;
  // if the device can't hold ~40fps once the word has landed, step the
  // resolution down; machines that keep up keep full quality
  const slowFrames: number[] = [];
  const adapt = (ms: number) => {
    if (dpr <= 1 || ms > 200) return; // > 200ms is a paused tab, not a slow GPU
    slowFrames.push(ms);
    if (slowFrames.length < 90) return;
    const median = slowFrames.sort((a, b) => a - b)[45];
    slowFrames.length = 0;
    if (median > 25) {
      dpr = Math.max(1, dpr - 0.25);
      renderer.setPixelRatio(dpr);
    }
  };
  const frame = () => {
    const now = performance.now();
    if (t0 < 0) {
      t0 = now;
      (window as NameFlags).__ykNameReady = true;
      emit("ready");
    } else if (landed) adapt(now - last);
    acc += Math.min(0.05, (now - last) / 1000);
    last = now;
    const el = (now - t0) / 1000;
    while (acc >= DT) {
      step(el);
      acc -= DT;
    }
    pointer.speed *= 0.92;

    strokes.forEach((nodes, i) => {
      const pts = scratch[i];
      nodes.forEach((n, j) => pts[j].copy(n.p));
      tubes[i].update(pts, TUBE_R * radAt(i, el), growAt(i, el));
    });
    dots.forEach((n, i) => {
      const s = DOT_R * dotAt(i, el);
      dotMeshes[i].position.copy(n.p);
      dotMeshes[i].scale.setScalar(Math.max(s, 1e-5));
      dotMeshes[i].visible = s > 1e-4;
    });
    renderer.render(scene, camera);

    if (!readySent && el > 0.25) { readySent = true; onReady(); }
    if (el > 1.6 && !landed) {
      landed = true;
      (window as NameFlags).__ykLanded = true;
      emit("landed");
    }
  };
  let landed = false;

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    renderer.setAnimationLoop(visible && !document.hidden ? frame : null);
    last = performance.now();
  });
  const onVis = () => {
    renderer.setAnimationLoop(visible && !document.hidden ? frame : null);
    last = performance.now();
  };
  // shaders compile in parallel where the browser allows it, so the page (and
  // the name's ink sketch) keeps moving instead of freezing on first draw
  let disposed = false;
  const start = () => {
    if (disposed) return;
    io.observe(host);
    document.addEventListener("visibilitychange", onVis);
  };
  roomEnvironment(renderer, 0.03)
    .then((tex) => {
      env = tex;
      scene.environment = tex;
      return compileScene(renderer, scene, camera);
    })
    .then(start, start);

  return () => {
    disposed = true;
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    canvas.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
    document.documentElement.removeEventListener("pointerleave", onLeave);
    canvas.remove();
    releaseRenderer(renderer, () => {
      tubes.forEach((t) => t.dispose());
      dotMeshes.forEach((m) => (m.material as THREE.Material).dispose());
      sphere.dispose();
      material.dispose();
      catcher.geometry.dispose();
      (catcher.material as THREE.Material).dispose();
      env?.dispose();
    });
  };
}
