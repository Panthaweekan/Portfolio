import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation, MotionConfig, AnimatePresence, m } from 'framer-motion';
import { ReportHome } from './components/report/ReportHome';

// Lazy load Resume page for code splitting
const Resume = lazy(() => import('./components/Resume'));
const Present = lazy(() => import('./components/Present'));
const DeckChooser = lazy(() => import('./components/present/DeckChooser'));

// Loading spinner for lazy-loaded pages
function LoadingSpinner() {
  return <div className="min-h-screen bg-ground" />;
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
                    <ReportHome />
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
              <Route
                path="/present"
                element={
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DeckChooser />
                  </m.div>
                }
              />
              <Route
                path="/present/:deck"
                element={
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Present />
                  </m.div>
                }
              />
              <Route path="/present/*" element={<Navigate to="/present" replace />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
