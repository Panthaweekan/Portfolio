// Contact form validation and UX improvements
export function initContactForm() {
  const form = document.querySelector('form[action*="formspree"]');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitButton = form.querySelector('button[type="submit"]');

  // Create success message element
  const successMessage = document.createElement('div');
  successMessage.className = 'hidden mt-4 p-4 bg-green-500/10 border border-green-500 text-green-600 dark:text-green-400 rounded-lg';
  successMessage.setAttribute('role', 'alert');
  successMessage.innerHTML = `
    <div class="flex items-center gap-2">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <p class="font-medium">Message sent successfully! I'll get back to you soon.</p>
    </div>
  `;

  // Create error message element
  const errorMessage = document.createElement('div');
  errorMessage.className = 'hidden mt-4 p-4 bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 rounded-lg';
  errorMessage.setAttribute('role', 'alert');
  errorMessage.innerHTML = `
    <div class="flex items-center gap-2">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>
      <p class="font-medium">Failed to send message. Please try again.</p>
    </div>
  `;

  form.appendChild(successMessage);
  form.appendChild(errorMessage);

  // Validation functions
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateField(input, validationFn = null) {
    const value = input.value.trim();
    const isValid = validationFn ? validationFn(value) : value.length > 0;

    // Get or create error message element
    let errorDiv = input.parentElement.querySelector('.field-error');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'field-error text-red-600 dark:text-red-400 text-sm mt-1 hidden';
      errorDiv.setAttribute('role', 'alert');
      input.parentElement.appendChild(errorDiv);
      input.setAttribute('aria-describedby', `${input.id}-error`);
      errorDiv.id = `${input.id}-error`;
    }

    // Get or create success icon
    let successIcon = input.parentElement.querySelector('.field-success');
    if (!successIcon) {
      successIcon = document.createElement('div');
      successIcon.className = 'field-success absolute right-3 top-9 hidden';
      successIcon.innerHTML = `
        <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
      `;
      input.parentElement.style.position = 'relative';
      input.parentElement.appendChild(successIcon);
    }

    if (!isValid && value.length > 0) {
      // Show error
      input.classList.add('border-red-500', 'focus:ring-red-500');
      input.classList.remove('border-green-500', 'focus:ring-green-500');
      input.setAttribute('aria-invalid', 'true');

      if (input.id === 'email') {
        errorDiv.textContent = 'Please enter a valid email address';
      } else if (input.id === 'name') {
        errorDiv.textContent = 'Name is required';
      } else if (input.id === 'message') {
        errorDiv.textContent = 'Message is required';
      }

      errorDiv.classList.remove('hidden');
      successIcon.classList.add('hidden');
      return false;
    } else if (isValid) {
      // Show success
      input.classList.remove('border-red-500', 'focus:ring-red-500');
      input.classList.add('border-green-500', 'focus:ring-green-500');
      input.setAttribute('aria-invalid', 'false');
      errorDiv.classList.add('hidden');
      successIcon.classList.remove('hidden');
      return true;
    } else {
      // Reset to neutral
      input.classList.remove('border-red-500', 'focus:ring-red-500', 'border-green-500', 'focus:ring-green-500');
      input.setAttribute('aria-invalid', 'false');
      errorDiv.classList.add('hidden');
      successIcon.classList.add('hidden');
      return false;
    }
  }

  function updateSubmitButton() {
    const nameValid = nameInput.value.trim().length > 0;
    const emailValid = validateEmail(emailInput.value.trim());
    const messageValid = messageInput.value.trim().length > 0;
    const allValid = nameValid && emailValid && messageValid;

    if (allValid) {
      submitButton.disabled = false;
      submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
      submitButton.disabled = true;
      submitButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
  }

  // Add validation listeners
  nameInput.addEventListener('blur', () => validateField(nameInput));
  nameInput.addEventListener('input', updateSubmitButton);

  emailInput.addEventListener('blur', () => validateField(emailInput, validateEmail));
  emailInput.addEventListener('input', updateSubmitButton);

  messageInput.addEventListener('blur', () => validateField(messageInput));
  messageInput.addEventListener('input', updateSubmitButton);

  // Initial state
  updateSubmitButton();

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const nameValid = validateField(nameInput);
    const emailValid = validateField(emailInput, validateEmail);
    const messageValid = validateField(messageInput);

    if (!nameValid || !emailValid || !messageValid) {
      return;
    }

    // Show loading state
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = `
      <div class="flex items-center justify-center gap-2">
        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Sending...</span>
      </div>
    `;

    // Disable form inputs
    nameInput.disabled = true;
    emailInput.disabled = true;
    messageInput.disabled = true;

    try {
      // Submit to Formspree
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Show success message
        successMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        // Reset form
        form.reset();

        // Reset validation states
        [nameInput, emailInput, messageInput].forEach(input => {
          input.classList.remove('border-green-500', 'focus:ring-green-500');
          const successIcon = input.parentElement.querySelector('.field-success');
          if (successIcon) successIcon.classList.add('hidden');
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 5000);
      } else {
        // Show error message
        errorMessage.classList.remove('hidden');
        successMessage.classList.add('hidden');
      }
    } catch (error) {
      // Show error message
      errorMessage.classList.remove('hidden');
      successMessage.classList.add('hidden');
    } finally {
      // Restore button and inputs
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
      nameInput.disabled = false;
      emailInput.disabled = false;
      messageInput.disabled = false;
      updateSubmitButton();
    }
  });
}
