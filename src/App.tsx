import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation, MotionConfig, AnimatePresence, m } from 'framer-motion';
import { PortfolioBento } from './components/PortfolioBento';

// Lazy load Resume page for code splitting
const Resume = lazy(() => import('./components/Resume'));

// Loading spinner for lazy-loaded pages
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  // Respect user's motion preferences for accessibility
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const location = useLocation();

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PortfolioBento />
                  </m.div>
                }
              />
              <Route
                path="/resume"
                element={
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Resume />
                  </m.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
