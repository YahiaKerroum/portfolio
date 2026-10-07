import * as THREE from "three";

/* A soft clay bust of Yahia, built from primitives so it shares the glossy
   world of the name. Proportions are chibi: the head is nearly as wide as the
   shoulders. Head radius is the unit. */

const SKIN = new THREE.Color("#e2ad8e");
const SKIN_SHADE = new THREE.Color("#c98f74");
const STUBBLE = new THREE.Color("#665c5c");
const BLUSH = new THREE.Color("#e8907c");
const HAIR = new THREE.Color("#251c1a");
const TEE = new THREE.Color("#1d1e26");

/* Stubble, as in his photo: light, with a soft grainy edge (Yahia picked it over
   two heavier versions). jaw/lip/neck are blend weights toward STUBBLE; front is
   where the edge sits across the cheeks; soft is the edge's feather above/below. */
const STUBBLE_MIX = { jaw: 0.26, lip: 0.16, neck: 0.18, front: -0.4, soft: [0.1, 0.14] };

/** a stable per-vertex random, so the seam's duplicate vertices agree */
const hash = (x: number, y: number, z: number) => {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
};

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function clay(color: THREE.Color | string, opts: Partial<THREE.MeshPhysicalMaterialParameters> = {}) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.46,
    metalness: 0,
    clearcoat: 0.5,
    clearcoatRoughness: 0.42,
    sheen: 0.5,
    sheenRoughness: 0.6,
    sheenColor: new THREE.Color("#fff3ea"),
    ...opts,
  });
}

function headGeometry() {
  const st = STUBBLE_MIX;
  const g = new THREE.SphereGeometry(1, 96, 72);
  const p = g.attributes.position as THREE.BufferAttribute;
  const colors = new Float32Array(p.count * 3);
  const c = new THREE.Color();
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    // a softer, longer jaw
    if (v.y < 0) {
      const t = Math.pow(-v.y, 1.4);
      v.x *= 1 - 0.17 * t;
      v.z *= 1 - 0.05 * t;
      if (v.z > 0) v.y -= 0.05 * t * smooth(0, 0.6, v.z);
    }
    v.multiply(new THREE.Vector3(0.94, 1.04, 0.96));
    p.setXYZ(i, v.x, v.y, v.z);

    c.copy(SKIN);
    const front = smooth(0.15, 0.6, v.z);
    // stubble, as in his photo: chin and jawline, climbing the sides to meet the
    // sideburns, stopping at the ears; a lighter shadow over the upper lip. A
    // little per-vertex grain on the edge and the weight keeps it from reading
    // as a painted band.
    const g = hash(v.x, v.y, v.z) - 0.5;
    const around = Math.abs(Math.atan2(v.x, v.z)); // 0 = front, PI/2 = ear
    const edge = THREE.MathUtils.lerp(st.front, 0.12, smooth(0.85, 1.5, around)) + 0.06 * g;
    const jaw = smooth(edge + st.soft[0], edge - st.soft[1], v.y) * (1 - smooth(1.5, 1.68, around));
    const lip = smooth(0.26, 0.1, Math.abs(v.x)) * smooth(-0.21, -0.26, v.y) * (1 - smooth(-0.31, -0.35, v.y)) * front;
    c.lerp(STUBBLE, (st.jaw * jaw + st.lip * lip) * (1 + 0.5 * g));
    const cheek = Math.exp(-((Math.abs(v.x) - 0.52) ** 2 + (v.y + 0.12) ** 2) / 0.02) * front;
    c.lerp(BLUSH, 0.22 * cheek);
    c.lerp(SKIN_SHADE, 0.25 * smooth(0.2, -0.5, v.z));
    colors.set([c.r, c.g, c.b], i * 3);
  }
  g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  g.computeVertexNormals();
  return g;
}

function hairGeometry() {
  const g = new THREE.SphereGeometry(1, 128, 96);
  const p = g.attributes.position as THREE.BufferAttribute;
  const d = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    d.fromBufferAttribute(p, i);
    const a = Math.abs(Math.atan2(d.x, d.z)); // 0 = front, PI = back
    let th = 0.5 + 0.07 * Math.abs(d.x); // hairline at the forehead
    th = THREE.MathUtils.lerp(th, 0.2, smooth(0.55, 1.35, a)); // above the ears
    th = THREE.MathUtils.lerp(th, -0.58, smooth(1.9, 2.75, a)); // down the back
    const on = smooth(th - 0.05, th + 0.05, d.y);
    const clump =
      Math.sin(d.x * 9.1 + d.y * 3.7) * Math.sin(d.y * 7.3 - d.z * 5.9) * Math.sin(d.z * 6.7 + d.x * 4.1);
    const volume = 0.1 * smooth(0.35, 1, d.y) + 0.05 * clump + 0.03 * smooth(0.6, 1, d.z) * smooth(0.5, 0.9, d.y);
    const r = THREE.MathUtils.lerp(0.9, 1.06 + volume, on);
    p.setXYZ(i, d.x * r * 0.94, d.y * r * 1.06 + 0.02, d.z * r * 0.97);
  }
  g.computeVertexNormals();
  return g;
}

