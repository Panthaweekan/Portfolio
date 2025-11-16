import { useEffect, useState } from 'react';
import { m, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedSkillBarProps {
  skill: string;
  percentage: number;
  color?: string;
  delay?: number;
}

export function AnimatedSkillBar({ skill, percentage, color = 'bg-primary', delay = 0 }: AnimatedSkillBarProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 1500; // 1.5 seconds

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * percentage));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      const timeoutId = setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [isInView, percentage, delay]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{skill}</span>
        <span className="text-sm font-semibold text-primary">{count}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <m.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay, ease: 'easeOut' }}
          className={`h-full ${color} rounded-full relative`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
               style={{ backgroundSize: '200% 100%' }} />
        </m.div>
      </div>
    </div>
  );
}
