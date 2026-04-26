"use client";
/**
 * ThreeKeyboard — custom Three.js 3D keyboard replacing the Spline scene.
 * Exposes MockApplication with the same API as Spline's Application:
 *   findObjectByName / getAllObjects / setVariable / getVariable / addEventListener
 */

import React, { useEffect, useRef, forwardRef } from "react";
import * as THREE from "three";
import { SKILLS, Skill, SkillNames } from "@/data/constants";

// ─── Layout ─────────────────────────────────────────────────────────────────
const KEY_LAYOUT: { name: string; row: number; col: number }[] = [
  { name: "js",        row: 0, col: 0 },
  { name: "ts",        row: 0, col: 1 },
  { name: "html",      row: 0, col: 2 },
  { name: "css",       row: 0, col: 3 },
  { name: "react",     row: 0, col: 4 },
  { name: "vue",       row: 1, col: 0 },
  { name: "nextjs",    row: 1, col: 1 },
  { name: "tailwind",  row: 1, col: 2 },
  { name: "nodejs",    row: 1, col: 3 },
  { name: "express",   row: 1, col: 4 },
  { name: "postgres",  row: 2, col: 0 },
  { name: "mongodb",   row: 2, col: 1 },
  { name: "git",       row: 2, col: 2 },
  { name: "github",    row: 2, col: 3 },
  { name: "prettier",  row: 2, col: 4 },
  { name: "npm",       row: 3, col: 0 },
  { name: "firebase",  row: 3, col: 1 },
  { name: "wordpress", row: 3, col: 2 },
  { name: "linux",     row: 3, col: 3 },
  { name: "docker",    row: 3, col: 4 },
  { name: "nginx",     row: 4, col: 0 },
  { name: "aws",       row: 4, col: 1 },
  { name: "gcp",       row: 4, col: 2 },
  { name: "vim",       row: 4, col: 3 },
  { name: "vercel",    row: 4, col: 4 },
];

// Spline used units in the hundreds — match that so getKeyboardState values work
const KEY_W  = 90;
const KEY_D  = 24;
const GAP    = 14;
const STEP   = KEY_W + GAP;
const ROWS   = 5;
const COLS   = 5;
const TOTAL_W = COLS * STEP - GAP;
const TOTAL_D = ROWS * STEP - GAP;

// ─── ProxyObject ─────────────────────────────────────────────────────────────
export class ProxyObject {
  name: string;
  _isKeycap: boolean;
  _skill: Skill | null;
  _group: THREE.Group;
  _cap: THREE.Mesh;
  _ring: THREE.Mesh | null = null;
  _defaultCapColor: string;
  _pressY = 0;
  _targetPressY = 0;

  // Reactive proxies so GSAP .to(obj.position, {...}) works
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale:    { x: number; y: number; z: number };

  private _visible = true;
  get visible() { return this._visible; }
  set visible(v: boolean) {
    this._visible = v;
    this._group.visible = v;
  }

  constructor(name: string, group: THREE.Group, cap: THREE.Mesh, skill: Skill | null, isKeycap: boolean, defaultCapColor: string) {
    this.name = name;
    this._group = group;
    this._cap = cap;
    this._skill = skill;
    this._isKeycap = isKeycap;
    this._defaultCapColor = defaultCapColor;

    const g = group;
    this.position = new Proxy(g.position as unknown as {x:number;y:number;z:number}, {
      set(t,k,v){ (g.position as any)[k]=v; (t as any)[k]=v; return true; },
      get(_,k){ return (g.position as any)[k]; },
    });
    this.rotation = new Proxy(g.rotation as unknown as {x:number;y:number;z:number}, {
      set(t,k,v){ (g.rotation as any)[k]=v; (t as any)[k]=v; return true; },
      get(_,k){ return (g.rotation as any)[k]; },
    });
    this.scale = new Proxy(g.scale as unknown as {x:number;y:number;z:number}, {
      set(t,k,v){ (g.scale as any)[k]=v; (t as any)[k]=v; return true; },
      get(_,k){ return (g.scale as any)[k]; },
    });
  }

  highlight(on: boolean) {
    const mat = this._cap.material as THREE.MeshStandardMaterial;
    if (on && this._skill) {
      mat.color.set(this._skill.color);
      mat.emissive.set(this._skill.color);
      mat.emissiveIntensity = 0.35;
      if (this._ring) this._ring.visible = true;
    } else {
      mat.color.set(this._defaultCapColor);
      mat.emissive.set("#000000");
      mat.emissiveIntensity = 0;
      if (this._ring) this._ring.visible = false;
    }
  }

  press(down: boolean) { this._targetPressY = down ? -8 : 0; }

  tick() {
    this._pressY += (this._targetPressY - this._pressY) * 0.22;
    this._cap.position.y = KEY_D * 0.45 + this._pressY;
  }
}

