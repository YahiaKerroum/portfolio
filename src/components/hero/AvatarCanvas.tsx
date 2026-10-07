"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { buildAvatar } from "./avatarRig";

const clamp = THREE.MathUtils.clamp;
const damp = THREE.MathUtils.damp;

/** trigger: pop up once the name has landed (hero), or when scrolled into view. */
export default function AvatarCanvas({ trigger = "landed" }: { trigger?: "landed" | "visible" }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    const canvas = renderer.domElement;
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.7;
    const keyLight = new THREE.DirectionalLight(0xfff1e6, 1.35);
    keyLight.position.set(-3, 4, 5);
    const rim = new THREE.DirectionalLight(0xc9d6ff, 1.1);
    rim.position.set(4, 2, -3);
    scene.add(keyLight, rim, new THREE.HemisphereLight(0xf2f4ff, 0xd8cfc6, 0.5));

    const camera = new THREE.PerspectiveCamera(22, 1, 0.1, 50);
    camera.position.set(0, -0.35, 11);
    camera.lookAt(0, -0.75, 0);

    const rig = buildAvatar();
    scene.add(rig.root);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(Math.max(1, width), Math.max(1, height), false);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      camera.aspect = width / Math.max(1, height);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // where to look: the pointer, in the avatar's own frame
    const look = { x: -0.4, y: 0.25 };
    const target = { x: -0.4, y: 0.25 };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.35;
      target.x = clamp((e.clientX - cx) / (window.innerWidth * 0.5), -1.2, 1.2);
      target.y = clamp((e.clientY - cy) / (window.innerHeight * 0.5), -1.2, 1.2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // a face that reacts when someone grabs the name
    let surprise = 0;
    let surpriseTarget = 0;
    let surpriseTimer = 0;
    const w = window as Window & { __ykLanded?: boolean };
    const onName = (e: Event) => {
      const kind = (e as CustomEvent<string>).detail;
      if (kind === "grab") { surpriseTarget = 1; window.clearTimeout(surpriseTimer); }
      if (kind === "release") surpriseTimer = window.setTimeout(() => { surpriseTarget = 0; }, 650);
      if (kind === "landed" && trigger === "landed") popTarget = 1;
    };
    window.addEventListener("yk:name", onName);

    // pop up from behind the edge once the name has landed
    let pop = reduced ? 1 : 0;
    let popTarget = reduced ? 1 : 0;
    let popVel = 0;
    if (trigger === "landed" && w.__ykLanded) popTarget = 1;
    const fallback = trigger === "landed" ? window.setTimeout(() => { popTarget = 1; }, 1800) : 0;

    let nextBlink = 1.8;
    let blink = 0;
    const timer = new THREE.Timer();
    const frame = () => {
      timer.update();
      const dt = Math.min(timer.getDelta(), 0.05);
      const t = timer.getElapsed();

      // springy entrance
      popVel += ((popTarget - pop) * 90 - popVel * 11) * dt;
      pop += popVel * dt;
      rig.root.position.y = (pop - 1) * 4.2;

      look.x = damp(look.x, target.x, 6, dt);
      look.y = damp(look.y, target.y, 6, dt);
      rig.head.rotation.y = damp(rig.head.rotation.y, look.x * 0.55, 5, dt);
      rig.head.rotation.x = damp(rig.head.rotation.x, look.y * 0.32, 5, dt);
      rig.head.rotation.z = damp(rig.head.rotation.z, -look.x * 0.06, 4, dt);
      for (const eye of rig.eyes) {
        eye.rotation.y = damp(eye.rotation.y, clamp(look.x * 0.5, -0.38, 0.38), 14, dt);
        eye.rotation.x = damp(eye.rotation.x, clamp(look.y * 0.32, -0.26, 0.3), 14, dt);
      }

      if (!reduced) {
        rig.head.position.y = Math.sin(t * 1.7) * 0.015;
        rig.torso.scale.y = 1 + Math.sin(t * 1.7) * 0.006;
        if (t > nextBlink) { blink = 1; nextBlink = t + 2.2 + Math.random() * 3.2; }
      }
      blink = Math.max(0, blink - dt * 7);
      const shut = Math.sin(Math.min(1, blink) * Math.PI);
      surprise = damp(surprise, surpriseTarget, 10, dt);
      // the lid rests a little lowered, opens wide in surprise, sweeps shut to blink
      for (const lid of rig.lids) lid.rotation.x = 0.45 - surprise * 0.4 + shut * 1.15;
      for (const b of rig.brows) b.position.y = b.userData.baseY + surprise * 0.08;
      rig.smile.visible = surprise < 0.5;
      rig.oh.visible = surprise >= 0.5;

      renderer.render(scene, camera);
    };

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && trigger === "visible") popTarget = 1;
      renderer.setAnimationLoop(visible ? frame : null);
    });
    io.observe(host);
    renderer.setAnimationLoop(frame);

    return () => {
      renderer.setAnimationLoop(null);
      window.clearTimeout(fallback);
      window.clearTimeout(surpriseTimer);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("yk:name", onName);
      rig.dispose();
      env.dispose();
      pmrem.dispose();
      room.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, [trigger]);

  return <div ref={hostRef} className="avatar__gl" />;
}
