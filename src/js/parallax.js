// Parallax scroll effect
export function updateParallax() {
  const scrollPosition = window.scrollY;
  const layers = document.querySelectorAll(".parallax-layer");

  layers.forEach((layer) => {
    const speed = parseFloat(layer.getAttribute("data-speed"));
    const yPos = -(scrollPosition * speed);
    layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
  });
}

export function initParallax() {
  window.addEventListener("scroll", updateParallax);
  updateParallax(); // Initial call
}
