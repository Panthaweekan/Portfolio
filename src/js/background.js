// Interactive background effects (optimized with throttling)
export function initInteractiveBackground() {
  const bg = document.getElementById("interactive-bg");

  if (bg) {
    let ticking = false;
    let lastX = 50;
    let lastY = 50;

    document.addEventListener("mousemove", (e) => {
      lastX = (e.clientX / window.innerWidth) * 100;
      lastY = (e.clientY / window.innerHeight) * 100;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          bg.style.background = `radial-gradient(circle at ${lastX}% ${lastY}%, rgba(156, 131, 255, 0.2), transparent 40%)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
}

// Create floating particles (optimized count based on device)
export function createParticles() {
  // Reduce particle count on mobile for better performance
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 5 : 10;

  const colors = [
    "rgba(156, 131, 255, 0.5)",
    "rgba(255, 144, 81, 0.5)",
    "rgba(255, 255, 255, 0.3)",
  ];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random properties
    const size = Math.random() * 12 + 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    particle.style.animation = `float ${duration}s ease-in-out infinite`;
    particle.style.animationDelay = `${delay}s`;

    document.body.appendChild(particle);
  }
}

// Create section backgrounds
export function createSectionBackgrounds() {
  const sections = document.querySelectorAll("section");

  sections.forEach((section, index) => {
    // Create background container
    const bgContainer = document.createElement("div");
    bgContainer.className = "section-bg";

    // Create particles (3 per section)
    for (let i = 0; i < 3; i++) {
      const particle = document.createElement("div");
      particle.className = `section-particle ${
        i === 0
          ? "section-particle-sm"
          : i === 1
          ? "section-particle-md"
          : "section-particle-lg"
      }`;

      // Random position and color
      const colors = ["#9C83FF", "#FF9051", "#83FF9C", "#FFD783"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.backgroundColor = color;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;

      bgContainer.appendChild(particle);
    }

    // Add to section
    section.style.position = "relative";
    section.style.overflow = "hidden";
    section.insertBefore(bgContainer, section.firstChild);
  });
}
