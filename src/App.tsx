import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation, MotionConfig, AnimatePresence, m } from 'framer-motion';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LottieAnimation, loadingSpinnerAnimation } from './components/LottieAnimation';

// Lazy load Resume page for code splitting
const Resume = lazy(() => import('./components/Resume'));

function PortfolioPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  // Respect user's motion preferences for accessibility
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const location = useLocation();

  return (
    <SmoothScroll>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
          <div className="min-h-screen">
            <ScrollProgressIndicator />
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="w-32 h-32">
                    <LottieAnimation animationData={loadingSpinnerAnimation} />
                  </div>
                </div>
              }
            >
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
                        <PortfolioPage />
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
          </div>
        </MotionConfig>
      </LazyMotion>
    </SmoothScroll>
  );
}

export default App;
