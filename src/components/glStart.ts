import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/** Resolves once any running page transition has played out, so heavy GPU setup
 *  never lands in the middle of the cover morph. Two frames first: the
 *  transition's animations only exist once the new page has been captured. */
export function afterPageTransition(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const running = document.documentElement
          .getAnimations({ subtree: true })
          .filter((a) => (a.effect as KeyframeEffect | null)?.pseudoElement?.startsWith("::view-transition"));
        Promise.allSettled(running.map((a) => a.finished)).then(() => resolve());
      }),
    );
  });
}

/** Runs fn when the browser has a quiet moment (or after `timeout` ms at worst). */
export function whenIdle(fn: () => void, timeout = 1200): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(fn, 120);
  return () => window.clearTimeout(id);
}


/** Stops drawing now; frees the GPU side once any page transition has played
 *  out, so leaving a page never stalls the cover morph. dispose() alone keeps
 *  the context alive, and browsers cap live contexts, so a few trips between
 *  pages would otherwise pile them up: the context is lost on purpose. */
export function releaseRenderer(renderer: THREE.WebGLRenderer, freeResources: () => void = () => {}) {
  renderer.setAnimationLoop(null);
  afterPageTransition().then(() => {
    freeResources();
    renderer.dispose();
    renderer.forceContextLoss();
  });
}

/** Compiles a scene's shaders in parallel where the browser can
 *  (KHR_parallel_shader_compile) and resolves once they are ready; elsewhere it
 *  compiles in place, which is all those browsers allow. */
export function compileScene(renderer: THREE.WebGLRenderer, scene: THREE.Object3D, camera: THREE.Camera): Promise<unknown> {
  if (renderer.extensions.has("KHR_parallel_shader_compile")) return renderer.compileAsync(scene, camera);
  renderer.compile(scene, camera);
  return Promise.resolve();
}

type PMREMInternals = {
  _setSize(size: number): void;
  _allocateTargets(): THREE.WebGLRenderTarget;
  _blurMaterial: THREE.ShaderMaterial | null;
  _ggxMaterial: THREE.ShaderMaterial | null;
  _lodMeshes: THREE.Mesh[];
};

/** The soft studio reflections the name and the avatar both wear. Building it
 *  needs a handful of shaders (the GGX filter alone loops 256 times, which the
 *  Windows shader compiler unrolls), and three compiles them synchronously on
 *  first use: close to a second of frozen page on a cold start. So they are
 *  compiled in parallel first, against an offscreen target so they match the
 *  variant the generator renders with, and the build then finds them ready. */
export async function roomEnvironment(renderer: THREE.WebGLRenderer, sigma: number): Promise<THREE.Texture> {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  try {
    // three 0.186 internals; if they move, the build below still works, just blocking
    const p = pmrem as unknown as PMREMInternals;
    p._setSize(256);
    const target = p._allocateTargets();
    const filters = new THREE.Scene();
    for (const m of [p._blurMaterial, p._ggxMaterial]) if (m) filters.add(new THREE.Mesh(p._lodMeshes[0].geometry, m));
    const cube = new THREE.PerspectiveCamera(90, 1, 0.1, 100);
    const previous = renderer.getRenderTarget();
    renderer.setRenderTarget(target);
    const ready = Promise.all([compileScene(renderer, room, cube), compileScene(renderer, filters, cube)]);
    renderer.setRenderTarget(previous);
    await ready;
    target.dispose();
  } catch {
    // fall through to the plain build
  }
  const env = pmrem.fromScene(room, sigma).texture;
  pmrem.dispose();
  room.dispose();
  return env;
}
