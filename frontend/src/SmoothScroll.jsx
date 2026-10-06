'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Inertia ("smooth") scrolling for the whole page. Render it once, anywhere in the app.
 * Other components can reach it through window.lenis (for example window.lenis.scrollTo(y)).
 * It stays off for people who ask their device for reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: true }); // lerp: lower = floatier, higher = snappier
    window.lenis = lenis;
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      if (window.lenis === lenis) delete window.lenis;
    };
  }, []);
  return null;
}
