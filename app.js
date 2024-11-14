const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");

console.log("Sun Icon:", sunIcon);
console.log("Moon Icon:", moonIcon);

const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

const IconToggle = () => {
  moonIcon.classList.toggle("hidden");
  sunIcon.classList.toggle("hidden");
  console.log("Icons toggled");
};

const themeCheck = () => {
  if (userTheme === "dark" || (systemTheme && !userTheme)) {
    document.documentElement.classList.add("dark");
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
    console.log("Dark theme applied");
    return;
  }
  document.documentElement.classList.remove("dark");
  sunIcon.classList.add("hidden");
  moonIcon.classList.remove("hidden");
  console.log("Light theme applied");
};

const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    IconToggle();
    console.log("Switched to light theme");
    return;
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  IconToggle();
  console.log("Switched to dark theme");
};

sunIcon.addEventListener("click", () => {
  themeSwitch();
  console.log("Sun icon clicked");
});
moonIcon.addEventListener("click", () => {
  themeSwitch();
  console.log("Moon icon clicked");
});

themeCheck();
