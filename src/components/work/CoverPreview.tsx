"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { releaseRenderer, whenIdle } from "../glStart";

const clamp = THREE.MathUtils.clamp;

const vertex = /* glsl */ `
  uniform vec2 uVel;
  uniform float uShow;
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    // the sheet trails the cursor like something soft being dragged
    float bx = sin(uv.y * 3.14159) * uVel.x;
    float by = sin(uv.x * 3.14159) * uVel.y;
    p.x -= bx * 0.16;
    p.y += by * 0.16;
    float d = distance(uv, vec2(0.5));
    p.z += sin(d * 16.0 - uTime * 9.0) * (1.0 - uShow) * 0.05;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uA;
  uniform sampler2D uB;
  uniform float uMix;
  uniform float uShow;
  uniform vec2 uVel;
  uniform vec2 uSize;
  varying vec2 vUv;
  float box(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }
  vec3 sampleCover(vec2 uv, vec2 off) {
    vec3 a = vec3(texture2D(uA, uv + off).r, texture2D(uA, uv).g, texture2D(uA, uv - off).b);
    vec3 b = vec3(texture2D(uB, uv + off).r, texture2D(uB, uv).g, texture2D(uB, uv - off).b);
    return mix(a, b, uMix);
  }
  void main() {
    vec2 p = (vUv - 0.5) * uSize;
    float grow = mix(0.55, 1.0, uShow);
    float d = box(p, uSize * 0.5 * grow, 14.0);
    float alpha = (1.0 - smoothstep(-0.75, 0.75, d)) * smoothstep(0.0, 0.3, uShow);
    vec2 uv = (vUv - 0.5) / grow * mix(0.9, 1.0, uShow) + 0.5;
    vec2 off = uVel * 0.012;
    gl_FragColor = vec4(sampleCover(uv, off), alpha);
    #include <colorspace_fragment>
  }
`;

type Cover = { src: string; w: number; h: number };
type Props = {
  covers: Cover[];
  active: number | null;
  /** the work list, whose rows the preview keeps clear of */
  listRef: RefObject<HTMLOListElement | null>;
};

/** A cover that follows the cursor over the work list. Pointer-fine devices only. */
export default function CoverPreview({ covers, active, listRef }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<number | null>(active);
  const wakeRef = useRef<() => void>(() => {});

  useEffect(() => {
    activeRef.current = active;
    wakeRef.current();
  }, [active]);

  useEffect(() => {
    const host = hostRef.current;
    const list = listRef.current;
    if (!host || !list || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    // nothing is set up until the list comes close, and then only in a quiet moment
    let teardown = () => {};
    let cancelIdle = () => {};
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        cancelIdle = whenIdle(() => {
          teardown = mount(host, covers, listRef, activeRef, wakeRef);
        });
      },
      { rootMargin: "50% 0px" },
    );
    near.observe(list);
    return () => {
      near.disconnect();
      cancelIdle();
      teardown();
    };
  }, [covers, listRef]);

  return <div ref={hostRef} className="cover-preview" aria-hidden="true" />;
}

