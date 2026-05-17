import { useEffect, useRef } from "react";

interface Pixel {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  drift: number;
}

/**
 * Cinematic ambient pixel particle layer. Lightweight canvas — soft white,
 * warm gold, deep red specks drifting upward. GPU-friendly.
 */
const PixelAtmosphere = ({ density = 60 }: { density?: number }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let pixels: Pixel[] = [];

    const palette = [
      "rgba(255,255,255,",
      "rgba(255,200,120,", // warm gold
      "rgba(220,50,60,",   // deep red
      "rgba(180,180,180,",
    ];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      pixels = Array.from({ length: density }, () => spawn(true));
    };

    const spawn = (initial = false): Pixel => ({
      x: Math.random() * canvas.offsetWidth,
      y: initial ? Math.random() * canvas.offsetHeight : canvas.offsetHeight + 10,
      size: Math.random() < 0.15 ? 4 + Math.random() * 4 : 1 + Math.random() * 2,
      speed: 0.1 + Math.random() * 0.4,
      opacity: 0.1 + Math.random() * 0.5,
      color: palette[Math.floor(Math.random() * palette.length)],
      drift: (Math.random() - 0.5) * 0.2,
    });

    const tick = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      pixels.forEach((p, i) => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) pixels[i] = spawn();
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = `${p.color}${p.opacity * 0.6})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
};

export default PixelAtmosphere;
