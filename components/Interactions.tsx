"use client";

/**
 * All motion and interaction for the page, attached to the server-rendered markup:
 * 360° tee viewers, scroll reveals, progress bar + "where am I", mobile menu,
 * draggable banner stickers and the desktop cursor. Everything is torn down on unmount.
 */
import { useEffect } from "react";

type Drag = { x: number; y: number; a: number; t: number; lx: number; lock: "x" | "y" | null; id: number };
type Tween = { from: number; to: number; start: number; dur: number };

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

class Viewer {
  root: HTMLElement;
  stage: HTMLElement;
  spin: HTMLElement | null;
  faces: HTMLElement[];
  floor: HTMLElement;
  frame: HTMLImageElement | null;
  deg: HTMLElement;
  btns: HTMLButtonElement[];
  frames: string[];
  angle = 0;
  vel = 0;
  tween: Tween | null = null;
  drag: Drag | null = null;
  inView = false;
  idleAt: number;
  holdUntil = 0;
  last: { a: string | null; f: number | null; front: boolean | null } = { a: null, f: null, front: null };
  reduced: boolean;

  constructor(root: HTMLElement, reduced: boolean, signal: AbortSignal) {
    this.root = root;
    this.reduced = reduced;
    this.stage = root.querySelector(".viewer__stage")!;
    this.spin = root.querySelector(".viewer__spin");
    this.faces = Array.from(root.querySelectorAll<HTMLElement>(".viewer__face"));
    this.floor = root.querySelector(".viewer__floor")!;
    this.frame = root.querySelector(".viewer__frame");
    this.deg = root.querySelector("[data-deg]")!;
    this.btns = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-face]"));
    this.frames = root.dataset.frames ? JSON.parse(root.dataset.frames) : [];
    this.idleAt = performance.now() + 1200;
    this.frames.slice(1).forEach((s) => { const im = new Image(); im.decoding = "async"; im.src = s; });
    this.bind(signal);
    this.paint();
  }

  bind(signal: AbortSignal) {
    const st = this.stage;
    const opts = { signal };
    st.addEventListener("pointerdown", (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      this.drag = { x: e.clientX, y: e.clientY, a: this.angle, t: performance.now(), lx: e.clientX, lock: e.pointerType === "mouse" ? "x" : null, id: e.pointerId };
      this.tween = null; this.vel = 0;
      if (e.pointerType === "mouse") st.setPointerCapture(e.pointerId);
    }, opts);
    st.addEventListener("pointermove", (e) => {
      const d = this.drag; if (!d || e.pointerId !== d.id) return;
      const dx = e.clientX - d.x, dy = e.clientY - d.y;
      if (!d.lock) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        d.lock = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (d.lock === "x") { try { st.setPointerCapture(e.pointerId); } catch { /* ignore */ } }
      }
      if (d.lock !== "x") return;
      const now = performance.now(), w = st.clientWidth || 300;
      this.vel = ((e.clientX - d.lx) / w) * 300 / Math.max(8, now - d.t) * 16;
      d.lx = e.clientX; d.t = now;
      this.angle = d.a + (dx / w) * 300; this.idleAt = now + 3500;
    }, opts);
    const end = (e: PointerEvent) => {
      if (!this.drag || e.pointerId !== this.drag.id) return;
      this.drag = null; this.idleAt = performance.now() + 3500;
    };
    st.addEventListener("pointerup", end, opts);
    st.addEventListener("pointercancel", end, opts);
    st.addEventListener("lostpointercapture", end, opts);
    st.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        this.goTo(this.angle + (e.key === "ArrowRight" ? 45 : -45), 450);
        this.idleAt = performance.now() + 5000;
      }
    }, opts);
    this.btns.forEach((b) => b.addEventListener("click", () => {
      const target = b.dataset.face === "front" ? 0 : 180;
      this.goTo(Math.round((this.angle - target) / 360) * 360 + target, 900);
      this.idleAt = performance.now() + 6000;
    }, opts));
  }

  goTo(to: number, dur: number) {
    this.vel = 0;
    this.tween = { from: this.angle, to, start: performance.now(), dur };
  }

  step(now: number) {
    if (this.drag) { /* angle set by pointer */ }
    else if (this.tween) {
      const k = Math.min(1, (now - this.tween.start) / this.tween.dur);
      this.angle = this.tween.from + (this.tween.to - this.tween.from) * ease(k);
      if (k >= 1) { this.tween = null; this.holdUntil = now + 2600; }
    } else if (Math.abs(this.vel) > 0.05) {
      this.angle += this.vel; this.vel *= 0.93;
    } else if (!this.reduced && now > this.idleAt && now > this.holdUntil) {
      // showcase loop: settle on a face, hold, turn to the other face
      const nearest = Math.round(this.angle / 180) * 180;
      if (Math.abs(nearest - this.angle) > 1) this.goTo(nearest, 700);
      else this.goTo(nearest + 180, 1700);
    }
    this.paint();
  }

  paint() {
    const a = this.angle, r = (a * Math.PI) / 180, c = Math.cos(r), s = Math.abs(Math.sin(r));
    const key = a.toFixed(2);
    if (key === this.last.a) return;
    this.last.a = key;
    if (this.frames.length && this.frame) {
      const n = this.frames.length, idx = ((Math.round((a / 360) * n) % n) + n) % n;
      if (idx !== this.last.f) { this.frame.src = this.frames[idx]; this.last.f = idx; }
    } else if (this.spin) {
      this.spin.style.transform = `rotateY(${a}deg)`;
      const f = `brightness(${(1 - s * 0.16).toFixed(3)})`;
      this.faces.forEach((el) => { el.style.filter = f; });
    }
    this.floor.style.transform = `translateX(-50%) scaleX(${(0.5 + 0.5 * Math.abs(c)).toFixed(3)})`;
    const d = ((Math.round(a) % 360) + 360) % 360;
    this.deg.textContent = String(d).padStart(3, "0") + "°";
    const front = c >= 0;
    if (front !== this.last.front) {
      this.last.front = front;
      this.btns[0]?.setAttribute("aria-pressed", front ? "true" : "false");
      this.btns[1]?.setAttribute("aria-pressed", front ? "false" : "true");
    }
  }
}

