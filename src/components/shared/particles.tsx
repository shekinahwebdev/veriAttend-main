"use client";

function seededValue(seed: number, min: number, max: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  const normalized = x - Math.floor(x);
  return min + normalized * (max - min);
}

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: seededValue(i, 0, 100).toFixed(2),
  y: seededValue(i + 100, 0, 100).toFixed(2),
  size: seededValue(i + 200, 2, 6).toFixed(2),
  duration: seededValue(i + 300, 10, 30).toFixed(2),
  delay: seededValue(i + 400, 0, 5).toFixed(2),
}));

export function ParticlesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="animate-particle-float absolute rounded-full bg-primary/20 dark:bg-primary/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            // CSS variables keep animation timing deterministic for SSR
            ["--particle-duration" as string]: `${p.duration}s`,
            ["--particle-delay" as string]: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function GradientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl dark:bg-primary/10" />
      <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-blue-400/15 blur-3xl dark:bg-blue-500/10" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
    </div>
  );
}
