import { useScroll, m } from 'framer-motion';

export function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-secondary origin-left z-[60]"
    />
  );
}
