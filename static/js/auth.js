// Auth form validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.auth-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const passwordStrength = document.getElementById('passwordStrength');
    const passwordText = document.getElementById('passwordText');
    const passwordMatch = document.getElementById('passwordMatch');

    // Password strength indicator
    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }

    // Confirm password validation
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', checkPasswordMatch);
    }

    // Form submission validation
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    }

    function checkPasswordStrength() {
        const password = passwordInput.value;
        let strength = 0;
        let text = '';

        if (password.length >= 8) strength++;
        if (password.match(/[a-z]+/)) strength++;
        if (password.match(/[A-Z]+/)) strength++;
        if (password.match(/[0-9]+/)) strength++;
        if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength++;

        // Update strength bar and text
        passwordStrength.className = 'strength-fill';

        switch(strength) {
            case 0:
                text = 'Très faible';
                break;
            case 1:
            case 2:
                passwordStrength.classList.add('strength-weak');
                text = 'Faible';
                break;
            case 3:
            case 4:
                passwordStrength.classList.add('strength-medium');
                text = 'Moyen';
                break;
            case 5:
                passwordStrength.classList.add('strength-strong');
                text = 'Fort';
                break;
        }

        if (password.length > 0) {
            passwordText.textContent = text;
        } else {
            passwordText.textContent = 'Force du mot de passe';
        }
    }

    function checkPasswordMatch() {
        if (!confirmPasswordInput || !passwordInput) return;

        if (confirmPasswordInput.value !== passwordInput.value) {
            passwordMatch.textContent = 'Les mots de passe ne correspondent pas';
            passwordMatch.classList.add('validation-error');
            passwordMatch.classList.remove('validation-success');
        } else {
            passwordMatch.textContent = 'Les mots de passe correspondent';
            passwordMatch.classList.add('validation-success');
            passwordMatch.classList.remove('validation-error');
        }

        if (confirmPasswordInput.value.length === 0) {
            passwordMatch.textContent = '';
        }
    }

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');

        inputs.forEach(input => {
            if (!input.value.trim()) {
                showError(input, 'Ce champ est requis');
                isValid = false;
            } else {
                clearError(input);
            }

            // Email validation
            if (input.type === 'email' && input.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value)) {
                    showError(input, 'Veuillez entrer un email valide');
                    isValid = false;
                }
            }

            // Password confirmation validation
            if (input.id === 'confirm_password' && input.value.trim()) {
                const password = form.querySelector('#password');
                if (password && input.value !== password.value) {
                    showError(input, 'Les mots de passe ne correspondent pas');
                    isValid = false;
                }
            }
        });

        // Terms checkbox validation
        const termsCheckbox = form.querySelector('input[name="terms"]');
        if (termsCheckbox && !termsCheckbox.checked) {
            showError(termsCheckbox, 'Vous devez accepter les conditions');
            isValid = false;
        }

        return isValid;
    }

    function showError(input, message) {
        clearError(input);

        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-error';
        errorDiv.textContent = message;
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.3rem';
        errorDiv.style.color = '#FF4B4B';

        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#FF4B4B';
    }

    function clearError(input) {
        const errorDiv = input.parentNode.querySelector('.validation-error');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = '#ddd';
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Fonctionnalité de connexion sociale à implémenter');
        });
    });
});