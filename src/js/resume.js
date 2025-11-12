// Import resume styles
import '../css/resume.css';

// Print button functionality
document.addEventListener('DOMContentLoaded', () => {
  const printButton = document.querySelector('.print-button');
  if (printButton) {
    // Update button text based on screen size
    const updateButtonText = () => {
      if (window.innerWidth <= 768) {
        printButton.textContent = '📄';
        printButton.setAttribute('aria-label', 'Export to PDF');
        printButton.setAttribute('title', 'Export to PDF');
      } else {
        printButton.textContent = '📄 Export to PDF';
        printButton.removeAttribute('aria-label');
        printButton.removeAttribute('title');
      }
    };

    // Initial update
    updateButtonText();

    // Update on resize
    window.addEventListener('resize', updateButtonText);

    // Print functionality
    printButton.addEventListener('click', () => {
      window.print();
    });
  }
});