// ─── MockApplication ─────────────────────────────────────────────────────────
export class MockApplication {
  private _map = new Map<string, ProxyObject>();
  private _all: ProxyObject[] = [];
  private _vars = new Map<string, string>();
  private _events = new Map<string, ((e: any) => void)[]>();

  register(obj: ProxyObject) {
    this._map.set(obj.name, obj);
    this._all.push(obj);
  }

  findObjectByName(name: string) { return this._map.get(name); }
  getAllObjects()                  { return this._all; }
  setVariable(k: string, v: string) { this._vars.set(k, v); this._fire("variableChange", {k,v}); }
  getVariable(k: string)            { return this._vars.get(k) ?? ""; }
  addEventListener(evt: string, cb: (e: any) => void) {
    if (!this._events.has(evt)) this._events.set(evt, []);
    this._events.get(evt)!.push(cb);
  }
  _fire(evt: string, data: any) { this._events.get(evt)?.forEach(cb => cb(data)); }

  emitHover(target: ProxyObject | null) { this._fire("mouseHover", { target: target ?? { name: "body" } }); }
  emitKeyDown(target: ProxyObject)      { this._fire("keyDown", { target }); }
  emitKeyUp()                           { this._fire("keyUp", {}); }
}

// ─── Scene builder ────────────────────────────────────────────────────────────
function buildScene(scene: THREE.Scene, app: MockApplication, isDark: boolean) {
  const loader = new THREE.TextureLoader();

  // Keyboard root — GSAP targets this for scroll transforms
  const kbdGroup = new THREE.Group();
  kbdGroup.name = "keyboard";
  // Start at Spline hero position so getKeyboardState feels right
  kbdGroup.position.set(225, -100, 0);
  scene.add(kbdGroup);
  const kbdProxy = new ProxyObject("keyboard", kbdGroup, new THREE.Mesh(), null, false, "");
  app.register(kbdProxy);

  // ── Platform ──
  const platGroup = new THREE.Group();
  kbdGroup.add(platGroup);

  const platMat = new THREE.MeshStandardMaterial({ color: isDark ? "#111130" : "#c8c8dc", roughness: 0.5, metalness: 0.3 });
  const rimMat  = new THREE.MeshStandardMaterial({ color: isDark ? "#0a0a1c" : "#b0b0c8", roughness: 0.6, metalness: 0.1 });

  const plate = new THREE.Mesh(new THREE.BoxGeometry(TOTAL_W + 44, 18, TOTAL_D + 44), platMat);
  plate.receiveShadow = true;
  platGroup.add(plate);

  const rim = new THREE.Mesh(new THREE.BoxGeometry(TOTAL_W + 60, 13, TOTAL_D + 60), rimMat);
  rim.position.y = -14;
  platGroup.add(rim);

  // Rubber feet
  const footMat = new THREE.MeshStandardMaterial({ color: isDark ? "#070712" : "#a0a0b8" });
  [[-(TOTAL_W/2)+18,(TOTAL_D/2)-18],[+(TOTAL_W/2)-18,(TOTAL_D/2)-18],
   [-(TOTAL_W/2)+18,-(TOTAL_D/2)+18],[+(TOTAL_W/2)-18,-(TOTAL_D/2)+18]].forEach(([fx,fz])=>{
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(6,8,8,8), footMat);
    foot.position.set(fx, -22, fz);
    platGroup.add(foot);
  });
  platGroup.position.y = -(KEY_D * 0.55);

  const platProxy = new ProxyObject("platform", platGroup, new THREE.Mesh(), null, false, "");
  app.register(platProxy);

  // ── Keycaps ──
  const defaultCapColor = isDark ? "#252542" : "#dcdcf0";
  const bodyColor       = isDark ? "#1a1a30" : "#e0e0f2";

  KEY_LAYOUT.forEach(({ name, row, col }, idx) => {
    const skill = SKILLS[name as SkillNames] ?? null;
    const x = col * STEP - TOTAL_W / 2 + KEY_W / 2;
    const z = row * STEP - TOTAL_D / 2 + KEY_W / 2;

    const group = new THREE.Group();
    group.position.set(x, -600, z); // far below — bounce-in reveal
    kbdGroup.add(group);

    // Body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(KEY_W, KEY_D * 0.6, KEY_W),
      new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.45, metalness: 0.1 })
    );
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Cap — slightly bevelled look via separate mesh
    const cap = new THREE.Mesh(
      new THREE.BoxGeometry(KEY_W * 0.91, KEY_D * 0.56, KEY_W * 0.91),
      new THREE.MeshStandardMaterial({ color: defaultCapColor, roughness: 0.28, metalness: 0.22 })
    );
    cap.castShadow = true;
    cap.position.y = KEY_D * 0.45;
    group.add(cap);

    // Glow ring (hidden by default, shown on hover/select)
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(KEY_W * 0.41, KEY_W * 0.47, 40),
      new THREE.MeshBasicMaterial({ color: skill?.color ?? "#ffffff", transparent: true, opacity: 0.75, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = KEY_D * 0.19;
    ring.visible = false;
    group.add(ring);

    // Icon on top of keycap
    if (skill?.icon) {
      loader.load(skill.icon, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const icon = new THREE.Mesh(
          new THREE.PlaneGeometry(KEY_W * 0.60, KEY_W * 0.60),
          new THREE.MeshStandardMaterial({ map: tex, transparent: true, alphaTest: 0.04, roughness: 0.15, depthWrite: false })
        );
        icon.rotation.x = -Math.PI / 2;
        icon.position.y = KEY_D * 0.75;
        group.add(icon);
      });
    }

    const proxy = new ProxyObject(name, group, cap, skill, true, defaultCapColor);
    proxy._ring = ring;
    app.register(proxy);

    // keycap-desktop alias for reveal animation compatibility
    const alias = new ProxyObject("keycap-desktop", group, cap, skill, false, defaultCapColor);
    alias.visible = false;
    app.register(alias);
  });

  // Dummy objects so original animation code doesn't crash
  const dummy = new THREE.Group();
  kbdGroup.add(dummy);
  ["bongo-cat","frame-1","frame-2","text-desktop-dark","text-desktop","text-mobile-dark","text-mobile"]
    .forEach(n => app.register(new ProxyObject(n, dummy, new THREE.Mesh(), null, false, "")));
}