/** A brow: a capsule laid sideways, arched, tapered at both ends, and bent
 *  back so it hugs the forehead instead of floating in front of it. */
function browGeometry() {
  const g = new THREE.CapsuleGeometry(0.05, 0.24, 8, 20);
  g.rotateZ(Math.PI / 2);
  const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const t = Math.min(1, Math.abs(x) / 0.17);
    const taper = 1 - 0.35 * t * t;
    p.setY(i, p.getY(i) * taper + 0.05 * (1 - t * t));
    p.setZ(i, p.getZ(i) * taper * 0.8 - 0.55 * x * x);
  }
  g.computeVertexNormals();
  return g;
}

export type AvatarRig = {
  root: THREE.Group;
  head: THREE.Group;
  eyes: THREE.Group[];
  lids: THREE.Mesh[];
  brows: THREE.Mesh[];
  smile: THREE.Mesh;
  oh: THREE.Mesh;
  torso: THREE.Mesh;
  dispose: () => void;
};

export function buildAvatar(): AvatarRig {
  const disposables: { dispose: () => void }[] = [];
  const keep = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x);

  const root = new THREE.Group();
  const head = new THREE.Group();
  root.add(head);

  const skinMat = keep(clay("#ffffff", { vertexColors: true }));
  const skinPlain = keep(clay(SKIN));
  const hairMat = keep(clay(HAIR, { roughness: 0.78, clearcoat: 0.1, sheen: 0.8, sheenColor: new THREE.Color("#6d5a52") }));
  const teeMat = keep(clay(TEE, { roughness: 0.86, clearcoat: 0, sheen: 0.4, sheenColor: new THREE.Color("#5b5d70") }));
  const whiteMat = keep(clay("#fbfaf7", { roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.08, sheen: 0 }));
  const irisMat = keep(clay("#2a1b13", { roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.05, sheen: 0 }));
  const glintMat = keep(new THREE.MeshBasicMaterial({ color: "#ffffff" }));
  const mouthMat = keep(clay("#7a3b32", { roughness: 0.4 }));

  const skull = new THREE.Mesh(keep(headGeometry()), skinMat);
  head.add(skull);
  const hair = new THREE.Mesh(keep(hairGeometry()), hairMat);
  head.add(hair);

  const earGeo = keep(new THREE.SphereGeometry(0.22, 32, 24));
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(earGeo, skinPlain);
    ear.scale.set(0.5, 1, 0.78);
    ear.position.set(s * 0.89, -0.02, -0.06);
    ear.rotation.y = s * 0.35;
    head.add(ear);
  }

  const nose = new THREE.Mesh(keep(new THREE.SphereGeometry(0.125, 32, 24)), skinPlain);
  nose.scale.set(0.78, 1.05, 1);
  nose.position.set(0, -0.1, 0.93);
  head.add(nose);

  // eyes: a white, an iris that turns to look, a fixed glint, and an upper lid
  const scleraGeo = keep(new THREE.SphereGeometry(0.16, 32, 24));
  const irisGeo = keep(new THREE.SphereGeometry(0.098, 32, 24));
  const glintGeo = keep(new THREE.SphereGeometry(0.026, 16, 12));
  const lidGeo = keep(new THREE.SphereGeometry(0.172, 40, 20, 0, Math.PI * 2, 0, Math.PI * 0.5));
  const eyes: THREE.Group[] = [];
  const lids: THREE.Mesh[] = [];
  for (const s of [-1, 1]) {
    const socket = new THREE.Group();
    socket.position.set(s * 0.31, 0.05, 0.78);
    socket.scale.set(1, 1.1, 0.78);
    const sclera = new THREE.Mesh(scleraGeo, whiteMat);
    const gaze = new THREE.Group();
    const iris = new THREE.Mesh(irisGeo, irisMat);
    iris.scale.set(1, 1.04, 0.5);
    iris.position.z = 0.125;
    gaze.add(iris);
    // the glint rides the iris, so a turned head never leaves it on the skin
    const glint = new THREE.Mesh(glintGeo, glintMat);
    glint.position.set(0.035, 0.045, 0.165);
    gaze.add(glint);
    const lid = new THREE.Mesh(lidGeo, skinPlain);
    lid.rotation.x = 0.45;
    socket.add(sclera, gaze, lid);
    head.add(socket);
    eyes.push(gaze);
    lids.push(lid);
  }

  const browGeo = keep(browGeometry());
  const brows = [-1, 1].map((s) => {
    const b = new THREE.Mesh(browGeo, hairMat);
    b.rotation.set(0, s * 0.3, s * -0.08);
    b.position.set(s * 0.31, 0.29, 0.845);
    b.userData.baseY = 0.29;
    head.add(b);
    return b;
  });

  // a fringe and a few crown clumps break the cap into hair
  const tuftGeo = keep(new THREE.SphereGeometry(1, 28, 20));
  const tufts: [number, number, number, number, number, number][] = [
    // x, y, z, size, squash, tilt
    [-0.42, 0.62, 0.66, 0.22, 0.55, 0.5],
    [-0.18, 0.68, 0.7, 0.24, 0.5, 0.25],
    [0.08, 0.69, 0.7, 0.25, 0.5, -0.1],
    [0.33, 0.65, 0.66, 0.23, 0.52, -0.4],
    [-0.3, 0.98, 0.18, 0.34, 0.5, 0.3],
    [0.22, 1.0, 0.12, 0.36, 0.48, -0.2],
    [-0.02, 0.96, -0.32, 0.38, 0.5, 0.1],
  ];
  for (const [x, y, z, r, sq, tilt] of tufts) {
    const t = new THREE.Mesh(tuftGeo, hairMat);
    t.position.set(x, y, z);
    t.scale.set(r * 1.25, r * sq, r);
    t.rotation.set(0.5 * Math.sign(z), 0, tilt);
    head.add(t);
  }

  const smileCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.17, -0.36, 0.87),
    new THREE.Vector3(-0.08, -0.415, 0.92),
    new THREE.Vector3(0.08, -0.415, 0.92),
    new THREE.Vector3(0.17, -0.36, 0.87),
  ]);
  const smile = new THREE.Mesh(keep(new THREE.TubeGeometry(smileCurve, 32, 0.024, 12, false)), mouthMat);
  head.add(smile);
  const capGeo = keep(new THREE.SphereGeometry(0.024, 12, 10));
  for (const t of [0, 1]) {
    const cap = new THREE.Mesh(capGeo, mouthMat);
    cap.position.copy(smileCurve.getPoint(t));
    smile.add(cap);
  }
  const oh = new THREE.Mesh(keep(new THREE.TorusGeometry(0.075, 0.026, 12, 32)), mouthMat);
  oh.position.set(0, -0.4, 0.9);
  oh.scale.set(1, 1.2, 1);
  oh.visible = false;
  head.add(oh);

  // neck, shoulders, the black tee. The neck is short and thick like his; its
  // top hides inside the jaw, so it stays covered when the head turns or tilts.
  const neckGeo = keep(new THREE.CylinderGeometry(0.42, 0.46, 0.46, 48, 6));
  {
    const pos = neckGeo.attributes.position as THREE.BufferAttribute;
    const col = new Float32Array(pos.count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      // stubble carries on under the jaw, then the chin's shadow
      const facing = smooth(-0.3, 0.5, pos.getZ(i) / 0.46);
      c.copy(SKIN)
        .lerp(STUBBLE, STUBBLE_MIX.neck * smooth(-0.06, 0.16, y) * facing)
        .lerp(SKIN_SHADE, 0.6 * smooth(-0.1, 0.23, y));
      col.set([c.r, c.g, c.b], i * 3);
    }
    neckGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  }
  const neck = new THREE.Mesh(neckGeo, skinMat);
  neck.position.y = -1.03;
  neck.scale.z = 0.78;
  root.add(neck);
  // the profile starts just outside the neck, so the ribbed neckline is part of
  // the tee; the collar is wide enough to wrap the neck after the torso's z squash.
  // Listed hem first: a lathe winds its faces outward only when y climbs.
  // The shoulder runs through a spline so it curves instead of showing corners.
  const collar = -1.16;
  const at = ([x, y]: number[]) => new THREE.Vector2(x, collar + y);
  const shoulder = new THREE.SplineCurve(
    [[1.4, -2.46], [1.38, -1.56], [1.33, -0.86], [1.22, -0.46], [1.0, -0.22], [0.74, -0.08], [0.61, -0.02]].map(at),
  ).getPoints(48);
  const profile = [...shoulder, ...[[0.57, 0.02], [0.5, 0], [0.0, 0]].map(at)];
  const torso = new THREE.Mesh(keep(new THREE.LatheGeometry(profile, 72)), teeMat);
  torso.scale.z = 0.64;
  root.add(torso);

  return {
    root,
    head,
    eyes,
    lids,
    brows,
    smile,
    oh,
    torso,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}
