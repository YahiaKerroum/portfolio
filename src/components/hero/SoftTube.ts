import * as THREE from "three";

const Z = new THREE.Vector3(0, 0, 1);

/**
 * A tube whose centreline is re-sampled every frame from a handful of
 * simulated nodes (Catmull-Rom), so the stroke can bend like jelly. The vertex
 * buffers are allocated once and rewritten in place.
 */
export class SoftTube {
  readonly mesh: THREE.Mesh;
  readonly caps: [THREE.Mesh, THREE.Mesh];
  private readonly samples: number;
  private readonly radial: number;
  private readonly perSeg: number;
  private readonly pos: Float32Array;
  private readonly nor: Float32Array;
  private readonly centre: THREE.Vector3[];
  private readonly frameN: THREE.Vector3[];

  constructor(
    nodeCount: number,
    colors: [THREE.Color, THREE.Color],
    material: THREE.MeshPhysicalMaterial,
    capGeometry: THREE.BufferGeometry,
    perSeg = 7,
    radial = 24,
  ) {
    this.perSeg = perSeg;
    this.radial = radial;
    const S = (this.samples = (nodeCount - 1) * perSeg + 1);
    const R = radial;
    this.pos = new Float32Array(S * R * 3);
    this.nor = new Float32Array(S * R * 3);
    this.centre = Array.from({ length: S }, () => new THREE.Vector3());
    this.frameN = Array.from({ length: S }, () => new THREE.Vector3());

    const col = new Float32Array(S * R * 3);
    const c = new THREE.Color();
    for (let s = 0; s < S; s++) {
      const t = s / (S - 1);
      c.lerpColors(colors[0], colors[1], t * t * (3 - 2 * t));
      for (let j = 0; j < R; j++) col.set([c.r, c.g, c.b], (s * R + j) * 3);
    }

    const index = new Uint32Array((S - 1) * R * 6);
    let o = 0;
    for (let s = 0; s < S - 1; s++) {
      for (let j = 0; j < R; j++) {
        const a = s * R + j;
        const b = s * R + ((j + 1) % R);
        const d = (s + 1) * R + j;
        const e = (s + 1) * R + ((j + 1) % R);
        // counter-clockwise seen from outside, so the outer wall is the front face
        index[o++] = a; index[o++] = b; index[o++] = d;
        index[o++] = b; index[o++] = e; index[o++] = d;
      }
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("normal", new THREE.BufferAttribute(this.nor, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    g.setIndex(new THREE.BufferAttribute(index, 1));

    this.mesh = new THREE.Mesh(g, material);
    this.mesh.castShadow = true;
    this.mesh.frustumCulled = false;

    const capMat = (color: THREE.Color) => {
      const m = material.clone();
      m.vertexColors = false;
      m.color.copy(color);
      return m;
    };
    this.caps = [new THREE.Mesh(capGeometry, capMat(colors[0])), new THREE.Mesh(capGeometry, capMat(colors[1]))];
    for (const cap of this.caps) {
      cap.castShadow = true;
      cap.frustumCulled = false;
    }
  }

  /** nodes are world-space positions; grow 0..1 reveals the stroke along its length. */
  update(nodes: THREE.Vector3[], radius: number, grow: number) {
    const S = this.samples;
    const R = this.radial;
    const n = nodes.length;
    const visible = Math.max(0, Math.min(S - 1, Math.round(grow * (S - 1))));
    const show = grow > 0.001 && radius > 1e-5;
    this.mesh.visible = show;
    this.caps[0].visible = show;
    this.caps[1].visible = show;
    if (!show) return;

    // centreline
    let s = 0;
    for (let i = 0; i < n - 1; i++) {
      const p0 = nodes[Math.max(i - 1, 0)];
      const p1 = nodes[i];
      const p2 = nodes[i + 1];
      const p3 = nodes[Math.min(i + 2, n - 1)];
      for (let k = 0; k < this.perSeg; k++) {
        const t = k / this.perSeg;
        const t2 = t * t;
        const t3 = t2 * t;
        this.centre[s++].set(
          0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
          0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
          0.5 * (2 * p1.z + (-p0.z + p2.z) * t + (2 * p0.z - 5 * p1.z + 4 * p2.z - p3.z) * t2 + (-p0.z + 3 * p1.z - 3 * p2.z + p3.z) * t3),
        );
      }
    }
    this.centre[S - 1].copy(nodes[n - 1]);

    // frames: the curve lives near the z=0 plane, so the in-plane normal is stable
    const T = new THREE.Vector3();
    const B = new THREE.Vector3();
    const rim = new THREE.Vector3();
    for (let i = 0; i < S; i++) {
      const a = this.centre[Math.max(i - 1, 0)];
      const b = this.centre[Math.min(i + 1, S - 1)];
      T.subVectors(b, a).normalize();
      const N = this.frameN[i].crossVectors(Z, T);
      if (N.lengthSq() < 1e-8) N.copy(i ? this.frameN[i - 1] : new THREE.Vector3(1, 0, 0));
      N.normalize();
      B.crossVectors(T, N).normalize();
      const c = this.centre[i];
      for (let j = 0; j < R; j++) {
        const th = (j / R) * Math.PI * 2;
        rim.copy(N).multiplyScalar(Math.cos(th)).addScaledVector(B, Math.sin(th));
        const k = (i * R + j) * 3;
        this.nor[k] = rim.x; this.nor[k + 1] = rim.y; this.nor[k + 2] = rim.z;
        this.pos[k] = c.x + rim.x * radius;
        this.pos[k + 1] = c.y + rim.y * radius;
        this.pos[k + 2] = c.z + rim.z * radius;
      }
    }

    const g = this.mesh.geometry;
    g.attributes.position.needsUpdate = true;
    g.attributes.normal.needsUpdate = true;
    g.setDrawRange(0, visible * R * 6);

    this.caps[0].position.copy(this.centre[0]);
    this.caps[1].position.copy(this.centre[visible]);
    this.caps[0].scale.setScalar(radius * 0.985);
    this.caps[1].scale.setScalar(radius * 0.985);
  }

  dispose() {
    this.mesh.geometry.dispose();
    for (const cap of this.caps) (cap.material as THREE.Material).dispose();
  }
}