// ─── ThreeKeyboard component ──────────────────────────────────────────────────
interface Props { className?: string; onLoad: (app: MockApplication) => void; isDark?: boolean; }

const ThreeKeyboard = forwardRef<HTMLDivElement, Props>(({ className, onLoad, isDark = true }, ref) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Scene ──
    const scene = new THREE.Scene();

    // ── Camera — positioned to see the keyboard at Spline's coordinate scale ──
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 8000);
    // Keyboard starts at position(225, -100, 0), so we look at that region
    camera.position.set(225, 280, 900);
    camera.lookAt(225, -100, 0);

    // ── Lights ──
    const ambient = new THREE.AmbientLight(isDark ? 0x2233aa : 0x8899cc, isDark ? 1.4 : 2.0);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffffff, isDark ? 2.8 : 3.2);
    sun.position.set(500, 800, 500);
    sun.castShadow = true;
    sun.shadow.mapSize.setScalar(2048);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 4000;
    sun.shadow.camera.left = -600;
    sun.shadow.camera.right = 600;
    sun.shadow.camera.top = 600;
    sun.shadow.camera.bottom = -600;
    scene.add(sun);

    const fill = new THREE.DirectionalLight(isDark ? 0x3344ff : 0x88aaff, isDark ? 0.8 : 0.5);
    fill.position.set(-400, 300, -300);
    scene.add(fill);

    const accent = new THREE.PointLight(isDark ? 0x4455ff : 0xaabbff, isDark ? 1.8 : 0.8, 1800);
    accent.position.set(225, 500, 200);
    scene.add(accent);

    // ── App & Scene ──
    const app = new MockApplication();
    buildScene(scene, app, isDark);

    // ── Raycaster ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredProxy: ProxyObject | null = null;

    const meshesFromProxy = (): THREE.Object3D[] => {
      const out: THREE.Object3D[] = [];
      scene.traverse(o => { if (o instanceof THREE.Mesh) out.push(o); });
      return out;
    };

    const proxyFromObject = (obj: THREE.Object3D): ProxyObject | null => {
      let cur: THREE.Object3D | null = obj;
      while (cur) {
        const p = app.findObjectByName(cur.name);
        if (p && p._isKeycap) return p;
        cur = cur.parent;
      }
      return null;
    };

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouse.x =  ((e.clientX - r.left) / r.width)  * 2 - 1;
      mouse.y = -((e.clientY - r.top)  / r.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObjects(meshesFromProxy(), true);
      const found = hit.length ? proxyFromObject(hit[0].object) : null;
      if (found !== hoveredProxy) {
        hoveredProxy?.highlight(false);
        hoveredProxy = found;
        hoveredProxy?.highlight(true);
        container.style.cursor = hoveredProxy ? "pointer" : "auto";
        app.emitHover(hoveredProxy);
      }
    };

    const onDown = () => { if (hoveredProxy) { hoveredProxy.press(true); app.emitKeyDown(hoveredProxy); } };
    const onUp   = () => { hoveredProxy?.press(false); app.emitKeyUp(); };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mousedown", onDown);
    container.addEventListener("mouseup",   onUp);

    // ── Resize ──
    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Render loop ──
    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      app.getAllObjects().forEach(p => { if (p._isKeycap) p.tick(); });
      renderer.render(scene, camera);
    };
    tick();

    requestAnimationFrame(() => onLoad(app));

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mousedown", onDown);
      container.removeEventListener("mouseup",   onUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [isDark]);

  return (
    <div
      ref={el => {
        (mountRef as React.MutableRefObject<HTMLDivElement|null>).current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement|null>).current = el;
      }}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
});

ThreeKeyboard.displayName = "ThreeKeyboard";
export default ThreeKeyboard;