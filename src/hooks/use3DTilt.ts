import { useRef, useEffect } from 'react';

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  reset?: boolean;
  glare?: boolean;
  glareMaxOpacity?: number;
}

export function use3DTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.05,
    speed = 400,
    reset = true,
    glare = true,
    glareMaxOpacity = 0.2,
  } = options;

  const elementRef = useRef<T>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create glare element if enabled
    let glareElement: HTMLDivElement | null = null;
    if (glare) {
      glareElement = document.createElement('div');
      glareElement.className = 'tilt-glare';
      glareElement.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%);
        opacity: 0;
        pointer-events: none;
        border-radius: inherit;
        transition: opacity ${speed}ms ease-out;
      `;
      element.appendChild(glareElement);
      glareRef.current = glareElement;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const tiltX = percentY * maxTilt;
      const tiltY = -percentX * maxTilt;

      element.style.transform = `
        perspective(${perspective}px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale3d(${scale}, ${scale}, ${scale})
      `;

      // Update glare position and opacity
      if (glareElement) {
        const glareOpacity = Math.min(
          glareMaxOpacity,
          (Math.abs(percentX) + Math.abs(percentY)) / 2 * glareMaxOpacity
        );
        const glareX = percentX * 100;
        const glareY = percentY * 100;

        glareElement.style.background = `
          radial-gradient(
            circle at ${50 + glareX}% ${50 + glareY}%,
            rgba(255,255,255,${glareOpacity}) 0%,
            transparent 60%
          )
        `;
        glareElement.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (reset) {
        element.style.transform = `
          perspective(${perspective}px)
          rotateX(0deg)
          rotateY(0deg)
          scale3d(1, 1, 1)
        `;
      }

      if (glareElement) {
        glareElement.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      element.style.transition = 'none';
      if (glareElement) {
        glareElement.style.transition = 'none';
      }
    };

    const handleTransitionEnd = () => {
      element.style.transition = `transform ${speed}ms ease-out`;
      if (glareElement) {
        glareElement.style.transition = `opacity ${speed}ms ease-out`;
      }
    };

    // Set initial styles
    element.style.transformStyle = 'preserve-3d';
    element.style.transition = `transform ${speed}ms ease-out`;

    // Add event listeners
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('transitionend', handleTransitionEnd);

      // Remove glare element
      if (glareElement && element.contains(glareElement)) {
        element.removeChild(glareElement);
      }
    };
  }, [maxTilt, perspective, scale, speed, reset, glare, glareMaxOpacity]);

  return elementRef;
}
