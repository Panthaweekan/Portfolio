// Import styles
import '../css/main.css';

// Import modules
import { initTypingAnimation } from './typing.js';
import { initThemeToggle } from './theme.js';
import { initInteractiveBackground, createParticles, createSectionBackgrounds } from './background.js';
import { initParallax } from './parallax.js';
import { initNavbar } from './navbar.js';
import { initSmoothScroll } from './smoothScroll.js';

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initThemeToggle();
  initNavbar();
  initSmoothScroll();
});

// Initialize effects when page is fully loaded
window.addEventListener('load', () => {
  initInteractiveBackground();
  createParticles();
  createSectionBackgrounds();
  initParallax();
});
