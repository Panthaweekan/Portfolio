// Import resume styles
import '../css/resume.css';

// Print button functionality
document.addEventListener('DOMContentLoaded', () => {
  const printButton = document.querySelector('.print-button');
  if (printButton) {
    printButton.addEventListener('click', () => {
      window.print();
    });
  }
});
