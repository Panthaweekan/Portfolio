// Typing animation
export function initTypingAnimation() {
  const texts = [
    "Associate Software Engineer",
    "Fullstack Developer",
    "Go Developer",
  ];
  let count = 0;
  let index = 0;
  let currentText = "";
  let letter = "";
  let isDeleting = false;

  (function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = isDeleting
      ? currentText.slice(0, --index)
      : currentText.slice(0, ++index);

    const typingElement = document.getElementById("typing-text");
    if (typingElement) {
      typingElement.textContent = letter;
    }

    let typeSpeed = 100;
    if (isDeleting) typeSpeed /= 2;
    if (!isDeleting && letter.length === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && letter.length === 0) {
      isDeleting = false;
      count++;
      typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
  })();
}
