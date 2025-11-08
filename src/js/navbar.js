// Sticky navbar functionality
export function initNavbar() {
  const navbar = document.getElementById("navbar");
  const header = document.querySelector("header");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!navbar || !header) return;

  let lastScrollPosition = 0;

  // Show/hide navbar on scroll
  window.addEventListener("scroll", () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > header.offsetHeight) {
      // Past header, show navbar
      navbar.classList.remove("transform", "-translate-y-full");
    } else {
      // At top of page, hide navbar
      navbar.classList.add("transform", "-translate-y-full");
    }

    lastScrollPosition = currentScrollPosition;
  });

  // Mobile menu toggle
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      // Toggle icon between hamburger and X
      const isOpen = !mobileMenu.classList.contains("hidden");
      mobileMenuButton.innerHTML = isOpen
        ? `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
         </svg>`
        : `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
         </svg>`;
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll("#mobile-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenuButton.innerHTML = `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>`;
      });
    });
  }
}
