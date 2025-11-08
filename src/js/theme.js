// Theme toggle functionality
export function initThemeToggle() {
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
  const themeToggleBtn = document.getElementById("theme-toggle");

  if (!themeToggleBtn || !themeToggleDarkIcon || !themeToggleLightIcon) {
    console.error("Theme toggle elements not found:", {
      button: !!themeToggleBtn,
      darkIcon: !!themeToggleDarkIcon,
      lightIcon: !!themeToggleLightIcon
    });
    return;
  }

  console.log("Theme toggle initialized successfully");

  // Update icons based on current theme
  updateThemeIcons();

  // Toggle theme on button click
  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    console.log("Theme toggle clicked, current theme:", isDark ? "dark" : "light");

    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
      console.log("Switched to light mode");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
      console.log("Switched to dark mode");
    }

    updateThemeIcons();
  });
}

// Update icon visibility based on current theme
function updateThemeIcons() {
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
  const isDark = document.documentElement.classList.contains("dark");

  if (isDark) {
    themeToggleDarkIcon?.classList.add("hidden");
    themeToggleLightIcon?.classList.remove("hidden");
  } else {
    themeToggleDarkIcon?.classList.remove("hidden");
    themeToggleLightIcon?.classList.add("hidden");
  }
}
