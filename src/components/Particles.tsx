import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  colorRgb: { r: number; g: number; b: number };
}

const COLORS = [
  { r: 156, g: 131, b: 255 }, // Primary purple
  { r: 255, g: 144, b: 81 },  // Secondary orange
  { r: 45, g: 187, b: 238 },  // Accent cyan
];

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position with throttling
    let mouseMoveTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseMoveTimeout) return;
      mouseMoveTimeout = setTimeout(() => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
        mouseMoveTimeout = null;
      }, 16); // ~60fps throttle for mouse
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Visibility observer - pause when off screen
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Create fewer particles for better performance
    const particleCount = 40; // Reduced from 80
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorData = COLORS[Math.floor(Math.random() * COLORS.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.2,
        colorRgb: colorData,
      });
    }

    // Animation loop with frame skipping
    let animationFrameId: number;
    let lastFrameTime = 0;
    const targetFPS = 30; // Limit to 30fps for smoother scrolling
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip frame if not visible or too soon
      if (!isVisibleRef.current) return;
      if (currentTime - lastFrameTime < frameInterval) return;
      lastFrameTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // Simple mouse interaction
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distSq = dx * dx + dy * dy;
        const interactionRadiusSq = 22500; // 150^2

        if (distSq < interactionRadiusSq) {
          const force = 0.1 * (1 - distSq / interactionRadiusSq);
          const dist = Math.sqrt(distSq);
          particle.vx += (dx / dist) * force;
          particle.vy += (dy / dist) * force;
        }

        // Apply velocity damping and update position
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Simple circle draw (no gradient for performance)
        const { r, g, b } = particle.colorRgb;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;
        ctx.fill();
      }

      // Draw connections between nearby particles (simplified)
      const maxDistSq = 10000; // 100^2 - reduced from 140
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const opacity = 0.1 * (1 - distSq / maxDistSq);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(156, 131, 255, ${opacity})`;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
}