function mount(
  host: HTMLDivElement,
  covers: Cover[],
  listRef: RefObject<HTMLOListElement | null>,
  activeRef: RefObject<number | null>,
  wakeRef: RefObject<() => void>,
): () => void {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  } catch {
    return () => {};
  }
  host.appendChild(renderer.domElement);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, 1, 0, -1, -1000, 1000);
  const loader = new THREE.TextureLoader();
  const textures = covers.map((c) => {
    const t = loader.load(c.src);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  });
  const uniforms = {
    uA: { value: textures[0] },
    uB: { value: textures[0] },
    uMix: { value: 1 },
    uShow: { value: 0 },
    uVel: { value: new THREE.Vector2() },
    uSize: { value: new THREE.Vector2(1, 1) },
    uTime: { value: 0 },
  };
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 32, 32),
    new THREE.ShaderMaterial({ uniforms, vertexShader: vertex, fragmentShader: fragment, transparent: true }),
  );
  scene.add(mesh);

  let W = 1;
  let H = 1;
  const resize = () => {
    W = window.innerWidth;
    H = window.innerHeight;
    renderer.setSize(W, H, false);
    camera.right = W;
    camera.bottom = -H;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  const ptr = { x: W / 2, y: H / 2 };
  const pos = { x: W / 2, y: H / 2 };
  const goal = { x: 0, y: 0, w: 1, h: 1 };
  const vel = new THREE.Vector2();
  // follow the cursor sideways, but hang just above the hovered row (below it
  // near the top of the screen) so the row's own name and descriptor stay clear
  const aim = (i: number) => {
    const c = covers[i];
    goal.w = Math.min(W * 0.32, 500);
    goal.h = goal.w * (c.h / c.w);
    const row = listRef.current?.children[i]?.getBoundingClientRect();
    const gap = 14;
    let y = ptr.y;
    if (row) y = row.top - gap - goal.h >= 16 ? row.top - gap - goal.h / 2 : row.bottom + gap + goal.h / 2;
    goal.x = clamp(ptr.x, goal.w / 2 + 16, W - goal.w / 2 - 16);
    goal.y = clamp(y, goal.h / 2 + 16, H - goal.h / 2 - 16);
  };
  const onMove = (e: PointerEvent) => {
    ptr.x = e.clientX;
    ptr.y = e.clientY;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  let shown = -1;
  let show = 0;
  let running = false;
  const timer = new THREE.Timer();
  const frame = () => {
    timer.update();
    const real = Math.min(timer.getDelta(), 0.25); // fades keep wall-clock time on slow devices
    const dt = Math.min(real, 0.05);
    uniforms.uTime.value += dt;
    const a = activeRef.current;
    if (a !== null && a !== shown) {
      if (show < 0.05) {
        uniforms.uA.value = uniforms.uB.value = textures[a];
        uniforms.uMix.value = 1;
      } else {
        uniforms.uA.value = uniforms.uB.value;
        uniforms.uB.value = textures[a];
        uniforms.uMix.value = 0;
      }
      shown = a;
    }
    uniforms.uMix.value = Math.min(1, uniforms.uMix.value + real * (reduced ? 99 : 5));
    show += ((a !== null ? 1 : 0) - show) * Math.min(1, real * (reduced ? 99 : 9));
    uniforms.uShow.value = show;

    aim(shown < 0 ? 0 : shown);
    uniforms.uSize.value.set(goal.w, goal.h);
    const k = reduced ? 1 : Math.min(1, dt * 10);
    const nx = pos.x + (goal.x - pos.x) * k;
    const ny = pos.y + (goal.y - pos.y) * k;
    vel.set(((nx - pos.x) / Math.max(dt, 1e-3)) / 900, ((ny - pos.y) / Math.max(dt, 1e-3)) / 900);
    vel.clampScalar(-1.4, 1.4);
    uniforms.uVel.value.lerp(vel, 0.25);
    pos.x = nx;
    pos.y = ny;
    mesh.position.set(pos.x, -pos.y, 0);
    mesh.scale.set(goal.w, goal.h, 1);
    renderer.render(scene, camera);

    if (a === null && show < 0.002) {
      renderer.setAnimationLoop(null);
      running = false;
      renderer.clear();
    }
  };
  wakeRef.current = () => {
    if (running || activeRef.current === null) return;
    if (show < 0.002) {
      // appear in place rather than sliding in across the row text
      aim(activeRef.current);
      pos.x = goal.x;
      pos.y = goal.y;
    }
    running = true;
    timer.update();
    renderer.setAnimationLoop(frame);
  };
  wakeRef.current();

  return () => {
    wakeRef.current = () => {};
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onMove);
    renderer.domElement.remove();
    releaseRenderer(renderer, () => {
      textures.forEach((t) => t.dispose());
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    });
  };
}
