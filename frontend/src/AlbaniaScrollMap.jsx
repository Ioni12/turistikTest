"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { UNITS, INFO, PLACES } from "./albaniaData";
import Badge from "./Badge";

const N = UNITS.length;
const STEPS = N + 2; // 0 = intro, 1..N = units, N+1 = outro
const DEPTH = 0.3;
// modest devices (4 cores or fewer, or little memory) get a lighter renderer: no shadows, no antialiasing, 1x pixels
const LOW =
  typeof navigator !== "undefined" &&
  ((navigator.hardwareConcurrency || 8) <= 4 ||
    (navigator.deviceMemory || 8) <= 4);
// "Assemble" intro: counties drop in one after another, north to south (the order of UNITS).
const DROP_H = 10; // how high above its place each tile starts (world units)
const STAGGER = 70; // ms between one county and the next
const DROP_MS = 600; // how long each county takes to land
const easeOutBack = (x) => {
  const c1 = 1.1,
    c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const X = (lon) => (lon - 20) * 8.38;
const Z = (lat) => (41.15 - lat) * 11.1;
// How much scrolling each county takes (fraction of the screen height). Lower = faster journey.
const STEP_VH = 0.5;
const stepH = () => window.innerHeight * STEP_VH;

const inPoly = (lon, lat, P) => {
  let c = false;
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const a = P[i],
      b = P[j];
    if (
      a[1] > lat !== b[1] > lat &&
      lon < ((b[0] - a[0]) * (lat - a[1])) / (b[1] - a[1]) + a[0]
    )
      c = !c;
  }
  return c;
};
const PLACE_UNIT = PLACES.map((p) =>
  UNITS.findIndex((u) => inPoly(p.lon, p.lat, u.poly)),
);

const cardCls =
  "relative h-full flex-none snap-center overflow-auto rounded-[22px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_40px_-12px_rgba(22,33,15,.35)] dark:border-white/10 dark:bg-[#0f2328]/85";
const GAP = 12;
// Load Fraunces (Google Fonts / next/font) for the headline look; Georgia is the fallback.
const FONT = "'Fraunces', Georgia, 'Times New Roman', serif";
const serif = { fontFamily: FONT };