export default function Interactions() {
  useEffect(() => {
    const ac = new AbortController();
    const { signal } = ac;
    const doc = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const rafs: number[] = [];
    const observers: IntersectionObserver[] = [];
    const timers: number[] = [];

    /* ---------- 360 viewers ---------- */
    const viewers = Array.from(document.querySelectorAll<HTMLElement>("[data-viewer]")).map((el) => new Viewer(el, reduced, signal));
    const vio = new IntersectionObserver((es) => {
      es.forEach((e) => {
        const v = viewers.find((x) => x.root === e.target);
        if (!v) return;
        v.inView = e.isIntersecting;
        if (e.isIntersecting && performance.now() > v.idleAt - 1000) v.idleAt = performance.now() + 900;
      });
    }, { threshold: 0.35 });
    viewers.forEach((v) => vio.observe(v.root));
    observers.push(vio);
    const loop = (now: number) => {
      for (const v of viewers) if (v.inView || v.drag) v.step(now);
      rafs[0] = requestAnimationFrame(loop);
    };
    rafs[0] = requestAnimationFrame(loop);

    /* ---------- reveals ---------- */
    const rio = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll("[data-reveal], .line").forEach((el) => rio.observe(el));
    observers.push(rio);

    /* ---------- progress + where-am-I ---------- */
    const bar = document.querySelector<HTMLElement>(".progress span");
    const onScroll = () => {
      const h = doc.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`;
    };
    addEventListener("scroll", onScroll, { passive: true, signal });
    onScroll();

    const whereNum = document.getElementById("whereNum");
    const whereLabel = document.getElementById("whereLabel");
    const navEl = document.getElementById("nav");
    const meta = document.querySelector('meta[name="theme-color"]');
    const sio = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const t = e.target as HTMLElement;
        const cs = getComputedStyle(t);
        const dark = t.classList.contains("about");
        const fg = cs.getPropertyValue("--fg").trim() || "#131311";
        if (whereNum) whereNum.textContent = t.dataset.num || "";
        if (whereLabel) whereLabel.textContent = t.dataset.label || "";
        navEl?.style.setProperty("--nav-fg", dark ? "#ECE8E1" : fg);
        navEl?.style.setProperty("--nav-bg", dark ? "rgba(19,19,17,.72)" : t.classList.contains("product") ? cs.getPropertyValue("--plate").trim() : "rgba(236,232,225,.78)");
        doc.style.setProperty("--bar", dark ? "#ECE8E1" : fg);
        meta?.setAttribute("content", t.dataset.theme || cs.backgroundColor);
      });
    }, { rootMargin: "-50% 0px -50% 0px" });
    document.querySelectorAll("[data-label]").forEach((s) => sio.observe(s));
    observers.push(sio);

    /* ---------- mobile menu ---------- */
    const burger = document.querySelector<HTMLButtonElement>(".nav__burger");
    const menu = document.getElementById("menu");
    const setMenu = (open: boolean) => {
      if (!burger || !menu) return;
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (open) {
        menu.hidden = false;
        requestAnimationFrame(() => menu.classList.add("open"));
        document.body.style.overflow = "hidden";
      } else {
        menu.classList.remove("open");
        document.body.style.overflow = "";
        timers.push(window.setTimeout(() => { if (!menu.classList.contains("open")) menu.hidden = true; }, 600));
      }
    };
    burger?.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"), { signal });
    menu?.addEventListener("click", (e) => { if ((e.target as HTMLElement).closest("a")) setMenu(false); }, { signal });
    addEventListener("keydown", (e) => { if (e.key === "Escape" && menu && !menu.hidden) setMenu(false); }, { signal });

    /* ---------- banner stickers: drag on desktop, tap to boing on touch ---------- */
    const hint = document.querySelector(".banner__hint");
    if (hint) hint.textContent = fine ? "Psst — drag the stickers" : "Psst — tap the stickers";
    document.querySelectorAll<HTMLElement>("[data-stk]").forEach((s) => {
      const boing = () => { s.classList.remove("boing"); void s.offsetWidth; s.classList.add("boing"); };
      s.addEventListener("animationend", (e) => { if (e.animationName === "boing") s.classList.remove("boing"); }, { capture: true, signal });
      if (!fine) { s.addEventListener("click", boing, { signal }); return; }
      let st: { x: number; y: number; dx: number; dy: number; moved: boolean } | null = null;
      s.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        const cs = getComputedStyle(s);
        st = { x: e.clientX, y: e.clientY, dx: parseFloat(cs.getPropertyValue("--dx")) || 0, dy: parseFloat(cs.getPropertyValue("--dy")) || 0, moved: false };
        s.setPointerCapture(e.pointerId);
        s.classList.add("dragging");
      }, { signal });
      s.addEventListener("pointermove", (e) => {
        if (!st) return;
        const mx = e.clientX - st.x, my = e.clientY - st.y;
        if (Math.abs(mx) + Math.abs(my) > 3) st.moved = true;
        s.style.setProperty("--dx", `${st.dx + mx}px`);
        s.style.setProperty("--dy", `${st.dy + my}px`);
      }, { signal });
      const end = () => { if (!st) return; const m = st.moved; st = null; s.classList.remove("dragging"); if (!m) boing(); };
      s.addEventListener("pointerup", end, { signal });
      s.addEventListener("pointercancel", end, { signal });
    });

    /* ---------- cursor (desktop only) ---------- */
    const cur = document.querySelector<HTMLElement>(".cursor");
    if (fine && !reduced && cur) {
      let cx = -100, cy = -100, tx = -100, ty = -100;
      addEventListener("pointermove", (e) => { if (e.pointerType === "mouse") { tx = e.clientX; ty = e.clientY; } }, { passive: true, signal });
      document.addEventListener("pointerover", (e) => {
        const t = e.target as HTMLElement;
        const onDrag = !!t.closest(".viewer__stage, [data-stk]");
        cur.classList.toggle("is-drag", onDrag);
        cur.classList.toggle("is-link", !onDrag && !!t.closest("a, button"));
      }, { signal });
      document.addEventListener("mouseleave", () => cur.classList.add("is-hidden"), { signal });
      document.addEventListener("mouseenter", () => cur.classList.remove("is-hidden"), { signal });
      const follow = () => {
        cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
        cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
        rafs[1] = requestAnimationFrame(follow);
      };
      rafs[1] = requestAnimationFrame(follow);
    }

    return () => {
      ac.abort();
      rafs.forEach((id) => cancelAnimationFrame(id));
      observers.forEach((o) => o.disconnect());
      timers.forEach((id) => clearTimeout(id));
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
