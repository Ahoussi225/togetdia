// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    const modalOk = document.getElementById('modalOk');
    const openMap = document.getElementById('openMap');

    // Form validation
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearError);
        });
    }

    // Modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', closeSuccessModal);
    }

    if (modalOk) {
        modalOk.addEventListener('click', closeSuccessModal);
    }

    // Close modal when clicking outside
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                closeSuccessModal();
            }
        });
    }

    // Map functionality
    if (openMap) {
        openMap.addEventListener('click', function() {
            alert('Fonctionnalité carte interactive à implémenter');
            // Dans une implémentation réelle, cela ouvrirait une carte Google Maps ou similaire
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        if (validateForm()) {
            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');

            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Reset form
                contactForm.reset();

                // Hide loading state
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;

                // Show success modal
                showSuccessModal();
            }, 2000);
        }
    }

    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
            }
        });

        // Validate email format
        const emailField = contactForm.querySelector('#email');
        if (emailField.value && !isValidEmail(emailField.value)) {
            showError(emailField, 'Veuillez entrer un email valide');
            isValid = false;
        }

        return isValid;
    }

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const errorElement = document.getElementById(field.id + 'Error');

        // Clear previous error
        clearError({ target: field });

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            showError(field, 'Ce champ est requis');
            return false;
        }

        // Field-specific validation
        switch(field.type) {
            case 'email':
                if (value && !isValidEmail(value)) {
                    showError(field, 'Veuillez entrer un email valide');
                    return false;
                }
                break;
            case 'tel':
                if (value && !isValidPhone(value)) {
                    showError(field, 'Veuillez entrer un numéro de téléphone valide');
                    return false;
                }
                break;
        }

        return true;
    }

    function showError(field, message) {
        field.style.borderColor = 'var(--warning-color)';
        const errorElement = document.getElementById(field.id + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearError(e) {
        const field = e.target;
        field.style.borderColor = '#ddd';
        const errorElement = document.getElementById(field.id + 'Error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^(\+\d{1,3})?[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/;
        return phoneRegex.test(phone);
    }

    function showSuccessModal() {
        if (successModal) {
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSuccessModal() {
        if (successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 0) {
                value = value.match(/.{1,2}/g).join(' ');
            }

            e.target.value = value;
        });
    }
});