// Full-screen background per region. Put your own at public/albania/bg/<unit-id>.jpg
// (e.g. bg/berat.jpg, bg/tirane.jpg) and bg/albania.jpg for the intro and outro.
// Missing files fall back to a random photo seeded by the id, then to the gradient.
const bgStyle = (id) => ({
  backgroundImage: `url(/albania/bg/${id}.jpg), linear-gradient(#FAF8F4, #F3F0E9)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});
const bgId = (m) => (m >= 1 && m <= N ? UNITS[m - 1].id : "albania");

export default function AlbaniaScrollMap() {
  const rootRef = useRef(null);
  const mountRef = useRef(null);
  const chipsRef = useRef(null);
  const chipRefs = useRef([]);
  const labelRefs = useRef([]);
  const pinRefs = useRef([]);
  const barRef = useRef(null);
  const st = useRef({ sel: -1, local: 0, hov: -1, idx: -1, flip: false });

  const [step, setStep] = useState(0);
  const [shown, setShown] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const [layers, setLayers] = useState([0]);
  const rowRef = useRef(null);
  const [swap, setSwap] = useState(false);
  const [trackH, setTrackH] = useState(4000);
  const [glFailed, setGlFailed] = useState(false); // true if the browser refuses to create a WebGL context

  const sel = step >= 1 && step <= N ? step - 1 : -1;
  const shownSel = shown >= 1 && shown <= N ? shown - 1 : -1;
  const goTo = useCallback((s) => {
    const y =
      rootRef.current.getBoundingClientRect().top +
      window.scrollY +
      s * stepH() +
      2;
    // use Lenis when it is running so the two smooth scrolls don't fight each other
    if (window.lenis) window.lenis.scrollTo(y, { duration: 1.3 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  // fade/swap card content when the step changes
  useEffect(() => {
    if (step === shown) {
      setSwap(false);
      return;
    }
    setSwap(true);
    const t = setTimeout(() => {
      setShown(step);
      setSwap(false);
    }, 190);
    return () => clearTimeout(t);
  }, [step, shown]);

  // keep active chip centered
  useEffect(() => {
    const el = chipRefs.current[sel],
      box = chipsRef.current;
    if (el && box)
      box.scrollTo({
        left: el.offsetLeft - box.clientWidth / 2 + 40,
        behavior: "smooth",
      });
  }, [sel]);

  // crossfade backgrounds: keep the outgoing one briefly so it can fade out
  useEffect(() => {
    setLayers((l) => [step, ...l.filter((x) => x !== step)].slice(0, 2));
    const t = setTimeout(
      () => setLayers((l) => l.filter((x) => x === step)),
      900,
    );
    return () => clearTimeout(t);
  }, [step]);

  // new unit: reset the card row to the first card
  useEffect(() => {
    rowRef.current?.scrollTo({ left: 0 });
    setCardIdx(0);
  }, [shown]);

  const onRowScroll = () => {
    const el = rowRef.current;
    if (el && el.firstChild)
      setCardIdx(Math.round(el.scrollLeft / (el.firstChild.offsetWidth + GAP)));
  };
  const nudge = (dir) => {
    const el = rowRef.current;
    if (el && el.firstChild)
      el.scrollBy({
        left: dir * (el.firstChild.offsetWidth + GAP),
        behavior: "smooth",
      });
  };

  // scroll -> state
  useEffect(() => {
    const onScroll = () => {
      const sh = stepH();
      // scroll progress is measured from the top of the map section, not the top of the page
      const top = rootRef.current
        ? -rootRef.current.getBoundingClientRect().top
        : window.scrollY;
      const p = Math.max(0, Math.min(STEPS - 1, top / sh));
      const i = Math.min(STEPS - 1, Math.floor(p + 1e-6));
      const s = st.current;
      s.local = i >= STEPS - 1 ? 0 : p - i;
      if (barRef.current)
        barRef.current.style.width = (p / (STEPS - 1)) * 100 + "%";
      if (i !== s.idx) {
        s.idx = i;
        s.sel = i >= 1 && i <= N ? i - 1 : -1;
        setStep(i);
      }
    };
    const onResize = () => {
      setNarrow(window.innerWidth < 768);
      setTrackH((STEPS - 1) * stepH());
      onScroll();
    };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // three.js scene
  useEffect(() => {
    const mount = mountRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !LOW, alpha: true });
    } catch (e) {
      // WebGL unavailable or blocked: keep the page working without the 3D map
      console.warn(
        "WebGL unavailable, showing the page without the 3D map.",
        e,
      );
      setGlFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, LOW ? 1 : 1.5));
    renderer.domElement.style.touchAction = "pan-y";
    mount.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = !LOW;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.shadowMap.autoUpdate = false; // shadows are recalculated only when something moves
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
    const HOME = {
      p: new THREE.Vector3(10, 26, 32),
      t: new THREE.Vector3(0.5, 0, 0),
    };
    cam.position.copy(HOME.p);
    // intensities x PI to match older three.js look; tweak to taste
    scene.add(new THREE.AmbientLight(0xffffff, 0.8 * Math.PI));
    const sun = new THREE.DirectionalLight(0xffffff, 0.55 * Math.PI);
    sun.position.set(-10, 18, 12);
    sun.castShadow = !LOW;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, {
      left: -24,
      right: 24,
      top: 24,
      bottom: -24,
      near: 1,
      far: 70,
    });
    sun.shadow.bias = -0.0005;
    scene.add(sun);
    // transparent plane that only shows shadows, so the photo behind stays visible
    const catcher = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 80).rotateX(-Math.PI / 2),
      new THREE.ShadowMaterial({ opacity: 0.35 }),
    );
    catcher.position.y = -0.01;
    catcher.receiveShadow = true;
    scene.add(catcher);
    const MUTED = new THREE.Color("#EFEBE2");
    const ACCENT = new THREE.Color("#D93A2B"); // the county in focus turns red

    const units = UNITS.map((u, i) => {
      const shape = new THREE.Shape(
        u.poly.map((p) => new THREE.Vector2(X(p[0]), -Z(p[1]))),
      );
      const g = new THREE.ExtrudeGeometry(shape, {
        depth: DEPTH,
        bevelEnabled: false,
      });
      g.rotateX(-Math.PI / 2);
      const mat = new THREE.MeshLambertMaterial({ color: u.color });
      const mesh = new THREE.Mesh(g, mat);
      mesh.userData.i = i;
      mesh.visible = false; // revealed by the assemble animation
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.add(
        new THREE.LineSegments(
          new THREE.EdgesGeometry(g, 30),
          new THREE.LineBasicMaterial({ color: 0xffffff }),
        ),
      );
      scene.add(mesh);
      let a = 0,
        cx = 0,
        cz = 0;
      const P = u.poly.map((p) => [X(p[0]), Z(p[1])]);
      for (let k = 0; k < P.length; k++) {
        const p = P[k],
          q = P[(k + 1) % P.length],
          w = p[0] * q[1] - q[0] * p[1];
        a += w;
        cx += (p[0] + q[0]) * w;
        cz += (p[1] + q[1]) * w;
      }
      return {
        mesh,
        mat,
        base: new THREE.Color(u.color),
        c: new THREE.Vector3(cx / (3 * a), DEPTH + 0.1, cz / (3 * a)),
        lift: 0,
        dim: 0,
        dy: 0, // extra height while dropping in
        ox: 0, // sideways offset while sliding in
        oz: 0,
        show: false, // true once landed (labels wait for this)
        delay: i * STAGGER,
        hl: 0, // highlight amount
      };
    });
    const pins = PLACES.map(
      (p) => new THREE.Vector3(X(p.lon), DEPTH + 0.05, Z(p.lat)),
    );

    let dirty = true; // true = the canvas must be redrawn (first frame, resize)
    const size = () => {
      const w = document.documentElement.clientWidth,
        h = window.innerHeight;
      renderer.setSize(w, h);
      cam.aspect = w / h;
      if (w >= 768) cam.setViewOffset(w, h, -w * 0.14, 0, w, h);
      else cam.setViewOffset(w, h, 0, h * 0.16, w, h);
      cam.updateProjectionMatrix();
      dirty = true;
    };
    size();
    window.addEventListener("resize", size);

    const ray = new THREE.Raycaster(),
      mp = new THREE.Vector2();
    const hit = (e) => {
      const b = renderer.domElement.getBoundingClientRect();
      mp.set(
        ((e.clientX - b.left) / b.width) * 2 - 1,
        -((e.clientY - b.top) / b.height) * 2 + 1,
      );
      ray.setFromCamera(mp, cam);
      const h = ray.intersectObjects(units.map((u) => u.mesh))[0];
      return h ? h.object.userData.i : -1;
    };
    const cv = renderer.domElement;
    const onClick = (e) => {
      const i = hit(e);
      if (i >= 0) goTo(i + 1);
    };
    const onMove = (e) => {
      if (e.pointerType === "mouse") {
        st.current.hov = hit(e);
        cv.style.cursor = st.current.hov >= 0 ? "pointer" : "default";
      }
    };
    cv.addEventListener("click", onClick);
    cv.addEventListener("pointermove", onMove);

    const cur = { p: HOME.p.clone(), t: HOME.t.clone() },
      v = new THREE.Vector3();
    let raf;
    let t0 = null; // start time of the assemble animation; reset to null when the map leaves the screen
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const tmpV = new THREE.Vector3();
    const put = (el, pos, lift, show) => {
      if (!el) return;
      if (!show) {
        el.style.display = "none";
        return;
      }
      v.copy(pos);
      v.y += lift;
      v.project(cam);
      const w = document.documentElement.clientWidth,
        h = window.innerHeight;
      el.style.display = "flex";
      el.style.transform = `translate(${(v.x * 0.5 + 0.5) * w}px,${(-v.y * 0.5 + 0.5) * h}px) translate(-50%,-100%)`;
    };
    let running = false;
    const T = new THREE.Vector3(),
      P = new THREE.Vector3();
    const loop = () => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      const { sel: s, local, hov } = st.current;
      const now = performance.now();
      if (reduce) {
        if (t0 === null) t0 = now; // reduced motion: show the finished map straight away
      } else if (t0 === null && rootRef.current) {
        const r = rootRef.current.getBoundingClientRect(),
          vh = window.innerHeight;
        if (r.top < vh * 0.6 && r.bottom > vh * 0.4) t0 = now; // map is well inside the screen -> start the assemble animation
      }
      const narrow = window.innerWidth < 768;
      if (s >= 0) {
        T.copy(units[s].c);
        const az = (local - 0.5) * 0.7,
          d = narrow ? 17 : 13;
        P.set(T.x + Math.sin(az) * d, T.y + d * 0.78, T.z + Math.cos(az) * d);
      } else {
        const k = narrow ? 1.45 : 1,
          az = (local - 0.5) * 0.3;
        T.copy(HOME.t);
        P.set(HOME.p.x * k + Math.sin(az) * 6, HOME.p.y * k, HOME.p.z * k);
      }
      cur.t.lerp(T, 0.11); // camera follow speed: higher = snappier
      cur.p.lerp(P, 0.11);
      let moving =
        dirty || cur.p.distanceToSquared(P) + cur.t.distanceToSquared(T) > 1e-5;
      cam.position.copy(cur.p);
      cam.lookAt(cur.t);
      units.forEach((u, i) => {
        const lt = i === s ? 0.6 : i === hov ? 0.15 : 0;
        const dt = s < 0 ? 0 : i === s ? 0 : i < s ? 0.12 : 0.6;
        const hlT = i === s ? 1 : 0;
        if (
          Math.abs(lt - u.lift) + Math.abs(dt - u.dim) + Math.abs(hlT - u.hl) >
          0.002
        )
          moving = true;
        u.lift += (lt - u.lift) * 0.12;
        u.dim += (dt - u.dim) * 0.12;
        u.hl += (hlT - u.hl) * 0.12;
        // assemble animation: drop from above, sliding in from slightly outside, with a small bounce
        const pr =
          t0 === null
            ? 0
            : reduce
              ? 1
              : Math.min(1, Math.max(0, (now - t0 - u.delay) / DROP_MS));
        const drop = Math.max(-0.05, 1 - easeOutBack(pr));
        if (pr > 0 && pr < 1) moving = true;
        if (pr > 0 !== u.mesh.visible) moving = true;
        u.mesh.visible = pr > 0;
        u.dy = drop * DROP_H;
        u.ox = u.c.x * 0.35 * drop;
        u.oz = u.c.z * 0.25 * drop;
        u.show = pr >= 1;
        u.mesh.position.set(u.ox, u.lift + u.dy, u.oz);
        u.mat.color
          .copy(u.base)
          .lerp(MUTED, u.dim)
          .lerp(ACCENT, u.hl * 0.92);
      });
      if (!moving) return; // nothing changed since the last frame: skip drawing and keep the loop almost free
      dirty = false;
      renderer.shadowMap.needsUpdate = true;
      renderer.render(scene, cam);
      units.forEach((u, i) => {
        tmpV.set(u.c.x + u.ox, u.c.y, u.c.z + u.oz);
        put(labelRefs.current[i], tmpV, u.lift + u.dy, u.show); // names appear once the county has landed
      });
      pins.forEach((p, k) => {
        const r = PLACE_UNIT[k];
        put(
          pinRefs.current[k],
          p,
          r >= 0 ? units[r].lift + units[r].dy : 0,
          s >= 0 && r === s,
        );
      });
    };
    // run only while the map section is on (or just next to) the screen
    const start = () => {
      if (running) return;
      running = true;
      dirty = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      if (!reduce) t0 = null; // the assemble animation plays again next time the map comes into view
    };
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { rootMargin: "150px" },
    );
    io.observe(rootRef.current);

    return () => {
      running = false;
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      cv.removeEventListener("click", onClick);
      cv.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        o.geometry?.dispose();
        o.material?.dispose?.();
      });
      renderer.dispose();
      // release the GPU context so repeat mounts (Strict Mode, hot reload) don't exhaust the browser limit
      renderer.forceContextLoss();
      cv.remove();
    };
  }, [goTo]);

  // cards for the unit in focus
  const unit = shownSel >= 0 ? UNITS[shownSel] : null;
  const info = unit ? INFO[unit.id] || { tag: "", best: "", cards: [] } : null;
  const tours = unit
    ? [
        ...new Map(
          PLACES.filter((_, k) => PLACE_UNIT[k] === shownSel)
            .flatMap((p) => p.tours)
            .map((t) => [t[0], t]),
        ).values(),
      ]
    : [];
  const slides = [];
  if (shown === 0) slides.push({ k: "intro" });
  else if (shown > N) slides.push({ k: "outro" });
  else {
    slides.push({ k: "overview" });
    info.cards.forEach((c) => slides.push({ k: "info", t: c[0], d: c[1] }));
    slides.push({ k: "tours" });
  }
  const label = "text-xs tracking-widest opacity-60";
  const h2 =
    "mb-2 text-[30px] font-semibold leading-[1.05] tracking-tight md:text-[34px]";
  const arrow =
    "h-7 w-7 rounded-full bg-[#141414] text-xs text-white disabled:opacity-25 dark:bg-[#D93A2B] dark:text-[#141414]";

  return (
    <div
      id="map"
      ref={rootRef}
      className="relative text-[#141414] dark:text-[#e8f0e0]"
    >
      {/* everything below is pinned to the screen while the map section scrolls past */}
      <div className="sticky top-0 isolate h-screen overflow-hidden">
        {/* background: the selected region's image, crossfading as it changes */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#FAF8F4]">
          {layers.map((m) => (
            <div
              key={m}
              className={`absolute inset-0 transition-opacity duration-700 ${m === step ? "opacity-100" : "opacity-0"}`}
              style={bgStyle(bgId(m))}
            />
          ))}
          <div className="absolute inset-0 bg-[#FAF8F4]/80" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_45%,transparent_40%,rgba(0,0,0,.06)_100%)]" />
        </div>

        {glFailed && (
          <div className="absolute inset-x-3 top-28 z-30 rounded-xl bg-black/60 p-3 text-center text-sm text-white md:left-auto md:right-6 md:max-w-sm">
            The 3D map couldn't start on this device. You can still scroll
            through every county below.
          </div>
        )}

        <div
          ref={barRef}
          className="absolute left-0 top-0 z-50 h-[3px] w-0 bg-[#D93A2B]"
        />

        <header className="absolute inset-x-0 top-[calc(76px+env(safe-area-inset-top))] z-30 px-3.5 pb-1.5 text-[#141414]">
          <div
            ref={chipsRef}
            className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]"
          >
            {UNITS.map((u, i) => (
              <button
                key={u.id}
                ref={(el) => (chipRefs.current[i] = el)}
                onClick={() => goTo(i + 1)}
                className={`flex-none rounded-full border px-[11px] py-1 text-xs ${
                  i === sel
                    ? "border-transparent bg-[#141414] text-white"
                    : "border-black/15 bg-white/70 text-white"
                }`}
              >
                <i
                  className="mr-1.5 inline-block h-2 w-2 rounded-full"
                  style={{ background: u.color }}
                />
                {u.name}
              </button>
            ))}
          </div>
        </header>

        {/* 3D stage: canvas + HTML labels/pins projected from the scene */}
        <div className="absolute inset-0 z-10">
          <div ref={mountRef} className="absolute inset-0" />
          {UNITS.map((u, i) => (
            <div
              key={u.id}
              ref={(el) => (labelRefs.current[i] = el)}
              style={{
                ...serif,
                textShadow: "0 0 6px rgba(255,255,255,.95), 0 0 2px #fff",
              }}
              className={`pointer-events-none absolute left-0 top-0 flex-col items-center whitespace-nowrap text-[13px] font-medium italic text-[#141414] transition-opacity duration-300 ${
                i === sel ? "opacity-100" : "opacity-[.65]"
              }`}
            >
              <Badge u={u} active={i === sel} />
              {u.name}
            </div>
          ))}
          {PLACES.map((p, k) => (
            <div
              key={p.n}
              ref={(el) => (pinRefs.current[k] = el)}
              className="pointer-events-none absolute left-0 top-0 flex flex-col items-center gap-0.5 whitespace-nowrap text-xs font-semibold"
            >
              <b className="rounded-full bg-[#141414] px-2.5 py-0.5 font-semibold text-white shadow-lg dark:bg-white dark:text-[#141414]">
                {p.n}
              </b>
              <i className="relative mt-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#D93A2B]">
                <span className="absolute -inset-1.5 animate-ping rounded-full bg-[#D93A2B]/40" />
              </i>
            </div>
          ))}
        </div>

        {/* swipeable cards */}
        <div
          className={`absolute inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom))] z-40 flex h-[min(310px,48vh)] flex-col transition duration-200 md:inset-x-auto md:bottom-auto md:left-7 md:top-1/2 md:-mt-[175px] md:h-[350px] md:w-[380px] ${
            swap ? "translate-y-3.5 opacity-0" : ""
          }`}
        >
          <div
            ref={rowRef}
            onScroll={onRowScroll}
            style={{ gap: GAP }}
            className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
          >
            {slides.map((sl, n) => (
              <div
                key={shown + "-" + n}
                style={
                  unit
                    ? {
                        backgroundImage: `linear-gradient(160deg, ${unit.color}66, transparent 50%)`,
                      }
                    : undefined
                }
                className={`${cardCls} ${slides.length > 1 ? "w-[88%]" : "w-full"}`}
              >
                <div
                  className="mb-3.5 h-1.5 w-14 rounded-full"
                  style={{ background: unit ? unit.color : "#D93A2B" }}
                />
                {sl.k === "intro" && (
                  <>
                    <div className={label}>{N} COUNTIES</div>
                    <h2 style={serif} className={h2}>
                      Albania, piece by piece
                    </h2>
                    <p className="opacity-70">
                      From the Alps in the north to the Ionian coast in the
                      south. Scroll to explore.
                    </p>
                    <span className="absolute bottom-4 left-5 text-xs opacity-60">
                      Scroll ↓
                    </span>
                  </>
                )}
                {sl.k === "overview" && (
                  <>
                    <span
                      style={serif}
                      className="pointer-events-none absolute right-4 top-1 text-[84px] font-semibold leading-none opacity-[.14]"
                    >
                      {String(shownSel + 1).padStart(2, "0")}
                    </span>
                    <div className={label}>
                      {String(shownSel + 1).padStart(2, "0")} / {N}
                    </div>
                    <h2 style={serif} className={h2}>
                      {unit.name}
                    </h2>
                    <p className="mb-2 opacity-70">{info.tag}</p>
                    <div className="text-[12.5px] opacity-70">
                      Main town: {unit.main}
                    </div>
                    <div className="text-[12.5px] opacity-70">
                      Best for: {info.best}
                    </div>
                    <span className="absolute bottom-4 left-5 text-xs opacity-60">
                      Swipe for highlights →
                    </span>
                  </>
                )}
                {sl.k === "info" && (
                  <>
                    <div className={label}>
                      {unit.name.toUpperCase()} · {n} / {info.cards.length}
                    </div>
                    <h3
                      style={serif}
                      className="mb-2 mt-1 text-2xl font-semibold leading-tight"
                    >
                      {sl.t}
                    </h3>
                    <p className="opacity-75">{sl.d}</p>
                  </>
                )}
                {sl.k === "tours" && (
                  <>
                    <div className={label}>TOURS HERE</div>
                    {tours.length ? (
                      <ul className="mt-2">
                        {tours.map((t) => (
                          <li
                            key={t[0]}
                            className="mt-1.5 flex justify-between gap-2.5 rounded-xl bg-black/5 px-3 py-2 text-[13.5px] dark:bg-white/10"
                          >
                            <span>{t[0]}</span>
                            <em className="whitespace-nowrap font-semibold not-italic text-[#D93A2B] dark:text-[#D93A2B]">
                              from {t[1]}
                            </em>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 opacity-70">
                        No tours linked yet. Tell us what you'd like to do here
                        and we'll build it.
                      </p>
                    )}
                  </>
                )}
                {sl.k === "outro" && (
                  <>
                    <div className={label}>THE END · OR THE START</div>
                    <h2 style={serif} className={h2}>
                      Ready to see it for real?
                    </h2>
                    <p className="mb-2 opacity-70">
                      Our local team can build a trip around the places you
                      liked.
                    </p>
                    <a
                      href="https://wonderalbania.com/inquiry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full bg-[#141414] px-[18px] py-2.5 font-semibold text-white"
                    >
                      Enquire
                    </a>
                  </>
                )}
              </div>
            ))}
          </div>
          {slides.length > 1 && (
            <div className="mt-2 flex h-6 items-center justify-between px-1">
              <div className="flex gap-1.5">
                {slides.map((_, n) => (
                  <span
                    key={n}
                    className={`h-1.5 rounded-full transition-all ${n === cardIdx ? "w-4 bg-[#D93A2B] dark:bg-[#D93A2B]" : "w-1.5 bg-black/20 dark:bg-white/30"}`}
                  />
                ))}
              </div>
              <div className="flex gap-1.5">
                <button
                  aria-label="Previous card"
                  disabled={cardIdx === 0}
                  onClick={() => nudge(-1)}
                  className={arrow}
                >
                  ←
                </button>
                <button
                  aria-label="Next card"
                  disabled={cardIdx === slides.length - 1}
                  onClick={() => nudge(1)}
                  className={arrow}
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* scroll track: gives the section its scrolling height */}
      <div style={{ height: trackH }} className="w-px" />
    </div>
  );
}
