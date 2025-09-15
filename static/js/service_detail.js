// Service Detail functionality
document.addEventListener('DOMContentLoaded', function() {
    // Order modal functionality
    const orderServiceBtn = document.getElementById('orderService');
    const contactExpertBtn = document.getElementById('contactExpert');
    const orderModal = document.getElementById('orderModal');
    const closeOrderModal = document.getElementById('closeOrderModal');
    const cancelOrder = document.getElementById('cancelOrder');
    const confirmOrder = document.getElementById('confirmOrder');
    const addToFavorites = document.getElementById('addToFavorites');

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    // Open order modal
    if (orderServiceBtn && orderModal) {
        orderServiceBtn.addEventListener('click', function() {
            orderModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Contact expert
    if (contactExpertBtn) {
        contactExpertBtn.addEventListener('click', function() {
            window.location.href = '/contact?subject=expert-consultation&service=' + encodeURIComponent(document.querySelector('h1').textContent);
        });
    }

    // Close modal functions
    function closeOrderModalFunc() {
        if (orderModal) {
            orderModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (closeOrderModal) closeOrderModal.addEventListener('click', closeOrderModalFunc);
    if (cancelOrder) cancelOrder.addEventListener('click', closeOrderModalFunc);

    // Close modal when clicking outside
    if (orderModal) {
        orderModal.addEventListener('click', function(e) {
            if (e.target === orderModal) {
                closeOrderModalFunc();
            }
        });
    }

    // Confirm order
    if (confirmOrder) {
        confirmOrder.addEventListener('click', function() {
            const projectDetails = document.getElementById('projectDetails').value;

            if (!projectDetails.trim()) {
                alert('Veuillez décrire votre projet avant de confirmer.');
                return;
            }

            // Simulation d'envoi de commande
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
            this.disabled = true;

            setTimeout(() => {
                alert('Commande envoyée avec succès ! Notre équipe vous contactera dans les 24h.');
                closeOrderModalFunc();
                this.innerHTML = 'Confirmer la commande';
                this.disabled = false;
            }, 2000);
        });
    }

    // Add to favorites
    if (addToFavorites) {
        addToFavorites.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const isFavorite = icon.classList.contains('fas');

            if (isFavorite) {
                icon.classList.replace('fas', 'far');
                this.style.background = 'transparent';
                this.style.color = 'var(--primary-color)';
                showToast('Service retiré des favoris');
            } else {
                icon.classList.replace('far', 'fas');
                this.style.background = 'var(--primary-color)';
                this.style.color = 'white';
                showToast('Service ajouté aux favoris !');
            }
        });
    }

    // FAQ functionality
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const isActive = answer.classList.contains('active');

                // Close all answers
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('active');
                });

                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                });

                // Toggle current answer
                if (!isActive) {
                    answer.classList.add('active');
                    this.classList.add('active');
                }
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-item, .process-step, .testimonial-card');

        elements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (position < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize elements for animation
    const animatedElements = document.querySelectorAll('.feature-item, .process-step, .testimonial-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Toast notification function
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Add toast styles dynamically
    const toastStyles = document.createElement('style');
    toastStyles.textContent = `
        .toast-notification {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: var(--primary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .toast-notification.show {
            transform: translateY(0);
            opacity: 1;
        }

        .toast-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .toast-content i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(toastStyles);

    // Service rating animation
    const ratingElements = document.querySelectorAll('.service-rating i');
    ratingElements.forEach((star, index) => {
        star.style.animationDelay = `${index * 0.1}s`;
        star.style.opacity = '0';
        star.style.transform = 'scale(0)';

        setTimeout(() => {
            star.style.transition = 'all 0.3s ease';
            star.style.opacity = '1';
            star.style.transform = 'scale(1)';
        }, 500 + index * 100);
    });
});