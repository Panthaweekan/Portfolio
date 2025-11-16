import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  colorRgb: { r: number; g: number; b: number };
  hue: number;
  pulsePhase: number;
  pulseSpeed: number;
}

const COLORS = [
  { hex: '#9C83FF', rgb: { r: 156, g: 131, b: 255 }, hue: 262 }, // Primary purple
  { hex: '#FF9051', rgb: { r: 255, g: 144, b: 81 }, hue: 20 },   // Secondary orange
  { hex: '#2DBBEE', rgb: { r: 45, g: 187, b: 238 }, hue: 195 },  // Accent cyan
  { hex: '#B19BFF', rgb: { r: 177, g: 155, b: 255 }, hue: 262 }, // Light purple
];

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create particles with varied colors
    const particleCount = 80;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorData = COLORS[Math.floor(Math.random() * COLORS.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.4 + 0.2,
        color: colorData.hex,
        colorRgb: colorData.rgb,
        hue: colorData.hue,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Mouse interaction - particles move away from cursor
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 150;

        if (distanceToMouse < interactionRadius) {
          const force = (interactionRadius - distanceToMouse) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * 0.15;
          particle.vy += Math.sin(angle) * force * 0.15;
        }

        // Apply velocity damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Update pulse animation
        particle.pulsePhase += particle.pulseSpeed;
        const pulseScale = 1 + Math.sin(particle.pulsePhase) * 0.3;
        const pulseOpacity = particle.opacity * (0.7 + Math.sin(particle.pulsePhase) * 0.3);

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * pulseScale * 2
        );
        gradient.addColorStop(0, `rgba(${particle.colorRgb.r}, ${particle.colorRgb.g}, ${particle.colorRgb.b}, ${pulseOpacity})`);
        gradient.addColorStop(0.5, `rgba(${particle.colorRgb.r}, ${particle.colorRgb.g}, ${particle.colorRgb.b}, ${pulseOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${particle.colorRgb.r}, ${particle.colorRgb.g}, ${particle.colorRgb.b}, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulseScale * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.colorRgb.r}, ${particle.colorRgb.g}, ${particle.colorRgb.b}, ${Math.min(1, pulseOpacity * 1.5)})`;
        ctx.fill();
      });

      // Draw connections between nearby particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 140;

          if (distance < maxDistance) {
            const opacity = 0.15 * (1 - distance / maxDistance);

            // Create gradient line between particles
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(${p1.colorRgb.r}, ${p1.colorRgb.g}, ${p1.colorRgb.b}, ${opacity})`);
            gradient.addColorStop(1, `rgba(${p2.colorRgb.r}, ${p2.colorRgb.g}, ${p2.colorRgb.b}, ${opacity})`);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
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
