"use client";

import { useEffect, useRef } from "react";

function timePeriod(): "dawn" | "day" | "dusk" | "night" {
  const h = new Date().getHours();
  if (h >= 5 && h < 8) return "dawn";
  if (h >= 8 && h < 17) return "day";
  if (h >= 17 && h < 20) return "dusk";
  return "night";
}

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const periodRef = useRef(timePeriod());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stars: { x: number; y: number; r: number; a: number; s: number }[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((w * h) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.6 + 0.2,
        s: Math.random() * 0.4 + 0.1,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.classList.contains("dark");
      const baseAlpha = isDark ? 0.85 : 0.25;
      const period = periodRef.current;
      const periodBoost =
        period === "night" ? 1 : period === "dusk" || period === "dawn" ? 0.7 : 0.35;

      for (const star of stars) {
        const twinkle =
          0.55 + 0.45 * Math.sin(t * 0.001 * star.s + star.x * 0.01);
        ctx.beginPath();
        ctx.fillStyle = `rgba(230, 220, 255, ${star.a * twinkle * baseAlpha * periodBoost})`;
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    const periodTimer = window.setInterval(() => {
      periodRef.current = timePeriod();
      const el = canvas.parentElement;
      if (el) el.dataset.period = periodRef.current;
    }, 60_000);

    const parent = canvas.parentElement;
    if (parent) parent.dataset.period = periodRef.current;

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      clearInterval(periodTimer);
    };
  }, []);

  return (
    <div className="cosmic-bg" aria-hidden="true" data-period={timePeriod()}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="mandala-accent -top-16 -right-16" />
      <div className="mandala-accent -bottom-20 -left-20 rotate-45" />
    </div>
  );
}
