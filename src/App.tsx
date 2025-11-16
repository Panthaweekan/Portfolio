import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { SmoothScroll } from './components/SmoothScroll';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

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

  return (
    <SmoothScroll>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
          <div className="min-h-screen">
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="animate-pulse text-muted-foreground text-lg">
                    Loading...
                  </div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<PortfolioPage />} />
                <Route path="/resume" element={<Resume />} />
              </Routes>
            </Suspense>
          </div>
        </MotionConfig>
      </LazyMotion>
    </SmoothScroll>
  );
}

export default App;
